// ============================================================
// PARK HOURS — Today's schedule pulled from ThemeParks.wiki
// Shows normal hours, early entry, after hours, special events
// ============================================================
import { useLiveData } from '../context/LiveDataContext'

// Compact version for resort dashboard park cards
export function ParkHoursCompact({ parkId, accentColor }) {
  const { getParkHours } = useLiveData()
  const hours = getParkHours(parkId)

  if (!hours) return (
    <div className="park-hours-compact loading">
      <span className="hours-dot" />
      <span>Fetching hours…</span>
    </div>
  )

  if (!hours.isOpen) return (
    <div className="park-hours-compact closed">
      <span className="hours-dot closed" />
      <span>Closed today</span>
    </div>
  )

  return (
    <div className="park-hours-compact-stack">
      {/* Early Entry */}
      {hours.earlyEntry && (
        <div className="park-hours-compact early">
          <span className="hours-dot early" />
          <span className="hours-type-label">Early Entry</span>
          <span className="hours-time">{hours.earlyEntry.openTime} – {hours.earlyEntry.closeTime}</span>
        </div>
      )}
      {/* Normal hours */}
      <div className="park-hours-compact open" style={{ '--accent': accentColor }}>
        <span className="hours-dot open" style={{ background: accentColor }} />
        <span className="hours-type-label">Open</span>
        <span className="hours-time">{hours.openTime} – {hours.closeTime}</span>
      </div>
      {/* After hours */}
      {hours.afterHours && (
        <div className="park-hours-compact after">
          <span className="hours-dot after" />
          <span className="hours-type-label">After Hours</span>
          <span className="hours-time">{hours.afterHours.openTime} – {hours.afterHours.closeTime}</span>
        </div>
      )}
      {/* Special event */}
      {hours.specialEvent && (
        <div className="park-hours-compact special">
          <span className="hours-dot special" />
          <span className="hours-type-label">🎟 {hours.specialEvent.name}</span>
          {hours.specialEvent.openTime && (
            <span className="hours-time">{hours.specialEvent.openTime}</span>
          )}
        </div>
      )}
    </div>
  )
}

// Full version for the park detail page header
export function ParkHoursFull({ parkId, accentColor }) {
  const { getParkHours } = useLiveData()
  const hours = getParkHours(parkId)

  if (!hours) return (
    <div className="park-hours-full loading">
      <span>Loading today's hours…</span>
    </div>
  )

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="park-hours-full">
      <div className="phf-date">📅 {today}</div>

      {!hours.isOpen ? (
        <div className="phf-row closed">
          <span className="phf-dot closed" />
          <span className="phf-label">Closed today</span>
        </div>
      ) : (
        <>
          {/* Early Entry */}
          {hours.earlyEntry && (
            <div className="phf-row early">
              <span className="phf-dot early" />
              <div className="phf-info">
                <span className="phf-label">⏰ Early Entry</span>
                <span className="phf-sublabel">Resort hotel guests</span>
              </div>
              <span className="phf-time">{hours.earlyEntry.openTime} – {hours.earlyEntry.closeTime}</span>
            </div>
          )}

          {/* Normal hours */}
          <div className="phf-row open">
            <span className="phf-dot open" style={{ background: accentColor }} />
            <div className="phf-info">
              <span className="phf-label">🎡 Park Hours</span>
              <span className="phf-sublabel">All guests</span>
            </div>
            <span className="phf-time" style={{ color: accentColor, fontWeight: 900 }}>
              {hours.openTime} – {hours.closeTime}
            </span>
          </div>

          {/* After Hours */}
          {hours.afterHours && (
            <div className="phf-row after">
              <span className="phf-dot after" />
              <div className="phf-info">
                <span className="phf-label">🌙 After Hours</span>
                <span className="phf-sublabel">Separate ticket required</span>
              </div>
              <span className="phf-time">{hours.afterHours.openTime} – {hours.afterHours.closeTime}</span>
            </div>
          )}

          {/* Special Event */}
          {hours.specialEvent && (
            <div className="phf-row special">
              <span className="phf-dot special" />
              <div className="phf-info">
                <span className="phf-label">🎟 {hours.specialEvent.name}</span>
                <span className="phf-sublabel">Ticketed event</span>
              </div>
              {hours.specialEvent.openTime && (
                <span className="phf-time">{hours.specialEvent.openTime} – {hours.specialEvent.closeTime}</span>
              )}
            </div>
          )}
        </>
      )}

      <div className="phf-source">Hours via ThemeParks.wiki · updates automatically</div>
    </div>
  )
}
