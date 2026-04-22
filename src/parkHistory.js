// ============================================================
// PARK HISTORY — Former rides, abandoned projects, lost lands
// ============================================================

export const PARK_HISTORY = {

  'magic-kingdom': {
    intro: 'Magic Kingdom opened on October 1, 1971 with fewer rides than Disneyland and some areas still under construction. Over five decades, it has lost some of its most beloved original attractions while adding new generations of classics.',

    formerAttractions: [
      {
        name: '20,000 Leagues Under the Sea: Submarine Voyage',
        years: '1971–1994',
        land: 'Fantasyland',
        description: 'One of the most impressive original Magic Kingdom attractions — guests boarded actual submarines and voyaged through elaborate underwater dioramas. The ride stretched across a large lagoon that still exists near the Little Mermaid attraction. Maintenance costs for the submarine fleet became untenable.',
        fate: 'Closed 1994. Submarines scrapped or sold. Lagoon partially filled. The Little Mermaid attraction now occupies part of the former 20,000 Leagues footprint.',
        type: 'closed',
      },
      {
        name: 'Mr. Toad\'s Wild Ride',
        years: '1971–1998',
        land: 'Fantasyland',
        description: 'One of the most beloved original Magic Kingdom dark rides — a chaotic, irreverent journey with Toad that ended with guests going to Hell. Literally. The attraction was replaced by The Many Adventures of Winnie the Pooh despite one of the most passionate fan campaigns in Disney history.',
        fate: 'Closed September 7, 1998. Replaced by The Many Adventures of Winnie the Pooh. A Hidden Mickey in the form of a Mr. Toad portrait can be found in the Pooh attraction — a nod to what came before. Mr. Toad\'s Wild Ride still operates at Disneyland.',
        type: 'closed',
      },
      {
        name: 'Snow White\'s Scary Adventures',
        years: '1971–2012',
        land: 'Fantasyland',
        description: 'One of the original Magic Kingdom dark rides, notoriously told from the Evil Queen\'s perspective — Snow White herself was barely visible. Refurbished in 1994 to add Snow White as a character. Beloved despite its darkness. Closed to make way for Seven Dwarfs Mine Train.',
        fate: 'Closed May 31, 2012. Demolished for Seven Dwarfs Mine Train construction.',
        type: 'closed',
      },
      {
        name: 'If You Had Wings / If You Could Fly / Dreamflight',
        years: '1972–1998',
        land: 'Tomorrowland',
        description: 'A gentle dark ride originally sponsored by Eastern Airlines, later Delta, later unsponsored. The ride used OmniMover vehicles (same system as Haunted Mansion) and took guests on an imaginary flight journey. Became Buzz Lightyear\'s Space Ranger Spin.',
        fate: 'Closed 1998. Buzz Lightyear\'s Space Ranger Spin opens in the same building.',
        type: 'closed',
      },
      {
        name: 'ExtraTERRORestrial Alien Encounter',
        years: '1995–2003',
        land: 'Tomorrowland',
        description: 'Perhaps the most controversial attraction in Magic Kingdom history — a genuinely frightening show where an alien creature escaped into the theater and appeared to attack guests in the dark. Not a ride — a seated show with in-seat effects. Far too scary for the park\'s demographic and ultimately removed.',
        fate: 'Closed October 12, 2003. Replaced by Stitch\'s Great Escape!, which was later permanently closed in 2018.',
        type: 'closed',
      },
      {
        name: 'Stitch\'s Great Escape!',
        years: '2004–2018',
        land: 'Tomorrowland',
        description: 'The successor to ExtraTERRORestrial Alien Encounter — toned down to be family-appropriate, but widely regarded as one of the worst attractions ever built at Magic Kingdom. Stitch breathes chili-dog breath on guests. Considered an embarrassment by many Disney fans.',
        fate: 'Permanently closed January 2018. The building now houses the TRON Lightcycle / Run queue. The attraction operated in limited seasonal capacity from 2016–2018.',
        type: 'closed',
      },
      {
        name: 'Skyway to Fantasyland / Skyway to Tomorrowland',
        years: '1971–1999',
        land: 'Tomorrowland & Fantasyland',
        description: 'An aerial gondola (skyway) that connected Tomorrowland and Fantasyland — a genuine cross-park transit option. The system was one of the most charming aspects of the original Magic Kingdom. The stations still exist, though the Fantasyland station is now a character meet-and-greet location.',
        fate: 'Closed November 1999 due to declining ridership and ADA compliance costs. The Tomorrowland station was demolished. The Fantasyland station still stands as a structure.',
        type: 'closed',
      },
      {
        name: 'Mike Fink Keel Boats',
        years: '1971–2001',
        land: 'Frontierland',
        description: 'Flat-bottomed boats that traveled the Rivers of America alongside the Liberty Belle. A classic, low-key attraction in the spirit of Tom Sawyer\'s river explorations.',
        fate: 'Closed October 2001, initially for refurbishment but never reopened.',
        type: 'closed',
      },
    ],

    abandonedProjects: [
      {
        name: 'Discovery Bay',
        era: '1970s',
        description: 'An entire Tomorrowland expansion planned in the 1970s — a steampunk-esque "Discovery Bay" set in 1880s San Francisco. Would have included attractions based on Jules Verne adventures. The concept was developed extensively before being shelved due to budget constraints.',
        fate: 'Cancelled. Some elements of the concept were recycled into other projects over the years.',
      },
      {
        name: 'Beastly Kingdom (Animal Kingdom)',
        era: '1990s',
        description: 'Originally planned as a fourth "kingdom" for Animal Kingdom — a land dedicated to mythical and fantasy creatures including a dragon rollercoaster and a unicorn-themed dark ride. Budget constraints caused it to be removed from the opening plans.',
        fate: 'Cancelled. Pandora — The World of Avatar later opened in part of the space originally reserved for Beastly Kingdom. A dragon appears in Animal Kingdom\'s logo — a remnant of the original plan.',
      },
      {
        name: 'Western River Expedition',
        era: '1971',
        description: 'The original plan for Magic Kingdom\'s Frontierland included a massive Pirates of the Caribbean-style water ride called Western River Expedition — a journey through the American West. Guests in 1971 were disappointed to find only a sign promising it was "coming soon." It never came.',
        fate: 'Cancelled. Splash Mountain (now Tiana\'s Bayou Adventure) was eventually built in a different location and partially fulfilled the water adventure concept.',
      },
    ],
  },

  'epcot': {
    intro: 'EPCOT Center opened in 1982 as Walt Disney\'s most ambitious post-Walt project — an experimental prototype of a World\'s Fair made permanent. Its original Future World pavilions were corporate-sponsored explorations of technology and human achievement. Many of the most beloved originals are now gone.',

    formerAttractions: [
      {
        name: 'Horizons',
        years: '1983–1999',
        land: 'Future World',
        description: 'Universally considered one of the greatest theme park attractions ever built — a gentle journey through optimistic visions of future living including a floating seabottom community, a mesa desert colony, and a space station. Sponsored by GE. The finale featured a guest vote to choose your ending destination.',
        fate: 'Closed January 9, 1999 after GE\'s sponsorship ended. Demolished for Mission: SPACE. The loss of Horizons remains among the most mourned in theme park history.',
        type: 'closed',
      },
      {
        name: 'World of Motion',
        years: '1982–1996',
        land: 'Future World',
        description: 'EPCOT\'s original Tomorrowland-equivalent — a whimsical journey through the history of transportation sponsored by General Motors. Funny, warm, and optimistic. The finale song "It\'s Fun to Be Free" became an EPCOT anthem.',
        fate: 'Closed January 2, 1996. Demolished for Test Track. Considered one of EPCOT\'s greatest losses.',
        type: 'closed',
      },
      {
        name: 'Universe of Energy (Ellen\'s Energy Adventure)',
        years: '1982–2017',
        land: 'Future World',
        description: 'Originally a serious exploration of fossil fuels sponsored by ExxonMobil. Reimagined in 1996 as "Ellen\'s Energy Adventure" featuring Ellen DeGeneres, Bill Nye, and Alex Trebek. Despite its dated VHS-era production quality, the ride became genuinely beloved.',
        fate: 'Closed August 13, 2017. Demolished for Guardians of the Galaxy: Cosmic Rewind.',
        type: 'closed',
      },
      {
        name: 'Wonders of Life Pavilion',
        years: '1989–2004',
        land: 'Future World',
        description: 'An entire pavilion dedicated to health and the human body. Featured Body Wars (a Star Tours-style simulator through the human bloodstream), Cranium Command (a beloved comedy show inside a child\'s brain), and The Making of Me (a film about human reproduction that scandalized some guests). The pavilion was spectacular.',
        fate: 'Closed 2004 as sponsorship ended. The building still stands and is used seasonally for EPCOT festivals. The attractions are gone. Cranium Command is deeply mourned.',
        type: 'closed',
      },
      {
        name: 'Cranium Command',
        years: '1989–2004',
        land: 'Future World (Wonders of Life)',
        description: 'A beloved comedy theater show inside the Wonders of Life pavilion — guests watched as a rookie pilot (Buzzy) navigated the brain of a 12-year-old boy. Featured Dana Carvey, Bobcat Goldthwait, Charles Grodin, Jon Lovitz, George Wendt, and Kevin Nealon as different body parts. Considered by many the funniest attraction Disney ever built.',
        fate: 'Closed 2004 with the Wonders of Life pavilion. Never replaced. Cranium Command has no equivalent anywhere in the Disney parks.',
        type: 'closed',
      },
      {
        name: 'IllumiNations: Reflections of Earth',
        years: '1999–2019',
        land: 'World Showcase Lagoon',
        description: 'EPCOT\'s signature nighttime spectacular for two decades. A globe of fire, coordinated lights across all 11 World Showcase countries, and a sweeping orchestral score about the history and future of humanity. Many consider it the greatest nighttime show in Disney history.',
        fate: 'Final performance October 1, 2019, EPCOT\'s 37th birthday. Replaced by Harmonious (2021–2023), then EPCOT Forever and Luminous. Many fans still mourn IllumiNations.',
        type: 'closed',
      },
      {
        name: 'Maelstrom',
        years: '1988–2014',
        land: 'World Showcase — Norway',
        description: 'A beloved dark ride through Norwegian mythology and modern Norway in the Norway Pavilion. Featured trolls, polar bears, and a journey through a North Sea oil rig. The final scene showed a Norwegian tourism film. Guests who exited had to walk through the theater — and almost everyone refused.',
        fate: 'Closed October 5, 2014. Converted to Frozen Ever After. The conversion was deeply controversial and remains a sore point for EPCOT fans.',
        type: 'closed',
      },
    ],

    abandonedProjects: [
      {
        name: 'The Life and Health Pavilion Expansion',
        era: '1990s',
        description: 'Plans existed for a permanent revitalization of the Wonders of Life pavilion with new attractions after its initial success. The loss of corporate sponsorship killed the expansion before it began.',
        fate: 'Cancelled. The pavilion closed without a successor.',
      },
      {
        name: 'The History Pavilion',
        era: '1980s',
        description: 'A World Showcase pavilion dedicated to ancient history and archaeology was planned but never built. Concept art showed Mesopotamian, Egyptian, and Roman elements.',
        fate: 'Cancelled during EPCOT\'s development phase.',
      },
      {
        name: 'Spain and Equatorial Africa Pavilions',
        era: '1982–ongoing',
        description: 'Multiple countries have been announced or rumored for World Showcase expansion over the decades — Spain and Equatorial Africa most persistently. Spain has been under discussion since at least 2000.',
        fate: 'Still unbuilt. Space has been reserved. Both continue to be discussed.',
      },
    ],
  },

  'hollywood-studios': {
    intro: 'Hollywood Studios opened in 1989 as Disney-MGM Studios — a working film studio and theme park. As the actual film production moved away, the park evolved. Its identity shifted multiple times before landing on its current mix of Star Wars, Toy Story, and classic Hollywood.',

    formerAttractions: [
      {
        name: 'The Great Movie Ride',
        years: '1989–2017',
        land: 'Hollywood Boulevard',
        description: 'The signature attraction of the original Disney-MGM Studios — a slow dark ride through recreations of iconic Hollywood film sequences including Casablanca, The Wizard of Oz, Alien, Raiders of the Lost Ark, and more. Presented in the Chinese Theatre facade. A true love letter to cinema.',
        fate: 'Closed August 13, 2017. Demolished. Mickey & Minnie\'s Runaway Railway opened in the Chinese Theatre in 2020.',
        type: 'closed',
      },
      {
        name: 'Backlot Tour',
        years: '1989–2014',
        land: 'Backstage',
        description: 'A tram tour through the actual working Disney-MGM Studios backlot — showing real film equipment, props, and the famous Catastrophe Canyon flash flood sequence. As actual film production left the studio, the tour became increasingly staged.',
        fate: 'Closed September 27, 2014. The space was repurposed for Toy Story Land and Star Wars: Galaxy\'s Edge.',
        type: 'closed',
      },
      {
        name: 'Superstar Television',
        years: '1989–1998',
        land: 'Echo Lake',
        description: 'A guest-participation show where volunteers were edited into famous TV show scenes. Enormous fun — hugely popular with guests who got picked. One of the original park\'s signature experiences.',
        fate: 'Closed 1998. Space repurposed.',
        type: 'closed',
      },
      {
        name: 'Star Tours (Version 1)',
        years: '1989–2010',
        land: 'Echo Lake',
        description: 'The original Star Tours with the Endor Death Star sequence. Groundbreaking when it opened — one of the first major motion simulator attractions. Eventually replaced by the randomized multi-storyline version.',
        fate: 'The original version closed in 2010 and was replaced by Star Tours — The Adventures Continue in 2011, which uses the same simulator building but with an entirely new experience.',
        type: 'closed',
      },
      {
        name: 'Honey, I Shrunk the Kids Movie Set Adventure',
        years: '1990–2016',
        land: 'Commissary Lane',
        description: 'An elaborate playground designed as a movie set for the Honey, I Shrunk the Kids film — oversized props, giant dog, film debris as play equipment. A beloved area for children and families.',
        fate: 'Closed April 2, 2016. Demolished for Star Wars: Galaxy\'s Edge construction.',
        type: 'closed',
      },
      {
        name: 'Studio Backlot Tour (Streets of America)',
        years: '1989–2016',
        land: 'Backlot',
        description: 'The Streets of America area featured New York and San Francisco street facades used for actual Disney film and TV production. At Christmas, the Osborne Family Spectacle of Dancing Lights made it a holiday destination.',
        fate: 'Closed January 2016. Demolished for Star Wars: Galaxy\'s Edge and Toy Story Land.',
        type: 'closed',
      },
    ],

    abandonedProjects: [
      {
        name: 'Dick Tracy\'s Crime Stoppers',
        era: '1989',
        description: 'Planned to open with the park based on the 1990 Dick Tracy film. The attraction concept was developed but the film\'s underperformance killed the project.',
        fate: 'Cancelled.',
      },
      {
        name: 'Muppet Studios Expansion',
        era: '2000s',
        description: 'After acquiring the Muppets, Disney developed plans for an entire Muppet Studios area to replace much of the aging backlot. The expansion was repeatedly delayed and eventually cancelled as priorities shifted to Star Wars and Toy Story.',
        fate: 'Cancelled. Muppet*Vision 3D remains as the sole Muppets attraction.',
      },
    ],
  },

  'animal-kingdom': {
    intro: 'Animal Kingdom opened on April 22, 1998 — Earth Day — with a focus on live animals, conservation, and natural environments. Originally criticized as a "half-day park," it has grown into one of Disney\'s most ambitious and distinctive theme parks.',

    formerAttractions: [
      {
        name: 'Tarzan Rocks!',
        years: '1999–2006',
        land: 'Discovery Island',
        description: 'A live entertainment show featuring acrobatics and the music from Disney\'s Tarzan film. Popular but aging — eventually replaced.',
        fate: 'Closed 2006. The theater now hosts Festival of the Lion King.',
        type: 'closed',
      },
      {
        name: 'Cretaceous Trail',
        years: '1998–2002',
        land: 'DinoLand U.S.A.',
        description: 'A self-guided trail through recreations of Cretaceous-era plant life. More of an environmental walk than an attraction.',
        fate: 'Replaced by Primeval Whirl in 2002.',
        type: 'closed',
      },
      {
        name: 'Primeval Whirl',
        years: '2002–2020',
        land: 'DinoLand U.S.A.',
        description: 'A spinning wild mouse coaster themed as a time-travel ride. Never beloved — the DinoLand U.S.A. county fair theme was widely criticized as clashing with Animal Kingdom\'s naturalistic aesthetic.',
        fate: 'Permanently closed March 2020 during the COVID-19 closure. Not reopened.',
        type: 'closed',
      },
      {
        name: 'Rivers of Light',
        years: '2017–2020',
        land: 'Discovery River',
        description: 'A nighttime water spectacular featuring luminous floats, water screens, and projected imagery celebrating nature. Took three years to develop past its original opening date due to technical issues.',
        fate: 'Permanently closed due to COVID-19 in 2020. Not reopened.',
        type: 'closed',
      },
    ],

    abandonedProjects: [
      {
        name: 'Beastly Kingdom',
        era: '1994–1998',
        description: 'The most famous abandoned Disney project — an entire land planned for Animal Kingdom\'s opening dedicated to mythical and fantasy creatures. Would have included a dragon coaster, a unicorn dark ride, and a quest through a hedge maze. Budget cuts eliminated it from the opening park.',
        fate: 'Cancelled. The dragon silhouette in Animal Kingdom\'s logo is a remnant. Pandora — The World of Avatar was eventually built in part of the reserved space.',
      },
      {
        name: 'Dinoland U.S.A. Replacement',
        era: '2010s–present',
        description: 'Disney has long acknowledged that DinoLand U.S.A.\'s county fair theming is inconsistent with the rest of Animal Kingdom. Multiple concepts for replacement — including Indiana Jones and Zootopia theming — have been rumored over the years.',
        fate: 'No confirmed timeline. DinoLand U.S.A. remains open as of writing.',
      },
    ],
  },

  'universal-studios-florida': {
    intro: 'Universal Studios Florida opened in 1990 as Universal\'s first East Coast park — a working production studio and theme park. Its history is marked by spectacular technical achievements, devastating hurricane damage, and a radical transformation from a studio tour model to a franchise-driven destination.',

    formerAttractions: [
      {
        name: 'Kongfrontation',
        years: '1990–2002',
        land: 'New York',
        description: 'One of the original marquee attractions — guests boarded an aerial tramcar over a King Kong-ravaged New York. The Kong animatronic at 30 feet tall was the largest ever built at the time.',
        fate: 'Closed September 8, 2002. Demolition of King Kong elements. Revenge of the Mummy opened in the same building in 2004.',
        type: 'closed',
      },
      {
        name: 'Earthquake — The Big One',
        years: '1990–2012',
        land: 'San Francisco',
        description: 'Guests boarded a San Francisco BART subway car and experienced a simulated 8.3 magnitude earthquake — collapsing ceilings, flooded tunnels, a tanker truck crashing through a wall. One of the most impressive practical effect attractions ever built.',
        fate: 'Closed 2012. Replaced by Fast & Furious — Supercharged.',
        type: 'closed',
      },
      {
        name: 'JAWS',
        years: '1990–2012',
        land: 'Amity',
        description: 'A classic boat tour through Amity harbor, menaced by a 32-foot mechanical shark. One of the most beloved Universal attractions — perfectly paced, genuinely tense, and deeply nostalgic. The shark was notoriously unreliable during early operation.',
        fate: 'Closed January 2, 2012. Demolished for Diagon Alley construction. The loss of JAWS remains deeply mourned by Universal fans.',
        type: 'closed',
      },
      {
        name: 'Ghostbusters Spooktacular',
        years: '1990–1996',
        land: 'New York',
        description: 'A live show featuring the Ghostbusters characters. One of the original park\'s entertaining theatrical experiences.',
        fate: 'Closed 1996.',
        type: 'closed',
      },
      {
        name: 'Nickelodeon Studios',
        years: '1990–2005',
        land: 'Production Central',
        description: 'An actual working Nickelodeon television studio and themed attraction — guests could tour the studios, see game show tapings, and visit the Nickelodeon store. Ahead of its time.',
        fate: 'Closed 2005 as Nickelodeon moved production. The building became Soundstage 44, later used for special events.',
        type: 'closed',
      },
      {
        name: 'Back to the Future — The Ride',
        years: '1991–2007',
        land: 'Expo Center',
        description: 'A DeLorean motion simulator through the Back to the Future time travel landscape. One of the most ambitious simulator attractions ever built — eight-story tall IMAX domed screens, multiple simulator vehicles. Beloved for decades.',
        fate: 'Closed March 30, 2007. Replaced by The Simpsons Ride, which uses the same simulator system.',
        type: 'closed',
      },
    ],

    abandonedProjects: [
      {
        name: 'King Kong Encounter (Universal Studios Hollywood) — Planned WDW Version',
        era: '1990s',
        description: 'When Kongfrontation aged, Universal studied bringing the Hollywood Kong tram experience to Florida. The project never advanced beyond discussion.',
        fate: 'Cancelled.',
      },
    ],
  },

  'islands-of-adventure': {
    intro: 'Islands of Adventure opened on May 28, 1999 as one of the most ambitious theme park projects ever undertaken. Designed to out-Disney Disney with cutting-edge technology, it launched with attractions that redefined the industry. The Wizarding World expansion in 2010 made it a global destination.',

    formerAttractions: [
      {
        name: 'Dueling Dragons',
        years: '1999–2010',
        land: 'The Lost Continent',
        description: 'Arguably the greatest roller coaster ever operated at a theme park — twin inverted coasters that passed within 12 inches of each other at multiple high-speed points. The queues wound through an elaborate castle with exquisite stonework theming. The ride experience was extraordinary.',
        fate: 'Rethemed to Dragon Challenge in 2010 for the Harry Potter expansion. Closed 2017 due to loose-article injuries. Demolished for Hagrid\'s Magical Creatures Motorbike Adventure.',
        type: 'closed',
      },
      {
        name: 'Dragon Challenge',
        years: '2010–2017',
        land: 'The Wizarding World of Harry Potter — Hogsmeade',
        description: 'The rethemed version of Dueling Dragons — same coasters, same near-misses, but with Harry Potter theming replacing the original Lost Continent castle. Despite the rebrand, the coaster experience was identical to the beloved Dueling Dragons.',
        fate: 'Closed September 4, 2017 after multiple loose-article injuries. Demolished. Hagrid\'s Magical Creatures Motorbike Adventure opened in its footprint.',
        type: 'closed',
      },
      {
        name: 'The Eighth Voyage of Sindbad',
        years: '1999–2018',
        land: 'The Lost Continent',
        description: 'A live stunt show featuring elaborate fire and water effects. Well-regarded in its prime — one of the better live action shows at any theme park.',
        fate: 'Closed 2018. The Lost Continent land has been partially absorbed by the expanding Wizarding World.',
        type: 'closed',
      },
      {
        name: 'Poseidon\'s Fury',
        years: '1999–present',
        land: 'The Lost Continent',
        description: 'One of the last remaining original Islands of Adventure attractions — a walk-through show featuring a battle between Poseidon and Lord Darkenon. The vortex tunnel water effect remains technically impressive. The attraction has shown its age.',
        fate: 'Still operating as of writing, though its future is uncertain as the Lost Continent continues to shrink.',
        type: 'open',
      },
      {
        name: 'Triceratops Encounter',
        years: '1999–2006',
        land: 'Jurassic Park',
        description: 'Guests could interact with a full-size mechanical Triceratops as a "wildlife handler" explained its behavior. A charming, low-tech encounter that let guests get close to a convincing dinosaur.',
        fate: 'Closed 2006. Space repurposed.',
        type: 'closed',
      },
    ],

    abandonedProjects: [
      {
        name: 'Marvel Land Expansion',
        era: '2010s',
        description: 'Universal\'s contract with Marvel (predating Disney\'s 2009 acquisition) allowed them to use Marvel characters in the Florida park for many years. Disney\'s acquisition created a complicated situation — Universal retained rights, but expansion of Marvel content in Florida was uncertain.',
        fate: 'Marvel Super Hero Island remains. Epic Universe features a separate Marvel land. The legal situation has created an unusual dual-presence of Marvel at Universal in Florida.',
      },
    ],
  },

  'epic-universe': {
    intro: 'Epic Universe opened on May 22, 2025 — the largest theme park ever built in North America. With five themed worlds, it represents Universal\'s largest single investment and is designed to compete directly with Walt Disney World\'s resort experience.',

    formerAttractions: [],

    abandonedProjects: [
      {
        name: 'Original Epic Universe Land Lineup Changes',
        era: '2019–2021',
        description: 'The original announced lineup for Epic Universe was disrupted by COVID-19. A DreamWorks land was announced then cancelled. A Nintendo land was considered before contractually going to Universal Studios Hollywood first.',
        fate: 'Epic Universe ultimately opened with Nintendo World, Wizarding World — Ministry of Magic, How to Train Your Dragon, Monsters Unchained, and Celestial Park.',
      },
    ],
  },
}
