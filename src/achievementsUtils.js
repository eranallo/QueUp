// ============================================================
// ACHIEVEMENTS SYSTEM — 10 launch badges
// ============================================================

const STORAGE_KEY = 'pp_achievements'

export const ACHIEVEMENTS = [
  {
    id:       'first-ride',
    icon:     '🎢',
    name:     'First Ride',
    desc:     'Mark your very first ride as ridden.',
    category: 'Riding',
    color:    '#60a5fa',
    check:    ({ rideCount }) => rideCount >= 1,
    progress: ({ rideCount }) => ({ current: Math.min(rideCount, 1), total: 1 }),
  },
  {
    id:       'legend',
    icon:     '👑',
    name:     'QueUp Legend',
    desc:     'Ride 50 total attractions across all parks.',
    category: 'Riding',
    color:    '#f0b429',
    check:    ({ rideCount }) => rideCount >= 50,
    progress: ({ rideCount }) => ({ current: Math.min(rideCount, 50), total: 50 }),
  },
  {
    id:       'park-conqueror',
    icon:     '🗺️',
    name:     'Park Conqueror',
    desc:     'Reach 100% completion on any single park.',
    category: 'Riding',
    color:    '#34d399',
    check:    ({ parkPercents }) => Object.values(parkPercents).some(p => p >= 100),
    progress: ({ parkPercents }) => {
      const best = Math.max(0, ...Object.values(parkPercents))
      return { current: Math.round(best), total: 100, suffix: '%' }
    },
  },
  {
    id:       'five-star',
    icon:     '⭐',
    name:     'Five Star Experience',
    desc:     'Give a 5-star rating to any ride.',
    category: 'Exploring',
    color:    '#fbbf24',
    check:    ({ fiveStarCount }) => fiveStarCount >= 1,
    progress: ({ fiveStarCount }) => ({ current: Math.min(fiveStarCount, 1), total: 1 }),
  },
  {
    id:       'must-ride-list',
    icon:     '❤️',
    name:     'Must-Ride List',
    desc:     'Add 5 rides to your personal must-ride list.',
    category: 'Exploring',
    color:    '#f87171',
    check:    ({ mustRideCount }) => mustRideCount >= 5,
    progress: ({ mustRideCount }) => ({ current: Math.min(mustRideCount, 5), total: 5 }),
  },
  {
    id:       'mickey-hunter',
    icon:     '🐭',
    name:     'Mickey Hunter',
    desc:     'Find 10 Hidden Mickeys across the parks.',
    category: 'Exploring',
    color:    '#a78bfa',
    check:    ({ mickeyCount }) => mickeyCount >= 10,
    progress: ({ mickeyCount }) => ({ current: Math.min(mickeyCount, 10), total: 10 }),
  },
  {
    id:       'memory-maker',
    icon:     '📸',
    name:     'Memory Maker',
    desc:     'Add photos to 5 different rides or attractions.',
    category: 'Memories',
    color:    '#fb923c',
    check:    ({ photoItemCount }) => photoItemCount >= 5,
    progress: ({ photoItemCount }) => ({ current: Math.min(photoItemCount, 5), total: 5 }),
  },
  {
    id:       'storyteller',
    icon:     '✍️',
    name:     'Storyteller',
    desc:     'Write 5 journal entries during your trip.',
    category: 'Memories',
    color:    '#e879f9',
    check:    ({ journalNoteCount }) => journalNoteCount >= 5,
    progress: ({ journalNoteCount }) => ({ current: Math.min(journalNoteCount, 5), total: 5 }),
  },
  {
    id:       'world-traveler',
    icon:     '🌍',
    name:     'World Traveler',
    desc:     'Sample drinks from 5 EPCOT World Showcase countries.',
    category: 'Challenges',
    color:    '#2dd4bf',
    check:    ({ datwCount }) => datwCount >= 5,
    progress: ({ datwCount }) => ({ current: Math.min(datwCount, 5), total: 5 }),
  },
  {
    id:       'datw-champion',
    icon:     '🏆',
    name:     'World Showcase Champion',
    desc:     'Complete all 11 countries in Drinking Around the World.',
    category: 'Challenges',
    color:    '#f0b429',
    check:    ({ datwCount }) => datwCount >= 11,
    progress: ({ datwCount }) => ({ current: Math.min(datwCount, 11), total: 11 }),
  },
]

// Load unlock record { achievementId: timestamp }
export function loadUnlocked() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {} }
  catch { return {} }
}

function saveUnlocked(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// Count photos stored across all items
function countPhotoItems() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k?.startsWith('photo_')) keys.push(k)
  }
  // Count unique item IDs (photo_type_id_year_ts → unique on type+id)
  const unique = new Set(keys.map(k => k.split('_').slice(0, 3).join('_')))
  return unique.size
}

// Count 5-star ratings
function countFiveStars() {
  let count = 0
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k?.startsWith('rating_') && localStorage.getItem(k) === '5') count++
  }
  return count
}

// Count journal notes
function countJournalNotes() {
  try {
    const entries = JSON.parse(localStorage.getItem('pp_journal_v1')) || []
    return entries.filter(e => e.type === 'note').length
  } catch { return 0 }
}

// Count DATW countries completed
function countDATW() {
  try {
    const who = JSON.parse(localStorage.getItem('pp_datw_who')) || {}
    return Object.values(who).filter(v => v.triedBy?.length > 0).length
  } catch { return 0 }
}

// Build the stats snapshot used by all achievement checks
export function buildStats(checkedRides, foundMickeys, personalMustRide, allRides, parkRideMap) {
  const rideCount     = checkedRides.size
  const mickeyCount   = foundMickeys.size
  const mustRideCount = personalMustRide.size
  const photoItemCount  = countPhotoItems()
  const fiveStarCount   = countFiveStars()
  const journalNoteCount = countJournalNotes()
  const datwCount       = countDATW()

  // Park completion percentages
  const parkPercents = {}
  for (const [parkId, rides] of Object.entries(parkRideMap)) {
    const rideable = rides.filter(r => r.status !== 'REFURBISHMENT')
    const ridden   = rideable.filter(r => checkedRides.has(r.id)).length
    parkPercents[parkId] = rideable.length ? Math.round((ridden / rideable.length) * 100) : 0
  }

  return { rideCount, mickeyCount, mustRideCount, photoItemCount, fiveStarCount, journalNoteCount, datwCount, parkPercents }
}

// Check all achievements and return newly unlocked ones
export function checkAchievements(stats) {
  const unlocked  = loadUnlocked()
  const newlyWon  = []

  for (const ach of ACHIEVEMENTS) {
    if (unlocked[ach.id]) continue      // already unlocked
    if (ach.check(stats)) {
      unlocked[ach.id] = Date.now()
      newlyWon.push(ach)
    }
  }

  if (newlyWon.length) saveUnlocked(unlocked)
  return newlyWon
}

export function getUnlockedDate(id) {
  const unlocked = loadUnlocked()
  if (!unlocked[id]) return null
  return new Date(unlocked[id]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export const CATEGORIES = ['Riding', 'Exploring', 'Memories', 'Challenges']
