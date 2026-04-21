import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const API_BASE = 'https://api.themeparks.wiki/v1'

const PARK_SLUG_MAP = {
  'magic-kingdom':             { slug: 'waltdisneyworld',  match: 'Magic Kingdom' },
  'epcot':                     { slug: 'waltdisneyworld',  match: 'Epcot' },
  'hollywood-studios':         { slug: 'waltdisneyworld',  match: 'Hollywood Studios' },
  'animal-kingdom':            { slug: 'waltdisneyworld',  match: 'Animal Kingdom' },
  'universal-studios-florida': { slug: 'universalorlando', match: 'Universal Studios Florida' },
  'islands-of-adventure':      { slug: 'universalorlando', match: 'Islands of Adventure' },
  'epic-universe':             { slug: 'universalorlando', match: 'Epic Universe' },
}

const LiveDataContext = createContext(null)

function matchRideName(ourName, apiName) {
  const a = ourName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const b = apiName.toLowerCase().replace(/[^a-z0-9]/g, '')
  if (a === b) return true
  if (a.includes(b.slice(0, 12)) || b.includes(a.slice(0, 12))) return true
  return false
}

// Format a time string like "2026-04-20T09:00:00-04:00" → "9:00 AM"
function fmtTime(isoStr) {
  if (!isoStr) return null
  try {
    return new Date(isoStr).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
  } catch { return null }
}

// Pull today's schedule entries for one park from the API response
// The API returns an array of schedule periods; we want today's date
function parseTodaySchedule(scheduleArr) {
  if (!Array.isArray(scheduleArr)) return null

  // Today in local time as YYYY-MM-DD
  const today = new Date().toLocaleDateString('en-CA') // en-CA gives YYYY-MM-DD

  const todayEntries = scheduleArr.filter(s => s.date === today)
  if (!todayEntries.length) return null

  const result = {
    date:        today,
    isOpen:      false,
    openTime:    null,
    closeTime:   null,
    earlyEntry:  null,   // { openTime, closeTime }
    afterHours:  null,   // { openTime, closeTime }
    specialEvent: null,  // { name, openTime, closeTime }
    raw:         todayEntries,
  }

  for (const entry of todayEntries) {
    const type = entry.type?.toUpperCase()
    const open  = fmtTime(entry.openingTime)
    const close = fmtTime(entry.closingTime)

    if (type === 'OPERATING') {
      result.isOpen    = true
      result.openTime  = open
      result.closeTime = close
    } else if (type === 'EXTRA_HOURS') {
      // Extra hours before normal open = Early Entry
      // Extra hours after normal close = After Hours
      if (entry.openingTime && result.openTime) {
        const extraOpen  = new Date(entry.openingTime)
        const normalOpen = new Date(scheduleArr.find(s => s.date === today && s.type?.toUpperCase() === 'OPERATING')?.openingTime || entry.openingTime)
        if (extraOpen < normalOpen) {
          result.earlyEntry = { openTime: open, closeTime: close, label: 'Early Entry' }
        } else {
          result.afterHours = { openTime: open, closeTime: close, label: 'After Hours' }
        }
      } else {
        result.earlyEntry = { openTime: open, closeTime: close, label: 'Early Entry' }
      }
    } else if (type === 'TICKETED_EVENT') {
      result.specialEvent = {
        name:      entry.name || 'Special Event',
        openTime:  open,
        closeTime: close,
      }
    } else if (type === 'EARLY_ENTRY' || type === 'RESORT_EARLY_ENTRY') {
      result.earlyEntry = { openTime: open, closeTime: close, label: 'Early Entry' }
    } else if (type === 'AFTER_HOURS') {
      result.afterHours = { openTime: open, closeTime: close, label: 'After Hours' }
    }
  }

  return result
}

export function LiveDataProvider({ children }) {
  const [liveRides,     setLiveRides]     = useState({})
  const [parkCoords,    setParkCoords]    = useState({})
  const [rideImages,    setRideImages]    = useState({})
  const [parkHours,     setParkHours]     = useState({}) // ourParkId → parsed schedule
  const [parkEntityIds, setParkEntityIds] = useState({})
  const [loading,       setLoading]       = useState(true)
  const [lastRefresh,   setLastRefresh]   = useState(null)
  const [apiError,      setApiError]      = useState(false)

  // Step 1: Discover park entity IDs
  useEffect(() => {
    async function discoverParks() {
      try {
        const res  = await fetch(`${API_BASE}/destinations`)
        const data = await res.json()
        const ids  = {}
        for (const dest of data.destinations) {
          for (const park of (dest.parks || [])) {
            for (const [ourId, { match }] of Object.entries(PARK_SLUG_MAP)) {
              if (park.name.toLowerCase().includes(match.toLowerCase())) {
                ids[ourId] = park.id
              }
            }
          }
        }
        setParkEntityIds(ids)
      } catch (e) {
        console.warn('ThemeParks.wiki: could not discover park IDs', e)
        setApiError(true)
        setLoading(false)
      }
    }
    discoverParks()
  }, [])

  // Step 2: Fetch ride images + coordinates once we have park IDs
  useEffect(() => {
    if (!Object.keys(parkEntityIds).length) return
    async function fetchImages() {
      const images = {}
      const coords = {}
      await Promise.allSettled(
        Object.entries(parkEntityIds).map(async ([ourId, apiId]) => {
          const res  = await fetch(`${API_BASE}/entity/${apiId}/children`)
          const data = await res.json()
          for (const entity of (data.children || [])) {
            const nameLow = entity.name?.toLowerCase()
            if (!nameLow) continue
            if (entity.imageUrl) images[nameLow] = entity.imageUrl
            if (entity.location?.latitude && entity.location?.longitude) {
              if (!coords[ourId]) coords[ourId] = []
              coords[ourId].push({
                name:      entity.name,
                nameLow,
                lat:       entity.location.latitude,
                lng:       entity.location.longitude,
                entityType: entity.entityType || 'ATTRACTION',
              })
            }
          }
        })
      )
      setRideImages(images)
      setParkCoords(coords)
    }
    fetchImages()
  }, [parkEntityIds])

  // Step 3: Fetch park schedules (today's hours + early entry)
  const fetchSchedules = useCallback(async () => {
    if (!Object.keys(parkEntityIds).length) return
    const hours = {}
    await Promise.allSettled(
      Object.entries(parkEntityIds).map(async ([ourId, apiId]) => {
        try {
          const res  = await fetch(`${API_BASE}/entity/${apiId}/schedule`)
          const data = await res.json()
          const parsed = parseTodaySchedule(data.schedule)
          if (parsed) hours[ourId] = parsed
        } catch (e) {
          console.warn(`ThemeParks.wiki: schedule fetch failed for ${ourId}`, e)
        }
      })
    )
    setParkHours(hours)
  }, [parkEntityIds])

  useEffect(() => {
    if (!Object.keys(parkEntityIds).length) return
    fetchSchedules()
    // Refresh hours every 30 min (they rarely change mid-day but sometimes do)
    const interval = setInterval(fetchSchedules, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [parkEntityIds, fetchSchedules])

  // Step 4: Fetch live wait times — refreshes every 5 min
  const fetchLiveData = useCallback(async () => {
    if (!Object.keys(parkEntityIds).length) return
    try {
      const rides = {}
      await Promise.allSettled(
        Object.entries(parkEntityIds).map(async ([, apiId]) => {
          const res  = await fetch(`${API_BASE}/entity/${apiId}/live`)
          const data = await res.json()
          for (const entity of (data.liveData || [])) {
            if (entity.entityType === 'ATTRACTION' && entity.name) {
              rides[entity.name.toLowerCase()] = {
                status:      entity.status || 'UNKNOWN',
                waitTime:    entity.queue?.STANDBY?.waitTime ?? null,
                lastUpdated: entity.lastUpdated || null,
              }
            }
          }
        })
      )
      setLiveRides(rides)
      setLastRefresh(new Date())
      setApiError(false)
    } catch (e) {
      console.warn('ThemeParks.wiki: live data fetch failed', e)
      setApiError(true)
    } finally {
      setLoading(false)
    }
  }, [parkEntityIds])

  useEffect(() => {
    if (!Object.keys(parkEntityIds).length) return
    fetchLiveData()
    const interval = setInterval(fetchLiveData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [parkEntityIds, fetchLiveData])

  function getRideLive(rideName) {
    const lower = rideName.toLowerCase()
    if (liveRides[lower]) return liveRides[lower]
    for (const [apiName, data] of Object.entries(liveRides)) {
      if (matchRideName(lower, apiName)) return data
    }
    return null
  }

  function getRideImage(rideName) {
    const lower = rideName.toLowerCase()
    if (rideImages[lower]) return rideImages[lower]
    for (const [apiName, url] of Object.entries(rideImages)) {
      if (matchRideName(lower, apiName)) return url
    }
    return null
  }

  // Get today's parsed hours for a park by our internal park ID
  function getParkHours(parkId) {
    return parkHours[parkId] || null
  }

  // Get coordinate markers for a park
  function getParkCoords(parkId) {
    return parkCoords[parkId] || []
  }

  return (
    <LiveDataContext.Provider value={{
      getRideLive, getRideImage, getParkHours, getParkCoords,
      loading, lastRefresh, apiError,
      refresh: fetchLiveData,
    }}>
      {children}
    </LiveDataContext.Provider>
  )
}

export function useLiveData() {
  return useContext(LiveDataContext)
}
