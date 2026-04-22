import { useState, useEffect, useRef } from 'react'
import {
  addEntry, updateEntry, deleteEntry,
  getEntriesForDate, getJournalDates,
  fmtTime, fmtDate, ENTRY_CONFIG
} from '../journalUtils'
import { useApp } from '../App'

// ── Entry card — distinct style per type ─────────────────────
function EntryCard({ entry, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [draft,   setDraft]   = useState({ note: entry.note || '' })
  const [draftTime, setDraftTime] = useState(
    new Date(entry.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  )
  const cfg = ENTRY_CONFIG[entry.type] || ENTRY_CONFIG.note
  const isNote = entry.type === 'note'

  const save = () => {
    const origDate = new Date(entry.ts)
    const [h, m]   = draftTime.split(':').map(Number)
    origDate.setHours(h, m, 0, 0)
    onUpdate({ note: draft.note, ts: origDate.getTime() })
    setEditing(false)
  }

  // Card accent color per type
  const accentMap = {
    ride:   { border: '#3b82f6', bg: 'rgba(59,130,246,0.06)',  titleColor: '#93c5fd' },
    food:   { border: '#10b981', bg: 'rgba(16,185,129,0.06)',  titleColor: '#6ee7b7' },
    photo:  { border: '#f0b429', bg: 'rgba(240,180,41,0.06)',  titleColor: '#fcd34d' },
    rating: { border: '#f59e0b', bg: 'rgba(245,158,11,0.06)',  titleColor: '#fcd34d' },
    mickey: { border: '#8b5cf6', bg: 'rgba(139,92,246,0.06)',  titleColor: '#c4b5fd' },
    hotel:  { border: '#f97316', bg: 'rgba(249,115,22,0.06)',  titleColor: '#fdba74' },
    note:   { border: 'var(--border-mid)', bg: 'rgba(255,255,255,0.02)', titleColor: 'var(--accent)' },
  }
  const accent = accentMap[entry.type] || accentMap.note

  return (
    <div className={`jn-entry${editing ? ' editing' : ''}`}>
      <div className="jn-spine">
        <div className="jn-dot" style={{ background: cfg.color, boxShadow: `0 0 8px ${cfg.color}55` }} />
      </div>

      <div
        className={`jn-body${isNote ? ' jn-body--note' : ''}`}
        style={{ borderLeftColor: accent.border, background: accent.bg }}
      >
        {/* Header row */}
        <div className="jn-header">
          <div className="jn-type-row">
            <span className="jn-type-badge" style={{ background: `${accent.border}22`, color: accent.titleColor, borderColor: `${accent.border}44` }}>
              {cfg.emoji} {cfg.label}
            </span>
            {entry.rating != null && (
              <span className="jn-stars" style={{ color: '#f59e0b' }}>
                {'★'.repeat(entry.rating)}{'☆'.repeat(5 - entry.rating)}
              </span>
            )}
          </div>
          <div className="jn-actions">
            <button
              className="jn-action-btn"
              onClick={() => { setDraft({ note: entry.note || '' }); setEditing(v => !v) }}
            >
              {editing ? '✕' : '✏️'}
            </button>
            <button
              className="jn-action-btn delete"
              onClick={() => { if (window.confirm('Remove this entry?')) onDelete() }}
            >
              🗑
            </button>
          </div>
        </div>

        {/* Entry title (ride name, food name, etc.) */}
        <div className={`jn-entry-title${isNote ? ' jn-entry-title--note' : ''}`}>
          {entry.title}
        </div>

        {/* Note text */}
        {!editing && entry.note && (
          <p className="jn-note">{entry.note}</p>
        )}

        {/* Edit form */}
        {editing && (
          <div className="jn-edit-form animate-float-up">
            <div className="jn-edit-row">
              <label className="jn-edit-label">Time</label>
              <input
                className="jn-edit-input"
                type="time"
                value={draftTime}
                onChange={e => setDraftTime(e.target.value)}
              />
            </div>
            <div className="jn-edit-row" style={{ alignItems: 'flex-start' }}>
              <label className="jn-edit-label" style={{ paddingTop: 6 }}>Note</label>
              <textarea
                className="jn-edit-textarea"
                rows={3}
                value={draft.note}
                onChange={e => setDraft(d => ({ ...d, note: e.target.value }))}
                placeholder="Add your thoughts…"
                autoFocus
              />
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button
                className="btn-primary ridden-state"
                style={{ border: 'none', flex: 1, padding: '9px' }}
                onClick={save}
              >
                Save
              </button>
              <button
                className="btn-primary btn-ghost"
                style={{ padding: '9px 14px' }}
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="jn-time">{fmtTime(entry.ts)}</div>
      </div>
    </div>
  )
}

// ── Write entry bottom sheet ──────────────────────────────────
function WriteSheet({ dateStr, onAdded, onClose }) {
  const [text, setText] = useState('')
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  )
  const ref = useRef()

  useEffect(() => { setTimeout(() => ref.current?.focus(), 100) }, [])

  const submit = () => {
    if (!text.trim()) return
    const [h, m] = time.split(':').map(Number)
    const d = new Date(dateStr + 'T12:00:00')
    d.setHours(h, m, 0, 0)
    addEntry({ type: 'note', title: 'Journal Entry', note: text.trim(), ts: d.getTime() })
    setText('')
    onAdded()
    onClose()
  }

  return (
    <div className="jn-sheet-overlay" onClick={onClose}>
      <div className="jn-sheet animate-float-up" onClick={e => e.stopPropagation()}>
        <div className="jn-sheet-handle" />
        <div className="jn-sheet-header">
          <span className="jn-sheet-title">✍️ New Entry</span>
          <button className="jn-sheet-close" onClick={onClose}>✕</button>
        </div>

        <div className="jn-sheet-time-row">
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Time</span>
          <input
            className="jn-edit-input"
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </div>

        <textarea
          ref={ref}
          className="jn-sheet-textarea"
          rows={5}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="What happened? How was the ride? What did you eat? What's the vibe today?…"
        />

        <button
          className="jn-sheet-submit"
          onClick={submit}
          disabled={!text.trim()}
          style={{ opacity: text.trim() ? 1 : 0.4 }}
        >
          Save Entry
        </button>
      </div>
    </div>
  )
}

// ── Day summary header ────────────────────────────────────────
function DayHero({ dateStr, entries, accentColor }) {
  const rides   = entries.filter(e => e.type === 'ride').length
  const food    = entries.filter(e => e.type === 'food').length
  const notes   = entries.filter(e => e.type === 'note').length
  const mickeys = entries.filter(e => e.type === 'mickey').length

  const isToday = dateStr === new Date().toLocaleDateString('en-CA')

  return (
    <div className="jn-day-hero" style={{ background: `linear-gradient(135deg, ${accentColor}18 0%, var(--bg-card) 100%)` }}>
      <div className="jn-day-hero-date">
        {isToday && <span className="jn-today-badge">TODAY</span>}
        <span className="jn-day-hero-full">{fmtDate(dateStr)}</span>
      </div>
      {entries.length > 0 ? (
        <div className="jn-day-hero-chips">
          {rides   > 0 && <span className="jn-hero-chip" style={{ background: 'rgba(59,130,246,0.15)', color: '#93c5fd' }}>🎢 {rides} ride{rides !== 1 ? 's' : ''}</span>}
          {food    > 0 && <span className="jn-hero-chip" style={{ background: 'rgba(16,185,129,0.15)', color: '#6ee7b7' }}>🍽️ {food} food{food !== 1 ? '/drinks' : ''}</span>}
          {mickeys > 0 && <span className="jn-hero-chip" style={{ background: 'rgba(139,92,246,0.15)', color: '#c4b5fd' }}>🐭 {mickeys} Mickey{mickeys !== 1 ? 's' : ''}</span>}
          {notes   > 0 && <span className="jn-hero-chip" style={{ background: 'rgba(240,180,41,0.12)', color: '#fcd34d' }}>✍️ {notes} note{notes !== 1 ? 's' : ''}</span>}
        </div>
      ) : (
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 6, fontStyle: 'italic' }}>
          No entries yet — check off a ride or write something
        </div>
      )}
    </div>
  )
}

// ── Calendar date strip ───────────────────────────────────────
function DateStrip({ allDates, selectedDate, onSelect, today }) {
  const scrollRef = useRef()

  // Auto-scroll to selected
  useEffect(() => {
    const el = scrollRef.current?.querySelector('.jn-cal-day.active')
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [selectedDate])

  return (
    <div className="jn-cal-strip" ref={scrollRef}>
      {allDates.map(d => {
        const date     = new Date(d + 'T12:00:00')
        const dayNum   = date.getDate()
        const dayName  = date.toLocaleDateString('en-US', { weekday: 'short' })
        const count    = getEntriesForDate(d).length
        const isActive = d === selectedDate
        const isToday  = d === today

        return (
          <button
            key={d}
            className={`jn-cal-day${isActive ? ' active' : ''}${isToday ? ' today' : ''}`}
            onClick={() => onSelect(d)}
          >
            <span className="jn-cal-dayname">{dayName}</span>
            <span className="jn-cal-daynum">{dayNum}</span>
            {count > 0 && <span className="jn-cal-dot" />}
          </button>
        )
      })}
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────
export default function Journal() {
  const { activeResortId, isDisney } = useApp()
  const today        = new Date().toLocaleDateString('en-CA')
  const accentColor  = isDisney ? '#f0b429' : '#ff6b35'

  const [selectedDate, setSelectedDate] = useState(today)
  const [entries,      setEntries]      = useState(() => getEntriesForDate(today))
  const [dates,        setDates]        = useState(() => getJournalDates())
  const [showWrite,    setShowWrite]    = useState(false)

  const reload = () => {
    setEntries(getEntriesForDate(selectedDate))
    setDates(getJournalDates())
  }

  useEffect(() => { setEntries(getEntriesForDate(selectedDate)) }, [selectedDate])

  useEffect(() => {
    const id = setInterval(reload, 10000)
    return () => clearInterval(id)
  }, [selectedDate])

  const allDates = [...new Set([today, ...dates])].sort().reverse()

  return (
    <div className="journal-page-v2 animate-fade-in">

      {/* ── Page header ── */}
      <div className="jn-page-header">
        <div>
          <h1 className="jn-page-title">📔 Trip Journal</h1>
          <p className="jn-page-sub">Auto-logs rides, food & Mickeys. Write your own memories.</p>
        </div>
      </div>

      {/* ── Calendar date strip ── */}
      <DateStrip
        allDates={allDates}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
        today={today}
      />

      {/* ── Day hero ── */}
      <DayHero dateStr={selectedDate} entries={entries} accentColor={accentColor} />

      {/* ── Timeline ── */}
      {entries.length === 0 ? (
        <div className="jn-empty-v2">
          <div className="jn-empty-icon">📖</div>
          <div className="jn-empty-title">Your story starts here</div>
          <div className="jn-empty-sub">
            Ride something, eat something, write something.
            Everything you log in the app shows up here automatically.
          </div>
        </div>
      ) : (
        <div className="jn-timeline-v2">
          {/* Animated spine */}
          <div className="jn-spine-line" />
          {entries.map((entry, i) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onUpdate={patch => { updateEntry(entry.id, patch); reload() }}
              onDelete={() => { deleteEntry(entry.id); reload() }}
            />
          ))}
        </div>
      )}

      {/* Bottom padding for FAB */}
      <div style={{ height: 100 }} />

      {/* ── Floating write button (FAB) ── */}
      <button
        className="jn-fab"
        style={{ background: accentColor, color: accentColor === '#f0b429' ? '#000' : '#fff' }}
        onClick={() => setShowWrite(true)}
      >
        ✍️ Write
      </button>

      {/* ── Write sheet ── */}
      {showWrite && (
        <WriteSheet
          dateStr={selectedDate}
          onAdded={reload}
          onClose={() => setShowWrite(false)}
        />
      )}
    </div>
  )
}
