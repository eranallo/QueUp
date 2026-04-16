// ============================================================
// PHOTO MANAGER — Upload, store, and display photos per item
// Uses localStorage with canvas compression (~50KB per photo)
// Keyed by: `photo_{itemType}_{itemId}_{year}`
// ============================================================
import { useState, useRef } from 'react'

const MAX_DIMENSION = 800
const JPEG_QUALITY  = 0.7

function compressImage(file) {
  return new Promise((resolve) => {
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
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

function storageKey(itemType, itemId, year) {
  return `photo_${itemType}_${itemId}_${year}`
}

function loadPhotos(itemType, itemId) {
  const out = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith(`photo_${itemType}_${itemId}_`)) {
      const year  = key.split('_').pop()
      const data  = localStorage.getItem(key)
      if (data) out.push({ year, key, data })
    }
  }
  return out.sort((a, b) => b.year.localeCompare(a.year))
}

function deletePhoto(key) {
  localStorage.removeItem(key)
}

export default function PhotoManager({ itemType, itemId, itemName }) {
  const fileRef = useRef()
  const [photos, setPhotos] = useState(() => loadPhotos(itemType, itemId))
  const [uploading, setUploading] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const year = new Date().getFullYear().toString()

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const compressed = await compressImage(file)
      const key = storageKey(itemType, itemId, year)
      localStorage.setItem(key, compressed)
      setPhotos(loadPhotos(itemType, itemId))
    } catch (err) {
      alert('Could not save photo — storage may be full.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleDelete = (key, e) => {
    e.stopPropagation()
    if (!window.confirm('Remove this photo?')) return
    deletePhoto(key)
    setPhotos(loadPhotos(itemType, itemId))
    if (lightbox?.key === key) setLightbox(null)
  }

  return (
    <div className="photo-manager">
      <div className="photo-manager-header">
        <div className="detail-block-title">📸 My Photos</div>
        <button
          className="photo-add-btn"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? 'Saving…' : '+ Add Photo'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: 'none' }}
          onChange={handleFile}
        />
      </div>

      {photos.length === 0 ? (
        <div
          className="photo-empty"
          onClick={() => fileRef.current?.click()}
        >
          <span style={{ fontSize: '1.6rem' }}>📷</span>
          <span>Tap to add your first photo from {new Date().getFullYear()}</span>
        </div>
      ) : (
        <div className="photo-grid">
          {photos.map(p => (
            <div
              key={p.key}
              className="photo-thumb"
              onClick={() => setLightbox(p)}
            >
              <img src={p.data} alt={`${itemName} ${p.year}`} />
              <div className="photo-thumb-year">{p.year}</div>
              <button
                className="photo-thumb-delete"
                onClick={e => handleDelete(p.key, e)}
              >✕</button>
            </div>
          ))}
          <div
            className="photo-thumb photo-add-thumb"
            onClick={() => fileRef.current?.click()}
          >
            <span>＋</span>
            <span style={{ fontSize: '0.7rem' }}>{year}</span>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="photo-lightbox" onClick={() => setLightbox(null)}>
          <div className="photo-lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="photo-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.data} alt="" className="photo-lightbox-img" />
            <div className="photo-lightbox-meta">
              {itemName} · {lightbox.year}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
