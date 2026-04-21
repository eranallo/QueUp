import { useState, useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  DndContext, closestCenter,
  KeyboardSensor, PointerSensor,
  useSensor, useSensors,
} from '@dnd-kit/core'
import {
  SortableContext, sortableKeyboardCoordinates,
  useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import {
  loadTrip, saveTrip, makeDay, makeItem,
  getParkById, getAllParks, getResortParks, formatDate,
  arrayMove, ITEM_TYPE_CONFIG, DURATION_OPTIONS,
} from '../plannerUtils'
import { FOOD_DRINKS } from '../data'
import { HOTELS, getHotelsByResort } from '../hotelsData'
import { useApp } from '../App'
import { useResortData } from '../useResortData'
import { useLiveData } from '../context/LiveDataContext'
import { ParkHoursCompact } from './ParkHours'

// ─────────────────────────────────────────────────────────────
// BADGE CONFIG — maps item type + LL to a label and color
// ─────────────────────────────────────────────────────────────
function getBadge(item) {
  if (item.type === 'ride' && item.hasLL)
    return { label: '⚡ Lightning Lane', color: '#7c3aed', bg: '#ede9fe', textColor: '#5b21b6' }
  if (item.type === 'ride')
    return { label: '🎢 Ride', color: '#2563eb', bg: '#dbeafe', textColor: '#1d4ed8' }
  if (item.type === 'food')
    return { label: '🍽️ Dining', color: '#059669', bg: '#d1fae5', textColor: '#047857' }
  if (item.type === 'show')
    return { label: '🎭 Entertainment', color: '#7c3aed', bg: '#f3e8ff', textColor: '#6d28d9' }
  if (item.type === 'break')
    return { label: '☀️ Break', color: '#d97706', bg: '#fef3c7', textColor: '#b45309' }
  if (item.type === 'event')
    return { label: '🎉 Event', color: '#dc2626', bg: '#fee2e2', textColor: '#b91c1c' }
  if (item.type === 'resort')
    return { label: '🏨 Hotel', color: '#0891b2', bg: '#cffafe', textColor: '#0e7490' }
  return { label: '📌 Custom', color: '#4b5563', bg: '#f3f4f6', textColor: '#374151' }
}

// ─────────────────────────────────────────────────────────────
// PLAN CARD — Disney-app style activity card
// ─────────────────────────────────────────────────────────────
function PlanCard({ item, onUpdate, onDelete, accentColor }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 999 : 'auto',
  }

  const [expanded, setExpanded] = useState(false)
  const badge = getBadge(item)
  const dur   = DURATION_OPTIONS.find(d => d.value === item.duration)

  // Time display
  const timeLabel = item.type === 'ride' && item.hasLL
    ? 'Redeem Between'
    : item.type === 'food' ? 'Reservation Time'
    : item.type === 'show' ? 'Show Time'
    : 'Planned Time'

  const timeDisplay = item.time
    ? (() => {
        const [h, m] = item.time.split(':')
        const d = new Date(); d.setHours(+h, +m)
        const start = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
        if (item.hasLL && item.llTime) {
          const [lh, lm] = item.llTime.split(':')
          const dl = new Date(); dl.setHours(+lh, +lm)
          const end = dl.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
          return `${start} - ${end}`
        }
        return start
      })()
    : null

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`plan-card${item.done ? ' plan-card--done' : ''}${isDragging ? ' plan-card--dragging' : ''}`}
    >
      {/* Main row — always visible */}
      <div className="plan-card-main" onClick={() => setExpanded(v => !v)}>
        <div className="plan-card-left">
          {/* Type badge */}
          <div
            className="plan-card-badge"
            style={{ background: badge.bg, color: badge.textColor, borderColor: `${badge.color}33` }}
          >
            {item.done && <span style={{ marginRight: 4 }}>✓</span>}
            {badge.label}
          </div>

          {/* Activity name */}
          <div className="plan-card-name">{item.name}</div>

          {/* Time */}
          {timeDisplay ? (
            <div className="plan-card-time-block">
              <div className="plan-card-time-label">{timeLabel}</div>
              <div className="plan-card-time-value">{timeDisplay}</div>
            </div>
          ) : (
            <div className="plan-card-time-label" style={{ color: 'var(--text-muted)' }}>
              No time set · tap to edit
            </div>
          )}

          {dur && (
            <div className="plan-card-dur">Est. {dur.label}</div>
          )}
        </div>

        {/* Right side: emoji icon + drag handle */}
        <div className="plan-card-right">
          <div className="plan-card-icon">
            {ITEM_TYPE_CONFIG[item.type]?.emoji || '📌'}
          </div>
          {/* Subtle drag grip — visible on hover/long-press */}
          <div className="plan-card-grip" {...attributes} {...listeners} onClick={e => e.stopPropagation()}>
            ⠿
          </div>
        </div>
      </div>

      {/* Expanded edit panel */}
      {expanded && (
        <div className="plan-card-detail animate-float-up">
          {/* Time editor */}
          <div className="plan-detail-row">
            <label className="plan-detail-label">Time</label>
            <input
              className="plan-detail-input"
              type="time"
              value={item.time}
              onChange={e => onUpdate({ time: e.target.value })}
            />
          </div>

          {/* Duration */}
          <div className="plan-detail-row" style={{ alignItems: 'flex-start' }}>
            <label className="plan-detail-label">Duration</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {DURATION_OPTIONS.map(d => (
                <button
                  key={d.value}
                  className={`pic-dur-btn${item.duration === d.value ? ' active' : ''}`}
                  onClick={() => onUpdate({ duration: d.value })}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lightning Lane toggle (rides only) */}
          {item.type === 'ride' && (
            <div className="plan-detail-row">
              <label className="plan-detail-label">Lightning Lane</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  className={`pic-toggle${item.hasLL ? ' on' : ''}`}
                  onClick={() => onUpdate({ hasLL: !item.hasLL })}
                >
                  {item.hasLL ? '⚡ LL Active' : '⬤ No LL'}
                </button>
                {item.hasLL && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Return:</span>
                    <input
                      className="plan-detail-input"
                      type="time"
                      value={item.llTime}
                      onChange={e => onUpdate({ llTime: e.target.value })}
                      style={{ width: 110 }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="plan-detail-row" style={{ alignItems: 'flex-start' }}>
            <label className="plan-detail-label">Notes</label>
            <textarea
              className="day-notes"
              rows={2}
              value={item.notes}
              onChange={e => onUpdate({ notes: e.target.value })}
              placeholder="Add a note…"
              style={{ flex: 1 }}
            />
          </div>

          {/* Ride link */}
          {item.rideId && (
            <Link to={`/ride/${item.rideId}`} className="pic-ride-link">
              View ride info & trivia →
            </Link>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8, marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border-soft)' }}>
            <button
              className={`plan-action-btn${item.done ? ' done' : ''}`}
              onClick={() => onUpdate({ done: !item.done })}
            >
              {item.done ? '↩ Mark Undone' : '✓ Mark Done'}
            </button>
            <button
              className="plan-action-btn delete"
              onClick={() => { if (window.confirm(`Remove "${item.name}"?`)) onDelete() }}
            >
              🗑 Remove
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// PARK SHOWS (for Add modal)
// ─────────────────────────────────────────────────────────────
const PARK_SHOWS = {
  'magic-kingdom':             ["Mickey's Royal Friendship Faire","Happily Ever After (Fireworks)","Main Street Electrical Parade","Mickey's PhilharMagic","Move It! Shake It! MousekeDance It!"],
  'epcot':                     ["EPCOT Forever","Harmonious","Candlelight Processional (seasonal)","The American Adventure","Turtle Talk with Crush"],
  'hollywood-studios':         ["Fantasmic!","Star Wars: A Galactic Spectacular","Indiana Jones Epic Stunt Spectacular","Beauty and the Beast Live on Stage","Disney Junior Play & Dance"],
  'animal-kingdom':            ["Festival of the Lion King","Finding Nemo: The Big Blue...and Beyond!","UP! A Great Bird Adventure"],
  'universal-studios-florida': ["The Bourne Stuntacular","Universal's Horror Make-Up Show"],
  'islands-of-adventure':      ["Poseidon's Fury"],
  'epic-universe':             ["How to Train Your Dragon Live Show","Universal Monsters Live"],
}

const PARK_FOOD_CATEGORIES = {
  'magic-kingdom':             ['Magic Kingdom'],
  'epcot':                     ['EPCOT'],
  'hollywood-studios':         ['Hollywood Studios'],
  'animal-kingdom':            ['Animal Kingdom'],
  'universal-studios-florida': ['Wizarding World','Springfield'],
  'islands-of-adventure':      ['Wizarding World'],
  'epic-universe':             ['Epic Universe'],
}

// ─────────────────────────────────────────────────────────────
// ADD RIDE MODAL
// ─────────────────────────────────────────────────────────────
function AddRideModal({ parkIds, onAdd, onClose }) {
  const [search, setSearch]       = useState('')
  const [activePark, setActivePark] = useState(parkIds[0] || '')
  const [filter, setFilter]       = useState('all')
  const { getRideLive } = useLiveData()

  const park     = getParkById(activePark)
  const allRides = park ? park.lands.flatMap(l => l.rides) : []
  const visible  = allRides.filter(r => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false
    if (filter === 'mustdo' && !r.mustDo) return false
    if (filter === 'll'     && !r.lightningLane) return false
    return true
  })

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">Add Ride</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {parkIds.length > 1 && (
          <div style={{ display:'flex', gap:4, padding:'8px 16px', borderBottom:'1px solid var(--border)', overflowX:'auto' }}>
            {parkIds.map(id => {
              const p = getParkById(id)
              return p ? (
                <button key={id} className={`filter-pill${activePark===id?' on':''}`} onClick={() => setActivePark(id)}>
                  {p.emoji} {p.name.split(' ')[0]}
                </button>
              ) : null
            })}
          </div>
        )}

        <div className="modal-search-row">
          <input className="modal-search" placeholder="Search rides…" value={search}
            onChange={e => setSearch(e.target.value)}
            tabIndex={-1} onFocus={e => e.target.removeAttribute('tabindex')} />
        </div>

        <div className="modal-filters">
          <button className={`filter-pill${filter==='all'?' on':''}`}    onClick={() => setFilter('all')}>All</button>
          <button className={`filter-pill${filter==='mustdo'?' on':''}`} onClick={() => setFilter('mustdo')}>⭐ Must-Do</button>
          <button className={`filter-pill${filter==='ll'?' on':''}`}     onClick={() => setFilter('ll')}>⚡ LL</button>
        </div>

        <div className="modal-scroll-region">
          {park?.lands.map(land => {
            const rides = land.rides.filter(r => visible.includes(r))
            if (!rides.length) return null
            return (
              <div key={land.id}>
                <div className="modal-land-label">{land.name}</div>
                {rides.map(ride => {
                  const live = getRideLive(ride.name)
                  return (
                    <div key={ride.id} className="modal-ride-row"
                      onClick={() => { onAdd(makeItem('ride',{ rideId:ride.id, name:ride.name, hasLL:ride.lightningLane, duration:60 })); onClose() }}>
                      <div className="modal-ride-info">
                        <span className="modal-ride-name">{ride.name}</span>
                        <div className="modal-ride-badges">
                          {live?.status==='OPERATING' && live?.waitTime!=null && (
                            <span className="badge" style={{ color: live.waitTime<30?'var(--success)':live.waitTime<60?'var(--warning)':'var(--danger)' }}>⏱ {live.waitTime}m</span>
                          )}
                          {live?.status==='DOWN' && <span className="badge" style={{ color:'var(--danger)' }}>🔴 Down</span>}
                          {ride.mustDo && <span className="badge badge-mustdo">⭐</span>}
                          {ride.lightningLane && <span className="badge badge-ll">⚡ LL</span>}
                          {ride.heightRequirement && <span className="badge">📏 {ride.heightRequirement}"</span>}
                        </div>
                      </div>
                      <span className="modal-add-icon">+</span>
                    </div>
                  )
                })}
              </div>
            )
          })}
          {visible.length===0 && (
            <div className="empty-state" style={{ padding:24 }}>
              <div className="empty-icon">🔍</div>
              <div className="empty-text">No rides match</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// ADD CUSTOM MODAL (Food / Show / Break / Event / Hotel)
// ─────────────────────────────────────────────────────────────
function AddCustomModal({ onAdd, onClose, parkIds = [] }) {
  const [type,   setType]   = useState('food')
  const [name,   setName]   = useState('')
  const [time,   setTime]   = useState('')
  const [search, setSearch] = useState('')

  const cfg = ITEM_TYPE_CONFIG[type] || ITEM_TYPE_CONFIG.event

  const { resortFood } = useResortData()
  const relevantFoodCats = [...new Set(parkIds.flatMap(id => PARK_FOOD_CATEGORIES[id] || []))]
  const allFoodItems = resortFood.filter(f =>
    relevantFoodCats.length === 0 || relevantFoodCats.includes(f.category)
  )

  const filteredFood = search.trim()
    ? allFoodItems.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.location.toLowerCase().includes(search.toLowerCase()))
    : allFoodItems

  const allShows     = [...new Set(parkIds.flatMap(id => PARK_SHOWS[id] || []))]
  const filteredShows = search.trim() ? allShows.filter(s => s.toLowerCase().includes(search.toLowerCase())) : allShows

  const hasList = type === 'food' || type === 'show'

  const FoodList = () => {
    const groupCats = relevantFoodCats.length > 0
      ? relevantFoodCats
      : [...new Set(allFoodItems.map(f => f.category))]

    if (search.trim()) {
      return filteredFood.length === 0
        ? <div className="empty-state" style={{ padding:24 }}><div className="empty-icon">🍽️</div><div className="empty-text">No food items found</div></div>
        : filteredFood.map(food => (
            <div key={food.id} className="modal-ride-row"
              onClick={() => { onAdd(makeItem('food',{ name:food.name, duration:45, notes:food.location })); onClose() }}>
              <div className="modal-ride-info">
                <span className="modal-ride-name">{food.name}</span>
                <div className="modal-ride-badges">
                  <span className="badge" style={{ color:'var(--text-muted)', fontSize:'0.65rem' }}>{food.location}</span>
                  {food.mustTry && <span className="badge badge-mustdo">⭐</span>}
                  <span className="badge" style={{ color:'var(--accent)' }}>{food.price}</span>
                </div>
              </div>
              <span className="modal-add-icon">+</span>
            </div>
          ))
    }
    return groupCats.map(cat => {
      const items = allFoodItems.filter(f => f.category === cat)
      if (!items.length) return null
      return (
        <div key={cat}>
          <div className="modal-land-label">{cat}</div>
          {items.map(food => (
            <div key={food.id} className="modal-ride-row"
              onClick={() => { onAdd(makeItem('food',{ name:food.name, duration:45, notes:food.location })); onClose() }}>
              <div className="modal-ride-info">
                <span className="modal-ride-name">{food.name}</span>
                <div className="modal-ride-badges">
                  <span className="badge" style={{ color:'var(--text-muted)', fontSize:'0.65rem' }}>{food.location}</span>
                  {food.mustTry && <span className="badge badge-mustdo">⭐</span>}
                  <span className="badge" style={{ color:'var(--accent)' }}>{food.price}</span>
                </div>
              </div>
              <span className="modal-add-icon">+</span>
            </div>
          ))}
        </div>
      )
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" style={{ display:'flex', flexDirection:'column' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ flexShrink:0 }}>
          <div className="modal-title">Add {cfg.label}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)', flexShrink:0 }}>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {Object.entries(ITEM_TYPE_CONFIG).filter(([k]) => k !== 'ride').map(([key, c]) => (
              <button key={key} className={`filter-pill${type===key?' on':''}`}
                onClick={() => { setType(key); setSearch(''); setName('') }}>
                {c.emoji} {c.label}
              </button>
            ))}
          </div>
        </div>

        {hasList && (
          <div className="modal-search-row" style={{ flexShrink:0 }}>
            <input className="modal-search"
              placeholder={type==='food' ? 'Search food & drinks…' : 'Search shows…'}
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        )}

        {hasList && (
          <div style={{ flex:1, overflowY:'scroll', minHeight:0, WebkitOverflowScrolling:'touch' }}>
            {type === 'food' && <FoodList />}
            {type === 'show' && (
              filteredShows.length > 0
                ? filteredShows.map(show => (
                    <div key={show} className="modal-ride-row"
                      onClick={() => { onAdd(makeItem('show',{ name:show, duration:45 })); onClose() }}>
                      <div className="modal-ride-info"><span className="modal-ride-name">🎭 {show}</span></div>
                      <span className="modal-add-icon">+</span>
                    </div>
                  ))
                : <div className="empty-state" style={{ padding:24 }}><div className="empty-icon">🎭</div><div className="empty-text">No shows for selected parks</div></div>
            )}
          </div>
        )}

        <div style={{ flexShrink:0, padding:'14px 16px', borderTop:'1px solid var(--border)', background:'var(--bg-dark)' }}>
          {hasList && (
            <div style={{ fontSize:'0.7rem', color:'var(--text-muted)', fontWeight:700, marginBottom:8, textTransform:'uppercase', letterSpacing:'0.07em' }}>
              Or enter custom {cfg.label.toLowerCase()}:
            </div>
          )}
          {!hasList && (
            <div style={{ fontSize:'0.7rem', color:'var(--text-muted)', fontWeight:700, marginBottom:8, textTransform:'uppercase', letterSpacing:'0.07em' }}>
              {cfg.emoji} {cfg.label}
            </div>
          )}
          <div style={{ display:'flex', gap:8 }}>
            <input className="modal-search" style={{ flex:1 }}
              placeholder={
                type==='food'  ? 'e.g. Lunch at Sci-Fi Dine-In…' :
                type==='show'  ? 'e.g. Festival of the Lion King' :
                type==='break' ? 'e.g. Pool break, rest at hotel' :
                type==='event' ? 'e.g. Fireworks at 9pm' :
                                 'e.g. Hotel check-in'
              }
              value={name} onChange={e => setName(e.target.value)} />
            {!hasList && (
              <input className="modal-search" type="time" value={time}
                onChange={e => setTime(e.target.value)} style={{ width:110, flexShrink:0 }} />
            )}
            <button className="btn-primary ridden-state"
              style={{ border:'none', whiteSpace:'nowrap', padding:'10px 16px', borderRadius:'var(--r-md)', opacity:name.trim()?1:0.4 }}
              onClick={() => { if(!name.trim()) return; onAdd(makeItem(type,{ name:name.trim(), time, duration:type==='break'?30:60 })); onClose() }}
              disabled={!name.trim()}>
              Add ＋
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// HOTEL SECTION (per-day)
// ─────────────────────────────────────────────────────────────
const HOTEL_SUGGESTIONS = {
  'disney-world':      ['Grand Floridian','Polynesian','Contemporary','Wilderness Lodge','Yacht Club','Beach Club','BoardWalk','Pop Century','Art of Animation','All-Star Movies','Saratoga Springs','Old Key West','Animal Kingdom Lodge','Coronado Springs','Caribbean Beach'],
  'universal-orlando': ['Hard Rock Hotel','Sapphire Falls','Royal Pacific','Cabana Bay','Aventura Hotel','Endless Summer','Stella Nova','Terra Luna'],
}

function HotelSection({ day, onUpdateDay, activeResortId }) {
  const [picking,   setPicking]   = useState(false)
  const [search,    setSearch]    = useState('')
  const [editingId, setEditingId] = useState(null)

  const hotels     = day.hotels || []
  const allHotels  = getHotelsByResort(activeResortId)
  const otherHotels = activeResortId ? allHotels : HOTELS
  const tiers       = [...new Set(otherHotels.map(h => h.tier))]
  const filtered    = search.trim()
    ? otherHotels.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.shortName.toLowerCase().includes(search.toLowerCase()))
    : otherHotels

  const addHotel = (hotel) => {
    const entry = { id:`h-${Date.now()}`, hotelId:hotel.id, name:hotel.shortName, emoji:hotel.emoji, checkInTime:'', checkOutTime:'' }
    onUpdateDay({ hotels:[...hotels, entry] })
    setPicking(false); setSearch(''); setEditingId(entry.id)
  }
  const removeHotel = (id) => { onUpdateDay({ hotels:hotels.filter(h => h.id!==id) }); if(editingId===id) setEditingId(null) }
  const updateHotelTimes = (id, patch) => onUpdateDay({ hotels:hotels.map(h => h.id===id ? {...h,...patch} : h) })

  return (
    <div style={{ marginTop:12 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
        <span className="plan-section-label">🏨 Hotel / Resort</span>
        {!picking && (
          <button className="hotel-add-trigger" onClick={() => { setPicking(true); setEditingId(null) }}>+ Add Hotel</button>
        )}
        {picking && (
          <button className="hotel-add-trigger" style={{ color:'var(--danger)' }} onClick={() => { setPicking(false); setSearch('') }}>✕ Cancel</button>
        )}
      </div>

      {hotels.map(entry => (
        <div key={entry.id} className="hotel-entry-v2">
          <div className="hotel-entry-main" onClick={() => setEditingId(editingId===entry.id ? null : entry.id)}>
            <span className="hotel-entry-emoji">{entry.emoji}</span>
            <div className="hotel-entry-info">
              <div className="hotel-entry-name">{entry.name}</div>
              <div className="hotel-entry-times">
                {entry.checkInTime  && <span className="hotel-time-chip check-in">🔑 In {entry.checkInTime}</span>}
                {entry.checkOutTime && <span className="hotel-time-chip check-out">🧳 Out {entry.checkOutTime}</span>}
                {!entry.checkInTime && !entry.checkOutTime && <span style={{ fontSize:'0.72rem', color:'var(--text-muted)' }}>Tap to set times</span>}
              </div>
            </div>
            <div style={{ display:'flex', gap:8, alignItems:'center', flexShrink:0 }}>
              {entry.hotelId && (
                <Link to={`/hotel/${entry.hotelId}`} className="hotel-info-link" onClick={e => e.stopPropagation()}>ℹ️</Link>
              )}
              <button className="hotel-remove" onClick={e => { e.stopPropagation(); removeHotel(entry.id) }}>✕</button>
            </div>
          </div>
          {editingId===entry.id && (
            <div className="hotel-time-editor animate-float-up">
              <div className="hotel-time-row">
                <label className="pic-label">Check-in</label>
                <input className="pic-time" type="time" value={entry.checkInTime}
                  onChange={e => updateHotelTimes(entry.id,{ checkInTime:e.target.value })} style={{ width:110 }} />
                {entry.checkInTime && <button onClick={() => updateHotelTimes(entry.id,{ checkInTime:'' })} style={{ background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer' }}>✕</button>}
              </div>
              <div className="hotel-time-row">
                <label className="pic-label">Check-out</label>
                <input className="pic-time" type="time" value={entry.checkOutTime}
                  onChange={e => updateHotelTimes(entry.id,{ checkOutTime:e.target.value })} style={{ width:110 }} />
                {entry.checkOutTime && <button onClick={() => updateHotelTimes(entry.id,{ checkOutTime:'' })} style={{ background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer' }}>✕</button>}
              </div>
              {entry.hotelId && (
                <Link to={`/hotel/${entry.hotelId}`} className="pic-ride-link" style={{ display:'block', marginTop:6 }}>
                  View {entry.name} details & trivia →
                </Link>
              )}
            </div>
          )}
        </div>
      ))}

      {hotels.length===0 && !picking && (
        <div style={{ fontSize:'0.78rem', color:'var(--text-muted)', fontStyle:'italic' }}>
          No hotel set — tap + to add
        </div>
      )}

      {picking && (
        <div className="hotel-picker animate-float-up">
          <input className="day-notes"
            style={{ width:'100%', padding:'9px 12px', marginBottom:8, borderRadius:'var(--r-md)', boxSizing:'border-box' }}
            placeholder="Search hotels…" value={search}
            onChange={e => setSearch(e.target.value)}
            tabIndex={-1} onFocus={e => e.target.removeAttribute('tabindex')} />
          <div className="hotel-picker-list">
            {search.trim()
              ? filtered.map(h => <HotelPickerRow key={h.id} hotel={h} onSelect={addHotel} />)
              : tiers.map(tier => {
                  const th = otherHotels.filter(h => h.tier===tier)
                  return (
                    <div key={tier}>
                      <div className="modal-land-label">{tier}</div>
                      {th.map(h => <HotelPickerRow key={h.id} hotel={h} onSelect={addHotel} />)}
                    </div>
                  )
                })
            }
            {filtered.length===0 && <div style={{ padding:'12px 16px', color:'var(--text-muted)', fontSize:'0.85rem' }}>No hotels match</div>}
          </div>
        </div>
      )}
    </div>
  )
}

function HotelPickerRow({ hotel, onSelect }) {
  const TIER_COLOR = { Deluxe:'#f0b429', Moderate:'#60a5fa', Value:'#34d399', Premier:'#c084fc', Preferred:'#f97316' }
  const color = TIER_COLOR[hotel.tier] || 'var(--accent)'
  return (
    <div className="hotel-picker-row" onClick={() => onSelect(hotel)}>
      <span style={{ fontSize:'1.2rem', flexShrink:0 }}>{hotel.emoji}</span>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontWeight:700, fontSize:'0.88rem', color:'var(--text-primary)' }}>{hotel.shortName}</div>
        <div style={{ display:'flex', gap:6, marginTop:3, flexWrap:'wrap' }}>
          <span style={{ fontSize:'0.68rem', fontWeight:800, color, background:`${color}18`, border:`1px solid ${color}44`, padding:'1px 7px', borderRadius:20 }}>{hotel.tier}</span>
          <span style={{ fontSize:'0.68rem', color:'var(--text-muted)', paddingTop:1 }}>{hotel.priceRange} · {hotel.location}</span>
        </div>
      </div>
      <span style={{ color:'var(--accent)', fontWeight:900, fontSize:'1.1rem', flexShrink:0 }}>+</span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// PARK SECTION HEADER (Disney-app style)
// ─────────────────────────────────────────────────────────────
function ParkSectionHeader({ park, day, onUpdateDay, activeResortId }) {
  const [editingDay, setEditingDay] = useState(false)
  return (
    <div className="park-section-header" style={{ borderColor: `${park.accentColor}44` }}>
      <div className="psh-top">
        <div className="psh-left">
          <div className="psh-park-name">{park.name}</div>
          <div className="psh-hours">
            <ParkHoursCompact parkId={park.id} accentColor={park.accentColor} />
          </div>
        </div>
        <div className="psh-emoji">{park.emoji}</div>
      </div>
      <div className="psh-actions">
        <Link to={`/map/${park.id}`} className="psh-action-btn">
          📍 See on Map
        </Link>
        <button className="psh-action-btn" onClick={() => setEditingDay(v => !v)}>
          ✏️ {editingDay ? 'Done' : 'Edit Day'}
        </button>
      </div>

      {editingDay && (
        <div className="psh-edit-panel animate-float-up">
          {/* Date */}
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
            <label className="plan-section-label" style={{ minWidth:40 }}>Date</label>
            <input className="plan-detail-input" type="date" value={day.date}
              onChange={e => onUpdateDay({ date:e.target.value })} />
          </div>
          {/* Notes */}
          <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:10 }}>
            <label className="plan-section-label" style={{ minWidth:40, paddingTop:4 }}>Notes</label>
            <textarea className="day-notes" rows={2} style={{ flex:1 }} value={day.notes}
              onChange={e => onUpdateDay({ notes:e.target.value })}
              placeholder="ADR times, reminders…" />
          </div>
          {/* Hotel */}
          <HotelSection day={day} onUpdateDay={onUpdateDay} activeResortId={activeResortId} />
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// DAY VIEW
// ─────────────────────────────────────────────────────────────
function DayView({ day, dayIndex, onUpdateDay, accentColor, activeResortId }) {
  const [showRidePicker,  setShowRidePicker]  = useState(false)
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [showParkPicker,  setShowParkPicker]  = useState(false)

  const allParks   = getResortParks(activeResortId)
  const parks      = (day.parkIds || (day.parkId ? [day.parkId] : [])).map(getParkById).filter(Boolean)
  const primaryPark = parks[0]

  const sensors = useSensors(
    useSensor(PointerSensor,   { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor,  { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return
    const from = day.items.findIndex(i => i.id === active.id)
    const to   = day.items.findIndex(i => i.id === over.id)
    onUpdateDay({ items: arrayMove(day.items, from, to) })
  }

  const updateItem = (itemId, patch) =>
    onUpdateDay({ items: day.items.map(i => i.id === itemId ? { ...i, ...patch } : i) })
  const deleteItem = (itemId) =>
    onUpdateDay({ items: day.items.filter(i => i.id !== itemId) })
  const addItem = (item) =>
    onUpdateDay({ items: [...day.items, item] })

  const togglePark = (parkId) => {
    const current = day.parkIds || (day.parkId ? [day.parkId] : [])
    const next = current.includes(parkId) ? current.filter(p => p !== parkId) : [...current, parkId]
    onUpdateDay({ parkIds: next, parkId: next[0] || '' })
  }

  const doneCount = day.items.filter(i => i.done).length

  return (
    <div className="day-view animate-fade-in">

      {/* Park selector (shown if no parks set yet) */}
      {parks.length === 0 ? (
        <div className="no-park-prompt">
          <div style={{ fontSize:'2rem', marginBottom:8 }}>🏰</div>
          <div style={{ fontWeight:700, marginBottom:4 }}>Which park today?</div>
          <div style={{ fontSize:'0.82rem', color:'var(--text-muted)', marginBottom:16 }}>Select one or more parks to get started</div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center' }}>
            {allParks.map(p => (
              <button key={p.id} className="filter-pill" style={{ padding:'8px 16px', fontSize:'0.88rem' }}
                onClick={() => togglePark(p.id)}>
                {p.emoji} {p.name.split(' ').slice(-1)[0]}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Park section headers */}
          {parks.map(park => (
            <ParkSectionHeader
              key={park.id}
              park={park}
              day={day}
              onUpdateDay={onUpdateDay}
              activeResortId={activeResortId}
            />
          ))}

          {/* Change parks pill */}
          <div style={{ marginBottom:16 }}>
            <button className="plan-change-parks-btn" onClick={() => setShowParkPicker(v => !v)}>
              {showParkPicker ? '✕ Done' : `🏳️ Change Parks`}
            </button>
            {showParkPicker && (
              <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:8 }}>
                {allParks.map(p => {
                  const selected = (day.parkIds || (day.parkId ? [day.parkId] : [])).includes(p.id)
                  return (
                    <button key={p.id}
                      className={`filter-pill${selected ? ' on' : ''}`}
                      style={selected ? { borderColor:p.accentColor, color:p.accentColor, background:`${p.accentColor}18` } : {}}
                      onClick={() => togglePark(p.id)}>
                      {p.emoji} {p.name.split(' ').slice(-1)[0]}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Progress bar */}
          {day.items.length > 0 && (
            <div style={{ marginBottom:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.72rem', color:'var(--text-muted)', fontWeight:700, marginBottom:4 }}>
                <span>Day Progress</span>
                <span>{doneCount} / {day.items.length} done</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width:`${day.items.length ? (doneCount/day.items.length)*100 : 0}%`, background:primaryPark?.accentColor || accentColor }} />
              </div>
            </div>
          )}

          {/* Items list */}
          {day.items.length === 0 ? (
            <div className="day-empty" style={{ marginBottom:80 }}>
              <div style={{ fontSize:'2.5rem', marginBottom:8 }}>📋</div>
              <div style={{ fontWeight:700 }}>No activities planned yet</div>
              <div style={{ fontSize:'0.82rem', color:'var(--text-muted)', marginTop:4 }}>
                Tap "+ Add Plans" to add rides, dining, and more
              </div>
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={day.items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:100 }}>
                  {day.items.map(item => (
                    <PlanCard key={item.id} item={item}
                      accentColor={primaryPark?.accentColor || accentColor}
                      onUpdate={patch => updateItem(item.id, patch)}
                      onDelete={() => deleteItem(item.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </>
      )}

      {/* Modals */}
      {showRidePicker && parks.length > 0 && (
        <AddRideModal parkIds={parks.map(p => p.id)} onAdd={addItem} onClose={() => setShowRidePicker(false)} />
      )}
      {showCustomModal && (
        <AddCustomModal onAdd={addItem} onClose={() => setShowCustomModal(false)} parkIds={parks.map(p => p.id)} />
      )}

      {/* Floating "+ Add Plans" button */}
      <div className="plan-fab-area">
        <button className="plan-fab-secondary" onClick={() => setShowCustomModal(true)}>
          🍽️ Dining / Show / Break
        </button>
        <button
          className="plan-fab"
          style={{ background: primaryPark?.accentColor || accentColor }}
          onClick={() => setShowRidePicker(true)}
          disabled={parks.length === 0}
        >
          + Add Plans
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// TRIP SETUP (collapsible)
// ─────────────────────────────────────────────────────────────
function TripSetup({ trip, onUpdate }) {
  const [open, setOpen] = useState(!trip.checkIn)
  return (
    <div className="trip-setup">
      <button className="trip-setup-toggle" onClick={() => setOpen(v => !v)}>
        <div className="trip-setup-summary">
          <span>📅</span>
          <span style={{ fontWeight:700 }}>
            {trip.checkIn && trip.checkOut
              ? `${formatDate(trip.checkIn)} → ${formatDate(trip.checkOut)}`
              : 'Set trip dates & notes'}
          </span>
          {trip.checkIn && trip.checkOut && (() => {
            const d = Math.round((new Date(trip.checkOut) - new Date(trip.checkIn)) / 86400000)
            return d > 0 ? <span style={{ color:'var(--text-muted)', fontSize:'0.82rem' }}>· {d} night{d!==1?'s':''}</span> : null
          })()}
        </div>
        <span style={{ color:'var(--text-muted)' }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="trip-setup-body animate-float-up">
          <div className="trip-field-row">
            <label className="trip-label">Check In</label>
            <input className="trip-input" type="date" value={trip.checkIn}
              onChange={e => onUpdate({ checkIn:e.target.value })} style={{ maxWidth:200 }} />
          </div>
          <div className="trip-field-row">
            <label className="trip-label">Check Out</label>
            <input className="trip-input" type="date" value={trip.checkOut}
              onChange={e => onUpdate({ checkOut:e.target.value })} style={{ maxWidth:200 }} />
          </div>
          <div className="trip-field-row" style={{ alignItems:'flex-start' }}>
            <label className="trip-label" style={{ paddingTop:6 }}>Notes</label>
            <textarea className="trip-input" rows={3} value={trip.notes}
              onChange={e => onUpdate({ notes:e.target.value })}
              placeholder="ADRs, special events, packing list…" />
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────
export default function DayPlanner() {
  const { activeResort, isDisney, activeResortId } = useApp()
  const [trip,      setTrip]      = useState(loadTrip)
  const [activeDay, setActiveDay] = useState(0)

  useEffect(() => { saveTrip(trip) }, [trip])

  const updateTrip = useCallback((patch) => setTrip(t => ({ ...t, ...patch })), [])
  const updateDay  = useCallback((dayId, patch) =>
    setTrip(t => ({ ...t, days: t.days.map(d => d.id === dayId ? { ...d, ...patch } : d) })), [])

  const addDay = () => {
    const newDay = makeDay()
    setTrip(t => ({ ...t, days: [...t.days, newDay] }))
    setActiveDay(trip.days.length)
  }

  const deleteDay = (idx) => {
    if (!window.confirm('Remove this day?')) return
    setTrip(t => ({ ...t, days: t.days.filter((_,i) => i!==idx) }))
    setActiveDay(d => Math.max(0, d >= idx ? d - 1 : d))
  }

  const accentColor = isDisney ? '#f0b429' : '#ff6b35'
  const day = trip.days[activeDay]

  return (
    <div className="planner-page animate-fade-in">

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
        <h1 className="page-title" style={{ marginBottom:0 }}>My Plans</h1>
        <TripSetup trip={trip} onUpdate={updateTrip} />
      </div>

      {/* Date pill tabs — Disney app style */}
      <div className="mp-date-bar">
        {trip.days.map((d, i) => {
          const parks  = (d.parkIds || (d.parkId ? [d.parkId] : [])).map(getParkById).filter(Boolean)
          const label  = d.date
            ? new Date(d.date + 'T12:00:00').toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' })
            : `Day ${i + 1}`
          return (
            <button key={d.id}
              className={`mp-date-pill${activeDay === i ? ' active' : ''}`}
              style={activeDay === i ? { background: parks[0]?.accentColor || accentColor, borderColor: parks[0]?.accentColor || accentColor } : {}}
              onClick={() => setActiveDay(i)}
            >
              <span>{label}</span>
              <button className="mp-date-delete" onClick={e => { e.stopPropagation(); deleteDay(i) }}>×</button>
            </button>
          )
        })}
        <button className="mp-date-pill mp-date-add" onClick={addDay}>+ Add a Day</button>
      </div>

      {/* Content */}
      {trip.days.length === 0 ? (
        <div className="planner-empty">
          <div style={{ fontSize:'3rem', marginBottom:16 }}>🗺️</div>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', marginBottom:8 }}>No days planned yet</h2>
          <p style={{ color:'var(--text-secondary)', marginBottom:24, maxWidth:360 }}>
            Start building your perfect itinerary.
          </p>
          <button className="btn-primary ridden-state"
            style={{ background:accentColor, border:'none' }} onClick={addDay}>
            + Add Your First Day
          </button>
        </div>
      ) : day ? (
        <DayView key={day.id} day={day} dayIndex={activeDay}
          onUpdateDay={patch => updateDay(day.id, patch)}
          accentColor={accentColor}
          activeResortId={activeResortId}
        />
      ) : null}
    </div>
  )
}
