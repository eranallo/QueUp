import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getHotelById } from '../hotelsData'
import PhotoManager from './PhotoManager'
import RatingStars from './RatingStars'

const TIER_COLOR = {
  'Deluxe': '#f0b429', 'Moderate': '#60a5fa', 'Value': '#34d399',
  'Premier': '#c084fc', 'Preferred': '#f97316',
}

// ── Collapsible section (shared pattern with RidePage) ───────
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

export default function HotelPage() {
  const { hotelId } = useParams()
  const navigate    = useNavigate()
  const hotel       = getHotelById(hotelId)

  if (!hotel) return (
    <div className="ride-detail">
      <button className="back-link" onClick={() => navigate(-1)}>← Back</button>
      <p>Hotel not found.</p>
    </div>
  )

  const tierColor = TIER_COLOR[hotel.tier] || 'var(--accent)'

  return (
    <div className="ride-detail animate-float-up">
      <button className="back-link" onClick={() => navigate(-1)}>← Back</button>

      {/* #4 — No placeholder. Only render image if one exists */}
      {hotel.imageUrl && (
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="ride-detail-image"
          onError={e => { e.target.style.display = 'none' }}
        />
      )}

      {/* Header */}
      <div style={{ marginTop: hotel.imageUrl ? 0 : 8, marginBottom: 8 }}>
        <h1 className="ride-detail-title" style={{ marginBottom: 4 }}>{hotel.name}</h1>
        <div className="ride-detail-park" style={{ color: hotel.accentColor }}>
          {hotel.resort === 'disney-world' ? '🏰 Disney World' : '🎬 Universal Orlando'} · {hotel.location}
        </div>
      </div>

      <RatingStars itemType="hotel" itemId={hotel.id} />

      {/* Badges */}
      <div className="ride-badges" style={{ marginBottom: 20, marginTop: 12 }}>
        <span className="badge" style={{ background: `${tierColor}20`, color: tierColor, border: `1px solid ${tierColor}44`, fontWeight: 800 }}>
          {hotel.tier} Resort
        </span>
        <span className="badge">{hotel.priceRange}</span>
        <span className="badge">📍 {hotel.location}</span>
        {hotel.specs?.keyPerk && (
          <span className="badge badge-ll" style={{ background: 'rgba(192,132,252,0.15)', color: '#c084fc', border: '1px solid rgba(192,132,252,0.3)' }}>
            ⭐ {hotel.specs.keyPerk}
          </span>
        )}
      </div>

      {/* Transportation chips */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
        {hotel.transportation.map(t => (
          <span key={t} className="badge" style={{ padding: '6px 12px', fontSize: '0.82rem', background: 'var(--bg-card)', border: '1px solid var(--border-mid)' }}>
            {t}
          </span>
        ))}
      </div>

      {/* #3 — Collapsible sections. Overview open, rest collapsed */}
      <Section title="Overview" defaultOpen={true}>
        <p style={{ lineHeight: 1.7 }}>{hotel.description}</p>
      </Section>

      <Section title="History & Story">
        <p style={{ lineHeight: 1.7 }}>{hotel.history}</p>
      </Section>

      {hotel.proTips?.length > 0 && (
        <Section title="💡 Pro Tips & Insider Strategy">
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {hotel.proTips.map((tip, i) => (
              <li key={i} style={{
                display: 'flex', gap: 12, padding: '11px 16px',
                background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)',
                borderRadius: 'var(--r-md)', fontSize: '0.88rem',
                color: 'var(--text-secondary)', lineHeight: 1.55,
              }}>
                {tip}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {hotel.trivia?.length > 0 && (
        <Section title="✦ Did You Know?">
          <ul className="trivia-list">
            {hotel.trivia.map((t, i) => <li key={i} className="trivia-item">{t}</li>)}
          </ul>
        </Section>
      )}

      {hotel.specs && (
        <Section title="Quick Facts">
          <div className="specs-grid">
            {Object.entries(hotel.specs).filter(([k]) => k !== 'keyPerk').map(([k, v]) => (
              <div key={k} className="spec-card">
                <div className="spec-key">{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="spec-value" style={{ fontSize: '0.8rem' }}>{String(v)}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section title="📸 My Photos">
        <PhotoManager itemType="hotel" itemId={hotel.id} itemName={hotel.name} />
      </Section>

      {hotel.resources?.length > 0 && (
        <Section title="🔗 Book & Learn More">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {hotel.resources.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                <span>{link.label}</span>
                <span style={{ color: 'var(--accent)' }}>↗</span>
              </a>
            ))}
          </div>
        </Section>
      )}

      <div className="action-row" style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
        <button className="btn-primary btn-ghost" onClick={() => navigate(-1)}>← Go Back</button>
      </div>
    </div>
  )
}
