import { useEffect, useRef } from 'react'
import { useApp } from '../App'
import { RESORTS } from '../data'

// Star positions — seeded so they don't rerender chaotically
const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  top:   `${(i * 7.3 + 11) % 90 + 5}%`,
  left:  `${(i * 13.7 + 23) % 90 + 5}%`,
  size:  i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5,
  dur:   `${2.5 + (i % 4) * 0.8}s`,
  delay: `${(i * 0.3) % 3}s`,
}))

export default function ResortSelector() {
  const { setActiveResort } = useApp()

  return (
    <div className="rs-page">
      {/* Star field */}
      <div className="rs-starfield" aria-hidden="true">
        {STARS.map(s => (
          <div
            key={s.id}
            className="rs-star-dot"
            style={{
              top: s.top, left: s.left,
              width: s.size, height: s.size,
              '--dur': s.dur, '--delay': s.delay,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <header className="rs-header">
        <div className="rs-wordmark">QueUp</div>
        <p className="rs-tagline">Your park. Your adventure. Your way.</p>
      </header>

      {/* Resort cards */}
      <div className="rs-split">

        {/* DISNEY */}
        <button className="rs-resort-card rs-card-disney" onClick={() => setActiveResort('disney-world')}>
          <div className="rs-card-orb" />
          <div className="rs-disney-castle" aria-hidden="true" />

          {/* Floating park emoji pips */}
          <div className="rs-card-pips" aria-hidden="true">
            {['🏰','🌍','🎬','🦁'].map((e,i) => (
              <span key={i} className="rs-pip" style={{ animationDelay: `${i * 0.4}s` }}>{e}</span>
            ))}
          </div>

          <div className="rs-card-content">
            <div className="rs-card-eyebrow">Walt Disney World Resort</div>
            <div className="rs-card-name">The Most Magical Place on Earth</div>
            <div className="rs-card-tagline">4 parks · 60+ attractions · Hidden Mickeys · Drinking Around the World</div>
            <div className="rs-card-parks-row">
              {['Magic Kingdom','EPCOT','Hollywood Studios','Animal Kingdom'].map(p => (
                <span key={p} className="rs-park-badge">{p}</span>
              ))}
            </div>
            <div className="rs-card-cta">Enter the Magic →</div>
          </div>
        </button>

        {/* UNIVERSAL */}
        <button className="rs-resort-card rs-card-universal" onClick={() => setActiveResort('universal-orlando')}>
          <div className="rs-card-orb" />
          <div className="rs-universal-globe" aria-hidden="true" />

          {/* Floating park emoji pips */}
          <div className="rs-card-pips" aria-hidden="true">
            {['🎬','⚓','✨'].map((e,i) => (
              <span key={i} className="rs-pip" style={{ animationDelay: `${i * 0.5}s` }}>{e}</span>
            ))}
          </div>

          <div className="rs-card-content">
            <div className="rs-card-eyebrow">Universal Orlando Resort</div>
            <div className="rs-card-name">Vacation Like You Mean It</div>
            <div className="rs-card-tagline">3 parks · 40+ attractions · Epic Universe now open · VelociCoaster</div>
            <div className="rs-card-parks-row">
              {['Universal Studios','Islands of Adventure','Epic Universe'].map(p => (
                <span key={p} className="rs-park-badge">{p}</span>
              ))}
            </div>
            <div className="rs-card-cta">Enter the Action →</div>
          </div>
        </button>

      </div>

      <p className="rs-hint">✦ Progress saves automatically · Works on any device ✦</p>
    </div>
  )
}
