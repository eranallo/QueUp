import { useState } from 'react'
import { FOOD_DRINKS } from '../data'
import { useApp } from '../App'

export default function FoodDrinks() {
  const { triedFood, toggleFood, triedDrinks, toggleDrink } = useApp()
  const [activeTab, setActiveTab] = useState('datw')

  const { drinkingAroundTheWorld, disneyWorldFood, universalFood } = FOOD_DRINKS
  const countriesTotal = drinkingAroundTheWorld.countries.length
  const countriesDone  = drinkingAroundTheWorld.countries.filter(c => triedDrinks.has(c.id)).length
  const pct = Math.round((countriesDone / countriesTotal) * 100)

  const allFood = [...disneyWorldFood, ...universalFood]
  const foodDone = allFood.filter(f => triedFood.has(f.id)).length

  return (
    <div className="food-page">
      <div className="food-page-header">
        <h1 className="food-page-title">🍹 Food & Drinks</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Track every bite and sip — including the legendary EPCOT Drinking Around the World challenge.</p>
      </div>

      <div className="tabs">
        <button className={`tab-btn${activeTab === 'datw' ? ' active' : ''}`} onClick={() => setActiveTab('datw')}>🌍 Drink Around World</button>
        <button className={`tab-btn${activeTab === 'disney' ? ' active' : ''}`} onClick={() => setActiveTab('disney')}>🏰 Disney Eats</button>
        <button className={`tab-btn${activeTab === 'universal' ? ' active' : ''}`} onClick={() => setActiveTab('universal')}>🎥 Universal Eats</button>
      </div>

      {/* ── DRINK AROUND THE WORLD ── */}
      {activeTab === 'datw' && (
        <div>
          <div className="datw-header">
            <div className="datw-title">{drinkingAroundTheWorld.title}</div>
            <div className="datw-subtitle">{drinkingAroundTheWorld.subtitle}</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: 600, margin: '0 auto' }}>
              {drinkingAroundTheWorld.description}
            </p>
            <div className="datw-progress" style={{ maxWidth: 500, margin: '16px auto 0' }}>
              <div className="progress-label">
                <span>Countries conquered</span>
                <span>{countriesDone} / {countriesTotal}</span>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${pct}%`, background: 'linear-gradient(to right, #00A8CC, #27AE60)' }} />
              </div>
              {countriesDone === countriesTotal && (
                <p style={{ color: 'var(--gold)', marginTop: 8, fontWeight: 700, fontSize: '0.9rem' }}>
                  🎉 You did it! Official World Showcase Champion!
                </p>
              )}
            </div>
          </div>

          {drinkingAroundTheWorld.countries.map((country, i) => {
            const isTried = triedDrinks.has(country.id)
            return (
              <div key={country.id} className={`country-card${isTried ? ' tried' : ''}`} onClick={() => toggleDrink(country.id)}>
                <div className="country-flag">{country.flag}</div>
                <div className="country-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>#{i + 1}</span>
                    <div className="country-name">{country.country}</div>
                  </div>
                  <div className="country-drink">🍷 {country.recommendedDrink}</div>
                  <div style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginBottom: 4 }}>{country.description}</div>
                  {country.alternatives.length > 0 && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Also: {country.alternatives.join(' · ')}
                    </div>
                  )}
                  <div className="country-pro-tip"><strong>💡 Tip:</strong> {country.proTip}</div>
                </div>
                <div className="country-check">{isTried && '✓'}</div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── DISNEY WORLD FOOD ── */}
      {activeTab === 'disney' && (
        <div>
          <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {disneyWorldFood.filter(f => triedFood.has(f.id)).length} / {disneyWorldFood.length} tried
            </span>
          </div>

          {/* Group by category/park */}
          {['Magic Kingdom', 'EPCOT', 'Hollywood Studios', 'Animal Kingdom'].map(cat => {
            const items = disneyWorldFood.filter(f => f.category === cat)
            if (!items.length) return null
            return (
              <div key={cat} style={{ marginBottom: 32 }}>
                <h2 className="planner-section-title">{cat}</h2>
                <div className="food-grid">
                  {items.map(food => (
                    <div key={food.id} className={`food-card${triedFood.has(food.id) ? ' eaten' : ''}`} onClick={() => toggleFood(food.id)}>
                      <div className="food-name">{food.name}</div>
                      <div className="food-location">📍 {food.location}</div>
                      <div className="food-desc">{food.description}</div>
                      <div className="food-meta">
                        <span className="food-price">{food.price}</span>
                        {food.mustTry && <span className="food-must-badge">⭐ Must Try</span>}
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
      {activeTab === 'universal' && (
        <div>
          <div style={{ marginBottom: 20 }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {universalFood.filter(f => triedFood.has(f.id)).length} / {universalFood.length} tried
            </span>
          </div>

          {['Wizarding World', 'Springfield', 'Epic Universe'].map(cat => {
            const items = universalFood.filter(f => f.category === cat)
            if (!items.length) return null
            return (
              <div key={cat} style={{ marginBottom: 32 }}>
                <h2 className="planner-section-title">{cat}</h2>
                <div className="food-grid">
                  {items.map(food => (
                    <div key={food.id} className={`food-card${triedFood.has(food.id) ? ' eaten' : ''}`} onClick={() => toggleFood(food.id)}>
                      <div className="food-name">{food.name}</div>
                      <div className="food-location">📍 {food.location}</div>
                      <div className="food-desc">{food.description}</div>
                      <div className="food-meta">
                        <span className="food-price">{food.price}</span>
                        {food.mustTry && <span className="food-must-badge">⭐ Must Try</span>}
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
