import { NavLink } from 'react-router-dom'

const links = [
  { to: '/',        label: 'Home',    icon: '✨' },
  { to: '/planner', label: 'Planner', icon: '📋' },
  { to: '/mickeys', label: 'Mickeys', icon: '🐭' },
  { to: '/food',    label: 'Food',    icon: '🍹' },
]

function formatTime(date) {
  if (!date) return null
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function Nav({ statusLoading, lastRefreshed, refreshStatus }) {
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

        {/* Live status indicator */}
        <button
          onClick={refreshStatus}
          title="Refresh live ride status"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 20, padding: '5px 12px', cursor: 'pointer',
            color: statusLoading ? 'var(--text-muted)' : '#10b981',
            fontSize: '0.75rem', fontWeight: 700, fontFamily: 'Nunito, sans-serif',
            transition: 'all 0.2s',
          }}
        >
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: statusLoading ? '#6b7280' : '#10b981',
            display: 'inline-block',
            animation: statusLoading ? 'none' : 'pulse 2s ease-in-out infinite',
          }} />
          {statusLoading ? 'Updating…' : `Live · ${formatTime(lastRefreshed) || '—'}`}
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
        </div>
      </div>
    </>
  )
}
