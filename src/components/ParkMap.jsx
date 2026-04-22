// ============================================================
// PARK MAP V2 — Light tiles, floating controls, cleaner markers
// ============================================================
import { useEffect, useRef, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../App'
import { useResortData } from '../useResortData'
import { useLiveData } from '../context/LiveDataContext'

function useLeaflet() {
  const [ready, setReady] = useState(!!window.L)
  useEffect(() => {
    if (window.L) { setReady(true); return }
    const css    = document.createElement('link')
    css.rel      = 'stylesheet'
    css.href     = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
    document.head.appendChild(css)
    const script = document.createElement('script')
    script.src   = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
    script.onload = () => setReady(true)
    document.head.appendChild(script)
  }, [])
  return ready
}

const FILTERS = [
  { id: 'all',      label: 'All' },
  { id: 'mustdo',   label: '⭐ Must-Do' },
  { id: 'mypicks',  label: '❤️ My Picks' },
  { id: 'll',       label: '⚡ LL' },
  { id: 'ridden',   label: '✓ Ridden' },
  { id: 'notyet',   label: 'Not Yet' },
  { id: 'short',    label: '🟢 Under 20m' },
]

export default function ParkMap() {
  const { parkId }     = useParams()
  const navigate       = useNavigate()
  const leafletReady   = useLeaflet()
  const mapRef         = useRef(null)
  const mapInstance    = useRef(null)
  const markersRef     = useRef([])

  const { checkedRides, personalMustRide } = useApp()
  const { getParkCoords, getRideLive }     = useLiveData()
  const { parks: resortParks }             = useResortData()

  const [filter,   setFilter]   = useState('all')
  const [search,   setSearch]   = useState('')
  const [mapReady, setMapReady] = useState(false)
  const [markerCount, setMarkerCount] = useState(0)

  const park     = resortParks.find(p => p.id === parkId)
  const allRides = park ? park.lands.flatMap(l => l.rides) : []
  const coords   = getParkCoords(parkId)

  function getRideForCoord(coord) {
    return allRides.find(r => {
      const a = r.name.toLowerCase().replace(/[^a-z0-9]/g, '')
      const b = coord.nameLow.replace(/[^a-z0-9]/g, '')
      return a === b || a.includes(b.slice(0, 10)) || b.includes(a.slice(0, 10))
    })
  }

  // Init map — light CartoDB Positron tiles
  useEffect(() => {
    if (!leafletReady || !mapRef.current || coords.length === 0 || mapInstance.current) return
    const L = window.L

    const avgLat = coords.reduce((s, c) => s + c.lat, 0) / coords.length
    const avgLng = coords.reduce((s, c) => s + c.lng, 0) / coords.length

    const map = L.map(mapRef.current, {
      center: [avgLat, avgLng],
      zoom: 16,
      zoomControl: false,   // we'll add custom positioned controls
      attributionControl: false,
    })

    // ── Light readable tile layer ──
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map)

    // Attribution small + bottom-right
    L.control.attribution({ position: 'bottomright', prefix: false })
      .addAttribution('© <a href="https://carto.com">CARTO</a>')
      .addTo(map)

    // Zoom control top-right
    L.control.zoom({ position: 'topright' }).addTo(map)

    mapInstance.current = map
    setMapReady(true)

    return () => { map.remove(); mapInstance.current = null }
  }, [leafletReady, coords])

  // Build + update markers
  useEffect(() => {
    if (!mapReady || !mapInstance.current || coords.length === 0) return
    const L   = window.L
    const map = mapInstance.current

    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    const searchLow = search.toLowerCase().trim()
    let count = 0

    for (const coord of coords) {
      const ride     = getRideForCoord(coord)
      const live     = ride ? getRideLive(ride.name) : null
      const isRidden = ride ? checkedRides.has(ride.id) : false
      const isMyMust = ride ? personalMustRide.has(ride.id) : false
      const isLL     = !!ride?.lightningLane
      const isMustDo = !!ride?.mustDo
      const wait     = live?.waitTime
      const isDown   = live?.status === 'DOWN' || live?.status === 'CLOSED'
      const isRefurb = live?.status === 'REFURBISHMENT'

      // Filter logic
      if (filter === 'mustdo'  && !isMustDo)  continue
      if (filter === 'mypicks' && !isMyMust)  continue
      if (filter === 'll'      && !isLL)       continue
      if (filter === 'ridden'  && !isRidden)   continue
      if (filter === 'notyet'  && isRidden)    continue
      if (filter === 'short'   && (wait == null || wait >= 20 || isDown)) continue
      if (searchLow && !coord.name.toLowerCase().includes(searchLow)) continue

      // Marker color
      const color = isRefurb ? '#f59e0b'
        : isDown    ? '#ef4444'
        : isRidden  ? '#94a3b8'
        : wait == null ? (park?.accentColor || '#6366f1')
        : wait < 20    ? '#10b981'
        : wait < 45    ? '#f59e0b'
        : '#ef4444'

      // Text inside marker
      const innerText = isRidden  ? '✓'
        : isDown    ? '✕'
        : isRefurb  ? '🚧'
        : wait != null ? `${wait}`
        : ''

      const textColor = (color === '#10b981' || color === '#ef4444' || color === '#94a3b8') ? '#fff'
        : color === '#f59e0b' ? '#000'
        : '#fff'

      const markerSize = wait != null && wait >= 10 ? 36 : 28

      const icon = L.divIcon({
        className: '',
        html: `
          <div style="
            position:relative;
            width:${markerSize}px;height:${markerSize}px;
            background:${color};
            border-radius:50%;
            border:2.5px solid white;
            box-shadow:0 2px 10px rgba(0,0,0,0.3),0 0 0 1px ${color}55;
            display:flex;align-items:center;justify-content:center;
            cursor:pointer;
            ${isRidden ? 'opacity:0.55;' : ''}
            font-family:Nunito,sans-serif;
          ">
            ${isMyMust ? `<span style="position:absolute;top:-8px;right:-6px;font-size:12px;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.5))">❤️</span>` : ''}
            ${isLL && !isRidden ? `<span style="position:absolute;top:-8px;left:-4px;font-size:10px;background:#7c3aed;color:white;border-radius:8px;padding:1px 4px;font-weight:900;font-size:8px">⚡</span>` : ''}
            <span style="font-size:${wait != null && wait >= 10 ? '11' : '10'}px;font-weight:900;color:${textColor};line-height:1">${innerText}</span>
          </div>
        `,
        iconSize: [markerSize, markerSize],
        iconAnchor: [markerSize / 2, markerSize / 2],
        popupAnchor: [0, -(markerSize / 2 + 4)],
      })

      const marker = L.marker([coord.lat, coord.lng], { icon }).addTo(map)

      // Clean light-theme popup
      const popupContent = `
        <div style="font-family:Nunito,sans-serif;min-width:170px;padding:2px 0;">
          <div style="font-weight:900;font-size:0.9rem;color:#1e293b;margin-bottom:6px;line-height:1.3">${coord.name}</div>
          <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:6px">
            ${isMustDo ? '<span style="font-size:0.68rem;font-weight:800;color:#92400e;background:#fef3c7;padding:2px 7px;border-radius:20px">⭐ Must-Do</span>' : ''}
            ${isLL     ? '<span style="font-size:0.68rem;font-weight:800;color:#5b21b6;background:#ede9fe;padding:2px 7px;border-radius:20px">⚡ LL</span>' : ''}
            ${isMyMust ? '<span style="font-size:0.68rem;font-weight:800;color:#be185d;background:#fce7f3;padding:2px 7px;border-radius:20px">❤️ My Pick</span>' : ''}
          </div>
          ${isDown   ? '<div style="font-size:0.82rem;font-weight:800;color:#dc2626;margin-bottom:4px">🔴 Down / Closed</div>' : ''}
          ${isRefurb ? '<div style="font-size:0.82rem;font-weight:800;color:#d97706;margin-bottom:4px">🚧 Under Refurbishment</div>' : ''}
          ${wait != null && !isDown && !isRefurb
            ? `<div style="font-size:1rem;font-weight:900;color:${wait < 20 ? '#059669' : wait < 45 ? '#d97706' : '#dc2626'};margin-bottom:4px">${wait} min wait</div>`
            : ''}
          ${isRidden  ? '<div style="font-size:0.78rem;color:#64748b;margin-bottom:6px">✓ Already ridden</div>' : ''}
          ${ride ? `<a href="#" onclick="window.location.href='/ride/${ride.id}';return false;" style="display:inline-block;margin-top:2px;font-size:0.78rem;font-weight:800;color:#7c3aed;text-decoration:none;border:1px solid #ddd6fe;padding:4px 10px;border-radius:20px">View details →</a>` : ''}
        </div>
      `

      marker.bindPopup(popupContent, {
        maxWidth: 220,
        className: 'map-popup-light',
      })

      markersRef.current.push(marker)
      count++
    }

    setMarkerCount(count)
  }, [mapReady, filter, search, checkedRides, personalMustRide, coords])

  if (!park) return (
    <div style={{ padding: 24 }}>
      <button className="back-link" onClick={() => navigate(-1)}>← Back</button>
      <p>Park not found.</p>
    </div>
  )

  return (
    <div className="map-page-v2">
      {/* ── Compact top bar ── */}
      <div className="map-topbar">
        <button className="map-back-btn" onClick={() => navigate(-1)}>
          ← {park.name}
        </button>
        <div className="map-topbar-right">
          <span className="map-marker-count">{markerCount} locations</span>
        </div>
      </div>

      {/* ── Full-screen map ── */}
      <div className="map-fullscreen" ref={mapRef}>
        {!leafletReady && (
          <div className="map-overlay-loading">
            <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🗺️</div>
            <div style={{ fontWeight: 700 }}>Loading map…</div>
          </div>
        )}
        {leafletReady && coords.length === 0 && (
          <div className="map-overlay-loading">
            <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>📍</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Fetching locations…</div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Live GPS from ThemeParks.wiki</div>
          </div>
        )}

        {/* ── Floating search bar ── */}
        <div className="map-float-search">
          <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>🔍</span>
          <input
            className="map-float-input"
            placeholder="Search rides…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="map-float-clear" onClick={() => setSearch('')}>✕</button>
          )}
        </div>

        {/* ── Floating filter pills ── */}
        <div className="map-float-filters">
          {FILTERS.map(f => (
            <button
              key={f.id}
              className={`map-float-pill${filter === f.id ? ' on' : ''}`}
              onClick={() => setFilter(f.id)}
              style={filter === f.id ? { background: park.accentColor, borderColor: park.accentColor, color: park.accentColor === '#f0b429' ? '#000' : '#fff' } : {}}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Floating legend ── */}
        <div className="map-float-legend">
          <div className="map-legend-row"><span className="map-legend-dot" style={{ background: '#10b981' }} /> &lt;20m</div>
          <div className="map-legend-row"><span className="map-legend-dot" style={{ background: '#f59e0b' }} /> 20–45m</div>
          <div className="map-legend-row"><span className="map-legend-dot" style={{ background: '#ef4444' }} /> 45m+ / Down</div>
          <div className="map-legend-row"><span className="map-legend-dot" style={{ background: '#94a3b8' }} /> Ridden</div>
        </div>
      </div>
    </div>
  )
}
