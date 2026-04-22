// ============================================================
// TRANSPORTATION DATA — Disney World & Universal Orlando
// ============================================================

// ── LOCATIONS ─────────────────────────────────────────────────
export const DISNEY_LOCATIONS = {
  // Parks
  'mk':  { name: 'Magic Kingdom',        emoji: '🏰', type: 'park' },
  'ep':  { name: 'EPCOT',                emoji: '🌍', type: 'park' },
  'hs':  { name: 'Hollywood Studios',    emoji: '🎬', type: 'park' },
  'ak':  { name: 'Animal Kingdom',       emoji: '🦁', type: 'park' },
  // Transport hubs
  'ttc': { name: 'Ticket & Transportation Center (TTC)', emoji: '🚉', type: 'hub' },
  'ds':  { name: 'Disney Springs',       emoji: '🛍️', type: 'hub' },
  // Resorts by area
  'grand-floridian':    { name: 'Grand Floridian',     emoji: '🏰', type: 'resort', area: 'mk' },
  'polynesian':         { name: 'Polynesian Village',  emoji: '🌺', type: 'resort', area: 'mk' },
  'contemporary':       { name: 'Contemporary',        emoji: '🔷', type: 'resort', area: 'mk' },
  'wilderness-lodge':   { name: 'Wilderness Lodge',    emoji: '🌲', type: 'resort', area: 'mk' },
  'beach-club':         { name: 'Beach Club',          emoji: '⛱️', type: 'resort', area: 'ep' },
  'yacht-club':         { name: 'Yacht Club',          emoji: '⚓', type: 'resort', area: 'ep' },
  'boardwalk':          { name: 'BoardWalk Inn',       emoji: '🎡', type: 'resort', area: 'ep' },
  'caribbean-beach':    { name: 'Caribbean Beach',     emoji: '🏝️', type: 'resort', area: 'ep' },
  'pop-century':        { name: 'Pop Century',         emoji: '🎸', type: 'resort', area: 'ep' },
  'art-of-animation':   { name: 'Art of Animation',   emoji: '🎨', type: 'resort', area: 'ep' },
  'animal-kingdom-lodge': { name: 'Animal Kingdom Lodge', emoji: '🦒', type: 'resort', area: 'ak' },
  'coronado-springs':   { name: 'Coronado Springs',   emoji: '🌵', type: 'resort', area: 'ak' },
  'port-orleans':       { name: 'Port Orleans',        emoji: '🎷', type: 'resort', area: 'ds' },
}

export const UNIVERSAL_LOCATIONS = {
  'usf':       { name: 'Universal Studios Florida',  emoji: '🎬', type: 'park' },
  'ioa':       { name: 'Islands of Adventure',       emoji: '⚓', type: 'park' },
  'eu':        { name: 'Epic Universe',              emoji: '✨', type: 'park' },
  'citywalk':  { name: 'CityWalk',                   emoji: '🏙️', type: 'hub' },
  'hard-rock': { name: 'Hard Rock Hotel',            emoji: '🎸', type: 'resort', tier: 'premier' },
  'portofino': { name: 'Portofino Bay',              emoji: '🇮🇹', type: 'resort', tier: 'premier' },
  'royal-pacific': { name: 'Royal Pacific',          emoji: '🌴', type: 'resort', tier: 'premier' },
  'sapphire-falls': { name: 'Sapphire Falls',        emoji: '💧', type: 'resort', tier: 'preferred' },
  'cabana-bay': { name: 'Cabana Bay',                emoji: '🏄', type: 'resort', tier: 'value' },
  'stella-nova': { name: 'Stella Nova',              emoji: '⭐', type: 'resort', tier: 'preferred' },
  'terra-luna': { name: 'Terra Luna',                emoji: '🌙', type: 'resort', tier: 'preferred' },
}

// ── TRANSPORT TYPES ───────────────────────────────────────────
export const TRANSPORT_ICONS = {
  monorail:  '🚝',
  boat:      '⛴️',
  bus:       '🚌',
  skyliner:  '🚡',
  walk:      '🚶',
  watertaxi: '🛥️',
  shuttle:   '🚐',
  rideshare: '🚕',
}

// ── DISNEY ROUTES ─────────────────────────────────────────────
// Key format: "origin→destination"
export const DISNEY_ROUTES = {

  // ── Magic Kingdom area ──
  'grand-floridian→mk': {
    time: '~5 min',
    options: [
      { method: 'monorail', steps: ['Walk to Grand Floridian monorail station', 'Take Resort Monorail direct to Magic Kingdom'], time: '5 min', tip: 'Fastest option. Runs until ~midnight.' },
      { method: 'boat', steps: ['Walk to Grand Floridian boat dock', 'Take ferry to Magic Kingdom dock'], time: '8 min', tip: 'More scenic, slightly slower.' },
    ],
  },
  'polynesian→mk': {
    time: '~5 min',
    options: [
      { method: 'monorail', steps: ['Walk to Polynesian monorail station', 'Take Resort Monorail one stop to Magic Kingdom'], time: '5 min', tip: 'One stop away. Very fast.' },
      { method: 'boat', steps: ['Walk to Polynesian boat dock', 'Short ferry to Magic Kingdom'], time: '8 min', tip: 'Beautiful views of the castle.' },
      { method: 'walk', steps: ['Walk the path from Polynesian to Magic Kingdom (via TTC)', 'Cross the walkway bridge'], time: '15 min', tip: 'Only practical if monorail is down.' },
    ],
  },
  'contemporary→mk': {
    time: '~2 min',
    options: [
      { method: 'monorail', steps: ['Take Resort Monorail from Contemporary (passes through the building)', 'One stop to Magic Kingdom'], time: '4 min', tip: 'The monorail passes through the hotel — board on the 4th floor.' },
      { method: 'walk', steps: ['Walk the footpath from Contemporary to Magic Kingdom entrance'], time: '10 min', tip: '⭐ Best option. Fastest route to MK from any resort. No wait required.' },
    ],
  },
  'wilderness-lodge→mk': {
    time: '~20 min',
    options: [
      { method: 'boat', steps: ['Walk to Wilderness Lodge boat dock', 'Take scenic boat to Magic Kingdom'], time: '20 min', tip: 'Beautiful scenic ride through Bay Lake. Worth doing at least once.' },
      { method: 'bus', steps: ['Take Disney bus from Wilderness Lodge to Magic Kingdom'], time: '15-25 min', tip: 'Faster in theory but includes bus wait time.' },
    ],
  },
  'ttc→mk': {
    time: '~12 min',
    options: [
      { method: 'monorail', steps: ['Board Express Monorail at TTC', 'Direct to Magic Kingdom'], time: '8 min', tip: 'The TTC is where you park — Express Monorail goes straight to MK.' },
      { method: 'boat', steps: ['Board the large ferry at TTC', 'Scenic crossing to Magic Kingdom'], time: '12 min', tip: 'The ferry holds 600+ people. Great experience, especially for first-timers.' },
    ],
  },
  'grand-floridian→ep': {
    time: '~18 min',
    options: [
      { method: 'monorail', steps: ['Take Resort Monorail toward Magic Kingdom', 'Transfer at TTC to EPCOT Monorail', 'Ride to EPCOT'], time: '22 min', tip: 'Requires transfer at TTC. Account for wait time.' },
      { method: 'bus', steps: ['Take Disney bus from Grand Floridian to EPCOT'], time: '20-30 min', tip: 'Often faster than the monorail transfer route.' },
    ],
  },

  // ── EPCOT area ──
  'beach-club→ep': {
    time: '~5 min',
    options: [
      { method: 'walk', steps: ['Walk from Beach Club through the International Gateway gate into EPCOT'], time: '5 min', tip: '⭐ Best perk of this resort. Back gate is 5 minutes from your room to World Showcase.' },
    ],
  },
  'yacht-club→ep': {
    time: '~5 min',
    options: [
      { method: 'walk', steps: ['Walk from Yacht Club through the International Gateway into EPCOT'], time: '5 min', tip: 'Same access as Beach Club — direct to World Showcase back entrance.' },
    ],
  },
  'boardwalk→ep': {
    time: '~7 min',
    options: [
      { method: 'walk', steps: ['Walk the BoardWalk path to EPCOT International Gateway'], time: '7 min', tip: 'Slightly longer walk than Beach/Yacht but still very fast.' },
    ],
  },
  'caribbean-beach→ep': {
    time: '~10 min',
    options: [
      { method: 'skyliner', steps: ['Board Disney Skyliner at Caribbean Beach hub', 'Ride to EPCOT International Gateway station'], time: '10 min', tip: '⭐ The Skyliner is a delight — open gondolas, great views, no wait most times.' },
    ],
  },
  'pop-century→ep': {
    time: '~15 min',
    options: [
      { method: 'skyliner', steps: ['Walk to Pop Century/Art of Animation Skyliner station', 'Transfer at Caribbean Beach hub', 'Ride to EPCOT'], time: '15 min', tip: 'One transfer but still scenic and enjoyable. Skip the morning rush.' },
    ],
  },
  'art-of-animation→ep': {
    time: '~15 min',
    options: [
      { method: 'skyliner', steps: ['Walk to Art of Animation Skyliner station (shared with Pop Century)', 'Transfer at Caribbean Beach hub', 'Ride to EPCOT'], time: '15 min', tip: 'Same Skyliner station as Pop Century.' },
    ],
  },

  // ── Hollywood Studios ──
  'beach-club→hs': {
    time: '~15 min',
    options: [
      { method: 'walk', steps: ['Walk the path from Beach Club to Hollywood Studios entrance (through BoardWalk area)'], time: '20 min', tip: 'Walkable but it\'s 20 minutes. The scenic route along the water is pleasant.' },
      { method: 'boat', steps: ['Take the Friendship Boat from Beach Club dock to Hollywood Studios'], time: '12 min', tip: '⭐ The boat is faster and more relaxing than walking.' },
    ],
  },
  'caribbean-beach→hs': {
    time: '~10 min',
    options: [
      { method: 'skyliner', steps: ['Board Skyliner at Caribbean Beach hub', 'Take the Hollywood Studios branch direct'], time: '10 min', tip: 'Direct Skyliner line — no transfer needed.' },
    ],
  },
  'pop-century→hs': {
    time: '~18 min',
    options: [
      { method: 'skyliner', steps: ['Walk to Pop Century station', 'Transfer at Caribbean Beach', 'Take Hollywood Studios branch'], time: '18 min', tip: 'One transfer at Caribbean Beach.' },
    ],
  },

  // ── Animal Kingdom ──
  'animal-kingdom-lodge→ak': {
    time: '~15 min',
    options: [
      { method: 'bus', steps: ['Take Disney bus from Animal Kingdom Lodge to Animal Kingdom park'], time: '15 min', tip: 'Bus only — no other option from AKL. First bus usually runs 1.5 hours before park open.' },
    ],
  },

  // ── Disney Springs ──
  'port-orleans→ds': {
    time: '~20 min',
    options: [
      { method: 'boat', steps: ['Walk to Port Orleans boat dock', 'Take the scenic boat to Disney Springs'], time: '20 min', tip: '⭐ One of the most pleasant transit experiences at Disney World. Highly recommended over the bus.' },
      { method: 'bus', steps: ['Take Disney bus from Port Orleans to Disney Springs'], time: '15 min', tip: 'Faster but far less charming than the boat.' },
    ],
  },

  // ── Cross-resort ──
  'mk→ep': {
    time: '~20 min',
    options: [
      { method: 'monorail', steps: ['Board EPCOT Monorail at Magic Kingdom station (inside park)', 'Transfer at TTC to EPCOT Monorail', 'Ride to EPCOT'], time: '20 min', tip: 'Note: MK monorail station is inside the park — you need park admission.' },
      { method: 'bus', steps: ['Take Disney bus from Magic Kingdom to EPCOT'], time: '20-30 min', tip: 'Direct route. Check My Disney Experience for next departure.' },
    ],
  },
  'mk→hs': {
    time: '~25 min',
    options: [
      { method: 'bus', steps: ['Take Disney bus from Magic Kingdom to Hollywood Studios'], time: '25-35 min', tip: 'Bus only route. Buses run every 20 min; check the app for timing.' },
    ],
  },
  'ep→hs': {
    time: '~12 min',
    options: [
      { method: 'boat', steps: ['Walk to EPCOT International Gateway Friendship Boat dock', 'Take Friendship Boat to Hollywood Studios'], time: '12 min', tip: '⭐ Beautiful lagoon route. Runs continuously during park hours.' },
      { method: 'walk', steps: ['Walk the Crescent Lake path from EPCOT International Gateway area to Hollywood Studios entrance'], time: '25 min', tip: 'Walkable if you don\'t mind 25 minutes.' },
    ],
  },
  'ep→mk': {
    time: '~18 min',
    options: [
      { method: 'monorail', steps: ['Take EPCOT Monorail from EPCOT station', 'Transfer at TTC', 'Take Resort Monorail or Ferry to Magic Kingdom'], time: '18 min', tip: 'Scenic route through the EPCOT monorail loop.' },
      { method: 'bus', steps: ['Take Disney bus from EPCOT to Magic Kingdom'], time: '20-30 min', tip: 'Direct bus. Often faster than the monorail transfer.' },
    ],
  },
  'hs→ep': {
    time: '~12 min',
    options: [
      { method: 'boat', steps: ['Walk to Hollywood Studios Friendship Boat dock', 'Take Friendship Boat to EPCOT International Gateway'], time: '12 min', tip: '⭐ Fantastic scenic ride. Multiple boats run on this route.' },
      { method: 'skyliner', steps: ['Walk to HS Skyliner station', 'Ride to Caribbean Beach', 'Transfer to EPCOT branch'], time: '20 min', tip: 'Requires Skyliner transfer but still pleasant.' },
    ],
  },
  'ak→mk': {
    time: '~30 min',
    options: [
      { method: 'bus', steps: ['Take Disney bus from Animal Kingdom to Magic Kingdom'], time: '30 min', tip: 'Bus only. Plan 30-40 minutes including wait.' },
    ],
  },
}

// ── UNIVERSAL ROUTES ──────────────────────────────────────────
export const UNIVERSAL_ROUTES = {

  'hard-rock→usf': {
    time: '~7 min',
    options: [
      { method: 'walk', steps: ['Follow the walking path from Hard Rock Hotel to CityWalk', 'Enter Universal Studios Florida from CityWalk'], time: '7 min', tip: '⭐ Hard Rock is the closest hotel to both parks — walking is almost always fastest.' },
      { method: 'watertaxi', steps: ['Take water taxi from Hard Rock dock to CityWalk'], time: '10 min', tip: 'More scenic but slower than walking.' },
    ],
  },
  'hard-rock→ioa': {
    time: '~8 min',
    options: [
      { method: 'walk', steps: ['Walk from Hard Rock Hotel through CityWalk to Islands of Adventure entrance'], time: '8 min', tip: 'All three Premier hotels are within easy walking distance of both parks.' },
    ],
  },
  'portofino→usf': {
    time: '~15 min',
    options: [
      { method: 'watertaxi', steps: ['Walk to Portofino Bay dock', 'Take water taxi to CityWalk', 'Walk to Universal Studios Florida entrance'], time: '15 min', tip: '⭐ The water taxi from Portofino is a beautiful 15-minute ride through the resort lagoon.' },
      { method: 'walk', steps: ['Walk the path from Portofino Bay to CityWalk', 'Enter Universal Studios Florida'], time: '20 min', tip: 'Walkable but the water taxi is more pleasant.' },
    ],
  },
  'portofino→ioa': {
    time: '~15 min',
    options: [
      { method: 'watertaxi', steps: ['Water taxi from Portofino to CityWalk', 'Walk to IOA entrance'], time: '15 min', tip: 'Same water taxi as USF — just walk in the other direction from CityWalk.' },
    ],
  },
  'royal-pacific→usf': {
    time: '~10 min',
    options: [
      { method: 'walk', steps: ['Walk the Royal Pacific bridge path to CityWalk', 'Enter Universal Studios Florida'], time: '10 min', tip: 'Royal Pacific has a dedicated walking bridge — very quick.' },
      { method: 'watertaxi', steps: ['Water taxi from Royal Pacific dock to CityWalk'], time: '12 min', tip: 'Scenic alternative to walking.' },
    ],
  },
  'cabana-bay→eu': {
    time: '~10 min',
    options: [
      { method: 'walk', steps: ['Walk the dedicated path from Cabana Bay to Epic Universe entrance'], time: '10 min', tip: '⭐ Cabana Bay\'s biggest perk — the only hotel within walking distance of Epic Universe. Huge strategic advantage.' },
      { method: 'shuttle', steps: ['Take Cabana Bay shuttle to Epic Universe'], time: '8 min', tip: 'Shuttle also available if you don\'t want to walk.' },
    ],
  },
  'cabana-bay→usf': {
    time: '~15 min',
    options: [
      { method: 'shuttle', steps: ['Take Cabana Bay shuttle to CityWalk/Universal main entrance'], time: '15 min', tip: 'Shuttle runs frequently during park hours. Check with the front desk for schedule.' },
    ],
  },
  'stella-nova→eu': {
    time: '~8 min',
    options: [
      { method: 'walk', steps: ['Walk the path from Stella Nova to Epic Universe entrance'], time: '8 min', tip: '⭐ Stella Nova was built specifically to serve Epic Universe guests. Short walk.' },
      { method: 'shuttle', steps: ['Take Stella Nova shuttle to Epic Universe'], time: '5 min', tip: 'Even faster by shuttle.' },
    ],
  },
  'terra-luna→eu': {
    time: '~8 min',
    options: [
      { method: 'walk', steps: ['Walk from Terra Luna to Epic Universe entrance'], time: '8 min', tip: 'Companion hotel to Stella Nova — same proximity to Epic Universe.' },
    ],
  },
  'sapphire-falls→usf': {
    time: '~12 min',
    options: [
      { method: 'watertaxi', steps: ['Take water taxi from Sapphire Falls dock to CityWalk', 'Walk to park entrance'], time: '12 min', tip: 'Sapphire Falls connects to the water taxi network.' },
      { method: 'shuttle', steps: ['Take shuttle from Sapphire Falls to main Universal entrance'], time: '10 min', tip: 'Shuttle is often faster. Runs on fixed schedule.' },
    ],
  },
  'usf→ioa': {
    time: '~5 min',
    options: [
      { method: 'walk', steps: ['Walk through CityWalk from USF exit to IOA entrance'], time: '5 min', tip: 'The two parks share a CityWalk entrance — just walk through.' },
    ],
  },
  'usf→eu': {
    time: '~20 min',
    options: [
      { method: 'shuttle', steps: ['Take Universal shuttle from USF to Epic Universe (runs between parks)'], time: '20 min', tip: 'Shuttle service runs between all Universal parks during operating hours.' },
    ],
  },
  'ioa→eu': {
    time: '~20 min',
    options: [
      { method: 'shuttle', steps: ['Take Universal shuttle from IOA to Epic Universe'], time: '20 min', tip: 'Same inter-park shuttle service.' },
    ],
  },
}

// ── TRANSPORT GUIDE — Disney World ───────────────────────────
export const DISNEY_TRANSPORT_GUIDE = [
  {
    type: 'monorail',
    icon: '🚝',
    name: 'Monorail',
    color: '#60a5fa',
    description: 'Disney World\'s iconic elevated rail system. Two lines: the Resort line connecting MK-area hotels and the EPCOT line. Both meet at the Ticket & Transportation Center (TTC).',
    routes: [
      { from: 'Grand Floridian', to: 'Magic Kingdom', note: 'Direct — 5 min' },
      { from: 'Polynesian', to: 'Magic Kingdom', note: 'Direct — 5 min' },
      { from: 'Contemporary', to: 'Magic Kingdom', note: 'Through the building — 4 min' },
      { from: 'TTC', to: 'EPCOT', note: 'Express line — 12 min' },
    ],
    tips: [
      'Last monorail runs approximately 1 hour after park close — don\'t cut it close',
      'Express Monorail (TTC → EPCOT) runs on a separate track and doesn\'t stop at MK-area hotels',
      'The Resort Monorail stops at Grand Floridian, Polynesian, and Contemporary before reaching MK',
    ],
  },
  {
    type: 'boat',
    icon: '⛴️',
    name: 'Boats & Ferries',
    color: '#34d399',
    description: 'Multiple boat routes across Disney property. The large TTC ferry holds 600+ guests and crosses the Seven Seas Lagoon to Magic Kingdom. Friendship Boats serve the EPCOT resort area.',
    routes: [
      { from: 'TTC', to: 'Magic Kingdom', note: 'Large ferry — 12 min' },
      { from: 'EPCOT (Intl Gateway)', to: 'Hollywood Studios', note: 'Friendship Boat — 12 min' },
      { from: 'Beach/Yacht Club', to: 'Hollywood Studios', note: 'Friendship Boat — 12 min' },
      { from: 'Port Orleans', to: 'Disney Springs', note: 'Scenic river boat — 20 min' },
      { from: 'Wilderness Lodge', to: 'Magic Kingdom', note: 'Bay Lake ferry — 20 min' },
    ],
    tips: [
      'Friendship Boats serving the EPCOT area run continuously — typically only a 5–10 min wait',
      'The large TTC ferry is the most scenic way to arrive at Magic Kingdom for the first time',
      'Port Orleans → Disney Springs boat only runs seasonally — check before planning around it',
    ],
  },
  {
    type: 'skyliner',
    icon: '🚡',
    name: 'Disney Skyliner',
    color: '#f0b429',
    description: 'Aerial gondola system opened in 2019. Caribbean Beach is the main hub with two branches: one to EPCOT International Gateway and one to Hollywood Studios.',
    routes: [
      { from: 'Caribbean Beach', to: 'EPCOT', note: 'Direct — 10 min' },
      { from: 'Caribbean Beach', to: 'Hollywood Studios', note: 'Direct — 10 min' },
      { from: 'Pop Century / Art of Animation', to: 'Caribbean Beach hub', note: 'Transfer to EPCOT or HS — 15 min total' },
    ],
    tips: [
      'Gondolas run continuously — rarely more than a 2-min wait outside peak hours',
      'Closes in lightning or high winds — always have a backup plan on stormy days',
      'Open gondola design means no AC — hot in Florida summer midday. Worth it for the views',
      'First gondola typically departs 30 min before park open — good for rope drop',
    ],
  },
  {
    type: 'bus',
    icon: '🚌',
    name: 'Disney Bus',
    color: '#a78bfa',
    description: 'The backbone of Disney transportation. Every resort connects to every park and Disney Springs via dedicated bus routes. Runs from 1 hour before park open to 1 hour after park close.',
    routes: [
      { from: 'Any Disney Resort', to: 'Any Disney Park', note: 'Direct routes — 15-35 min' },
      { from: 'Any Disney Resort', to: 'Disney Springs', note: 'Direct — 15-25 min' },
    ],
    tips: [
      'Buses run every 20 minutes on most routes — check My Disney Experience for real-time arrivals',
      'The first bus of the day runs 1 hour before park open — arrive at the bus stop 5 min early',
      'Last bus runs 1 hour after park close — late-night dining guests should confirm timing',
      'Direct park-to-park buses exist (e.g., MK → EPCOT) — you don\'t need to return to your resort first',
      'Bus waits after park close can be 30-45 min on busy nights — Uber/Lyft is often faster',
    ],
  },
  {
    type: 'walk',
    icon: '🚶',
    name: 'Walking Routes',
    color: '#10b981',
    description: 'Several Disney destinations are within walking distance of each other. Often the fastest option when available.',
    routes: [
      { from: 'Contemporary', to: 'Magic Kingdom', note: '10 min walk — fastest MK transit' },
      { from: 'Beach/Yacht/BoardWalk', to: 'EPCOT', note: '5–7 min to International Gateway' },
      { from: 'Beach/Yacht/BoardWalk', to: 'Hollywood Studios', note: '20-25 min along Crescent Lake' },
      { from: 'EPCOT (Intl Gateway)', to: 'Hollywood Studios', note: '25 min via Crescent Lake path' },
    ],
    tips: [
      'The Contemporary → Magic Kingdom walk is the single best transit value on Disney property',
      'The Crescent Lake boardwalk between EPCOT-area resorts is beautiful at night',
      'Beach Club → EPCOT back gate is consistently 5 minutes — easier than any bus or boat',
    ],
  },
  {
    type: 'rideshare',
    icon: '🚕',
    name: 'Rideshare & Taxi',
    color: '#f97316',
    description: 'Uber, Lyft, and the Disney-partnered Minnie Van service (Lyft, higher cost) operate throughout property.',
    routes: [],
    tips: [
      'Designated Uber/Lyft pickup zones exist at every park — find them in the app before walking aimlessly',
      'Minnie Van (Disney\'s branded Lyft service) can transport oversized strollers and scooters — worth it for accessibility needs',
      'After major park close events, rideshare surge pricing is significant — book early or wait 20 min',
      'From Disney Springs to any park is typically $8-15 by Uber — often faster than the bus',
    ],
  },
]

// ── TRANSPORT GUIDE — Universal ───────────────────────────────
export const UNIVERSAL_TRANSPORT_GUIDE = [
  {
    type: 'walk',
    icon: '🚶',
    name: 'Walking',
    color: '#10b981',
    description: 'The primary transit option for Universal on-site guests. Premier hotels (Hard Rock, Portofino, Royal Pacific) are all within a short walk of both USF and IOA via CityWalk.',
    routes: [
      { from: 'Hard Rock Hotel', to: 'USF / IOA', note: '7–8 min via CityWalk' },
      { from: 'Royal Pacific', to: 'USF / IOA', note: '10 min via dedicated bridge' },
      { from: 'Portofino Bay', to: 'USF / IOA', note: '15-20 min or water taxi' },
      { from: 'Cabana Bay', to: 'Epic Universe', note: '10 min — walking path' },
      { from: 'Stella Nova / Terra Luna', to: 'Epic Universe', note: '8 min' },
    ],
    tips: [
      'The Royal Pacific walking bridge is direct and rarely crowded — use it over the water taxi in the morning',
      'Walking from USF to IOA through CityWalk takes about 5 minutes',
      'Cabana Bay\'s Epic Universe walking path is the most strategically valuable transit option at Universal in 2025-26',
    ],
  },
  {
    type: 'watertaxi',
    icon: '🛥️',
    name: 'Water Taxi',
    color: '#60a5fa',
    description: 'Boats connect Portofino Bay, Hard Rock Hotel, Royal Pacific, and Sapphire Falls to CityWalk. Scenic and enjoyable — though usually slower than walking from the closer hotels.',
    routes: [
      { from: 'Portofino Bay', to: 'CityWalk', note: '15 min scenic ride' },
      { from: 'Hard Rock Hotel', to: 'CityWalk', note: '10 min' },
      { from: 'Royal Pacific', to: 'CityWalk', note: '12 min' },
      { from: 'Sapphire Falls', to: 'CityWalk', note: '12 min' },
    ],
    tips: [
      'Water taxis run continuously from resort opening to park close',
      'Last water taxi back to Portofino runs about 1 hour after park close — confirm at the dock',
      'The Portofino water taxi is genuinely scenic — worth doing at least once even if you prefer walking',
    ],
  },
  {
    type: 'shuttle',
    icon: '🚐',
    name: 'Shuttle Bus',
    color: '#f59e0b',
    description: 'Shuttle service connects all on-site hotels to the main Universal entrance and to Epic Universe. Preferred and Value hotels rely on shuttles more than Premier hotels.',
    routes: [
      { from: 'Cabana Bay', to: 'USF / IOA main entrance', note: '15 min shuttle' },
      { from: 'Sapphire Falls', to: 'USF / IOA', note: '10 min shuttle' },
      { from: 'All on-site hotels', to: 'Epic Universe', note: '5-20 min depending on hotel' },
    ],
    tips: [
      'Shuttle schedules are posted at each hotel\'s transportation desk — check the night before',
      'First shuttle runs 1 hour before park open — arrive at the shuttle stop 10 min early on opening morning',
      'Epic Universe shuttles run from all hotels starting 90 min before park open during the first year',
    ],
  },
]


// ── DISNEYLAND RESORT LOCATIONS ──────────────────────────────
export const DISNEYLAND_LOCATIONS = {
  'disneyland-park':               { name: 'Disneyland Park',              emoji: '🌟', type: 'park' },
  'disney-california-adventure':   { name: 'Disney California Adventure',  emoji: '🎡', type: 'park' },
  'downtown-disney':               { name: 'Downtown Disney',              emoji: '🛍️', type: 'hub' },
  'grand-californian':             { name: 'Grand Californian Hotel',      emoji: '🌲', type: 'resort' },
  'disneyland-hotel':              { name: 'Disneyland Hotel',             emoji: '🌟', type: 'resort' },
  'pixar-place-hotel':             { name: 'Pixar Place Hotel',            emoji: '🎨', type: 'resort' },
}

export const DISNEYLAND_ROUTES = {
  'grand-californian→disneyland-park': {
    time: '~8 min',
    options: [
      { method: 'walk', steps: ['Exit Grand Californian through the Downtown Disney exit', 'Walk through Downtown Disney to Disneyland main entrance'], time: '8 min', tip: '⭐ Or use the private DCA gate inside the hotel for California Adventure.' },
    ],
  },
  'grand-californian→disney-california-adventure': {
    time: '~2 min',
    options: [
      { method: 'walk', steps: ['Use the Grand Californian private gate directly into Disney California Adventure — exclusive to hotel guests'], time: '2 min', tip: '⭐ The private DCA gate is the Grand Californian biggest perk. Skip the main entrance entirely.' },
    ],
  },
  'disneyland-park→disney-california-adventure': {
    time: '~5 min',
    options: [
      { method: 'walk', steps: ['Exit Disneyland through the main entrance', 'Walk across the Esplanade to DCA entrance'], time: '5 min', tip: 'The Esplanade connects both parks — straightforward park hop.' },
    ],
  },
  'disneyland-hotel→disneyland-park': {
    time: '~10 min',
    options: [
      { method: 'walk', steps: ['Walk from Disneyland Hotel through Downtown Disney', 'Enter Disneyland at the main entrance on Harbor Boulevard'], time: '10 min', tip: 'A pleasant walk through Downtown Disney. The monorail from Downtown Disney can shorten the walk.' },
    ],
  },
}

// ── UNIVERSAL HOLLYWOOD LOCATIONS ─────────────────────────────
export const UNIVERSAL_HOLLYWOOD_LOCATIONS = {
  'universal-studios-hollywood': { name: 'Universal Studios Hollywood', emoji: '🎬', type: 'park' },
  'citywalk-hollywood':          { name: 'CityWalk Hollywood',           emoji: '🏙️', type: 'hub' },
  'sheraton-universal':          { name: 'Sheraton Universal Hotel',     emoji: '🏨', type: 'resort' },
  'hilton-universal':            { name: 'Hilton Universal City',        emoji: '🌆', type: 'resort' },
}

export const UNIVERSAL_HOLLYWOOD_ROUTES = {
  'sheraton-universal→universal-studios-hollywood': {
    time: '~10 min',
    options: [
      { method: 'shuttle', steps: ['Board free Sheraton shuttle at hotel entrance', 'Shuttle drops at Universal Studios Hollywood entrance'], time: '10 min', tip: '⭐ Free shuttle is the recommended option — runs frequently during park hours.' },
      { method: 'walk', steps: ['Walk from Sheraton to Universal Studios entrance (uphill path)'], time: '12 min', tip: 'Walkable but includes an uphill section. Shuttle is usually preferable.' },
    ],
  },
  'hilton-universal→universal-studios-hollywood': {
    time: '~5 min',
    options: [
      { method: 'walk', steps: ['Walk from Hilton directly to CityWalk', 'Enter Universal Studios Hollywood from CityWalk'], time: '5 min', tip: '⭐ The Hilton direct walkway to CityWalk is its best feature — no shuttle needed.' },
    ],
  },
}

export const DISNEYLAND_TRANSPORT_GUIDE = [
  {
    type: 'walk',
    icon: '🚶',
    name: 'Walking',
    color: '#10b981',
    description: 'The Disneyland Resort is compact compared to Walt Disney World. Both parks, all three hotels, and Downtown Disney are within easy walking distance of each other.',
    routes: [
      { from: 'Grand Californian', to: 'DCA (private gate)', note: '2 min — private hotel entrance' },
      { from: 'Grand Californian', to: 'Disneyland Park', note: '8 min via Downtown Disney' },
      { from: 'Disneyland Hotel', to: 'Disneyland Park', note: '10 min via Downtown Disney' },
      { from: 'Disneyland Park', to: 'DCA', note: '5 min via the Esplanade' },
    ],
    tips: [
      'The Grand Californian private DCA entrance is the best transit advantage at the resort',
      'The Esplanade between the two parks makes park hopping easy — 5 minutes between entrances',
      'Downtown Disney is the pedestrian connection point for all three hotels and both parks',
    ],
  },
  {
    type: 'monorail',
    icon: '🚝',
    name: 'Disneyland Monorail',
    color: '#60a5fa',
    description: 'The original theme park monorail — opened in 1959. Runs between Tomorrowland in Disneyland Park and the Downtown Disney Monorail Station. A scenic way to enter or exit the park.',
    routes: [
      { from: 'Downtown Disney Station', to: 'Tomorrowland (inside Disneyland)', note: 'One-way entry to park — scenic 5 min' },
    ],
    tips: [
      'The Disneyland Monorail is a one-way system — it only enters the park, not exits',
      'Using the monorail to enter requires a park ticket — it drops you inside Tomorrowland',
      'The view from the monorail over the Matterhorn and castle is one of the best in the resort',
    ],
  },
  {
    type: 'rideshare',
    icon: '🚕',
    name: 'Rideshare & Parking',
    color: '#f97316',
    description: 'Uber and Lyft serve the Disneyland Resort. The Disneyland parking structure (Mickey & Friends) is the largest parking structure in the world. Trams connect the structure to the park.',
    routes: [],
    tips: [
      'Uber/Lyft pickup zone is on Harbor Boulevard — walk there rather than waiting inside the park gates',
      'Mickey & Friends parking structure uses a tram to the parks — add 15 minutes to your arrival plan',
      'The Toy Story parking lot requires a shuttle bus and is furthest from the parks',
      'Preferred parking (closer to trams) is available for a premium',
    ],
  },
]

export const UNIVERSAL_HOLLYWOOD_TRANSPORT_GUIDE = [
  {
    type: 'walk',
    icon: '🚶',
    name: 'Walking',
    color: '#10b981',
    description: 'Universal Studios Hollywood is more compact than Universal Orlando. The Hilton is directly connected to CityWalk. The Sheraton is a short shuttle or uphill walk away.',
    routes: [
      { from: 'Hilton Universal City', to: 'Universal Studios Hollywood', note: '5 min via CityWalk' },
      { from: 'Sheraton Universal', to: 'Park entrance', note: '12 min (uphill) or take free shuttle' },
    ],
    tips: [
      'The Hilton CityWalk connection is the most convenient hotel-to-park transit at Universal Hollywood',
      'The walk from the parking structure includes escalators — helpful for the hillside park layout',
    ],
  },
  {
    type: 'shuttle',
    icon: '🚐',
    name: 'Hotel Shuttles',
    color: '#f59e0b',
    description: 'The Sheraton Universal offers a free shuttle to the park entrance. Runs throughout park operating hours.',
    routes: [
      { from: 'Sheraton Universal', to: 'Universal Studios Hollywood', note: 'Free shuttle — 10 min' },
    ],
    tips: [
      'The Sheraton shuttle is free and frequent — use it instead of walking the uphill route',
      'Check shuttle schedule at the Sheraton concierge the night before — early morning times matter for rope drop',
    ],
  },
  {
    type: 'rideshare',
    icon: '🚕',
    name: 'Rideshare & Parking',
    color: '#f97316',
    description: 'Uber and Lyft serve Universal Studios Hollywood. The park has its own multi-level parking structure accessible from the 101 freeway.',
    routes: [],
    tips: [
      'Rideshare dropoff is at the CityWalk entrance — easiest access point',
      'The parking structure tram runs every few minutes during park hours',
      'Valet parking is available at the park entrance for a premium',
      'The 101 freeway Universal City exit is the primary driving route',
    ],
  },
]
