import { useState } from 'react'
import { HIDDEN_MICKEYS } from '../data'
import { useApp } from '../App'

const PARKS = ['All Parks', 'Magic Kingdom', 'EPCOT', 'Hollywood Studios', 'Animal Kingdom']
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard', 'Legendary']

export default function HiddenMickeys() {
  const { foundMickeys, toggleMickey } = useApp()
  const [activePark, setActivePark] = useState('All Parks')
  const [activeDiff, setActiveDiff] = useState('All')
  const [showFound, setShowFound] = useState(true)

  const filtered = HIDDEN_MICKEYS.filter(m => {
    if (activePark !== 'All Parks' && m.park !== activePark) return false
    if (activeDiff !== 'All' && m.difficulty !== activeDiff) return false
    if (!showFound && foundMickeys.has(m.id)) return false
    return true
  })

  const total = HIDDEN_MICKEYS.length
  const found = foundMickeys.size
  const pct = total ? Math.round((found / total) * 100) : 0

  return (
    <div className="mickeys-page">
      <div className="mickeys-header">
        <h1 className="mickeys-title">🐭 Hidden Mickeys</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
          Discover the secret Mickey silhouettes hidden throughout the parks.<br />
          There are officially "999 happy haunts" — but how many Mickeys can you find?
        </p>

        {/* Progress */}
        <div className="planner-progress" style={{ maxWidth: 500, margin: '0 auto 24px' }}>
          <div className="progress-label">
            <span>Mickeys Found</span>
            <span>{found} / {total} ({pct}%)</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${pct}%`, background: 'linear-gradient(to right, var(--gold), #f59e0b)' }} />
          </div>
        </div>
      </div>

      {/* Park filter */}
      <div className="tabs">
        {PARKS.map(p => (
          <button key={p} className={`tab-btn${activePark === p ? ' active' : ''}`} onClick={() => setActivePark(p)}>
            {p === 'All Parks' ? '🗺️ All' : p.split(' ').slice(-1)[0]}
          </button>
        ))}
      </div>

      {/* Difficulty + show-found filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24, alignItems: 'center' }}>
        {DIFFICULTIES.map(d => (
          <button key={d} className={`filter-btn${activeDiff === d ? ' active' : ''}`} onClick={() => setActiveDiff(d)}>
            {d === 'Easy' && '🟢'} {d === 'Medium' && '🟡'} {d === 'Hard' && '🟠'} {d === 'Legendary' && '🔴'} {d}
          </button>
        ))}
        <button className={`filter-btn${!showFound ? ' active' : ''}`} onClick={() => setShowFound(v => !v)} style={{ marginLeft: 'auto' }}>
          {showFound ? '👁 Hide Found' : '👁 Show Found'}
        </button>
      </div>

      {/* Mickey list */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎉</div>
          <div className="empty-state-text">You found 'em all in this category!</div>
        </div>
      ) : (
        <div>
          {filtered.map(mickey => {
            const isFound = foundMickeys.has(mickey.id)
            return (
              <div key={mickey.id} className={`mickey-card${isFound ? ' found' : ''}`} onClick={() => toggleMickey(mickey.id)}>
                <div className="mickey-icon-circle">
                  {isFound ? '✓' : '🐭'}
                </div>
                <div className="mickey-body">
                  <div className="mickey-location">{mickey.location}</div>
                  <div className="mickey-description">{mickey.description}</div>
                  <div className="mickey-footer">
                    <span className={`difficulty-badge ${mickey.difficulty}`}>{mickey.difficulty}</span>
                    <span className="ride-badge" style={{ fontSize: '0.72rem' }}>{mickey.park}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
