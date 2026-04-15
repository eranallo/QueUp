import { Link } from 'react-router-dom'
import { RESORTS, HIDDEN_MICKEYS, FOOD_DRINKS } from '../data'
import { useApp } from '../App'

function totalRides() {
  let count = 0
  RESORTS.forEach(r => r.parks.forEach(p => p.lands.forEach(l => { count += l.rides.length })))
  return count
}

export default function HomePage() {
  const { checkedRides, foundMickeys, triedDrinks, triedFood } = useApp()
  const total = totalRides()
  const totalMickeys = HIDDEN_MICKEYS.length
  const totalCountries = FOOD_DRINKS.drinkingAroundTheWorld.countries.length
  const totalFood = FOOD_DRINKS.disneyWorldFood.length + FOOD_DRINKS.universalFood.length

  const stats = [
    { label: 'Rides Ridden',        value: checkedRides.size, total,          icon: '🎢', color: '#5B2BB5' },
    { label: 'Mickeys Found',       value: foundMickeys.size,  total: totalMickeys,    icon: '🐭', color: '#f0b429' },
    { label: 'Countries Drank',     value: triedDrinks.size,   total: totalCountries,  icon: '🌍', color: '#00A8CC' },
    { label: 'Foods Tried',         value: triedFood.size,     total: totalFood,        icon: '🍽️', color: '#27AE60' },
  ]

  return (
    <div>
      {/* Decorative stars */}
      <div className="star-1" />
      <div className="star-2" />
      <div className="star-3" />

      <div className="home-hero">
        <h1 className="hero-title">QueUp</h1>
        <p className="hero-subtitle">Your magical guide to Disney World & Universal Orlando</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, maxWidth: 700, margin: '0 auto 40px' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: '1.7rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2, fontWeight: 700 }}>/ {s.total}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick nav links */}
        <div className="quick-links" style={{ justifyContent: 'center' }}>
          <Link to="/planner" className="quick-link"><span className="quick-link-icon">📋</span>Day Planner</Link>
          <Link to="/mickeys" className="quick-link"><span className="quick-link-icon">🐭</span>Hidden Mickeys</Link>
          <Link to="/food" className="quick-link"><span className="quick-link-icon">🍹</span>Food & Drinks</Link>
        </div>
      </div>

      {/* Resort sections */}
      {RESORTS.map(resort => (
        <div key={resort.id} className="resort-section">
          <h2 className="resort-title">
            <span>{resort.emoji}</span>
            {resort.name}
          </h2>

          <div className="parks-grid">
            {resort.parks.map(park => {
              const parkRides = park.lands.flatMap(l => l.rides)
              const ridden = parkRides.filter(r => checkedRides.has(r.id)).length
              const pct = parkRides.length ? Math.round((ridden / parkRides.length) * 100) : 0

              return (
                <Link key={park.id} to={`/park/${park.id}`} className="park-card">
                  <div
                    className="park-card-bg"
                    style={{
                      background: park.imageUrl
                        ? `url(${park.imageUrl}) center/cover`
                        : `linear-gradient(135deg, ${park.gradientFrom || '#111'}, var(--bg-deepest))`,
                    }}
                  />
                  <div className="park-card-overlay" />
                  <div className="park-card-content">
                    <div className="park-card-emoji">{park.emoji}</div>
                    <div className="park-card-name">{park.name}</div>
                    <div className="park-card-meta">
                      <span>⏰ {park.openingYear}</span>
                      <span>{parkRides.length} rides</span>
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
