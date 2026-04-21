import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RESORTS, HIDDEN_MICKEYS, FOOD_DRINKS } from '../data'
import { useApp } from '../App'
import { useLiveData } from '../context/LiveDataContext'
import { getHotelsByResort } from '../hotelsData'
import { ParkHoursCompact } from './ParkHours'

// Shows per park (matches DayPlanner's PARK_SHOWS)
const PARK_SHOWS = {
  'magic-kingdom':             ["Mickey's Royal Friendship Faire", "Happily Ever After (Fireworks)", "Main Street Electrical Parade", "Mickey's PhilharMagic", "Move It! Shake It! MousekeDance It!"],
  'epcot':                     ["EPCOT Forever (Fireworks)", "Harmonious", "Candlelight Processional (seasonal)", "The American Adventure", "Turtle Talk with Crush"],
  'hollywood-studios':         ["Fantasmic!", "Star Wars: A Galactic Spectacular", "Indiana Jones Epic Stunt Spectacular", "Beauty and the Beast Live on Stage", "Disney Junior Play & Dance"],
  'animal-kingdom':            ["Festival of the Lion King", "Finding Nemo: The Big Blue...and Beyond!", "UP! A Great Bird Adventure"],
  'universal-studios-florida': ["The Bourne Stuntacular", "Universal's Horror Make-Up Show"],
  'islands-of-adventure':      ["Poseidon's Fury"],
  'epic-universe':             ["How to Train Your Dragon Live Show", "Universal Monsters Live"],
}

// Map park IDs → food categories
const PARK_FOOD_MAP = {
  'magic-kingdom':             'Magic Kingdom',
  'epcot':                     'EPCOT',
  'hollywood-studios':         'Hollywood Studios',
  'animal-kingdom':            'Animal Kingdom',
  'universal-studios-florida': ['Wizarding World', 'Springfield'],
  'islands-of-adventure':      'Wizarding World',
  'epic-universe':             'Epic Universe',
}

const TIER_COLOR = {
  'Deluxe': '#f0b429', 'Moderate': '#60a5fa', 'Value': '#34d399',
  'Premier': '#c084fc', 'Preferred': '#f97316',
}

// ── Expandable Park Card ──────────────────────────────────────
function ParkCard({ park, index, checkedRides, personalMustRide }) {
  const [expanded, setExpanded] = useState(false)
  const { getRideLive } = useLiveData()
  const navigate = useNavigate()

  const parkRides = park.lands.flatMap(l => l.rides)
  const ridden    = parkRides.filter(r => checkedRides.has(r.id)).length
  const ppct      = parkRides.length ? Math.round((ridden / parkRides.length) * 100) : 0
  const left      = parkRides.length - ridden

  // Food for this park
  const catKey   = PARK_FOOD_MAP[park.id]
  const cats     = Array.isArray(catKey) ? catKey : catKey ? [catKey] : []
  const parkFood = [...(FOOD_DRINKS.disneyWorldFood || []), ...(FOOD_DRINKS.universalFood || [])]
    .filter(f => cats.includes(f.category))

  // Shows for this park
  const parkShows = PARK_SHOWS[park.id] || []

  return (
    <div
      className="rd-park-card-v2 animate-float-up"
      style={{ '--park-accent': park.accentColor, animationDelay: `${0.15 + index * 0.06}s` }}
    >
      {/* Card header — always visible */}
      <div className="rd-park-card-header" onClick={() => setExpanded(v => !v)}>
        <div className="rd-park-color-strip" style={{ background: park.accentColor }} />
        <div className="rd-park-card-header-inner">
          <div className="rd-park-header-left">
            <span className="rd-park-emoji">{park.emoji}</span>
            <div>
              <div className="rd-park-name">{park.name}</div>
              <div className="rd-park-meta">{parkRides.length} rides · {park.lands.length} lands · est. {park.openingYear}</div>
            </div>
          </div>
          <div className="rd-park-header-right">
            <span className="rd-park-pct" style={{ color: ppct === 100 ? '#10b981' : park.accentColor }}>{ppct}%</span>
            <span className="rd-expand-chevron" style={{ color: 'var(--text-muted)', transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="rd-park-bar progress-track" style={{ margin: '8px 14px 10px' }}>
          <div className="progress-fill" style={{ width: `${ppct}%`, background: park.accentColor }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 14px 8px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>
          <span>{ridden} ridden</span>
          {left > 0 ? <span>{left} to go · tap to expand</span> : <span style={{ color: '#10b981' }}>✓ Complete!</span>}
        </div>
        <div style={{ padding: '0 14px 12px' }} onClick={e => e.stopPropagation()}>
          <ParkHoursCompact parkId={park.id} accentColor={park.accentColor} />
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="rd-park-expanded animate-fade-in">

          {/* ── RIDES ── */}
          <div className="rd-expand-section">
            <div className="rd-expand-label">🎢 Rides</div>
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
                    const wait     = live?.waitTime

                    return (
                      <div
                        key={ride.id}
                        className={`rd-ride-row${isRidden ? ' ridden' : ''}`}
                        onClick={() => navigate(`/ride/${ride.id}`)}
                      >
                        <div className={`rd-ride-dot${isRidden ? ' done' : isDown ? ' down' : wait != null ? ' live' : ''}`} />
                        <span className="rd-ride-name">{ride.name}</span>
                        <div className="rd-ride-right">
                          {isMyMust && <span style={{ fontSize: '0.75rem' }}>❤️</span>}
                          {ride.lightningLane && <span className="badge badge-ll" style={{ fontSize: '0.6rem', padding: '1px 5px' }}>⚡</span>}
                          {wait != null && !isDown && (
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: wait < 20 ? 'var(--success)' : wait < 45 ? 'var(--warning)' : 'var(--danger)' }}>
                              {wait}m
                            </span>
                          )}
                          {isDown && <span style={{ fontSize: '0.7rem', color: 'var(--danger)', fontWeight: 800 }}>🔴</span>}
                          {isRidden && <span style={{ color: 'var(--success)', fontWeight: 900, fontSize: '0.8rem' }}>✓</span>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>

          {/* ── FOOD & DRINKS ── */}
          {parkFood.length > 0 && (
            <div className="rd-expand-section">
              <div className="rd-expand-label">🍽️ Food & Drinks</div>
              {parkFood.map(food => (
                <div key={food.id} className="rd-food-row" onClick={() => navigate('/food')}>
                  <span className="rd-food-name">{food.name}</span>
                  <div className="rd-ride-right">
                    {food.mustTry && <span className="badge badge-mustdo" style={{ fontSize: '0.6rem', padding: '1px 5px' }}>⭐</span>}
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 700 }}>{food.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── SHOWS & ENTERTAINMENT ── */}
          {parkShows.length > 0 && (
            <div className="rd-expand-section">
              <div className="rd-expand-label">🎭 Shows & Entertainment</div>
              {parkShows.map(show => (
                <div key={show} className="rd-food-row">
                  <span className="rd-food-name">{show}</span>
                </div>
              ))}
            </div>
          )}

          {/* Go to full park page */}
          <div style={{ padding: '10px 14px 14px' }}>
            <Link
              to={`/park/${park.id}`}
              className="btn-primary ridden-state"
              style={{ display: 'block', textAlign: 'center', padding: '10px', border: 'none', background: park.accentColor, color: park.accentColor === '#f0b429' ? '#000' : '#fff', borderRadius: 'var(--r-md)', fontWeight: 800, fontSize: '0.88rem', textDecoration: 'none' }}
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

// ── Hotel Card ────────────────────────────────────────────────
function HotelCard({ hotel, index }) {
  const tierColor = TIER_COLOR[hotel.tier] || 'var(--accent)'
  return (
    <Link
      to={`/hotel/${hotel.id}`}
      className="rd-hotel-card animate-float-up"
      style={{ animationDelay: `${0.05 + index * 0.04}s`, textDecoration: 'none' }}
    >
      <div className="rd-hotel-emoji">{hotel.emoji}</div>
      <div className="rd-hotel-info">
        <div className="rd-hotel-name">{hotel.shortName}</div>
        <div className="rd-hotel-meta">
          <span style={{ color: tierColor, fontWeight: 800, fontSize: '0.7rem', background: `${tierColor}18`, border: `1px solid ${tierColor}33`, padding: '1px 7px', borderRadius: 20 }}>{hotel.tier}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{hotel.priceRange}</span>
          {hotel.specs?.keyPerk && (
            <span style={{ color: '#c084fc', fontSize: '0.68rem', fontWeight: 700 }}>⭐ {hotel.specs.keyPerk.split('+')[0].trim()}</span>
          )}
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 3 }}>
          {hotel.transportation.slice(0, 2).join(' · ')}
        </div>
      </div>
      <span style={{ color: 'var(--accent)', fontSize: '0.9rem', flexShrink: 0 }}>→</span>
    </Link>
  )
}

// ── Main Dashboard ────────────────────────────────────────────
export default function ResortDashboard() {
  const { checkedRides, foundMickeys, triedDrinks, triedFood,
          personalMustRide, activeResort, activeResortId, isDisney } = useApp()
  const { lastRefresh, apiError } = useLiveData()
  const [hotelsExpanded, setHotelsExpanded] = useState(false)

  if (!activeResort) return null

  const allRides    = activeResort.parks.flatMap(p => p.lands.flatMap(l => l.rides))
  const riddenCount = allRides.filter(r => checkedRides.has(r.id)).length
  const pct         = allRides.length ? Math.round((riddenCount / allRides.length) * 100) : 0

  const hotels      = getHotelsByResort(activeResortId)
  const hotelTiers  = [...new Set(hotels.map(h => h.tier))]

  const stats = isDisney ? [
    { icon: '🎢', val: riddenCount,      of: allRides.length,                                        lbl: 'Rides Ridden',    delay: '0.05s' },
    { icon: '🐭', val: foundMickeys.size, of: HIDDEN_MICKEYS.length,                                  lbl: 'Mickeys Found',   delay: '0.10s' },
    { icon: '🌍', val: triedDrinks.size,  of: FOOD_DRINKS.drinkingAroundTheWorld.countries.length,    lbl: 'Countries Drank', delay: '0.15s' },
    { icon: '🍽️', val: triedFood.size,   of: FOOD_DRINKS.disneyWorldFood.length,                     lbl: 'Disney Eats',     delay: '0.20s' },
  ] : [
    { icon: '🎢', val: riddenCount,       of: allRides.length,                                        lbl: 'Rides Ridden',    delay: '0.05s' },
    { icon: '🌭', val: triedFood.size,    of: FOOD_DRINKS.universalFood.length,                       lbl: 'Universal Eats',  delay: '0.10s' },
    { icon: '🏆', val: `${pct}%`,         of: null,                                                    lbl: 'Progress',        delay: '0.15s' },
    { icon: '⚡', val: activeResort.parks.length, of: null,                                            lbl: 'Parks',           delay: '0.20s' },
  ]

  const quickActions = [
    { to: '/planner', icon: '📋', title: 'Day Planner',    sub: `${riddenCount} of ${allRides.length} conquered` },
    ...(isDisney ? [{ to: '/mickeys', icon: '🐭', title: 'Hidden Mickeys', sub: `${foundMickeys.size} of ${HIDDEN_MICKEYS.length} found` }] : []),
    { to: '/food', icon: isDisney ? '🍹' : '🌭', title: 'Food & Drinks', sub: isDisney ? 'Drink Around the World' : 'Must-eat guide' },
  ]

  return (
    <div className="resort-dashboard animate-fade-in">

      {/* Hero */}
      <div className="rd-hero">
        <div className="rd-hero-inner">
          <div>
            <div className="rd-resort-label">Your Resort</div>
            <h1 className="rd-resort-name">{activeResort.name}</h1>
            <p className="rd-resort-tagline">{activeResort.tagline}</p>
          </div>
          <div className="rd-progress-block animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="rd-progress-label">
              <span>Overall Progress</span><span>{pct}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="rd-progress-sub">{riddenCount} of {allRides.length} rides conquered</div>
            {lastRefresh && !apiError && (
              <div className="rd-live-badge">
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                Live · {lastRefresh.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rd-body">

        {/* Stats */}
        <div className="rd-stats-grid">
          {stats.map(s => (
            <div key={s.lbl} className="rd-stat animate-float-up" style={{ animationDelay: s.delay }}>
              <div className="rd-stat-icon">{s.icon}</div>
              <div className="rd-stat-val">{s.val}</div>
              {s.of != null && <div className="rd-stat-of">/ {s.of}</div>}
              <div className="rd-stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="rd-actions">
          {quickActions.map((a, i) => (
            <Link key={a.to} to={a.to} className="rd-action animate-float-up" style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
              <span className="rd-action-icon">{a.icon}</span>
              <div>
                <div className="rd-action-title">{a.title}</div>
                <div className="rd-action-sub">{a.sub}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Parks (expandable) ── */}
        <div className="rd-section-label">Parks</div>
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

        {/* ── Hotels ── */}
        {hotels.length > 0 && (
          <>
            <div className="rd-section-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>🏨 Hotels & Resorts</span>
              <button
                onClick={() => setHotelsExpanded(v => !v)}
                style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer' }}
              >
                {hotelsExpanded ? 'Collapse ▲' : `Show all ${hotels.length} ▾`}
              </button>
            </div>

            <div className="rd-hotels-list">
              {(hotelsExpanded ? hotels : hotels.slice(0, 4)).map((hotel, i) => (
                <HotelCard key={hotel.id} hotel={hotel} index={i} />
              ))}
              {!hotelsExpanded && hotels.length > 4 && (
                <button
                  className="rd-show-more-btn"
                  onClick={() => setHotelsExpanded(true)}
                >
                  + {hotels.length - 4} more hotels
                </button>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  )
}
