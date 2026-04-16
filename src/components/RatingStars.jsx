// ============================================================
// RATING STARS — Personal 1-5 star rating system
// Stored in localStorage keyed by itemType + itemId
// ============================================================
import { useState } from 'react'

const RATING_LABELS = ['', 'Skip it', 'It\'s okay', 'Good', 'Really good', 'Legendary ⭐']

function getRating(itemType, itemId) {
  try { return parseInt(localStorage.getItem(`rating_${itemType}_${itemId}`)) || 0 } catch { return 0 }
}
function setRating(itemType, itemId, val) {
  localStorage.setItem(`rating_${itemType}_${itemId}`, val)
}

export default function RatingStars({ itemType, itemId, compact = false }) {
  const [rating, setRatingState] = useState(() => getRating(itemType, itemId))
  const [hover,  setHover]       = useState(0)

  const active = hover || rating

  const handleSet = (val) => {
    const next = (val === rating) ? 0 : val  // tap same star to clear
    setRating(itemType, itemId, next)
    setRatingState(next)
  }

  if (compact && rating === 0) return null

  return (
    <div className={`rating-stars${compact ? ' compact' : ''}`}>
      {!compact && <div className="rating-label">My Rating</div>}
      <div className="rating-row">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            className={`star-btn${n <= active ? ' filled' : ''}`}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleSet(n)}
            title={RATING_LABELS[n]}
          >
            ★
          </button>
        ))}
        {!compact && active > 0 && (
          <span className="rating-text">{RATING_LABELS[active]}</span>
        )}
      </div>
    </div>
  )
}

// Export helper to get rating anywhere (for park cards etc)
export { getRating }
