import { useState, useCallback, useEffect } from 'react'
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
  getParkById, getAllParks, formatDate,
  arrayMove, ITEM_TYPE_CONFIG, DURATION_OPTIONS,
} from '../plannerUtils'
import { FOOD_DRINKS } from '../data'
import { useApp } from '../App'
import { useLiveData } from '../context/LiveDataContext'

// ── Sortable Item ────────────────────────────────────────────
function SortableItem({ item, onUpdate, onDelete, accentColor }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1, zIndex: isDragging ? 999 : 'auto' }

  const [expanded, setExpanded] = useState(false)
  const cfg = ITEM_TYPE_CONFIG[item.type] || ITEM_TYPE_CONFIG.event
  const dur = DURATION_OPTIONS.find(d => d.value === item.duration)

  return (
    <div ref={setNodeRef} style={style} className={`planner-item-card${item.done ? ' done' : ''}${isDragging ? ' dragging' : ''}`}>
      <div className="pic-row">
        <div className="pic-drag" {...attributes} {...listeners}>⠿</div>
        <span className="pic-type-icon" style={{ color: 'var(--accent)' }}>{cfg.emoji}</span>
        <input className="pic-time" type="time" value={item.time} onChange={e => onUpdate({ time: e.target.value })} title="Planned time" />
        <div className="pic-name-wrap">
          <span className="pic-name">{item.name}</span>
          {item.hasLL && <span className="pic-ll-badge">⚡ {item.llTime || 'LL'}</span>}
          {dur && <span className="pic-dur-label">{dur.label}</span>}
        </div>
        <button className={`pic-done-btn${item.done ? ' is-done' : ''}`} onClick={() => onUpdate({ done: !item.done })}>{item.done ? '✓' : '○'}</button>
        <button className="pic-expand-btn" onClick={() => setExpanded(v => !v)}>{expanded ? '▲' : '▼'}</button>
        <button className="pic-delete-btn" onClick={() => { if (window.confirm(`Remove "${item.name}"?`)) onDelete() }}>✕</button>
      </div>

      {expanded && (
        <div className="pic-detail">
          {/* Duration */}
          <div className="pic-detail-row">
            <label className="pic-label">Est. Time</label>
            <div className="pic-duration-row">
              {DURATION_OPTIONS.map(d => (
                <button key={d.value} className={`pic-dur-btn${item.duration === d.value ? ' active' : ''}`}
                  onClick={() => onUpdate({ duration: d.value })}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* LL for rides */}
          {item.type === 'ride' && (
            <div className="pic-detail-row">
              <label className="pic-label">Lightning Lane</label>
              <div className="pic-ll-row">
                <button className={`pic-toggle${item.hasLL ? ' on' : ''}`} onClick={() => onUpdate({ hasLL: !item.hasLL })}>
                  {item.hasLL ? '⚡ LL Active' : '⬤ No LL'}
                </button>
                {item.hasLL && (
                  <input className="pic-ll-time" type="time" value={item.llTime}
                    onChange={e => onUpdate({ llTime: e.target.value })} placeholder="LL return time" />
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="pic-detail-row">
            <label className="pic-label">Notes</label>
            <textarea className="pic-notes" rows={2} value={item.notes}
              onChange={e => onUpdate({ notes: e.target.value })}
              placeholder="Notes, reminders…" />
          </div>

          {item.rideId && (
            <div className="pic-detail-row">
              <Link to={`/ride/${item.rideId}`} className="pic-ride-link">View ride info & trivia →</Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Add Ride Modal ───────────────────────────────────────────
function AddRideModal({ parkIds, onAdd, onClose }) {
  const [search, setSearch] = useState('')
  const [activePark, setActivePark] = useState(parkIds[0] || '')
  const [filter, setFilter] = useState('all')
  const { getRideLive } = useLiveData()

  const park = getParkById(activePark)
  const allRides = park ? park.lands.flatMap(l => l.rides) : []
  const visible = allRides.filter(r => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false
    if (filter === 'mustdo' && !r.mustDo) return false
    if (filter === 'll' && !r.lightningLane) return false
    return true
  })

  // Autocomplete suggestions
  const suggestions = search.length >= 1 ? allRides.filter(r => r.name.toLowerCase().includes(search.toLowerCase())) : []

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">Add Ride</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Park tabs if multiple parks */}
        {parkIds.length > 1 && (
          <div style={{ display: 'flex', gap: 4, padding: '8px 16px', borderBottom: '1px solid var(--border)', overflowX: 'auto' }}>
            {parkIds.map(id => {
              const p = getParkById(id)
              return p ? (
                <button key={id} className={`filter-pill${activePark === id ? ' on' : ''}`} onClick={() => setActivePark(id)}>
                  {p.emoji} {p.name.split(' ')[0]}
                </button>
              ) : null
            })}
          </div>
        )}

        <div className="modal-search-row" style={{ position: 'relative' }}>
          <input className="modal-search" placeholder="Search rides…" value={search}
            onChange={e => setSearch(e.target.value)} autoFocus />
          {/* Dropdown suggestions */}
          {suggestions.length > 0 && search.length > 0 && (
            <div className="search-dropdown" style={{ top: '100%', margin: '4px 0 0' }}>
              {suggestions.map(ride => {
                const live = getRideLive(ride.name)
                return (
                  <div key={ride.id} className="search-dropdown-item"
                    onMouseDown={() => {
                      onAdd(makeItem('ride', { rideId: ride.id, name: ride.name, hasLL: ride.lightningLane, duration: 60 }))
                      onClose()
                    }}>
                    <div className="sddi-name">{ride.name}</div>
                    <div className="sddi-badges">
                      {live?.status === 'OPERATING' && live?.waitTime != null && (
                        <span className="badge" style={{ color: 'var(--success)' }}>⏱ {live.waitTime}m</span>
                      )}
                      {live?.status === 'DOWN' && <span className="badge" style={{ color: 'var(--danger)' }}>🔴 Down</span>}
                      {ride.mustDo && <span className="badge badge-mustdo">⭐</span>}
                      {ride.lightningLane && <span className="badge badge-ll">⚡</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="modal-filters">
          <button className={`filter-pill${filter==='all'?'  on':''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`filter-pill${filter==='mustdo'?' on':''}`} onClick={() => setFilter('mustdo')}>⭐ Must-Do</button>
          <button className={`filter-pill${filter==='ll'?' on':''}`} onClick={() => setFilter('ll')}>⚡ LL</button>
        </div>

        <div className="modal-ride-list">
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
                      onClick={() => { onAdd(makeItem('ride', { rideId: ride.id, name: ride.name, hasLL: ride.lightningLane, duration: 60 })); onClose() }}>
                      <div className="modal-ride-info">
                        <span className="modal-ride-name">{ride.name}</span>
                        <div className="modal-ride-badges">
                          {live?.status === 'OPERATING' && live?.waitTime != null && (
                            <span className="badge" style={{ color: live.waitTime < 30 ? 'var(--success)' : live.waitTime < 60 ? 'var(--warning)' : 'var(--danger)' }}>⏱ {live.waitTime}m</span>
                          )}
                          {live?.status === 'DOWN' && <span className="badge" style={{ color: 'var(--danger)' }}>🔴 Down</span>}
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
          {visible.length === 0 && (
            <div className="empty-state" style={{ padding: 24 }}>
              <div className="empty-icon">🔍</div>
              <div className="empty-text">No rides match</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Map park IDs → food categories in the data
const PARK_FOOD_CATEGORIES = {
  'magic-kingdom':             ['Magic Kingdom'],
  'epcot':                     ['EPCOT'],
  'hollywood-studios':         ['Hollywood Studios'],
  'animal-kingdom':            ['Animal Kingdom'],
  'universal-studios-florida': ['Wizarding World', 'Springfield'],
  'islands-of-adventure':      ['Wizarding World'],
  'epic-universe':             ['Epic Universe'],
}

// ── Add Custom Modal ─────────────────────────────────────────
function AddCustomModal({ onAdd, onClose, parkIds = [] }) {
  const [type,   setType]   = useState('food')
  const [name,   setName]   = useState('')
  const [time,   setTime]   = useState('')
  const [search, setSearch] = useState('')

  const cfg = ITEM_TYPE_CONFIG[type] || ITEM_TYPE_CONFIG.event

  // Build food list for selected parks
  const relevantCategories = [...new Set(
    parkIds.flatMap(id => PARK_FOOD_CATEGORIES[id] || [])
  )]
  const allFoodItems = [
    ...(FOOD_DRINKS.disneyWorldFood || []),
    ...(FOOD_DRINKS.universalFood   || []),
  ].filter(f => relevantCategories.length === 0 || relevantCategories.includes(f.category))

  const filteredFood = search.trim()
    ? allFoodItems.filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.location.toLowerCase().includes(search.toLowerCase())
      )
    : allFoodItems

  const isFood = type === 'food'

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" style={{ maxHeight: '88vh' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">Add {cfg.label}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Type selector */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {Object.entries(ITEM_TYPE_CONFIG).filter(([k]) => k !== 'ride').map(([key, c]) => (
              <button
                key={key}
                className={`filter-pill${type === key ? ' on' : ''}`}
                onClick={() => { setType(key); setSearch(''); setName('') }}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Food picker — shown when type is food */}
        {isFood && (
          <>
            <div className="modal-search-row" style={{ flexShrink: 0 }}>
              <input
                className="modal-search"
                placeholder="Search food & drinks…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="modal-ride-list" style={{ flex: 1, minHeight: 0 }}>
              {/* Grouped by park/category */}
              {(search.trim() ? ['Search Results'] : relevantCategories.length > 0 ? relevantCategories : ['All Items']).map(cat => {
                const items = search.trim()
                  ? filteredFood
                  : allFoodItems.filter(f => f.category === cat)
                if (!items.length) return null
                return (
                  <div key={cat}>
                    {!search.trim() && <div className="modal-land-label">{cat}</div>}
                    {items.map(food => (
                      <div
                        key={food.id}
                        className="modal-ride-row"
                        onClick={() => {
                          onAdd(makeItem('food', { name: food.name, duration: 45, notes: food.location }))
                          onClose()
                        }}
                      >
                        <div className="modal-ride-info">
                          <span className="modal-ride-name">{food.name}</span>
                          <div className="modal-ride-badges">
                            <span className="badge" style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>{food.location}</span>
                            {food.mustTry && <span className="badge badge-mustdo">⭐ Must Try</span>}
                            <span className="badge" style={{ color: 'var(--accent)' }}>{food.price}</span>
                          </div>
                        </div>
                        <span className="modal-add-icon">+</span>
                      </div>
                    ))}
                  </div>
                )
              })}

              {filteredFood.length === 0 && (
                <div className="empty-state" style={{ padding: 24 }}>
                  <div className="empty-icon">🍽️</div>
                  <div className="empty-text">No food items found</div>
                </div>
              )}

              {/* Custom entry option always at bottom */}
              <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Or enter a custom food / drink:
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    className="modal-search"
                    placeholder="e.g. Lunch at Sci-Fi Dine-In…"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button
                    className="btn-primary ridden-state"
                    style={{ border: 'none', whiteSpace: 'nowrap', padding: '10px 16px', borderRadius: 'var(--r-md)' }}
                    onClick={() => {
                      if (!name.trim()) return
                      onAdd(makeItem('food', { name: name.trim(), time, duration: 45 }))
                      onClose()
                    }}
                    disabled={!name.trim()}
                  >
                    Add ＋
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Non-food types — simple entry */}
        {!isFood && (
          <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                Name / Description
              </div>
              <input
                className="modal-search"
                placeholder={
                  type === 'show'   ? 'e.g. Festival of the Lion King' :
                  type === 'break'  ? 'e.g. Pool break, lunch break' :
                  type === 'event'  ? 'e.g. Fireworks at 9pm' :
                  'e.g. Hotel check-in'
                }
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                Time (optional)
              </div>
              <input
                className="modal-search"
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                style={{ width: 'auto' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="btn-primary ridden-state"
                style={{ flex: 1, border: 'none' }}
                onClick={() => {
                  if (!name.trim()) return
                  onAdd(makeItem(type, { name: name.trim(), time }))
                  onClose()
                }}
                disabled={!name.trim()}
              >
                Add {cfg.emoji} {cfg.label}
              </button>
              <button className="btn-primary btn-ghost" onClick={onClose}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Day View ─────────────────────────────────────────────────
function DayView({ day, dayIndex, onUpdateDay, accentColor }) {
  const [showRidePicker,   setShowRidePicker]   = useState(false)
  const [showCustomModal,  setShowCustomModal]  = useState(false)
  const { getRideLive } = useLiveData()

  const allParks  = getAllParks()
  const parks     = (day.parkIds || (day.parkId ? [day.parkId] : [])).map(getParkById).filter(Boolean)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
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

  const totalTime = day.items.reduce((a, i) => a + (i.duration || 60), 0)
  const doneCount = day.items.filter(i => i.done).length
  const llCount   = day.items.filter(i => i.hasLL).length
  const primaryPark = parks[0]

  return (
    <div className="day-view animate-fade-in">
      {/* Day header */}
      <div className="day-header" style={{ borderLeftColor: primaryPark?.accentColor || accentColor }}>
        <div className="day-header-top">
          <div>
            <div className="day-header-label">Day {dayIndex + 1}</div>
            <div className="day-header-date">{formatDate(day.date) || 'Date not set'}</div>
          </div>
          <div className="day-header-stats">
            <span className="day-stat">{day.items.length} items</span>
            {llCount > 0 && <span className="day-stat" style={{ color: '#a78bfa' }}>⚡ {llCount} LL</span>}
            <span className="day-stat">{totalTime >= 60 ? `${(totalTime/60).toFixed(1)}h` : `${totalTime}m`} planned</span>
            {day.items.length > 0 && <span className="day-stat" style={{ color: 'var(--success)' }}>✓ {doneCount}/{day.items.length}</span>}
          </div>
        </div>

        {/* Date */}
        <div className="day-header-row">
          <span className="pic-label">Date</span>
          <input className="day-date-input" type="date" value={day.date} onChange={e => onUpdateDay({ date: e.target.value })} />
        </div>

        {/* Multi-park selector */}
        <div>
          <div className="pic-label" style={{ marginBottom: 8 }}>Parks (select one or more)</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {allParks.map(p => {
              const selected = (day.parkIds || (day.parkId ? [day.parkId] : [])).includes(p.id)
              return (
                <button
                  key={p.id}
                  className={`filter-pill${selected ? ' on' : ''}`}
                  style={selected ? { borderColor: p.accentColor, color: p.accentColor, background: `${p.accentColor}18` } : {}}
                  onClick={() => togglePark(p.id)}
                >
                  {p.emoji} {p.name.split(' ').slice(-1)[0]}
                </button>
              )
            })}
          </div>
        </div>

        {/* Day notes */}
        <div className="day-header-row" style={{ alignItems: 'flex-start' }}>
          <span className="pic-label" style={{ paddingTop: 6 }}>Notes</span>
          <textarea className="day-notes" rows={2} value={day.notes}
            onChange={e => onUpdateDay({ notes: e.target.value })}
            placeholder="ADR times, special events, reminders…" />
        </div>

        {day.items.length > 0 && (
          <div className="progress-track" style={{ marginTop: 8 }}>
            <div className="progress-fill" style={{ width: `${(doneCount/day.items.length)*100}%`, background: primaryPark?.accentColor || accentColor }} />
          </div>
        )}
      </div>

      {/* Items */}
      {day.items.length === 0 ? (
        <div className="day-empty">
          <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>📋</div>
          <div>No activities planned yet</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>Add rides, meals, shows, and breaks below</div>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={day.items.map(i => i.id)} strategy={verticalListSortingStrategy}>
            <div className="items-list">
              {day.items.map(item => (
                <SortableItem key={item.id} item={item} accentColor={primaryPark?.accentColor || accentColor}
                  onUpdate={patch => updateItem(item.id, patch)}
                  onDelete={() => deleteItem(item.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Add buttons */}
      <div className="day-add-row">
        <button
          className="day-add-btn ride"
          onClick={() => setShowRidePicker(true)}
          disabled={!parks.length}
          title={!parks.length ? 'Select a park first' : 'Add a ride'}
        >
          🎢 Add Ride
        </button>
        <button className="day-add-btn custom" onClick={() => setShowCustomModal(true)}>
          ＋ Add Food / Show / Break
        </button>
      </div>
      {!parks.length && (
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, paddingLeft: 4 }}>
          Select at least one park above to browse rides
        </div>
      )}

      {showRidePicker && parks.length > 0 && (
        <AddRideModal
          parkIds={parks.map(p => p.id)}
          onAdd={addItem}
          onClose={() => setShowRidePicker(false)}
        />
      )}
      {showCustomModal && (
        <AddCustomModal
          onAdd={addItem}
          onClose={() => setShowCustomModal(false)}
          parkIds={parks.map(p => p.id)}
        />
      )}
    </div>
  )
}

// ── Trip Setup ───────────────────────────────────────────────
const HOTEL_SUGGESTIONS = {
  'disney-world':      ['Grand Floridian', 'Polynesian', 'Contemporary', 'Wilderness Lodge', 'Yacht Club', 'Beach Club', 'BoardWalk', 'Pop Century', 'Art of Animation', 'All-Star Movies', 'Saratoga Springs', 'Old Key West', 'Animal Kingdom Lodge', 'Coronado Springs', 'Caribbean Beach'],
  'universal-orlando': ['Hard Rock Hotel', 'Sapphire Falls', 'Royal Pacific', 'Cabana Bay', 'Aventura Hotel', 'Endless Summer', 'Stella Nova', 'Terra Luna'],
}

function TripSetup({ trip, onUpdate, activeResortId }) {
  const [open, setOpen]           = useState(!trip.hotel && !trip.checkIn)
  const [hotelSugg, setHotelSugg] = useState(false)

  const suggestions = HOTEL_SUGGESTIONS[activeResortId] || []
  const filtered    = trip.hotel ? suggestions.filter(s => s.toLowerCase().includes(trip.hotel.toLowerCase())) : suggestions

  return (
    <div className="trip-setup">
      <button className="trip-setup-toggle" onClick={() => setOpen(v => !v)}>
        <div className="trip-setup-summary">
          <span>🏨</span>
          <span style={{ fontWeight: 700 }}>{trip.hotel || 'Add hotel & dates'}</span>
          {trip.checkIn && trip.checkOut && (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
              · {formatDate(trip.checkIn)} → {formatDate(trip.checkOut)}
            </span>
          )}
        </div>
        <span style={{ color: 'var(--text-muted)' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="trip-setup-body animate-float-up">

          {/* Hotel with autocomplete */}
          <div className="trip-field-row" style={{ position: 'relative' }}>
            <label className="trip-label">Hotel</label>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                className="trip-input"
                placeholder="e.g. Grand Floridian, Hard Rock Hotel…"
                value={trip.hotel}
                onChange={e => { onUpdate({ hotel: e.target.value }); setHotelSugg(true) }}
                onFocus={() => setHotelSugg(true)}
                onBlur={() => setTimeout(() => setHotelSugg(false), 150)}
              />
              {hotelSugg && filtered.length > 0 && (
                <div className="search-dropdown">
                  {filtered.slice(0, 6).map(s => (
                    <div key={s} className="search-dropdown-item" onMouseDown={() => { onUpdate({ hotel: s }); setHotelSugg(false) }}>
                      <span className="sddi-name">🏨 {s}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Check in / Check out — properly formatted */}
          <div className="trip-field-row">
            <label className="trip-label">Check In</label>
            <input className="trip-input" type="date" value={trip.checkIn}
              onChange={e => onUpdate({ checkIn: e.target.value })} style={{ maxWidth: 200 }} />
          </div>
          <div className="trip-field-row">
            <label className="trip-label">Check Out</label>
            <input className="trip-input" type="date" value={trip.checkOut}
              onChange={e => onUpdate({ checkOut: e.target.value })} style={{ maxWidth: 200 }} />
          </div>
          {trip.checkIn && trip.checkOut && (
            <div style={{ paddingLeft: 92, fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
              {(() => {
                const d = Math.round((new Date(trip.checkOut) - new Date(trip.checkIn)) / 86400000)
                return d > 0 ? `${d} night${d !== 1 ? 's' : ''}` : ''
              })()}
            </div>
          )}

          <div className="trip-field-row" style={{ alignItems: 'flex-start' }}>
            <label className="trip-label" style={{ paddingTop: 6 }}>Notes</label>
            <textarea className="trip-input" rows={3} value={trip.notes}
              onChange={e => onUpdate({ notes: e.target.value })}
              placeholder="ADRs, special events, packing list…" />
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────
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
    if (!window.confirm('Remove this day and all its activities?')) return
    setTrip(t => ({ ...t, days: t.days.filter((_, i) => i !== idx) }))
    setActiveDay(d => Math.max(0, d >= idx ? d - 1 : d))
  }

  const accentColor = isDisney ? '#f0b429' : '#ff6b35'
  const day = trip.days[activeDay]

  return (
    <div className="planner-page animate-fade-in">
      <div className="planner-page-header">
        <h1 className="page-title">📋 Trip Planner</h1>
        <p className="page-subtitle">Plan your complete itinerary. Drag items to reorder. Saves automatically.</p>
      </div>

      <TripSetup trip={trip} onUpdate={updateTrip} activeResortId={activeResortId} />

      {/* Day tabs */}
      <div className="day-tabs-bar">
        <div className="day-tabs-scroll">
          {trip.days.map((d, i) => {
            const parks = (d.parkIds || (d.parkId ? [d.parkId] : [])).map(getParkById).filter(Boolean)
            return (
              <button
                key={d.id}
                className={`day-tab${activeDay === i ? ' active' : ''}`}
                style={activeDay === i && parks[0] ? { borderBottomColor: parks[0].accentColor } : {}}
                onClick={() => setActiveDay(i)}
              >
                <span className="day-tab-num">Day {i + 1}</span>
                <span className="day-tab-park">
                  {parks.map(p => p.emoji).join('')} {parks.length === 1 ? parks[0].name.split(' ')[0] : parks.length > 1 ? `${parks.length} parks` : ''}
                </span>
                {d.date && <span className="day-tab-date">{formatDate(d.date).split(',')[0]}</span>}
                <button className="day-tab-delete" onClick={e => { e.stopPropagation(); deleteDay(i) }}>×</button>
              </button>
            )
          })}
          <button className="day-tab-add" onClick={addDay}>+ Add Day</button>
        </div>
      </div>

      {trip.days.length === 0 ? (
        <div className="planner-empty">
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>🗺️</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>No days planned yet</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24, maxWidth: 360 }}>
            Start building your perfect itinerary — rides, meals, Lightning Lanes, and more.
          </p>
          <button className="btn-primary ridden-state" style={{ background: accentColor, border: 'none' }} onClick={addDay}>
            + Add Your First Day
          </button>
        </div>
      ) : day ? (
        <DayView
          key={day.id}
          day={day}
          dayIndex={activeDay}
          onUpdateDay={patch => updateDay(day.id, patch)}
          accentColor={accentColor}
        />
      ) : null}
    </div>
  )
}
