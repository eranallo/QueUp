import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { RESORTS } from '../data'
import { useApp } from '../App'
import { useLiveData } from '../context/LiveDataContext'

const THRILL = ['', '😌 Gentle', '🌊 Mild', '🌀 Moderate', '🔥 Thrilling', '💀 Intense']

export default function ParkPage() {
  const { parkId }  = useParams()
  const navigate    = useNavigate()
  const { checkedRides, toggleRide, manualDown, toggleManualDown } = useApp()
  const { getRideLive, lastRefresh, apiError } = useLiveData()

  const [search,        setSearch]        = useState('')
  const [filterMustDo,  setFilterMustDo]  = useState(false)
  const [filterLL,      setFilterLL]      = useState(false)
  const [filterDown,    setFilterDown]    = useState(false)
  const [filterRidden,  setFilterRidden]  = useState(false)

  const park = useMemo(() => RESORTS.flatMap(r => r.parks).find(p => p.id === parkId), [parkId])
  if (!park) return <div className="park-page"><p>Park not found.</p></div>

  const allRides = park.lands.flatMap(l => l.rides)
  const ridden   = allRides.filter(r => checkedRides.has(r.id)).length
  const pct      = allRides.length ? Math.round((ridden / allRides.length) * 100) : 0

  // Flat search across ALL lands (for search results view)
  const searchTerm = search.trim().toLowerCase()
  const isSearching = searchTerm.length > 0

  const matchesRide = (ride) => {
    if (searchTerm && !ride.name.toLowerCase().includes(searchTerm)
        && !ride.type?.toLowerCase().includes(searchTerm)
        && !(ride.tags || []).some(t => t.includes(searchTerm))) return false
    if (filterMustDo && !ride.mustDo) return false
    if (filterLL && !ride.lightningLane) return false
    if (filterRidden && !checkedRides.has(ride.id)) return false
    if (filterDown) {
      const live = getRideLive(ride.name)
      const down = manualDown.has(ride.id) || (live && live.status !== 'OPERATING' && live.status !== 'UNKNOWN')
      if (!down) return false
    }
    return true
  }

  // Flat list for search results
  const searchResults = useMemo(() => {
    if (!isSearching && !filterMustDo && !filterLL && !filterDown && !filterRidden) return null
    return allRides.filter(matchesRide)
  }, [search, filterMustDo, filterLL, filterDown, filterRidden, checkedRides, manualDown])

  const RideCard = ({ ride, i, li = 0 }) => {
    const live   = getRideLive(ride.name)
    const isDown = manualDown.has(ride.id)
    const ridden = checkedRides.has(ride.id)
    const actuallyDown = isDown || live?.status === 'DOWN'

    return (
      <div
        className={`ride-card${ridden ? ' ridden' : ''}${actuallyDown ? ' is-down' : ''} animate-float-up`}
        style={{ animationDelay: `${(li * 0.06) + (i * 0.04)}s` }}
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
        {(live && live.status !== 'UNKNOWN') || isDown ? (
          <div className="live-inline">
            <div className={`live-dot ${isDown ? 'down' : { OPERATING: 'open', DOWN: 'down', CLOSED: 'closed', REFURBISHMENT: 'refurb' }[live?.status] || ''}`} />
            <span className="live-label" style={{
              color: isDown || live?.status === 'DOWN' ? 'var(--danger)'
                : live?.status === 'OPERATING' ? 'var(--success)' : 'var(--text-muted)'
            }}>
              {isDown ? 'Marked Down' : live?.status === 'OPERATING' ? 'Open' : live?.status === 'CLOSED' ? 'Closed' : live?.status === 'REFURBISHMENT' ? 'Refurb' : 'Down'}
            </span>
            {live?.waitTime != null && live.status === 'OPERATING' && !isDown && (
              <span className="live-wait" style={{ color: live.waitTime < 20 ? 'var(--success)' : live.waitTime < 45 ? 'var(--warning)' : 'var(--danger)' }}>
                · {live.waitTime}m
              </span>
            )}
          </div>
        ) : null}

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
  }

  return (
    <div className="park-page animate-fade-in">
      <button className="back-link" onClick={() => navigate('/')}>← Back to Resort</button>

      {/* Park header */}
      <div className="park-header" style={{ '--park-accent': park.accentColor }}>
        <div className="park-header-tint" style={{ background: `radial-gradient(ellipse at 80% 0%, ${park.accentColor}15, transparent 60%)` }} />
        <span className="park-header-emoji">{park.emoji}</span>
        <div className="park-header-left">
          <h1 className="park-header-name">{park.name}</h1>
          <p className="park-header-desc">{park.description}</p>
          <div className="park-chips">
            <span className="park-chip">📅 {park.openingYear}</span>
            <span className="park-chip">{allRides.length} attractions</span>
            <span className={`park-chip${pct === 100 ? ' accent' : ''}`}>{ridden}/{allRides.length} ridden</span>
            {lastRefresh && !apiError && <span className="park-chip accent">🟢 Live data</span>}
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

      {/* ── SEARCH BAR — prominent, full-width ── */}
      <div className="park-search-bar animate-float-up stagger-2">
        <div className="park-search-inner">
          <span className="park-search-icon">🔍</span>
          <input
            className="park-search-input"
            placeholder={`Search ${park.name} attractions…`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoComplete="off"
          />
          {search && (
            <button
              className="park-search-clear"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        {search && (
          <div className="park-search-count">
            {searchResults?.length ?? 0} result{searchResults?.length !== 1 ? 's' : ''} for "{search}"
          </div>
        )}
      </div>

      {/* Filter pills */}
      <div className="park-filters animate-float-up stagger-3">
        <button className={`filter-pill${filterMustDo ? ' on' : ''}`} onClick={() => setFilterMustDo(v => !v)}>⭐ Must-Do</button>
        <button className={`filter-pill${filterLL ? ' on' : ''}`} onClick={() => setFilterLL(v => !v)}>⚡ Lightning Lane</button>
        <button className={`filter-pill${filterRidden ? ' on' : ''}`} onClick={() => setFilterRidden(v => !v)}>✓ Ridden</button>
        <button className={`filter-pill${filterDown ? ' on' : ''}`} onClick={() => setFilterDown(v => !v)}>🔴 Down Rides</button>
        {(filterMustDo || filterLL || filterRidden || filterDown) && (
          <button className="filter-pill" onClick={() => { setFilterMustDo(false); setFilterLL(false); setFilterRidden(false); setFilterDown(false) }}>
            ✕ Clear
          </button>
        )}
      </div>

      {/* SEARCH RESULTS — flat list */}
      {searchResults !== null ? (
        <div>
          {searchResults.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <div className="empty-text">No rides match your search or filters.</div>
            </div>
          ) : (
            <div className="rides-grid">
              {searchResults.map((ride, i) => <RideCard key={ride.id} ride={ride} i={i} />)}
            </div>
          )}
        </div>
      ) : (
        /* NORMAL VIEW — by land */
        park.lands.map((land, li) => {
          const rides = land.rides
          return (
            <div key={land.id} className="land-section animate-float-up" style={{ animationDelay: `${li * 0.06}s` }}>
              <div className="land-label">
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: park.accentColor, flexShrink: 0 }} />
                <span>{land.name}</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  {rides.filter(r => checkedRides.has(r.id)).length}/{rides.length}
                </span>
              </div>
              <div className="rides-grid">
                {rides.map((ride, i) => <RideCard key={ride.id} ride={ride} i={i} li={li} />)}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
