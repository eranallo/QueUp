import { Link } from 'react-router-dom'
import { RESORTS, HIDDEN_MICKEYS, FOOD_DRINKS } from '../data'
import { useApp } from '../App'

function totalRides() {
  let count = 0
  RESORTS.forEach(r => r.parks.forEach(p => p.lands.forEach(l => { count += l.rides.length })))
  return count
}

export default function HomePage() {
  const { checkedRides, foundMickeys, triedDrinks, triedFood, activePark, activeParkId, setActivePark } = useApp()
  const total = totalRides()
  const totalMickeys = HIDDEN_MICKEYS.length
  const totalCountries = FOOD_DRINKS.drinkingAroundTheWorld.countries.length
  const totalFood = FOOD_DRINKS.disneyWorldFood.length + FOOD_DRINKS.universalFood.length

  const stats = [
    { label: 'Rides Ridden',    value: checkedRides.size, total,           icon: '🎢' },
    { label: 'Mickeys Found',   value: foundMickeys.size,  total: totalMickeys,   icon: '🐭' },
    { label: 'Countries Drank', value: triedDrinks.size,   total: totalCountries, icon: '🌍' },
    { label: 'Foods Tried',     value: triedFood.size,     total: totalFood,      icon: '🍽️' },
  ]

  // Stats for current park only
  const parkRides = activePark ? activePark.lands.flatMap(l => l.rides) : []
  const parkRidden = parkRides.filter(r => checkedRides.has(r.id)).length
  const parkPct = parkRides.length ? Math.round((parkRidden / parkRides.length) * 100) : 0

  return (
    <div>
      {/* Active park hero banner */}
      {activePark && (
        <div
          className="park-hero-banner"
          style={{
            background: `linear-gradient(135deg, ${activePark.gradientFrom || '#111'} 0%, ${activePark.accentColor}33 50%, var(--bg-deepest) 100%)`,
            borderBottom: `1px solid ${activePark.accentColor}33`,
          }}
        >
          <div className="park-hero-inner">
            <div className="park-hero-emoji">{activePark.emoji}</div>
            <div className="park-hero-info">
              <div className="park-hero-label">Today's Park</div>
              <h1 className="park-hero-name" style={{ color: activePark.accentColor }}>{activePark.name}</h1>
              <div className="park-hero-progress">
                <div className="progress-bar-track" style={{ maxWidth: 280 }}>
                  <div className="progress-bar-fill" style={{ width: `${parkPct}%`, background: activePark.accentColor }} />
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 6, display: 'block' }}>
                  {parkRidden} / {parkRides.length} rides conquered · {parkPct}%
                </span>
              </div>
            </div>
            <Link to={`/park/${activePark.id}`} className="park-hero-cta" style={{ borderColor: activePark.accentColor, color: activePark.accentColor }}>
              Open Park →
            </Link>
          </div>
        </div>
      )}

      <div className="home-hero" style={{ paddingTop: activePark ? 32 : 60 }}>
        {!activePark && <h1 className="hero-title">QueUp</h1>}
        {!activePark && <p className="hero-subtitle">Your magical guide to Disney World & Universal Orlando</p>}

        {/* Overall stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, maxWidth: 600, margin: '0 auto 36px' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gold)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 2, fontWeight: 700 }}>/ {s.total}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick nav */}
        <div className="quick-links" style={{ justifyContent: 'center' }}>
          <Link to="/planner" className="quick-link"><span className="quick-link-icon">📋</span>Day Planner</Link>
          <Link to="/mickeys" className="quick-link"><span className="quick-link-icon">🐭</span>Hidden Mickeys</Link>
          <Link to="/food"    className="quick-link"><span className="quick-link-icon">🍹</span>Food & Drinks</Link>
        </div>
      </div>

      {/* All parks, grouped by resort */}
      {RESORTS.map(resort => (
        <div key={resort.id} className="resort-section">
          <h2 className="resort-title"><span>{resort.emoji}</span>{resort.name}</h2>
          <div className="parks-grid">
            {resort.parks.map(park => {
              const parkRidesList = park.lands.flatMap(l => l.rides)
              const ridden = parkRidesList.filter(r => checkedRides.has(r.id)).length
              const pct = parkRidesList.length ? Math.round((ridden / parkRidesList.length) * 100) : 0
              const isActive = park.id === activeParkId

              return (
                <Link key={park.id} to={`/park/${park.id}`} className={`park-card${isActive ? ' park-card-active' : ''}`}
                  onClick={() => setActivePark(park.id)}
                >
                  <div
                    className="park-card-bg"
                    style={{ background: `linear-gradient(135deg, ${park.gradientFrom || '#111'}, var(--bg-deepest))` }}
                  />
                  <div className="park-card-overlay" />
                  {isActive && (
                    <div className="park-card-active-badge" style={{ background: park.accentColor }}>
                      TODAY'S PARK
                    </div>
                  )}
                  <div className="park-card-content">
                    <div className="park-card-emoji">{park.emoji}</div>
                    <div className="park-card-name">{park.name}</div>
                    <div className="park-card-meta">
                      <span>{parkRidesList.length} rides</span>
                      <span style={{ color: pct === 100 ? '#10b981' : 'rgba(255,255,255,0.5)' }}>{pct}% ridden</span>
                    </div>
                  </div>
                  <div className="park-color-bar" style={{ background: park.accentColor }} />
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
