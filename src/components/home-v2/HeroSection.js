import * as React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import cvcLabTitlePhoto from '../../images/CVC_Lab_title_photo.png'

const HeroSection = ({ themes, activeThemeId, onSelectTheme }) => {
  return (
    <section className="research-themes-hero">
      <div className="research-themes-shell">
        <div className="research-themes-hero-layout">
          <div className="research-themes-hero-copy">
            <div className="research-themes-hero-main">
              <div className="research-themes-hero-identity">
                <p className="research-themes-hero-label">Computational Visualization Center</p>
                <p className="research-themes-hero-meta">
                  Oden Institute · The University of Texas at Austin
                </p>
              </div>
              <h1 className="research-themes-hero-title">
                Computational methods for healthcare and scientific discovery
              </h1>
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
                <div className="research-themes-hero-controls">
                  <div className="research-themes-hero-theme-controls">
                    <span className="research-themes-hero-rail-label">Starting point</span>
                    <div className="research-themes-hero-rail" aria-label="Select research theme">
                      {themes.map(theme => (
                        <button
                          key={theme.id}
                          type="button"
                          className={`research-themes-hero-rail-button ${
                            theme.id === activeThemeId
                              ? 'research-themes-hero-rail-button--active'
                              : ''
                          }`}
                          onClick={() => onSelectTheme(theme.id)}
                          aria-pressed={theme.id === activeThemeId}
                        >
                          {theme.title}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="research-themes-hero-actions">
                    <Link
                      to="/projects"
                      className="research-themes-button research-themes-button--primary"
                    >
                      Browse All Projects
                    </Link>
                  </div>
                </div>
              </div>
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
    </section>
  )
}

HeroSection.propTypes = {
  themes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeThemeId: PropTypes.string.isRequired,
  onSelectTheme: PropTypes.func.isRequired,
}

export default HeroSection
