import * as React from 'react'
import PropTypes from 'prop-types'

const MetricsSection = ({
  projectCount,
  publicationCount,
  currentMemberCount,
  yearsOfResearch,
}) => {
  const metrics = [
    {
      label: 'Research Projects',
      value: `${projectCount}`,
    },
    {
      label: 'Publications',
      value: `${publicationCount}+`,
    },
    {
      label: 'Current Members',
      value: `${currentMemberCount}`,
    },
    {
      label: 'Years of Research',
      value: yearsOfResearch,
    },
  ]

  return (
    <section className="research-theme-metrics">
      <div className="research-themes-shell">
        <div className="research-theme-metrics-grid">
          {metrics.map(metric => (
            <div key={metric.label} className="research-theme-metric-card">
              <span className="research-theme-metric-value">{metric.value}</span>
              <span className="research-theme-metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

MetricsSection.propTypes = {
  projectCount: PropTypes.number.isRequired,
  publicationCount: PropTypes.number.isRequired,
  currentMemberCount: PropTypes.number.isRequired,
  yearsOfResearch: PropTypes.string.isRequired,
}

export default MetricsSection
