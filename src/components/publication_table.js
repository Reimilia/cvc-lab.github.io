import * as React from 'react'
import DOMPurify from 'isomorphic-dompurify'
import { FaFilePdf, FaExternalLinkAlt, FaArrowUp } from 'react-icons/fa'
import './publication_table.css'
import { database } from '../data/database'
import { ref, get } from 'firebase/database'

const getDriveImageUrl = link => {
  if (!link || link === 'NULL') return null
  const match = link.match(/\/d\/([a-zA-Z0-9_-]+)/)
  return match ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400` : null
}

const publicationTypeOrder = [
  'Journal Publications',
  'arXiv',
  'Conference Presentations & Publications',
  'Technical Reports',
  'Book',
  'Edited Books',
  'Book Chapters',
]

const groupByYearAndType = publications => {
  return publications.reduce((groupedPublications, publication) => {
    const year = publication.PublishedDateYear
    const type = publication.PublicationType

    if (!groupedPublications[year]) {
      groupedPublications[year] = {}
    }

    if (!groupedPublications[year][type]) {
      groupedPublications[year][type] = []
    }

    groupedPublications[year][type].push(publication)
    return groupedPublications
  }, {})
}

const generatePublicationKey = (publication, index) => {
  const titlePart = publication.Title ? publication.Title.substring(0, 20).replace(/\s+/g, '_') : ''
  const authorPart = publication.Authors
    ? publication.Authors.substring(0, 20).replace(/\s+/g, '_')
    : ''
  return `${titlePart}_${authorPart}_${index}`
}

const scrollToYear = yearId => {
  if (typeof document === 'undefined') return
  const el = document.getElementById(yearId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const scrollToTop = () => {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const PublicationTable = () => {
  const [publicationData, setPublicationData] = React.useState([])
  const [showBackToTop, setShowBackToTop] = React.useState(false)

  React.useEffect(() => {
    const dbRef = ref(database, '10EvljkxfSNwL6I1m81tXzruizAVLN-EwmgclGkh_vkA/Papers')
    get(dbRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          setPublicationData(Object.values(snapshot.val()))
        }
      })
      .catch(() => {
        // Firebase error occurred, handled silently
      })
  }, [])

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const groupedPublications = groupByYearAndType(publicationData)
  const sortedYears = Object.keys(groupedPublications).sort((a, b) => b - a)

  return (
    <div className="publications-class" id="publications">
      <div className="publication-container">
        <h4 className="header-sub">Publications</h4>

        {/* Year navigation bar */}
        {sortedYears.length > 0 && (
          <nav className="year-nav" aria-label="Jump to year">
            {sortedYears.map(year => (
              <button
                key={year}
                className="year-nav-btn"
                onClick={() => scrollToYear(`year-${year}`)}
              >
                {year}
              </button>
            ))}
          </nav>
        )}

        <div className="publication-list">
          {sortedYears.map(year => {
            const types = groupedPublications[year]
            return (
              <div key={year} id={`year-${year}`} className="year-section">
                <h3 className="year-header">{year}</h3>
                <hr className="year-divider" />
                {publicationTypeOrder
                  .filter(type => types[type])
                  .map(type => (
                    <div key={type} className="type-section">
                      <h4 className="type-header">{type}</h4>
                      {types[type].map((publication, index) => {
                        const thumbnailUrl = getDriveImageUrl(publication.Thumbnail)
                        return (
                          <div
                            key={generatePublicationKey(publication, index)}
                            className="publication-card"
                          >
                            <div
                              className={`pub-card-inner${thumbnailUrl ? ' pub-card-with-thumb' : ''}`}
                            >
                              {thumbnailUrl && (
                                <div className="pub-thumbnail">
                                  <img
                                    src={thumbnailUrl}
                                    alt=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              )}
                              <div className="lower-container-pubs">
                                <h3>{publication.Title}</h3>
                                <h4>{publication.Authors}</h4>
                                {publication.Location && publication.Location !== 'NULL' && (
                                  <h4
                                    dangerouslySetInnerHTML={{
                                      __html: DOMPurify.sanitize(`<i>${publication.Location}</i>`),
                                    }}
                                  ></h4>
                                )}
                                <div className="pub-links">
                                  {publication.PDFLink &&
                                    publication.PDFLink !== 'NULL' &&
                                    (publication.PDFLink.startsWith('http://') ||
                                      publication.PDFLink.startsWith('https://')) && (
                                      <a
                                        href={publication.PDFLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pub-link-btn pub-link-pdf"
                                      >
                                        <FaFilePdf className="pub-link-icon" />
                                        PDF
                                      </a>
                                    )}
                                  {publication.ProjectLink &&
                                    publication.ProjectLink !== 'NULL' &&
                                    (publication.ProjectLink.startsWith('http://') ||
                                      publication.ProjectLink.startsWith('https://')) && (
                                      <a
                                        href={publication.ProjectLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pub-link-btn pub-link-project"
                                      >
                                        <FaExternalLinkAlt className="pub-link-icon" />
                                        Project Page
                                      </a>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <FaArrowUp />
        </button>
      )}
    </div>
  )
}

export default PublicationTable
