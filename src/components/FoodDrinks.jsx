import { useState } from 'react'
import { FOOD_DRINKS } from '../data'
import { useApp } from '../App'

export default function FoodDrinks() {
  const { triedFood, toggleFood, triedDrinks, toggleDrink, isDisney } = useApp()
  const [tab, setTab] = useState(isDisney ? 'datw' : 'universal')

  const { drinkingAroundTheWorld, disneyWorldFood, universalFood } = FOOD_DRINKS
  const cwTotal = drinkingAroundTheWorld.countries.length
  const cwDone  = drinkingAroundTheWorld.countries.filter(c => triedDrinks.has(c.id)).length
  const cwPct   = Math.round((cwDone / cwTotal) * 100)

  const tabs = isDisney
    ? [{ id: 'datw', label: '🌍 Drink Around World' }, { id: 'disney', label: '🏰 Disney Eats' }]
    : [{ id: 'universal', label: '🎥 Universal Eats' }]

  return (
    <div className="food-page animate-fade-in">
      <h1 className="page-title">🍹 Food & Drinks</h1>
      <p className="page-subtitle">
        {isDisney ? 'Track every bite and sip — including the legendary EPCOT challenge.' : 'The essential Universal Orlando eating guide.'}
      </p>

      <div className="tabs animate-float-up stagger-1">
        {tabs.map(t => (
          <button key={t.id} className={`tab-btn${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {/* ── DATW ── */}
      {tab === 'datw' && (
        <div>
          <div className="datw-hero animate-float-up stagger-2">
            <div className="datw-hero-title">{drinkingAroundTheWorld.title}</div>
            <p className="datw-hero-sub">{drinkingAroundTheWorld.description}</p>
            <div className="park-progress" style={{ maxWidth: 460, margin: '16px auto 0', background: 'transparent', border: 'none' }}>
              <div className="park-progress-label">
                <span>Countries Conquered</span>
                <span>{cwDone} / {cwTotal}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${cwPct}%`, background: 'linear-gradient(to right, #00A8CC, #27AE60)' }} />
              </div>
              {cwDone === cwTotal && <p style={{ color: 'var(--accent)', marginTop: 8, fontWeight: 800, fontSize: '0.88rem' }}>🎉 World Showcase Champion!</p>}
            </div>
          </div>

          {drinkingAroundTheWorld.countries.map((c, i) => {
            const tried = triedDrinks.has(c.id)
            return (
              <div key={c.id} className={`country-card${tried ? ' tried' : ''} animate-float-up`} style={{ animationDelay: `${i * 0.03}s` }} onClick={() => toggleDrink(c.id)}>
                <div className="country-flag">{c.flag}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 800 }}>#{i + 1}</span>
                    <div className="country-name">{c.country}</div>
                  </div>
                  <div className="country-drink-name">🍷 {c.recommendedDrink}</div>
                  <div className="country-desc">{c.description}</div>
                  {c.alternatives.length > 0 && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 3 }}>Also: {c.alternatives.join(' · ')}</div>}
                  <div className="country-tip"><strong>💡 Tip:</strong> {c.proTip}</div>
                </div>
                <div className="country-check">{tried && '✓'}</div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── DISNEY FOOD ── */}
      {tab === 'disney' && (
        <div>
          {['Magic Kingdom','EPCOT','Hollywood Studios','Animal Kingdom'].map(cat => {
            const items = disneyWorldFood.filter(f => f.category === cat)
            if (!items.length) return null
            return (
              <div key={cat} style={{ marginBottom: 36 }}>
                <div className="rd-section-label">{cat}</div>
                <div className="food-grid">
                  {items.map((f, i) => (
                    <div key={f.id} className={`food-card${triedFood.has(f.id) ? ' eaten' : ''} animate-float-up`} style={{ animationDelay: `${i * 0.04}s` }} onClick={() => toggleFood(f.id)}>
                      {triedFood.has(f.id) && <div className="food-tried-stamp">✓ Tried!</div>}
                      <div className="food-name">{f.name}</div>
                      <div className="food-loc">📍 {f.location}</div>
                      <div className="food-desc">{f.description}</div>
                      <div className="food-meta">
                        <span className="food-price">{f.price}</span>
                        {f.mustTry && <span className="food-must-tag">⭐ Must Try</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── UNIVERSAL FOOD ── */}
      {tab === 'universal' && (
        <div>
          {['Wizarding World','Springfield','Epic Universe'].map(cat => {
            const items = universalFood.filter(f => f.category === cat)
            if (!items.length) return null
            return (
              <div key={cat} style={{ marginBottom: 36 }}>
                <div className="rd-section-label">{cat}</div>
                <div className="food-grid">
                  {items.map((f, i) => (
                    <div key={f.id} className={`food-card${triedFood.has(f.id) ? ' eaten' : ''} animate-float-up`} style={{ animationDelay: `${i * 0.04}s` }} onClick={() => toggleFood(f.id)}>
                      {triedFood.has(f.id) && <div className="food-tried-stamp">✓ Tried!</div>}
                      <div className="food-name">{f.name}</div>
                      <div className="food-loc">📍 {f.location}</div>
                      <div className="food-desc">{f.description}</div>
                      <div className="food-meta">
                        <span className="food-price">{f.price}</span>
                        {f.mustTry && <span className="food-must-tag">⭐ Must Try</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
