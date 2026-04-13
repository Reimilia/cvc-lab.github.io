import * as React from 'react'
import { Link } from 'gatsby'
import cvcLabTitlePhoto from '../../images/CVC_Lab_title_photo.png'

const HeroSection = () => {
  return (
    <section className="research-themes-hero">
      <div className="research-themes-shell">
        <div className="research-themes-hero-copy">
          <div className="research-themes-hero-identity">
            <p className="research-themes-hero-label">Computational Visualization Center</p>
            <p className="research-themes-hero-meta">
              Oden Institute · The University of Texas at Austin
            </p>
          </div>
          <h1 className="research-themes-hero-title">
            Computational methods for healthcare and scientific discovery
          </h1>
          <div className="research-themes-hero-intro">
            <div className="research-themes-hero-text">
              <div className="research-themes-hero-subtitle">
                <p>
                  We develop AI, simulation, and interpretable modeling methods for understanding
                  complex systems across healthcare, imaging, and science. Our work helps
                  researchers integrate multimodal data, model dynamic processes, and make more
                  informed decisions.
                </p>
                <p>
                  Current projects span medical imaging, scientific machine learning, dynamic
                  prediction, and data-driven discovery in biological, physical, and engineered
                  systems.
                </p>
              </div>
              <div className="research-themes-hero-actions">
                <a
                  href="#theme-selector"
                  className="research-themes-button research-themes-button--primary"
                >
                  Explore Research Themes
                </a>
                <Link
                  to="/projects"
                  className="research-themes-button research-themes-button--secondary"
                >
                  Browse All Projects
                </Link>
              </div>
            </div>
            <div className="research-themes-hero-media">
              <img
                src={cvcLabTitlePhoto}
                alt="Computational Visualization Center researchers presenting visualization work in the lab"
                className="research-themes-hero-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
