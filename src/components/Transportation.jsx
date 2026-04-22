import { useState, useMemo } from 'react'
import { useApp } from '../App'
import {
  DISNEY_LOCATIONS, UNIVERSAL_LOCATIONS,
  DISNEY_ROUTES, UNIVERSAL_ROUTES,
  DISNEY_TRANSPORT_GUIDE, UNIVERSAL_TRANSPORT_GUIDE,
  TRANSPORT_ICONS,
} from '../transportationData'

// ── Route Finder ──────────────────────────────────────────────
function RouteFinder({ isDisney }) {
  const locations = isDisney ? DISNEY_LOCATIONS : UNIVERSAL_LOCATIONS
  const routes    = isDisney ? DISNEY_ROUTES    : UNIVERSAL_ROUTES

  const [from, setFrom] = useState('')
  const [to,   setTo]   = useState('')

  const locationList = Object.entries(locations).map(([id, loc]) => ({ id, ...loc }))

  // Build route key — try both directions
  const routeKey    = from && to ? `${from}→${to}` : null
  const reverseKey  = from && to ? `${to}→${from}` : null
  const route       = routeKey ? (routes[routeKey] || routes[reverseKey]) : null

  const swap = () => { const tmp = from; setFrom(to); setTo(tmp) }

  return (
    <div className="tp-finder">
      <div className="tp-finder-title">🧭 Get Me There</div>
      <p className="tp-finder-sub">Select your starting point and destination for step-by-step directions.</p>

      <div className="tp-finder-selectors">
        <div className="tp-selector-wrap">
          <label className="tp-selector-label">📍 I'm currently at</label>
          <select
            className="tp-selector"
            value={from}
            onChange={e => setFrom(e.target.value)}
          >
            <option value="">— Select location —</option>
            {['park', 'hub', 'resort'].map(type => {
              const group = locationList.filter(l => l.type === type)
              if (!group.length) return null
              return (
                <optgroup key={type} label={type === 'park' ? '🎡 Parks' : type === 'hub' ? '🏙️ Hubs & Areas' : '🏨 Resorts'}>
                  {group.map(l => (
                    <option key={l.id} value={l.id}>{l.emoji} {l.name}</option>
                  ))}
                </optgroup>
              )
            })}
          </select>
        </div>

        <button className="tp-swap-btn" onClick={swap} title="Swap">⇅</button>

        <div className="tp-selector-wrap">
          <label className="tp-selector-label">🎯 I want to get to</label>
          <select
            className="tp-selector"
            value={to}
            onChange={e => setTo(e.target.value)}
          >
            <option value="">— Select destination —</option>
            {['park', 'hub', 'resort'].map(type => {
              const group = locationList.filter(l => l.type === type && l.id !== from)
              if (!group.length) return null
              return (
                <optgroup key={type} label={type === 'park' ? '🎡 Parks' : type === 'hub' ? '🏙️ Hubs & Areas' : '🏨 Resorts'}>
                  {group.map(l => (
                    <option key={l.id} value={l.id}>{l.emoji} {l.name}</option>
                  ))}
                </optgroup>
              )
            })}
          </select>
        </div>
      </div>

      {/* Results */}
      {from && to && (
        <div className="tp-result animate-float-up">
          {route ? (
            <>
              <div className="tp-result-header">
                <span>{locations[from]?.emoji} {locations[from]?.name}</span>
                <span className="tp-result-arrow">→</span>
                <span>{locations[to]?.emoji} {locations[to]?.name}</span>
              </div>
              <div className="tp-result-time">⏱ Estimated: {route.time}</div>

              {route.options.map((opt, i) => (
                <div key={i} className={`tp-option${i === 0 ? ' best' : ''}`}>
                  {i === 0 && <div className="tp-best-badge">⭐ Best Option</div>}
                  <div className="tp-option-header">
                    <span className="tp-method-icon">{TRANSPORT_ICONS[opt.method] || '🚌'}</span>
                    <span className="tp-method-name">{opt.method.charAt(0).toUpperCase() + opt.method.slice(1)}</span>
                    <span className="tp-option-time">{opt.time}</span>
                  </div>
                  <ol className="tp-steps">
                    {opt.steps.map((step, si) => (
                      <li key={si} className="tp-step">{step}</li>
                    ))}
                  </ol>
                  {opt.tip && (
                    <div className="tp-option-tip">💡 {opt.tip}</div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="tp-no-route">
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>🤔</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>No direct route found</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Try using a Disney Bus for any park-to-park route not listed — buses connect every park and resort. Check My Disney Experience for real-time schedules.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Transport Guide Card ──────────────────────────────────────
function TransportCard({ transport }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="tp-guide-card">
      <button className="tp-guide-header" onClick={() => setOpen(v => !v)}>
        <div className="tp-guide-header-left">
          <span className="tp-guide-icon" style={{ background: `${transport.color}22`, color: transport.color }}>
            {transport.icon}
          </span>
          <div>
            <div className="tp-guide-name">{transport.name}</div>
            <div className="tp-guide-desc-short">{transport.description.slice(0, 60)}…</div>
          </div>
        </div>
        <span className="tp-guide-chevron" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>

      {open && (
        <div className="tp-guide-body animate-float-up">
          <p className="tp-guide-desc">{transport.description}</p>

          {transport.routes.length > 0 && (
            <div className="tp-guide-routes">
              <div className="tp-guide-routes-label">Key Routes</div>
              {transport.routes.map((r, i) => (
                <div key={i} className="tp-guide-route">
                  <span className="tp-guide-route-from">{r.from}</span>
                  <span className="tp-guide-route-arrow">→</span>
                  <span className="tp-guide-route-to">{r.to}</span>
                  <span className="tp-guide-route-note">{r.note}</span>
                </div>
              ))}
            </div>
          )}

          {transport.tips.length > 0 && (
            <div className="tp-guide-tips">
              <div className="tp-guide-tips-label">Pro Tips</div>
              {transport.tips.map((tip, i) => (
                <div key={i} className="tp-guide-tip">
                  <span style={{ flexShrink: 0 }}>💡</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────
export default function Transportation() {
  const { isDisney } = useApp()
  const [tab, setTab] = useState('finder')
  const guide = isDisney ? DISNEY_TRANSPORT_GUIDE : UNIVERSAL_TRANSPORT_GUIDE

  return (
    <div className="tp-page animate-fade-in">

      {/* Header */}
      <div className="tp-header">
        <h1 className="tp-title">🚌 Transportation</h1>
        <p className="tp-subtitle">
          {isDisney
            ? 'Navigate Walt Disney World — monorails, boats, Skyliner, buses, and walking routes.'
            : 'Navigate Universal Orlando — walking paths, water taxis, and shuttles.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="tp-tabs">
        <button className={`tp-tab${tab === 'finder' ? ' active' : ''}`} onClick={() => setTab('finder')}>
          🧭 Route Finder
        </button>
        <button className={`tp-tab${tab === 'guide' ? ' active' : ''}`} onClick={() => setTab('guide')}>
          📖 Full Guide
        </button>
      </div>

      {tab === 'finder' && <RouteFinder isDisney={isDisney} />}

      {tab === 'guide' && (
        <div className="tp-guide-list">
          {guide.map(transport => (
            <TransportCard key={transport.type} transport={transport} />
          ))}

          {/* General tips */}
          <div className="tp-general-tips">
            <div className="tp-general-tips-title">
              {isDisney ? '🏰 Disney World General Tips' : '🎬 Universal General Tips'}
            </div>
            {isDisney ? (
              <ul className="tp-tip-list">
                <li>Download My Disney Experience — it shows real-time bus ETAs at your stop</li>
                <li>Resort guests get 1-hour Early Theme Park Entry — use monorail/Skyliner to arrive without bus wait</li>
                <li>Park hopping? Bus is often faster than it looks on the map because routes are direct</li>
                <li>After Happily Ever After fireworks, the monorail queue can be 45+ minutes — walk if you're at Contemporary</li>
                <li>The Skyliner closes during lightning — always know your bus backup on stormy days</li>
              </ul>
            ) : (
              <ul className="tp-tip-list">
                <li>Premier hotel guests can walk to parks — this is the fastest option, rain or shine</li>
                <li>Universal Express Unlimited (included with Premier hotels) makes in-park efficiency irrelevant — focus on getting there fast</li>
                <li>Epic Universe shuttles fill up fast on opening days — walk from Cabana Bay, Stella Nova, or Terra Luna</li>
                <li>CityWalk is the connector between USF, IOA, and the hotels — learn its layout on your first day</li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
