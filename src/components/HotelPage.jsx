import { useParams, useNavigate } from 'react-router-dom'
import { getHotelById } from '../hotelsData'
import PhotoManager from './PhotoManager'
import RatingStars from './RatingStars'

const TIER_COLOR = {
  'Deluxe':    '#f0b429',
  'Moderate':  '#60a5fa',
  'Value':     '#34d399',
  'Premier':   '#c084fc',
  'Preferred': '#f97316',
}

function Section({ title, children, delay = 0 }) {
  return (
    <div className="detail-block animate-float-up" style={{ animationDelay: `${delay}s` }}>
      <div className="detail-block-title">{title}</div>
      {children}
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

      {/* Hero placeholder */}
      <div className="ride-detail-placeholder" style={{
        background: `linear-gradient(135deg, ${hotel.accentColor}33, var(--bg-deep))`,
        borderColor: `${hotel.accentColor}44`,
        fontSize: '3.5rem',
        minHeight: 180,
      }}>
        {hotel.emoji}
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 8, marginTop: 4 }}>
        <h1 className="ride-detail-title" style={{ marginBottom: 0 }}>{hotel.name}</h1>
      </div>

      <div className="ride-detail-park" style={{ color: hotel.accentColor }}>
        {hotel.resort === 'disney-world' ? '🏰 Disney World' : '🎬 Universal Orlando'} · {hotel.location}
      </div>

      {/* Rating */}
      <div style={{ margin: '10px 0' }}>
        <RatingStars itemType="hotel" itemId={hotel.id} />
      </div>

      {/* Badges */}
      <div className="ride-badges" style={{ marginBottom: 20 }}>
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

      {/* Transportation */}
      <Section title="🚌 Getting to the Parks" delay={0.04}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {hotel.transportation.map(t => (
            <span key={t} className="badge" style={{ padding: '7px 14px', fontSize: '0.85rem', background: 'var(--bg-card)', border: '1px solid var(--border-mid)' }}>
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* Overview */}
      <Section title="Overview" delay={0.06}>
        <p style={{ lineHeight: 1.7 }}>{hotel.description}</p>
      </Section>

      {/* History */}
      <Section title="History & Story" delay={0.09}>
        <p style={{ lineHeight: 1.7 }}>{hotel.history}</p>
      </Section>

      {/* Pro Tips */}
      {hotel.proTips?.length > 0 && (
        <Section title="💡 Pro Tips & Insider Strategy" delay={0.12}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {hotel.proTips.map((tip, i) => (
              <li key={i} className="animate-float-up" style={{
                animationDelay: `${i * 0.03}s`,
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

      {/* Trivia */}
      {hotel.trivia?.length > 0 && (
        <Section title="✦ Did You Know?" delay={0.15}>
          <ul className="trivia-list">
            {hotel.trivia.map((t, i) => (
              <li key={i} className="trivia-item animate-float-up" style={{ animationDelay: `${i * 0.03}s` }}>{t}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Specs */}
      {hotel.specs && (
        <Section title="Quick Facts" delay={0.18}>
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

      {/* Photos */}
      <Section title="📸 My Photos" delay={0.20}>
        <PhotoManager itemType="hotel" itemId={hotel.id} itemName={hotel.name} />
      </Section>

      {/* Resources */}
      {hotel.resources?.length > 0 && (
        <Section title="🔗 Book & Learn More" delay={0.22}>
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

      {/* Bottom back button */}
      <div className="action-row" style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
        <button className="btn-primary btn-ghost" onClick={() => navigate(-1)}>← Go Back</button>
      </div>
    </div>
  )
}
