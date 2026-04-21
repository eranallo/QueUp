// ============================================================
// PHOTO MANAGER — Multiple photos per item, keyed by timestamp
// Key format: photo_{type}_{id}_{year}_{timestamp}
// Backward compatible with old single-photo keys
// ============================================================
import { useState, useRef } from 'react'

const MAX_DIMENSION = 900
const JPEG_QUALITY  = 0.72

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let { width, height } = img
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) { height = Math.round(height * MAX_DIMENSION / width); width = MAX_DIMENSION }
          else                { width  = Math.round(width  * MAX_DIMENSION / height); height = MAX_DIMENSION }
        }
        canvas.width = width; canvas.height = height
        canvas.getContext('2d').drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY))
      }
      img.onerror = reject
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// New key includes a unique timestamp so each photo gets its own slot
function makeKey(itemType, itemId) {
  const year = new Date().getFullYear()
  const ts   = Date.now()
  return `photo_${itemType}_${itemId}_${year}_${ts}`
}

// Parse year from both old keys (photo_type_id_year)
// and new keys (photo_type_id_year_timestamp)
function parseKeyMeta(key, itemType, itemId) {
  const prefix = `photo_${itemType}_${itemId}_`
  if (!key.startsWith(prefix)) return null
  const rest   = key.slice(prefix.length)
  const parts  = rest.split('_')
  const year   = parts[0]
  const ts     = parts[1] ? parseInt(parts[1]) : 0
  return { year, ts, key }
}

function loadPhotos(itemType, itemId) {
  const out = []
  for (let i = 0; i < localStorage.length; i++) {
    const key  = localStorage.key(i)
    const meta = parseKeyMeta(key, itemType, itemId)
    if (!meta) continue
    const data = localStorage.getItem(key)
    if (data) out.push({ ...meta, data })
  }
  // Sort newest first (by timestamp, then by year)
  return out.sort((a, b) => (b.ts || 0) - (a.ts || 0) || b.year.localeCompare(a.year))
}

export default function PhotoManager({ itemType, itemId, itemName }) {
  const fileRef  = useRef()
  const [photos,    setPhotos]    = useState(() => loadPhotos(itemType, itemId))
  const [uploading, setUploading] = useState(false)
  const [lightbox,  setLightbox]  = useState(null)   // { key, year, data }
  const [lightboxIdx, setLightboxIdx] = useState(0)

  const refresh = () => setPhotos(loadPhotos(itemType, itemId))

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    try {
      // Allow picking multiple photos at once
      for (const file of files) {
        const compressed = await compressImage(file)
        localStorage.setItem(makeKey(itemType, itemId), compressed)
      }
      refresh()
    } catch (err) {
      alert('Could not save photo — storage may be full. Try deleting some old photos.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleDelete = (key, e) => {
    e.stopPropagation()
    if (!window.confirm('Remove this photo?')) return
    localStorage.removeItem(key)
    refresh()
    if (lightbox?.key === key) setLightbox(null)
  }

  const openLightbox = (photo, idx) => {
    setLightbox(photo)
    setLightboxIdx(idx)
  }

  const lightboxNav = (dir) => {
    const next = lightboxIdx + dir
    if (next < 0 || next >= photos.length) return
    setLightbox(photos[next])
    setLightboxIdx(next)
  }

  return (
    <div className="photo-manager">
      <div className="photo-manager-header">
        <div className="detail-block-title">📸 My Photos ({photos.length})</div>
        <button
          className="photo-add-btn"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? 'Saving…' : '+ Add Photos'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          style={{ display: 'none' }}
          onChange={handleFiles}
        />
      </div>

      {photos.length === 0 ? (
        <div className="photo-empty" onClick={() => fileRef.current?.click()}>
          <span style={{ fontSize: '1.6rem' }}>📷</span>
          <span>Tap to add photos — multiple allowed</span>
        </div>
      ) : (
        <div className="photo-grid">
          {photos.map((p, idx) => (
            <div key={p.key} className="photo-thumb" onClick={() => openLightbox(p, idx)}>
              <img src={p.data} alt={`${itemName} ${p.year}`} />
              <div className="photo-thumb-year">{p.year}</div>
              <button className="photo-thumb-delete" onClick={e => handleDelete(p.key, e)}>✕</button>
            </div>
          ))}
          <div className="photo-thumb photo-add-thumb" onClick={() => fileRef.current?.click()}>
            <span>＋</span>
            <span style={{ fontSize: '0.7rem' }}>Add</span>
          </div>
        </div>
      )}

      {/* Lightbox with prev/next navigation */}
      {lightbox && (
        <div className="photo-lightbox" onClick={() => setLightbox(null)}>
          <div className="photo-lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="photo-lightbox-close" onClick={() => setLightbox(null)}>✕</button>

            {/* Prev / Next */}
            {photos.length > 1 && (
              <>
                <button className="photo-lightbox-nav prev" onClick={() => lightboxNav(-1)} disabled={lightboxIdx === 0}>‹</button>
                <button className="photo-lightbox-nav next" onClick={() => lightboxNav(1)}  disabled={lightboxIdx === photos.length - 1}>›</button>
              </>
            )}

            <img src={lightbox.data} alt="" className="photo-lightbox-img" />
            <div className="photo-lightbox-meta">
              {itemName} · {lightbox.year}
              {photos.length > 1 && <span style={{ opacity: 0.5, marginLeft: 8 }}>{lightboxIdx + 1} / {photos.length}</span>}
            </div>
            <button
              className="photo-lightbox-delete"
              onClick={() => { localStorage.removeItem(lightbox.key); refresh(); setLightbox(null) }}
            >
              🗑 Delete photo
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
