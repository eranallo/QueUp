import { NavLink } from 'react-router-dom'
import { useApp } from '../App'

export default function Nav() {
  const { activeResort, activeResortId, clearActiveResort, isDisney } = useApp()

  const links = [
    { to: '/',        label: 'Resort',  icon: '🏠' },
    { to: '/planner', label: 'Planner', icon: '📋' },
    { to: '/journal', label: 'Journal', icon: '📔' },
    ...(isDisney ? [{ to: '/mickeys', label: 'Mickeys', icon: '🐭' }] : []),
    { to: '/food',    label: 'Food',    icon: '🍹' },
  ]

  return (
    <>
      <nav className="nav">
        <NavLink to="/" className="nav-logo">
          <span style={{ fontSize: '1.5rem' }}>{activeResort?.emoji || '🏰'}</span>
          <div className="nav-logo-text-group">
            <span className="nav-logo-text">QUEUP</span>
            {activeResort && (
              <span className="nav-active-resort">
                {activeResortId === 'disney-world' ? 'Disney World' : 'Universal Orlando'}
              </span>
            )}
          </div>
        </NavLink>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} className={({ isActive }) => isActive ? 'active' : ''} end={l.to === '/'}>
                <span>{l.icon}</span> {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button className="switch-resort-btn" onClick={clearActiveResort}>
          🗺️ Switch Resort
        </button>
      </nav>

      <div className="bottom-tabs">
        <div className="bottom-tabs-inner">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `bottom-tab${isActive ? ' active' : ''}`} end={l.to === '/'}>
              <span className="tab-icon">{l.icon}</span>
              {l.label}
            </NavLink>
          ))}
          <button className="bottom-tab" onClick={clearActiveResort}>
            <span className="tab-icon">🗺️</span>
            Switch
          </button>
        </div>
      </div>
    </>
  )
}
