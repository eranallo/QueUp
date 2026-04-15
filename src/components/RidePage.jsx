import { useParams, Link, useNavigate } from 'react-router-dom'
import { RESORTS } from '../data'
import { useApp } from '../App'

const THRILL_LABEL = ['', '😌 Gentle', '🌊 Mild Thrill', '🌀 Moderate Thrill', '🔥 Thrilling', '💀 Intense']
const THRILL_COLOR = ['', '#10b981', '#60a5fa', '#fbbf24', '#fb923c', '#ef4444']

export default function RidePage() {
  const { rideId } = useParams()
  const navigate = useNavigate()
  const { checkedRides, toggleRide } = useApp()

  // Flatten all rides across all resorts/parks/lands
  let found = null
  let foundPark = null
  let foundLand = null
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

  return (
    <div className="ride-detail fade-in">
      <button className="ride-detail-back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        ← Back
      </button>

      {/* Image or placeholder */}
      {found.imageUrl ? (
        <img
          src={found.imageUrl}
          alt={found.name}
          className="ride-detail-image"
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
        />
      ) : null}
      <div
        className="ride-detail-image-placeholder"
        style={{
          background: `linear-gradient(135deg, ${foundPark.gradientFrom || '#1a1a2e'}, var(--bg-deepest))`,
          display: found.imageUrl ? 'none' : 'flex',
          borderColor: foundPark.accentColor + '44',
        }}
      >
        {foundPark.emoji}
      </div>

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
        <button
          className={`checked-btn ${isChecked ? 'is-checked' : 'unchecked'}`}
          onClick={() => toggleRide(found.id)}
        >
          {isChecked ? '✓ Ridden!' : 'Mark as Ridden'}
        </button>
      </div>

      {/* Description */}
      <div className="detail-section">
        <div className="detail-section-title">Overview</div>
        <p>{found.description}</p>
      </div>

      {/* History */}
      {found.history && (
        <div className="detail-section">
          <div className="detail-section-title">History & Story</div>
          <p>{found.history}</p>
        </div>
      )}

      {/* Trivia */}
      {found.trivia?.length > 0 && (
        <div className="detail-section">
          <div className="detail-section-title">Fun Facts & Trivia</div>
          <ul className="trivia-list">
            {found.trivia.map((t, i) => <li key={i} className="trivia-item">{t}</li>)}
          </ul>
        </div>
      )}

      {/* Specs */}
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

      {/* Tags */}
      {found.tags?.length > 0 && (
        <div className="detail-section">
          <div className="ride-meta">
            {found.tags.map(t => (
              <span key={t} className="ride-badge" style={{ textTransform: 'capitalize' }}>#{t}</span>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div style={{ display: 'flex', gap: 12, marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
        <button
          className={`checked-btn ${isChecked ? 'is-checked' : 'unchecked'}`}
          onClick={() => toggleRide(found.id)}
        >
          {isChecked ? '✓ Ridden!' : 'Mark as Ridden'}
        </button>
        <button
          className="checked-btn unchecked"
          onClick={() => navigate(-1)}
        >
          ← Back to {foundPark.name}
        </button>
      </div>
    </div>
  )
}
