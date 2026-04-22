import { useApp } from '../App'

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  top:   `${(i * 7.3 + 11) % 90 + 5}%`,
  left:  `${(i * 13.7 + 23) % 90 + 5}%`,
  size:  i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5,
  dur:   `${2.5 + (i % 4) * 0.8}s`,
  delay: `${(i * 0.3) % 3}s`,
}))

const RESORTS_CONFIG = [
  {
    id: 'disney-world',
    eyebrow: 'Walt Disney World Resort',
    name: 'The Most Magical Place on Earth',
    tagline: '4 parks · 60+ attractions · Hidden Mickeys · EPCOT',
    parks: ['Magic Kingdom', 'EPCOT', 'Hollywood Studios', 'Animal Kingdom'],
    pips: ['🏰', '🌍', '🎬', '🦁'],
    cta: 'Enter the Magic →',
    style: 'rs-card-disney',
  },
  {
    id: 'disneyland',
    eyebrow: 'Disneyland Resort',
    name: 'The Happiest Place on Earth',
    tagline: '2 parks · Where It All Began · Galaxy\'s Edge · Cars Land',
    parks: ['Disneyland Park', 'Disney California Adventure'],
    pips: ['🌟', '🎡', '⭐', '🎢'],
    cta: 'Enter the Original →',
    style: 'rs-card-disneyland',
  },
  {
    id: 'universal-orlando',
    eyebrow: 'Universal Orlando Resort',
    name: 'Vacation Like You Mean It',
    tagline: '3 parks · Epic Universe open · VelociCoaster · Hagrid\'s',
    parks: ['Universal Studios FL', 'Islands of Adventure', 'Epic Universe'],
    pips: ['🎬', '⚓', '✨'],
    cta: 'Enter the Action →',
    style: 'rs-card-universal',
  },
  {
    id: 'universal-hollywood',
    eyebrow: 'Universal Studios Hollywood',
    name: 'The Entertainment Capital of L.A.',
    tagline: 'Studio Tour · Nintendo World · Wizarding World · Lower Lot',
    parks: ['Universal Studios Hollywood', 'Studio Tour', 'CityWalk'],
    pips: ['🎬', '🎮', '🧙', '🦕'],
    cta: 'Enter the Studio →',
    style: 'rs-card-ush',
  },
]

export default function ResortSelector() {
  const { setActiveResort } = useApp()

  return (
    <div className="rs-page">
      <div className="rs-starfield" aria-hidden="true">
        {STARS.map(s => (
          <div key={s.id} className="rs-star-dot"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, '--dur': s.dur, '--delay': s.delay }}
          />
        ))}
      </div>

      <header className="rs-header">
        <div className="rs-wordmark">QueUp</div>
        <p className="rs-tagline">Your park. Your adventure. Your way.</p>
      </header>

      <div className="rs-four-grid">
        {RESORTS_CONFIG.map(resort => (
          <button
            key={resort.id}
            className={`rs-resort-card ${resort.style}`}
            onClick={() => setActiveResort(resort.id)}
          >
            <div className="rs-card-orb" />
            <div className="rs-card-pips" aria-hidden="true">
              {resort.pips.map((e, i) => (
                <span key={i} className="rs-pip" style={{ animationDelay: `${i * 0.4}s` }}>{e}</span>
              ))}
            </div>
            <div className="rs-card-content">
              <div className="rs-card-eyebrow">{resort.eyebrow}</div>
              <div className="rs-card-name">{resort.name}</div>
              <div className="rs-card-tagline">{resort.tagline}</div>
              <div className="rs-card-parks-row">
                {resort.parks.map(p => <span key={p} className="rs-park-badge">{p}</span>)}
              </div>
              <div className="rs-card-cta">{resort.cta}</div>
            </div>
          </button>
        ))}
      </div>

      <p className="rs-hint">✦ Progress saves automatically · All four resorts supported ✦</p>
    </div>
  )
}
