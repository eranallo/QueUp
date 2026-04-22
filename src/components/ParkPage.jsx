import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { RESORTS } from '../data'
import { useApp } from '../App'
import { useLiveData } from '../context/LiveDataContext'
import { ParkHoursFull } from './ParkHours'
import { PARK_HISTORY } from '../parkHistory'
import { getHotelById } from '../hotelsData'

const THRILL = ['', '😌 Gentle', '🌊 Mild', '🌀 Moderate', '🔥 Thrilling', '💀 Intense']

// ── Park → Shows mapping ──────────────────────────────────────
const PARK_SHOWS = {
  'magic-kingdom':             [
    { name: "Happily Ever After",         type: "Fireworks",     time: "9:00 PM",  icon: "🎆" },
    { name: "Main Street Electrical Parade", type: "Parade",     time: "9:00 PM",  icon: "🎠" },
    { name: "Mickey's Royal Friendship Faire", type: "Stage Show", time: "Multiple", icon: "🎭" },
    { name: "Mickey's PhilharMagic",      type: "4D Film",       time: "Ongoing",  icon: "🎬" },
    { name: "Move It! Shake It! MousekeDance It!", type: "Street Party", time: "Multiple", icon: "🎉" },
  ],
  'epcot':                     [
    { name: "EPCOT Forever",              type: "Fireworks",     time: "9:00 PM",  icon: "🎆" },
    { name: "Harmonious",                 type: "Nighttime Show", time: "9:00 PM", icon: "🌊" },
    { name: "The American Adventure",     type: "Audio-Animatronic Show", time: "Ongoing", icon: "🦅" },
    { name: "Turtle Talk with Crush",     type: "Interactive Show", time: "Multiple", icon: "🐢" },
    { name: "Candlelight Processional",   type: "Seasonal",      time: "Seasonal", icon: "🕯️" },
  ],
  'hollywood-studios':         [
    { name: "Fantasmic!",                 type: "Nighttime Show", time: "9:00 PM", icon: "🌟" },
    { name: "Star Wars: A Galactic Spectacular", type: "Fireworks", time: "9:30 PM", icon: "🚀" },
    { name: "Indiana Jones Epic Stunt Spectacular", type: "Stunt Show", time: "Multiple", icon: "🎬" },
    { name: "Beauty and the Beast Live on Stage", type: "Stage Show", time: "Multiple", icon: "🌹" },
    { name: "Disney Junior Play & Dance", type: "Kids Show",     time: "Multiple", icon: "🎵" },
  ],
  'animal-kingdom':            [
    { name: "Festival of the Lion King",  type: "Stage Show",    time: "Multiple", icon: "🦁" },
    { name: "Finding Nemo: The Big Blue…", type: "Musical",      time: "Multiple", icon: "🐠" },
    { name: "UP! A Great Bird Adventure", type: "Animal Show",   time: "Multiple", icon: "🦜" },
    { name: "Rivers of Light",            type: "Nighttime Show", time: "Seasonal", icon: "🌊" },
  ],
  'universal-studios-florida': [
    { name: "The Bourne Stuntacular",     type: "Stunt Show",    time: "Multiple", icon: "🎬" },
    { name: "Horror Make-Up Show",        type: "Comedy Show",   time: "Multiple", icon: "🎭" },
  ],
  'islands-of-adventure':      [
    { name: "Poseidon's Fury",            type: "Walk-Through",  time: "Multiple", icon: "🌊" },
  ],
  'epic-universe':             [
    { name: "How to Train Your Dragon Live Show", type: "Stage Show", time: "Multiple", icon: "🐉" },
    { name: "Universal Monsters Live",    type: "Stage Show",    time: "Multiple", icon: "💀" },
  ],
}

// ── Park → Nearby Hotels mapping ─────────────────────────────
const PARK_HOTELS = {
  'magic-kingdom':             ['grand-floridian', 'polynesian-village', 'contemporary', 'wilderness-lodge'],
  'epcot':                     ['beach-club', 'yacht-club', 'boardwalk-inn', 'caribbean-beach'],
  'hollywood-studios':         ['beach-club', 'yacht-club', 'boardwalk-inn', 'caribbean-beach'],
  'animal-kingdom':            ['animal-kingdom-lodge', 'coronado-springs'],
  'universal-studios-florida': ['hard-rock-hotel', 'portofino-bay', 'royal-pacific', 'sapphire-falls', 'cabana-bay'],
  'islands-of-adventure':      ['hard-rock-hotel', 'portofino-bay', 'royal-pacific', 'sapphire-falls', 'cabana-bay'],
  'epic-universe':             ['stella-nova', 'terra-luna', 'cabana-bay'],
}

// ── Collapsible section wrapper ───────────────────────────────
function ParkSection({ title, count, badge, defaultOpen = false, children, accentColor }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="park-section-accordion">
      <button className="park-section-acc-header" onClick={() => setOpen(v => !v)}>
        <div className="park-section-acc-left">
          <span className="park-section-acc-title">{title}</span>
          {count != null && (
            <span className="park-section-acc-count" style={{ background: `${accentColor}22`, color: accentColor }}>
              {count}
            </span>
          )}
          {badge && <span className="park-section-acc-badge">{badge}</span>}
        </div>
        <span className="park-section-acc-chevron" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>
      {open && (
        <div className="park-section-acc-body animate-float-up">
          {children}
        </div>
      )}
    </div>
  )
}

// ── Ride Card ─────────────────────────────────────────────────
function RideCard({ ride, navigate, checkedRides, toggleRide, manualDown, toggleManualDown, personalMustRide, togglePersonalMust, getRideLive, i, li }) {
  const live      = getRideLive(ride.name)
  const isDown    = manualDown.has(ride.id)
  const ridden    = checkedRides.has(ride.id)
  const isMyMust  = personalMustRide.has(ride.id)
  const isRefurb  = live?.status === 'REFURBISHMENT'
  const actuallyDown = isDown || live?.status === 'DOWN'
  const statusKey = { OPERATING: 'open', DOWN: 'down', CLOSED: 'closed', REFURBISHMENT: 'refurb' }[live?.status] || ''

  return (
    <div
      className={`ride-card${ridden ? ' ridden' : ''}${actuallyDown ? ' is-down' : ''}${isRefurb ? ' is-refurb' : ''} animate-float-up`}
      style={{ animationDelay: `${(li * 0.05) + (i * 0.03)}s` }}
      onClick={() => navigate(`/ride/${ride.id}`)}
    >
      <div className="ride-card-header">
        <div className="ride-name">
          {ride.name}
          {isRefurb && <span style={{ fontSize: '0.7rem', marginLeft: 6, color: 'var(--warning)' }}>🚧 Refurb</span>}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <button
            className={`heart-btn${isMyMust ? ' active' : ''}`}
            onClick={e => { e.stopPropagation(); togglePersonalMust(ride.id) }}
          >
            {isMyMust ? '❤️' : '🤍'}
          </button>
          <div
            className="ridden-dot"
            onClick={e => { e.stopPropagation(); toggleRide(ride.id, ride.name) }}
          >
            {ridden && '✓'}
          </div>
        </div>
      </div>

      {/* Live status */}
      {((live && live.status !== 'UNKNOWN') || isDown) && (
        <div className="live-inline">
          <div className={`live-dot ${isDown ? 'down' : statusKey}`} />
          <span className="live-label" style={{
            color: isDown || live?.status === 'DOWN' ? 'var(--danger)'
                 : live?.status === 'OPERATING' ? 'var(--success)'
                 : live?.status === 'REFURBISHMENT' ? 'var(--warning)'
                 : 'var(--text-muted)'
          }}>
            {isDown ? 'Marked Down'
             : live?.status === 'OPERATING' ? 'Open'
             : live?.status === 'CLOSED' ? 'Closed'
             : live?.status === 'REFURBISHMENT' ? 'Refurbishment'
             : 'Down'}
          </span>
          {live?.waitTime != null && live.status === 'OPERATING' && !isDown && (
            <span className="live-wait" style={{
              color: live.waitTime < 20 ? 'var(--success)' : live.waitTime < 45 ? 'var(--warning)' : 'var(--danger)',
              fontWeight: 900
            }}>
              · {live.waitTime} min
            </span>
          )}
        </div>
      )}

      <div className="ride-badges">
        <span className={`badge badge-thrill-${ride.thrillLevel}`}>{THRILL[ride.thrillLevel]}</span>
        {ride.heightRequirement && <span className="badge">📏 {ride.heightRequirement}"</span>}
        {ride.mustDo      && <span className="badge badge-mustdo">⭐ Must-Do</span>}
        {isMyMust         && <span className="badge" style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171' }}>❤️ My Pick</span>}
        {ride.lightningLane && <span className="badge badge-ll">⚡ LL</span>}
        {ride.duration    && <span className="badge">{ride.duration}</span>}
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

// ── Park History Body ─────────────────────────────────────────
function ParkHistoryBody({ parkId }) {
  const hist = PARK_HISTORY[parkId]
  if (!hist) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {hist.intro && (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic' }}>
          {hist.intro}
        </p>
      )}

      {/* Former attractions */}
      {hist.formerAttractions?.length > 0 && (
        <div>
          <div className="rh-building-label" style={{ marginBottom: 10 }}>🔒 Former Attractions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {hist.formerAttractions.map((att, i) => (
              <div key={i} className={`ph-att-card${att.type === 'open' ? ' still-open' : ''}`}>
                <div className="ph-att-header">
                  <div>
                    <div className="ph-att-name">{att.name}</div>
                    <div className="ph-att-meta">
                      <span className="ph-att-years">{att.years}</span>
                      <span className="ph-att-land">{att.land}</span>
                    </div>
                  </div>
                  {att.type === 'open'
                    ? <span className="ph-status-badge open">Still Open</span>
                    : <span className="ph-status-badge closed">Closed</span>
                  }
                </div>
                <p className="ph-att-desc">{att.description}</p>
                <div className="ph-att-fate">
                  <span style={{ fontWeight: 800, color: 'var(--text-muted)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Fate: </span>
                  {att.fate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Abandoned projects */}
      {hist.abandonedProjects?.length > 0 && (
        <div>
          <div className="rh-building-label" style={{ marginBottom: 10 }}>💭 Abandoned & Unrealized Projects</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {hist.abandonedProjects.map((proj, i) => (
              <div key={i} className="ph-proj-card">
                <div className="ph-proj-name">{proj.name}</div>
                <div className="ph-proj-era">{proj.era}</div>
                <p className="ph-att-desc">{proj.description}</p>
                <div className="ph-att-fate">
                  <span style={{ fontWeight: 800, color: 'var(--text-muted)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Status: </span>
                  {proj.fate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main ParkPage ─────────────────────────────────────────────
export default function ParkPage() {
  const { parkId }  = useParams()
  const navigate    = useNavigate()
  const { checkedRides, toggleRide, manualDown, toggleManualDown,
          personalMustRide, togglePersonalMust } = useApp()
  const { getRideLive, lastRefresh, apiError } = useLiveData()

  const [search,       setSearch]       = useState('')
  const [filterMustDo, setFilterMustDo] = useState(false)
  const [filterMyMust, setFilterMyMust] = useState(false)
  const [filterLL,     setFilterLL]     = useState(false)
  const [filterDown,   setFilterDown]   = useState(false)
  const [filterRidden, setFilterRidden] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const park = useMemo(() => RESORTS.flatMap(r => r.parks).find(p => p.id === parkId), [parkId])
  if (!park) return <div className="park-page"><p>Park not found.</p></div>

  const allRides = park.lands.flatMap(l => l.rides)

  // Exclude refurb from progress
  const rideableRides = allRides.filter(r => getRideLive(r.name)?.status !== 'REFURBISHMENT')
  const ridden        = rideableRides.filter(r => checkedRides.has(r.id)).length
  const pct           = rideableRides.length ? Math.round((ridden / rideableRides.length) * 100) : 0
  const myPicksCount  = allRides.filter(r => personalMustRide.has(r.id)).length

  // Live summary stats
  const openCount  = allRides.filter(r => getRideLive(r.name)?.status === 'OPERATING').length
  const downCount  = allRides.filter(r => {
    const s = getRideLive(r.name)?.status
    return s === 'DOWN' || s === 'CLOSED'
  }).length

  // Search + filter
  const searchTerm  = search.trim().toLowerCase()
  const isFiltering = searchTerm || filterMustDo || filterMyMust || filterLL || filterDown || filterRidden

  const matchesRide = (ride) => {
    if (searchTerm && !ride.name.toLowerCase().includes(searchTerm) && !(ride.tags||[]).some(t => t.includes(searchTerm))) return false
    if (filterMustDo && !ride.mustDo) return false
    if (filterMyMust && !personalMustRide.has(ride.id)) return false
    if (filterLL     && !ride.lightningLane) return false
    if (filterRidden && !checkedRides.has(ride.id)) return false
    if (filterDown) {
      const live = getRideLive(ride.name)
      if (!manualDown.has(ride.id) && !(live && live.status !== 'OPERATING' && live.status !== 'UNKNOWN')) return false
    }
    return true
  }

  const searchResults = isFiltering ? allRides.filter(matchesRide) : null
  const suggestions   = searchTerm.length >= 1 ? allRides.filter(r => r.name.toLowerCase().includes(searchTerm)).slice(0, 6) : []

  // Shows & Hotels for this park
  const parkShows  = PARK_SHOWS[park.id]  || []
  const nearbyHotelIds = PARK_HOTELS[park.id] || []
  const nearbyHotels   = nearbyHotelIds.map(getHotelById).filter(Boolean)

  const rideCardProps = { navigate, checkedRides, toggleRide, manualDown, toggleManualDown, personalMustRide, togglePersonalMust, getRideLive }

  return (
    <div className="park-page animate-fade-in">

      {/* Back button */}
      <button className="back-link" onClick={() => navigate('/')}>← Back to Resort</button>

      {/* ── Park Hero ── */}
      <div className="pp-hero" style={{ '--park-accent': park.accentColor, background: `linear-gradient(135deg, ${park.accentColor}22 0%, var(--bg-card) 100%)` }}>
        <div className="pp-hero-top">
          <span className="pp-hero-emoji">{park.emoji}</span>
          <div className="pp-hero-text">
            <h1 className="pp-hero-name">{park.name}</h1>
            <p className="pp-hero-desc">{park.description}</p>
          </div>
        </div>

        {/* Stat chips */}
        <div className="pp-chips">
          <span className="pp-chip">📅 Est. {park.openingYear}</span>
          <span className="pp-chip">{rideableRides.length} rides</span>
          <span className="pp-chip" style={{ color: pct === 100 ? 'var(--success)' : park.accentColor }}>
            {ridden}/{rideableRides.length} ridden
          </span>
          {openCount > 0  && <span className="pp-chip" style={{ color: 'var(--success)' }}>🟢 {openCount} open</span>}
          {downCount > 0  && <span className="pp-chip" style={{ color: 'var(--danger)' }}>🔴 {downCount} down</span>}
          {myPicksCount > 0 && <span className="pp-chip" style={{ color: '#f87171' }}>❤️ {myPicksCount} picks</span>}
          {lastRefresh && !apiError && <span className="pp-chip" style={{ color: 'var(--success)' }}>🟢 Live</span>}
        </div>

        {/* Hours */}
        <ParkHoursFull parkId={park.id} accentColor={park.accentColor} />

        {/* Progress */}
        <div className="pp-progress">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: 6 }}>
            <span>Park Progress</span>
            <span style={{ color: pct === 100 ? 'var(--success)' : park.accentColor }}>{pct}%</span>
          </div>
          <div className="progress-track" style={{ height: 10 }}>
            <div className="progress-fill" style={{
              width: `${pct}%`,
              background: pct === 100 ? 'var(--success)' : park.accentColor,
              transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
            }} />
          </div>
        </div>

        {/* Map button — prominent, full-width */}
        <Link to={`/map/${park.id}`} className="pp-map-btn" style={{ background: park.accentColor, color: park.accentColor === '#f0b429' ? '#000' : '#fff' }}>
          🗺️ View {park.name.split(' ').slice(-1)[0]} Map
        </Link>
      </div>

      {/* ── Search + filters ── */}
      <div className="park-search-bar" style={{ position: 'relative', marginTop: 16 }}>
        <div className="park-search-inner">
          <span className="park-search-icon">🔍</span>
          <input
            className="park-search-input"
            placeholder={`Search ${park.name} attractions…`}
            value={search}
            onChange={e => { setSearch(e.target.value); setShowSuggestions(true) }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            autoComplete="off"
          />
          {search && <button className="park-search-clear" onClick={() => { setSearch(''); setShowSuggestions(false) }}>✕</button>}
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <div className="search-dropdown">
            {suggestions.map(ride => (
              <div key={ride.id} className="search-dropdown-item" onMouseDown={() => { navigate(`/ride/${ride.id}`); setSearch('') }}>
                <span className="sddi-name">{ride.name}</span>
                <div className="sddi-badges">
                  {ride.mustDo && <span className="badge badge-mustdo" style={{ fontSize: '0.65rem' }}>⭐</span>}
                  {ride.lightningLane && <span className="badge badge-ll" style={{ fontSize: '0.65rem' }}>⚡</span>}
                </div>
              </div>
            ))}
          </div>
        )}
        {search && <div className="park-search-count">{searchResults?.length ?? 0} result{searchResults?.length !== 1 ? 's' : ''} for "{search}"</div>}
      </div>

      <div className="park-filters">
        <button className={`filter-pill${filterMustDo ? ' on' : ''}`} onClick={() => setFilterMustDo(v => !v)}>⭐ Must-Do</button>
        <button className={`filter-pill${filterMyMust ? ' on' : ''}`} style={filterMyMust ? { color: '#f87171', borderColor: '#f87171', background: 'rgba(248,113,113,0.1)' } : {}} onClick={() => setFilterMyMust(v => !v)}>❤️ My Picks</button>
        <button className={`filter-pill${filterLL ? ' on' : ''}`} onClick={() => setFilterLL(v => !v)}>⚡ Lightning Lane</button>
        <button className={`filter-pill${filterRidden ? ' on' : ''}`} onClick={() => setFilterRidden(v => !v)}>✓ Ridden</button>
        <button className={`filter-pill${filterDown ? ' on' : ''}`} onClick={() => setFilterDown(v => !v)}>🔴 Down</button>
        {isFiltering && <button className="filter-pill" onClick={() => { setSearch(''); setFilterMustDo(false); setFilterMyMust(false); setFilterLL(false); setFilterRidden(false); setFilterDown(false) }}>✕ Clear</button>}
      </div>

      {/* ── Search results (flat) ── */}
      {searchResults !== null ? (
        <div>
          {searchResults.length === 0
            ? <div className="empty-state"><div className="empty-icon">🔍</div><div className="empty-text">No rides match.</div></div>
            : <div className="rides-grid">{searchResults.map((ride, i) => <RideCard key={ride.id} ride={ride} i={i} li={0} {...rideCardProps} />)}</div>
          }
        </div>
      ) : (
        <>
          {/* ── 🎢 RIDES — collapsible by land ── */}
          <ParkSection
            title="🎢 Rides & Attractions"
            count={`${ridden}/${rideableRides.length}`}
            badge={pct === 100 ? '🎉 Complete!' : null}
            defaultOpen={true}
            accentColor={park.accentColor}
          >
            {park.lands.map((land, li) => (
              <div key={land.id} className="land-section" style={{ animationDelay: `${li * 0.05}s` }}>
                <div className="land-label">
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: park.accentColor, flexShrink: 0 }} />
                  <span>{land.name}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    {land.rides.filter(r => checkedRides.has(r.id)).length}/{land.rides.length}
                  </span>
                </div>
                <div className="rides-grid">
                  {land.rides.map((ride, i) => <RideCard key={ride.id} ride={ride} i={i} li={li} {...rideCardProps} />)}
                </div>
              </div>
            ))}
          </ParkSection>

          {/* ── 🎭 SHOWS & ENTERTAINMENT ── */}
          {parkShows.length > 0 && (
            <ParkSection
              title="🎭 Shows & Entertainment"
              count={parkShows.length}
              accentColor={park.accentColor}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {parkShows.map(show => (
                  <div key={show.name} className="pp-show-card">
                    <span className="pp-show-icon">{show.icon}</span>
                    <div className="pp-show-info">
                      <div className="pp-show-name">{show.name}</div>
                      <div className="pp-show-meta">
                        <span className="pp-show-type">{show.type}</span>
                        {show.time !== 'Ongoing' && show.time !== 'Multiple' && show.time !== 'Seasonal' && (
                          <span className="pp-show-time">⏰ {show.time}</span>
                        )}
                        {show.time === 'Multiple' && <span className="pp-show-time">Multiple showtimes</span>}
                        {show.time === 'Seasonal' && <span className="pp-show-time" style={{ color: 'var(--warning)' }}>Seasonal</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ParkSection>
          )}

          {/* ── 🗿 PARK HISTORY ── */}
          {PARK_HISTORY[park.id] && (
            <ParkSection title="🗿 Park History & Lost Attractions" accentColor={park.accentColor}>
              <ParkHistoryBody parkId={park.id} />
            </ParkSection>
          )}

          {/* ── 🏨 NEARBY HOTELS ── */}
          {nearbyHotels.length > 0 && (
            <ParkSection
              title="🏨 Nearby Hotels & Resorts"
              count={nearbyHotels.length}
              accentColor={park.accentColor}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {nearbyHotels.map(hotel => {
                  const TIER_COLOR = { Deluxe:'#f0b429', Moderate:'#60a5fa', Value:'#34d399', Premier:'#c084fc', Preferred:'#f97316' }
                  const color = TIER_COLOR[hotel.tier] || 'var(--accent)'
                  return (
                    <Link key={hotel.id} to={`/hotel/${hotel.id}`} className="pp-hotel-card" style={{ textDecoration: 'none' }}>
                      <span style={{ fontSize: '1.4rem' }}>{hotel.emoji}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="pp-hotel-name">{hotel.shortName}</div>
                        <div className="pp-hotel-meta">
                          <span style={{ color, fontWeight: 800, fontSize: '0.68rem', background: `${color}18`, border: `1px solid ${color}33`, padding: '1px 7px', borderRadius: 20 }}>{hotel.tier}</span>
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{hotel.priceRange}</span>
                          {hotel.specs?.keyPerk && <span style={{ fontSize: '0.65rem', color: '#c084fc', fontWeight: 700 }}>⭐ {hotel.specs.keyPerk.split('+')[0].trim()}</span>}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
                          {hotel.transportation.slice(0,2).join(' · ')}
                        </div>
                      </div>
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}>→</span>
                    </Link>
                  )
                })}
              </div>
            </ParkSection>
          )}
        </>
      )}
    </div>
  )
}
