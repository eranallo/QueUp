import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RESORTS } from '../data'
import { useApp } from '../App'

export default function DayPlanner() {
  const { checkedRides, toggleRide, activeResort } = useApp()
  const [activeFilter, setActiveFilter] = useState('all')
  const [hideDone, setHideDone] = useState(false)

  if (!activeResort) return null

  const allRides = activeResort.parks.flatMap(p =>
    p.lands.flatMap(l => l.rides.map(r => ({
      ...r, parkId: p.id, parkName: p.name,
      parkEmoji: p.emoji, parkColor: p.accentColor, landName: l.name,
    })))
  )

  const filtered = allRides.filter(r => {
    if (activeFilter !== 'all' && r.parkId !== activeFilter) return false
    if (hideDone && checkedRides.has(r.id)) return false
    return true
  })

  const done  = filtered.filter(r => checkedRides.has(r.id)).length
  const pct   = filtered.length ? Math.round((done / filtered.length) * 100) : 0

  const grouped = filtered.reduce((acc, ride) => {
    if (!acc[ride.parkId]) acc[ride.parkId] = { name: ride.parkName, emoji: ride.parkEmoji, color: ride.parkColor, rides: [] }
    acc[ride.parkId].rides.push(ride)
    return acc
  }, {})

  return (
    <div className="planner-page animate-fade-in">
      <h1 className="page-title">📋 Day Planner</h1>
      <p className="page-subtitle">Check off every conquest. Progress saves automatically.</p>

      {/* Overall progress */}
      <div className="park-progress animate-float-up stagger-1" style={{ marginBottom: 24 }}>
        <div className="park-progress-label">
          <span>Progress</span>
          <span>{done} / {filtered.length} ({pct}%)</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Park filters */}
      <div className="planner-filters animate-float-up stagger-2">
        <button className={`filter-pill${activeFilter === 'all' ? ' on' : ''}`} onClick={() => setActiveFilter('all')}>🗺️ All Parks</button>
        {activeResort.parks.map(p => (
          <button key={p.id} className={`filter-pill${activeFilter === p.id ? ' on' : ''}`} onClick={() => setActiveFilter(p.id)}>
            {p.emoji} {p.name.split(' ')[0]}
          </button>
        ))}
        <button className={`filter-pill${hideDone ? ' on' : ''}`} onClick={() => setHideDone(v => !v)} style={{ marginLeft: 'auto' }}>
          {hideDone ? '👁 Show Done' : '👁 Hide Done'}
        </button>
      </div>

      {/* Grouped checklists */}
      {Object.values(grouped).map((group, gi) => (
        <div key={group.name} style={{ marginBottom: 36 }}>
          <div className="land-label" style={{ marginBottom: 14, borderLeftColor: group.color }}>
            <span style={{ color: group.color }}>{group.emoji} {group.name}</span>
          </div>
          <div className="checklist">
            {group.rides.map((ride, ri) => {
              const done = checkedRides.has(ride.id)
              return (
                <div
                  key={ride.id}
                  className={`check-item${done ? ' done' : ''} animate-float-up`}
                  style={{ animationDelay: `${ri * 0.03}s` }}
                  onClick={() => toggleRide(ride.id)}
                >
                  <div className="check-circle">{done && '✓'}</div>
                  <div style={{ flex: 1 }}>
                    <div className="check-item-name">{ride.name}</div>
                    <div className="check-item-meta">
                      {ride.landName}
                      {ride.heightRequirement && ` · 📏 ${ride.heightRequirement}"`}
                      {ride.mustDo && ' · ⭐ Must-Do'}
                      {ride.lightningLane && ' · ⚡ LL'}
                    </div>
                  </div>
                  <Link to={`/ride/${ride.id}`} onClick={e => e.stopPropagation()} style={{ fontSize: '0.78rem', color: 'var(--text-muted)', padding: '4px 8px' }}>
                    Info →
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🎉</div>
          <div className="empty-text">Every ride conquered! What a day.</div>
        </div>
      )}
    </div>
  )
}
