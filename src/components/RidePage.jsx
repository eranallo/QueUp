import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { RESORTS } from '../data'
import { RIDE_ENHANCEMENTS } from '../rideEnhancements'
import { useApp } from '../App'
import { useLiveData } from '../context/LiveDataContext'
import PhotoManager from './PhotoManager'
import RatingStars from './RatingStars'
import { DARK_HISTORY } from '../darkHistory'

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
