import { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../App'
import { useResortData } from '../useResortData'

export default function Nav() {
  const { activeResort, activeResortId, clearActiveResort, isDisney } = useApp()
  const { parks } = useResortData()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => { document.removeEventListener('mousedown', handler); document.removeEventListener('touchstart', handler) }
  }, [open])

  // Close on route change
  const go = (path) => { setOpen(false); navigate(path) }

  const resortLabel = activeResortId === 'disney-world' ? 'Disney World' : 'Universal Orlando'

  // Resort-aware nav groups
  const mainLinks = [
    { to: '/',        icon: '🏠', label: 'Resort Home' },
    { to: '/planner', icon: '📋', label: 'Trip Planner' },
    { to: '/journal', icon: '📔', label: 'Trip Journal' },
    ...(isDisney ? [{ to: '/mickeys', icon: '🐭', label: 'Hidden Mickeys' }] : []),
    { to: '/food',    icon: isDisney ? '🍹' : '🌭', label: isDisney ? 'Food & Drinks' : 'Universal Eats' },
    { to: '/achievements', icon: '🏆', label: 'Achievements' },
  ]

  // Park map links — one per active resort park
  const mapLinks = parks.map(p => ({
    to:    `/map/${p.id}`,
    icon:  '🗺️',
    label: `${p.emoji} ${p.name} Map`,
  }))

  const hotelLink = { to: '/hotels', icon: '🏨', label: 'Hotels & Resorts' }

  return (
    <>
      <nav className="nav">
        {/* Logo */}
        <NavLink to="/" className="nav-logo" onClick={() => setOpen(false)}>
          <span style={{ fontSize: '1.5rem' }}>{activeResort?.emoji || '🏰'}</span>
          <div className="nav-logo-text-group">
            <span className="nav-logo-text">QUEUP</span>
            {activeResort && <span className="nav-active-resort">{resortLabel}</span>}
          </div>
        </NavLink>

        {/* Desktop links (hidden on mobile) */}
        <ul className="nav-links">
          {mainLinks.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => isActive ? 'active' : ''}>
                <span>{l.icon}</span>{l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <div className="nav-menu-wrap" ref={menuRef}>
          <button
            className={`nav-hamburger${open ? ' open' : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="nav-dropdown animate-float-up">
              {/* Resort badge */}
              <div className="nav-dropdown-resort">
                <span>{activeResort?.emoji}</span>
                <span>{resortLabel}</span>
              </div>

              <div className="nav-dropdown-divider" />

              {/* Main links */}
              {mainLinks.map(l => (
                <button key={l.to} className="nav-dropdown-item" onClick={() => go(l.to)}>
                  <span className="nav-dd-icon">{l.icon}</span>
                  <span>{l.label}</span>
                </button>
              ))}

              <div className="nav-dropdown-divider" />

              {/* Park maps */}
              <div className="nav-dropdown-section-label">Park Maps</div>
              {mapLinks.map(l => (
                <button key={l.to} className="nav-dropdown-item" onClick={() => go(l.to)}>
                  <span className="nav-dd-icon">{l.icon}</span>
                  <span>{l.label}</span>
                </button>
              ))}

              <div className="nav-dropdown-divider" />

              {/* Hotels */}
              <button className="nav-dropdown-item" onClick={() => go('/hotels')}>
                <span className="nav-dd-icon">🏨</span>
                <span>Hotels & Resorts</span>
              </button>

              <div className="nav-dropdown-divider" />

              {/* Switch resort */}
              <button className="nav-dropdown-item danger" onClick={() => { setOpen(false); clearActiveResort() }}>
                <span className="nav-dd-icon">🔀</span>
                <span>Switch Resort</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
