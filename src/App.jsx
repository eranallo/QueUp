import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import HomePage from './components/HomePage'
import ParkPage from './components/ParkPage'
import RidePage from './components/RidePage'
import DayPlanner from './components/DayPlanner'
import HiddenMickeys from './components/HiddenMickeys'
import FoodDrinks from './components/FoodDrinks'
import { fetchAllLiveStatus, fetchParkImages, PARK_ENTITY_IDS } from './services/liveStatus'

export const AppContext = createContext(null)

function loadSet(key) {
  try { return new Set(JSON.parse(localStorage.getItem(key)) || []) } catch { return new Set() }
}
function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]))
}

export default function App() {
  // ── Checklists ────────────────────────────────────────────
  const [checkedRides,  setCheckedRides]  = useState(() => loadSet('pp_checked_rides'))
  const [foundMickeys,  setFoundMickeys]  = useState(() => loadSet('pp_found_mickeys'))
  const [triedFood,     setTriedFood]     = useState(() => loadSet('pp_tried_food'))
  const [triedDrinks,   setTriedDrinks]   = useState(() => loadSet('pp_tried_drinks'))
  const [manualDown,    setManualDown]    = useState(() => loadSet('pp_manual_down'))

  // ── Live data ─────────────────────────────────────────────
  const [liveStatus,    setLiveStatus]    = useState({})
  const [parkImages,    setParkImages]    = useState({})
  const [statusLoading, setStatusLoading] = useState(true)
  const [lastRefreshed, setLastRefreshed] = useState(null)

  const refreshStatus = useCallback(async () => {
    setStatusLoading(true)
    const data = await fetchAllLiveStatus()
    setLiveStatus(data)
    setLastRefreshed(new Date())
    setStatusLoading(false)
  }, [])

  const fetchImages = useCallback(async () => {
    const allImages = {}
    await Promise.allSettled(
      Object.keys(PARK_ENTITY_IDS).map(async parkId => {
        const imgs = await fetchParkImages(parkId)
        if (Object.keys(imgs).length > 0) allImages[parkId] = imgs
      })
    )
    setParkImages(allImages)
  }, [])

  useEffect(() => {
    refreshStatus()
    fetchImages()
    const interval = setInterval(refreshStatus, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [refreshStatus, fetchImages])

  // ── Toggle helpers ────────────────────────────────────────
  const toggle = (setter, key) => (id) => setter(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    saveSet(key, next)
    return next
  })

  const toggleRide   = toggle(setCheckedRides, 'pp_checked_rides')
  const toggleMickey = toggle(setFoundMickeys, 'pp_found_mickeys')
  const toggleFood   = toggle(setTriedFood,    'pp_tried_food')
  const toggleDrink  = toggle(setTriedDrinks,  'pp_tried_drinks')
  const toggleDown   = toggle(setManualDown,   'pp_manual_down')

  return (
    <AppContext.Provider value={{
      checkedRides, toggleRide,
      foundMickeys, toggleMickey,
      triedFood,    toggleFood,
      triedDrinks,  toggleDrink,
      manualDown,   toggleDown,
      liveStatus,   parkImages,
      statusLoading, lastRefreshed,
      refreshStatus,
    }}>
      <div className="app-wrapper">
        <Nav statusLoading={statusLoading} lastRefreshed={lastRefreshed} refreshStatus={refreshStatus} />
        <main className="page-content fade-in">
          <Routes>
            <Route path="/"             element={<HomePage />} />
            <Route path="/park/:parkId" element={<ParkPage />} />
            <Route path="/ride/:rideId" element={<RidePage />} />
            <Route path="/planner"      element={<DayPlanner />} />
            <Route path="/mickeys"      element={<HiddenMickeys />} />
            <Route path="/food"         element={<FoodDrinks />} />
          </Routes>
        </main>
      </div>
    </AppContext.Provider>
  )
}

export function useApp() { return useContext(AppContext) }
