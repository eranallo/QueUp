import { useState, useEffect, useRef } from 'react'
import {
  loadJournal, saveJournal, addEntry, updateEntry, deleteEntry,
  getEntriesForDate, getJournalDates, fmtTime, fmtDate, ENTRY_CONFIG
} from '../journalUtils'

// ── Single timeline entry ────────────────────────────────────
function JournalEntry({ entry, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [draft,   setDraft]   = useState({ note: entry.note || '', ts: entry.ts })
  const cfg = ENTRY_CONFIG[entry.type] || ENTRY_CONFIG.note

  const save = () => {
    // Convert edited time string back to timestamp preserving original date
    const origDate = new Date(entry.ts)
    let newTs = entry.ts
    if (draft.timeStr) {
      const [h, m] = draft.timeStr.split(':').map(Number)
      const d = new Date(origDate)
      d.setHours(h, m, 0, 0)
      newTs = d.getTime()
    }
    onUpdate({ note: draft.note, ts: newTs })
    setEditing(false)
  }

  const timeStr = new Date(entry.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })

  return (
    <div className={`jn-entry${editing ? ' editing' : ''}`}>
      {/* Timeline spine dot */}
      <div className="jn-spine">
        <div className="jn-dot" style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}66` }} />
      </div>

      <div className="jn-body">
        <div className="jn-header">
          <div className="jn-type-row">
            <span className="jn-emoji">{cfg.emoji}</span>
            <span className="jn-title">{entry.title || cfg.label}</span>
            {entry.rating != null && (
              <span className="jn-stars">{'★'.repeat(entry.rating)}{'☆'.repeat(5 - entry.rating)}</span>
            )}
          </div>
          <div className="jn-actions">
            <button className="jn-action-btn" onClick={() => { setDraft({ note: entry.note || '', timeStr }); setEditing(v => !v) }}>
              {editing ? '✕' : '✏️'}
            </button>
            <button className="jn-action-btn delete" onClick={() => { if (window.confirm('Remove this entry?')) onDelete() }}>🗑</button>
          </div>
        </div>

        {/* Note text — shown always if present, editable when open */}
        {!editing && entry.note && (
          <p className="jn-note">{entry.note}</p>
        )}

        {editing && (
          <div className="jn-edit-form animate-float-up">
            <div className="jn-edit-row">
              <label className="jn-edit-label">Time</label>
              <input
                className="jn-edit-input"
                type="time"
                defaultValue={timeStr}
                onChange={e => setDraft(d => ({ ...d, timeStr: e.target.value }))}
              />
            </div>
            <div className="jn-edit-row">
              <label className="jn-edit-label">Note</label>
              <textarea
                className="jn-edit-textarea"
                rows={3}
                value={draft.note}
                onChange={e => setDraft(d => ({ ...d, note: e.target.value }))}
                placeholder="Add your thoughts…"
                autoFocus
              />
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button className="btn-primary ridden-state" style={{ border: 'none', flex: 1, padding: '8px' }} onClick={save}>Save</button>
              <button className="btn-primary btn-ghost" style={{ padding: '8px 14px' }} onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </div>
        )}

        <div className="jn-time">{fmtTime(entry.ts)}</div>
      </div>
    </div>
  )
}

// ── Add manual entry form ────────────────────────────────────
function AddEntryForm({ dateStr, onAdded }) {
  const [open, setOpen]   = useState(false)
  const [text, setText]   = useState('')
  const [time, setTime]   = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  )
  const ref = useRef()

  const submit = () => {
    if (!text.trim()) return
    const [h, m] = time.split(':').map(Number)
    const d = new Date(dateStr + 'T12:00:00')
    d.setHours(h, m, 0, 0)
    addEntry({ type: 'note', title: 'Journal Entry', note: text.trim(), ts: d.getTime() })
    setText('')
    setOpen(false)
    onAdded()
  }

  if (!open) return (
    <button className="jn-add-btn" onClick={() => { setOpen(true); setTimeout(() => ref.current?.focus(), 50) }}>
      ✍️ Add Journal Entry
    </button>
  )

  return (
    <div className="jn-add-form animate-float-up">
      <div className="jn-edit-row" style={{ marginBottom: 8 }}>
        <label className="jn-edit-label">Time</label>
        <input className="jn-edit-input" type="time" value={time} onChange={e => setTime(e.target.value)} />
      </div>
      <textarea
        ref={ref}
        className="jn-edit-textarea"
        rows={4}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="What happened? How was the ride? What did you eat? How did everyone feel about it?…"
      />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button className="btn-primary ridden-state" style={{ border: 'none', flex: 1, padding: '10px' }} onClick={submit} disabled={!text.trim()}>
          Save Entry ✍️
        </button>
        <button className="btn-primary btn-ghost" style={{ padding: '10px 14px' }} onClick={() => { setOpen(false); setText('') }}>Cancel</button>
      </div>
    </div>
  )
}

// ── Day header ───────────────────────────────────────────────
function DayHeader({ dateStr }) {
  const stats = getEntriesForDate(dateStr)
  const rides   = stats.filter(e => e.type === 'ride').length
  const food    = stats.filter(e => e.type === 'food').length
  const mickeys = stats.filter(e => e.type === 'mickey').length

  return (
    <div className="jn-day-header">
      <div className="jn-day-title">{fmtDate(dateStr)}</div>
      <div className="jn-day-chips">
        {rides   > 0 && <span className="jn-day-chip">🎢 {rides} ride{rides !== 1 ? 's' : ''}</span>}
        {food    > 0 && <span className="jn-day-chip">🍽️ {food} food/drink{food !== 1 ? 's' : ''}</span>}
        {mickeys > 0 && <span className="jn-day-chip">🐭 {mickeys} Mickey{mickeys !== 1 ? 's' : ''}</span>}
        {stats.length === 0 && <span className="jn-day-chip" style={{ color: 'var(--text-muted)' }}>No entries yet — start logging!</span>}
      </div>
    </div>
  )
}

// ── Main Journal page ────────────────────────────────────────
export default function Journal() {
  const today    = new Date().toLocaleDateString('en-CA')
  const [selectedDate, setSelectedDate] = useState(today)
  const [entries, setEntries]           = useState(() => getEntriesForDate(today))
  const [dates,   setDates]             = useState(() => getJournalDates())

  const reload = () => {
    setEntries(getEntriesForDate(selectedDate))
    setDates(getJournalDates())
  }

  useEffect(() => {
    setEntries(getEntriesForDate(selectedDate))
  }, [selectedDate])

  // Poll every 10s to catch auto-logged events from other parts of the app
  useEffect(() => {
    const id = setInterval(reload, 10000)
    return () => clearInterval(id)
  }, [selectedDate])

  const handleUpdate = (id, patch) => {
    updateEntry(id, patch)
    reload()
  }

  const handleDelete = (id) => {
    deleteEntry(id)
    reload()
  }

  // All dates that have entries, plus today
  const allDates = [...new Set([today, ...dates])].sort().reverse()

  return (
    <div className="journal-page animate-fade-in">

      {/* Page header */}
      <div className="journal-header">
        <h1 className="page-title">📔 Trip Journal</h1>
        <p className="page-subtitle">
          Your day-by-day travel log — automatically captures rides, food, ratings, and Mickeys.
          Add your own entries to remember the moments.
        </p>
      </div>

      {/* Date selector */}
      <div className="jn-date-bar">
        {allDates.map(d => {
          const label = d === today
            ? 'Today'
            : new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
          const count = getEntriesForDate(d).length
          return (
            <button
              key={d}
              className={`jn-date-tab${selectedDate === d ? ' active' : ''}`}
              onClick={() => setSelectedDate(d)}
            >
              <span className="jn-date-label">{label}</span>
              {count > 0 && <span className="jn-date-count">{count}</span>}
            </button>
          )
        })}
        {/* Manual date picker */}
        <input
          className="jn-date-input"
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          title="Jump to date"
        />
      </div>

      {/* Day header */}
      <DayHeader dateStr={selectedDate} />

      {/* Add entry form */}
      <AddEntryForm dateStr={selectedDate} onAdded={reload} />

      {/* Timeline */}
      {entries.length === 0 ? (
        <div className="jn-empty">
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📖</div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', marginBottom: 8 }}>No entries for this day yet</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: 300, textAlign: 'center' }}>
            Rides you check off, food you try, and Mickeys you find will appear here automatically.
            You can also write your own entries above.
          </div>
        </div>
      ) : (
        <div className="jn-timeline">
          <div className="jn-spine-line" />
          {entries.map(entry => (
            <JournalEntry
              key={entry.id}
              entry={entry}
              onUpdate={patch => handleUpdate(entry.id, patch)}
              onDelete={() => handleDelete(entry.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
