// ============================================================
// JOURNAL UTILITIES
// Each entry: { id, ts, type, title, note, itemId, itemType, rating, photoKey }
// Types: ride | food | photo | rating | mickey | note
// ============================================================

const KEY = 'pp_journal_v1'

export function loadJournal() {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] }
  catch { return [] }
}

export function saveJournal(entries) {
  localStorage.setItem(KEY, JSON.stringify(entries))
}

export function addEntry(patch) {
  const entries = loadJournal()
  const entry = {
    id:       `j-${Date.now()}-${Math.random().toString(36).slice(2,5)}`,
    ts:       Date.now(),
    type:     'note',
    title:    '',
    note:     '',
    itemId:   null,
    itemType: null,
    rating:   null,
    photoKey: null,
    ...patch,
  }
  entries.push(entry)
  saveJournal(entries)
  return entry
}

export function updateEntry(id, patch) {
  const entries = loadJournal().map(e => e.id === id ? { ...e, ...patch } : e)
  saveJournal(entries)
  return entries
}

export function deleteEntry(id) {
  const entries = loadJournal().filter(e => e.id !== id)
  saveJournal(entries)
  return entries
}

// Get entries for a specific calendar date (YYYY-MM-DD)
export function getEntriesForDate(dateStr) {
  return loadJournal()
    .filter(e => {
      const d = new Date(e.ts)
      return d.toLocaleDateString('en-CA') === dateStr
    })
    .sort((a, b) => a.ts - b.ts)
}

// Get all unique dates that have entries (for the calendar)
export function getJournalDates() {
  return [...new Set(
    loadJournal().map(e => new Date(e.ts).toLocaleDateString('en-CA'))
  )].sort().reverse()
}

export function fmtTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
}

export function fmtDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })
}

export const ENTRY_CONFIG = {
  ride:   { emoji: '🎢', label: 'Ride',           color: '#60a5fa' },
  food:   { emoji: '🍽️', label: 'Food / Drink',   color: '#34d399' },
  photo:  { emoji: '📸', label: 'Photo',           color: '#f0b429' },
  rating: { emoji: '⭐', label: 'Rating',          color: '#f59e0b' },
  mickey: { emoji: '🐭', label: 'Hidden Mickey',   color: '#a78bfa' },
  hotel:  { emoji: '🏨', label: 'Hotel',           color: '#f97316' },
  note:   { emoji: '✍️', label: 'Journal Entry',   color: 'var(--text-secondary)' },
}
