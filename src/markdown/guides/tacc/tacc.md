---
title: 'TACC Guide'
slug: '/guides/tacc'
---

## Overview

The CVC lab uses [TACC (Texas Advanced Computing Center)](https://www.tacc.utexas.edu/) systems for research computing. Our group primarily uses three systems:

- **Vista** -- TACC's AI-centric system based on NVIDIA Grace Hopper architecture
- **Lonestar6 (LS6)** -- general-purpose HPC supporting simulation, data analysis, visualization, and machine learning
- **Stampede3** -- large-scale HPC with Ice Lake, Sapphire Rapids, and Skylake compute nodes

This page covers SSH setup, allocation best practices, and links to official documentation. It is intended as a quick-start reference for lab members -- always consult the official TACC docs for the most up-to-date information.

---

## Official Documentation

Read the full user guide for whatever system you are using. These cover system architecture, software modules, job submission, file systems, and more.

- [Vista User Guide](https://docs.tacc.utexas.edu/hpc/vista/)
- [Lonestar6 User Guide](https://docs.tacc.utexas.edu/hpc/lonestar6/)
- [Stampede3 User Guide](https://docs.tacc.utexas.edu/hpc/stampede3/)

Additional resources:

- [Getting Started at TACC](https://tacc.utexas.edu/use-tacc/getting-started/) -- account setup, MFA, first login
- [Good Conduct Guide](https://docs.tacc.utexas.edu/basics/conduct/) -- policies on responsible usage
- [Managing I/O on TACC Resources](https://docs.tacc.utexas.edu/tutorials/managingio/) -- I/O best practices

---

## Allocation & Utilization Best Practices

Our group shares a finite allocation of Service Units (SUs). Poor utilization wastes credits and reflects badly on the group's allocation renewal.

**How SUs are charged:**

> SUs = (number of nodes) x (wall-clock hours) x (queue multiplier)

One SU equals one compute node used for one hour at the base rate. Some queues (e.g., GPU queues) have higher multipliers.

**Guidelines:**

- **Right-size your jobs.** Don't request more nodes or time than you need. If your job only uses 2 nodes, don't request 8.
- **Monitor your usage.** Check the [TACC User Portal](https://tacc.utexas.edu/portal/) under "Allocations" to see how many SUs the group has consumed.
- **Test at small scale first.** Run short test jobs before submitting large-scale runs to catch bugs early.
- **Cancel jobs you don't need.** If you realize a job is incorrect, cancel it with `scancel` rather than letting it waste SUs.

For more details on allocations: [TACC Allocations](https://tacc.utexas.edu/use-tacc/allocations/)

---

## SSH Setup with Agent Forwarding

Use SSH agent forwarding so your GitHub SSH key stays on your laptop. TACC login nodes will "borrow" signatures via the forwarded agent -- no private keys need to be copied onto remote hosts. This is the [pattern GitHub recommends](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/using-ssh-agent-forwarding) for servers.

### 1. Load your key into the local agent

You need a passphrase-protected SSH key whose public key is [added to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

**macOS:**

```bash
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
ssh-add -l   # confirm the key is listed
```

**Linux:**

```bash
ssh-add ~/.ssh/id_ed25519
ssh-add -l   # confirm the key is listed
```

On macOS this persists across reboots via Keychain. On Linux you may need to re-run `ssh-add` after each reboot (or configure your shell to do it automatically).

### 2. Configure `~/.ssh/config` on your laptop

Add these stanzas to forward your agent to TACC login nodes. Replace `YOUR_TACC_USERNAME` with your actual TACC username.

If you use 1Password or another custom SSH agent globally, the `IdentityAgent SSH_AUTH_SOCK` line is important -- it tells OpenSSH to read the socket location from the environment rather than using a hardcoded agent path.

```
Host vista vista.tacc.utexas.edu login*.vista.tacc.utexas.edu
  HostName vista.tacc.utexas.edu
  User YOUR_TACC_USERNAME
  ForwardAgent yes
  IdentityAgent SSH_AUTH_SOCK
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
  AddKeysToAgent yes
  UseKeychain yes

Host ls6 ls6.tacc.utexas.edu login*.ls6.tacc.utexas.edu
  HostName ls6.tacc.utexas.edu
  User YOUR_TACC_USERNAME
  ForwardAgent yes
  IdentityAgent SSH_AUTH_SOCK
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
  AddKeysToAgent yes
  UseKeychain yes

Host stampede3 stampede3.tacc.utexas.edu login*.stampede3.tacc.utexas.edu
  HostName stampede3.tacc.utexas.edu
  User YOUR_TACC_USERNAME
  ForwardAgent yes
  IdentityAgent SSH_AUTH_SOCK
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
  AddKeysToAgent yes
  UseKeychain yes
```

> **Note:** `UseKeychain yes` is macOS-specific. On Linux, remove that line.

### 3. Verify the setup

From your laptop:

```bash
ssh-add -l          # should list your key
ssh vista           # (or ls6, stampede3)
```

Once on the TACC login node:

```bash
echo "$SSH_AUTH_SOCK"   # should be non-empty
ssh-add -l              # should list your key
ssh -T git@github.com   # should say "Hi <username>!"
```

If `SSH_AUTH_SOCK` is set and `ssh-add -l` lists your key, agent forwarding is working.

### 4. Compute nodes and `idev` (the second-hop problem)

When you SSH from a login node to a compute node (e.g., via `idev` for an interactive session), agent forwarding must also be enabled on that hop. Otherwise `git` commands will fail on the compute node.

**Option A: ProxyJump from your laptop** (single logical connection, keeps forwarding end-to-end):

```bash
ssh -J vista -A c302-001    # replace with your compute node name
```

**Option B: Forward the agent on the login node** by adding this to `~/.ssh/config` _on the TACC login node_:

```
Host i* c* r*
  ForwardAgent yes
```

This ensures that when you `ssh` from the login node to any compute node (names starting with `i`, `c`, or `r`), the agent is forwarded.

### Security note

Agent forwarding is powerful: while you are logged into a host, that host can request signatures from your agent. Scope `ForwardAgent yes` to trusted hosts only (like the TACC stanzas above) -- never set it under `Host *`.

---

## General Tips

### File systems

TACC provides three main file systems. Use them appropriately:

| File System | Purpose                                   | Purged?        | Backed Up? |
| ----------- | ----------------------------------------- | -------------- | ---------- |
| `$HOME`     | Small config files, scripts               | No             | Yes        |
| `$WORK`     | Source code, libraries, input/output data | No             | No         |
| `$SCRATCH`  | Active job data, large temporary files    | Yes (periodic) | No         |

- **Run jobs from `$SCRATCH`**, not `$HOME` or `$WORK`. The scratch file system is optimized for the I/O patterns of compute jobs.
- **Store important results in `$WORK`** after a job completes. Don't leave critical data only on `$SCRATCH` -- it is subject to periodic purges.
- **Keep `$HOME` lean.** It has a small quota and is meant for dotfiles and small scripts.

### Other tips

- Use `module load` / `module spider` to manage software. Don't install system packages yourself.
- Check queue wait times with `showq` or `squeue` before submitting large jobs.
- See the [Managing I/O tutorial](https://docs.tacc.utexas.edu/tutorials/managingio/) for best practices on file I/O in jobs -- poor I/O patterns can get your jobs killed by admins.
