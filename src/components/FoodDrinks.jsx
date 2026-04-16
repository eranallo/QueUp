import { useState } from 'react'
import { FOOD_DRINKS } from '../data'
import { useApp } from '../App'
import PhotoManager from './PhotoManager'
import RatingStars from './RatingStars'

// DATW — who drank what per country
const DATW_PEOPLE = ['Lauren', 'Evan', 'Makayla']
const DATW_KEY    = 'pp_datw_who'

function loadWho() {
  try { return JSON.parse(localStorage.getItem(DATW_KEY)) || {} } catch { return {} }
}
function saveWho(who) {
  localStorage.setItem(DATW_KEY, JSON.stringify(who))
}

function CountryDetail({ c, onClose }) {
  const [who,     setWhoState] = useState(loadWho)
  const [drink,   setDrink]    = useState(who[c.id]?.drink || c.recommendedDrink)
  const [triedBy, setTriedBy]  = useState(who[c.id]?.triedBy || [])

  const save = (updates) => {
    const next = { ...loadWho(), [c.id]: { drink, triedBy, ...updates } }
    saveWho(next)
  }

  const togglePerson = (person) => {
    const next = triedBy.includes(person) ? triedBy.filter(p => p !== person) : [...triedBy, person]
    setTriedBy(next)
    save({ triedBy: next })
  }

  const handleDrinkSelect = (d) => {
    setDrink(d)
    save({ drink: d })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{c.flag} {c.country}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div style={{ overflowY: 'auto', flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* All drink options */}
          <div>
            <div className="detail-block-title">Choose Your Drink</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[c.recommendedDrink, ...c.alternatives].map((d, i) => (
                <button
                  key={d}
                  className={`datw-drink-option${drink === d ? ' selected' : ''}`}
                  onClick={() => handleDrinkSelect(d)}
                >
                  {i === 0 && <span className="datw-recommended-badge">⭐ Recommended</span>}
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Who drank it */}
          <div>
            <div className="detail-block-title">Who Drank It?</div>
            <div className="datw-people-row">
              {DATW_PEOPLE.map(person => (
                <button
                  key={person}
                  className={`datw-person-btn${triedBy.includes(person) ? ' active' : ''}`}
                  onClick={() => togglePerson(person)}
                >
                  {triedBy.includes(person) ? '✓ ' : ''}{person}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="detail-block-title">About This Stop</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>{c.description}</p>
          </div>

          {/* Pro tip */}
          <div style={{ padding: '12px 16px', background: 'var(--accent-dim)', borderRadius: 'var(--r-md)', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--accent)' }}>💡 Tip:</strong> {c.proTip}
          </div>

          {/* Rating */}
          <RatingStars itemType="datw" itemId={c.id} />

          {/* Photo */}
          <PhotoManager itemType="datw" itemId={c.id} itemName={`${c.country} — DATW`} />
        </div>
      </div>
    </div>
  )
}

function FoodDetail({ food, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{food.name}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div style={{ overflowY: 'auto', flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 6 }}>📍 {food.location}</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>{food.description}</p>
            <div style={{ marginTop: 10, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, color: 'var(--accent)' }}>{food.price}</span>
              {food.mustTry && <span className="badge badge-mustdo">⭐ Must Try</span>}
            </div>
          </div>
          <RatingStars itemType="food" itemId={food.id} />
          <PhotoManager itemType="food" itemId={food.id} itemName={food.name} />
        </div>
      </div>
    </div>
  )
}

export default function FoodDrinks() {
  const { triedFood, toggleFood, triedDrinks, toggleDrink, isDisney } = useApp()
  const [tab,    setTab]    = useState(isDisney ? 'datw' : 'universal')
  const [detail, setDetail] = useState(null)  // { type: 'country'|'food', item }
  const [who,    setWhoState] = useState(loadWho)

  const { drinkingAroundTheWorld, disneyWorldFood, universalFood } = FOOD_DRINKS

  const cwTotal = drinkingAroundTheWorld.countries.length
  const cwDone  = drinkingAroundTheWorld.countries.filter(c => {
    const w = who[c.id]
    return w?.triedBy?.length > 0 || triedDrinks.has(c.id)
  }).length

  const tabs = isDisney
    ? [
        { id: 'datw',    label: '🌍 Drink Around the World' },
        { id: 'disney',  label: '🏰 Disney Eats' },
      ]
    : [{ id: 'universal', label: '🎥 Universal Eats' }]

  return (
    <div className="food-page animate-fade-in">
      <h1 className="page-title">🍹 Food & Drinks</h1>
      <p className="page-subtitle">
        {isDisney ? 'Track every bite and sip — tap any item for details, ratings, and photos.' : 'The essential Universal Orlando eating guide.'}
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
            <div className="datw-hero-title">🌍 Drinking Around the World</div>
            <p className="datw-hero-sub">{drinkingAroundTheWorld.description}</p>
            <div className="park-progress" style={{ maxWidth: 460, margin: '16px auto 12px', background: 'transparent', border: 'none' }}>
              <div className="park-progress-label">
                <span>Countries Conquered</span>
                <span>{cwDone} / {cwTotal}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${Math.round((cwDone/cwTotal)*100)}%`, background: 'linear-gradient(to right, #00A8CC, #27AE60)' }} />
              </div>
            </div>
            {/* Who's participating */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {DATW_PEOPLE.map(person => {
                const count = Object.values(who).filter(v => v.triedBy?.includes(person)).length
                return (
                  <div key={person} className="datw-person-stat">
                    <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '1.1rem' }}>{count}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{person}</span>
                  </div>
                )
              })}
            </div>
            {cwDone === cwTotal && <p style={{ color: 'var(--accent)', marginTop: 8, fontWeight: 800, fontSize: '0.9rem' }}>🎉 World Showcase Champions!</p>}
          </div>

          {drinkingAroundTheWorld.countries.map((c, i) => {
            const w       = who[c.id] || {}
            const tried   = triedDrinks.has(c.id) || (w.triedBy?.length > 0)
            return (
              <div
                key={c.id}
                className={`country-card${tried ? ' tried' : ''} animate-float-up`}
                style={{ animationDelay: `${i * 0.03}s`, cursor: 'pointer' }}
                onClick={() => setDetail({ type: 'country', item: c })}
              >
                <div className="country-flag">{c.flag}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 800 }}>#{i + 1}</span>
                    <div className="country-name">{c.country}</div>
                  </div>
                  <div className="country-drink-name">⭐ {c.recommendedDrink}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                    Also: {c.alternatives.join(' · ')}
                  </div>
                  {/* Who drank it */}
                  {w.triedBy?.length > 0 && (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {w.triedBy.map(p => (
                        <span key={p} className="datw-person-drank">{p} ✓</span>
                      ))}
                    </div>
                  )}
                  {w.drink && w.drink !== c.recommendedDrink && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: 3 }}>
                      🥂 Had: {w.drink}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div className="country-check">{tried && '✓'}</div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 700 }}>Tap for details</span>
                </div>
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
                    <div
                      key={f.id}
                      className={`food-card${triedFood.has(f.id) ? ' eaten' : ''} animate-float-up`}
                      style={{ animationDelay: `${i * 0.04}s`, cursor: 'pointer' }}
                      onClick={() => setDetail({ type: 'food', item: f })}
                    >
                      {triedFood.has(f.id) && <div className="food-tried-stamp">✓ Tried!</div>}
                      <div className="food-name">{f.name}</div>
                      <div className="food-loc">📍 {f.location}</div>
                      <div className="food-desc">{f.description}</div>
                      <div className="food-meta">
                        <span className="food-price">{f.price}</span>
                        {f.mustTry && <span className="food-must-tag">⭐ Must Try</span>}
                      </div>
                      <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                        <button
                          className={`filter-pill${triedFood.has(f.id) ? ' on' : ''}`}
                          style={{ fontSize: '0.72rem', padding: '4px 10px' }}
                          onClick={e => { e.stopPropagation(); toggleFood(f.id) }}
                        >
                          {triedFood.has(f.id) ? '✓ Tried' : 'Mark Tried'}
                        </button>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tap for photos & rating</span>
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
                    <div
                      key={f.id}
                      className={`food-card${triedFood.has(f.id) ? ' eaten' : ''} animate-float-up`}
                      style={{ animationDelay: `${i * 0.04}s`, cursor: 'pointer' }}
                      onClick={() => setDetail({ type: 'food', item: f })}
                    >
                      {triedFood.has(f.id) && <div className="food-tried-stamp">✓ Tried!</div>}
                      <div className="food-name">{f.name}</div>
                      <div className="food-loc">📍 {f.location}</div>
                      <div className="food-desc">{f.description}</div>
                      <div className="food-meta">
                        <span className="food-price">{f.price}</span>
                        {f.mustTry && <span className="food-must-tag">⭐ Must Try</span>}
                      </div>
                      <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                        <button
                          className={`filter-pill${triedFood.has(f.id) ? ' on' : ''}`}
                          style={{ fontSize: '0.72rem', padding: '4px 10px' }}
                          onClick={e => { e.stopPropagation(); toggleFood(f.id) }}
                        >
                          {triedFood.has(f.id) ? '✓ Tried' : 'Mark Tried'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Detail modals */}
      {detail?.type === 'country' && (
        <CountryDetail
          c={detail.item}
          onClose={() => { setDetail(null); setWhoState(loadWho()) }}
        />
      )}
      {detail?.type === 'food' && (
        <FoodDetail
          food={detail.item}
          onClose={() => setDetail(null)}
        />
      )}
    </div>
  )
}
