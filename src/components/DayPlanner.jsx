import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RESORTS } from '../data'
import { useApp } from '../App'

export default function DayPlanner() {
  const { checkedRides, toggleRide } = useApp()
  const [activeFilter, setActiveFilter] = useState('all')
  const [showDone, setShowDone] = useState(true)

  const allParks = RESORTS.flatMap(r => r.parks)
  const allRides = allParks.flatMap(p => p.lands.flatMap(l => l.rides.map(r => ({ ...r, parkId: p.id, parkName: p.name, parkEmoji: p.emoji, parkColor: p.accentColor, landName: l.name }))))

  const filteredRides = allRides.filter(r => {
    if (activeFilter !== 'all' && r.parkId !== activeFilter) return false
    if (!showDone && checkedRides.has(r.id)) return false
    return true
  })

  const total = filteredRides.length
  const done = filteredRides.filter(r => checkedRides.has(r.id)).length
  const pct = total ? Math.round((done / total) * 100) : 0

  const grouped = filteredRides.reduce((acc, ride) => {
    const key = `${ride.parkId}`
    if (!acc[key]) acc[key] = { parkName: ride.parkName, parkEmoji: ride.parkEmoji, parkColor: ride.parkColor, rides: [] }
    acc[key].rides.push(ride)
    return acc
  }, {})

  return (
    <div className="planner-page">
      <div className="planner-header">
        <h1 className="planner-title">📋 Day Planner</h1>
        <p className="planner-subtitle">Check off every ride you conquer. Progress saves automatically.</p>
      </div>

      {/* Overall progress */}
      <div className="planner-progress">
        <div className="progress-label">
          <span>Overall Progress</span>
          <span>{done} / {total} ({pct}%)</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Filters */}
      <div className="planner-park-filter">
        <button className={`filter-btn${activeFilter === 'all' ? ' active' : ''}`} onClick={() => setActiveFilter('all')}>🗺️ All Parks</button>
        {allParks.map(p => (
          <button key={p.id} className={`filter-btn${activeFilter === p.id ? ' active' : ''}`} onClick={() => setActiveFilter(p.id)}>
            {p.emoji} {p.name.split(" ")[0]}
          </button>
        ))}
      </div>
      <div style={{ marginBottom: 20 }}>
        <button className={`filter-btn${!showDone ? ' active' : ''}`} onClick={() => setShowDone(v => !v)}>
          {showDone ? '👁 Hide Completed' : '👁 Show Completed'}
        </button>
      </div>

      {/* Grouped lists */}
      {Object.values(grouped).map(group => (
        <div key={group.parkName} style={{ marginBottom: 36 }}>
          <h2 className="planner-section-title" style={{ color: group.parkColor }}>
            {group.parkEmoji} {group.parkName}
          </h2>
          <div className="planner-checklist">
            {group.rides.map(ride => {
              const isDone = checkedRides.has(ride.id)
              return (
                <div key={ride.id} className={`planner-item${isDone ? ' done' : ''}`} onClick={() => toggleRide(ride.id)}>
                  <div className="planner-check-circle">{isDone && '✓'}</div>
                  <div style={{ flex: 1 }}>
                    <div className="planner-item-name">{ride.name}</div>
                    <div className="planner-item-meta">
                      <span>{ride.landName}</span>
                      {ride.heightRequirement && <span>📏 {ride.heightRequirement}"</span>}
                      {ride.mustDo && <span style={{ color: 'var(--gold)' }}>⭐ Must-Do</span>}
                      {ride.lightningLane && <span style={{ color: '#a78bfa' }}>⚡ LL</span>}
                    </div>
                  </div>
                  <Link to={`/ride/${ride.id}`} onClick={e => e.stopPropagation()} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', padding: '4px 8px' }}>
                    Info →
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {filteredRides.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🎉</div>
          <div className="empty-state-text">All done! You've conquered every ride!</div>
        </div>
      )}
    </div>
  )
}
