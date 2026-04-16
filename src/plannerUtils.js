// ============================================================
// TRIP PLANNER UTILITIES
// ============================================================
import { RESORTS } from './data'

const STORAGE_KEY = 'pp_trip_v3'

export function loadTrip() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultTrip()
    return JSON.parse(raw)
  } catch { return defaultTrip() }
}

export function saveTrip(trip) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trip))
}

export function defaultTrip() {
  return {
    hotel: '',
    checkIn: '',
    checkOut: '',
    notes: '',
    days: [],
  }
}

export function makeDay(date = '', parkId = '') {
  return {
    id: `day-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    date,
    parkId,
    notes: '',
    items: [],
  }
}

export function makeItem(type = 'ride', overrides = {}) {
  return {
    id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type,          // 'ride' | 'food' | 'show' | 'break' | 'custom'
    rideId: '',
    name: '',
    time: '',
    duration: 60,
    hasLL: false,
    llTime: '',
    notes: '',
    done: false,
    ...overrides,
  }
}

export function getParkById(parkId) {
  for (const resort of RESORTS)
    for (const park of resort.parks)
      if (park.id === parkId) return park
  return null
}

export function getAllParks() {
  return RESORTS.flatMap(r => r.parks)
}

export function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export function daysBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  const a = new Date(checkIn), b = new Date(checkOut)
  return Math.max(0, Math.round((b - a) / 86400000))
}

export function arrayMove(arr, from, to) {
  const out = [...arr]
  const [item] = out.splice(from, 1)
  out.splice(to, 0, item)
  return out
}

export const ITEM_TYPE_CONFIG = {
  ride:   { emoji: '🎢', label: 'Ride',          color: '#60a5fa' },
  food:   { emoji: '🍽️', label: 'Food / Drink',  color: '#34d399' },
  show:   { emoji: '🎭', label: 'Show',           color: '#c4b5fd' },
  break:  { emoji: '☀️', label: 'Break / Rest',   color: '#fcd34d' },
  custom: { emoji: '📌', label: 'Custom',         color: '#f87171' },
}
