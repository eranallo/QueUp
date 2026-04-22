import { useApp } from '../App'

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top:   `${(i * 7.3 + 11) % 95}%`,
  left:  `${(i * 13.7 + 23) % 95}%`,
  size:  i % 7 === 0 ? 3 : i % 3 === 0 ? 2 : 1.2,
  dur:   `${2 + (i % 5) * 0.7}s`,
  delay: `${(i * 0.25) % 4}s`,
  opacity: 0.3 + (i % 4) * 0.15,
}))

const RESORTS = [
  {
    id: 'disney-world',
    emoji: '🏰',
    label: 'Walt Disney World',
    sub: 'Orlando, Florida',
    highlight: 'The Most Magical Place on Earth',
    tags: ['4 Parks', '60+ Rides', 'DATW', 'Mickeys'],
    accent: '#7c3aed',
    glow: 'rgba(124,58,237,0.4)',
    gradient: 'linear-gradient(135deg, #1a0b3d 0%, #0d1a4a 50%, #0a0f1e 100%)',
    border: 'rgba(124,58,237,0.4)',
  },
  {
    id: 'disneyland',
    emoji: '🌟',
    label: 'Disneyland Resort',
    sub: 'Anaheim, California',
    highlight: 'Where The Magic Began',
    tags: ['2 Parks', 'Original', "Galaxy's Edge", 'Cars Land'],
    accent: '#2563eb',
    glow: 'rgba(37,99,235,0.4)',
    gradient: 'linear-gradient(135deg, #0a1a3d 0%, #0d2b6b 50%, #0a0f1e 100%)',
    border: 'rgba(37,99,235,0.4)',
  },
  {
    id: 'universal-orlando',
    emoji: '✨',
    label: 'Universal Orlando',
    sub: 'Orlando, Florida',
    highlight: 'Vacation Like You Mean It',
    tags: ['3 Parks', 'Epic Universe', 'VelociCoaster', "Hagrid's"],
    accent: '#ff6b35',
    glow: 'rgba(255,107,53,0.4)',
    gradient: 'linear-gradient(135deg, #3d1200 0%, #7a2900 50%, #0a0f1e 100%)',
    border: 'rgba(255,107,53,0.4)',
  },
  {
    id: 'universal-hollywood',
    emoji: '🎬',
    label: 'Universal Hollywood',
    sub: 'Los Angeles, California',
    highlight: 'The Entertainment Capital',
    tags: ['Studio Tour', 'Nintendo World', 'Wizarding World', 'Lower Lot'],
    accent: '#dc2626',
    glow: 'rgba(220,38,38,0.4)',
    gradient: 'linear-gradient(135deg, #3d0a0a 0%, #6b1010 50%, #0a0f1e 100%)',
    border: 'rgba(220,38,38,0.4)',
  },
]

export default function ResortSelector() {
  const { setActiveResort } = useApp()

  return (
    <div className="rsnew-page">
      {/* Star field */}
      <div className="rsnew-stars" aria-hidden="true">
        {STARS.map(s => (
          <div key={s.id} className="rsnew-star"
            style={{
              top: s.top, left: s.left,
              width: s.size + 'px', height: s.size + 'px',
              opacity: s.opacity,
              '--dur': s.dur, '--delay': s.delay,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="rsnew-header">
        <div className="rsnew-logo">
          <span className="rsnew-logo-icon">🎢</span>
          <span className="rsnew-logo-text">QueUp</span>
        </div>
        <div className="rsnew-sub">Choose your adventure</div>
      </div>

      {/* Resort grid */}
      <div className="rsnew-grid">
        {RESORTS.map((r, i) => (
          <button
            key={r.id}
            className="rsnew-card"
            style={{
              background: r.gradient,
              borderColor: r.border,
              '--glow': r.glow,
              '--accent': r.accent,
              animationDelay: `${i * 0.1}s`,
            }}
            onClick={() => setActiveResort(r.id)}
          >
            {/* Glow orb */}
            <div className="rsnew-orb" style={{ background: r.glow }} />

            {/* Content */}
            <div className="rsnew-card-inner">
              <div className="rsnew-emoji">{r.emoji}</div>
              <div className="rsnew-resort-name">{r.label}</div>
              <div className="rsnew-resort-sub">{r.sub}</div>
              <div className="rsnew-highlight" style={{ color: r.accent }}>{r.highlight}</div>

              <div className="rsnew-tags">
                {r.tags.slice(0, 2).map(t => (
                  <span key={t} className="rsnew-tag" style={{ borderColor: `${r.accent}44`, color: r.accent, background: `${r.accent}12` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="rsnew-arrow" style={{ color: r.accent }}>→</div>
          </button>
        ))}
      </div>

      <div className="rsnew-footer">✦ Progress saves automatically ✦</div>
    </div>
  )
}
