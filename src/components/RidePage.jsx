import { useParams, useNavigate } from 'react-router-dom'
import { RESORTS } from '../data'
import { RIDE_ENHANCEMENTS } from '../rideEnhancements'
import { useApp } from '../App'
import { useLiveData } from '../context/LiveDataContext'
import PhotoManager from './PhotoManager'
import RatingStars from './RatingStars'

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

function Section({ title, children, delay = 0 }) {
  return (
    <div className="detail-block animate-float-up" style={{ animationDelay: `${delay}s` }}>
      <div className="detail-block-title">{title}</div>
      {children}
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

  const enh         = RIDE_ENHANCEMENTS[found.id] || {}
  const allTrivia   = [...(found.trivia || []), ...(enh.deeperTrivia || [])]
  const isRidden    = checkedRides.has(found.id)
  const isDown      = manualDown.has(found.id)
  const isMyMust    = personalMustRide.has(found.id)
  const live        = getRideLive(found.name)
  const apiImage    = getRideImage(found.name)
  const img         = found.imageUrl || apiImage || null
  const liveBarClass = { OPERATING: 'open', DOWN: 'down', CLOSED: 'closed', REFURBISHMENT: 'refurb' }[isDown ? 'DOWN' : live?.status] || ''

  // Auto-build resources fallback
  const resources = enh.resources?.length ? enh.resources : (() => {
    const parkUrls = {
      'magic-kingdom': 'https://disneyworld.disney.go.com/attractions/magic-kingdom/',
      'epcot': 'https://disneyworld.disney.go.com/attractions/epcot/',
      'hollywood-studios': 'https://disneyworld.disney.go.com/attractions/hollywood-studios/',
      'animal-kingdom': 'https://disneyworld.disney.go.com/attractions/animal-kingdom/',
      'universal-studios-florida': 'https://www.universalorlando.com/web/en/us/things-to-do/rides-attractions/',
      'islands-of-adventure': 'https://www.universalorlando.com/web/en/us/things-to-do/rides-attractions/',
      'epic-universe': 'https://www.universalorlando.com/web/en/us/universal-epic-universe',
    }
    const out = [{ label: `${foundPark.emoji} ${foundPark.name} — All Attractions`, url: parkUrls[foundPark.id] || '#' }]
    if (isDisney && found.lightningLane) out.push({ label: '⚡ Lightning Lane — Plan & Purchase', url: 'https://disneyworld.disney.go.com/plan/my-disney-experience/lightning-lane/' })
    if (!isDisney) out.push({ label: '⚡ Universal Express Pass', url: 'https://www.universalorlando.com/web/en/us/tickets-packages/express-pass' })
    return out
  })()

  return (
    <div className="ride-detail animate-float-up">
      <button className="back-link" onClick={() => navigate(-1)}>← Back to {foundPark.name}</button>

      {/* Image */}
      {img
        ? <img src={img} alt={found.name} className="ride-detail-image" onError={e => { e.target.style.display='none' }} />
        : <div className="ride-detail-placeholder" style={{ background: `linear-gradient(135deg, ${foundPark.accentColor}22, var(--bg-deep))`, borderColor: `${foundPark.accentColor}33` }}>{foundPark.emoji}</div>
      }

      {/* Live bar */}
      {(live || isDown) && liveBarClass && (
        <div className={`live-bar ${liveBarClass}`}>
          <span>{isDown ? '🔴 Marked as Down' : live.status === 'OPERATING' ? '🟢 Operating' : live.status === 'CLOSED' ? '⚫ Closed' : live.status === 'REFURBISHMENT' ? '🚧 Refurbishment' : '🔴 Down'}</span>
          {live?.waitTime != null && live.status === 'OPERATING' && !isDown && (
            <span style={{ marginLeft: 8, fontWeight: 900, color: live.waitTime < 20 ? 'var(--success)' : live.waitTime < 45 ? 'var(--warning)' : 'var(--danger)' }}>
              ⏱ {live.waitTime} min wait
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
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
        <h1 className="ride-detail-title" style={{ marginBottom: 0 }}>{found.name}</h1>
        {/* Personal Must-Ride heart */}
        <button
          className={`personal-must-btn${isMyMust ? ' active' : ''}`}
          onClick={() => togglePersonalMust(found.id)}
          title={isMyMust ? 'Remove from My Must-Rides' : 'Add to My Must-Rides'}
        >
          {isMyMust ? '❤️' : '🤍'} My Must-Ride
        </button>
      </div>

      <div className="ride-detail-park" style={{ color: foundPark.accentColor }}>
        {foundPark.emoji} {foundPark.name} · {foundLand.name}
      </div>

      {/* Rating */}
      <RatingStars itemType="ride" itemId={found.id} />

      {/* Badges */}
      <div className="ride-badges" style={{ marginBottom: 20, marginTop: 12 }}>
        <span className={`badge badge-thrill-${found.thrillLevel}`} style={{ fontSize: '0.82rem', padding: '5px 13px' }}>{THRILL[found.thrillLevel]}</span>
        {found.heightRequirement && <span className="badge">📏 {found.heightRequirement}" min</span>}
        {found.mustDo    && <span className="badge badge-mustdo">⭐ Must-Do</span>}
        {isMyMust        && <span className="badge" style={{ background: 'rgba(255,100,100,0.15)', color: '#f87171' }}>❤️ My Pick</span>}
        {found.lightningLane && <span className="badge badge-ll">⚡ Lightning Lane</span>}
        {found.duration  && <span className="badge">⏱ {found.duration}</span>}
        {found.openingYear && <span className="badge">📅 Since {found.openingYear}</span>}
      </div>

      {/* Actions */}
      <div className="action-row">
        <button className={`btn-primary ${isRidden ? 'ridden-state' : 'un-ridden'}`} onClick={() => toggleRide(found.id)}>
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

      {/* Overview */}
      <Section title="Overview" delay={0.05}><p>{found.description}</p></Section>

      {/* History */}
      {found.history && <Section title="History & Story" delay={0.08}><p>{found.history}</p></Section>}

      {/* Pro Tips */}
      {enh.proTips?.length > 0 && (
        <Section title="💡 Pro Tips & Strategy" delay={0.11}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {enh.proTips.map((tip, i) => (
              <li key={i} className="animate-float-up" style={{ ...tipStyle, animationDelay: `${i * 0.03}s` }}>{tip}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Trivia */}
      {allTrivia.length > 0 && (
        <Section title="✦ Did You Know?" delay={0.14}>
          <ul className="trivia-list">
            {allTrivia.map((t, i) => (
              <li key={i} className="trivia-item animate-float-up" style={{ animationDelay: `${i * 0.03}s` }}>{t}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Insider notes */}
      <Section title="🔍 Things Most Guests Never Notice" delay={0.17}>
        {enh.insiderNotes?.length > 0 ? (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {enh.insiderNotes.map((note, i) => (
              <li key={i} className="animate-float-up" style={{ ...insiderStyle, animationDelay: `${i * 0.03}s` }}>
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

      {/* Specs */}
      {found.specs && Object.keys(found.specs).length > 0 && (
        <Section title="Specs & Stats" delay={0.20}>
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

      {/* Photos */}
      <Section title="📸 My Photos" delay={0.22}>
        <PhotoManager itemType="ride" itemId={found.id} itemName={found.name} />
      </Section>

      {/* Resources */}
      <Section title="🔗 Official Resources & Links" delay={0.24}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {resources.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              className="resource-link animate-float-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <span>{link.label}</span>
              <span style={{ color: 'var(--accent)' }}>↗</span>
            </a>
          ))}
        </div>
      </Section>

      {/* Tags */}
      {found.tags?.length > 0 && (
        <div className="detail-block"><div className="tag-row">{found.tags.map(t => <span key={t} className="tag">#{t}</span>)}</div></div>
      )}

      {/* Bottom */}
      <div className="action-row" style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
        <button className={`btn-primary ${isRidden ? 'ridden-state' : 'un-ridden'}`} onClick={() => toggleRide(found.id)}>
          {isRidden ? '✓ Ridden!' : 'Mark as Ridden'}
        </button>
        <button className="btn-primary btn-ghost" onClick={() => navigate(-1)}>← Go Back</button>
      </div>
    </div>
  )
}
