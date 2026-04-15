import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { RESORTS } from '../data'
import { useApp } from '../App'
import { getRideLiveData, getRideImage, STATUS_CONFIG } from '../services/liveStatus'

const THRILL = ['', '😌 Gentle', '🌊 Mild', '🌀 Moderate', '🔥 Thrilling', '💀 Intense']

function StatusBadge({ rideName, parkId }) {
  const { liveStatus, manualDown } = useApp()
  const live = getRideLiveData(rideName, parkId, liveStatus)

  // Manual override takes priority
  const rideKey = `${parkId}::${rideName}`
  if (manualDown.has(rideKey)) {
    const cfg = STATUS_CONFIG.MANUAL_DOWN
    return (
      <span className="ride-badge" style={{ background: cfg.bg, color: cfg.color, fontWeight: 800 }}>
        {cfg.icon} {cfg.label}
      </span>
    )
  }

  if (!live) return null
  const cfg = STATUS_CONFIG[live.status] || STATUS_CONFIG.OPERATING
  if (live.status === 'OPERATING' && live.waitTime != null) {
    return (
      <span className="ride-badge" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', fontWeight: 700 }}>
        ✅ {live.waitTime} min wait
      </span>
    )
  }
  if (live.status === 'OPERATING') return null // no badge needed if operating w/ no wait data
  return (
    <span className="ride-badge" style={{ background: cfg.bg, color: cfg.color, fontWeight: 800 }}>
      {cfg.icon} {cfg.label}
    </span>
  )
}

export default function ParkPage() {
  const { parkId } = useParams()
  const navigate = useNavigate()
  const { checkedRides, toggleRide, manualDown, toggleDown, liveStatus, parkImages } = useApp()
  const [search, setSearch] = useState('')
  const [filterMustDo, setFilterMustDo] = useState(false)
  const [filterLL, setFilterLL] = useState(false)
  const [filterDown, setFilterDown] = useState(false)

  const park = RESORTS.flatMap(r => r.parks).find(p => p.id === parkId)
  if (!park) return <div className="park-page"><p>Park not found.</p></div>

  const allRides = park.lands.flatMap(l => l.rides)
  const ridden = allRides.filter(r => checkedRides.has(r.id)).length
  const pct = allRides.length ? Math.round((ridden / allRides.length) * 100) : 0

  // Count how many rides are currently down
  const downCount = allRides.filter(r => {
    const key = `${parkId}::${r.name}`
    if (manualDown.has(key)) return true
    const live = getRideLiveData(r.name, parkId, liveStatus)
    return live?.status === 'DOWN' || live?.status === 'CLOSED'
  }).length

  const isRideDown = (ride) => {
    const key = `${parkId}::${ride.name}`
    if (manualDown.has(key)) return true
    const live = getRideLiveData(ride.name, parkId, liveStatus)
    return live?.status === 'DOWN' || live?.status === 'CLOSED' || live?.status === 'REFURBISHMENT'
  }

  const matchesSearch = (ride) => !search || ride.name.toLowerCase().includes(search.toLowerCase())
  const matchesFilters = (ride) => {
    if (filterMustDo && !ride.mustDo) return false
    if (filterLL && !ride.lightningLane) return false
    if (filterDown && !isRideDown(ride)) return false
    return true
  }

  return (
    <div className="park-page">
      <Link to="/" className="ride-detail-back">← All Parks</Link>

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
            {downCount > 0 && (
              <span className="park-meta-chip" style={{ color: '#ef4444' }}>
                🚫 {downCount} Down
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="planner-progress" style={{ marginBottom: 24 }}>
        <div className="progress-label"><span>Ride Progress</span><span>{pct}%</span></div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Filters */}
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
        {downCount > 0 && (
          <button className={`filter-btn${filterDown ? ' active' : ''}`} onClick={() => setFilterDown(v => !v)} style={filterDown ? { borderColor: '#ef4444', color: '#ef4444' } : {}}>
            🚫 Show Down Only
          </button>
        )}
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
              {visible.map(ride => {
                const isChecked = checkedRides.has(ride.id)
                const manualKey = `${parkId}::${ride.name}`
                const isManualDown = manualDown.has(manualKey)
                const live = getRideLiveData(ride.name, parkId, liveStatus)
                const apiImage = getRideImage(ride.name, parkId, parkImages)
                const imageSrc = apiImage || ride.imageUrl || null
                const isDown = isRideDown(ride)

                return (
                  <div
                    key={ride.id}
                    className={`ride-card${isChecked ? ' checked' : ''}${isDown ? ' ride-down' : ''}`}
                    onClick={() => navigate(`/ride/${ride.id}`)}
                    style={isDown ? { opacity: 0.7, borderColor: 'rgba(239,68,68,0.4)' } : {}}
                  >
                    {/* Thumbnail image if available */}
                    {imageSrc && (
                      <div style={{
                        width: '100%', height: 120, overflow: 'hidden',
                        borderRadius: 'var(--radius-md)', marginBottom: 12,
                        background: `linear-gradient(135deg, ${park.gradientFrom || '#111'}, var(--bg-deepest))`,
                      }}>
                        <img
                          src={imageSrc}
                          alt={ride.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          onError={e => { e.target.parentElement.style.display = 'none' }}
                        />
                      </div>
                    )}

                    <div className="ride-card-header">
                      <div className="ride-name">{ride.name}</div>
                      <div
                        className="ride-checkbox"
                        onClick={e => { e.stopPropagation(); toggleRide(ride.id) }}
                        title="Mark as ridden"
                      >
                        {isChecked && '✓'}
                      </div>
                    </div>

                    <div className="ride-meta">
                      <span className={`ride-badge thrill-${ride.thrillLevel}`}>{THRILL[ride.thrillLevel]}</span>
                      {ride.heightRequirement && <span className="ride-badge height">📏 {ride.heightRequirement}"</span>}
                      {ride.mustDo && <span className="ride-badge must-do">⭐ Must-Do</span>}
                      {ride.lightningLane && <span className="ride-badge ll">⚡ LL</span>}
                      <StatusBadge rideName={ride.name} parkId={parkId} />
                      {/* Wait time if operating */}
                      {live?.status === 'OPERATING' && live?.waitTime != null && (
                        <span className="ride-badge" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', fontWeight: 700 }}>
                          ✅ {live.waitTime} min
                        </span>
                      )}
                    </div>

                    {/* Manual down toggle */}
                    <button
                      className="manual-down-btn"
                      onClick={e => { e.stopPropagation(); toggleDown(manualKey) }}
                      title={isManualDown ? 'Clear reported-down status' : 'Report this ride as down'}
                      style={{
                        marginTop: 10,
                        padding: '4px 10px',
                        borderRadius: 10,
                        border: `1px solid ${isManualDown ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.08)'}`,
                        background: isManualDown ? 'rgba(249,115,22,0.15)' : 'transparent',
                        color: isManualDown ? '#f97316' : 'var(--text-muted)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'Nunito, sans-serif',
                        transition: 'all 0.2s',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      {isManualDown ? '⚠️ Clear Down Report' : '⚠️ Report Down'}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
