// ============================================================
// useResortData — single source of truth for resort-filtered data
// All components should use this instead of importing RESORTS
// or FOOD_DRINKS directly when they need resort-filtered content
// ============================================================
import { useApp } from './App'
import { RESORTS, HIDDEN_MICKEYS, FOOD_DRINKS } from './data'
import { getHotelsByResort } from './hotelsData'

export function useResortData() {
  const { activeResortId, isDisney, isUniversal } = useApp()

  // Parks for the active resort only
  const activeResortObj = RESORTS.find(r => r.id === activeResortId)
  const parks = activeResortObj?.parks || []

  // All rides across active resort parks
  const allRides = parks.flatMap(p => p.lands.flatMap(l => l.rides))

  // Hidden Mickeys — Disney World only feature
  const mickeys = isDisney ? HIDDEN_MICKEYS : []

  // Food & Drinks
  const disneyFood      = FOOD_DRINKS.disneyWorldFood  || []
  const universalFood   = FOOD_DRINKS.universalFood    || []
  const datw            = FOOD_DRINKS.drinkingAroundTheWorld

  // Food relevant to active resort
  const resortFood = isDisney ? disneyFood : universalFood

  // Food categories relevant to active resort parks
  const PARK_FOOD_CATEGORIES = {
    'magic-kingdom':             ['Magic Kingdom'],
    'epcot':                     ['EPCOT'],
    'hollywood-studios':         ['Hollywood Studios'],
    'animal-kingdom':            ['Animal Kingdom'],
    'universal-studios-florida': ['Wizarding World', 'Springfield'],
    'islands-of-adventure':      ['Wizarding World'],
    'epic-universe':             ['Epic Universe'],
  }
  const activeFoodCategories = [
    ...new Set(parks.flatMap(p => PARK_FOOD_CATEGORIES[p.id] || []))
  ]
  const parkFood = resortFood.filter(f => activeFoodCategories.includes(f.category))

  // Shows per park — resort-aware
  const PARK_SHOWS = {
    'magic-kingdom':             ["Mickey's Royal Friendship Faire", "Happily Ever After (Fireworks)", "Main Street Electrical Parade", "Mickey's PhilharMagic", "Move It! Shake It! MousekeDance It!"],
    'epcot':                     ["EPCOT Forever", "Harmonious", "Candlelight Processional (seasonal)", "The American Adventure", "Turtle Talk with Crush"],
    'hollywood-studios':         ["Fantasmic!", "Star Wars: A Galactic Spectacular", "Indiana Jones Epic Stunt Spectacular", "Beauty and the Beast Live on Stage", "Disney Junior Play & Dance"],
    'animal-kingdom':            ["Festival of the Lion King", "Finding Nemo: The Big Blue...and Beyond!", "UP! A Great Bird Adventure"],
    'universal-studios-florida': ["The Bourne Stuntacular", "Universal's Horror Make-Up Show"],
    'islands-of-adventure':      ["Poseidon's Fury"],
    'epic-universe':             ["How to Train Your Dragon Live Show", "Universal Monsters Live"],
  }
  const resortShows = [...new Set(parks.flatMap(p => PARK_SHOWS[p.id] || []))]

  // Hotels for active resort
  const hotels = getHotelsByResort(activeResortId)

  // Quick lookup: is a given parkId in the active resort?
  const isResortPark = (parkId) => parks.some(p => p.id === parkId)

  // Filter a list of parkIds to only those in the active resort
  const filterResortParkIds = (parkIds = []) => parkIds.filter(isResortPark)

  return {
    parks,
    allRides,
    mickeys,
    disneyFood,
    universalFood,
    resortFood,
    parkFood,
    activeFoodCategories,
    resortShows,
    hotels,
    datw,
    isResortPark,
    filterResortParkIds,
    activeResortId,
    isDisney,
    isUniversal,
  }
}
