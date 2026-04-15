// ============================================================
// QueUp — Live Status Service
// Uses the free, public themeparks.wiki API
// Docs: https://api.themeparks.wiki/docs
// ============================================================

const BASE = 'https://api.themeparks.wiki/v1'

// Park entity IDs from themeparks.wiki
export const PARK_ENTITY_IDS = {
  'magic-kingdom':             '75ea578a-adc8-4116-a54d-dccb60765ef9',
  'epcot':                     '47f90d2c-e191-4239-a466-5892ef59a88b',
  'hollywood-studios':         '288747d1-8b4f-4a64-867e-ea7c9b27bad8',
  'animal-kingdom':            '1c84a229-8862-4648-9c71-378dabb7891b',
  'universal-studios-florida': 'eb3f4560-2383-4a36-9152-6b3e5ed6bc57',
  'islands-of-adventure':      '267615cc-8943-4c2a-ae2c-5da728ca591f',
  'epic-universe':             'bd9746d9-1094-4e34-a23d-bcbf5d3d9c95',
}

// Normalize attraction names for fuzzy matching between our data and the API
function norm(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// Score how well two ride names match (0–1)
function matchScore(a, b) {
  const na = norm(a), nb = norm(b)
  if (na === nb) return 1
  if (na.includes(nb) || nb.includes(na)) return 0.9
  // Word overlap score
  const wa = new Set(na.split(' '))
  const wb = new Set(nb.split(' '))
  const overlap = [...wa].filter(w => wb.has(w) && w.length > 2).length
  const total = Math.max(wa.size, wb.size)
  return overlap / total
}

// Find the best matching attraction from the API for a given ride name
function findBestMatch(rideName, apiAttractions) {
  let best = null, bestScore = 0
  for (const a of apiAttractions) {
    const score = matchScore(rideName, a.name)
    if (score > bestScore) { bestScore = score; best = a }
  }
  return bestScore >= 0.6 ? best : null
}

// ── Fetch live wait times + status for all parks ──────────────
export async function fetchAllLiveStatus() {
  const results = {}

  await Promise.allSettled(
    Object.entries(PARK_ENTITY_IDS).map(async ([parkId, entityId]) => {
      try {
        const res = await fetch(`${BASE}/entity/${entityId}/live`, {
          headers: { Accept: 'application/json' },
          signal: AbortSignal.timeout(8000),
        })
        if (!res.ok) return
        const data = await res.json()
        results[parkId] = {}
        for (const item of data.liveData || []) {
          if (item.entityType !== 'ATTRACTION') continue
          results[parkId][norm(item.name)] = {
            apiName:     item.name,
            status:      item.status,          // OPERATING | DOWN | CLOSED | REFURBISHMENT
            waitTime:    item.queue?.STANDBY?.waitTime ?? null,
            singleRider: item.queue?.SINGLE_RIDER?.waitTime ?? null,
            lightningLane: item.queue?.RETURN_TIME?.state ?? null,
            lastUpdated: item.lastUpdated,
            entityId:    item.id,
          }
        }
      } catch (e) {
        console.warn(`[QueUp] Failed to fetch live status for ${parkId}:`, e.message)
      }
    })
  )

  return results
}

// Given our ride name + parkId, look up live data from the fetched results
export function getRideLiveData(rideName, parkId, allLiveStatus) {
  const parkData = allLiveStatus?.[parkId]
  if (!parkData) return null

  // Try exact normalized match first
  const key = norm(rideName)
  if (parkData[key]) return parkData[key]

  // Fallback: fuzzy match across all attractions in this park
  const apiList = Object.values(parkData)
  let best = null, bestScore = 0
  for (const item of apiList) {
    const score = matchScore(rideName, item.apiName)
    if (score > bestScore) { bestScore = score; best = item }
  }
  return bestScore >= 0.6 ? best : null
}

// ── Fetch ride images from the park's children endpoint ───────
export async function fetchParkImages(parkId) {
  const entityId = PARK_ENTITY_IDS[parkId]
  if (!entityId) return {}

  try {
    const res = await fetch(`${BASE}/entity/${entityId}/children`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return {}
    const data = await res.json()
    const images = {}

    for (const child of data.children || []) {
      if (!child.media?.length) continue
      // Prefer images over other media types
      const img = child.media.find(m => m.type === 'image' || m.contentType?.startsWith('image'))
      if (img?.url) {
        images[norm(child.name)] = img.url
      }
    }
    return images
  } catch (e) {
    console.warn(`[QueUp] Failed to fetch images for ${parkId}:`, e.message)
    return {}
  }
}

export function getRideImage(rideName, parkId, allParkImages) {
  const parkImgs = allParkImages?.[parkId]
  if (!parkImgs) return null
  const key = norm(rideName)
  if (parkImgs[key]) return parkImgs[key]
  // Fuzzy fallback
  const names = Object.keys(parkImgs)
  let best = null, bestScore = 0
  for (const n of names) {
    const score = matchScore(rideName, n)
    if (score > bestScore) { bestScore = score; best = parkImgs[n] }
  }
  return bestScore >= 0.65 ? best : null
}

export const STATUS_CONFIG = {
  OPERATING:     { label: 'Operating',     color: '#10b981', bg: 'rgba(16,185,129,0.12)', icon: '✅' },
  DOWN:          { label: 'Down',          color: '#ef4444', bg: 'rgba(239,68,68,0.12)',  icon: '🚫' },
  CLOSED:        { label: 'Closed Today',  color: '#6b7280', bg: 'rgba(107,114,128,0.12)',icon: '🔒' },
  REFURBISHMENT: { label: 'Refurbishment', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: '🔧' },
  MANUAL_DOWN:   { label: 'Reported Down', color: '#f97316', bg: 'rgba(249,115,22,0.12)', icon: '⚠️' },
  LOADING:       { label: 'Checking…',     color: '#6b7280', bg: 'transparent',           icon: '⏳' },
}
