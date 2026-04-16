import { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import {
  loadTrip, saveTrip, makeDay, makeItem,
  getParkById, getAllParks, formatDate,
  arrayMove, ITEM_TYPE_CONFIG,
} from '../plannerUtils'
import { useApp } from '../App'

// ── Sortable Item ────────────────────────────────────────────
function SortableItem({ item, onUpdate, onDelete, accentColor }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 'auto',
  }

  const [expanded, setExpanded] = useState(false)
  const cfg = ITEM_TYPE_CONFIG[item.type] || ITEM_TYPE_CONFIG.custom

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`planner-item-card${item.done ? ' done' : ''}${isDragging ? ' dragging' : ''}`}
    >
      <div className="pic-row">
        {/* Drag handle */}
        <div className="pic-drag" {...attributes} {...listeners} title="Drag to reorder">
          ⠿
        </div>

        {/* Type icon */}
        <span className="pic-type-icon" style={{ color: cfg.color }}>{cfg.emoji}</span>

        {/* Time */}
        <input
          className="pic-time"
          type="time"
          value={item.time}
          onChange={e => onUpdate({ time: e.target.value })}
          title="Planned time"
        />

        {/* Name */}
        <div className="pic-name-wrap">
          <span className="pic-name">{item.name}</span>
          {item.hasLL && (
            <span className="pic-ll-badge">
              ⚡ {item.llTime || 'LL'}
            </span>
          )}
        </div>

        {/* Done toggle */}
        <button
          className={`pic-done-btn${item.done ? ' is-done' : ''}`}
          onClick={() => onUpdate({ done: !item.done })}
          title={item.done ? 'Mark undone' : 'Mark done'}
        >
          {item.done ? '✓' : '○'}
        </button>

        {/* Expand */}
        <button
          className="pic-expand-btn"
          onClick={() => setExpanded(v => !v)}
          title="Details"
        >
          {expanded ? '▲' : '▼'}
        </button>

        {/* Delete */}
        <button
          className="pic-delete-btn"
          onClick={() => { if (window.confirm(`Remove "${item.name}"?`)) onDelete() }}
          title="Remove"
        >
          ✕
        </button>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="pic-detail">
          <div className="pic-detail-row">
            <label className="pic-label">Duration</label>
            <div className="pic-duration-row">
              {[15, 30, 45, 60, 90, 120].map(m => (
                <button
                  key={m}
                  className={`pic-dur-btn${item.duration === m ? ' active' : ''}`}
                  onClick={() => onUpdate({ duration: m })}
                >
                  {m < 60 ? `${m}m` : `${m / 60}h`}
                </button>
              ))}
            </div>
          </div>

          {item.type === 'ride' && (
            <div className="pic-detail-row">
              <label className="pic-label">Lightning Lane</label>
              <div className="pic-ll-row">
                <button
                  className={`pic-toggle${item.hasLL ? ' on' : ''}`}
                  onClick={() => onUpdate({ hasLL: !item.hasLL })}
                >
                  {item.hasLL ? '⚡ LL Active' : '⬤ No LL'}
                </button>
                {item.hasLL && (
                  <input
                    className="pic-ll-time"
                    type="time"
                    value={item.llTime}
                    onChange={e => onUpdate({ llTime: e.target.value })}
                    placeholder="LL time"
                  />
                )}
              </div>
            </div>
          )}

          <div className="pic-detail-row">
            <label className="pic-label">Notes</label>
            <textarea
              className="pic-notes"
              value={item.notes}
              onChange={e => onUpdate({ notes: e.target.value })}
              placeholder="Add a note…"
              rows={2}
            />
          </div>

          {item.rideId && (
            <div className="pic-detail-row">
              <Link
                to={`/ride/${item.rideId}`}
                className="pic-ride-link"
              >
                View ride info & trivia →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Add Ride Modal ───────────────────────────────────────────
function AddRideModal({ park, onAdd, onClose }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // all | mustdo | ll

  if (!park) return null

  const allRides = park.lands.flatMap(l => l.rides)
  const visible = allRides.filter(r => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false
    if (filter === 'mustdo' && !r.mustDo) return false
    if (filter === 'll' && !r.lightningLane) return false
    return true
  })

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">Add Ride — {park.name}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-search-row">
          <input
            className="modal-search"
            placeholder="Search rides…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        <div className="modal-filters">
          <button className={`filter-pill${filter === 'all' ? ' on' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`filter-pill${filter === 'mustdo' ? ' on' : ''}`} onClick={() => setFilter('mustdo')}>⭐ Must-Do</button>
          <button className={`filter-pill${filter === 'll' ? ' on' : ''}`} onClick={() => setFilter('ll')}>⚡ Lightning Lane</button>
        </div>

        <div className="modal-ride-list">
          {park.lands.map(land => {
            const rides = land.rides.filter(r => visible.includes(r))
            if (!rides.length) return null
            return (
              <div key={land.id}>
                <div className="modal-land-label">{land.name}</div>
                {rides.map(ride => (
                  <div
                    key={ride.id}
                    className="modal-ride-row"
                    onClick={() => {
                      onAdd(makeItem('ride', {
                        rideId: ride.id,
                        name: ride.name,
                        hasLL: ride.lightningLane,
                        duration: ride.duration ? parseInt(ride.duration) || 60 : 60,
                      }))
                      onClose()
                    }}
                  >
                    <div className="modal-ride-info">
                      <span className="modal-ride-name">{ride.name}</span>
                      <div className="modal-ride-badges">
                        {ride.mustDo && <span className="badge badge-mustdo">⭐</span>}
                        {ride.lightningLane && <span className="badge badge-ll">⚡ LL</span>}
                        {ride.heightRequirement && <span className="badge">📏 {ride.heightRequirement}"</span>}
                      </div>
                    </div>
                    <span className="modal-add-icon">+</span>
                  </div>
                ))}
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

// ── Custom Item Modal ────────────────────────────────────────
function CustomItemModal({ onAdd, onClose }) {
  const [name, setName] = useState('')
  const [type, setType] = useState('food')
  const [time, setTime] = useState('')

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel small" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">Add Custom Item</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          <div className="modal-filters" style={{ marginBottom: 16 }}>
            {Object.entries(ITEM_TYPE_CONFIG).filter(([k]) => k !== 'ride').map(([key, cfg]) => (
              <button
                key={key}
                className={`filter-pill${type === key ? ' on' : ''}`}
                onClick={() => setType(key)}
              >
                {cfg.emoji} {cfg.label}
              </button>
            ))}
          </div>

          <input
            className="modal-search"
            placeholder="Name (e.g. Lunch at Sci-Fi Dine-In)"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
            style={{ marginBottom: 12 }}
          />

          <input
            className="modal-search"
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            style={{ width: 'auto', marginBottom: 20 }}
          />
        </div>

        <div style={{ padding: '0 20px 20px', display: 'flex', gap: 10 }}>
          <button
            className="btn-primary ridden-state"
            style={{ flex: 1 }}
            onClick={() => {
              if (!name.trim()) return
              onAdd(makeItem(type, { name: name.trim(), time }))
              onClose()
            }}
          >
            Add to Day
          </button>
          <button className="btn-primary btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

// ── Day View ─────────────────────────────────────────────────
function DayView({ day, dayIndex, onUpdateDay, accentColor }) {
  const [showRidePicker, setShowRidePicker] = useState(false)
  const [showCustomModal, setShowCustomModal] = useState(false)

  const park = getParkById(day.parkId)
  const allParks = getAllParks()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = day.items.findIndex(i => i.id === active.id)
    const newIndex = day.items.findIndex(i => i.id === over.id)
    onUpdateDay({ items: arrayMove(day.items, oldIndex, newIndex) })
  }

  const updateItem = (itemId, patch) => {
    onUpdateDay({
      items: day.items.map(i => i.id === itemId ? { ...i, ...patch } : i)
    })
  }

  const deleteItem = (itemId) => {
    onUpdateDay({ items: day.items.filter(i => i.id !== itemId) })
  }

  const addItem = (item) => {
    onUpdateDay({ items: [...day.items, item] })
  }

  const totalTime = day.items.reduce((acc, i) => acc + (i.duration || 60), 0)
  const doneCount = day.items.filter(i => i.done).length
  const llCount   = day.items.filter(i => i.hasLL).length

  return (
    <div className="day-view animate-fade-in">
      {/* Day header */}
      <div className="day-header" style={{ borderLeftColor: park?.accentColor || accentColor }}>
        <div className="day-header-top">
          <div>
            <div className="day-header-label">Day {dayIndex + 1}</div>
            <div className="day-header-date">{formatDate(day.date)}</div>
          </div>
          <div className="day-header-stats">
            <span className="day-stat">{day.items.length} activities</span>
            {llCount > 0 && <span className="day-stat" style={{ color: '#a78bfa' }}>⚡ {llCount} LL</span>}
            <span className="day-stat">{Math.round(totalTime / 60)}h planned</span>
            {day.items.length > 0 && (
              <span className="day-stat" style={{ color: 'var(--success)' }}>
                ✓ {doneCount}/{day.items.length}
              </span>
            )}
          </div>
        </div>

        {/* Park selector */}
        <div className="day-header-row">
          <span className="pic-label">Park</span>
          <select
            className="day-park-select"
            value={day.parkId}
            onChange={e => onUpdateDay({ parkId: e.target.value })}
          >
            <option value="">— Select Park —</option>
            {allParks.map(p => (
              <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="day-header-row">
          <span className="pic-label">Date</span>
          <input
            className="day-date-input"
            type="date"
            value={day.date}
            onChange={e => onUpdateDay({ date: e.target.value })}
          />
        </div>

        {/* Notes */}
        <div className="day-header-row" style={{ alignItems: 'flex-start' }}>
          <span className="pic-label" style={{ paddingTop: 4 }}>Notes</span>
          <textarea
            className="day-notes"
            value={day.notes}
            onChange={e => onUpdateDay({ notes: e.target.value })}
            placeholder="Day notes, tips, reminders…"
            rows={2}
          />
        </div>

        {/* Progress bar */}
        {day.items.length > 0 && (
          <div className="progress-track" style={{ marginTop: 12 }}>
            <div
              className="progress-fill"
              style={{ width: `${(doneCount / day.items.length) * 100}%`, background: park?.accentColor || accentColor }}
            />
          </div>
        )}
      </div>

      {/* Items list */}
      {day.items.length === 0 ? (
        <div className="day-empty">
          <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>📋</div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>No activities planned yet</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Add rides, meals, shows, and breaks below
          </div>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={day.items.map(i => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="items-list">
              {day.items.map(item => (
                <SortableItem
                  key={item.id}
                  item={item}
                  accentColor={park?.accentColor || accentColor}
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
          disabled={!day.parkId}
          title={!day.parkId ? 'Select a park first' : 'Add a ride'}
        >
          🎢 Add Ride
        </button>
        <button className="day-add-btn custom" onClick={() => setShowCustomModal(true)}>
          ＋ Food / Show / Break
        </button>
      </div>
      {!day.parkId && (
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, paddingLeft: 4 }}>
          Select a park above to browse rides
        </div>
      )}

      {/* Modals */}
      {showRidePicker && park && (
        <AddRideModal
          park={park}
          onAdd={addItem}
          onClose={() => setShowRidePicker(false)}
        />
      )}
      {showCustomModal && (
        <CustomItemModal
          onAdd={addItem}
          onClose={() => setShowCustomModal(false)}
        />
      )}
    </div>
  )
}

// ── Trip Setup Panel ─────────────────────────────────────────
function TripSetup({ trip, onUpdate }) {
  const [open, setOpen] = useState(!trip.hotel && !trip.checkIn)

  return (
    <div className="trip-setup">
      <button
        className="trip-setup-toggle"
        onClick={() => setOpen(v => !v)}
      >
        <div className="trip-setup-summary">
          <span>🏨</span>
          <span style={{ fontWeight: 700 }}>
            {trip.hotel || 'Add hotel & dates'}
          </span>
          {trip.checkIn && trip.checkOut && (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
              · {formatDate(trip.checkIn)} → {formatDate(trip.checkOut)}
            </span>
          )}
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="trip-setup-body animate-float-up">
          <div className="trip-field-row">
            <label className="trip-label">Hotel / Resort</label>
            <input
              className="trip-input"
              placeholder="e.g. Grand Floridian, Hard Rock Hotel…"
              value={trip.hotel}
              onChange={e => onUpdate({ hotel: e.target.value })}
            />
          </div>
          <div className="trip-field-row">
            <label className="trip-label">Check In</label>
            <input
              className="trip-input"
              type="date"
              value={trip.checkIn}
              onChange={e => onUpdate({ checkIn: e.target.value })}
            />
          </div>
          <div className="trip-field-row">
            <label className="trip-label">Check Out</label>
            <input
              className="trip-input"
              type="date"
              value={trip.checkOut}
              onChange={e => onUpdate({ checkOut: e.target.value })}
            />
          </div>
          <div className="trip-field-row" style={{ alignItems: 'flex-start' }}>
            <label className="trip-label" style={{ paddingTop: 6 }}>Trip Notes</label>
            <textarea
              className="trip-input"
              placeholder="Reservations, important reminders, packing list…"
              value={trip.notes}
              onChange={e => onUpdate({ notes: e.target.value })}
              rows={3}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main DayPlanner ──────────────────────────────────────────
export default function DayPlanner() {
  const { activeResort, isDisney } = useApp()
  const [trip, setTrip] = useState(loadTrip)
  const [activeDay, setActiveDay] = useState(0)

  // Persist on every change
  useEffect(() => { saveTrip(trip) }, [trip])

  const updateTrip = useCallback((patch) => setTrip(t => ({ ...t, ...patch })), [])

  const updateDay = useCallback((dayId, patch) => {
    setTrip(t => ({
      ...t,
      days: t.days.map(d => d.id === dayId ? { ...d, ...patch } : d)
    }))
  }, [])

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
        <p className="page-subtitle">
          Plan your complete itinerary — rides, meals, Lightning Lanes, and more.
          Drag items to reorder. Everything saves automatically.
        </p>
      </div>

      {/* Trip setup */}
      <TripSetup trip={trip} onUpdate={updateTrip} />

      {/* Day tabs */}
      <div className="day-tabs-bar">
        <div className="day-tabs-scroll">
          {trip.days.map((d, i) => {
            const park = getParkById(d.parkId)
            return (
              <button
                key={d.id}
                className={`day-tab${activeDay === i ? ' active' : ''}`}
                style={activeDay === i ? { borderBottomColor: park?.accentColor || accentColor } : {}}
                onClick={() => setActiveDay(i)}
              >
                <span className="day-tab-num">Day {i + 1}</span>
                {park && <span className="day-tab-park">{park.emoji} {park.name.split(' ')[0]}</span>}
                {d.date && <span className="day-tab-date">{formatDate(d.date).split(',')[0]}</span>}
                <button
                  className="day-tab-delete"
                  onClick={e => { e.stopPropagation(); deleteDay(i) }}
                  title="Remove day"
                >×</button>
              </button>
            )
          })}
          <button className="day-tab-add" onClick={addDay}>
            + Add Day
          </button>
        </div>
      </div>

      {/* Day content */}
      {trip.days.length === 0 ? (
        <div className="planner-empty">
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>🗺️</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>No days planned yet</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24, maxWidth: 360 }}>
            Add your first day to start building your itinerary — rides, meals, shows, and Lightning Lane slots all in one place.
          </p>
          <button
            className="btn-primary ridden-state"
            style={{ background: accentColor, border: 'none' }}
            onClick={addDay}
          >
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
