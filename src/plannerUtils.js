import { RESORTS } from './data'

const STORAGE_KEY = 'pp_trip_v3'

export function loadTrip() {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : defaultTrip() }
  catch { return defaultTrip() }
}
export function saveTrip(trip) { localStorage.setItem(STORAGE_KEY, JSON.stringify(trip)) }

export function defaultTrip() { return { hotel: '', checkIn: '', checkOut: '', notes: '', days: [] } }

export function makeDay(date = '', parkIds = []) {
  return {
    id: `day-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,
    date,
    parkIds,        // ← now an ARRAY to support multiple parks
    hotels: [],      // [{ id, name, type: 'check-in'|'staying'|'check-out' }]
    notes: '',
    items: [],
  }
}

export function makeItem(type = 'ride', overrides = {}) {
  return {
    id: `item-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,
    type,
    rideId: '', name: '',
    time: '', duration: 60,
    hasLL: false, llTime: '',
    notes: '', done: false,
    ...overrides,
  }
}

export function getParkById(parkId) {
  for (const resort of RESORTS)
    for (const park of resort.parks)
      if (park.id === parkId) return park
  return null
}

export function getAllParks() { return RESORTS.flatMap(r => r.parks) }

export function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export function arrayMove(arr, from, to) {
  const out = [...arr]; const [item] = out.splice(from, 1); out.splice(to, 0, item); return out
}

export const ITEM_TYPE_CONFIG = {
  ride:   { emoji: '🎢', label: 'Ride' },
  food:   { emoji: '🍽️', label: 'Food / Drink' },
  show:   { emoji: '🎭', label: 'Show / Entertainment' },
  break:  { emoji: '☀️', label: 'Break / Rest' },
  event:  { emoji: '🎉', label: 'Event' },
  resort: { emoji: '🏨', label: 'Hotel / Resort' },
}

export const DURATION_OPTIONS = [
  { value: 15,  label: '15 min' },
  { value: 30,  label: '30 min' },
  { value: 45,  label: '45 min' },
  { value: 60,  label: '1 hour' },
  { value: 90,  label: '1.5 hrs' },
  { value: 120, label: '2 hours' },
  { value: 180, label: '3 hours' },
  { value: 240, label: '4 hours' },
]
