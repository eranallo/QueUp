import { Link } from 'react-router-dom'
import { RESORTS, HIDDEN_MICKEYS, FOOD_DRINKS } from '../data'
import { useApp } from '../App'
import { useLiveData } from '../context/LiveDataContext'

export default function ResortDashboard() {
  const { checkedRides, foundMickeys, triedDrinks, triedFood, activeResort, activeResortId, isDisney } = useApp()
  const { lastRefresh, apiError } = useLiveData()
  if (!activeResort) return null

  const allRides   = activeResort.parks.flatMap(p => p.lands.flatMap(l => l.rides))
  const riddenCount = allRides.filter(r => checkedRides.has(r.id)).length
  const pct         = allRides.length ? Math.round((riddenCount / allRides.length) * 100) : 0

  const stats = isDisney ? [
    { icon: '🎢', val: riddenCount,       of: allRides.length,                              lbl: 'Rides Ridden',    delay: '0.05s' },
    { icon: '🐭', val: foundMickeys.size,  of: HIDDEN_MICKEYS.length,                        lbl: 'Mickeys Found',   delay: '0.10s' },
    { icon: '🌍', val: triedDrinks.size,   of: FOOD_DRINKS.drinkingAroundTheWorld.countries.length, lbl: 'Countries Drank', delay: '0.15s' },
    { icon: '🍽️', val: triedFood.size,    of: FOOD_DRINKS.disneyWorldFood.length,           lbl: 'Disney Eats',     delay: '0.20s' },
  ] : [
    { icon: '🎢', val: riddenCount,        of: allRides.length,                              lbl: 'Rides Ridden',    delay: '0.05s' },
    { icon: '🌭', val: triedFood.size,     of: FOOD_DRINKS.universalFood.length,             lbl: 'Universal Eats',  delay: '0.10s' },
    { icon: '🏆', val: `${pct}%`,          of: null,                                          lbl: 'Overall Progress', delay: '0.15s' },
    { icon: '⚡', val: activeResort.parks.length, of: null,                                  lbl: 'Parks',           delay: '0.20s' },
  ]

  const quickActions = [
    { to: '/planner', icon: '📋', title: 'Day Planner', sub: `${riddenCount} of ${allRides.length} conquered` },
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
              <span>Overall Progress</span>
              <span>{pct}%</span>
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
          {stats.map((s, i) => (
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

        {/* Parks */}
        <div className="rd-section-label">Parks</div>
        <div className="rd-parks-grid">
          {activeResort.parks.map((park, i) => {
            const parkRides = park.lands.flatMap(l => l.rides)
            const ridden    = parkRides.filter(r => checkedRides.has(r.id)).length
            const ppct      = parkRides.length ? Math.round((ridden / parkRides.length) * 100) : 0
            const left      = parkRides.length - ridden

            return (
              <Link
                key={park.id}
                to={`/park/${park.id}`}
                className="rd-park-card animate-float-up"
                style={{
                  '--park-accent': park.accentColor,
                  animationDelay: `${0.15 + i * 0.06}s`,
                }}
              >
                <div className="rd-park-glow" style={{ background: park.accentColor }} />
                <div className="rd-park-color-strip" style={{ background: park.accentColor }} />

                <div className="rd-park-top">
                  <span className="rd-park-emoji">{park.emoji}</span>
                  <div className="rd-park-name">{park.name}</div>
                  <div className="rd-park-pct" style={{ color: ppct === 100 ? '#10b981' : park.accentColor }}>
                    {ppct}%
                  </div>
                </div>

                <div className="rd-park-meta">{parkRides.length} rides · {park.lands.length} lands · est. {park.openingYear}</div>

                <div className="rd-park-bar progress-track">
                  <div className="progress-fill" style={{ width: `${ppct}%`, background: park.accentColor }} />
                </div>

                <div className="rd-park-footer">
                  <span>{ridden} ridden</span>
                  {left > 0
                    ? <span style={{ color: 'var(--text-muted)' }}>{left} to go</span>
                    : <span style={{ color: '#10b981', fontWeight: 900 }}>✓ Complete!</span>
                  }
                  <span>Enter →</span>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}
