import { NavLink } from 'react-router-dom'
import { useApp } from '../App'

const links = [
  { to: '/',        label: 'Home',    icon: '✨' },
  { to: '/planner', label: 'Planner', icon: '📋' },
  { to: '/mickeys', label: 'Mickeys', icon: '🐭' },
  { to: '/food',    label: 'Food',    icon: '🍹' },
]

export default function Nav() {
  const { activePark, clearActivePark } = useApp()

  return (
    <>
      <nav className="nav">
        <NavLink to="/" className="nav-logo">
          <span>{activePark?.emoji || '🏰'}</span>
          <div className="nav-logo-text-group">
            <span className="nav-logo-text">QUEUP</span>
            {activePark && (
              <span className="nav-active-park">{activePark.name}</span>
            )}
          </div>
        </NavLink>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} className={({ isActive }) => isActive ? 'active' : ''} end={l.to === '/'}>
                <span>{l.icon}</span>{l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button className="switch-park-btn" onClick={clearActivePark} title="Switch park">
          🗺️ Switch Park
        </button>
      </nav>

      {/* Mobile bottom tabs */}
      <div className="bottom-tabs">
        <div className="bottom-tabs-inner">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `bottom-tab${isActive ? ' active' : ''}`} end={l.to === '/'}>
              <span className="tab-icon">{l.icon}</span>
              {l.label}
            </NavLink>
          ))}
          <button className="bottom-tab" onClick={clearActivePark} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <span className="tab-icon">🗺️</span>
            Switch
          </button>
        </div>
      </div>
    </>
  )
}
