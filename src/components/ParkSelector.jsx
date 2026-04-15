import { useApp } from '../App'
import { RESORTS } from '../data'

const PARK_THEMES = {
  'magic-kingdom':             { tagline: 'Where the magic began',            bg: 'linear-gradient(135deg, #2d1b69 0%, #5B2BB5 50%, #1a0f3d 100%)' },
  'epcot':                     { tagline: 'Innovation meets imagination',       bg: 'linear-gradient(135deg, #003d52 0%, #00A8CC 50%, #001a24 100%)' },
  'hollywood-studios':         { tagline: 'Lights, camera, adventure',          bg: 'linear-gradient(135deg, #4a0e0e 0%, #C0392B 50%, #1a0505 100%)' },
  'animal-kingdom':            { tagline: 'A wild world awaits',                bg: 'linear-gradient(135deg, #0d2d18 0%, #27AE60 50%, #050f09 100%)' },
  'universal-studios-florida': { tagline: 'Ride the movies',                    bg: 'linear-gradient(135deg, #001a52 0%, #0052CC 50%, #000a1f 100%)' },
  'islands-of-adventure':      { tagline: 'The most thrilling park in Florida', bg: 'linear-gradient(135deg, #0a1f3d 0%, #1A8FE3 50%, #040d1a 100%)' },
  'epic-universe':             { tagline: 'A whole new universe — opened 2025', bg: 'linear-gradient(135deg, #1a0a3d 0%, #8B5CF6 50%, #0a0519 100%)' },
}

export default function ParkSelector() {
  const { setActivePark } = useApp()

  return (
    <div className="park-selector-page">
      {/* Stars */}
      <div className="selector-star s1" /><div className="selector-star s2" />
      <div className="selector-star s3" /><div className="selector-star s4" />
      <div className="selector-star s5" />

      <div className="selector-header">
        <h1 className="selector-title">QueUp</h1>
        <p className="selector-subtitle">Which park are you conquering today?</p>
      </div>

      <div className="selector-resorts">
        {RESORTS.map(resort => (
          <div key={resort.id} className="selector-resort-block">
            <div className="selector-resort-label">
              <span>{resort.emoji}</span> {resort.name}
            </div>
            <div className="selector-parks-grid">
              {resort.parks.map(park => {
                const theme = PARK_THEMES[park.id] || {}
                return (
                  <button
                    key={park.id}
                    className="selector-park-card"
                    style={{ background: theme.bg }}
                    onClick={() => setActivePark(park.id)}
                  >
                    <div className="selector-park-glow" style={{ background: park.accentColor }} />
                    <div className="selector-park-emoji">{park.emoji}</div>
                    <div className="selector-park-name">{park.name}</div>
                    <div className="selector-park-tagline">{theme.tagline}</div>
                    {park.id === 'epic-universe' && (
                      <span className="selector-new-badge">NEW 2025</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
