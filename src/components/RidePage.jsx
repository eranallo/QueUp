import { useParams, Link, useNavigate } from 'react-router-dom'
import { RESORTS } from '../data'
import { useApp } from '../App'
import { useLiveData } from '../context/LiveDataContext'
import { RideStatusBadge } from './RideStatus'

const THRILL_LABEL = ['', '😌 Gentle', '🌊 Mild Thrill', '🌀 Moderate Thrill', '🔥 Thrilling', '💀 Intense']

export default function RidePage() {
  const { rideId } = useParams()
  const navigate = useNavigate()
  const { checkedRides, toggleRide, manualDown, toggleManualDown } = useApp()
  const { getRideLive, getRideImage } = useLiveData()

  let found = null, foundPark = null, foundLand = null
  for (const resort of RESORTS) {
    for (const park of resort.parks) {
      for (const land of park.lands) {
        const ride = land.rides.find(r => r.id === rideId)
        if (ride) { found = ride; foundPark = park; foundLand = land }
      }
    }
  }

  if (!found) return (
    <div className="ride-detail">
      <Link to="/" className="ride-detail-back">← Home</Link>
      <p style={{ color: 'var(--text-secondary)' }}>Ride not found.</p>
    </div>
  )

  const isChecked = checkedRides.has(found.id)
  const isDown = manualDown.has(found.id)
  const live = getRideLive(found.name)
  // Use: API image > hardcoded imageUrl in data > null (show placeholder)
  const apiImage = getRideImage(found.name)
  const displayImage = found.imageUrl || apiImage || null

  return (
    <div className="ride-detail fade-in">
      <button className="ride-detail-back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        ← Back
      </button>

      {/* Image */}
      {displayImage ? (
        <img
          src={displayImage}
          alt={found.name}
          className="ride-detail-image"
          onError={e => { e.target.style.display = 'none'; document.getElementById(`placeholder-${found.id}`).style.display = 'flex' }}
        />
      ) : null}
      <div
        id={`placeholder-${found.id}`}
        className="ride-detail-image-placeholder"
        style={{
          background: `linear-gradient(135deg, ${foundPark.gradientFrom || '#1a1a2e'}, var(--bg-deepest))`,
          display: displayImage ? 'none' : 'flex',
          borderColor: foundPark.accentColor + '44',
        }}
      >
        {foundPark.emoji}
      </div>

      {/* Live status bar */}
      {(live || isDown) && (
        <div className={`live-status-bar ${isDown || live?.status === 'DOWN' ? 'bar-down' : live?.status === 'CLOSED' ? 'bar-closed' : live?.status === 'REFURBISHMENT' ? 'bar-refurb' : 'bar-open'}`}>
          <RideStatusBadge live={live} manualDown={isDown} />
          {live?.waitTime != null && live.status === 'OPERATING' && !isDown && (
            <span style={{ marginLeft: 12, fontWeight: 800, fontSize: '0.9rem' }}>
              ⏱ {live.waitTime} minute wait
            </span>
          )}
          {live?.lastUpdated && (
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', opacity: 0.6 }}>
              Updated {new Date(live.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      )}

      {/* Header */}
      <div className="ride-detail-header">
        <h1 className="ride-detail-title">{found.name}</h1>
        <div className="ride-detail-park" style={{ color: foundPark.accentColor }}>
          {foundPark.emoji} {foundPark.name} · {foundLand.name}
        </div>
        <div className="ride-meta" style={{ marginBottom: 20 }}>
          <span className={`ride-badge thrill-${found.thrillLevel}`} style={{ fontSize: '0.85rem', padding: '5px 12px' }}>
            {THRILL_LABEL[found.thrillLevel]}
          </span>
          {found.heightRequirement && <span className="ride-badge height">📏 {found.heightRequirement}" min height</span>}
          {found.mustDo && <span className="ride-badge must-do">⭐ Must-Do</span>}
          {found.lightningLane && <span className="ride-badge ll">⚡ Lightning Lane</span>}
          {found.duration && <span className="ride-badge">⏱ {found.duration}</span>}
          {found.openingYear && <span className="ride-badge">📅 Since {found.openingYear}</span>}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className={`checked-btn ${isChecked ? 'is-checked' : 'unchecked'}`} onClick={() => toggleRide(found.id)}>
            {isChecked ? '✓ Ridden!' : 'Mark as Ridden'}
          </button>
          <button
            className={`checked-btn ${isDown ? 'is-down-btn' : 'unchecked'}`}
            onClick={() => toggleManualDown(found.id)}
          >
            {isDown ? '🔴 Marked Down — Tap to clear' : '🔘 Mark as Down'}
          </button>
        </div>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">Overview</div>
        <p>{found.description}</p>
      </div>

      {found.history && (
        <div className="detail-section">
          <div className="detail-section-title">History & Story</div>
          <p>{found.history}</p>
        </div>
      )}

      {found.trivia?.length > 0 && (
        <div className="detail-section">
          <div className="detail-section-title">Fun Facts & Trivia</div>
          <ul className="trivia-list">
            {found.trivia.map((t, i) => <li key={i} className="trivia-item">{t}</li>)}
          </ul>
        </div>
      )}

      {found.specs && Object.keys(found.specs).length > 0 && (
        <div className="detail-section">
          <div className="detail-section-title">Specs & Stats</div>
          <div className="specs-grid">
            {Object.entries(found.specs).map(([k, v]) => (
              <div key={k} className="spec-chip">
                <div className="spec-key">{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="spec-value">{String(v)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {found.tags?.length > 0 && (
        <div className="detail-section">
          <div className="ride-meta">
            {found.tags.map(t => <span key={t} className="ride-badge" style={{ textTransform: 'capitalize' }}>#{t}</span>)}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
        <button className={`checked-btn ${isChecked ? 'is-checked' : 'unchecked'}`} onClick={() => toggleRide(found.id)}>
          {isChecked ? '✓ Ridden!' : 'Mark as Ridden'}
        </button>
        <button className="checked-btn unchecked" onClick={() => navigate(-1)}>
          ← Back to {foundPark.name}
        </button>
      </div>
    </div>
  )
}
