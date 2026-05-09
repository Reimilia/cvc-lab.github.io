import * as React from 'react'
import { Link } from 'gatsby'
import './dbg-microsite.css'
import observerVideo from '../../images/projects/dynamic_belief_games/observer-view-demo-preview.webm'

const RELEASE_BASE = 'https://github.com/CVC-Lab/cvc-lab.github.io/releases/download/assets-v1'
const videoPoster = `${RELEASE_BASE}/background_image.png`
const overviewImage = `${RELEASE_BASE}/DBG_overview.png`

const branchLinks = [
  {
    title: 'DBG Internal Site',
    description:
      'Protected workspace for authorized team members with demos, documentation, protocol notes, and internal project material.',
    href: 'https://cvcdbg.org/',
    label: 'Protected',
  },
]

const DbgProjectHome = () => (
  <div className="dbg-project-home">
    <section className="dbg-home-hero">
      <div className="dbg-shell dbg-home-hero__grid">
        <div className="dbg-home-hero__content">
          <Link className="dbg-home-back-link" to="/projects">
            Back to all projects
          </Link>
          <p className="dbg-home-eyebrow">Dynamic Belief Games</p>
          <h1>Predictive networking for contested mobile missions.</h1>
          <p>
            DBG trains intelligent networking agents inside a digital-twin environment so mobile ad
            hoc networks can reason about terrain, interference, route choice, and mission risk
            before deployment. This public page stays intentionally high level; deeper project
            material is available only through the protected internal site.
          </p>
        </div>

        <div className="dbg-home-visual" aria-label="Dynamic Belief Games layered system preview">
          <img
            className="dbg-home-visual__image"
            src={overviewImage}
            alt="Layered DBG concept showing intelligent agents, digital twin, and mission environment"
          />
          <div className="dbg-home-visual__caption">
            <span>Concept preview</span>
            <strong>Mission environment + digital twin + agents</strong>
          </div>
        </div>
      </div>
    </section>

    <section className="dbg-home-stack">
      <div className="dbg-shell dbg-home-stack__grid">
        <div>
          <p className="dbg-home-eyebrow">DBG Stack</p>
          <h2>From mission environment to intelligent agents</h2>
          <p>
            The project connects a mission-scale environment, a calibrated digital twin, and
            intelligent networking agents into one testable decision loop.
          </p>
        </div>
        <figure className="dbg-home-stack__figure">
          <video
            className="dbg-home-stack__video"
            src={observerVideo}
            poster={videoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </figure>
      </div>
    </section>

    <section className="dbg-home-tree">
      <div className="dbg-shell">
        <div className="dbg-home-tree__header">
          <p className="dbg-home-eyebrow">Explore the Project</p>
          <h2>Internal project access</h2>
          <p>
            The public page is a teaser for the research direction. Authorized collaborators can
            continue into the protected internal site for implementation details and project assets.
          </p>
        </div>

        <div className="dbg-home-tree__map dbg-home-tree__map--single">
          <div className="dbg-home-tree__root">
            <span>DBG</span>
          </div>
          <div className="dbg-home-tree__trunk" aria-hidden="true" />
          <div className="dbg-home-tree__branches dbg-home-tree__branches--single">
            {branchLinks.map(branch => (
              <a
                className="dbg-home-branch"
                href={branch.href}
                target="_blank"
                rel="noopener noreferrer"
                key={branch.title}
              >
                <span className="dbg-home-branch__label">{branch.label}</span>
                <h3>{branch.title}</h3>
                <p>{branch.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
)

export default DbgProjectHome
