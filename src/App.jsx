import { createContext, useContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import HomePage from './components/HomePage'
import ParkPage from './components/ParkPage'
import RidePage from './components/RidePage'
import DayPlanner from './components/DayPlanner'
import HiddenMickeys from './components/HiddenMickeys'
import FoodDrinks from './components/FoodDrinks'
import { LiveDataProvider } from './context/LiveDataContext'

export const AppContext = createContext(null)

function loadSet(key) {
  try { return new Set(JSON.parse(localStorage.getItem(key)) || []) } catch { return new Set() }
}
function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]))
}

export default function App() {
  const [checkedRides,  setCheckedRides]  = useState(() => loadSet('pp_checked_rides'))
  const [foundMickeys,  setFoundMickeys]  = useState(() => loadSet('pp_found_mickeys'))
  const [triedFood,     setTriedFood]     = useState(() => loadSet('pp_tried_food'))
  const [triedDrinks,   setTriedDrinks]   = useState(() => loadSet('pp_tried_drinks'))
  const [manualDown,    setManualDown]    = useState(() => loadSet('pp_manual_down'))

  const toggleRide = (id) => setCheckedRides(prev => {
    const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id)
    saveSet('pp_checked_rides', next); return next
  })
  const toggleMickey = (id) => setFoundMickeys(prev => {
    const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id)
    saveSet('pp_found_mickeys', next); return next
  })
  const toggleFood = (id) => setTriedFood(prev => {
    const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id)
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

  return (
    <AppContext.Provider value={{
      checkedRides, toggleRide,
      foundMickeys, toggleMickey,
      triedFood,    toggleFood,
      triedDrinks,  toggleDrink,
      manualDown,   toggleManualDown,
    }}>
      <LiveDataProvider>
        <div className="app-wrapper">
          <Nav />
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
      </LiveDataProvider>
    </AppContext.Provider>
  )
}

export function useApp() { return useContext(AppContext) }
