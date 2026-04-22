import { useState } from 'react'
import { useApp } from '../App'
import { ACHIEVEMENTS, loadUnlocked, getUnlockedDate, CATEGORIES, buildStats } from '../achievementsUtils'
import { RESORTS } from '../data'

function AchievementCard({ ach, stats, unlocked }) {
  const isUnlocked = !!unlocked[ach.id]
  const unlockedDate = getUnlockedDate(ach.id)
  const prog = ach.progress(stats)
  const pct  = Math.round((prog.current / prog.total) * 100)

  return (
    <div
      className={`ach-card${isUnlocked ? ' unlocked' : ' locked'}`}
      style={isUnlocked ? { borderColor: `${ach.color}55`, boxShadow: `0 0 20px ${ach.color}22` } : {}}
    >
      {/* Icon */}
      <div
        className="ach-icon"
        style={isUnlocked
          ? { background: `${ach.color}22`, border: `2px solid ${ach.color}66`, boxShadow: `0 0 16px ${ach.color}44` }
          : { background: 'var(--bg-deep)', border: '2px solid var(--border)', filter: 'grayscale(1)' }
        }
      >
        {ach.icon}
      </div>

      {/* Info */}
      <div className="ach-info">
        <div className="ach-name" style={isUnlocked ? { color: ach.color } : {}}>
          {ach.name}
        </div>
        <div className="ach-desc">{ach.desc}</div>

        {/* Progress bar for locked */}
        {!isUnlocked && (
          <div className="ach-progress-wrap">
            <div className="ach-progress-bar">
              <div
                className="ach-progress-fill"
                style={{ width: `${pct}%`, background: ach.color }}
              />
            </div>
            <span className="ach-progress-label">
              {prog.current}{prog.suffix || ''} / {prog.total}{prog.suffix || ''}
            </span>
          </div>
        )}

        {/* Unlock date for unlocked */}
        {isUnlocked && unlockedDate && (
          <div className="ach-date">✓ Unlocked {unlockedDate}</div>
        )}
      </div>

      {/* Lock/unlock indicator */}
      <div className="ach-status">
        {isUnlocked
          ? <span style={{ fontSize: '1.2rem', filter: `drop-shadow(0 0 6px ${ach.color})` }}>✓</span>
          : <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>🔒</span>
        }
      </div>
    </div>
  )
}

export default function Achievements() {
  const { checkedRides, foundMickeys, personalMustRide } = useApp()

  // Build stats for achievement checks
  const allParks   = RESORTS.flatMap(r => r.parks)
  const parkRideMap = {}
  for (const park of allParks) parkRideMap[park.id] = park.lands.flatMap(l => l.rides)
  const stats = buildStats(checkedRides, foundMickeys, personalMustRide, [], parkRideMap)
  const [activeCategory, setActiveCategory] = useState('All')
  const unlocked  = loadUnlocked()
  const totalWon  = Object.keys(unlocked).length
  const totalAch  = ACHIEVEMENTS.length

  const displayed = activeCategory === 'All'
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter(a => a.category === activeCategory)

  // Sort: unlocked first, then by progress desc
  const sorted = [...displayed].sort((a, b) => {
    const aWon = !!unlocked[a.id]
    const bWon = !!unlocked[b.id]
    if (aWon !== bWon) return aWon ? -1 : 1
    if (aWon && bWon) return (unlocked[b.id] || 0) - (unlocked[a.id] || 0)
    const aP = a.progress(stats)
    const bP = b.progress(stats)
    return (bP.current / bP.total) - (aP.current / aP.total)
  })

  return (
    <div className="ach-page animate-fade-in">

      {/* Hero */}
      <div className="ach-hero">
        <div className="ach-hero-inner">
          <div>
            <h1 className="ach-hero-title">🏆 Achievements</h1>
            <p className="ach-hero-sub">Earn badges by exploring, riding, and creating memories.</p>
          </div>
          <div className="ach-hero-count">
            <span className="ach-hero-num" style={{ color: totalWon === totalAch ? '#10b981' : 'var(--accent)' }}>
              {totalWon}
            </span>
            <span className="ach-hero-denom">/ {totalAch}</span>
            <div className="ach-hero-label">Earned</div>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="ach-overall-bar">
          <div
            className="ach-overall-fill"
            style={{
              width: `${Math.round((totalWon / totalAch) * 100)}%`,
              background: totalWon === totalAch
                ? 'linear-gradient(to right, #10b981, #34d399)'
                : 'linear-gradient(to right, #7c3aed, #f0b429)',
            }}
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="ach-filters">
        {['All', ...CATEGORIES].map(cat => {
          const count = cat === 'All'
            ? ACHIEVEMENTS.filter(a => unlocked[a.id]).length
            : ACHIEVEMENTS.filter(a => a.category === cat && unlocked[a.id]).length
          const total = cat === 'All' ? ACHIEVEMENTS.length : ACHIEVEMENTS.filter(a => a.category === cat).length
          return (
            <button
              key={cat}
              className={`filter-pill${activeCategory === cat ? ' on' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat} <span style={{ opacity: 0.7, fontSize: '0.65rem' }}>{count}/{total}</span>
            </button>
          )
        })}
      </div>

      {/* Achievement cards */}
      <div className="ach-list">
        {sorted.map(ach => (
          <AchievementCard
            key={ach.id}
            ach={ach}
            stats={stats}
            unlocked={unlocked}
          />
        ))}
      </div>

      {totalWon === totalAch && (
        <div className="ach-complete">
          <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🎉</div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', marginBottom: 6 }}>All Achievements Unlocked!</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>You're a true QueUp Legend.</div>
        </div>
      )}
    </div>
  )
}
