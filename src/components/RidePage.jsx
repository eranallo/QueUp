import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { RESORTS } from '../data'
import { RIDE_ENHANCEMENTS } from '../rideEnhancements'
import { useApp } from '../App'
import { useLiveData } from '../context/LiveDataContext'
import PhotoManager from './PhotoManager'
import RatingStars from './RatingStars'
import { DARK_HISTORY } from '../darkHistory'
import { RIDE_HISTORY } from '../rideHistory'
import { RIDE_LAYOUTS } from '../rideLayouts'

const THRILL = ['', '😌 Gentle', '🌊 Mild Thrill', '🌀 Moderate', '🔥 Thrilling', '💀 Intense']

const tipStyle = {
  display: 'flex', gap: 12, padding: '11px 16px',
  background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)',
  borderRadius: 'var(--r-md)', fontSize: '0.88rem',
  color: 'var(--text-secondary)', lineHeight: 1.55,
}
const insiderStyle = {
  display: 'flex', gap: 12, padding: '11px 16px', alignItems: 'flex-start',
  background: 'var(--theme-dim)', border: '1px solid var(--theme-glow)',
  borderRadius: 'var(--r-md)', fontSize: '0.88rem',
  color: 'var(--text-secondary)', lineHeight: 1.55,
}

// ── Collapsible section (#3) ─────────────────────────────────
function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="collapsible-section">
      <button className="collapsible-header" onClick={() => setOpen(v => !v)}>
        <span className="collapsible-title">{title}</span>
        <span className={`collapsible-chevron${open ? ' open' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="collapsible-body animate-float-up">
          {children}
        </div>
      )}
    </div>
  )
}


// ── Ride Layout Viewer ───────────────────────────────────────
function RideLayoutViewer({ rideId }) {
  const layout = RIDE_LAYOUTS[rideId]
  if (!layout) return null

  const [open,    setOpen]    = React.useState(false)
  const [scale,   setScale]   = React.useState(1)
  const [pos,     setPos]     = React.useState({ x: 0, y: 0 })
  const [dragging, setDragging] = React.useState(false)
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 })
  const [lastPinchDist, setLastPinchDist] = React.useState(null)
  const imgRef = React.useRef()

  const reset = () => { setScale(1); setPos({ x: 0, y: 0 }) }
  const close = () => { setOpen(false); reset() }

  // Mouse drag
  const onMouseDown = e => {
    if (scale <= 1) return
    setDragging(true)
    setDragStart({ x: e.clientX - pos.x, y: e.clientY - pos.y })
  }
  const onMouseMove = e => {
    if (!dragging) return
    setPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }
  const onMouseUp = () => setDragging(false)

  // Touch pinch-to-zoom
  const onTouchStart = e => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      setLastPinchDist(Math.sqrt(dx*dx + dy*dy))
    } else if (e.touches.length === 1 && scale > 1) {
      setDragging(true)
      setDragStart({ x: e.touches[0].clientX - pos.x, y: e.touches[0].clientY - pos.y })
    }
  }
  const onTouchMove = e => {
    if (e.touches.length === 2 && lastPinchDist) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.sqrt(dx*dx + dy*dy)
      const newScale = Math.min(5, Math.max(1, scale * (dist / lastPinchDist)))
      setScale(newScale)
      if (newScale <= 1) setPos({ x: 0, y: 0 })
      setLastPinchDist(dist)
      e.preventDefault()
    } else if (e.touches.length === 1 && dragging) {
      setPos({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y })
    }
  }
  const onTouchEnd = () => { setDragging(false); setLastPinchDist(null) }

  // Double tap to zoom
  const lastTap = React.useRef(0)
  const onDoubleTap = e => {
    const now = Date.now()
    if (now - lastTap.current < 300) {
      if (scale > 1) { reset() } else { setScale(2.5) }
    }
    lastTap.current = now
  }

  return (
    <>
      {/* Thumbnail preview */}
      <div className="rl-preview" onClick={() => setOpen(true)}>
        <img src={layout.src} alt="Ride layout map" className="rl-thumb" />
        <div className="rl-preview-overlay">
          <span className="rl-zoom-hint">🔍 Tap to view full layout</span>
        </div>
        <div className="rl-credit">© {layout.credit} · {layout.parks}</div>
      </div>

      {/* Fullscreen lightbox */}
      {open && (
        <div className="rl-lightbox" onClick={e => { if (e.target === e.currentTarget) close() }}>
          <div className="rl-lightbox-toolbar">
            <span className="rl-lightbox-title">Ride Layout</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="rl-toolbar-btn" onClick={reset}>↺ Reset</button>
              <button className="rl-toolbar-btn" onClick={() => setScale(s => Math.min(5, s + 0.5))}>＋</button>
              <button className="rl-toolbar-btn" onClick={() => setScale(s => Math.max(1, s - 0.5))}>－</button>
              <button className="rl-toolbar-btn close" onClick={close}>✕</button>
            </div>
          </div>

          <div
            className="rl-lightbox-stage"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onClick={onDoubleTap}
            style={{ cursor: scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'default' }}
          >
            <img
              ref={imgRef}
              src={layout.src}
              alt="Ride layout"
              className="rl-lightbox-img"
              style={{
                transform: `scale(${scale}) translate(${pos.x / scale}px, ${pos.y / scale}px)`,
                transition: dragging || lastPinchDist ? 'none' : 'transform 0.2s ease',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}
              draggable={false}
            />
          </div>

          <div className="rl-lightbox-hint">
            {scale <= 1
              ? 'Pinch or double-tap to zoom · Tap outside to close'
              : 'Drag to pan · Double-tap to reset · Tap outside to close'}
          </div>
          <div className="rl-credit" style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }}>
            © {layout.credit} · {layout.parks}
          </div>
        </div>
      )}
    </>
  )
}

// ── Ride History Timeline ───────────────────────────────────
const EVENT_STYLE = {
  opening:   { color: '#10b981', icon: '🎉', label: 'Grand Opening' },
  closure:   { color: '#ef4444', icon: '🔒', label: 'Closed'        },
  refurb:    { color: '#60a5fa', icon: '🔧', label: 'Refurbishment' },
  rename:    { color: '#f59e0b', icon: '✏️', label: 'Renamed'       },
  milestone: { color: '#a78bfa', icon: '⭐', label: 'Milestone'     },
  tragedy:   { color: '#f87171', icon: '⚠️', label: 'Incident'      },
  replaced:  { color: '#94a3b8', icon: '🔄', label: 'Replaced'      },
  darkperiod:{ color: '#6b7280', icon: '🌑', label: 'Dark Period'   },
}

function RideTimeline({ rideId }) {
  const hist = RIDE_HISTORY[rideId]
  if (!hist) return null

  return (
    <div className="rh-wrap">
      {/* Former attraction callout */}
      {hist.formerAttraction && (
        <div className="rh-former">
          <div className="rh-former-label">🔄 This ride replaced:</div>
          <div className="rh-former-name">{hist.formerAttraction.name}</div>
          <div className="rh-former-years">{hist.formerAttraction.years}</div>
          <p className="rh-former-note">{hist.formerAttraction.note}</p>
        </div>
      )}

      {/* Building history */}
      {hist.buildingHistory && (
        <div className="rh-building">
          <div className="rh-building-label">🏗️ Show Building History</div>
          <p className="rh-building-text">{hist.buildingHistory}</p>
        </div>
      )}

      {/* Timeline */}
      {hist.timeline?.length > 0 && (
        <div className="rh-timeline">
          {hist.timeline.map((ev, i) => {
            const style = EVENT_STYLE[ev.type] || EVENT_STYLE.milestone
            return (
              <div key={i} className="rh-event">
                <div className="rh-event-left">
                  <div className="rh-event-icon" style={{ background: `${style.color}22`, color: style.color }}>
                    {style.icon}
                  </div>
                  {i < hist.timeline.length - 1 && <div className="rh-event-line" />}
                </div>
                <div className="rh-event-body">
                  <div className="rh-event-year" style={{ color: style.color }}>{ev.year}</div>
                  <div className="rh-event-type" style={{ color: style.color }}>{style.label}</div>
                  <p className="rh-event-text">{ev.event}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Dark History Body ───────────────────────────────────────
function DarkHistoryBody({ data }) {
  return (
    <div className="dh-body">
      <div className="dh-warning">
        ⚠️ Contains references to real accidents and deaths. All incidents are documented from public sources. Reader discretion advised.
      </div>

      {data.incidents?.length > 0 && (
        <div className="dh-group">
          <div className="dh-group-label">📋 Documented Incidents</div>
          {data.incidents.map((inc, i) => (
            <div key={i} className="dh-incident">
              <div className="dh-incident-header">
                <span className="dh-year">{inc.year}</span>
                <span className={`dh-type-badge ${inc.type}`}>{inc.type === 'fact' ? '✓ Documented' : '⚠ Alleged'}</span>
              </div>
              <div className="dh-incident-title">{inc.title}</div>
              <p className="dh-incident-detail">{inc.detail}</p>
            </div>
          ))}
        </div>
      )}

      {data.legends?.length > 0 && (
        <div className="dh-group">
          <div className="dh-group-label">👻 Urban Legends & Rumors</div>
          {data.legends.map((leg, i) => (
            <div key={i} className="dh-legend">
              <div className="dh-incident-title">{leg.title}</div>
              <p className="dh-incident-detail">{leg.detail}</p>
              <div className="dh-verdict">Verdict: {leg.verdict}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function RidePage() {
  const { rideId } = useParams()
  const navigate   = useNavigate()
  const { checkedRides, toggleRide, manualDown, toggleManualDown,
          personalMustRide, togglePersonalMust, isDisney } = useApp()
  const { getRideLive, getRideImage } = useLiveData()

  let found = null, foundPark = null, foundLand = null
  for (const resort of RESORTS)
    for (const park of resort.parks)
      for (const land of park.lands) {
        const ride = land.rides.find(r => r.id === rideId)
        if (ride) { found = ride; foundPark = park; foundLand = land }
      }

  if (!found) return (
    <div className="ride-detail">
      <button className="back-link" onClick={() => navigate(-1)}>← Back</button>
      <p>Ride not found.</p>
    </div>
  )

  const enh       = RIDE_ENHANCEMENTS[found.id] || {}
  const allTrivia = [...(found.trivia || []), ...(enh.deeperTrivia || [])]
  const isRidden  = checkedRides.has(found.id)
  const isDown    = manualDown.has(found.id)
  const isMyMust  = personalMustRide.has(found.id)
  const live      = getRideLive(found.name)

  // #4 — only show image if we actually have one, no placeholder
  const apiImage = getRideImage(found.name)
  const img      = found.imageUrl || apiImage || null

  // #5 — live bar status, clean wait time display (no clock emoji)
  const liveStatus   = isDown ? 'DOWN' : live?.status
  const liveBarClass = { OPERATING: 'open', DOWN: 'down', CLOSED: 'closed', REFURBISHMENT: 'refurb' }[liveStatus] || ''

  const resources = enh.resources?.length ? enh.resources : (() => {
    const parkUrls = {
      'magic-kingdom':             'https://disneyworld.disney.go.com/attractions/magic-kingdom/',
      'epcot':                     'https://disneyworld.disney.go.com/attractions/epcot/',
      'hollywood-studios':         'https://disneyworld.disney.go.com/attractions/hollywood-studios/',
      'animal-kingdom':            'https://disneyworld.disney.go.com/attractions/animal-kingdom/',
      'universal-studios-florida': 'https://www.universalorlando.com/web/en/us/things-to-do/rides-attractions/',
      'islands-of-adventure':      'https://www.universalorlando.com/web/en/us/things-to-do/rides-attractions/',
      'epic-universe':             'https://www.universalorlando.com/web/en/us/universal-epic-universe',
    }
    const out = [{ label: `${foundPark.emoji} ${foundPark.name} — All Attractions`, url: parkUrls[foundPark.id] || '#' }]
    if (isDisney && found.lightningLane) out.push({ label: '⚡ Lightning Lane — Plan & Purchase', url: 'https://disneyworld.disney.go.com/plan/my-disney-experience/lightning-lane/' })
    if (!isDisney) out.push({ label: '⚡ Universal Express Pass', url: 'https://www.universalorlando.com/web/en/us/tickets-packages/express-pass' })
    return out
  })()

  return (
    <div className="ride-detail animate-float-up">
      <button className="back-link" onClick={() => navigate(-1)}>← Back to {foundPark.name}</button>

      {/* #4 — Hero image only if we have one, no placeholder box */}
      {img && (
        <img
          src={img}
          alt={found.name}
          className="ride-detail-image"
          onError={e => { e.target.style.display = 'none' }}
        />
      )}

      {/* #5 — Live bar: clean status, no clock emoji */}
      {(live || isDown) && liveBarClass && (
        <div className={`live-bar ${liveBarClass}`}>
          <span>
            {isDown           ? '🔴 Marked as Down'
            : liveStatus === 'OPERATING'    ? '🟢 Operating'
            : liveStatus === 'CLOSED'       ? '⚫ Closed'
            : liveStatus === 'REFURBISHMENT'? '🚧 Refurbishment'
            : '🔴 Down'}
          </span>
          {live?.waitTime != null && liveStatus === 'OPERATING' && !isDown && (
            <span style={{
              marginLeft: 8,
              fontWeight: 900,
              color: live.waitTime < 20 ? 'var(--success)' : live.waitTime < 45 ? 'var(--warning)' : 'var(--danger)'
            }}>
              {live.waitTime} min wait
            </span>
          )}
          {live?.lastUpdated && (
            <span style={{ marginLeft: 'auto', opacity: 0.5, fontSize: '0.72rem' }}>
              {new Date(live.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8, marginTop: img ? 0 : 8, flexWrap: 'wrap' }}>
        <h1 className="ride-detail-title" style={{ marginBottom: 0 }}>{found.name}</h1>
        <button
          className={`personal-must-btn${isMyMust ? ' active' : ''}`}
          onClick={() => togglePersonalMust(found.id)}
        >
          {isMyMust ? '❤️' : '🤍'} My Must-Ride
        </button>
      </div>

      <div className="ride-detail-park" style={{ color: foundPark.accentColor }}>
        {foundPark.emoji} {foundPark.name} · {foundLand.name}
      </div>

      <RatingStars itemType="ride" itemId={found.id} />

      <div className="ride-badges" style={{ marginBottom: 20, marginTop: 12 }}>
        <span className={`badge badge-thrill-${found.thrillLevel}`} style={{ fontSize: '0.82rem', padding: '5px 13px' }}>{THRILL[found.thrillLevel]}</span>
        {found.heightRequirement && <span className="badge">📏 {found.heightRequirement}" min</span>}
        {found.mustDo            && <span className="badge badge-mustdo">⭐ Must-Do</span>}
        {isMyMust                && <span className="badge" style={{ background: 'rgba(255,100,100,0.15)', color: '#f87171' }}>❤️ My Pick</span>}
        {found.lightningLane     && <span className="badge badge-ll">⚡ Lightning Lane</span>}
        {found.duration          && <span className="badge">⏱ {found.duration}</span>}
        {found.openingYear       && <span className="badge">📅 Since {found.openingYear}</span>}
      </div>

      {/* Action buttons */}
      <div className="action-row">
        <button className={`btn-primary ${isRidden ? 'ridden-state' : 'un-ridden'}`} onClick={() => toggleRide(found.id, found.name)}>
          {isRidden ? '✓ Ridden!' : 'Mark as Ridden'}
        </button>
        <button className={`btn-primary ${isDown ? 'btn-down' : 'btn-ghost'}`} onClick={() => toggleManualDown(found.id)}>
          {isDown ? '🔴 Down — tap to clear' : '⬤ Mark as Down'}
        </button>
        <button
          className={`btn-primary${isMyMust ? '' : ' btn-ghost'}`}
          style={isMyMust ? { background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' } : {}}
          onClick={() => togglePersonalMust(found.id)}
        >
          {isMyMust ? '❤️ My Must-Ride' : '🤍 Add to Must-Rides'}
        </button>
      </div>

      {/* #3 — Collapsible sections. Overview open by default, all others collapsed */}
      <Section title="Overview" defaultOpen={true}>
        <p>{found.description}</p>
      </Section>

      {found.history && (
        <Section title="History & Story">
          <p>{found.history}</p>
        </Section>
      )}

      {RIDE_HISTORY[found.id] && (
        <Section title="📅 Attraction History Timeline">
          <RideTimeline rideId={found.id} />
        </Section>
      )}

      {enh.proTips?.length > 0 && (
        <Section title="💡 Pro Tips & Strategy">
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {enh.proTips.map((tip, i) => (
              <li key={i} style={{ ...tipStyle }}>{tip}</li>
            ))}
          </ul>
        </Section>
      )}

      {allTrivia.length > 0 && (
        <Section title="✦ Did You Know?">
          <ul className="trivia-list">
            {allTrivia.map((t, i) => <li key={i} className="trivia-item">{t}</li>)}
          </ul>
        </Section>
      )}

      <Section title="🔍 Things Most Guests Never Notice">
        {enh.insiderNotes?.length > 0 ? (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {enh.insiderNotes.map((note, i) => (
              <li key={i} style={{ ...insiderStyle }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0, fontSize: '0.75rem', marginTop: 2 }}>🔍</span>
                {note}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Slow down in line and look in every direction — Disney and Universal pack stories into every inch of their queues.
          </p>
        )}
      </Section>

      {found.specs && Object.keys(found.specs).length > 0 && (
        <Section title="Specs & Stats">
          <div className="specs-grid">
            {Object.entries(found.specs).map(([k, v]) => (
              <div key={k} className="spec-card">
                <div className="spec-key">{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="spec-value">{String(v)}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Dark History section */}
      {DARK_HISTORY[found.id] && (
        <div className="dark-history-section">
          <button
            className="dark-history-header"
            onClick={() => {
              const el = document.getElementById(`dh-${found.id}`)
              el.style.display = el.style.display === 'none' ? 'block' : 'none'
              el.previousSibling.querySelector('.dh-chevron').style.transform =
                el.style.display === 'none' ? 'rotate(0deg)' : 'rotate(180deg)'
            }}
          >
            <div className="dh-header-left">
              <span className="dh-icon">💀</span>
              <span className="dh-title">Dark History & Incidents</span>
            </div>
            <span className="dh-chevron">▾</span>
          </button>
          <div id={`dh-${found.id}`} style={{ display: 'none' }}>
            <DarkHistoryBody data={DARK_HISTORY[found.id]} />
          </div>
        </div>
      )}

      {/* Ride Layout Map */}
      {RIDE_LAYOUTS[found.id] && (
        <Section title="🗺️ Ride Layout Map">
          <RideLayoutViewer rideId={found.id} />
        </Section>
      )}

      <Section title="📸 My Photos">
        <PhotoManager itemType="ride" itemId={found.id} itemName={found.name} />
      </Section>

      <Section title="🔗 Official Resources & Links">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {resources.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="resource-link">
              <span>{link.label}</span>
              <span style={{ color: 'var(--accent)' }}>↗</span>
            </a>
          ))}
        </div>
      </Section>

      {found.tags?.length > 0 && (
        <div style={{ padding: '8px 0' }}>
          <div className="tag-row">{found.tags.map(t => <span key={t} className="tag">#{t}</span>)}</div>
        </div>
      )}

      <div className="action-row" style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
        <button className={`btn-primary ${isRidden ? 'ridden-state' : 'un-ridden'}`} onClick={() => toggleRide(found.id, found.name)}>
          {isRidden ? '✓ Ridden!' : 'Mark as Ridden'}
        </button>
        <button className="btn-primary btn-ghost" onClick={() => navigate(-1)}>← Go Back</button>
      </div>
    </div>
  )
}
