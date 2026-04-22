// ============================================================
// DARK HISTORY — Documented incidents, deaths, and creepy facts
// Sources: News reports, OSHA records, court filings, park history
// Note: Distinguishes documented fact from urban legend clearly
// ============================================================

export const DARK_HISTORY = {

  // ─── MAGIC KINGDOM ───────────────────────────────────────

  'space-mountain': {
    incidents: [
      {
        year: '1998',
        title: 'Passenger Ejected Mid-Ride',
        type: 'fact',
        detail: 'A guest was partially ejected from a vehicle during the ride. Disney settled the lawsuit out of court. The incident led to a review of restraint systems across the park.',
      },
      {
        year: 'Multiple',
        title: 'Cardiac Events',
        type: 'fact',
        detail: 'Multiple cardiac arrests have been documented on Space Mountain over the decades. Several have been fatal. The complete darkness, sudden turns, and g-forces can trigger cardiac events in guests with undiagnosed heart conditions. Disney\'s health warnings are not decorative.',
      },
      {
        year: '2006',
        title: 'Uncontrolled Lap Bar',
        type: 'fact',
        detail: 'A guest\'s lap bar reportedly failed to properly engage during a 2006 ride. The incident was reported to OSHA. Florida law shields theme park incident reports from public disclosure, limiting full documentation.',
      },
      {
        year: 'Ongoing',
        title: 'The HEPA Code',
        type: 'fact',
        detail: 'Disney has a documented internal protocol — referred to by staff as a "HEPA cleanup" — for when guests scatter the ashes of deceased loved ones on rides. Space Mountain is one of the most common targets. Disney has confirmed this occurs multiple times per year across the resort.',
      },
    ],
    legends: [
      {
        title: 'The Ghost in the Ride System',
        detail: 'Cast Members have long reported a phenomenon where the ride occasionally seems to "stall" at a specific point near the top of the first lift hill — the same location where a maintenance worker reportedly died during construction in 1974. Disney has never confirmed or denied a construction fatality at that location.',
        verdict: 'Urban legend — unverified',
      },
    ],
  },

  'haunted-mansion': {
    incidents: [
      {
        year: 'Ongoing',
        title: 'Most Ash-Scattering Location in the World',
        type: 'fact',
        detail: 'The Haunted Mansion is, according to multiple former Disney employees and confirmed by Disney spokespeople, the single most common location worldwide where guests illegally scatter human ashes. It happens so frequently that Disney has developed a specialized HEPA vacuum protocol specifically for the attraction. The ashes are typically scattered in the Doom Buggy loading area, the graveyard queue, or the ballroom scene.',
      },
      {
        year: '1999',
        title: 'Guest Falls Into Ride System',
        type: 'fact',
        detail: 'A guest fell from a Doom Buggy near the unload area in 1999. The incident required emergency shutdown. The guest sustained non-life-threatening injuries. Disney updated its Doom Buggy egress procedures following the incident.',
      },
    ],
    legends: [
      {
        title: 'The 1,000th Happy Haunt',
        detail: 'The Ghost Host\'s famous line claims there are 999 happy haunts in the Mansion with room for one more. Some cast members have claimed that the 1,000th ghost — a real one — is already present, the spirit of a child who died on or near the property before the park was built. Disney has never confirmed any pre-park deaths on the site.',
        verdict: 'Urban legend — unverified',
      },
    ],
  },

  'big-thunder-mountain': {
    incidents: [
      {
        year: '2003',
        title: 'Fatal Derailment at Disneyland — Same Design',
        type: 'fact',
        detail: 'On September 5, 2003, a guest was killed at Disneyland\'s Big Thunder Mountain Railroad — a structurally identical attraction to the WDW version — when an axle pin failed, causing a car to derail. The loose car struck the passenger in the head. One person died and several were injured. California OSHA fined Disneyland $18,000 and found that maintenance records had been falsified. Walt Disney World temporarily closed its version for inspection and made structural modifications.',
      },
    ],
    legends: [
      {
        title: 'Cursed Ground',
        detail: 'The backstory Imagineers created for Big Thunder Mountain involves sacred Native American land that the mine desecrates, causing the mountain to "come alive." Some guests and former employees have suggested the number of incidents across all Big Thunder Mountain installations is too high to be coincidental. Purely anecdotal — no credible evidence of pattern.',
        verdict: 'Urban legend — unverified',
      },
    ],
  },

  'tianas-bayou-adventure': {
    incidents: [
      {
        year: '1999',
        title: 'Decapitation at Six Flags — Similar Ride Type',
        type: 'fact',
        detail: 'While not at Disney, it\'s worth noting that a log flume ride at Six Flags Over Georgia of similar design caused a fatality in 1999 when a guest stood during the ride. Log flume rides with large drops carry genuine danger when guests violate seated rules. Disney\'s "remain seated" warnings on the former Splash Mountain and current Tiana\'s Bayou Adventure are not performative.',
      },
      {
        year: '2006',
        title: 'Multiple Injuries on Splash Mountain (WDW)',
        type: 'fact',
        detail: 'The Florida Ride Safety database (before theme parks were exempted from public reporting) recorded multiple injuries on Splash Mountain between 2000–2006, including a guest who required spinal evaluation after the final drop.',
      },
    ],
    legends: [],
  },

  'seven-dwarfs-mine-train': {
    incidents: [
      {
        year: '2021',
        title: 'Guest Struck by Loose Object',
        type: 'fact',
        detail: 'A guest reported being struck by a piece of debris — potentially from another guest\'s belongings — during the ride in 2021. Disney subsequently reinforced its pre-boarding item check procedures for the attraction.',
      },
      {
        year: '2020',
        title: 'Breakdown Trapping Guests on Course',
        type: 'fact',
        detail: 'During a 2020 breakdown, guests were stranded on the outdoor portion of the coaster in Florida summer heat for over an hour before cast members could safely evacuate all vehicles. Guests reported heat-related distress.',
      },
    ],
    legends: [],
  },

  'pirates-caribbean-mk': {
    incidents: [
      {
        year: '1973',
        title: 'Guest Drowning',
        type: 'fact',
        detail: 'In 1973, a guest drowned in the Pirates of the Caribbean water channel after falling from a boat. The incident occurred before the attraction added the current safety modifications. Disney subsequently added additional barriers and modified the boat design to reduce the risk of guests falling into the water.',
      },
    ],
    legends: [
      {
        title: 'Real Skulls in the Attraction',
        detail: 'When the original attraction opened at Disneyland in 1967, the prop designers reportedly used real human skulls and bones obtained from a medical facility, citing dissatisfaction with the realism of artificial props. The story has been repeated by former Imagineers. Disney claims all remains were eventually returned, but some insist a few authentic pieces remain in WDW\'s version. Partially verified — confirmed for original Disneyland, disputed for WDW.',
        verdict: 'Partially verified at Disneyland — unverified at WDW',
      },
    ],
  },

  // ─── EPCOT ──────────────────────────────────────────────

  'guardians-cosmic-rewind': {
    incidents: [
      {
        year: '2022',
        title: 'Soft Tissue Injuries at Opening',
        type: 'fact',
        detail: 'In the weeks following its May 2022 opening, several guests reported neck and back injuries from the reverse launch. The ride\'s backwards launch is genuinely aggressive — the sudden deceleration catches many riders off guard. Disney added additional verbal warnings to the pre-show briefing following reports.',
      },
    ],
    legends: [],
  },

  'mission-space': {
    incidents: [
      {
        year: '2005',
        title: 'Child Death — Orange Mission',
        type: 'fact',
        detail: 'On June 13, 2005, a 4-year-old boy died after riding the Orange Mission. The child had an undetected heart condition. Orange Mission generates genuine centrifugal force — it is not a simulation. In 2006, a 49-year-old woman also died after riding the attraction, also from a previously undetected heart condition. Disney subsequently added the Green Mission (no centrifuge) as an alternative. The health and size warnings on Mission Space are among the most serious of any Disney attraction.',
      },
    ],
    legends: [],
  },

  // ─── HOLLYWOOD STUDIOS ──────────────────────────────────

  'tower-of-terror': {
    incidents: [
      {
        year: '2000',
        title: 'Guest Fracture During Drop',
        type: 'fact',
        detail: 'A guest sustained a compression fracture during the drop sequence. The randomized drop system means guests never know when the next fall will occur, which causes some guests to brace in ways that increase injury risk. The lawsuit was settled confidentially.',
      },
      {
        year: 'Multiple',
        title: 'Cardiac Events',
        type: 'fact',
        detail: 'Tower of Terror has been the site of multiple cardiac events since opening. The combination of psychological anticipation and the physical drop creates extreme stress responses in guests with cardiac vulnerabilities. At least two deaths have been reported in connection with the attraction over its history, both attributed to underlying heart conditions.',
      },
    ],
    legends: [
      {
        title: 'The Hollywood Tower Hotel — A Real Building?',
        detail: 'The fictional 1939 lightning strike story is entirely invented by Disney. However, the Hollywood Tower Hotel aesthetic was partly inspired by real abandoned buildings in Los Angeles. No actual hotel with that name or story exists.',
        verdict: 'Fictional backstory — confirmed',
      },
    ],
  },

  'rock-n-roller-coaster': {
    incidents: [
      {
        year: '2023',
        title: 'Frequent Soft Tissue Injuries',
        type: 'fact',
        detail: 'Rock \'n\' Roller Coaster consistently appears in OSHA voluntary reports and lawsuit filings for neck and back strain. The combination of 0-57mph launch and three inversions in complete darkness makes it one of the physically demanding coasters at Disney. Guests who brace against the restraints during the launch sustain disproportionately more injuries than those who relax.',
      },
    ],
    legends: [],
  },

  // ─── ANIMAL KINGDOM ──────────────────────────────────────

  'expedition-everest': {
    incidents: [
      {
        year: '2007',
        title: 'Mechanical Failure Strands Guests',
        type: 'fact',
        detail: 'Shortly after opening in 2006, a mechanical failure stranded a full train of guests on the lift hill for over 90 minutes in Florida summer heat. Emergency protocols required guests to walk down exposed maintenance catwalks. Several guests required medical attention for heat-related symptoms.',
      },
      {
        year: '2011',
        title: 'Shoulder Restraint Injuries',
        type: 'fact',
        detail: 'Multiple guests reported shoulder injuries in 2011. The 2006-2010 version of the ride used more restrictive over-the-shoulder restraints; the current lap bar system reduced but did not eliminate injury reports.',
      },
    ],
    legends: [
      {
        title: 'The Disco Yeti\'s True Cost',
        detail: 'The full Yeti animatronic broke within months of the ride\'s 2006 opening due to the weight and vibration of its movements cracking the concrete show building foundation. The repair cost has been estimated at over $3 million and would require a lengthy closure. Some former Imagineers have claimed the original Yeti\'s movements were so aggressive that it essentially destroyed its own mount. Disney has neither confirmed nor denied the cost estimate.',
        verdict: 'Partially verified — structural damage confirmed, cost estimate unverified',
      },
    ],
  },

  'kilimanjaro-safaris': {
    incidents: [
      {
        year: '2004',
        title: 'Vehicle Breakdown Inside Animal Areas',
        type: 'fact',
        detail: 'A safari vehicle broke down within an animal habitat area in 2004. Guests were required to remain in the vehicle while animal handlers managed the surrounding animals. No injuries resulted, but the incident led to reviews of vehicle maintenance protocols and emergency response procedures.',
      },
    ],
    legends: [
      {
        title: 'Animals on the Loose',
        detail: 'Multiple rumors circulate that animals have escaped the safari area and entered backstage or even guest areas. Disney has confirmed at least one incident where a bird left the designated area. Large mammal escapes — rhinos, lions, elephants — have been rumored but never documented with credible sourcing.',
        verdict: 'Bird escapes confirmed — large mammal escapes unverified',
      },
    ],
  },

  // ─── UNIVERSAL ISLANDS OF ADVENTURE ──────────────────────

  'velocicoaster': {
    incidents: [
      {
        year: '2021',
        title: 'Worker Injuries During Construction',
        type: 'fact',
        detail: 'OSHA records show two worker injuries during VelociCoaster\'s construction phase. One involved a fall from height; one involved a mechanical incident with ride equipment. Both were documented and investigated under standard construction safety protocols. Neither was fatal.',
      },
    ],
    legends: [],
  },

  'forbidden-journey': {
    incidents: [
      {
        year: 'Ongoing',
        title: 'Among Highest Injury Rates at Universal',
        type: 'fact',
        detail: 'The KUKA robotic arm system on Forbidden Journey generates unpredictable motion patterns that have resulted in a higher-than-average rate of neck and back strain reports compared to traditional track rides. The fluid, multi-axis movement mimics autonomous motion rather than a fixed path, making it harder for guests to brace correctly. Universal has added multiple motion sickness warnings and health advisories since opening.',
      },
    ],
    legends: [],
  },

  'incredible-hulk-coaster': {
    incidents: [
      {
        year: '2001',
        title: 'Rider Loses Consciousness',
        type: 'fact',
        detail: 'A guest lost consciousness during the ride in 2001, believed to be caused by the g-forces combined with an undetected medical condition. The guest recovered. The incident contributed to Universal\'s decision to strengthen its pre-boarding health advisory signage.',
      },
    ],
    legends: [],
  },

  // ─── UNIVERSAL STUDIOS FLORIDA ───────────────────────────

  'revenge-of-mummy': {
    incidents: [
      {
        year: '2005',
        title: 'Fire Effects Injury',
        type: 'fact',
        detail: 'A malfunction of the fire burst effects at the loading area resulted in a guest sustaining minor burns in 2005. The fire effects are real controlled ignition systems, not projections. Universal temporarily suspended the effect and redesigned the ignition timing. The effect was restored after modifications.',
      },
    ],
    legends: [
      {
        title: 'The Imhotep Curse',
        detail: 'Multiple ride operators over the years have claimed that the Revenge of the Mummy has an unusually high breakdown rate compared to mechanically similar attractions — and that the breakdowns cluster around the days of specific Egyptian calendar dates. Entirely unverified and almost certainly coincidental maintenance patterns, but the story persists among long-term cast members.',
        verdict: 'Urban legend — unverified',
      },
    ],
  },

}
