import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { RESORTS } from '../data'
import { useApp } from '../App'

const THRILL = ['', '😌 Gentle', '🌊 Mild', '🌀 Moderate', '🔥 Thrilling', '💀 Intense']

export default function ParkPage() {
  const { parkId } = useParams()
  const navigate = useNavigate()
  const { checkedRides, toggleRide } = useApp()
  const [search, setSearch] = useState('')
  const [filterMustDo, setFilterMustDo] = useState(false)
  const [filterLL, setFilterLL] = useState(false)

  const park = RESORTS.flatMap(r => r.parks).find(p => p.id === parkId)
  if (!park) return <div className="park-page"><p>Park not found.</p></div>

  const allRides = park.lands.flatMap(l => l.rides)
  const ridden = allRides.filter(r => checkedRides.has(r.id)).length
  const pct = allRides.length ? Math.round((ridden / allRides.length) * 100) : 0

  const matchesSearch = (ride) => !search || ride.name.toLowerCase().includes(search.toLowerCase())
  const matchesFilters = (ride) => (!filterMustDo || ride.mustDo) && (!filterLL || ride.lightningLane)

  return (
    <div className="park-page">
      {/* Back button */}
      <Link to="/" className="ride-detail-back">← All Parks</Link>

      {/* Header */}
      <div className="park-header" style={{ borderLeft: `4px solid ${park.accentColor}` }}>
        <div className="park-header-emoji">{park.emoji}</div>
        <div className="park-header-info">
          <h1 className="park-header-name">{park.name}</h1>
          <p className="park-header-desc">{park.description}</p>
          <div className="park-header-meta">
            <span className="park-meta-chip">📅 Opened {park.openingYear}</span>
            <span className="park-meta-chip">🎢 {allRides.length} Attractions</span>
            <span className="park-meta-chip" style={{ color: pct === 100 ? '#10b981' : 'inherit' }}>
              ✅ {ridden}/{allRides.length} Ridden
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="planner-progress" style={{ marginBottom: 24 }}>
        <div className="progress-label"><span>Ride Progress</span><span>{pct}%</span></div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Search + filter row */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28, alignItems: 'center' }}>
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            placeholder="Search rides…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className={`filter-btn${filterMustDo ? ' active' : ''}`} onClick={() => setFilterMustDo(v => !v)}>⭐ Must-Do</button>
        <button className={`filter-btn${filterLL ? ' active' : ''}`} onClick={() => setFilterLL(v => !v)}>⚡ Lightning Lane</button>
      </div>

      {/* Lands + rides */}
      {park.lands.map(land => {
        const visible = land.rides.filter(r => matchesSearch(r) && matchesFilters(r))
        if (!visible.length) return null
        return (
          <div key={land.id} className="land-section">
            <div className="land-title">
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: park.accentColor, display: 'inline-block' }} />
              {land.name}
            </div>
            <div className="rides-grid">
              {visible.map(ride => (
                <div
                  key={ride.id}
                  className={`ride-card${checkedRides.has(ride.id) ? ' checked' : ''}`}
                  onClick={() => navigate(`/ride/${ride.id}`)}
                >
                  <div className="ride-card-header">
                    <div className="ride-name">{ride.name}</div>
                    <div
                      className="ride-checkbox"
                      onClick={e => { e.stopPropagation(); toggleRide(ride.id) }}
                      title="Mark as ridden"
                    >
                      {checkedRides.has(ride.id) && '✓'}
                    </div>
                  </div>
                  <div className="ride-meta">
                    <span className={`ride-badge thrill-${ride.thrillLevel}`}>{THRILL[ride.thrillLevel]}</span>
                    {ride.heightRequirement && <span className="ride-badge height">📏 {ride.heightRequirement}"</span>}
                    {ride.mustDo && <span className="ride-badge must-do">⭐ Must-Do</span>}
                    {ride.lightningLane && <span className="ride-badge ll">⚡ LL</span>}
                    {ride.duration && <span className="ride-badge">⏱ {ride.duration}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
