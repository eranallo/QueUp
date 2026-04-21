// ============================================================
// PARK MAP — Leaflet.js with live GPS coords from ThemeParks.wiki
// ============================================================
import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { RESORTS } from '../data'
import { useApp } from '../App'
import { useLiveData } from '../context/LiveDataContext'

// Leaflet loaded via CDN in index.html — accessed as window.L
function useLeaflet() {
  const [ready, setReady] = useState(!!window.L)
  useEffect(() => {
    if (window.L) { setReady(true); return }
    const css   = document.createElement('link')
    css.rel     = 'stylesheet'
    css.href    = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
    document.head.appendChild(css)
    const script = document.createElement('script')
    script.src   = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
    script.onload = () => setReady(true)
    document.head.appendChild(script)
  }, [])
  return ready
}

const FILTER_OPTIONS = ['All', 'Rides', 'Must-Do', '❤️ My Picks', 'Lightning Lane', 'Ridden', 'Not Ridden']

export default function ParkMap() {
  const { parkId }  = useParams()
  const navigate    = useNavigate()
  const leafletReady = useLeaflet()
  const mapRef      = useRef(null)
  const mapInstance = useRef(null)
  const markersRef  = useRef([])

  const { checkedRides, personalMustRide } = useApp()
  const { getParkCoords, getRideLive }     = useLiveData()

  const [filter, setFilter]     = useState('All')
  const [search, setSearch]     = useState('')
  const [mapReady, setMapReady] = useState(false)

  // Find park info
  const park = RESORTS.flatMap(r => r.parks).find(p => p.id === parkId)
  const allRides = park ? park.lands.flatMap(l => l.rides) : []
  const coords   = getParkCoords(parkId)

  // Match our ride data to API coordinate entries
  function getRideForCoord(coord) {
    const nameLow = coord.nameLow
    return allRides.find(r => {
      const a = r.name.toLowerCase().replace(/[^a-z0-9]/g, '')
      const b = nameLow.replace(/[^a-z0-9]/g, '')
      return a === b || a.includes(b.slice(0, 10)) || b.includes(a.slice(0, 10))
    })
  }

  // Init map once Leaflet is ready and we have coords
  useEffect(() => {
    if (!leafletReady || !mapRef.current || coords.length === 0 || mapInstance.current) return
    const L = window.L

    // Center on average of all markers
    const avgLat = coords.reduce((s, c) => s + c.lat, 0) / coords.length
    const avgLng = coords.reduce((s, c) => s + c.lng, 0) / coords.length

    const map = L.map(mapRef.current, {
      center: [avgLat, avgLng],
      zoom: 16,
      zoomControl: true,
    })

    // Dark-themed tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CARTO',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map)

    mapInstance.current = map
    setMapReady(true)

    return () => {
      map.remove()
      mapInstance.current = null
    }
  }, [leafletReady, coords])

  // Add / update markers whenever filter/search/ridden state changes
  useEffect(() => {
    if (!mapReady || !mapInstance.current || coords.length === 0) return
    const L   = window.L
    const map = mapInstance.current

    // Clear old markers
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    const searchLow = search.toLowerCase()

    for (const coord of coords) {
      const ride    = getRideForCoord(coord)
      const live    = ride ? getRideLive(ride.name) : null
      const ridden  = ride ? checkedRides.has(ride.id) : false
      const isMyMust = ride ? personalMustRide.has(ride.id) : false
      const isLL    = ride?.lightningLane
      const isMustDo = ride?.mustDo
      const wait    = live?.waitTime
      const isDown  = live?.status === 'DOWN' || live?.status === 'CLOSED'

      // Apply filter
      if (filter === 'Rides' && coord.entityType !== 'ATTRACTION') continue
      if (filter === 'Must-Do' && !isMustDo) continue
      if (filter === '❤️ My Picks' && !isMyMust) continue
      if (filter === 'Lightning Lane' && !isLL) continue
      if (filter === 'Ridden' && !ridden) continue
      if (filter === 'Not Ridden' && ridden) continue

      // Apply search
      if (searchLow && !coord.name.toLowerCase().includes(searchLow)) continue

      // Pick dot color
      const dotColor = isDown ? '#ef4444'
        : ridden ? '#6b7280'
        : wait != null ? (wait < 20 ? '#10b981' : wait < 45 ? '#f59e0b' : '#ef4444')
        : park?.accentColor || '#f0b429'

      // Build wait badge label
      const badge = isDown ? '🔴' : wait != null ? `${wait}m` : ''

      // Custom icon
      const icon = L.divIcon({
        className: '',
        html: `
          <div style="
            position:relative;
            display:flex;align-items:center;justify-content:center;
            width:28px;height:28px;
            background:${dotColor};
            border-radius:50%;
            border:2px solid rgba(255,255,255,0.8);
            box-shadow:0 2px 8px rgba(0,0,0,0.5);
            cursor:pointer;
            transition:transform 0.15s;
            ${ridden ? 'opacity:0.5;' : ''}
          ">
            ${isMyMust ? '<span style="position:absolute;top:-6px;right:-4px;font-size:10px">❤️</span>' : ''}
            ${badge ? `<span style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.75);color:white;font-size:9px;font-weight:800;padding:1px 4px;border-radius:8px;white-space:nowrap">${badge}</span>` : ''}
            <span style="font-size:11px;font-weight:900;color:${dotColor === '#6b7280' ? '#ccc' : '#000'};">
              ${ridden ? '✓' : coord.entityType === 'ATTRACTION' ? '🎢' : '📍'}
            </span>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -18],
      })

      const marker = L.marker([coord.lat, coord.lng], { icon }).addTo(map)

      // Popup
      const popupHtml = `
        <div style="font-family:Nunito,sans-serif;min-width:160px;max-width:200px;">
          <div style="font-weight:800;font-size:0.9rem;margin-bottom:4px;color:#1a1a2e">${coord.name}</div>
          ${ride?.lightningLane ? '<span style="font-size:0.7rem;font-weight:800;color:#7c3aed;background:#ede9fe;padding:1px 6px;border-radius:10px;margin-right:4px">⚡ LL</span>' : ''}
          ${ride?.mustDo ? '<span style="font-size:0.7rem;font-weight:800;color:#b45309;background:#fef3c7;padding:1px 6px;border-radius:10px">⭐ Must-Do</span>' : ''}
          ${wait != null && !isDown ? `<div style="font-size:0.85rem;margin-top:6px;font-weight:700;color:${wait < 20 ? '#059669' : wait < 45 ? '#d97706' : '#dc2626'}">⏱ ${wait} min wait</div>` : ''}
          ${isDown ? '<div style="font-size:0.85rem;margin-top:6px;font-weight:700;color:#dc2626">🔴 Down / Closed</div>' : ''}
          ${ridden ? '<div style="font-size:0.8rem;margin-top:4px;color:#6b7280">✓ Ridden</div>' : ''}
          ${ride ? `<div style="margin-top:8px"><a href="/ride/${ride.id}" style="font-size:0.78rem;font-weight:800;color:#7c3aed;text-decoration:none">View details →</a></div>` : ''}
        </div>
      `
      marker.bindPopup(popupHtml, { maxWidth: 220 })
      markersRef.current.push(marker)
    }
  }, [mapReady, filter, search, checkedRides, personalMustRide, coords])

  if (!park) return <div className="park-page"><button className="back-link" onClick={() => navigate(-1)}>← Back</button><p>Park not found.</p></div>

  return (
    <div className="map-page animate-fade-in">
      <button className="back-link" onClick={() => navigate(-1)}>← Back to {park.name}</button>

      <div className="map-header">
        <h1 className="page-title">{park.emoji} {park.name} Map</h1>
        <p className="page-subtitle" style={{ marginBottom: 0 }}>
          Tap any marker to see wait times and details. Dots color-coded by wait: green &lt;20m · amber 20–45m · red 45m+
        </p>
      </div>

      {/* Search + filter */}
      <div className="map-controls">
        <div className="park-search-inner" style={{ marginBottom: 8 }}>
          <span className="park-search-icon">🔍</span>
          <input
            className="park-search-input"
            placeholder="Search rides on map…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className="park-search-clear" onClick={() => setSearch('')}>✕</button>}
        </div>
        <div className="map-filter-row">
          {FILTER_OPTIONS.map(f => (
            <button
              key={f}
              className={`filter-pill${filter === f ? ' on' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Map container */}
      <div className="map-container">
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
        {!leafletReady && (
          <div className="map-loading">
            <div className="empty-icon">🗺️</div>
            <div>Loading map…</div>
          </div>
        )}
        {leafletReady && coords.length === 0 && (
          <div className="map-loading">
            <div className="empty-icon">📍</div>
            <div>Fetching ride locations…</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>Coordinates come from ThemeParks.wiki API</div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="map-legend">
        <div className="map-legend-item"><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} /> &lt;20 min</div>
        <div className="map-legend-item"><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} /> 20–45 min</div>
        <div className="map-legend-item"><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} /> 45+ min / Down</div>
        <div className="map-legend-item"><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#6b7280', display: 'inline-block' }} /> Ridden</div>
        <div className="map-legend-item">❤️ My Pick</div>
      </div>
    </div>
  )
}
