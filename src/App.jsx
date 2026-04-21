import { createContext, useContext, useState, useEffect } from 'react'
import { addEntry } from './journalUtils'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import ResortDashboard from './components/ResortDashboard'
import ParkPage from './components/ParkPage'
import RidePage from './components/RidePage'
import DayPlanner from './components/DayPlanner'
import HiddenMickeys from './components/HiddenMickeys'
import FoodDrinks from './components/FoodDrinks'
import HotelPage from './components/HotelPage'
import Journal from './components/Journal'
import ParkMap from './components/ParkMap'
import ResortSelector from './components/ResortSelector'
import { LiveDataProvider } from './context/LiveDataContext'
import { RESORTS } from './data'

export const AppContext = createContext(null)

function loadSet(key) {
  try { return new Set(JSON.parse(localStorage.getItem(key)) || []) } catch { return new Set() }
}
function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]))
}

export default function App() {
  const [checkedRides,    setCheckedRides]    = useState(() => loadSet('pp_checked_rides'))
  const [foundMickeys,    setFoundMickeys]    = useState(() => loadSet('pp_found_mickeys'))
  const [triedFood,       setTriedFood]       = useState(() => loadSet('pp_tried_food'))
  const [triedDrinks,     setTriedDrinks]     = useState(() => loadSet('pp_tried_drinks'))
  const [manualDown,      setManualDown]      = useState(() => loadSet('pp_manual_down'))
  const [personalMustRide,setPersonalMustRide]= useState(() => loadSet('pp_personal_must'))
  const [activeResortId,  setActiveResortId]  = useState(() => localStorage.getItem('pp_active_resort') || null)

  const activeResort = activeResortId ? RESORTS.find(r => r.id === activeResortId) : null

  useEffect(() => {
    document.body.className = activeResortId === 'disney-world'
      ? 'app-disney'
      : activeResortId === 'universal-orlando'
      ? 'app-universal'
      : ''
  }, [activeResortId])

  const setActiveResort = (id) => { setActiveResortId(id); localStorage.setItem('pp_active_resort', id) }
  const clearActiveResort = () => { setActiveResortId(null); localStorage.removeItem('pp_active_resort') }

  const toggleRide = (id, name = '') => setCheckedRides(prev => {
    const next = new Set(prev)
    const adding = !next.has(id)
    adding ? next.add(id) : next.delete(id)
    if (adding && name) addEntry({ type: 'ride', title: name, itemId: id, itemType: 'ride' })
    saveSet('pp_checked_rides', next); return next
  })
  const toggleMickey = (id, name = '') => setFoundMickeys(prev => {
    const next = new Set(prev)
    const adding = !next.has(id)
    adding ? next.add(id) : next.delete(id)
    if (adding) addEntry({ type: 'mickey', title: name || 'Hidden Mickey Found', itemId: id })
    saveSet('pp_found_mickeys', next); return next
  })
  const toggleFood = (id, name = '') => setTriedFood(prev => {
    const next = new Set(prev)
    const adding = !next.has(id)
    adding ? next.add(id) : next.delete(id)
    if (adding && name) addEntry({ type: 'food', title: name, itemId: id, itemType: 'food' })
    saveSet('pp_tried_food', next); return next
  })
  const toggleDrink = (id) => setTriedDrinks(prev => {
    const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id)
    saveSet('pp_tried_drinks', next); return next
  })
  const toggleManualDown = (id) => setManualDown(prev => {
    const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id)
    saveSet('pp_manual_down', next); return next
  })
  const togglePersonalMust = (id) => setPersonalMustRide(prev => {
    const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id)
    saveSet('pp_personal_must', next); return next
  })

  return (
    <AppContext.Provider value={{
      checkedRides, toggleRide,
      foundMickeys, toggleMickey,
      triedFood,    toggleFood,
      triedDrinks,  toggleDrink,
      manualDown,   toggleManualDown,
      personalMustRide, togglePersonalMust,
      activeResort, activeResortId,
      setActiveResort, clearActiveResort,
      isDisney:    activeResortId === 'disney-world',
      isUniversal: activeResortId === 'universal-orlando',
    }}>
      <LiveDataProvider>
        <div className={`app-wrapper${activeResortId ? ` app-${activeResortId === 'disney-world' ? 'disney' : 'universal'}` : ''}`}>
          {activeResort && <Nav />}
          <main className={activeResort ? 'page-content animate-fade-in' : ''}>
            {!activeResort ? (
              <ResortSelector />
            ) : (
              <Routes>
                <Route path="/"             element={<ResortDashboard />} />
                <Route path="/park/:parkId" element={<ParkPage />} />
                <Route path="/ride/:rideId" element={<RidePage />} />
                <Route path="/planner"      element={<DayPlanner />} />
                <Route path="/mickeys"      element={<HiddenMickeys />} />
                <Route path="/food"         element={<FoodDrinks />} />
                <Route path="/hotel/:hotelId" element={<HotelPage />} />
                <Route path="/journal"           element={<Journal />} />
                <Route path="/map/:parkId"       element={<ParkMap />} />
              </Routes>
            )}
          </main>
        </div>
      </LiveDataProvider>
    </AppContext.Provider>
  )
}

export function useApp() { return useContext(AppContext) }
