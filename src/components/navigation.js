import * as React from 'react'
import PropTypes from 'prop-types'
import { Link as LinkRouter } from 'gatsby'
import { FaBars, FaTimes } from 'react-icons/fa'
import './navigation.css'

const Navigation = ({ menuLinks = [] }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const toggleMobile = () => setMobileOpen(prev => !prev)
  const closeMobile = () => setMobileOpen(false)

  return (
    <div className="nav-wrapper">
      <button
        className="nav-hamburger"
        onClick={toggleMobile}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={`nav-menu ${mobileOpen ? 'nav-menu--open' : ''}`}>
        <ul className="nav-list">
          <li className="nav-item">
            <LinkRouter to="/" className="nav-link" onClick={closeMobile}>
              HOME
            </LinkRouter>
          </li>
          {menuLinks.map(link => (
            <li key={link.name} className="nav-item">
              <LinkRouter to={link.link} className="nav-link" onClick={closeMobile}>
                {link.name}
              </LinkRouter>
            </li>
          ))}
        </ul>
      </nav>

      {mobileOpen && <div className="nav-overlay" onClick={closeMobile} aria-hidden="true" />}
    </div>
  )
}

Navigation.propTypes = {
  menuLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
}

export default Navigation
