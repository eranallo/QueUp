import { useState } from 'react'
import { FOOD_DRINKS } from '../data'
import { useApp } from '../App'
import { useResortData } from '../useResortData'
import PhotoManager from './PhotoManager'
import RatingStars from './RatingStars'

// ─────────────────────────────────────────────────────────────
// DATW DATA LAYER
// New structure per country: { Lauren: 'Margarita', Evan: null, Makayla: 'Tequila flight' }
// Backward compatible with old { drink, triedBy } format
// ─────────────────────────────────────────────────────────────
const DATW_PEOPLE = ['Lauren', 'Evan', 'Makayla']
const DATW_PERSON_COLORS = {
  Lauren:  { bg: 'rgba(244,114,182,0.15)', color: '#f472b6', border: 'rgba(244,114,182,0.3)' },
  Evan:    { bg: 'rgba(96,165,250,0.15)',  color: '#60a5fa', border: 'rgba(96,165,250,0.3)'  },
  Makayla: { bg: 'rgba(52,211,153,0.15)',  color: '#34d399', border: 'rgba(52,211,153,0.3)'  },
}
const DATW_KEY = 'pp_datw_v2'

function loadDATW() {
  try { return JSON.parse(localStorage.getItem(DATW_KEY)) || {} } catch { return {} }
}
function saveDATW(data) { localStorage.setItem(DATW_KEY, JSON.stringify(data)) }

function getCountryEntry(countryId) {
  const data = loadDATW()
  return data[countryId] || {}
}
function setPersonDrink(countryId, person, drink) {
  const data = loadDATW()
  data[countryId] = { ...(data[countryId] || {}), [person]: drink }
  saveDATW(data)
}
function getPersonDrink(countryId, person) {
  return loadDATW()[countryId]?.[person] || null
}
function isCountryDone(countryId) {
  const entry = loadDATW()[countryId] || {}
  return DATW_PEOPLE.some(p => !!entry[p])
}
function getPersonCount(person) {
  const data = loadDATW()
  return Object.values(data).filter(v => !!v[person]).length
}

// ─────────────────────────────────────────────────────────────
// PASSPORT STAMP — Country card
// ─────────────────────────────────────────────────────────────
function PassportCard({ c, index, onOpen }) {
  const [data, setData] = useState(() => loadDATW()[c.id] || {})
  const done = DATW_PEOPLE.some(p => !!data[p])

  return (
    <div
      className={`passport-card${done ? ' stamped' : ''} animate-float-up`}
      style={{ animationDelay: `${index * 0.03}s` }}
      onClick={onOpen}
    >
      {/* Left: flag + stamp area */}
      <div className="passport-card-left">
        <div className="passport-flag">{c.flag}</div>
        <div className={`passport-stamp${done ? ' done' : ''}`}>
          {done ? '✓' : '#' + (index + 1)}
        </div>
      </div>

      {/* Center: country info */}
      <div className="passport-card-center">
        <div className="passport-country">{c.country}</div>
        <div className="passport-drink">⭐ {c.recommendedDrink}</div>

        {/* Per-person drink display */}
        <div className="passport-persons">
          {DATW_PEOPLE.map(person => {
            const drink = data[person]
            const col   = DATW_PERSON_COLORS[person]
            return drink ? (
              <div
                key={person}
                className="passport-person-chip"
                style={{ background: col.bg, color: col.color, borderColor: col.border }}
              >
                <span style={{ fontWeight: 900, fontSize: '0.65rem' }}>{person.slice(0,1)}</span>
                <span style={{ fontSize: '0.7rem' }}>{drink.length > 16 ? drink.slice(0, 14) + '…' : drink}</span>
              </div>
            ) : (
              <div
                key={person}
                className="passport-person-chip empty"
              >
                <span style={{ fontWeight: 900, fontSize: '0.65rem' }}>{person.slice(0,1)}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Right: chevron */}
      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', flexShrink: 0 }}>›</div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// COUNTRY DETAIL SHEET
// ─────────────────────────────────────────────────────────────
function CountrySheet({ c, onClose }) {
  const [selections, setSelections] = useState(() => loadDATW()[c.id] || {})
  const allDrinks = [c.recommendedDrink, ...c.alternatives]

  const selectDrink = (person, drink) => {
    const isSame   = selections[person] === drink
    const newDrink = isSame ? null : drink
    const updated  = { ...selections, [person]: newDrink }
    if (!newDrink) delete updated[person]
    setSelections(updated)
    setPersonDrink(c.id, person, newDrink)
  }

  return (
    <div className="jn-sheet-overlay" onClick={onClose}>
      <div className="jn-sheet animate-float-up" onClick={e => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="jn-sheet-handle" />

        {/* Header */}
        <div className="jn-sheet-header" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', align: 'center', gap: 10 }}>
            <span style={{ fontSize: '2rem' }}>{c.flag}</span>
            <div>
              <div className="jn-sheet-title">{c.country}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>World Showcase Pavilion</div>
            </div>
          </div>
          <button className="jn-sheet-close" onClick={onClose}>✕</button>
        </div>

        {/* About */}
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 16 }}>
          {c.description}
        </p>

        {/* Pro tip */}
        <div style={{ padding: '10px 14px', background: 'var(--accent-dim)', borderRadius: 'var(--r-md)', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
          💡 {c.proTip}
        </div>

        {/* Per-person drink selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
          {DATW_PEOPLE.map(person => {
            const col      = DATW_PERSON_COLORS[person]
            const selected = selections[person]
            return (
              <div key={person} className="datw-person-section">
                <div className="datw-person-header" style={{ color: col.color }}>
                  <span className="datw-person-avatar" style={{ background: col.bg, borderColor: col.border, color: col.color }}>
                    {person.slice(0,1)}
                  </span>
                  <span>{person}</span>
                  {selected && <span className="datw-person-selected-badge" style={{ background: col.bg, color: col.color, borderColor: col.border }}>✓ {selected}</span>}
                </div>
                <div className="datw-drink-grid">
                  {allDrinks.map((drink, i) => (
                    <button
                      key={drink}
                      className={`datw-drink-btn${selected === drink ? ' active' : ''}`}
                      style={selected === drink ? { background: col.bg, borderColor: col.color, color: col.color } : {}}
                      onClick={() => selectDrink(person, drink)}
                    >
                      {i === 0 && <span className="datw-rec-star">⭐</span>}
                      {drink}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Rating + Photos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <RatingStars itemType="datw" itemId={c.id} />
          <PhotoManager itemType="datw" itemId={c.id} itemName={`${c.country} DATW`} />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// FOOD CARD + DETAIL
// ─────────────────────────────────────────────────────────────
function FoodCard({ food, tried, onToggle, onDetail }) {
  return (
    <div className={`food-card${tried ? ' eaten' : ''}`} onClick={onDetail}>
      {tried && <div className="food-tried-stamp">✓ Tried!</div>}
      <div className="food-name">{food.name}</div>
      <div className="food-loc">📍 {food.location}</div>
      <div className="food-desc">{food.description}</div>
      <div className="food-meta">
        <span className="food-price">{food.price}</span>
        {food.mustTry && <span className="food-must-tag">⭐ Must Try</span>}
      </div>
      <button
        className={`filter-pill${tried ? ' on' : ''}`}
        style={{ fontSize: '0.72rem', padding: '5px 12px', marginTop: 10 }}
        onClick={e => { e.stopPropagation(); onToggle() }}
      >
        {tried ? '✓ Tried it!' : 'Mark as Tried'}
      </button>
    </div>
  )
}

function FoodDetailSheet({ food, onClose }) {
  return (
    <div className="jn-sheet-overlay" onClick={onClose}>
      <div className="jn-sheet animate-float-up" onClick={e => e.stopPropagation()}>
        <div className="jn-sheet-handle" />
        <div className="jn-sheet-header">
          <span className="jn-sheet-title">{food.name}</span>
          <button className="jn-sheet-close" onClick={onClose}>✕</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 8 }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 6 }}>📍 {food.location}</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>{food.description}</p>
            <div style={{ marginTop: 10, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '1rem' }}>{food.price}</span>
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

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function FoodDrinks() {
  const { triedFood, toggleFood, isDisney }  = useApp()
  const { resortFood, disneyFood, universalFood } = useResortData()
  const [tab,    setTab]    = useState(isDisney ? 'datw' : 'food')
  const [detail, setDetail] = useState(null)
  const [datwData, setDatwData] = useState(() => loadDATW())

  const { drinkingAroundTheWorld } = FOOD_DRINKS
  const disneyWorldFood = disneyFood

  const refreshDATW = () => setDatwData(loadDATW())

  // DATW stats
  const datwDone  = drinkingAroundTheWorld.countries.filter(c => isCountryDone(c.id)).length
  const datwTotal = drinkingAroundTheWorld.countries.length

  const tabs = isDisney
    ? [
        { id: 'datw', label: '🌍 DATW Challenge' },
        { id: 'food', label: '🍽️ Disney Eats' },
      ]
    : [{ id: 'food', label: '🍽️ Universal Eats' }]

  return (
    <div className="food-page animate-fade-in">
      <h1 className="page-title">{isDisney ? '🍹 Food & Drinks' : '🌭 Universal Eats'}</h1>
      <p className="page-subtitle">
        {isDisney ? 'Track every bite and sip, and conquer the World Showcase.' : 'The essential Universal Orlando eating guide.'}
      </p>

      <div className="tabs animate-float-up">
        {tabs.map(t => (
          <button key={t.id} className={`tab-btn${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {/* ── DATW PASSPORT UI ── */}
      {tab === 'datw' && (
        <div>
          {/* Passport hero */}
          <div className="datw-passport-hero">
            <div className="datw-passport-title">
              <span style={{ fontSize: '1.5rem' }}>🌍</span>
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.05rem', fontWeight: 700 }}>Drink Around the World</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>World Showcase · EPCOT</div>
              </div>
            </div>

            {/* Progress ring + count */}
            <div className="datw-progress-wrap">
              <div className="datw-big-count" style={{ color: datwDone === datwTotal ? '#10b981' : 'var(--accent)' }}>
                {datwDone}<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 700 }}>/{datwTotal}</span>
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Countries</div>
            </div>
          </div>

          {/* Full-width progress bar */}
          <div style={{ margin: '0 0 16px' }}>
            <div className="progress-track" style={{ height: 10 }}>
              <div className="progress-fill" style={{
                width: `${Math.round((datwDone / datwTotal) * 100)}%`,
                background: 'linear-gradient(to right, #06b6d4, #10b981)',
                transition: 'width 0.8s ease',
              }} />
            </div>
          </div>

          {/* Per-person leaderboard */}
          <div className="datw-leaderboard">
            {DATW_PEOPLE.map((person, i) => {
              const count = getPersonCount(person)
              const col   = DATW_PERSON_COLORS[person]
              const isWinning = count === Math.max(...DATW_PEOPLE.map(p => getPersonCount(p))) && count > 0
              return (
                <div key={person} className="datw-leader-card" style={{ borderColor: col.border, background: col.bg }}>
                  {isWinning && <div className="datw-crown">👑</div>}
                  <div className="datw-leader-avatar" style={{ color: col.color, background: `${col.color}22`, border: `2px solid ${col.color}` }}>
                    {person.slice(0,1)}
                  </div>
                  <div className="datw-leader-name">{person}</div>
                  <div className="datw-leader-count" style={{ color: col.color }}>{count}</div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontWeight: 700 }}>countries</div>
                </div>
              )
            })}
          </div>

          {datwDone === datwTotal && (
            <div className="datw-champion-banner">
              🏆 World Showcase Champions! All 11 countries conquered!
            </div>
          )}

          {/* Passport cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {drinkingAroundTheWorld.countries.map((c, i) => (
              <PassportCard
                key={c.id}
                c={c}
                index={i}
                onOpen={() => setDetail({ type: 'country', item: c })}
              />
            ))}
          </div>

          <div style={{ marginTop: 16, padding: '14px 16px', background: 'var(--bg-card)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
              {drinkingAroundTheWorld.tips}
            </p>
          </div>
        </div>
      )}

      {/* ── FOOD TABS ── */}
      {tab === 'food' && (
        <div>
          {(isDisney
            ? ['Magic Kingdom', 'EPCOT', 'Hollywood Studios', 'Animal Kingdom']
            : ['Wizarding World', 'Springfield', 'Epic Universe']
          ).map(cat => {
            const items = (isDisney ? disneyWorldFood : universalFood).filter(f => f.category === cat)
            if (!items.length) return null
            return (
              <div key={cat} style={{ marginBottom: 32 }}>
                <div className="rd-section-label">{cat}</div>
                <div className="food-grid">
                  {items.map(f => (
                    <FoodCard
                      key={f.id}
                      food={f}
                      tried={triedFood.has(f.id)}
                      onToggle={() => toggleFood(f.id, f.name)}
                      onDetail={() => setDetail({ type: 'food', item: f })}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Detail sheets */}
      {detail?.type === 'country' && (
        <CountrySheet
          c={detail.item}
          onClose={() => { setDetail(null); refreshDATW() }}
        />
      )}
      {detail?.type === 'food' && (
        <FoodDetailSheet
          food={detail.item}
          onClose={() => setDetail(null)}
        />
      )}
    </div>
  )
}
