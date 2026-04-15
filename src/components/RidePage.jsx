import { useParams, Link, useNavigate } from 'react-router-dom'
import { RESORTS } from '../data'
import { useApp } from '../App'
import { getRideLiveData, getRideImage, STATUS_CONFIG } from '../services/liveStatus'

const THRILL_LABEL = ['', '😌 Gentle', '🌊 Mild Thrill', '🌀 Moderate Thrill', '🔥 Thrilling', '💀 Intense']

export default function RidePage() {
  const { rideId } = useParams()
  const navigate = useNavigate()
  const { checkedRides, toggleRide, manualDown, toggleDown, liveStatus, parkImages } = useApp()

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
      <button className="ride-detail-back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>← Back</button>
      <p style={{ color: 'var(--text-secondary)' }}>Ride not found.</p>
    </div>
  )

  const isChecked = checkedRides.has(found.id)
  const manualKey = `${foundPark.id}::${found.name}`
  const isManualDown = manualDown.has(manualKey)

  // Live status
  const live = getRideLiveData(found.name, foundPark.id, liveStatus)
  const effectiveStatus = isManualDown ? 'MANUAL_DOWN' : (live?.status || null)
  const statusCfg = effectiveStatus ? STATUS_CONFIG[effectiveStatus] : null

  // Image: API image > hardcoded imageUrl > null
  const apiImage = getRideImage(found.name, foundPark.id, parkImages)
  const imageSrc = apiImage || found.imageUrl || null

  return (
    <div className="ride-detail fade-in">
      <button className="ride-detail-back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        ← Back
      </button>

      {/* Live status banner */}
      {statusCfg && effectiveStatus !== 'OPERATING' && (
        <div style={{
          padding: '12px 20px', borderRadius: 'var(--radius-md)', marginBottom: 20,
          background: statusCfg.bg, border: `1px solid ${statusCfg.color}44`,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontSize: '1.2rem' }}>{statusCfg.icon}</span>
          <div>
            <div style={{ color: statusCfg.color, fontWeight: 800, fontSize: '0.95rem' }}>{statusCfg.label}</div>
            {live?.waitTime != null && effectiveStatus === 'OPERATING' && (
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Current wait: {live.waitTime} minutes</div>
            )}
            {isManualDown && <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Manually reported — tap below to clear</div>}
          </div>
        </div>
      )}

      {/* Wait time if operating */}
      {live?.status === 'OPERATING' && live?.waitTime != null && !isManualDown && (
        <div style={{
          padding: '12px 20px', borderRadius: 'var(--radius-md)', marginBottom: 20,
          background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontSize: '1.2rem' }}>✅</span>
          <div>
            <div style={{ color: '#10b981', fontWeight: 800 }}>Operating — {live.waitTime} min wait</div>
            {live.singleRider != null && <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Single rider: {live.singleRider} min</div>}
          </div>
        </div>
      )}

      {/* Image */}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={found.name}
          className="ride-detail-image"
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
        />
      ) : null}
      <div
        className="ride-detail-image-placeholder"
        style={{
          background: `linear-gradient(135deg, ${foundPark.gradientFrom || '#1a1a2e'}, var(--bg-deepest))`,
          display: imageSrc ? 'none' : 'flex',
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

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            className={`checked-btn ${isChecked ? 'is-checked' : 'unchecked'}`}
            onClick={() => toggleRide(found.id)}
          >
            {isChecked ? '✓ Ridden!' : 'Mark as Ridden'}
          </button>
          <button
            onClick={() => toggleDown(manualKey)}
            style={{
              padding: '12px 20px', borderRadius: 'var(--radius-md)',
              border: `1px solid ${isManualDown ? 'rgba(249,115,22,0.6)' : 'rgba(255,255,255,0.1)'}`,
              background: isManualDown ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.05)',
              color: isManualDown ? '#f97316' : 'var(--text-secondary)',
              fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
              fontFamily: 'Nunito, sans-serif', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {isManualDown ? '⚠️ Clear Down Report' : '⚠️ Report as Down'}
          </button>
        </div>
      </div>

      {/* Description */}
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
            {found.tags.map(t => (
              <span key={t} className="ride-badge" style={{ textTransform: 'capitalize' }}>#{t}</span>
            ))}
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
