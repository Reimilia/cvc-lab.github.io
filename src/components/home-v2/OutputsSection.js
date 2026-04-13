import * as React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const outputCards = ({ publicationCount, softwareCategoryCount, softwareToolCount, newsCount }) => [
  {
    title: 'Publications',
    description:
      'Browse peer-reviewed papers, conference publications, arXiv work, and recent additions across the lab.',
    value: `${publicationCount}+`,
    detail: 'Research outputs indexed by year and type',
    href: '/publications',
    cta: 'Explore Publications',
  },
  {
    title: 'Software',
    description:
      'Review the center’s software tools, libraries, and server-side systems for computational modeling and visualization.',
    value: `${softwareToolCount}`,
    detail: `${softwareCategoryCount} software categories`,
    href: '/software',
    cta: 'Browse Software',
  },
  {
    title: 'News & Events',
    description:
      'See seminars, announcements, and lab updates that show how research themes connect to current activity.',
    value: `${newsCount}`,
    detail: 'Seminars, announcements, and lab highlights',
    href: '/news',
    cta: 'View News',
  },
]

const OutputsSection = ({
  publicationCount,
  softwareCategoryCount,
  softwareToolCount,
  newsCount,
}) => {
  return (
    <section className="research-theme-outputs">
      <div className="research-themes-shell">
        <div className="research-themes-section-heading research-themes-section-heading--compact">
          <span className="research-themes-section-eyebrow">Outputs</span>
          <h2 className="research-themes-section-title">Follow themes into real outputs</h2>
          <p className="research-themes-section-subtitle">
            The experimental homepage should guide visitors toward papers, software, and current
            activity, not stop at a high-level overview.
          </p>
        </div>

        <div className="research-theme-output-grid">
          {outputCards({
            publicationCount,
            softwareCategoryCount,
            softwareToolCount,
            newsCount,
          }).map(card => (
            <article key={card.title} className="research-theme-output-card">
              <div className="research-theme-output-meta">
                <span className="research-theme-output-value">{card.value}</span>
                <span className="research-theme-output-detail">{card.detail}</span>
              </div>
              <h3 className="research-theme-output-title">{card.title}</h3>
              <p className="research-theme-output-description">{card.description}</p>
              <Link to={card.href} className="research-theme-output-link">
                {card.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

OutputsSection.propTypes = {
  publicationCount: PropTypes.number.isRequired,
  softwareCategoryCount: PropTypes.number.isRequired,
  softwareToolCount: PropTypes.number.isRequired,
  newsCount: PropTypes.number.isRequired,
}

export default OutputsSection
