// ============================================================
// RIDE HISTORY TIMELINES
// Each ride: { timeline[], formerAttraction, buildingHistory }
// Timeline event types: opening | refurb | closure | rename |
//   milestone | tragedy | replaced | darkperiod
// ============================================================

export const RIDE_HISTORY = {

  // ── MAGIC KINGDOM ────────────────────────────────────────

  'haunted-mansion': {
    formerAttraction: null,
    buildingHistory: 'The show building has stood since 1969 and is one of the oldest structures on Disney property. The iconic widow\'s peak facade was controversial during construction — early Florida residents complained it looked too morbid for a family park.',
    timeline: [
      { year: 1969, event: 'Haunted Mansion opens at Walt Disney World on October 1, the same day as Magic Kingdom. The attraction was already operational at Disneyland since 1969.', type: 'opening' },
      { year: 1971, event: 'Walt Disney World version opens to guests. Unlike Disneyland\'s version, WDW\'s Haunted Mansion features the iconic stretching room — because WDW\'s version is above ground (Disneyland\'s uses an elevator to go below street level).', type: 'milestone' },
      { year: 1988, event: 'Madame Leota\'s crystal ball receives significant audio and visual enhancements.', type: 'refurb' },
      { year: 1995, event: 'Interactive queue elements added to the outdoor graveyard area, turning the wait into its own experience.', type: 'refurb' },
      { year: 2007, event: 'Major rehab adds new special effects throughout, including enhanced hitchhiking ghost finale using digital projection.', type: 'refurb' },
      { year: 2011, event: 'New Attic scene featuring the Constance Hatchaway "Black Widow Bride" replaces the original bride sequence. New interactive queue opens featuring tombstone instruments and crypt puzzles.', type: 'refurb' },
      { year: 2023, event: 'Haunted Mansion (2023 film) premieres — though the attraction predates the film by 52 years.', type: 'milestone' },
    ],
  },

  'space-mountain': {
    formerAttraction: null,
    buildingHistory: 'The Space Mountain building is one of the most recognizable structures on Disney property. Designed by John Hench, the cone-shaped structure was controversial when proposed — many executives thought it was too stark and alien-looking. Walt Disney reportedly loved it.',
    timeline: [
      { year: 1975, event: 'Space Mountain opens at Magic Kingdom on January 15 — the first roller coaster at Walt Disney World. The opening was a massive event and the attraction immediately became the park\'s signature thrill ride.', type: 'opening' },
      { year: 1985, event: 'Original ride vehicles replaced. The classic yellow rockets are retired.', type: 'refurb' },
      { year: 1994, event: 'Major refurbishment updates the soundtrack and lighting throughout the attraction.', type: 'refurb' },
      { year: 2004, event: 'Space Mountain closes for a major 18-month overhaul. The track is completely reengineered, smoothing out many of the rougher elements while preserving the spirit of the original. New ride vehicles and effects installed.', type: 'refurb' },
      { year: 2009, event: 'Space Mountain reopens after the extended refurb. The new version is significantly smoother than the 1975 original.', type: 'opening' },
      { year: 2022, event: 'Limited refurbishments focus on lighting and sound systems.', type: 'refurb' },
    ],
  },

  'big-thunder-mountain': {
    formerAttraction: {
      name: 'The River Country water park area',
      years: 'N/A',
      note: 'Big Thunder Mountain was built in an area that was largely undeveloped. The theming draws from the red rock landscape of the American Southwest, inspired by the real Thunder Mesa concept Imagineers developed for a never-built Western park.',
    },
    buildingHistory: 'The mountain structure required over 650 tons of steel and the landscaping included over 20 transplanted California desert plants. The exterior rock work was sculpted by hand.',
    timeline: [
      { year: 1980, event: 'Big Thunder Mountain Railroad opens at Walt Disney World on November 15. The attraction is inspired by the unbuilt "Thunder Mesa" concept that would have been the centerpiece of a Western-themed park.', type: 'opening' },
      { year: 1987, event: 'Major enhancements add new audio-animatronic figures throughout the mine sequence.', type: 'refurb' },
      { year: 2003, event: 'A fatal accident at Disneyland\'s Big Thunder Mountain (identical design) prompts temporary closure and major safety inspections at all versions. WDW version undergoes structural review and modifications.', type: 'tragedy' },
      { year: 2012, event: 'WDW\'s Big Thunder Mountain closes for a major 18-month refurbishment — the longest closure in the ride\'s history. New effects, AA figures, and track work throughout.', type: 'refurb' },
      { year: 2014, event: 'Big Thunder Mountain reopens with dramatically enhanced effects including new audio, improved Mine scene, and all-new audio-animatronic figures.', type: 'opening' },
    ],
  },

  'pirates-caribbean-mk': {
    formerAttraction: null,
    buildingHistory: 'Pirates of the Caribbean at WDW opened with the park and was built simultaneously with the Disneyland original being completed. The WDW version is longer than its Disneyland counterpart and includes an additional battle scene.',
    timeline: [
      { year: 1971, event: 'Pirates of the Caribbean opens with Magic Kingdom on October 1. The WDW version is actually longer than the original Disneyland attraction, adding additional scenes and a longer boat journey.', type: 'opening' },
      { year: 2006, event: 'Jack Sparrow and Barbossa audio-animatronics added to the attraction following the success of the Pirates of the Caribbean film franchise. This was controversial — purists felt the film characters didn\'t belong in the pre-film attraction.', type: 'refurb' },
      { year: 2018, event: 'The "Redhead" character (formerly an auctioned woman) is changed to Redd, a female pirate who is now selling rum rather than being sold. A significant cultural update that generated debate.', type: 'refurb' },
      { year: 2023, event: 'New scenes and audio updates installed during a multi-month refurbishment.', type: 'refurb' },
    ],
  },

  'tomorrowland-speedway': {
    formerAttraction: {
      name: 'Grand Prix Raceway',
      years: '1971–1988',
      note: 'The attraction operated as the "Grand Prix Raceway" from 1971 until 1988, when it was renamed "Tomorrowland Speedway." The track layout has remained essentially unchanged since 1971.',
    },
    buildingHistory: 'One of the original Magic Kingdom attractions. The gas-powered cars were controversial because of their emissions — Disney has periodically studied converting the fleet to electric vehicles.',
    timeline: [
      { year: 1971, event: 'Grand Prix Raceway opens with Magic Kingdom as one of the original E-ticket attractions.', type: 'opening' },
      { year: 1988, event: 'Renamed "Tomorrowland Speedway" as part of a broader Tomorrowland theming refresh.', type: 'rename' },
      { year: 1999, event: 'Indy 500 sponsorship added, ride briefly called "Tomorrowland Indy Speedway."', type: 'rename' },
      { year: 2008, event: 'Returns to "Tomorrowland Speedway" name after Indy sponsorship ends.', type: 'rename' },
      { year: 2024, event: 'Disney announces plans to eventually convert the attraction, potentially replacing gas engines with electric vehicles or reimagining the space entirely. No confirmed timeline.', type: 'milestone' },
    ],
  },

  'seven-dwarfs-mine-train': {
    formerAttraction: {
      name: 'Snow White\'s Scary Adventures',
      years: '1971–2012',
      note: 'Seven Dwarfs Mine Train was built largely in the footprint of the former Snow White\'s Scary Adventures dark ride, which was one of the original Magic Kingdom attractions. The beloved but aging dark ride was demolished to make way for the new coaster.',
    },
    buildingHistory: 'The show building for Seven Dwarfs Mine Train is a marvel of engineering — it appears to be a small structure from outside Fantasyland, but the mine shaft descent and the indoor coaster section are housed in a massive show building concealed behind the berm.',
    timeline: [
      { year: 1971, event: 'Snow White\'s Scary Adventures opens as one of the original Magic Kingdom dark rides. Based on the 1937 film, it terrified generations of children with its depiction of the Evil Queen.', type: 'opening' },
      { year: 1994, event: 'Snow White\'s Scary Adventures refurbished — Snow White herself is finally added to the attraction (she wasn\'t featured prominently in the original version, which was from the witch\'s point of view).', type: 'refurb' },
      { year: 2012, event: 'Snow White\'s Scary Adventures closes permanently on May 31 to make way for Seven Dwarfs Mine Train. Many guests mourned the loss of an original attraction.', type: 'closure' },
      { year: 2014, event: 'Seven Dwarfs Mine Train opens on May 28 — the final piece of the New Fantasyland expansion. At the time it opened, it had a consistent 120+ minute wait time for its first year.', type: 'opening' },
    ],
  },

  'under-the-sea-journey-of-the-little-mermaid': {
    formerAttraction: {
      name: '20,000 Leagues Under the Sea: Submarine Voyage',
      years: '1971–1994',
      note: 'The lagoon that once housed 20,000 Leagues Under the Sea still exists adjacent to the Little Mermaid attraction. Some of the original show building infrastructure was repurposed. The distinctive lagoon was filled in and the submarines were sold or scrapped.',
    },
    buildingHistory: 'The Little Mermaid show building was built in the former 20,000 Leagues lagoon area during the New Fantasyland expansion.',
    timeline: [
      { year: 1971, event: '20,000 Leagues Under the Sea: Submarine Voyage opens — one of the most expensive original Magic Kingdom attractions. Guests board submarines and journey through an elaborate underwater show.', type: 'opening' },
      { year: 1994, event: '20,000 Leagues Under the Sea closes permanently on September 5. Disney cites maintenance costs as prohibitive. The submarine fleet is drained and eventually scrapped or sold. The lagoon sits abandoned for years.', type: 'closure' },
      { year: 2011, event: 'Construction begins on Under the Sea - Journey of the Little Mermaid as part of New Fantasyland.', type: 'milestone' },
      { year: 2012, event: 'Under the Sea - Journey of the Little Mermaid opens on December 6 in the former 20,000 Leagues area. The clamshell ride vehicles are deliberately evocative of the submarine experience.', type: 'opening' },
    ],
  },

  // ── EPCOT ───────────────────────────────────────────────

  'test-track': {
    formerAttraction: {
      name: 'World of Motion',
      years: '1982–1996',
      note: 'World of Motion was one of EPCOT\'s original corporate-sponsored attractions, presented by General Motors. The beloved attraction featured whimsical audio-animatronic scenes depicting the history of transportation. It was demolished for Test Track, which retained GM\'s sponsorship.',
    },
    buildingHistory: 'The massive Test Track building is one of the largest ride structures at Walt Disney World. The exterior high-speed section runs along what was the World of Motion show building exterior.',
    timeline: [
      { year: 1982, event: 'World of Motion opens with EPCOT Center on October 1. One of the most beloved original EPCOT attractions — lighthearted, funny, and optimistic. The finale "It\'s Fun to Be Free" becomes an EPCOT theme song.', type: 'opening' },
      { year: 1996, event: 'World of Motion closes on January 2, ending a beloved 14-year run. Many EPCOT veterans consider this one of the saddest losses in park history.', type: 'closure' },
      { year: 1999, event: 'Test Track opens after a troubled development. Originally scheduled to open in 1997, constant technical problems delay the attraction by nearly two years. When it finally opens, the outdoor speed section is a genuine thrill.', type: 'opening' },
      { year: 2012, event: 'Test Track closes and is completely reimagined. The automotive crash-testing theme is replaced by a "SIM" design-your-own-car experience. General Motors remains the sponsor.', type: 'refurb' },
      { year: 2012, event: 'Reimagined Test Track reopens in December with new theming, vehicles, and interactive queue.', type: 'opening' },
      { year: 2024, event: 'Test Track closes again for a significant reimagining. GM sponsorship ends. Future theming unconfirmed at time of writing.', type: 'closure' },
    ],
  },

  'guardians-cosmic-rewind': {
    formerAttraction: {
      name: 'Universe of Energy (Ellen\'s Energy Adventure)',
      years: '1982–2017',
      note: 'The Guardians building was purpose-built as a new structure adjacent to the former Universe of Energy pavilion, which was demolished. Universe of Energy featured Ellen DeGeneres and Bill Nye in a beloved but dated film/ride hybrid that explored the history of fossil fuels.',
    },
    buildingHistory: 'The Guardians of the Galaxy Cosmic Rewind building is an entirely new structure, but its exterior was designed to blend with the original EPCOT Center architecture.',
    timeline: [
      { year: 1982, event: 'Universe of Energy opens with EPCOT Center — one of the original Future World attractions sponsored by ExxonMobil.', type: 'opening' },
      { year: 1996, event: 'Universe of Energy reimagined as "Ellen\'s Energy Adventure" featuring Ellen DeGeneres, Bill Nye the Science Guy, and Alex Trebek. Despite its dated production, it becomes genuinely beloved.', type: 'refurb' },
      { year: 2017, event: 'Ellen\'s Energy Adventure closes permanently on August 13, ending a 35-year run for the pavilion. The building is demolished.', type: 'closure' },
      { year: 2022, event: 'Guardians of the Galaxy: Cosmic Rewind opens May 27 in a brand-new building on the former Universe of Energy site. The reverse-launch coaster is the first outdoor rollercoaster at EPCOT in the park\'s 40-year history.', type: 'opening' },
    ],
  },

  'journey-into-imagination': {
    formerAttraction: {
      name: 'Journey Into Imagination (original version)',
      years: '1983–1998',
      note: 'The current Journey Into Your Imagination is the third version of this attraction in the same building. The original version featured Dreamfinder and Figment — beloved characters who sparked one of the largest fan campaigns in Disney history when they were removed.',
    },
    buildingHistory: 'The Imagination Pavilion and its glass pyramids have stood since 1983. The building has housed three completely different versions of the same attraction while the exterior remains unchanged.',
    timeline: [
      { year: 1983, event: 'Journey Into Imagination opens featuring Dreamfinder and Figment — two original characters created for EPCOT. The attraction becomes one of the most beloved in EPCOT history.', type: 'opening' },
      { year: 1998, event: 'Original Journey Into Imagination closes for reimagining. Dreamfinder is removed entirely — one of the most controversial decisions in Disney theme park history.', type: 'closure' },
      { year: 1999, event: 'Journey Into YOUR Imagination opens. The new version removes Figment for most of the ride and features Dr. Nigel Channing. Guest reaction is overwhelmingly negative. It is widely considered one of the worst Walt Disney World attractions ever made.', type: 'opening' },
      { year: 2001, event: 'The universally panned second version closes after only 2 years. Figment returns to the attraction following a massive fan campaign — one of the earliest examples of fan pressure changing a Disney decision.', type: 'closure' },
      { year: 2002, event: 'Third version opens, restoring Figment to a prominent role. While not as beloved as the original, it is a significant improvement over the 1999 version.', type: 'opening' },
    ],
  },

  'mission-space': {
    formerAttraction: {
      name: 'Horizons',
      years: '1983–1999',
      note: 'Horizons was one of the most beloved EPCOT pavilions — a gentle journey through future visions of home, city, desert, ocean, and space living. When it closed, the outcry was significant. Mission Space was built in the same pavilion structure.',
    },
    buildingHistory: 'The Mission Space pavilion is the former Horizons building, significantly modified. Some of the exterior shell was retained during the conversion.',
    timeline: [
      { year: 1983, event: 'Horizons opens in EPCOT\'s Future World, presented by GE. The optimistic attraction imagines families living in mesa, seabottom, and space colonies. "If we can dream it, then we can do it" becomes its tagline.', type: 'opening' },
      { year: 1994, event: 'GE ends its sponsorship of Horizons. Disney keeps the attraction operational but without corporate support, it begins to age.', type: 'milestone' },
      { year: 1999, event: 'Horizons closes permanently on January 9. Guest and fan reaction is significant — many consider it one of the greatest losses in EPCOT history. The building sits empty.', type: 'closure' },
      { year: 2003, event: 'Mission: SPACE opens in the former Horizons building. The centrifuge-based simulator is a genuine engineering achievement — and a genuine risk, as the deaths of two guests with undiagnosed cardiac conditions will later reveal.', type: 'opening' },
      { year: 2017, event: 'Green Mission (no centrifuge spin) added as a less intense alternative after years of health concerns about the Orange Mission.', type: 'refurb' },
    ],
  },

  // ── HOLLYWOOD STUDIOS ───────────────────────────────────

  'tower-of-terror': {
    formerAttraction: null,
    buildingHistory: 'The Hollywood Tower Hotel facade was built from scratch as a purpose-designed structure. The Imagineers added deliberate imperfections — crumbling plaster, broken signs, overgrown vegetation — to sell the illusion of 50 years of neglect.',
    timeline: [
      { year: 1994, event: 'The Twilight Zone Tower of Terror opens at Disney-MGM Studios on July 22. The attraction features a revolutionary randomized drop system — no two rides are identical. CBS\'s The Twilight Zone franchise provides the narrative wrapper.', type: 'opening' },
      { year: 2002, event: 'Major refurbishment updates the pre-show, adds new effects in the "5th Dimension" scene, and enhances the overall experience.', type: 'refurb' },
      { year: 2010, event: 'A second elevator shaft added, effectively doubling the attraction\'s capacity. The new shaft runs alongside the original.', type: 'refurb' },
      { year: 2017, event: 'CBS\'s sale of the Twilight Zone franchise briefly created questions about the Disney licensing deal, but WDW\'s version retained the Twilight Zone branding (unlike Disneyland\'s version, which was converted to a Guardians of the Galaxy theme).', type: 'milestone' },
    ],
  },

  'rock-n-roller-coaster': {
    formerAttraction: null,
    buildingHistory: 'The Rock \'n\' Roller Coaster building is one of the largest show buildings at Hollywood Studios. The exterior was designed to resemble a recording studio on the Sunset Strip.',
    timeline: [
      { year: 1999, event: 'Rock \'n\' Roller Coaster Starring Aerosmith opens at Disney-MGM Studios on July 29. The launch coaster features an Aerosmith soundtrack and is the fastest ride at Walt Disney World at launch (0-57 mph in 2.8 seconds).', type: 'opening' },
      { year: 2008, event: 'Minor refurbishments update audio systems throughout the coaster tunnels.', type: 'refurb' },
      { year: 2023, event: 'Aerosmith sponsorship/branding removed. The attraction operates without the Aerosmith theming while Disney plans a reimagining. The ride vehicles, track, and structure remain unchanged.', type: 'refurb' },
      { year: 2024, event: 'Disney confirms the attraction will be reimagined. Muppets theming is rumored but unconfirmed. Rock \'n\' Roller Coaster enters an uncertain transitional period.', type: 'milestone' },
    ],
  },

  'millennium-falcon-smugglers-run': {
    formerAttraction: {
      name: 'The Great Movie Ride',
      years: '1989–2017',
      note: 'Galaxy\'s Edge was built in an area that included several existing show buildings. The Great Movie Ride, which occupied the Chinese Theatre at the park\'s entrance, was demolished to make way for the Mickey and Minnie\'s Runaway Railway attraction.',
    },
    buildingHistory: 'The Millennium Falcon: Smugglers Run show building is entirely new construction, part of the 14-acre Star Wars: Galaxy\'s Edge land.',
    timeline: [
      { year: 2019, event: 'Star Wars: Galaxy\'s Edge opens at Hollywood Studios on August 29 — the largest single-themed land expansion in Disney history at the time of opening. Millennium Falcon: Smugglers Run opens with the land.', type: 'opening' },
      { year: 2019, event: 'Star Wars: Rise of the Resistance opens on December 5, completing the Galaxy\'s Edge land. The attraction features the largest ride system ever built at a Disney park.', type: 'opening' },
    ],
  },

  // ── ANIMAL KINGDOM ──────────────────────────────────────

  'expedition-everest': {
    formerAttraction: null,
    buildingHistory: 'The Expedition Everest mountain required 1,800 tons of steel to construct and rises to 199.5 feet — one foot below the height limit that would require aviation lighting. Disney engineers studied actual Himalayan architecture and geology to create the layered rock formation.',
    timeline: [
      { year: 2006, event: 'Expedition Everest opens at Animal Kingdom on April 7. The attraction cost approximately $100 million to build — at the time, the most expensive theme park attraction ever constructed. The Yeti animatronic is the largest ever built by Disney.', type: 'opening' },
      { year: 2006, event: 'Within months of opening, the Yeti animatronic (internally named "Harold") begins experiencing structural problems. The weight and range of motion of the figure causes cracking in the concrete base. The Yeti enters "B-mode" — a strobe light effect that simulates movement without the AA actually moving.', type: 'milestone' },
      { year: 2008, event: 'Disney announces the Yeti cannot be repaired without a multi-month closure of the attraction. The decision is made to keep the ride operational with the B-mode Yeti indefinitely.', type: 'milestone' },
      { year: 2023, event: 'Extended refurbishment closes the attraction. Guests and media speculate whether the Yeti will finally be fully repaired. Disney does not confirm.', type: 'refurb' },
    ],
  },

  'kilimanjaro-safaris': {
    formerAttraction: null,
    buildingHistory: 'The safari trucks travel through 110 acres of genuine African habitat — the largest outdoor animal environment at any Disney park. The entire route was designed by wildlife experts to mimic authentic African ecosystems.',
    timeline: [
      { year: 1998, event: 'Kilimanjaro Safaris opens with Animal Kingdom on April 22. The original version features a storyline involving Little Red, an endangered baby elephant, and poachers — a narrative Disney eventually retired.', type: 'opening' },
      { year: 2012, event: 'The "Little Red" poacher storyline is retired. The attraction refocuses purely on the wildlife experience without the dramatic narrative overlay. Guest reaction is generally positive.', type: 'refurb' },
      { year: 2015, event: 'Nighttime safari extended hours introduced as part of Animal Kingdom\'s expansion into evening operations. The animals react differently at dusk — considered by many to be the best time to ride.', type: 'milestone' },
    ],
  },

  'avatar-flight-of-passage': {
    formerAttraction: null,
    buildingHistory: 'Pandora — The World of Avatar required seven years of development and collaboration between Walt Disney Imagineering and James Cameron\'s Lightstorm Entertainment. The floating mountain formations are constructed from sculpted rockwork that weighs hundreds of tons.',
    timeline: [
      { year: 2017, event: 'Pandora — The World of Avatar opens at Animal Kingdom on May 27, including both Avatar Flight of Passage and Na\'vi River Journey. The opening is controversial — Avatar\'s cultural relevance had faded since the 2009 film — but Flight of Passage immediately becomes one of the most praised theme park attractions ever built.', type: 'opening' },
      { year: 2022, event: 'Avatar: The Way of Water releases, reigniting interest in the franchise and the land. Wait times for Flight of Passage increase significantly.', type: 'milestone' },
    ],
  },

  // ── UNIVERSAL STUDIOS FLORIDA ───────────────────────────

  'revenge-of-mummy': {
    formerAttraction: {
      name: 'Kongfrontation',
      years: '1990–2002',
      note: 'Revenge of the Mummy was built in the same show building as Kongfrontation, one of Universal Studios Florida\'s original opening-day attractions. Kongfrontation used massive King Kong audio-animatronics to simulate a helicopter ride over a Kong-ravaged New York.',
    },
    buildingHistory: 'The Revenge of the Mummy show building dates to Universal\'s 1990 opening. The Kongfrontation ride structure was extensively modified and partially demolished to accommodate the new coaster.',
    timeline: [
      { year: 1990, event: 'Kongfrontation opens with Universal Studios Florida. One of the park\'s marquee original attractions, featuring the largest audio-animatronic King Kong ever built at 30 feet tall.', type: 'opening' },
      { year: 2002, event: 'Kongfrontation closes permanently on September 8. Universal cites the aging Kong animatronics as prohibitively expensive to maintain. Guests mourn the loss of a classic.', type: 'closure' },
      { year: 2004, event: 'Revenge of the Mummy opens on May 21 in the former Kongfrontation building. The psychological roller coaster immediately becomes one of Universal\'s signature attractions.', type: 'opening' },
      { year: 2012, event: 'Major refurbishment updates effects throughout the attraction, including enhanced fire effects and improved audio.', type: 'refurb' },
      { year: 2022, event: 'Revenge of the Mummy closes for an extended refurbishment — over a year. New effects and ride system elements installed.', type: 'refurb' },
      { year: 2023, event: 'Revenge of the Mummy reopens with enhanced effects and an updated narrative experience.', type: 'opening' },
    ],
  },

  // ── ISLANDS OF ADVENTURE ────────────────────────────────

  'velocicoaster': {
    formerAttraction: null,
    buildingHistory: 'VelociCoaster was built in a previously underutilized area of Jurassic Park at Islands of Adventure. The launch system and top hat element required significant engineering to execute the 155-foot drop that faces the park\'s lagoon.',
    timeline: [
      { year: 2021, event: 'VelociCoaster opens at Islands of Adventure on June 10 following a brief passholder preview period. The coaster immediately receives widespread acclaim as one of the best theme park coasters in the world. Enthusiasts rank it among the all-time greats.', type: 'opening' },
      { year: 2022, event: 'VelociCoaster wins multiple "best roller coaster" awards from theme park and enthusiast publications worldwide.', type: 'milestone' },
    ],
  },

  'forbidden-journey': {
    formerAttraction: null,
    buildingHistory: 'The Hogwarts Castle show building is a 1:1 scale exterior facade — not a real structural building, but an elaborate forced-perspective construction that makes the castle appear full-sized from a distance. The interior show building extends underground and outward from the castle.',
    timeline: [
      { year: 2010, event: 'Harry Potter and the Forbidden Journey opens at The Wizarding World of Harry Potter — Hogsmeade on June 18. The land and attraction are the result of a partnership between Universal and J.K. Rowling that required her approval on nearly every detail. The opening is a cultural phenomenon.', type: 'opening' },
      { year: 2014, event: 'The Wizarding World of Harry Potter — Diagon Alley opens at Universal Studios Florida, connected to Hogsmeade via the Hogwarts Express.', type: 'milestone' },
      { year: 2019, event: 'Forbidden Journey receives a significant update — the original Quidditch scenes are reimagined into a journey that more closely follows the films\' plot.', type: 'refurb' },
    ],
  },

  'hagrid-magical-creatures': {
    formerAttraction: {
      name: 'Dragon Challenge (formerly Dueling Dragons)',
      years: '1999–2017',
      note: 'Hagrid\'s Magical Creatures Motorbike Adventure was built in the exact footprint of Dragon Challenge — itself a retheming of the original Dueling Dragons coaster. Dueling Dragons was one of the most beloved coasters in theme park history before it was rethemed to Harry Potter.',
    },
    buildingHistory: 'The show building for Hagrid\'s is entirely new construction, though it occupies the same land as Dragon Challenge. The scale of the new building — housing 17 different scenes across a massive outdoor and indoor journey — is extraordinary.',
    timeline: [
      { year: 1999, event: 'Dueling Dragons opens at Islands of Adventure — twin inverted coasters that came within 12 inches of each other at multiple points. Immediately considered one of the best coasters in the world.', type: 'opening' },
      { year: 2010, event: 'Dueling Dragons rethemed to "Dragon Challenge" as part of the Harry Potter expansion. The ride vehicles, track, and experience remain identical — only the theming changes.', type: 'rename' },
      { year: 2017, event: 'Dragon Challenge (Dueling Dragons) closes permanently after a series of loose-article injuries — guests were ignoring instructions and holding up items that struck other riders during the near-miss sections. A tragic end to a legendary coaster.', type: 'closure' },
      { year: 2019, event: 'Hagrid\'s Magical Creatures Motorbike Adventure opens on June 13 to extraordinary acclaim. Immediately considered one of the greatest theme park attractions ever built. Wait times routinely exceed 4–5 hours in its first year.', type: 'opening' },
    ],
  },
}
