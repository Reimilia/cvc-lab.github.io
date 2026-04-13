import * as React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const ThemeExplainerPanel = ({ theme }) => {
  return (
    <section className="research-theme-explainer">
      <div className="research-themes-shell">
        <div className="research-theme-explainer-card" aria-live="polite">
          <div className="research-theme-explainer-main">
            <span className="research-themes-section-eyebrow">Theme Explainer</span>
            <h2 className="research-theme-explainer-title">{theme.title}</h2>
            <p className="research-theme-explainer-description">{theme.description}</p>

            <div className="research-theme-use-cases">
              <h3 className="research-theme-subheading">Common use cases</h3>
              <div className="research-theme-use-case-list">
                {theme.useCases.map(useCase => (
                  <span key={useCase} className="research-theme-use-case-pill">
                    {useCase}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="research-theme-impact-panel">
            <p className="research-theme-impact-label">Why this work matters</p>
            <p className="research-theme-impact-text">{theme.impact}</p>
            <Link
              to={theme.ctaHref}
              className="research-themes-button research-themes-button--primary"
            >
              {theme.ctaLabel}
            </Link>
          </aside>
        </div>
      </div>
    </section>
  )
}

ThemeExplainerPanel.propTypes = {
  theme: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    impact: PropTypes.string.isRequired,
    ctaLabel: PropTypes.string.isRequired,
    ctaHref: PropTypes.string.isRequired,
    useCases: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
}

export default ThemeExplainerPanel
