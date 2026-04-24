import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RESORTS, FOOD_DRINKS } from '../data'
import { useApp } from '../App'
import { useLiveData } from '../context/LiveDataContext'
import { useResortData } from '../useResortData'
import { ParkHoursCompact } from './ParkHours'

// ── Animated count-up number ──────────────────────────────────
function CountUp({ target, duration = 1000 }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (typeof target !== 'number' || target === 0) { setVal(target); return }
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setVal(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target])
  return <>{typeof target === 'string' ? target : val}</>
}

// ── Expandable Park Card ──────────────────────────────────────
function ParkCard({ park, index, checkedRides, personalMustRide }) {
  const [expanded,      setExpanded]      = useState(false)
  const [refreshing,    setRefreshing]    = useState(false)
  const [lastRefreshed, setLastRefreshed] = useState(null)
  const [debounced,     setDebounced]     = useState(false)
  const { getRideLive, refresh: refreshAll } = useLiveData()
  const navigate = useNavigate()

  const parkRides = park.lands.flatMap(l => l.rides)

  // #3 — Exclude refurb rides from progress denominator
  const rideableRides = parkRides.filter(r => {
    const live = getRideLive(r.name)
    return live?.status !== 'REFURBISHMENT'
  })
  const ridden = rideableRides.filter(r => checkedRides.has(r.id)).length
  const ppct   = rideableRides.length ? Math.round((ridden / rideableRides.length) * 100) : 0
  const left   = rideableRides.length - ridden
  const refurbCount = parkRides.length - rideableRides.length

  // Live wait summary for collapsed header
  const openRides     = parkRides.filter(r => getRideLive(r.name)?.status === 'OPERATING')
  const shortWaits    = openRides.filter(r => (getRideLive(r.name)?.waitTime ?? 99) < 20).length
  const downRides     = parkRides.filter(r => {
    const s = getRideLive(r.name)?.status
    return s === 'DOWN' || s === 'CLOSED'
  }).length

  // #10 — Manual refresh with 30s debounce
  const handleRefresh = useCallback(async (e) => {
    e.stopPropagation()
    if (debounced || refreshing) return
    setRefreshing(true)
    setDebounced(true)
    await refreshAll()
    setRefreshing(false)
    setLastRefreshed(new Date())
    setTimeout(() => setDebounced(false), 30000)
  }, [debounced, refreshing, refreshAll])

  return (
    <div
      className="rd-park-card-v2 animate-float-up"
      style={{ '--park-accent': park.accentColor, animationDelay: `${0.15 + index * 0.07}s` }}
    >
      {/* Collapsed header */}
      <div className="rd-park-card-header" onClick={() => setExpanded(v => !v)}>
        <div className="rd-park-color-strip" style={{ background: park.accentColor }} />
        <div className="rd-park-card-header-inner">
          <div className="rd-park-header-left">
            {PARK_LOGOS[park.id] ? (
              <img
                src={PARK_LOGOS[park.id]}
                alt={park.name}
                className="rd-park-logo"
              />
            ) : (
              <span className="rd-park-emoji">{park.emoji}</span>
            )}
            <div>
              {!PARK_LOGOS[park.id] && <div className="rd-park-name">{park.name}</div>}
              <div className="rd-park-meta">
                {rideableRides.length} rides
                {refurbCount > 0 && <span style={{ color: 'var(--warning)', marginLeft: 4 }}>· 🚧 {refurbCount} refurb</span>}
                {shortWaits > 0 && <span style={{ color: 'var(--success)', marginLeft: 4 }}>· {shortWaits} under 20m</span>}
                {downRides > 0  && <span style={{ color: 'var(--danger)',  marginLeft: 4 }}>· {downRides} down</span>}
              </div>
            </div>
          </div>
          <div className="rd-park-header-right">
            <span className="rd-park-pct" style={{ color: ppct === 100 ? '#10b981' : park.accentColor }}>
              {ppct}%
            </span>
            <span className="rd-expand-chevron" style={{ transition: 'transform 0.25s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="rd-park-bar progress-track" style={{ margin: '8px 14px 6px' }}>
          <div
            className="progress-fill"
            style={{
              width: `${ppct}%`,
              background: ppct === 100
                ? '#10b981'
                : `linear-gradient(to right, ${park.accentColor}cc, ${park.accentColor})`,
              transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 14px 8px', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
          <span>{ridden} ridden</span>
          {ppct === 100
            ? <span style={{ color: '#10b981' }}>🎉 Complete!</span>
            : <span>{left} to go · tap to expand</span>
          }
        </div>

        {/* Park hours */}
        <div style={{ padding: '0 14px 12px' }} onClick={e => e.stopPropagation()}>
          <ParkHoursCompact parkId={park.id} accentColor={park.accentColor} />
        </div>
      </div>

      {/* Expanded — RIDES ONLY, no food/shows */}
      {expanded && (
        <div className="rd-park-expanded animate-fade-in">
          <div className="rd-expand-section">
            {/* Rides header with refresh button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px 4px' }}>
              <div className="rd-expand-label" style={{ padding: 0 }}>🎢 Rides</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {lastRefreshed && (
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
                <button
                  className={`rd-refresh-btn${refreshing ? ' spinning' : ''}${debounced ? ' debounced' : ''}`}
                  onClick={handleRefresh}
                  title={debounced ? 'Wait 30s between refreshes' : 'Refresh wait times'}
                  disabled={refreshing}
                >
                  🔄
                </button>
              </div>
            </div>

            {park.lands.map(land => {
              if (!land.rides.length) return null
              return (
                <div key={land.id}>
                  <div className="rd-land-mini-label">{land.name}</div>
                  {land.rides.map(ride => {
                    const live     = getRideLive(ride.name)
                    const isRidden = checkedRides.has(ride.id)
                    const isMyMust = personalMustRide?.has(ride.id)
                    const isDown   = live?.status === 'DOWN' || live?.status === 'CLOSED'
                    const isRefurb = live?.status === 'REFURBISHMENT'
                    const wait     = live?.waitTime

                    return (
                      <div
                        key={ride.id}
                        className={`rd-ride-row${isRidden ? ' ridden' : ''}${isRefurb ? ' refurb' : ''}`}
                        onClick={() => navigate(`/ride/${ride.id}`)}
                      >
                        <div className={`rd-ride-dot${isRidden ? ' done' : isDown ? ' down' : isRefurb ? ' refurb' : wait != null ? ' live' : ''}`} />
                        <span className="rd-ride-name">
                          {ride.name}
                          {isRefurb && <span style={{ fontSize: '0.65rem', color: 'var(--warning)', marginLeft: 5 }}>🚧</span>}
                        </span>
                        <div className="rd-ride-right">
                          {isMyMust && <span style={{ fontSize: '0.75rem' }}>❤️</span>}
                          {ride.lightningLane && !isRefurb && <span className="badge badge-ll" style={{ fontSize: '0.6rem', padding: '1px 5px' }}>⚡</span>}
                          {isRefurb && <span style={{ fontSize: '0.68rem', color: 'var(--warning)', fontWeight: 800 }}>Refurb</span>}
                          {wait != null && !isDown && !isRefurb && (
                            <span style={{
                              fontSize: '0.75rem', fontWeight: 900,
                              color: wait < 20 ? 'var(--success)' : wait < 45 ? 'var(--warning)' : 'var(--danger)'
                            }}>
                              {wait}m
                            </span>
                          )}
                          {isDown && <span style={{ fontSize: '0.7rem', color: 'var(--danger)', fontWeight: 800 }}>🔴</span>}
                          {isRidden && !isRefurb && <span style={{ color: 'var(--success)', fontWeight: 900, fontSize: '0.85rem' }}>✓</span>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>

          {/* Full park guide button */}
          <div style={{ padding: '10px 14px 14px' }}>
            <Link
              to={`/park/${park.id}`}
              style={{
                display: 'block', textAlign: 'center', padding: '11px',
                background: park.accentColor,
                color: park.accentColor === '#f0b429' ? '#000' : '#fff',
                borderRadius: 'var(--r-md)', fontWeight: 800,
                fontSize: '0.88rem', textDecoration: 'none',
              }}
              onClick={e => e.stopPropagation()}
            >
              Open Full Park Guide →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Stat Widget ───────────────────────────────────────────────
function StatWidget({ icon, val, of, label, accentColor, delay }) {
  const pct = (of != null && typeof val === 'number') ? Math.round((val / of) * 100) : null
  return (
    <div className="rd-stat-widget animate-float-up" style={{ animationDelay: delay }}>
      <div className="rd-stat-widget-icon">{icon}</div>
      <div className="rd-stat-widget-num" style={{ color: accentColor }}>
        <CountUp target={typeof val === 'number' ? val : 0} />
        {typeof val === 'string' && val}
      </div>
      {of != null && (
        <div className="rd-stat-widget-of">/ {of}</div>
      )}
      <div className="rd-stat-widget-label">{label}</div>
      {pct !== null && (
        <div className="rd-stat-mini-bar">
          <div className="rd-stat-mini-fill" style={{ width: `${pct}%`, background: accentColor }} />
        </div>
      )}
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────
export default function ResortDashboard() {
  const { checkedRides, foundMickeys, triedDrinks, triedFood,
          personalMustRide, activeResort, activeResortId, isDisney } = useApp()
  const { lastRefresh, apiError, getRideLive } = useLiveData()
  const { parks: resortParks, mickeys } = useResortData()

  if (!activeResort) return null

  const allRides = activeResort.parks.flatMap(p => p.lands.flatMap(l => l.rides))

  // #3 — Exclude refurb rides from overall count too
  const rideableAll  = allRides.filter(r => getRideLive(r.name)?.status !== 'REFURBISHMENT')
  const riddenCount  = rideableAll.filter(r => checkedRides.has(r.id)).length
  const pct          = rideableAll.length ? Math.round((riddenCount / rideableAll.length) * 100) : 0

  const accentColor  = isDisney ? '#f0b429' : '#ff6b35'

  const stats = isDisney ? [
    { icon: '🎢', val: riddenCount,       of: rideableAll.length,                                      lbl: 'Rides Ridden',    delay: '0.1s'  },
    { icon: '🐭', val: foundMickeys.size, of: mickeys.length,                                          lbl: 'Mickeys Found',   delay: '0.18s' },
    { icon: '🌍', val: triedDrinks.size,  of: FOOD_DRINKS.drinkingAroundTheWorld.countries.length,     lbl: 'Countries Drank', delay: '0.26s' },
    { icon: '🍽️', val: triedFood.size,   of: FOOD_DRINKS.disneyWorldFood.length,                      lbl: 'Eats Tried',      delay: '0.34s' },
  ] : [
    { icon: '🎢', val: riddenCount,        of: rideableAll.length,                                     lbl: 'Rides Ridden',    delay: '0.1s'  },
    { icon: '🍽️', val: triedFood.size,    of: FOOD_DRINKS.universalFood.length,                       lbl: 'Eats Tried',      delay: '0.18s' },
    { icon: '🏆', val: pct,               of: null,                                                     lbl: 'Progress %',      delay: '0.26s' },
    { icon: '⚡', val: activeResort.parks.length, of: null,                                             lbl: 'Parks',           delay: '0.34s' },
  ]

  return (
    <div className="resort-dashboard animate-fade-in">

      {/* ── Hero ── */}
      <div className="rd-hero">
        <div className="rd-hero-content">
          <div className="rd-resort-label">YOUR RESORT</div>
          <h1 className="rd-resort-name">{activeResort.name}</h1>
          <p className="rd-resort-tagline">{activeResort.tagline}</p>
        </div>
      </div>

      {/* ── Full-width progress bar ── */}
      <div className="rd-global-progress">
        <div className="rd-global-progress-header">
          <span className="rd-global-progress-label">Overall Progress</span>
          <span className="rd-global-progress-pct" style={{ color: accentColor }}>
            <CountUp target={pct} />%
          </span>
        </div>
        <div className="rd-global-bar">
          <div
            className="rd-global-fill"
            style={{
              width: `${pct}%`,
              background: isDisney
                ? 'linear-gradient(to right, #7c3aed, #f0b429)'
                : 'linear-gradient(to right, #1a6fd4, #ff6b35)',
            }}
          />
        </div>
        <div className="rd-global-progress-sub">
          <span>{riddenCount} of {rideableAll.length} rides conquered</span>
          {lastRefresh && !apiError && (
            <span className="rd-live-pill">
              <span className="rd-live-dot" />
              Live · {lastRefresh.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      </div>

      <div className="rd-body">

        {/* ── Stats grid ── */}
        <div className="rd-stats-grid-v2">
          {stats.map(s => (
            <StatWidget
              key={s.lbl}
              icon={s.icon}
              val={s.val}
              of={s.of}
              label={s.lbl}
              accentColor={accentColor}
              delay={s.delay}
            />
          ))}
        </div>

        {/* ── Parks ── */}
        <div className="rd-section-label" style={{ marginTop: 8 }}>Parks</div>
        <div className="rd-parks-list">
          {activeResort.parks.map((park, i) => (
            <ParkCard
              key={park.id}
              park={park}
              index={i}
              checkedRides={checkedRides}
              personalMustRide={personalMustRide}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
