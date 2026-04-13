/**
 * Curated research-theme data for the experimental homepage.
 *
 * This is intentionally separate from the existing internal project taxonomy.
 * The goal is to provide a lightweight, reversible theme-first discovery layer
 * for the temporary /research-themes route.
 */

const homepageThemes = [
  {
    id: 'healthcare-ai',
    title: 'Healthcare AI',
    summary:
      'Multimodal computational methods for diagnosis, patient stratification, and disease monitoring.',
    description:
      'We develop computational methods that combine imaging, biomarkers, wearable sensing, and clinical information to support diagnosis, subgroup discovery, and longitudinal monitoring in complex diseases.',
    useCases: ['Medical imaging', 'Biomarkers', 'Wearables', 'Clinician decision support'],
    impact:
      'Integrating imaging, biomarkers, sensors, and clinical data into models that support diagnosis and monitoring.',
    ctaLabel: 'View all Healthcare AI projects',
    ctaHref: '/projects',
    projectNames: [
      "Actionable Intelligence for Combating Parkinson's Disease",
      'Integrated PD Precision Stratification',
      'Pathway-Anchored PD Clustering',
    ],
  },
  {
    id: 'world-models',
    title: 'World Models',
    summary:
      'Structured models of evolving environments for prediction, reasoning, and decision-making.',
    description:
      'We build structured models of systems that change over time, helping researchers and intelligent agents forecast dynamics, reason under uncertainty, and make better decisions in complex environments.',
    useCases: ['Dynamic environments', 'Temporal inference', 'Planning', 'Structured forecasting'],
    impact:
      'Developing robust models for systems that evolve over time and require prediction, planning, and decision-making.',
    ctaLabel: 'Browse World Models research',
    ctaHref: '/projects',
    projectNames: ['PHAST', 'GRL-SNAM', 'Dynamic Belief Games'],
  },
  {
    id: 'ai-for-science',
    title: 'AI for Science',
    summary:
      'Machine learning methods for scientific data, simulations, latent structure, and interpretable analysis.',
    description:
      'We apply machine learning to scientific data and simulation pipelines to help researchers model complex systems, discover latent structure, and accelerate analysis while preserving interpretability.',
    useCases: [
      'Scientific machine learning',
      'Multimodal modeling',
      'Simulation-guided inference',
      'Interpretable analysis',
    ],
    impact:
      'Building structure-aware computational methods that help researchers simulate, analyze, and interpret complex systems.',
    ctaLabel: 'Explore AI for Science projects',
    ctaHref: '/projects',
    projectNames: [
      'Differential and Pointwise Control RL',
      'Scalable Risk-Averse Well-Placement',
      'Subsurface Flow Modeling',
    ],
  },
  {
    id: 'scientific-simulation',
    title: 'Scientific Simulation',
    summary:
      'Computational approaches for modeling physical systems with stability, structure, and efficiency.',
    description:
      'We develop simulation-oriented computational methods for physical systems and complex phenomena, with emphasis on stability, structure preservation, computational efficiency, and decision support.',
    useCases: [
      'Physical modeling',
      'Subsurface systems',
      'Dynamical forecasting',
      'Computational science',
    ],
    impact:
      'Connecting foundational computational research to real-world translational impact across medicine, science, and engineering.',
    ctaLabel: 'View Scientific Simulation projects',
    ctaHref: '/projects',
    projectNames: ['PHAST', 'Subsurface Flow Modeling', 'Scalable Risk-Averse Well-Placement'],
  },
  {
    id: 'computational-imaging',
    title: 'Computational Imaging',
    summary:
      'Methods for extracting structured information from images, spatial data, and scientific sensing pipelines.',
    description:
      'We advance methods for recovering reliable structure from images, spatial measurements, and sensing systems, with applications spanning aerial, medical, and scientific imaging.',
    useCases: [
      'Medical imaging',
      'Scientific imaging',
      'Geometric perception',
      'Spatial inference',
    ],
    impact:
      'Advancing imaging and sensing pipelines that turn raw observations into structured, usable information.',
    ctaLabel: 'Browse Computational Imaging projects',
    ctaHref: '/projects',
    projectNames: ['Night-time Aerial Material Segmentation', 'Adversarial Cloaking', 'DEDRECON'],
  },
]

const homepageThemeById = homepageThemes.reduce((themesById, theme) => {
  themesById[theme.id] = theme
  return themesById
}, {})

module.exports = {
  defaultHomepageThemeId: homepageThemes[0].id,
  homepageThemes,
  homepageThemeById,
}
