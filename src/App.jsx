import { createContext, useContext, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import HomePage from './components/HomePage'
import ParkPage from './components/ParkPage'
import RidePage from './components/RidePage'
import DayPlanner from './components/DayPlanner'
import HiddenMickeys from './components/HiddenMickeys'
import FoodDrinks from './components/FoodDrinks'
import ParkSelector from './components/ParkSelector'
import { LiveDataProvider } from './context/LiveDataContext'
import { RESORTS } from './data'

export const AppContext = createContext(null)

function loadSet(key) {
  try { return new Set(JSON.parse(localStorage.getItem(key)) || []) } catch { return new Set() }
}
function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]))
}

// Park accent + theme colors for CSS variable injection
const PARK_THEME_VARS = {
  'magic-kingdom':             { primary: '#5B2BB5', glow: 'rgba(91,43,181,0.18)',   tint: 'rgba(91,43,181,0.07)',  bgRadial: 'rgba(91,43,181,0.12)' },
  'epcot':                     { primary: '#00A8CC', glow: 'rgba(0,168,204,0.18)',   tint: 'rgba(0,168,204,0.07)',  bgRadial: 'rgba(0,168,204,0.1)'  },
  'hollywood-studios':         { primary: '#C0392B', glow: 'rgba(192,57,43,0.18)',   tint: 'rgba(192,57,43,0.07)', bgRadial: 'rgba(192,57,43,0.1)'  },
  'animal-kingdom':            { primary: '#27AE60', glow: 'rgba(39,174,96,0.18)',   tint: 'rgba(39,174,96,0.07)', bgRadial: 'rgba(39,174,96,0.1)'  },
  'universal-studios-florida': { primary: '#0052CC', glow: 'rgba(0,82,204,0.18)',    tint: 'rgba(0,82,204,0.07)',  bgRadial: 'rgba(0,82,204,0.1)'   },
  'islands-of-adventure':      { primary: '#1A8FE3', glow: 'rgba(26,143,227,0.18)',  tint: 'rgba(26,143,227,0.07)', bgRadial: 'rgba(26,143,227,0.1)' },
  'epic-universe':             { primary: '#8B5CF6', glow: 'rgba(139,92,246,0.18)', tint: 'rgba(139,92,246,0.07)', bgRadial: 'rgba(139,92,246,0.1)' },
}

function applyParkTheme(parkId) {
  const vars = PARK_THEME_VARS[parkId]
  if (!vars) return
  const root = document.documentElement
  root.style.setProperty('--theme-primary', vars.primary)
  root.style.setProperty('--theme-glow',    vars.glow)
  root.style.setProperty('--theme-tint',    vars.tint)
  root.style.setProperty('--theme-bg-radial', vars.bgRadial)
  root.style.setProperty('--gold', vars.primary)
  root.style.setProperty('--gold-dim', vars.primary + 'aa')
  root.style.setProperty('--gold-glow', vars.glow)
  // Update body background radial glow
  document.body.style.backgroundImage = `
    radial-gradient(ellipse at 20% 0%, ${vars.bgRadial} 0%, transparent 60%),
    radial-gradient(ellipse at 80% 0%, ${vars.bgRadial} 0%, transparent 60%)
  `
}

function resetTheme() {
  const root = document.documentElement
  root.style.setProperty('--gold', '#f0b429')
  root.style.setProperty('--gold-dim', '#c8902a')
  root.style.setProperty('--gold-glow', 'rgba(240,180,41,0.15)')
  document.body.style.backgroundImage = `
    radial-gradient(ellipse at 20% 0%, rgba(91,43,181,0.08) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 0%, rgba(0,168,204,0.06) 0%, transparent 60%)
  `
}

export default function App() {
  const [checkedRides,  setCheckedRides]  = useState(() => loadSet('pp_checked_rides'))
  const [foundMickeys,  setFoundMickeys]  = useState(() => loadSet('pp_found_mickeys'))
  const [triedFood,     setTriedFood]     = useState(() => loadSet('pp_tried_food'))
  const [triedDrinks,   setTriedDrinks]   = useState(() => loadSet('pp_tried_drinks'))
  const [manualDown,    setManualDown]    = useState(() => loadSet('pp_manual_down'))
  const [activeParkId,  setActiveParkId]  = useState(() => localStorage.getItem('pp_active_park') || null)

  // Compute full park object from activeParkId
  const activePark = activeParkId
    ? RESORTS.flatMap(r => r.parks).find(p => p.id === activeParkId)
    : null

  // Apply theme whenever park changes
  useEffect(() => {
    if (activeParkId) applyParkTheme(activeParkId)
    else resetTheme()
  }, [activeParkId])

  const setActivePark = (id) => {
    setActiveParkId(id)
    localStorage.setItem('pp_active_park', id)
  }
  const clearActivePark = () => {
    setActiveParkId(null)
    localStorage.removeItem('pp_active_park')
  }

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
      activePark,   activeParkId, setActivePark, clearActivePark,
    }}>
      <LiveDataProvider>
        <div className="app-wrapper">
          {/* Only show nav once a park is selected */}
          {activePark && <Nav />}

          <main className={activePark ? 'page-content fade-in' : ''}>
            {!activePark ? (
              <ParkSelector />
            ) : (
              <Routes>
                <Route path="/"             element={<HomePage />} />
                <Route path="/park/:parkId" element={<ParkPage />} />
                <Route path="/ride/:rideId" element={<RidePage />} />
                <Route path="/planner"      element={<DayPlanner />} />
                <Route path="/mickeys"      element={<HiddenMickeys />} />
                <Route path="/food"         element={<FoodDrinks />} />
              </Routes>
            )}
          </main>
        </div>
      </LiveDataProvider>
    </AppContext.Provider>
  )
}

export function useApp() { return useContext(AppContext) }
