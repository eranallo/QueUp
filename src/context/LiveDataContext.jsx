import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const API_BASE = 'https://api.themeparks.wiki/v1'

// Our park IDs → how they appear in the ThemeParks.wiki API
const PARK_SLUG_MAP = {
  'magic-kingdom':            { slug: 'waltdisneyworld', match: 'Magic Kingdom' },
  'epcot':                    { slug: 'waltdisneyworld', match: 'Epcot' },
  'hollywood-studios':        { slug: 'waltdisneyworld', match: 'Hollywood Studios' },
  'animal-kingdom':           { slug: 'waltdisneyworld', match: 'Animal Kingdom' },
  'universal-studios-florida':{ slug: 'universalorlando', match: 'Universal Studios Florida' },
  'islands-of-adventure':     { slug: 'universalorlando', match: 'Islands of Adventure' },
  'epic-universe':            { slug: 'universalorlando', match: 'Epic Universe' },
}

const LiveDataContext = createContext(null)

// Fuzzy-match a ride name from our data to the API's name
function matchRideName(ourName, apiName) {
  const a = ourName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const b = apiName.toLowerCase().replace(/[^a-z0-9]/g, '')
  if (a === b) return true
  if (a.includes(b.slice(0, 12)) || b.includes(a.slice(0, 12))) return true
  return false
}

export function LiveDataProvider({ children }) {
  const [liveRides, setLiveRides]     = useState({})   // rideName → { status, waitTime, lastUpdated }
  const [rideImages, setRideImages]   = useState({})   // rideName → imageUrl
  const [parkEntityIds, setParkEntityIds] = useState({}) // our park id → api entity id
  const [loading, setLoading]         = useState(true)
  const [lastRefresh, setLastRefresh] = useState(null)
  const [apiError, setApiError]       = useState(false)

  // Step 1: Discover park entity IDs from the destinations endpoint
  useEffect(() => {
    async function discoverParks() {
      try {
        const res  = await fetch(`${API_BASE}/destinations`)
        const data = await res.json()

        const ids = {}
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

  // Step 2: Fetch images once we have park IDs (children endpoint)
  useEffect(() => {
    if (!Object.keys(parkEntityIds).length) return
    async function fetchImages() {
      const images = {}
      await Promise.allSettled(
        Object.entries(parkEntityIds).map(async ([, apiId]) => {
          const res  = await fetch(`${API_BASE}/entity/${apiId}/children`)
          const data = await res.json()
          for (const entity of (data.children || [])) {
            if (entity.imageUrl && entity.name) {
              images[entity.name.toLowerCase()] = entity.imageUrl
            }
          }
        })
      )
      setRideImages(images)
    }
    fetchImages()
  }, [parkEntityIds])

  // Step 3: Fetch live data (status + wait times) — refreshes every 5 min
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

  // Look up live data for a ride by its display name
  function getRideLive(rideName) {
    const lower = rideName.toLowerCase()
    // exact
    if (liveRides[lower]) return liveRides[lower]
    // fuzzy
    for (const [apiName, data] of Object.entries(liveRides)) {
      if (matchRideName(lower, apiName)) return data
    }
    return null
  }

  // Look up image URL for a ride
  function getRideImage(rideName) {
    const lower = rideName.toLowerCase()
    if (rideImages[lower]) return rideImages[lower]
    for (const [apiName, url] of Object.entries(rideImages)) {
      if (matchRideName(lower, apiName)) return url
    }
    return null
  }

  return (
    <LiveDataContext.Provider value={{ getRideLive, getRideImage, loading, lastRefresh, apiError, refresh: fetchLiveData }}>
      {children}
    </LiveDataContext.Provider>
  )
}

export function useLiveData() {
  return useContext(LiveDataContext)
}
