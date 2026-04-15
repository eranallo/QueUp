import { NavLink } from 'react-router-dom'

const links = [
  { to: '/',        label: 'Home',    icon: '✨' },
  { to: '/planner', label: 'Planner', icon: '📋' },
  { to: '/mickeys', label: 'Mickeys', icon: '🐭' },
  { to: '/food',    label: 'Food',    icon: '🍹' },
]

export default function Nav() {
  return (
    <>
      {/* Desktop top nav */}
      <nav className="nav">
        <NavLink to="/" className="nav-logo">
          <span>🏰</span>
          <span className="nav-logo-text">QUEUP</span>
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
        </div>
      </div>
    </>
  )
}
