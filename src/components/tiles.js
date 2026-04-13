import * as React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Container, Tabs, Tab } from '@mui/material'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FaArrowRight, FaSearch, FaTimes } from 'react-icons/fa'
import './tiles-modern.css'

const projectTabs = [
  'All',
  'Computer Vision',
  'Reinforcement Learning',
  'Scientific ML',
  'Health AI/ML',
]

// Featured project names - these are shown in the FeaturedResearch carousel on homepage
const FEATURED_PROJECTS = [
  'PHAST',
  'GRL-SNAM',
  'Dynamic Belief Games',
  "Actionable Intelligence for Combating Parkinson's Disease",
  'Subsurface Flow Modeling',
]

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value)
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}

const Tiles = ({ projectTiles, showAllProjects = false }) => {
  const [activeTab, setActiveTab] = React.useState('All')
  const [searchInput, setSearchInput] = React.useState('')
  const debouncedSearch = useDebounce(searchInput, 300)
  const hasSearchInput = searchInput.trim().length > 0

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const clearFilters = () => {
    setActiveTab('All')
    setSearchInput('')
  }

  const sortedProjectTiles = React.useMemo(() => {
    if (!projectTiles || projectTiles.length === 0) {
      return []
    }
    return projectTiles.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [projectTiles])

  // On dedicated projects page, show all projects; on homepage, exclude featured ones
  const regularProjects = React.useMemo(() => {
    if (showAllProjects) {
      return sortedProjectTiles
    }
    return sortedProjectTiles.filter(tile => !FEATURED_PROJECTS.includes(tile.name))
  }, [sortedProjectTiles, showAllProjects])

  const { currentProjects, pastProjects } = React.useMemo(() => {
    const cutoffDate = new Date('2023-01-01')
    const current = regularProjects.filter(tile => new Date(tile.date) >= cutoffDate)
    const past = regularProjects.filter(tile => new Date(tile.date) < cutoffDate)
    return { currentProjects: current, pastProjects: past }
  }, [regularProjects])

  const matchesSearch = React.useCallback(
    tile => {
      if (!debouncedSearch) return true
      const query = debouncedSearch.toLowerCase()
      return (
        tile.name.toLowerCase().includes(query) ||
        tile.description.toLowerCase().includes(query) ||
        tile.tags.some(tag => tag.toLowerCase().includes(query))
      )
    },
    [debouncedSearch]
  )

  const filteredCurrentProjects = React.useMemo(() => {
    let projects = currentProjects
    if (activeTab !== 'All') {
      projects = projects.filter(tile => tile.tags.includes(activeTab))
    }
    return projects.filter(matchesSearch)
  }, [currentProjects, activeTab, matchesSearch])

  const filteredPastProjects = React.useMemo(() => {
    let projects = pastProjects
    if (activeTab !== 'All') {
      projects = projects.filter(tile => tile.tags.includes(activeTab))
    }
    return projects.filter(matchesSearch)
  }, [pastProjects, activeTab, matchesSearch])

  const totalVisibleProjects = filteredCurrentProjects.length + filteredPastProjects.length
  const hasActiveFilters = activeTab !== 'All' || hasSearchInput
  const activeSearchLabel = debouncedSearch.trim()

  const resultsSummary = React.useMemo(() => {
    if (hasActiveFilters) {
      if (activeSearchLabel && activeTab !== 'All') {
        return `Showing ${totalVisibleProjects} project${
          totalVisibleProjects === 1 ? '' : 's'
        } for "${activeSearchLabel}" in ${activeTab}`
      }

      if (activeSearchLabel) {
        return `Showing ${totalVisibleProjects} project${
          totalVisibleProjects === 1 ? '' : 's'
        } for "${activeSearchLabel}"`
      }

      return `Showing ${totalVisibleProjects} project${
        totalVisibleProjects === 1 ? '' : 's'
      } in ${activeTab}`
    }

    return `Showing ${regularProjects.length} projects: ${currentProjects.length} current and ${pastProjects.length} past`
  }, [
    activeSearchLabel,
    activeTab,
    currentProjects.length,
    hasActiveFilters,
    pastProjects.length,
    regularProjects.length,
    totalVisibleProjects,
  ])

  const tabsMarkup = (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="project categories"
    >
      {projectTabs.map(tab => (
        <Tab label={tab} value={tab} key={tab} />
      ))}
    </Tabs>
  )

  return (
    <div
      className={`tiles-container ${showAllProjects ? 'tiles-container--all-projects' : ''}`}
      id="projects"
    >
      <Container maxWidth="lg">
        <h2 className="section-title">{showAllProjects ? 'All Projects' : 'Research'}</h2>
        <p className="section-subtitle">
          Browse current research across scientific machine learning, reinforcement learning,
          computer vision, and health AI/ML.
        </p>

        {showAllProjects ? (
          <div className="project-controls">
            <div className="project-search-wrapper">
              <FaSearch className="project-search-icon" />
              <input
                type="text"
                className="project-search-input"
                placeholder="Search projects..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                aria-label="Search projects"
              />
              {hasSearchInput && (
                <button
                  className="project-search-clear"
                  onClick={() => setSearchInput('')}
                  aria-label="Clear search"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <div className="tabs-container tabs-container--controls">{tabsMarkup}</div>

            <div className="project-controls-footer">
              <p className="project-results-summary">{resultsSummary}</p>
              {hasActiveFilters && (
                <button
                  type="button"
                  className="project-clear-filters-button"
                  onClick={clearFilters}
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="tabs-container">{tabsMarkup}</div>
        )}

        {/* Current Projects Section */}
        {filteredCurrentProjects.length > 0 && (
          <>
            <div className="projects-grid">
              {filteredCurrentProjects.map(tile => (
                <div key={tile.name}>
                  {tile.link.startsWith('http') ? (
                    <a
                      href={tile.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card-link"
                    >
                      <ProjectCard tile={tile} />
                    </a>
                  ) : (
                    <Link to={tile.link} className="project-card-link">
                      <ProjectCard tile={tile} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Past Projects Section */}
        {filteredPastProjects.length > 0 && (
          <div className="past-projects-section">
            <h3 className="subsection-title">Past Projects</h3>
            <div className="projects-grid">
              {filteredPastProjects.map(tile => (
                <div key={tile.name}>
                  {tile.link.startsWith('http') ? (
                    <a
                      href={tile.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card-link"
                    >
                      <ProjectCard tile={tile} />
                    </a>
                  ) : (
                    <Link to={tile.link} className="project-card-link">
                      <ProjectCard tile={tile} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredCurrentProjects.length === 0 &&
          filteredPastProjects.length === 0 &&
          debouncedSearch && (
            <p className="section-subtitle" style={{ textAlign: 'center', marginTop: '2rem' }}>
              No projects found matching &ldquo;{debouncedSearch}&rdquo;
            </p>
          )}
      </Container>
    </div>
  )
}

// Standard Project Card
const ProjectCard = ({ tile }) => {
  return (
    <div className="project-card">
      <div className="project-card-image">
        <div className="project-card-image-frame">
          {tile.image && tile.image.childImageSharp && getImage(tile.image) ? (
            <GatsbyImage
              image={getImage(tile.image)}
              alt={`${tile.name} project preview`}
              loading="lazy"
            />
          ) : (
            <img
              src={require(`../images/${tile.img_name}.png`).default}
              alt={`${tile.name} project preview`}
            />
          )}
        </div>
      </div>
      <div className="project-card-content">
        <h3 className="project-card-title">{tile.name}</h3>
        <p className="project-card-description">{tile.description}</p>
        <div className="project-card-tags">
          {tile.tags.map(tag => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="project-card-action" aria-hidden="true">
          <span>View Project</span>
          <FaArrowRight className="project-card-action-icon" />
        </div>
      </div>
    </div>
  )
}

Tiles.propTypes = {
  projectTiles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      img_name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      date: PropTypes.string,
      image: PropTypes.object,
    })
  ).isRequired,
  showAllProjects: PropTypes.bool,
}

ProjectCard.propTypes = {
  tile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    img_name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.object,
  }).isRequired,
}

export default Tiles
