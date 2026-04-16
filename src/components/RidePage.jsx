import { useParams, useNavigate } from 'react-router-dom'
import { RESORTS } from '../data'
import { useApp } from '../App'
import { useLiveData } from '../context/LiveDataContext'

const THRILL = ['', '😌 Gentle', '🌊 Mild Thrill', '🌀 Moderate', '🔥 Thrilling', '💀 Intense']

export default function RidePage() {
  const { rideId } = useParams()
  const navigate = useNavigate()
  const { checkedRides, toggleRide, manualDown, toggleManualDown } = useApp()
  const { getRideLive, getRideImage } = useLiveData()

  let found = null, foundPark = null, foundLand = null
  for (const resort of RESORTS)
    for (const park of resort.parks)
      for (const land of park.lands) {
        const ride = land.rides.find(r => r.id === rideId)
        if (ride) { found = ride; foundPark = park; foundLand = land }
      }

  if (!found) return <div className="ride-detail"><button className="back-link" onClick={() => navigate(-1)}>← Back</button><p>Ride not found.</p></div>

  const isRidden = checkedRides.has(found.id)
  const isDown   = manualDown.has(found.id)
  const live     = getRideLive(found.name)
  const apiImage = getRideImage(found.name)
  const img      = found.imageUrl || apiImage || null

  const liveStatus = isDown ? 'DOWN' : (live?.status || null)
  const liveBarClass = { OPERATING: 'open', DOWN: 'down', CLOSED: 'closed', REFURBISHMENT: 'refurb' }[liveStatus] || ''

  return (
    <div className="ride-detail animate-float-up">
      <button className="back-link" onClick={() => navigate(-1)}>← Back to {foundPark.name}</button>

      {/* Image */}
      {img
        ? <img src={img} alt={found.name} className="ride-detail-image" onError={e => { e.target.style.display = 'none' }} />
        : (
          <div className="ride-detail-placeholder" style={{
            background: `linear-gradient(135deg, ${foundPark.accentColor}22, var(--bg-deep))`,
            borderColor: `${foundPark.accentColor}33`,
          }}>
            {foundPark.emoji}
          </div>
        )
      }

      {/* Live status bar */}
      {(live || isDown) && liveBarClass && (
        <div className={`live-bar ${liveBarClass}`}>
          <span>{isDown ? '🔴 Marked as Down' : live.status === 'OPERATING' ? '🟢 Operating' : live.status === 'CLOSED' ? '⚫ Closed' : live.status === 'REFURBISHMENT' ? '🚧 Refurbishment' : '🔴 Down'}</span>
          {live?.waitTime != null && live.status === 'OPERATING' && !isDown && (
            <span style={{ marginLeft: 8, fontWeight: 900 }}>⏱ {live.waitTime} min wait</span>
          )}
          {live?.lastUpdated && (
            <span style={{ marginLeft: 'auto', opacity: 0.5, fontSize: '0.72rem' }}>
              {new Date(live.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      )}

      {/* Header */}
      <h1 className="ride-detail-title">{found.name}</h1>
      <div className="ride-detail-park" style={{ color: foundPark.accentColor }}>
        {foundPark.emoji} {foundPark.name} &nbsp;·&nbsp; {foundLand.name}
      </div>

      {/* Badge row */}
      <div className="ride-badges" style={{ marginBottom: 20 }}>
        <span className={`badge badge-thrill-${found.thrillLevel}`} style={{ fontSize: '0.82rem', padding: '5px 13px' }}>{THRILL[found.thrillLevel]}</span>
        {found.heightRequirement && <span className="badge">📏 {found.heightRequirement}" min</span>}
        {found.mustDo && <span className="badge badge-mustdo">⭐ Must-Do</span>}
        {found.lightningLane && <span className="badge badge-ll">⚡ Lightning Lane</span>}
        {found.duration && <span className="badge">⏱ {found.duration}</span>}
        {found.openingYear && <span className="badge">📅 Since {found.openingYear}</span>}
      </div>

      {/* Action buttons */}
      <div className="action-row">
        <button className={`btn-primary ${isRidden ? 'ridden-state' : 'un-ridden'}`} onClick={() => toggleRide(found.id)}>
          {isRidden ? '✓ Ridden!' : 'Mark as Ridden'}
        </button>
        <button className={`btn-primary ${isDown ? 'btn-down' : 'btn-ghost'}`} onClick={() => toggleManualDown(found.id)}>
          {isDown ? '🔴 Marked Down — Tap to clear' : '⬤ Mark as Down'}
        </button>
      </div>

      {/* Overview */}
      <div className="detail-block">
        <div className="detail-block-title">Overview</div>
        <p>{found.description}</p>
      </div>

      {/* History */}
      {found.history && (
        <div className="detail-block">
          <div className="detail-block-title">History & Story</div>
          <p>{found.history}</p>
        </div>
      )}

      {/* Trivia */}
      {found.trivia?.length > 0 && (
        <div className="detail-block">
          <div className="detail-block-title">Did You Know?</div>
          <ul className="trivia-list">
            {found.trivia.map((t, i) => (
              <li key={i} className="trivia-item animate-float-up" style={{ animationDelay: `${i * 0.04}s` }}>{t}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Specs */}
      {found.specs && Object.keys(found.specs).length > 0 && (
        <div className="detail-block">
          <div className="detail-block-title">Specs & Stats</div>
          <div className="specs-grid">
            {Object.entries(found.specs).map(([k, v]) => (
              <div key={k} className="spec-card">
                <div className="spec-key">{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="spec-value">{String(v)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {found.tags?.length > 0 && (
        <div className="detail-block">
          <div className="tag-row">
            {found.tags.map(t => <span key={t} className="tag">#{t}</span>)}
          </div>
        </div>
      )}

      {/* Bottom actions */}
      <div className="action-row" style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
        <button className={`btn-primary ${isRidden ? 'ridden-state' : 'un-ridden'}`} onClick={() => toggleRide(found.id)}>
          {isRidden ? '✓ Ridden!' : 'Mark as Ridden'}
        </button>
        <button className="btn-primary btn-ghost" onClick={() => navigate(-1)}>← Go Back</button>
      </div>
    </div>
  )
}
