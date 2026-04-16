import { useState } from 'react'
import { HIDDEN_MICKEYS } from '../data'
import { useApp } from '../App'

const PARKS   = ['All', 'Magic Kingdom', 'EPCOT', 'Hollywood Studios', 'Animal Kingdom']
const DIFFS   = ['All', 'Easy', 'Medium', 'Hard', 'Legendary']

export default function HiddenMickeys() {
  const { foundMickeys, toggleMickey } = useApp()
  const [park,    setPark]    = useState('All')
  const [diff,    setDiff]    = useState('All')
  const [hideFound, setHideFound] = useState(false)

  const filtered = HIDDEN_MICKEYS.filter(m => {
    if (park !== 'All' && m.park !== park) return false
    if (diff !== 'All' && m.difficulty !== diff) return false
    if (hideFound && foundMickeys.has(m.id)) return false
    return true
  })

  const found = foundMickeys.size
  const total = HIDDEN_MICKEYS.length
  const pct   = Math.round((found / total) * 100)

  return (
    <div className="mickeys-page animate-fade-in">
      <h1 className="page-title" style={{ textAlign: 'center' }}>🐭 Hidden Mickeys</h1>
      <p className="page-subtitle" style={{ textAlign: 'center', marginBottom: 28 }}>
        Discover secret Mickey silhouettes hidden throughout the parks.<br />
        There's always room for one more haunting.
      </p>

      {/* Progress */}
      <div className="park-progress animate-float-up stagger-1" style={{ maxWidth: 520, margin: '0 auto 28px' }}>
        <div className="park-progress-label">
          <span>Mickeys Found</span>
          <span>{found} / {total}</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%`, background: 'linear-gradient(to right, var(--theme), var(--accent))' }} />
        </div>
      </div>

      {/* Park tabs */}
      <div className="tabs animate-float-up stagger-2">
        {PARKS.map(p => (
          <button key={p} className={`tab-btn${park === p ? ' active' : ''}`} onClick={() => setPark(p)}>
            {p === 'All' ? '🗺️ All' : p.split(' ').pop()}
          </button>
        ))}
      </div>

      {/* Difficulty + hide-found */}
      <div className="park-filters animate-float-up stagger-3" style={{ marginBottom: 24 }}>
        {DIFFS.map(d => (
          <button key={d} className={`filter-pill${diff === d ? ' on' : ''}`} onClick={() => setDiff(d)}>{d}</button>
        ))}
        <button className={`filter-pill${hideFound ? ' on' : ''}`} onClick={() => setHideFound(v => !v)} style={{ marginLeft: 'auto' }}>
          {hideFound ? '👁 Show Found' : '👁 Hide Found'}
        </button>
      </div>

      {filtered.length === 0
        ? <div className="empty-state"><div className="empty-icon">🎉</div><div className="empty-text">All found in this category!</div></div>
        : filtered.map((m, i) => {
          const isFound = foundMickeys.has(m.id)
          return (
            <div
              key={m.id}
              className={`mickey-card${isFound ? ' found' : ''} animate-float-up`}
              style={{ animationDelay: `${i * 0.04}s` }}
              onClick={() => toggleMickey(m.id)}
            >
              <div className="mickey-icon">{isFound ? '✓' : '🐭'}</div>
              <div style={{ flex: 1 }}>
                <div className="mickey-location">{m.location}</div>
                <div className="mickey-desc">{m.description}</div>
                <div className="mickey-tags">
                  <span className={`diff-badge diff-${m.difficulty}`}>{m.difficulty}</span>
                  <span className="badge">{m.park}</span>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
