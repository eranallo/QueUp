import { Link } from 'react-router-dom'
import { useResortData } from '../useResortData'

const TIER_COLOR = {
  'Deluxe': '#f0b429', 'Moderate': '#60a5fa', 'Value': '#34d399',
  'Premier': '#c084fc', 'Preferred': '#f97316',
}

export default function HotelsPage() {
  const { hotels, isDisney } = useResortData()
  const tiers = [...new Set(hotels.map(h => h.tier))]

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">🏨 Hotels & Resorts</h1>
      <p className="page-subtitle">
        {isDisney
          ? 'Disney World on-site hotels — tap any for full details, tips, and trivia.'
          : 'Universal Orlando on-site hotels — Premier guests get Express Unlimited.'}
      </p>

      {tiers.map(tier => {
        const tierHotels = hotels.filter(h => h.tier === tier)
        const color = TIER_COLOR[tier] || 'var(--accent)'
        return (
          <div key={tier} style={{ marginBottom: 32 }}>
            <div className="rd-section-label" style={{ color }}>
              {tier} — {tierHotels.length} hotel{tierHotels.length !== 1 ? 's' : ''}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tierHotels.map(hotel => (
                <Link
                  key={hotel.id}
                  to={`/hotel/${hotel.id}`}
                  className="rd-hotel-card animate-float-up"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="rd-hotel-emoji">{hotel.emoji}</div>
                  <div className="rd-hotel-info">
                    <div className="rd-hotel-name">{hotel.shortName}</div>
                    <div className="rd-hotel-meta">
                      <span style={{
                        color, fontWeight: 800, fontSize: '0.7rem',
                        background: `${color}18`, border: `1px solid ${color}33`,
                        padding: '1px 7px', borderRadius: 20
                      }}>{hotel.tier}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{hotel.priceRange}</span>
                      {hotel.specs?.keyPerk && (
                        <span style={{ color: '#c084fc', fontSize: '0.68rem', fontWeight: 700 }}>
                          ⭐ {hotel.specs.keyPerk.split('+')[0].trim()}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 3 }}>
                      {hotel.transportation.slice(0, 2).join(' · ')}
                    </div>
                  </div>
                  <span style={{ color: 'var(--accent)', fontSize: '1rem', flexShrink: 0 }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
