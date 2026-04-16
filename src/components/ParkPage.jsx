import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { RESORTS } from '../data'
import { useApp } from '../App'
import { useLiveData } from '../context/LiveDataContext'

const THRILL = ['', '😌 Gentle', '🌊 Mild', '🌀 Moderate', '🔥 Thrilling', '💀 Intense']
const LIVE_STATUS = {
  OPERATING: { dot: 'open',   label: 'Open' },
  DOWN:      { dot: 'down',   label: 'Down' },
  CLOSED:    { dot: 'closed', label: 'Closed' },
  REFURBISHMENT: { dot: 'refurb', label: 'Refurb' },
}

export default function ParkPage() {
  const { parkId } = useParams()
  const navigate = useNavigate()
  const { checkedRides, toggleRide, manualDown, toggleManualDown } = useApp()
  const { getRideLive, lastRefresh, apiError } = useLiveData()
  const [search, setSearch] = useState('')
  const [filterMustDo, setFilterMustDo] = useState(false)
  const [filterLL, setFilterLL] = useState(false)
  const [filterDown, setFilterDown] = useState(false)

  const park = RESORTS.flatMap(r => r.parks).find(p => p.id === parkId)
  if (!park) return <div className="park-page"><p>Park not found.</p></div>

  const allRides  = park.lands.flatMap(l => l.rides)
  const ridden    = allRides.filter(r => checkedRides.has(r.id)).length
  const pct       = allRides.length ? Math.round((ridden / allRides.length) * 100) : 0

  const visible = (ride) => {
    if (search && !ride.name.toLowerCase().includes(search.toLowerCase())) return false
    if (filterMustDo && !ride.mustDo) return false
    if (filterLL && !ride.lightningLane) return false
    if (filterDown) {
      const live = getRideLive(ride.name)
      const down = manualDown.has(ride.id) || (live && live.status !== 'OPERATING' && live.status !== 'UNKNOWN')
      if (!down) return false
    }
    return true
  }

  return (
    <div className="park-page animate-fade-in">
      <button className="back-link" onClick={() => navigate('/')}>← Back to Resort</button>

      {/* Park header */}
      <div
        className="park-header"
        style={{ '--park-accent': park.accentColor, '--park-tint': `${park.accentColor}0a` }}
      >
        <div className="park-header-tint" style={{ background: `radial-gradient(ellipse at 80% 0%, ${park.accentColor}15, transparent 60%)` }} />
        <span className="park-header-emoji">{park.emoji}</span>
        <div className="park-header-left">
          <h1 className="park-header-name">{park.name}</h1>
          <p className="park-header-desc">{park.description}</p>
          <div className="park-chips">
            <span className="park-chip">📅 {park.openingYear}</span>
            <span className="park-chip">{allRides.length} attractions</span>
            <span className={`park-chip${pct === 100 ? ' accent' : ''}`}>{ridden}/{allRides.length} ridden</span>
            {lastRefresh && !apiError && <span className="park-chip accent">🟢 Live</span>}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="park-progress animate-float-up stagger-1">
        <div className="park-progress-label"><span>Park Progress</span><span>{pct}%</span></div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%`, background: park.accentColor }} />
        </div>
      </div>

      {/* Filters */}
      <div className="park-filters animate-float-up stagger-2">
        <div className="search-wrap">
          <i className="icon">🔍</i>
          <input className="search-input" placeholder="Search rides…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className={`filter-pill${filterMustDo ? ' on' : ''}`} onClick={() => setFilterMustDo(v => !v)}>⭐ Must-Do</button>
        <button className={`filter-pill${filterLL ? ' on' : ''}`} onClick={() => setFilterLL(v => !v)}>⚡ Lightning Lane</button>
        <button className={`filter-pill${filterDown ? ' on' : ''}`} onClick={() => setFilterDown(v => !v)}>🔴 Down Rides</button>
      </div>

      {/* Lands */}
      {park.lands.map((land, li) => {
        const rides = land.rides.filter(visible)
        if (!rides.length) return null
        return (
          <div key={land.id} className="land-section animate-float-up" style={{ animationDelay: `${li * 0.06}s` }}>
            <div className="land-label">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: park.accentColor, flexShrink: 0 }} />
              <span>{land.name}</span>
            </div>
            <div className="rides-grid">
              {rides.map((ride, ri) => {
                const live    = getRideLive(ride.name)
                const isDown  = manualDown.has(ride.id)
                const ridden  = checkedRides.has(ride.id)
                const liveStatus = LIVE_STATUS[live?.status] || null
                const actuallyDown = isDown || live?.status === 'DOWN'

                return (
                  <div
                    key={ride.id}
                    className={`ride-card${ridden ? ' ridden' : ''}${actuallyDown ? ' is-down' : ''} animate-float-up`}
                    style={{ animationDelay: `${(li * 0.06) + (ri * 0.04)}s` }}
                    onClick={() => navigate(`/ride/${ride.id}`)}
                  >
                    <div className="ride-card-header">
                      <div className="ride-name">{ride.name}</div>
                      <div
                        className="ridden-dot"
                        onClick={e => { e.stopPropagation(); toggleRide(ride.id) }}
                        title="Mark as ridden"
                      >
                        {ridden && '✓'}
                      </div>
                    </div>

                    {/* Live status */}
                    {(liveStatus || isDown) && (
                      <div className="live-inline">
                        <div className={`live-dot ${isDown ? 'down' : liveStatus?.dot || ''}`} />
                        <span className="live-label" style={{ color: isDown || live?.status === 'DOWN' ? 'var(--danger)' : live?.status === 'OPERATING' ? 'var(--success)' : 'var(--text-muted)' }}>
                          {isDown ? 'Marked Down' : liveStatus?.label}
                        </span>
                        {live?.waitTime != null && live.status === 'OPERATING' && !isDown && (
                          <span className="live-wait" style={{ color: live.waitTime < 20 ? 'var(--success)' : live.waitTime < 45 ? 'var(--warning)' : 'var(--danger)' }}>
                            · {live.waitTime}m
                          </span>
                        )}
                      </div>
                    )}

                    <div className="ride-badges">
                      <span className={`badge badge-thrill-${ride.thrillLevel}`}>{THRILL[ride.thrillLevel]}</span>
                      {ride.heightRequirement && <span className="badge">📏 {ride.heightRequirement}"</span>}
                      {ride.mustDo && <span className="badge badge-mustdo">⭐ Must-Do</span>}
                      {ride.lightningLane && <span className="badge badge-ll">⚡ LL</span>}
                      {ride.duration && <span className="badge">{ride.duration}</span>}
                    </div>

                    <button
                      className={`mark-down-btn${isDown ? ' active' : ''}`}
                      onClick={e => { e.stopPropagation(); toggleManualDown(ride.id) }}
                    >
                      {isDown ? '🔴 Marked Down — tap to clear' : '⬤ Mark as Down'}
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
