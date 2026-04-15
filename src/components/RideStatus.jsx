// Status display helpers
const STATUS_CONFIG = {
  OPERATING:     { label: 'Open',         emoji: '🟢', className: 'status-open' },
  DOWN:          { label: 'Down',         emoji: '🔴', className: 'status-down' },
  CLOSED:        { label: 'Closed',       emoji: '⚫', className: 'status-closed' },
  REFURBISHMENT: { label: 'Refurbishment',emoji: '🚧', className: 'status-refurb' },
  MANUAL_DOWN:   { label: 'Marked Down',  emoji: '🔴', className: 'status-down' },
  UNKNOWN:       { label: '—',            emoji: '⚪', className: 'status-unknown' },
}

export function RideStatusBadge({ live, manualDown, compact = false }) {
  const status = manualDown ? 'MANUAL_DOWN' : (live?.status || 'UNKNOWN')
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.UNKNOWN

  if (status === 'UNKNOWN' && !manualDown) return null

  return (
    <span className={`ride-status-badge ${cfg.className}${compact ? ' compact' : ''}`}>
      {cfg.emoji} {compact ? '' : cfg.label}
      {live?.waitTime != null && status === 'OPERATING' && !compact && (
        <span className="wait-time">{live.waitTime}m wait</span>
      )}
      {live?.waitTime != null && status === 'OPERATING' && compact && (
        <span className="wait-time">{live.waitTime}m</span>
      )}
    </span>
  )
}

export function WaitTimePill({ waitTime }) {
  if (waitTime == null) return null
  const color = waitTime < 20 ? '#10b981' : waitTime < 45 ? '#fbbf24' : '#ef4444'
  return (
    <span style={{
      padding: '2px 8px',
      borderRadius: 12,
      fontSize: '0.75rem',
      fontWeight: 800,
      background: `${color}20`,
      color,
      marginLeft: 4,
    }}>
      ⏱ {waitTime}m
    </span>
  )
}
