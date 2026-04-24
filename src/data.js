// ============================================================
// PARK PASSPORT — COMPREHENSIVE DATA FILE
// Walt Disney World + Universal Orlando
// ============================================================

export const RESORTS = [
  {
    id: 'disney-world',
    name: 'Walt Disney World',
    shortName: 'Disney World',
    emoji: '🏰',
    tagline: 'The Most Magical Place on Earth',
    accentColor: '#9B59B6',
    parks: [
      // ─────────────────────────────────────────────
      //  MAGIC KINGDOM
      // ─────────────────────────────────────────────
      {
        id: 'magic-kingdom',
        name: 'Magic Kingdom',
        emoji: '🏰',
        accentColor: '#5B2BB5',
        gradientFrom: '#2d1b69',
        gradientTo: '#0a0f1e',
        description: 'The crown jewel of Walt Disney World, Magic Kingdom is home to iconic attractions, beloved characters, and Cinderella Castle.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Magic_Kingdom_castle.jpg/800px-Magic_Kingdom_castle.jpg',
        openingYear: 1971,
        lands: [
          {
            id: 'main-street-usa',
            name: 'Main Street, U.S.A.',
            rides: [
              {
                id: 'wdw-railroad',
                name: 'Walt Disney World Railroad',
                type: 'Train',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~20 min (full loop)',
                openingYear: 1971,
                description: 'A classic steam-powered railroad that circles the perimeter of Magic Kingdom, with stops at Main Street, Frontierland, and Fantasyland.',
                history: 'The Walt Disney World Railroad opened on the park\'s very first day — October 1, 1971. Walt Disney himself had a deep love for trains, having built a miniature railroad at his own home called the "Carolwood Pacific Railroad." The locomotives are authentic narrow-gauge steam engines, built in the 1920s and originally used in the Yucatan Peninsula of Mexico.',
                trivia: [
                  'The four steam locomotives are named Walter E. Disney, Lilly Belle, Roger E. Broggie, and Roy O. Disney',
                  'The railroad covers approximately 1.5 miles around the park perimeter',
                  'Walt Disney had his own backyard railroad at his home, the Carolwood Pacific Railroad',
                  'The trains were built between 1916–1928 and originally used in Yucatan, Mexico',
                  'The loading area on Main Street was designed to look like a Victorian-era train station'
                ],
                specs: { type: 'Steam-Powered Narrow Gauge Train', capacity: '~360 per train', speed: '~10 mph', distance: '1.5 miles loop', stops: 3 },
                mustDo: false,
                lightningLane: false,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/WDW_Railroad_-_Main_Street_Station.jpg/640px-WDW_Railroad_-_Main_Street_Station.jpg',
                tags: ['family', 'relaxing', 'historical']
              }
            ]
          },
          {
            id: 'adventureland',
            name: 'Adventureland',
            rides: [
              {
                id: 'jungle-cruise',
                name: 'Jungle Cruise',
                type: 'Boat Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~10 min',
                openingYear: 1971,
                description: 'Board a tropic-styled boat for a tongue-in-cheek tour through the wild rivers of Africa, Asia, and South America — narrated by your skipper\'s infamous puns.',
                history: 'Jungle Cruise opened with Magic Kingdom on October 1, 1971. It was originally conceived by Walt Disney himself as a serious nature documentary ride featuring realistic animatronic animals. Walt was disappointed real animals wouldn\'t perform on cue, so animatronics were used instead. Over the decades, the ride evolved from earnest adventure to beloved pun-fest. A major 2021 reimagining added Skipper Alberta Falls and Dr. Jane Fowler as new character backstories and removed some culturally insensitive imagery.',
                trivia: [
                  'The attraction was one of the original opening-day rides at Disneyland in 1955',
                  'Skippers ad-lib their scripts — every journey is slightly different',
                  'The hippos, elephants, and other animals cost more than real animals would have in 1971',
                  'The "backside of water" is one of the most famous punchlines in Disney park history',
                  'A 2021 update added new scenes and characters, retiring some stereotypical imagery'
                ],
                specs: { type: 'Guided Boat Tour', capacity: '~16 per boat', duration: '9 min', boats: '~12 boats on the river' },
                mustDo: true,
                lightningLane: false,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Jungle_Cruise_Magic_Kingdom.jpg/640px-Jungle_Cruise_Magic_Kingdom.jpg',
                tags: ['family', 'classic', 'comedy', 'water']
              },
              {
                id: 'pirates-caribbean-mk',
                name: 'Pirates of the Caribbean',
                type: 'Boat Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~8 min',
                openingYear: 1973,
                description: 'Sail through a swashbuckling world of pirates, plunder, and mischief in this classic Disney dark ride inspired by the beloved film franchise.',
                history: 'The original Pirates of the Caribbean opened at Disneyland in 1967 and was the last attraction Walt Disney personally oversaw before his death in 1966. The Magic Kingdom version opened in 1973, adapted for the Florida climate with an indoor queue. After the massive success of the film franchise starting in 2003, Captain Jack Sparrow and Barbossa were added to the attraction in 2006. It remains one of Disney\'s most iconic and beloved rides.',
                trivia: [
                  'This was the last ride Walt Disney personally worked on before his death in 1966 (Disneyland version)',
                  'Jack Sparrow was added to the ride in 2006, after the Pirates films became blockbusters',
                  'The original attraction contained a "chase scene" where men chased women — updated in 2018 to show pirates chasing treasure',
                  'The auctioneer scene was updated in 2018 to show the redheaded woman as a pirate herself',
                  'There are small drops near the beginning of the ride'
                ],
                specs: { type: 'Dark Boat Ride', capacity: '~18 per boat', duration: '8.5 min', drop: 'Two small drops' },
                mustDo: true,
                lightningLane: false,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pirates_of_the_Caribbean_-_Magic_Kingdom.jpg/640px-Pirates_of_the_Caribbean_-_Magic_Kingdom.jpg',
                tags: ['family', 'classic', 'water', 'immersive']
              },
              {
                id: 'magic-carpets-aladdin',
                name: 'The Magic Carpets of Aladdin',
                type: 'Aerial Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~2 min',
                openingYear: 2001,
                description: 'Soar above Agrabah on a flying carpet! Control your carpet\'s height and pitch while avoiding the spitting camel.',
                history: 'Opened in 2001 to give Adventureland a second major ride, Magic Carpets of Aladdin replaced an open plaza area. The attraction is themed to the 1992 animated film Aladdin.',
                trivia: [
                  'There\'s a spitting camel on the ground below — and it really does aim at riders',
                  'Riders control both height AND front-to-back pitch of the carpet',
                  'The carpets can be boarded from either side, letting two different rows of passengers face each other'
                ],
                specs: { type: 'Aerial Spinner', capacity: '~4 per carpet', carpets: 16 },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['family', 'kids', 'aladdin']
              }
            ]
          },
          {
            id: 'frontierland',
            name: 'Frontierland',
            rides: [
              {
                id: 'big-thunder-mountain',
                name: 'Big Thunder Mountain Railroad',
                type: 'Roller Coaster',
                thrillLevel: 3,
                heightRequirement: 40,
                duration: '~3.5 min',
                openingYear: 1980,
                description: 'The "wildest ride in the wilderness!" Board a runaway mine train through a haunted gold mining town of the American Southwest.',
                history: 'Big Thunder Mountain Railroad opened at Magic Kingdom on November 15, 1980. Imagineers researched actual gold rush ghost towns in the American West and collected genuine 19th-century mining equipment to make the atmosphere authentic. The ride was inspired by real locations like Monument Valley and the Superstition Mountains in Arizona.',
                trivia: [
                  'The mountain contains actual antique mining equipment collected by Imagineers in the 1970s',
                  'The name comes from a Navajo legend about a sacred mountain that shakes when gold is removed',
                  'There are versions of this ride at all five Disney parks worldwide',
                  'The goat on the top of the mountain appears to eat a stick of dynamite',
                  'Big Thunder Mountain is often called "the best $5 ride in the world" — a phrase coined by Disney legend Card Walker'
                ],
                specs: { type: 'Steel Mine Train Coaster', heightRequirement: '40 inches', topSpeed: '36 mph', duration: '3.5 min', drops: 3 },
                mustDo: true,
                lightningLane: true,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/WDW_Big_Thunder_Mountain.jpg/640px-WDW_Big_Thunder_Mountain.jpg',
                tags: ['thrill', 'coaster', 'family', 'iconic']
              },
              {
                id: 'tianas-bayou-adventure',
                name: "Tiana's Bayou Adventure",
                type: 'Log Flume',
                thrillLevel: 3,
                heightRequirement: 40,
                duration: '~11 min',
                openingYear: 2024,
                description: 'Join Princess Tiana and Louis the alligator deep in the Louisiana bayou for a Mardi Gras celebration — featuring a massive 52-foot plunge!',
                history: 'Tiana\'s Bayou Adventure replaced Splash Mountain, which was based on the 1946 film Song of the South. Following years of advocacy, Disney announced in 2020 that the attraction would be reimagined around The Princess and the Frog. The new ride opened June 28, 2024 at Walt Disney World, featuring an all-new original story set after the events of the film, with Tiana preparing for her first Mardi Gras celebration.',
                trivia: [
                  'Tiana\'s Bayou Adventure is the first new ride to feature Princess Tiana as the lead character',
                  'The attraction features over 50 new audio-animatronic characters',
                  'The final drop is 52 feet at a 45-degree angle — the same as Splash Mountain',
                  'The ride was years in development with input from the NAACP and Princess and the Frog director John Musker',
                  'A hidden tribute to Splash Mountain\'s Br\'er Rabbit can be found in the queue'
                ],
                specs: { type: 'Log Flume Ride', heightRequirement: '40 inches', finalDrop: '52 feet at 45°', duration: '~11 min', animatronics: '50+' },
                mustDo: true,
                lightningLane: true,
                imageUrl: '',
                tags: ['thrill', 'water', 'princess', 'new']
              }
            ]
          },
          {
            id: 'liberty-square',
            name: 'Liberty Square',
            rides: [
              {
                id: 'haunted-mansion',
                name: 'Haunted Mansion',
                type: 'Dark Ride',
                thrillLevel: 2,
                heightRequirement: null,
                duration: '~9 min',
                openingYear: 1971,
                description: 'Enter a haunted estate and ride a "Doom Buggy" through 999 happy haunts, ghostly ballrooms, hitchhiking ghosts, and supernatural surprises.',
                history: 'Haunted Mansion opened with Magic Kingdom on October 1, 1971. Development began in 1951 under Walt Disney himself, who envisioned a walk-through haunted house. After his death, Imagineers Marc Davis and Claude Coats debated whether it should be "funny" or "scary" — the final result blended both visions perfectly. The iconic Pepper\'s Ghost illusion used in the ballroom scene was patented in 1863 and is still used today.',
                trivia: [
                  'The ballroom scene uses a 150-year-old theatrical technique called "Pepper\'s Ghost illusion"',
                  'Madame Leota in the crystal ball is voiced and modeled after Imagineer Leota Toombs',
                  'There are officially "999 happy haunts" — but there\'s room for one more!',
                  'The stretching room portraits include Constance the Black Widow bride, who has had 5 husbands all die',
                  'The hitchhiking ghosts are named Ezra, Gus, and Professor Phineas Plump',
                  'The ride vehicles are called Doom Buggies and carry guests through the entire attraction'
                ],
                specs: { type: 'Omnimover Dark Ride', vehicles: 'Doom Buggies', capacity: '~2,700/hr', duration: '9 min', haunts: 999 },
                mustDo: true,
                lightningLane: true,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Haunted_Mansion_WDW.jpg/640px-Haunted_Mansion_WDW.jpg',
                tags: ['classic', 'family', 'spooky', 'iconic']
              },
              {
                id: 'liberty-belle',
                name: 'Liberty Belle Riverboat',
                type: 'Boat Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~17 min',
                openingYear: 1971,
                description: 'A relaxing cruise on an authentic steam-powered riverboat around the Rivers of America, past Native American villages and frontier scenes.',
                history: 'The Liberty Belle Riverboat is a genuine steam-powered sternwheeler, one of the few real steam-powered attractions at Disney. Originally called the Admiral Joe Fowler, it was renamed the Liberty Belle in 1996.',
                trivia: [
                  'The Liberty Belle is a genuine steam-powered paddlewheel boat',
                  'It travels on a track beneath the water — the captain\'s wheel is purely decorative',
                  'It\'s named after the Liberty Bell in Philadelphia',
                  'The Rivers of America surround Tom Sawyer Island'
                ],
                specs: { type: 'Steam Paddlewheel Riverboat', capacity: '~450 guests', duration: '17 min' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['relaxing', 'family', 'historical']
              }
            ]
          },
          {
            id: 'fantasyland',
            name: 'Fantasyland',
            rides: [
              {
                id: 'seven-dwarfs-mine-train',
                name: "Seven Dwarfs Mine Train",
                type: 'Roller Coaster',
                thrillLevel: 2,
                heightRequirement: 38,
                duration: '~2.5 min',
                openingYear: 2014,
                description: 'Join Snow White\'s seven dwarfs in their diamond mine on this family-friendly coaster with swinging mine cars and enchanting animatronics.',
                history: 'Seven Dwarfs Mine Train opened on May 28, 2014 as the centerpiece of the New Fantasyland expansion — the largest expansion in Magic Kingdom\'s history. The $150 million attraction features a unique ride system where each mine car swings independently side-to-side, creating a one-of-a-kind coaster experience. It consistently has some of the longest wait times in all of Walt Disney World.',
                trivia: [
                  'The mine cars swing independently — you can rock them by shifting your weight',
                  'The queue includes an interactive water xylophone guests can play',
                  'The ride features elaborate audioanimatronics of all seven dwarfs in the mine',
                  'It was part of the $1.4 billion New Fantasyland expansion',
                  'The final scene shows Snow White dancing with the Prince in a tower window'
                ],
                specs: { type: 'Family Roller Coaster (Swinging Cars)', heightRequirement: '38 inches', topSpeed: '34 mph', duration: '2.5 min', drops: 2 },
                mustDo: true,
                lightningLane: true,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Seven_Dwarfs_Mine_Train.jpg/640px-Seven_Dwarfs_Mine_Train.jpg',
                tags: ['thrill', 'family', 'coaster', 'princess']
              },
              {
                id: 'peter-pans-flight',
                name: "Peter Pan's Flight",
                type: 'Dark Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~2.5 min',
                openingYear: 1971,
                description: 'Fly over London and into Neverland aboard a magical pirate ship, soaring above twinkling miniature scenes from the beloved film.',
                history: 'Peter Pan\'s Flight is one of the original opening-day attractions at Magic Kingdom (1971) and Disneyland (1955). The signature illusion is that guests actually fly — the ships hang from an overhead track, making riders feel like they\'re soaring through the air. It\'s known for having some of the longest standby wait times relative to its actual thrill level.',
                trivia: [
                  'Your ship hangs from a track above you, creating the illusion of flying',
                  'The opening panorama of London was inspired by a real view Walt Disney saw from a hotel',
                  'Despite being a gentle ride, it frequently has 60–90 minute wait times',
                  'The "second star to the right" opening is one of the most beloved moments in Disney parks',
                  'Tinker Bell\'s pixie dust sparkles are created with fiber optics'
                ],
                specs: { type: 'Suspended Dark Ride', capacity: '~3 per ship', duration: '2.5 min' },
                mustDo: true,
                lightningLane: true,
                imageUrl: '',
                tags: ['classic', 'family', 'magical', 'flying']
              },
              {
                id: 'its-a-small-world',
                name: "it is a small world",
                type: 'Boat Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~11 min',
                openingYear: 1971,
                description: 'Sail through a kaleidoscopic journey celebrating the children of the world through 300+ singing, dancing dolls representing every nation.',
                history: 'It\'s a small world was originally created for the 1964–65 New York World\'s Fair as a tribute to UNICEF. Walt Disney commissioned it at the last minute when four other attractions were behind schedule. The Sherman Brothers composed the famous theme song in a single day. The attraction\'s gentle pace and cheerful song have made it simultaneously one of Disney\'s most beloved and most jokingly "stuck in your head" attractions.',
                trivia: [
                  'The theme song was written by Richard and Robert Sherman in a single day',
                  'Over 300 audio-animatronic children represent dozens of cultures',
                  'The song is translated into multiple languages and plays continuously — you\'ll hear it in your dreams',
                  'Walt asked the Sherman Brothers to write "the most annoying song possible" — they succeeded',
                  'The ride was updated in 2005–2009 to include Disney characters hidden among the dolls'
                ],
                specs: { type: 'Slow Boat Ride', capacity: '~20 per boat', duration: '11 min', dolls: '300+' },
                mustDo: true,
                lightningLane: false,
                imageUrl: '',
                tags: ['classic', 'family', 'kids', 'cheerful']
              },
              {
                id: 'winnie-the-pooh',
                name: "The Many Adventures of Winnie the Pooh",
                type: 'Dark Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~4 min',
                openingYear: 1999,
                description: 'Climb into a giant honey pot and bounce through the Hundred Acre Wood with Pooh, Tigger, Eeyore, Piglet, and friends.',
                history: 'Opened in 1999, Many Adventures of Winnie the Pooh replaced Mr. Toad\'s Wild Ride, which saddened many Disney fans. The attraction is known for its "blustery day" sequence where honey pots seem to bounce with the wind.',
                trivia: [
                  'This ride replaced the beloved Mr. Toad\'s Wild Ride in 1999, which had been there since 1971',
                  'A portrait of Mr. Toad handing Owl the deed to the property is visible in the queue as an homage',
                  'The ride vehicles are shaped like giant honey pots',
                  'You can interact with digital Heffalumps and Woozles in the queue area'
                ],
                specs: { type: 'Dark Ride', capacity: '~4 per honey pot', duration: '4 min' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['family', 'kids', 'pooh']
              },
              {
                id: 'dumbo',
                name: 'Dumbo the Flying Elephant',
                type: 'Aerial Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~2 min',
                openingYear: 1971,
                description: 'Soar above Storybook Circus on the back of Dumbo — the famous flying elephant. Control how high your elephant climbs!',
                history: 'One of the original opening-day attractions at both Disneyland and Magic Kingdom, Dumbo has been spinning guests since 1955. The Magic Kingdom version was doubled in size in 2012 as part of the New Fantasyland expansion, adding a second spinner and a massive air-conditioned tent with interactive play areas for children to enjoy while waiting.',
                trivia: [
                  'There are TWO Dumbo spinners side by side — they alternate so waits are shorter',
                  'The queue is an air-conditioned tent with an interactive play area for kids',
                  'When you enter, you get a pager so kids can play while adults wait — then you get called when it\'s your turn',
                  'Dumbo is considered the most iconic symbol of Disney besides Mickey Mouse himself'
                ],
                specs: { type: 'Aerial Spinner', elephants: 32, height: 'Controllable' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['family', 'kids', 'classic', 'aerial']
              }
            ]
          },
          {
            id: 'tomorrowland',
            name: 'Tomorrowland',
            rides: [
              {
                id: 'tron-lightcycle',
                name: 'TRON Lightcycle / Run',
                type: 'Roller Coaster',
                thrillLevel: 4,
                heightRequirement: 44,
                duration: '~2.5 min',
                openingYear: 2023,
                description: 'Straddle a lightcycle and launch into the Grid at lightning speed — both inside and outside the canopy — in one of the fastest rides at Disney World.',
                history: 'TRON Lightcycle / Run opened April 4, 2023 after years of anticipation. A version of the ride had been operating at Shanghai Disneyland since 2016. The Magic Kingdom version features an extended outdoor section, adding an entirely new dimension to the experience. Construction took over 5 years.',
                trivia: [
                  'You ride motorcycles — straddling the vehicles like an actual lightcycle from the film',
                  'The ride reaches 59 mph — making it the fastest coaster at Walt Disney World',
                  'Shanghai Disneyland got this ride in 2016; Magic Kingdom waited until 2023',
                  'The iconic glowing canopy cost hundreds of millions to construct',
                  'There are both indoor (grid environment) and outdoor sections of the track'
                ],
                specs: { type: 'Motorbike Launch Coaster', heightRequirement: '44 inches', topSpeed: '59 mph', duration: '2.5 min', indoor: 'Partially indoor + outdoor' },
                mustDo: true,
                lightningLane: true,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/TRON_Lightcycle_Run_at_Magic_Kingdom.jpg/640px-TRON_Lightcycle_Run_at_Magic_Kingdom.jpg',
                tags: ['thrill', 'coaster', 'new', 'iconic']
              },
              {
                id: 'space-mountain',
                name: 'Space Mountain',
                type: 'Roller Coaster',
                thrillLevel: 3,
                heightRequirement: 44,
                duration: '~3 min',
                openingYear: 1975,
                description: 'Blast off into the darkness of outer space on this classic indoor roller coaster, navigating the cosmos at speed in near-total blackness.',
                history: 'Space Mountain opened January 15, 1975 and was one of the first major indoor roller coasters in the world. The mountain-shaped structure is actually taller than Cinderella Castle. The ride underwent a major refurbishment in 2023–2024, emerging with a brand-new, more comfortable ride vehicle system while retaining its classic dark space atmosphere.',
                trivia: [
                  'Space Mountain\'s structure is actually taller than Cinderella Castle — it\'s just hidden by the shape',
                  'There are actually TWO separate roller coaster tracks inside: Omega and Alpha',
                  'The max speed is only 28 mph — but the darkness makes it feel much faster',
                  'It was one of the first entirely enclosed roller coasters in the world when it opened',
                  'The 2023–24 refurbishment gave it new ride vehicles with lap bars instead of seatbelts'
                ],
                specs: { type: 'Indoor Steel Coaster', heightRequirement: '44 inches', topSpeed: '28 mph', duration: '3 min', tracks: 2 },
                mustDo: true,
                lightningLane: true,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/WDW_Magic_Kingdom_Space_Mountain.jpg/640px-WDW_Magic_Kingdom_Space_Mountain.jpg',
                tags: ['thrill', 'coaster', 'classic', 'dark']
              },
              {
                id: 'buzz-lightyear',
                name: "Buzz Lightyear's Space Ranger Spin",
                type: 'Shooter Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~4.5 min',
                openingYear: 1998,
                description: 'Help Buzz Lightyear defeat the Evil Emperor Zurg! Spin your vehicle and blast laser cannons at targets to earn the highest score.',
                history: 'Opened in 1998, Buzz Lightyear\'s Space Ranger Spin was one of the first interactive dark rides at Walt Disney World, pioneering the shooter-ride format that later inspired Toy Story Mania. The ride received updates in 2024 with new animatronic technology.',
                trivia: [
                  'There are "secret" high-value targets on the ride — the volcano and Zurg himself score the most',
                  'Your score is tracked and you receive a Space Ranger ranking at the end',
                  'The vehicles can be spun 360 degrees using the joystick',
                  'The Zurg robot was one of the first Audio-Animatronics programmed with 3D movement'
                ],
                specs: { type: 'Interactive Dark Ride', capacity: '~2 per vehicle', targets: '100+' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['family', 'interactive', 'shooter', 'toy-story']
              },
              {
                id: 'tomorrowland-speedway',
                name: 'Tomorrowland Speedway',
                type: 'Go-Kart',
                thrillLevel: 1,
                heightRequirement: 32,
                duration: '~5 min',
                openingYear: 1971,
                description: 'Drive a gas-powered race car around a winding track — for kids who dream of getting behind the wheel for the first time.',
                history: 'One of the original opening-day attractions, Tomorrowland Speedway has been entertaining young drivers since 1971. The cars run on gasoline (not electricity) and follow a guided track rail. Kids under 54 inches must ride with an adult.',
                trivia: [
                  'The cars are actually gas-powered, not electric — you can smell the exhaust',
                  'There is a rail in the middle of the track — you literally cannot steer off course',
                  'Drivers under 54" must ride with an adult; drivers 54"+ can ride solo',
                  'The track was shortened during the TRON construction to make room'
                ],
                specs: { type: 'Gas-Powered Go-Karts', heightRequirement: '32" to ride, 54" to drive alone', speed: 'Approximately 7 mph' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['family', 'kids', 'driving']
              },
              {
                id: 'peoplemover',
                name: 'Tomorrowland Transit Authority PeopleMover',
                type: 'Transit Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~10 min',
                openingYear: 1975,
                description: 'Glide through Tomorrowland — and even briefly through Space Mountain! — on this breezy, narrated transit system above the land.',
                history: 'The PeopleMover opened in 1975, using a Linear Induction Motor system — the vehicles have no engines and are propelled by the electromagnetic track. Walt Disney envisioned this technology as the future of urban transportation. The ride passes through Space Mountain briefly, giving glimpses of the coaster in the dark.',
                trivia: [
                  'The vehicles have no engine — they\'re propelled by magnets in the track (Linear Induction Motor)',
                  'The ride briefly passes THROUGH Space Mountain, giving you a peek inside',
                  'It was Walt Disney\'s vision for future city transportation technology',
                  'It\'s completely powered by electricity and produces no emissions',
                  'The ride never stops moving — it slows for boarding and unloading'
                ],
                specs: { type: 'Electric Omnimover Transit', speed: '~7 mph', duration: '10 min', power: 'Linear Induction Motor' },
                mustDo: true,
                lightningLane: false,
                imageUrl: '',
                tags: ['relaxing', 'family', 'classic', 'views']
              },
              {
                id: 'carousel-of-progress',
                name: "Walt Disney's Carousel of Progress",
                type: 'Theater Show',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~22 min',
                openingYear: 1975,
                description: 'Take a rotating journey through the 20th century with an Audio-Animatronic family, witnessing how electricity and technology transformed daily American life.',
                history: 'Originally created for the 1964 New York World\'s Fair, sponsored by General Electric, Carousel of Progress moved to Disneyland in 1967 then to Magic Kingdom in 1975. It remains the longest-running stage show in American theater history. Walt Disney himself called it his favorite attraction. The "Great Big Beautiful Tomorrow" theme song was written by the Sherman Brothers.',
                trivia: [
                  'Walt Disney personally called this his favorite attraction in all of Disney',
                  'It\'s the longest-running stage show in the history of American theater',
                  'The theater itself rotates around a fixed stage — not the other way around',
                  'The song "There\'s a Great Big Beautiful Tomorrow" was written by the Sherman Brothers',
                  'The family\'s dog Rover/Spot is seen in every scene hiding somewhere'
                ],
                specs: { type: 'Rotating Theater', acts: 4, audience: '~240 per show', duration: '22 min' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['classic', 'historical', 'family', 'show']
              }
            ]
          }
        ]
      },

      // ─────────────────────────────────────────────
      //  EPCOT
      // ─────────────────────────────────────────────
      {
        id: 'epcot',
        name: 'EPCOT',
        emoji: '🌍',
        accentColor: '#00A8CC',
        gradientFrom: '#0a3d52',
        gradientTo: '#0a0f1e',
        description: 'Experimental Prototype Community of Tomorrow — a celebration of human achievement, world cultures, and technological innovation.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Spaceship_Earth_2022.jpg/640px-Spaceship_Earth_2022.jpg',
        openingYear: 1982,
        lands: [
          {
            id: 'world-celebration',
            name: 'World Celebration',
            rides: [
              {
                id: 'spaceship-earth',
                name: 'Spaceship Earth',
                type: 'Dark Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~15 min',
                openingYear: 1982,
                description: 'Travel through the entire history of human communication — from cave paintings to the digital age — inside EPCOT\'s iconic geodesic sphere.',
                history: 'Spaceship Earth opened with EPCOT Center on October 1, 1982. The geodesic sphere is 180 feet tall and weighs approximately 16 million pounds. The attraction was sponsored by AT&T, then Siemens. Judi Dench narrates the current version of the ride. Originally the sphere was intended to be much taller, but FAA regulations about airport flight paths limited the height.',
                trivia: [
                  'The sphere weighs approximately 16 million pounds and contains about 11,324 triangular panels',
                  'Rainwater hitting the sphere drains inside the structure — it never drips off the outside',
                  'The original narrators included Walter Cronkite and Jeremy Irons before Judi Dench',
                  'The geodesic sphere design was pioneered by architect Buckminster Fuller',
                  'At the top of the ride, there\'s a stunning view of EPCOT\'s miniature model'
                ],
                specs: { type: 'Omnimover Dark Ride', heightFt: 180, weightLbs: '16,000,000', panels: 11324, duration: '15 min' },
                mustDo: true,
                lightningLane: false,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Spaceship_Earth_2022.jpg/640px-Spaceship_Earth_2022.jpg',
                tags: ['iconic', 'classic', 'educational', 'relaxing']
              },
              {
                id: 'figment',
                name: 'Journey Into Imagination with Figment',
                type: 'Dark Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~6 min',
                openingYear: 2002,
                description: 'Join the mischievous purple dragon Figment as he playfully disrupts Dr. Channing\'s Imagination Institute — engaging all your senses along the way.',
                history: 'The original Journey into Imagination opened in 1983 with Figment and Dreamfinder — two of EPCOT\'s most beloved original characters. The ride was controversially reimagined in 1999 without Figment, causing massive fan backlash. After petitions and public outcry, Figment was restored in a 2002 version that remains today.',
                trivia: [
                  'Figment\'s original 1983 design was so beloved that fans petitioned to bring him back after a controversial 1999 redesign',
                  'The original Dreamfinder character was removed but remains beloved by Disney fans',
                  'The skunk scene makes everyone in the theater smell like skunk — it\'s real!',
                  'Figment is one of the few original EPCOT characters still featured in the park'
                ],
                specs: { type: 'Omnimover Dark Ride', duration: '6 min', specialEffects: 'Scent, sound, sight stimulation' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['family', 'classic', 'epcot-original']
              },
              {
                id: 'remys-ratatouille',
                name: "Remy's Ratatouille Adventure",
                type: 'Dark Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~4.5 min',
                openingYear: 2021,
                description: 'Shrink down to the size of a rat and scurry through Gusteau\'s famous Parisian restaurant alongside Remy in this delightful 4D trackless dark ride.',
                history: 'Remy\'s Ratatouille Adventure opened in October 2021 at EPCOT, adapted from the version that opened at Disneyland Paris in 2014. It was part of EPCOT\'s massive multi-year transformation. The ride uses a trackless vehicle system, meaning cars can move in any direction and each ride experience can be slightly different.',
                trivia: [
                  'The original version of this ride opened at Disneyland Paris in 2014',
                  'The ride vehicles are trackless — they can go in any direction without a fixed track',
                  'You literally shrink to rat size — the tables and chairs are enormous',
                  'The famous French chef Gusteau\'s restaurant is fully recreated in stunning detail'
                ],
                specs: { type: 'Trackless Dark Ride', system: 'Trackless (no fixed rail)', duration: '4.5 min' },
                mustDo: true,
                lightningLane: true,
                imageUrl: '',
                tags: ['family', 'new', 'pixar', 'france']
              }
            ]
          },
          {
            id: 'world-discovery',
            name: 'World Discovery',
            rides: [
              {
                id: 'guardians-cosmic-rewind',
                name: 'Guardians of the Galaxy: Cosmic Rewind',
                type: 'Roller Coaster',
                thrillLevel: 4,
                heightRequirement: 42,
                duration: '~4 min',
                openingYear: 2022,
                description: 'Board a Starjumper ship and rocket through the cosmos on this reverse-launch coaster set to a Guardians of the Galaxy "awesome mix" soundtrack.',
                history: 'Cosmic Rewind opened May 27, 2022 as the world\'s first "other-world showcase" pavilion at EPCOT. The ride is a reverse-launch coaster — meaning it launches backward before heading forward. It also features rotating ride vehicles, allowing guests to always face the action.',
                trivia: [
                  'It\'s the longest enclosed roller coaster in the world — the single track run is incredibly long',
                  'The coaster vehicles ROTATE to always face the action — a first for Disney',
                  'The launch is backward first, then forward — very disorienting in the best way',
                  'There are multiple different songs that can play during the ride — you might get Earth, Wind & Fire or Journey',
                  'The queue features an actual "Galaxarium" exhibit about the universe'
                ],
                specs: { type: 'Reverse-Launch Rotating Coaster', heightRequirement: '42 inches', launch: 'Backward then forward', topSpeed: '60 mph', duration: '4 min' },
                mustDo: true,
                lightningLane: true,
                imageUrl: '',
                tags: ['thrill', 'coaster', 'new', 'marvel', 'music']
              },
              {
                id: 'test-track',
                name: 'Test Track',
                type: 'Simulator Ride',
                thrillLevel: 2,
                heightRequirement: 40,
                duration: '~5 min',
                openingYear: 1999,
                description: 'Design your own virtual concept car and then put it through extreme testing conditions — finishing with a high-speed exterior track run at 65 mph.',
                history: 'Test Track replaced World of Motion in 1999 and was subsequently reimagined with a Tron-like digital aesthetic in 2012. The ride simulates automotive performance testing, and the final high-speed run around the exterior of the building is genuinely thrilling.',
                trivia: [
                  'The final speed burst hits 65 mph — genuinely fast for a theme park ride',
                  'You design your own car in the pre-show; it\'s then "tested" during your ride',
                  'The extreme cold room drops to a chilling temperature — dress accordingly!',
                  'Test Track is sponsored by General Motors/Chevrolet'
                ],
                specs: { type: 'SimCar Ride', heightRequirement: '40 inches', topSpeed: '65 mph', duration: '5 min' },
                mustDo: true,
                lightningLane: true,
                imageUrl: '',
                tags: ['thrill', 'cars', 'speed', 'interactive']
              },
              {
                id: 'mission-space',
                name: 'Mission: SPACE',
                type: 'Centrifuge Simulator',
                thrillLevel: 4,
                heightRequirement: 44,
                duration: '~5 min',
                openingYear: 2003,
                description: 'Experience a realistic space mission simulation — either an intense Mars mission (Orange) or a gentler Earth orbit (Green). The Orange mission uses a centrifuge to simulate 2.5G forces.',
                history: 'Mission: SPACE opened in 2003 and was one of the most technologically advanced Disney attractions ever built. The Orange Mission simulates a launch to Mars using an actual centrifuge that spins riders, generating real G-forces. It\'s one of a handful of theme park rides with legitimate medical warnings — guests with heart conditions, claustrophobia, or motion sensitivity are advised to choose the Green Mission.',
                trivia: [
                  'The Orange Mission uses a real centrifuge — you genuinely experience 2.5G of force',
                  'Multiple guests have fainted or required medical attention on the Orange Mission — it\'s no joke',
                  'There are vomit bags in the ride vehicle — and they are used!',
                  'The Green Mission is a much gentler Earth orbit without the centrifuge spinning',
                  'Gary Sinise narrates the Orange Mission'
                ],
                specs: { type: 'Centrifuge Simulator', heightRequirement: '44" Orange / 40" Green', gForce: '2.5G (Orange Mission only)', duration: '5 min', missions: 2 },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['thrill', 'space', 'intense', 'simulator']
              }
            ]
          },
          {
            id: 'world-nature',
            name: 'World Nature',
            rides: [
              {
                id: 'soarin',
                name: "Soarin' Around the World",
                type: 'Hang Glider Simulator',
                thrillLevel: 1,
                heightRequirement: 40,
                duration: '~5 min',
                openingYear: 2001,
                description: 'Hang glide around the world\'s most stunning natural and man-made wonders on an enormous IMAX screen, complete with synchronized scents and gentle breezes.',
                history: 'The original Soarin\' Over California opened at Disney California Adventure in 2001. The EPCOT version opened in 2005 as "Soarin\'." In 2016 the film was updated to "Soarin\' Around the World," featuring global landmarks instead of just California. The ride suspends guests 40 feet in the air in front of an IMAX dome screen.',
                trivia: [
                  'You can smell oranges, pine, ocean air, and flowers during corresponding scenes',
                  'The film takes you to the Matterhorn, the Taj Mahal, the Great Wall, Fiji, and more',
                  'Look for the tiny hidden Mickey in the final flying scene over the fireworks',
                  'Guests are lifted 40 feet off the ground on the hang glider apparatus',
                  'Try to get a top-row seat — lower rows feel like feet dangling in your face'
                ],
                specs: { type: 'Hang Glider Simulator / IMAX Dome', heightRequirement: '40 inches', screenSize: '80-foot IMAX dome', duration: '5 min', height: '40 feet suspended' },
                mustDo: true,
                lightningLane: true,
                imageUrl: '',
                tags: ['family', 'immersive', 'stunning', 'smells']
              },
              {
                id: 'living-with-the-land',
                name: 'Living with the Land',
                type: 'Boat Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~14 min',
                openingYear: 1982,
                description: 'Glide through actual working greenhouses and research facilities where Disney scientists grow food used in the park\'s restaurants.',
                history: 'One of EPCOT\'s original opening-day attractions, Living with the Land (originally "Listen to the Land") is unique among theme park rides in that it\'s actually functional — the greenhouses on the tour are real working agricultural research facilities producing food served at EPCOT restaurants.',
                trivia: [
                  'The produce grown in the greenhouses is actually used in EPCOT\'s restaurants',
                  'Disney\'s agricultural scientists grow plants in nutrient film, aeroponics, and aquaponic systems',
                  'There are fish farms, bug farms, and exotic fruits including a Mickey Mouse-shaped pumpkin variety',
                  'The scientists working in the labs are real — you might wave to them through the glass'
                ],
                specs: { type: 'Educational Boat Tour', duration: '14 min', greenhouse: 'Real working research farm' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['educational', 'relaxing', 'nature', 'unique']
              },
              {
                id: 'seas-with-nemo',
                name: "The Seas with Nemo & Friends",
                type: 'Dark Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~4.5 min',
                openingYear: 2007,
                description: 'Follow Nemo through a "clamobile" as he swims through the actual aquarium tanks of The Seas pavilion, magically overlaid with Finding Nemo characters.',
                history: 'The Seas pavilion opened in 1986 as one of the world\'s largest saltwater aquariums. The Finding Nemo overlay ride opened in 2007. The tanks visible through the ride are real ocean ecosystems home to hundreds of actual sea creatures.',
                trivia: [
                  'The aquarium tanks you ride through contain real ocean animals — not props',
                  'The Seas pavilion houses one of the largest inland saltwater aquariums in the world',
                  'Nemo and his friends are digitally projected to appear to swim alongside real fish',
                  'After the ride you can visit the Turtle Talk with Crush interactive show'
                ],
                specs: { type: 'Omnimover Dark Ride', aquariumGallons: '5.7 million', duration: '4.5 min' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['family', 'kids', 'ocean', 'nemo']
              }
            ]
          },
          {
            id: 'world-showcase',
            name: 'World Showcase',
            rides: [
              {
                id: 'frozen-ever-after',
                name: 'Frozen Ever After',
                type: 'Boat Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~5 min',
                openingYear: 2016,
                description: 'Sail through Arendelle and celebrate the Winter in Summer Jubilee with Elsa, Anna, Kristoff, Sven, and Olaf in this enchanting boat ride.',
                history: 'Frozen Ever After replaced the beloved Maelstrom ride in Norway in 2016 to mixed fan reaction. However, the ride proved immediately popular, consistently drawing the longest standby waits in EPCOT. It\'s the most popular attraction in the Norway Pavilion by a wide margin.',
                trivia: [
                  'This replaced the beloved Maelstrom ride in 2016 — to the dismay of many EPCOT purists',
                  'Despite backlash about replacing Maelstrom, Frozen Ever After immediately became one of EPCOT\'s most popular rides',
                  'The Elsa animatronic is one of the most technologically advanced in Disney history',
                  'The ride goes slightly backwards at one point before the big drop'
                ],
                specs: { type: 'Boat Ride', duration: '5 min', smallDrop: true },
                mustDo: true,
                lightningLane: true,
                imageUrl: '',
                tags: ['family', 'frozen', 'princess', 'norway']
              },
              {
                id: 'gran-fiesta-tour',
                name: 'Gran Fiesta Tour Starring the Three Caballeros',
                type: 'Boat Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~8 min',
                openingYear: 2007,
                description: 'Float through a colorful boat tour celebrating Mexican culture, music, and art with Donald Duck and the Three Caballeros.',
                history: 'Gran Fiesta Tour replaced "El Rio del Tiempo" in 2007, incorporating characters from the 1944 film The Three Caballeros. It\'s a gentle tour through vibrant scenes of Mexican culture and the fiesta.',
                trivia: [
                  'The ride is located inside the Mexico Pavilion pyramid — entirely indoors',
                  'The Three Caballeros are Donald Duck, José Carioca (Brazil), and Panchito Pistoles (Mexico)',
                  'The original ride was called "El Rio del Tiempo" (The River of Time) from 1982–2007'
                ],
                specs: { type: 'Slow Boat Ride', duration: '8 min', location: 'Inside Mexico pyramid' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['family', 'relaxing', 'mexico', 'cultural']
              }
            ]
          }
        ]
      },

      // ─────────────────────────────────────────────
      //  HOLLYWOOD STUDIOS
      // ─────────────────────────────────────────────
      {
        id: 'hollywood-studios',
        name: "Disney's Hollywood Studios",
        emoji: '🎬',
        accentColor: '#C0392B',
        gradientFrom: '#4a1010',
        gradientTo: '#0a0f1e',
        description: 'Step into the movies — from Star Wars and Toy Story to Tower of Terror and Rock n\' Roll — at Disney\'s most thrilling park.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Disney_Hollywood_Studios_Entrance.jpg/640px-Disney_Hollywood_Studios_Entrance.jpg',
        openingYear: 1989,
        lands: [
          {
            id: 'galaxy-edge',
            name: "Star Wars: Galaxy's Edge",
            rides: [
              {
                id: 'rise-of-resistance',
                name: "Star Wars: Rise of the Resistance",
                type: 'Dark Ride',
                thrillLevel: 3,
                heightRequirement: 40,
                duration: '~18 min',
                openingYear: 2019,
                description: 'The most immersive ride in Walt Disney World history. Join the Resistance, get captured by the First Order, escape from a Star Destroyer, and fight your way to freedom.',
                history: 'Rise of the Resistance opened December 5, 2019 after years of hype. At the time it was widely considered the most ambitious theme park attraction ever built. The multi-room experience involves multiple vehicles, a simulated transport flight, and walking through an actual full-scale First Order Star Destroyer hangar. Daisy Ridley (Rey), John Boyega (Finn), and Oscar Isaac (Poe) all appear.',
                trivia: [
                  'You board THREE different vehicles throughout the experience — a transport, a prison transport, and an escape vehicle',
                  'The First Order Star Destroyer hangar is full-scale and genuinely enormous — a real architectural feat',
                  'The entire experience from pre-show to exit takes about 18 minutes',
                  'The ride uses a trackless vehicle system and drops, motion simulation, and physical sets all in one',
                  'Daisy Ridley, John Boyega, and Oscar Isaac filmed custom footage for the attraction'
                ],
                specs: { type: 'Multi-Vehicle Immersive Dark Ride', heightRequirement: '40 inches', duration: '~18 min (full experience)', vehicles: 3, drop: true },
                mustDo: true,
                lightningLane: true,
                imageUrl: '',
                tags: ['thrill', 'immersive', 'star-wars', 'iconic', 'must-do']
              },
              {
                id: 'millennium-falcon',
                name: "Millennium Falcon: Smugglers Run",
                type: 'Interactive Ride',
                thrillLevel: 2,
                heightRequirement: 38,
                duration: '~5 min',
                openingYear: 2019,
                description: 'Pilot the actual Millennium Falcon! Take the controls as pilot, gunner, or engineer on a smuggling mission — and your performance actually affects the outcome.',
                history: 'Smugglers Run opened with Galaxy\'s Edge on August 29, 2019. The Millennium Falcon cockpit set is meticulously detailed. There are three roles: pilots (who steer), gunners (who shoot), and engineers (who manage damage). Each group\'s performance affects the mission outcome and how much damage the Falcon takes.',
                trivia: [
                  'The Millennium Falcon in the queue is a full-scale replica — genuinely massive',
                  'There are three job roles: Pilot (you steer), Gunner (you shoot), Engineer (you fix)',
                  'If you crash a lot, Hondo will "scold" you during the ride',
                  'The cockpit matches the film prop almost exactly — every button is there',
                  'Your mission score can result in different amounts of credits from Hondo at the end'
                ],
                specs: { type: 'Interactive Motion Simulator', heightRequirement: '38 inches', crew: 6, roles: ['Pilot', 'Gunner', 'Engineer'], duration: '5 min' },
                mustDo: true,
                lightningLane: true,
                imageUrl: '',
                tags: ['thrill', 'interactive', 'star-wars', 'simulator']
              }
            ]
          },
          {
            id: 'toy-story-land',
            name: 'Toy Story Land',
            rides: [
              {
                id: 'slinky-dog-dash',
                name: 'Slinky Dog Dash',
                type: 'Roller Coaster',
                thrillLevel: 2,
                heightRequirement: 38,
                duration: '~2 min',
                openingYear: 2018,
                description: 'Ride Slinky Dog himself as he launches across a backyard roller coaster designed by Andy — full of dips, turns, and an unexpected second launch!',
                history: 'Slinky Dog Dash opened June 30, 2018 as part of the Toy Story Land expansion. It features a second launch midway through the ride, surprising many guests who expect a traditional coaster layout. The coaster tells the story of Andy building the ride himself with his toys.',
                trivia: [
                  'There\'s a surprise SECOND launch about halfway through the ride',
                  'The slinky body between the cars is a full working slinky material stretched between vehicles',
                  'At night the ride lights up in neon colors — a completely different experience after dark',
                  'You\'re shrunk down to toy size — everything around you is giant Andy\'s backyard'
                ],
                specs: { type: 'Family Launch Coaster', heightRequirement: '38 inches', topSpeed: '40 mph', launches: 2, duration: '2 min' },
                mustDo: true,
                lightningLane: true,
                imageUrl: '',
                tags: ['thrill', 'family', 'coaster', 'toy-story']
              },
              {
                id: 'toy-story-mania',
                name: "Toy Story Mania!",
                type: 'Shooter Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~7 min',
                openingYear: 2008,
                description: 'Put on your 3D glasses and shoot your way through five carnival game midways alongside Woody, Buzz, Hamm, and the Toy Story gang.',
                history: 'Toy Story Mania! opened in 2008 and was the first major ride to open at Hollywood Studios in a decade. The ride was so popular it had some of the longest waits in all of Disney World for years after opening.',
                trivia: [
                  'The plates you throw virtual pies at shatter differently depending on which target you hit',
                  'There are "secret" Easter egg targets that grant huge point bonuses',
                  'The ride adjusts difficulty based on your previous shots to keep the game competitive',
                  'Mr. Potato Head in the queue is one of the most sophisticated Audio-Animatronic figures at Disney'
                ],
                specs: { type: 'Interactive 4D Shooter', capacity: '~2 per car', games: 5, duration: '7 min' },
                mustDo: false,
                lightningLane: true,
                imageUrl: '',
                tags: ['family', 'interactive', 'shooter', 'toy-story']
              },
              {
                id: 'alien-swirling-saucers',
                name: 'Alien Swirling Saucers',
                type: 'Spinning Ride',
                thrillLevel: 1,
                heightRequirement: 32,
                duration: '~2 min',
                openingYear: 2018,
                description: 'Zip around in rocket-ship toys inside a giant alien claw machine, swinging wildly as the Little Green Men try to get abducted by THE CLAW.',
                history: 'Opened with Toy Story Land in 2018, Alien Swirling Saucers is an energetic spinning ride. The theming imagines you\'ve been shrunk to toy size inside Pizza Planet.',
                trivia: [
                  'The ride is themed as if you\'re a toy inside the Pizza Planet alien claw machine from Toy Story',
                  'You are in the UFO — the Little Green Men aliens are in separate cars being "abducted"',
                  'The music is extremely catchy and continues the Space Cha-Cha theme from the area'
                ],
                specs: { type: 'Spinning Ride', heightRequirement: '32 inches', duration: '2 min' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['family', 'spinning', 'toy-story', 'kids']
              }
            ]
          },
          {
            id: 'sunset-blvd',
            name: 'Sunset Boulevard',
            rides: [
              {
                id: 'tower-of-terror',
                name: 'The Twilight Zone Tower of Terror',
                type: 'Drop Ride',
                thrillLevel: 5,
                heightRequirement: 40,
                duration: '~10 min',
                openingYear: 1994,
                description: 'Check into the haunted Hollywood Tower Hotel, then plunge in a maintenance elevator — dropping and launching unpredictably 13 stories while experiencing The Twilight Zone.',
                history: 'Tower of Terror opened July 22, 1994 and immediately became a landmark of Hollywood Studios. The story involves a 1939 lightning strike that sent an elevator cab — with guests inside — into the Twilight Zone. The ride uses a randomized drop sequence, so no two rides are exactly the same. Rod Serling\'s likeness and voice appear in the pre-show.',
                trivia: [
                  'The elevator drop sequence is RANDOMIZED — no two rides are exactly the same',
                  'The ride drops multiple times — some up, some down, always unpredictable',
                  'Rod Serling\'s archival footage is used to narrate the opening',
                  'The hotel facade is genuinely 199 feet tall — designed to be visible from miles away',
                  'There are 5th Dimension scenes at the top before the drops begin'
                ],
                specs: { type: 'Freefall Drop Ride', heightRequirement: '40 inches', drops: 'Randomized sequence', height: '13 stories / 199 ft', topSpeed: '39 mph drop' },
                mustDo: true,
                lightningLane: true,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Tower_of_Terror_at_Disney%27s_Hollywood_Studios.jpg/640px-Tower_of_Terror_at_Disney%27s_Hollywood_Studios.jpg',
                tags: ['thrill', 'scary', 'iconic', 'drop', 'twilight-zone']
              },
              {
                id: 'rock-n-roller-coaster',
                name: "Rock 'n' Roller Coaster Starring Aerosmith",
                type: 'Roller Coaster',
                thrillLevel: 5,
                heightRequirement: 48,
                duration: '~1.5 min',
                openingYear: 1999,
                description: 'Launch from 0 to 57 mph in 2.8 seconds and barrel through three inversions in pitch-black darkness with Aerosmith blasting through the sound system. NOTE: Being rethemed to The Muppets in 2026.',
                history: 'Rock \'n\' Roller Coaster opened July 29, 1999. The launch coaster sends guests on a simulated rush-hour drive across Los Angeles to make an Aerosmith concert. The ride was announced to receive a Muppets retheme in 2025, with "Rock \'n\' Roller Coaster Starring The Muppets" targeting a 2026 opening.',
                trivia: [
                  'The launch from 0 to 57 mph in 2.8 seconds is one of the most intense in any Disney park',
                  'There are 3 inversions including a corkscrew, loop, and a unique "pretzel" inversion',
                  'The entire ride takes place in pitch-black darkness — you can\'t see what\'s coming',
                  'Aerosmith recorded custom music and voice-overs for the attraction',
                  '⚠️ A Muppets retheme is scheduled for 2026 — this may be your last chance to ride the Aerosmith version!'
                ],
                specs: { type: 'Indoor Launch Coaster', heightRequirement: '48 inches', launch: '0-57 mph in 2.8 sec', inversions: 3, topSpeed: '57 mph' },
                mustDo: true,
                lightningLane: true,
                imageUrl: '',
                tags: ['thrill', 'coaster', 'intense', 'aerosmith', 'last-chance']
              }
            ]
          },
          {
            id: 'echo-lake',
            name: 'Echo Lake',
            rides: [
              {
                id: 'star-tours',
                name: 'Star Tours — The Adventures Continue',
                type: 'Motion Simulator',
                thrillLevel: 3,
                heightRequirement: 40,
                duration: '~5 min',
                openingYear: 1989,
                description: 'Board a StarSpeeder and blast off for an unpredictable adventure with over 100 possible destination combinations, in 3D and full motion simulation.',
                history: 'The original Star Tours opened in 1987 at Disneyland and 1989 at Hollywood Studios. The completely reimagined "Adventures Continue" version opened in 2011 with an entirely new ride system and 3D footage. The show scenes are randomly assembled from multiple possible sequences, meaning no two consecutive rides are identical.',
                trivia: [
                  'There are over 100 possible combinations of scenes — every ride is potentially different',
                  'Characters from The Force Awakens, Rogue One, and The Phantom Menace can all appear',
                  'C-3PO serves as your accidentally-assigned pilot — he never meant to be there',
                  'The original version from 1987 featured an unnamed pilot droid — not C-3PO'
                ],
                specs: { type: 'Motion Simulator', heightRequirement: '40 inches', combinations: '100+', duration: '5 min', glasses: '3D glasses required' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['thrill', 'star-wars', 'simulator', '3d']
              }
            ]
          },
          {
            id: 'grand-ave',
            name: 'Grand Avenue',
            rides: [
              {
                id: 'mickey-minnie-runaway-railway',
                name: "Mickey & Minnie's Runaway Railway",
                type: 'Dark Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~5 min',
                openingYear: 2020,
                description: 'Step inside a Mickey Mouse cartoon and ride along through an unpredictable adventure with Mickey and Minnie — in their first-ever theme park headliner ride.',
                history: 'Opened March 4, 2020 — just 11 days before Walt Disney World closed for COVID-19. Mickey & Minnie\'s Runaway Railway replaced the Great Movie Ride and uses a new "2½D" filmmaking technique that makes cartoon characters appear to exist in a three-dimensional space without requiring 3D glasses.',
                trivia: [
                  'This was Mickey Mouse\'s FIRST-EVER headliner theme park attraction — despite being Disney\'s mascot for 90+ years',
                  'The ride uses "2½D" technology — characters look 3D without requiring glasses',
                  'The ride opened just 11 days before Disney World closed for COVID-19 in 2020',
                  'The attraction is based on the modern Mickey Mouse cartoon shorts that began in 2013'
                ],
                specs: { type: 'Trackless Dark Ride', system: 'Trackless (2½D)', duration: '5 min' },
                mustDo: true,
                lightningLane: true,
                imageUrl: '',
                tags: ['family', 'mickey', 'new', 'fun']
              }
            ]
          }
        ]
      },

      // ─────────────────────────────────────────────
      //  ANIMAL KINGDOM
      // ─────────────────────────────────────────────
      {
        id: 'animal-kingdom',
        name: "Disney's Animal Kingdom",
        emoji: '🦁',
        accentColor: '#27AE60',
        gradientFrom: '#0f3d1a',
        gradientTo: '#0a0f1e',
        description: 'A zoological theme park celebrating nature, animals, and the fragile wonder of living things — anchored by the iconic Tree of Life.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Tree_of_life_at_Animal_Kingdom.jpg/640px-Tree_of_life_at_Animal_Kingdom.jpg',
        openingYear: 1998,
        lands: [
          {
            id: 'pandora',
            name: "Pandora — The World of Avatar",
            rides: [
              {
                id: 'flight-of-passage',
                name: 'Avatar Flight of Passage',
                type: 'Simulator Ride',
                thrillLevel: 4,
                heightRequirement: 44,
                duration: '~5 min',
                openingYear: 2017,
                description: 'Link to an Avatar and ride a mountain banshee over the breathtaking world of Pandora — widely considered the best theme park attraction ever built.',
                history: 'Avatar Flight of Passage opened May 27, 2017 and immediately became the most sought-after ride in Walt Disney World. The ride uses a motorcycle-style seat that physically moves with the banshee\'s body, combined with a massive high-resolution dome screen and scent effects. It consistently wins industry awards as the world\'s best theme park attraction.',
                trivia: [
                  'Widely considered the single greatest theme park attraction in the world',
                  'You physically feel the banshee breathing beneath you — the bike moves with every breath',
                  'The sensory experience includes wind, scents, water mist, and full-body movement',
                  'The queue takes you through a bioluminescent rainforest lab — one of the most elaborate queues ever',
                  'James Cameron was actively involved in the development of this attraction'
                ],
                specs: { type: 'Banshee Flight Simulator', heightRequirement: '44 inches', screen: 'Massive curved dome', seatType: 'Motorcycle-style (straddle)', duration: '5 min' },
                mustDo: true,
                lightningLane: true,
                imageUrl: '',
                tags: ['thrill', 'must-do', 'immersive', 'avatar', 'stunning']
              },
              {
                id: 'navi-river-journey',
                name: "Na'vi River Journey",
                type: 'Boat Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~4.5 min',
                openingYear: 2017,
                description: 'Float through the bioluminescent forest of Pandora at night on a gentle boat ride, culminating in an encounter with the Shaman of Songs animatronic.',
                history: 'Na\'vi River Journey opened alongside Flight of Passage in 2017. The centerpiece of the attraction is the Shaman of Songs, an Audio-Animatronic figure considered to be the most sophisticated ever created by Walt Disney Imagineering.',
                trivia: [
                  'The Shaman of Songs animatronic is considered the most advanced in Disney history — her facial movements are incredibly detailed',
                  'The bioluminescent forest glows in gorgeous blues and purples',
                  'Unlike most rides, there are no drops, inversions, or scares whatsoever',
                  'The animal and plant sounds you hear in the queue are original Pandora species recordings'
                ],
                specs: { type: 'Slow Dark Boat Ride', duration: '4.5 min', animatronic: 'Most sophisticated ever made (Shaman)' },
                mustDo: true,
                lightningLane: true,
                imageUrl: '',
                tags: ['family', 'beautiful', 'avatar', 'relaxing']
              }
            ]
          },
          {
            id: 'africa',
            name: 'Africa',
            rides: [
              {
                id: 'kilimanjaro-safaris',
                name: 'Kilimanjaro Safaris',
                type: 'Safari Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~18 min',
                openingYear: 1998,
                description: 'Board an open safari vehicle for a live encounter with over 30 species of African wildlife roaming freely across 110 acres of savanna.',
                history: 'Kilimanjaro Safaris opened with Animal Kingdom on Earth Day, April 22, 1998. The 110-acre savanna is home to real African animals including elephants, lions, hippos, rhinos, giraffes, and zebras. The animals live in naturalistic enclosures without visible fences, creating a genuinely immersive safari experience unlike anything else in any theme park.',
                trivia: [
                  'The savanna covers 110 acres — larger than Magic Kingdom itself',
                  'Real wild animals live in the enclosures — you might see a baby elephant or sleeping lions',
                  'No two safaris are the same — animal locations change based on their own movement',
                  'Animal bridges allow the animals to cross roads and access different areas at will',
                  'Dawn and dusk safaris tend to have the most animal activity — early morning is ideal'
                ],
                specs: { type: 'Open Safari Vehicle', acres: 110, species: '30+', duration: '18 min', animals: 'Real live animals' },
                mustDo: true,
                lightningLane: true,
                imageUrl: '',
                tags: ['must-do', 'animals', 'unique', 'relaxing', 'nature']
              }
            ]
          },
          {
            id: 'asia-ak',
            name: 'Asia',
            rides: [
              {
                id: 'expedition-everest',
                name: 'Expedition Everest — Legend of the Forbidden Mountain',
                type: 'Roller Coaster',
                thrillLevel: 4,
                heightRequirement: 44,
                duration: '~3 min',
                openingYear: 2006,
                description: 'Ride a Himalayan train toward Everest — only to discover the tracks are destroyed by the legendary Yeti. Race forward and backward through the mountain to escape.',
                history: 'Expedition Everest opened April 7, 2006 and cost $100 million — at the time making it the most expensive Disney attraction ever built. The Yeti animatronic inside is one of the largest ever built for Disney. Unfortunately the Yeti broke shortly after opening and has been in "B-mode" (using strobe light effects instead of full movement) for most of its operational life.',
                trivia: [
                  'The ride goes both FORWARD and BACKWARD — you\'ll be sent back into darkness once the tracks appear destroyed',
                  'The Yeti is one of the largest Audio-Animatronics ever built for Disney',
                  'The Yeti has been broken for most of its existence, running in "B-Mode" with strobe lights instead',
                  'The mountain was built to be exactly 199.5 feet tall — 0.5 feet under FAA regulations',
                  'A full museum-quality queue tells the story of the Himalayan Yeti legend'
                ],
                specs: { type: 'Roller Coaster (Forward + Reverse)', heightRequirement: '44 inches', topSpeed: '50 mph', direction: 'Forward and Backward', duration: '3 min' },
                mustDo: true,
                lightningLane: true,
                imageUrl: '',
                tags: ['thrill', 'coaster', 'yeti', 'iconic']
              },
              {
                id: 'kali-river-rapids',
                name: 'Kali River Rapids',
                type: 'Raft Ride',
                thrillLevel: 2,
                heightRequirement: 38,
                duration: '~5 min',
                openingYear: 1999,
                description: 'Ride a 12-person circular raft down the Chakranadi River — encountering illegal logging operations and getting absolutely drenched in the process.',
                history: 'Kali River Rapids opened March 18, 1999. The ride sends guests through scenes of illegal logging in Asia, with a conservation message. You will get soaked — there is no dry ride on this attraction. Lockers are available outside.',
                trivia: [
                  'You WILL get completely wet — there is no such thing as a dry experience',
                  'The circular raft spins, meaning your seat position is random luck of the draw',
                  'The ride delivers an environmental message about illegal deforestation',
                  'Coin-operated blast cannons nearby allow guests on land to spray riders',
                  'Lockers are available — leave your valuables before riding'
                ],
                specs: { type: 'Circular Raft Ride', heightRequirement: '38 inches', capacity: '12 per raft', wetness: 'Completely soaked', duration: '5 min' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['thrill', 'water', 'soaking', 'nature']
              }
            ]
          },
          {
            id: 'discovery-island',
            name: 'Discovery Island',
            rides: [
              {
                id: 'its-tough-to-be-a-bug',
                name: "It's Tough to Be a Bug!",
                type: '3D Theater Show',
                thrillLevel: 2,
                heightRequirement: null,
                duration: '~8 min',
                openingYear: 1998,
                description: 'Join Flik from A Bug\'s Life for an immersive 3D show inside the Tree of Life — featuring special effects that include actual "stings," bug smells, and seat surprises.',
                history: 'It\'s Tough to Be a Bug! has been inside the Tree of Life since the park opened in 1998. The show uses the same theater technology as MuppetVision 3D but adds additional in-seat effects including jets of air, physical sensations, and scent delivery. Warning: genuinely scary for young children — the spider scene and bug effects frighten many kids.',
                trivia: [
                  'There are in-seat "stingers" that poke you during the grasshopper scene — you feel a real poke',
                  'The theater is inside the trunk of the Tree of Life',
                  'Small children often cry during the spider scene — be prepared',
                  'Hopper from A Bug\'s Life appears as the villain',
                  'The 3D effects are genuinely good and still hold up after 25+ years'
                ],
                specs: { type: '3D Theater with In-Seat Effects', capacity: '~430 per show', duration: '8 min', effects: 'Air jets, pokes, scents, visual 3D' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['3d', 'family', 'bugs', 'show', 'scary-for-kids']
              }
            ]
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  //  UNIVERSAL ORLANDO RESORT
  // ─────────────────────────────────────────────
  {
    id: 'universal-orlando',
    name: 'Universal Orlando Resort',
    shortName: 'Universal',
    emoji: '🎥',
    tagline: 'Vacation Like You Mean It',
    accentColor: '#0052CC',
    parks: [
      {
        id: 'universal-studios-florida',
        name: 'Universal Studios Florida',
        emoji: '🎬',
        accentColor: '#0052CC',
        gradientFrom: '#00204d',
        gradientTo: '#0a0f1e',
        description: 'Step inside Hollywood\'s biggest franchises — Harry Potter, The Simpsons, Minions, and more — at Universal\'s flagship Orlando park.',
        imageUrl: '',
        openingYear: 1990,
        lands: [
          {
            id: 'diagon-alley',
            name: 'The Wizarding World of Harry Potter — Diagon Alley',
            rides: [
              {
                id: 'escape-from-gringotts',
                name: "Harry Potter and the Escape from Gringotts",
                type: 'Multi-Dimensional Ride',
                thrillLevel: 3,
                heightRequirement: 42,
                duration: '~5 min',
                openingYear: 2014,
                description: 'Navigate the vaults of Gringotts Bank while encountering dragons, Voldemort, and trolls in this groundbreaking combination of roller coaster, dark ride, and 3D film.',
                history: 'Escape from Gringotts opened June 20, 2014 as part of the Diagon Alley expansion and immediately set a new standard for theme park attractions. The ride combines a physical coaster track with 3D projection domes, fire effects, water effects, and Audio-Animatronics — creating a seamless blend of real and virtual elements.',
                trivia: [
                  'The ride combines a roller coaster, dark ride, AND 4K film projection in a single experience',
                  'The Gringotts dragon on top of the building breathes REAL fire every few minutes',
                  'You encounter a full-scale Audio-Animatronic Voldemort and Harry Potter',
                  'The bank exterior and queue recreate Diagon Alley with incredible accuracy',
                  'Emma Watson, Daniel Radcliffe, and Rupert Grint filmed new scenes specifically for this ride'
                ],
                specs: { type: 'Multi-Media Coaster', heightRequirement: '42 inches', elements: 'Coaster + 3D screens + fire + water', duration: '5 min' },
                mustDo: true,
                lightningLane: false,
                imageUrl: '',
                tags: ['thrill', 'harry-potter', 'immersive', 'must-do']
              },
              {
                id: 'hogwarts-express-london',
                name: 'Hogwarts Express (King\'s Cross)',
                type: 'Train Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~4 min',
                openingYear: 2014,
                description: 'Board the Hogwarts Express from King\'s Cross Station in London to Hogsmeade — experiencing exclusive story vignettes along the way. Requires tickets to both parks.',
                history: 'Hogwarts Express runs between Diagon Alley (Universal Studios) and Hogsmeade (Islands of Adventure), requiring tickets to both parks. The journey from each direction features completely different, unique experiences — making two rides necessary to see everything.',
                trivia: [
                  'The ride is DIFFERENT going each direction — London to Hogsmeade and back are unique experiences',
                  'You need both park tickets to ride — it\'s a one-way trip between parks',
                  'Platform 9¾ entrance features you walking through a wall, just like in the films',
                  'The compartments have windows that show magical scenes from the Harry Potter world',
                  'Characters voices, shadows, and magical events happen in your compartment'
                ],
                specs: { type: 'Story Train (Both Parks Req.)', duration: '4 min', direction: 'Both directions unique', requirement: 'Requires 2-park ticket' },
                mustDo: true,
                lightningLane: false,
                imageUrl: '',
                tags: ['harry-potter', 'family', 'unique', 'two-park']
              }
            ]
          },
          {
            id: 'new-york-usf',
            name: 'New York',
            rides: [
              {
                id: 'revenge-of-mummy',
                name: 'Revenge of the Mummy',
                type: 'Roller Coaster',
                thrillLevel: 4,
                heightRequirement: 48,
                duration: '~3 min',
                openingYear: 2004,
                description: 'Ride through an Egyptian tomb in the dark — with fire, sudden launches, and terrifying psychological tricks before the final surprise ending.',
                history: 'Revenge of the Mummy opened in 2004 as a replacement for the original Mummy ride. It\'s a psychological horror coaster that uses darkness, misdirection, and genuine scares to mess with riders\' expectations — including a memorable fake ending that isn\'t the ending at all.',
                trivia: [
                  'The ride has a FAKE ending designed to make you think it\'s over — it\'s not',
                  'Fire bursts from the ceiling above the loading platform',
                  'The coaster uses a linear induction motor (LIM) launch — no drop needed',
                  'This is considered one of the best indoor coasters in the United States',
                  'At one point you go completely backward in darkness'
                ],
                specs: { type: 'Indoor Psychological Coaster', heightRequirement: '48 inches', topSpeed: '45 mph', fakeEnding: true, duration: '3 min' },
                mustDo: true,
                lightningLane: false,
                imageUrl: '',
                tags: ['thrill', 'coaster', 'scary', 'dark', 'iconic']
              },
              {
                id: 'race-through-ny',
                name: 'Race Through New York Starring Jimmy Fallon',
                type: 'Motion Simulator',
                thrillLevel: 2,
                heightRequirement: 40,
                duration: '~4.5 min',
                openingYear: 2017,
                description: 'Race against Jimmy Fallon through New York City, outer space, and the deep sea on a high-speed 3D simulator.',
                history: 'Opened April 6, 2017 replacing the beloved Twister ride. The attraction features a virtual reality race against Jimmy Fallon narrated by The Roots and includes a pre-show in a recreation of the Tonight Show studio.',
                trivia: [
                  'The queue itself is a full recreation of 30 Rockefeller Plaza, NBC\'s home',
                  'The Tonight Show Band, The Roots, performs in the waiting area',
                  'You race against Jimmy Fallon through NYC, then outer space, then underwater — in that order',
                  'Jimmy Fallon filmed custom content specifically for this attraction'
                ],
                specs: { type: 'Motion Simulator', heightRequirement: '40 inches', duration: '4.5 min' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['simulator', 'comedy', '3d', 'jimmy-fallon']
              }
            ]
          },
          {
            id: 'springfield-usf',
            name: 'Springfield: Home of the Simpsons',
            rides: [
              {
                id: 'simpsons-ride',
                name: 'The Simpsons Ride',
                type: 'Motion Simulator',
                thrillLevel: 3,
                heightRequirement: 40,
                duration: '~5 min',
                openingYear: 2008,
                description: 'Hop on a virtual Krustyland roller coaster with the Simpson family — as Sideshow Bob tries to sabotage your entire ride from below.',
                history: 'The Simpsons Ride opened May 15, 2008 and replaced the classic Back to the Future ride, which was beloved but technologically outdated. The attraction features a massive 80-foot screen dome and motion base vehicles that seat up to 8 guests.',
                trivia: [
                  'The ride replaced Back to the Future: The Ride, which ran from 1991 to 2007',
                  'The entire original cast of The Simpsons recorded audio for this attraction',
                  'The dome screen is 80 feet across — among the largest in any theme park simulator',
                  'Krusty says "We\'re not liable if you barf" — there\'s motion sickness potential'
                ],
                specs: { type: 'Motion Simulator', heightRequirement: '40 inches', screenSize: '80-foot dome', duration: '5 min' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['simulator', 'simpsons', 'comedy', 'family']
              }
            ]
          },
          {
            id: 'world-expo-usf',
            name: 'World Expo',
            rides: [
              {
                id: 'men-in-black',
                name: 'Men in Black Alien Attack',
                type: 'Shooter Ride',
                thrillLevel: 2,
                heightRequirement: 42,
                duration: '~4.5 min',
                openingYear: 1999,
                description: 'Join the MIB agency, arm yourself with a noisy cricket, and blast alien invaders through the streets of New York — competing against another vehicle simultaneously.',
                history: 'Men in Black Alien Attack opened May 18, 1999. The ride features a clever twist: two ride vehicles compete against each other simultaneously, with the final score influenced by both your alien kills and your team\'s performance relative to the other vehicle.',
                trivia: [
                  'Two vehicles race simultaneously — you compete against the other car of riders',
                  'There are "special" rotating targets worth massive points — find them!',
                  'Will Smith filmed new footage specifically for this attraction',
                  'If you spin your car in a full 360, you get bonus points'
                ],
                specs: { type: 'Interactive Shooter Ride', heightRequirement: '42 inches', competitive: 'Two vehicles compete simultaneously', duration: '4.5 min' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['interactive', 'shooter', 'competitive', 'sci-fi']
              },
              {
                id: 'kang-kodos',
                name: "Kang & Kodos' Twirl 'n' Hurl",
                type: 'Aerial Spinner', thrillLevel: 1, heightRequirement: null, duration: '~2 min',
                openingYear: 2013,
                description: 'Spin around in flying saucers controlled by Kang and Kodos from The Simpsons. A fun mild spinner with Treehouse of Horror theming.',
                history: 'Opened in 2013 as part of the Springfield expansion.',
                trivia: ['Kang and Kodos narrate via overhead speakers with Simpsons humor', 'Based on Treehouse of Horror episodes'],
                specs: { type: 'Aerial Carousel Spinner', duration: '2 min' },
                mustDo: false, lightningLane: false, tags: ['Simpsons', 'family', 'spinner']
              }
            ]
          },
          {
            id: 'hollywood-usf',
            name: 'Hollywood',
            rides: [
              {
                id: 'bourne-stuntacular',
                name: 'The Bourne Stuntacular',
                type: 'Live Stunt Show',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~25 min',
                openingYear: 2020,
                description: 'A jaw-dropping live stunt show blending real performers with seamless screen technology — delivering Hollywood-quality action in real time.',
                history: 'The Bourne Stuntacular opened June 30, 2020. It replaced Terminator 2: 3D and uses a breakthrough LED screen technology that lets live stunt performers interact with projected backgrounds so convincingly that guests cannot tell where the screen ends and the real set begins.',
                trivia: [
                  'The LED screen behind the live set is so realistic you literally cannot tell where real ends and screen begins',
                  'Real motorcycles, helicopters, and fight sequences happen live on stage',
                  'This show replaced the classic Terminator 2: 3D show that ran from 1996–2017',
                  'The technology is so impressive that Hollywood film productions have asked to study it'
                ],
                specs: { type: 'Live Stunt Show', duration: '~25 min', performers: 'Live stunt team', technology: 'Real + LED screen fusion' },
                mustDo: true,
                lightningLane: false,
                imageUrl: '',
                tags: ['show', 'stunt', 'action', 'impressive']
              }
            ,
              {
                id: 'et-adventure',
                name: 'E.T. Adventure',
                type: 'Dark Ride', thrillLevel: 1, heightRequirement: null, duration: '~5 min',
                openingYear: 1990,
                description: 'Fly with E.T. on a bicycle through the forest and into space to save his home planet. One of the last remaining original 1990 opening-day attractions.',
                history: 'E.T. Adventure opened with Universal Studios Florida on June 7, 1990 and is one of the last surviving opening-day attractions. Designed with input from Steven Spielberg.',
                trivia: ['One of the only original 1990 opening-day attractions still operating', 'E.T. says your name at the end — you register it at the boarding area', 'Designed with direct input from Steven Spielberg'],
                specs: { type: 'Bicycle Dark Ride', duration: '5 min' },
                mustDo: true, lightningLane: false, tags: ['classic', 'family', 'Spielberg', 'gentle']
              },
              {
                id: 'horror-makeup-show',
                name: "Universal Orlando's Horror Make-Up Show",
                type: 'Live Show', thrillLevel: 1, heightRequirement: null, duration: '~25 min',
                openingYear: 1990,
                description: 'A hilarious live comedy show revealing secrets of Hollywood horror makeup. Audience volunteers get the full treatment.',
                history: 'One of the original 1990 opening-day experiences — still running after 35+ years.',
                trivia: ['One of the longest-running shows at any theme park', 'Audience volunteers are chosen at the start — arrive early', 'Reveals actual techniques used in major horror films'],
                specs: { type: 'Live Comedy Show', duration: '25 min' },
                mustDo: true, lightningLane: false, tags: ['classic', 'show', 'comedy', 'horror']
              }
            ]
          }          },
          {
            id: 'minion-land',
            name: 'Minion Land',
            rides: [
              {
                id: 'despicable-me',
                name: 'Despicable Me Minion Mayhem',
                type: 'Motion Simulator', thrillLevel: 1, heightRequirement: 40, duration: '~5 min',
                openingYear: 2012,
                description: 'Get transformed into a Minion and join Gru on a chaotic adventure. Fun simulator for all ages with a post-show dance party.',
                history: 'Opened 2012, replacing the Jimmy Neutron attraction.',
                trivia: ['The Minion-izer pre-show uses a moving platform', 'Post-show dance party is a hit with kids', 'Steve Carell recorded new dialogue for the ride'],
                specs: { type: 'Standing Motion Simulator', heightReq: '40"', duration: '5 min' },
                mustDo: false, lightningLane: false, tags: ['Minions', 'family', 'simulator']
              },
              {
                id: 'villain-con-blast',
                name: "Illumination's Villain-Con Minion Blast",
                type: 'Interactive Shooter', thrillLevel: 1, heightRequirement: null, duration: '~5 min',
                openingYear: 2023,
                description: 'Unique moving walkway shooter at a Villain Convention. Walk through on a moving path while blasting targets — no ride vehicles.',
                history: 'Opened 2023 as part of Minion Land. First major attraction using a moving walkway instead of vehicles.',
                trivia: ['Only major attraction using a moving walkway instead of ride vehicles', 'Players compete on a global leaderboard', 'Set at Villain-Con — a convention for Minions universe villains'],
                specs: { type: 'Moving Walkway Shooter', duration: '5 min' },
                mustDo: false, lightningLane: false, tags: ['Minions', 'interactive', 'shooter']
              }
            ]
          },
          {
            id: 'production-central',
            name: 'Production Central',
            rides: [
              {
                id: 'transformers-usf',
                name: 'Transformers: The Ride-3D',
                type: '3D Motion Simulator', thrillLevel: 3, heightRequirement: 40, duration: '~5 min',
                openingYear: 2013,
                description: 'Battle Decepticons with the Autobots. 3D screens cover your entire field of vision with no visible edges.',
                history: 'Opened 2013 using the same groundbreaking system as Spider-Man at IOA.',
                trivia: ['Same ride system as Spider-Man at IOA', 'Peter Cullen (original Optimus Prime) recorded lines', 'Screens completely surround riders with no visible edge'],
                specs: { type: '3D Motion Simulator', heightReq: '40"', duration: '5 min' },
                mustDo: false, lightningLane: false, tags: ['action', 'simulator', '3D', 'Transformers']
              }
            ]
          },
          {
            id: 'dreamworks-land',
            name: 'DreamWorks Land',
            rides: [
              {
                id: 'trolls-coaster',
                name: 'Trolls Trollercoaster',
                type: 'Junior Coaster', thrillLevel: 2, heightRequirement: null, duration: '~2 min',
                openingYear: 2024,
                description: 'Colorful junior coaster through Trolls Village with vibrant theming and no height requirement.',
                history: 'Opened 2024 as part of DreamWorks Land replacing the former KidZone.',
                trivia: ['No height requirement — accessible to all guests', 'Features Trolls film music throughout', 'One of the most colorful coasters in any theme park'],
                specs: { type: 'Vekoma Junior Coaster', duration: '2 min' },
                mustDo: false, lightningLane: false, tags: ['Trolls', 'family', 'coaster', 'DreamWorks']
              }
            ]
          }
        ]
      },

      {
        id: 'islands-of-adventure',
        name: 'Islands of Adventure',
        emoji: '⚓',
        accentColor: '#1A8FE3',
        gradientFrom: '#0a2d4d',
        gradientTo: '#0a0f1e',
        description: 'The most thrilling theme park in Florida — home to VelociCoaster, The Hulk, Harry Potter, and an island of back-to-back world-class attractions.',
        imageUrl: '',
        openingYear: 1999,
        lands: [
          {
            id: 'hogsmeade',
            name: 'The Wizarding World of Harry Potter — Hogsmeade',
            rides: [
              {
                id: 'forbidden-journey',
                name: "Harry Potter and the Forbidden Journey",
                type: 'Dark Ride',
                thrillLevel: 3,
                heightRequirement: 48,
                duration: '~5 min',
                openingYear: 2010,
                description: 'Soar over Hogwarts on a broomstick alongside Harry, Ron, and Hermione — fighting Dementors and navigating a Quidditch match in this groundbreaking KUKA arm ride.',
                history: 'Harry Potter and the Forbidden Journey opened June 18, 2010 and revolutionized theme park attraction design. The ride uses KUKA robot arms mounted on a moving base, creating completely fluid motion impossible to replicate with traditional coaster or simulator technology. Guests tour actual sets of Hogwarts castle before boarding.',
                trivia: [
                  'The queue goes through actual Hogwarts interiors — greenhouses, Dumbledore\'s office, Defense Against Dark Arts classroom',
                  'The ride vehicle is mounted on a KUKA industrial robot arm — same technology used in car factories',
                  'The Marauder\'s Map in the queue actually moves and shows guest names',
                  'The Whomping Willow physically moves and strikes your vehicle',
                  'Emma Watson was famously motion sick filming her parts for this attraction'
                ],
                specs: { type: 'KUKA Arm Dark Ride', heightRequirement: '48 inches', mechanism: 'Industrial KUKA robot arm', duration: '5 min', sets: 'Actual Hogwarts interiors in queue' },
                mustDo: true,
                lightningLane: false,
                imageUrl: '',
                tags: ['thrill', 'harry-potter', 'must-do', 'immersive']
              },
              {
                id: 'forbidden-journey',
                name: "Harry Potter and the Forbidden Journey",
                type: 'Robotic Arm Ride', thrillLevel: 3, heightRequirement: 48, duration: '~5 min',
                openingYear: 2010,
                description: 'The original Harry Potter ride — fly with Harry through Hogwarts, face Dementors, and dodge the Whomping Willow. The Hogwarts Castle queue is as magnificent as the ride itself.',
                history: 'Opened June 18, 2010 as the centerpiece of the original Wizarding World. The KUKA robotic arm system was revolutionary — vehicles move freely through multiple domed screen rooms.',
                trivia: ['The queue winds through actual Hogwarts locations including Dumbledore office, Gryffindor common room, and Defense Against the Dark Arts classroom', 'The KUKA arm generates unpredictable g-forces unlike any fixed-track ride', 'Hermione, Ron, and Harry appear as life-size animated figures in the attraction'],
                specs: { type: 'KUKA Robotic Arm Ride', heightReq: '48"', duration: '5 min' },
                mustDo: true, lightningLane: true, tags: ['Harry Potter', 'thrill', 'immersive', 'classic']
              },
              {
                id: 'hagrids-motorbike',
                name: "Hagrid's Magical Creatures Motorbike Adventure",
                type: 'Motorbike Coaster', thrillLevel: 3, heightRequirement: 48, duration: '~5 min',
                openingYear: 2019,
                description: 'Journey through the Forbidden Forest on a motorbike with Hagrid. Widely regarded as the greatest theme park attraction ever built — a seamless blend of practical sets, live animals, and genuine coaster thrills.',
                history: 'Opened June 13, 2019 after the demolition of Dragon Challenge. Immediately upon opening received universal acclaim as one of the best attractions in theme park history. Wait times regularly exceeded 4-5 hours in its first year.',
                trivia: ['Universally ranked among the top 3 theme park attractions in the world by enthusiasts', 'Features 17 separate scene encounters including live animals and hydraulic launch segments', 'The ride vehicles are actual motorcycle and sidecar designs — you sit like a passenger on a real bike', 'A vertical drop section was added that drops the train backward — most guests do not see it coming'],
                specs: { type: 'Launched Motorbike Coaster', heightReq: '48"', scenes: 17, duration: '5 min' },
                mustDo: true, lightningLane: true, tags: ['Harry Potter', 'thrill', 'immersive', 'masterpiece']
              },
              {
                id: 'flight-of-hippogriff',
                name: 'Flight of the Hippogriff',
                type: 'Roller Coaster',
                thrillLevel: 3,
                heightRequirement: 36,
                duration: '~1 min',
                openingYear: 2010,
                description: 'Train with Buckbeak the Hippogriff! A short, sharp outdoor coaster with impressive views over Hogsmeade Village.',
                history: 'Flight of the Hippogriff opened with the original Wizarding World on June 18, 2010. Despite its short duration, the ride packs in strong forces for a family coaster, including a significant drop after the first hill.',
                trivia: [
                  'Buckbeak the Hippogriff is visible from the first hill before you drop',
                  'The ride briefly shows you Hagrid\'s Hut from above',
                  'It\'s a short ride but packs real G-forces on the turns',
                  'Originally opened as "Flying Unicorn" at IOA before being rethemed'
                ],
                specs: { type: 'Outdoor Family Coaster', heightRequirement: '36 inches', topSpeed: '40 mph', duration: '1 min' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['coaster', 'harry-potter', 'family', 'outdoor']
              }
            ]
          },
          {
            id: 'marvel-island',
            name: 'Marvel Super Hero Island',
            rides: [
              {
                id: 'incredible-hulk-coaster',
                name: 'The Incredible Hulk Coaster',
                type: 'Roller Coaster',
                thrillLevel: 5,
                heightRequirement: 54,
                duration: '~2.5 min',
                openingYear: 1999,
                description: 'Get gamma-blasted from 0 to 40 mph in 2 seconds and barrel through 7 inversions — including an incredible green launch tunnel that turns you into the Hulk.',
                history: 'The Incredible Hulk Coaster opened on opening day of Islands of Adventure on May 28, 1999. The launch tunnel drops you out of the sky, creating the illusion of being flung by the Hulk himself. The coaster received a comprehensive refurbishment and new on-ride soundtrack in 2016.',
                trivia: [
                  'The green launch tunnel is an electromagnetic launch from 0 to 40 mph in 2 seconds',
                  'The coaster has 7 inversions including a corkscrew, loop, vertical loop, and zero-G roll',
                  'The IOA opening day in 1999 featured actual Hulk actor Lou Ferrigno for the ceremony',
                  'You can hear the roar of the coaster across all of Islands of Adventure'
                ],
                specs: { type: 'Launch Steel Coaster', heightRequirement: '54 inches', launch: '0-40 mph in 2 sec', inversions: 7, topSpeed: '67 mph', duration: '2.5 min' },
                mustDo: true,
                lightningLane: false,
                imageUrl: '',
                tags: ['thrill', 'coaster', 'intense', 'marvel', 'launch']
              },
              {
                id: 'spider-man',
                name: 'The Amazing Adventures of Spider-Man',
                type: 'Dark Ride',
                thrillLevel: 2,
                heightRequirement: 40,
                duration: '~4.5 min',
                openingYear: 1999,
                description: 'Ride a SCOOP vehicle through a 3D New York City as Spider-Man battles the Sinister Syndicate — experiencing real drops and motion simulation alongside the virtual action.',
                history: 'Amazing Adventures of Spider-Man opened with IOA in 1999 and was considered the most technologically advanced theme park attraction ever built at that time. It pioneered the combination of 3D projection with physical ride elements and motion simulation. The ride received a 4K HD upgrade in 2012.',
                trivia: [
                  'When it opened in 1999, it was considered the most technologically advanced theme park attraction in history',
                  'The real physical drop inside the ride perfectly syncs with the virtual 400-foot plunge on screen',
                  'The ride received a complete 4K high-definition upgrade in 2012',
                  'Stan Lee appeared in promotional materials for the original opening'
                ],
                specs: { type: '3D Simulated Dark Ride', heightRequirement: '40 inches', screenResolution: '4K (upgraded 2012)', drop: 'Physical drop synced with virtual plunge', duration: '4.5 min' },
                mustDo: true,
                lightningLane: false,
                imageUrl: '',
                tags: ['thrill', 'marvel', '3d', 'classic', 'iconic']
              },
              {
                id: 'doctor-dooms-fearfall',
                name: "Doctor Doom's Fearfall",
                type: 'Tower Ride',
                thrillLevel: 4,
                heightRequirement: 52,
                duration: '~1.5 min',
                openingYear: 1999,
                description: 'Get launched skyward by Dr. Doom\'s experimental fear extractor — then drop back down at terrifying speed from 185 feet in the air.',
                history: 'Doctor Doom\'s Fearfall opened in 1999 and remains one of the most feared rides at Islands of Adventure. Unlike most drop towers that only drop, Doom\'s actually LAUNCHES you upward first using air pressure, then drops you.',
                trivia: [
                  'The tower launches upward first using air blasts — then drops you',
                  'At the top, you can see all of Islands of Adventure and beyond',
                  'The height of 185 feet is visible from much of the park',
                  'This is a launch tower, not just a drop tower — the up is as scary as the down'
                ],
                specs: { type: 'Launch + Drop Tower', heightRequirement: '52 inches', height: '185 feet', mechanism: 'Air-powered launch + gravity drop' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['thrill', 'drop', 'tower', 'intense', 'marvel']
              }
            ]
          },
          {
            id: 'jurassic-world-ioa',
            name: 'Jurassic World',
            rides: [
              {
                id: 'velocicoaster',
                name: 'Jurassic World VelociCoaster',
                type: 'Roller Coaster',
                thrillLevel: 5,
                heightRequirement: 51,
                duration: '~1.5 min',
                openingYear: 2021,
                description: 'Launched twice to 70 mph through back-to-back inversions, a 155-foot top hat, and a zero-gravity roll over the lagoon — widely regarded as the best coaster in Florida.',
                history: 'VelociCoaster opened June 10, 2021 and immediately became the consensus best roller coaster in the state of Florida and one of the top 10 coasters in the world. The ride features the tallest and fastest inversion in Florida — the 155-foot "top hat" element — and a heart-rate-elevating zero-G stall over the IOA lagoon.',
                trivia: [
                  'Consistently ranked the #1 coaster in Florida and top 10 in the United States',
                  'There are TWO separate launches — the second is significantly faster than the first',
                  'The "top hat" element is 155 feet tall — the tallest inversion in Florida',
                  'The zero-G roll over the lagoon hangs you upside down over the water',
                  'The holding brake before the second launch is a psychological mind game that makes it even scarier'
                ],
                specs: { type: 'Multi-Launch Steel Coaster', heightRequirement: '51 inches', launches: 2, topSpeed: '70 mph', topHat: '155 feet', inversions: 4, duration: '1.5 min' },
                mustDo: true,
                lightningLane: false,
                imageUrl: '',
                tags: ['thrill', 'coaster', 'must-do', 'best-in-florida', 'launch']
              },
              {
                id: 'jurassic-world-ride',
                name: 'Jurassic World (River Adventure)',
                type: 'Water Ride',
                thrillLevel: 3,
                heightRequirement: 42,
                duration: '~6 min',
                openingYear: 1999,
                description: 'Discover Jurassic World\'s dinosaur ecosystems on a boat tour — until the raptors escape and you must survive a terrifying 85-foot plunge to escape T. rex.',
                history: 'Originally "Jurassic Park River Adventure," the ride opened on IOA\'s first day in 1999 and was rethemed to Jurassic World branding in 2019. The 85-foot drop is one of the tallest water ride drops in the world.',
                trivia: [
                  'The 85-foot final drop is among the tallest on any water ride in the world',
                  'You will get wet — especially in the front seats',
                  'The T. rex Audio-Animatronic at the top of the drop is genuinely terrifying at that proximity',
                  'Originally branded as Jurassic Park; updated to Jurassic World branding in 2019'
                ],
                specs: { type: 'Boat Water Ride', heightRequirement: '42 inches', finalDrop: '85 feet', duration: '6 min', wetness: 'Moderate to soaked' },
                mustDo: true,
                lightningLane: false,
                imageUrl: '',
                tags: ['thrill', 'water', 'dinosaurs', 'drop']
              }
            ,
              {
                id: 'pteranodon-flyers',
                name: 'Pteranodon Flyers',
                type: 'Suspended Coaster', thrillLevel: 1, heightRequirement: null, duration: '~1 min',
                openingYear: 1999,
                description: 'Soar over Jurassic Park in a hang glider-style coaster. Calm and scenic — notoriously one of the longest waits for its short duration.',
                history: 'Original 1999 IOA opening-day attraction. Has a maximum weight limit rather than a height minimum — unusual for any theme park ride.',
                trivia: ['Has a weight limit rather than a height requirement', 'One of the longest waits relative to ride duration in any theme park', 'Flies directly over Camp Jurassic — look down for great views'],
                specs: { type: 'Suspended Wing Coaster', duration: '1 min', restriction: 'Weight limit applies' },
                mustDo: false, lightningLane: false, tags: ['Jurassic', 'family', 'gentle', 'views']
              }
            ]
          },
          {
            id: 'toon-lagoon',
            name: 'Toon Lagoon',
            rides: [
              {
                id: 'dudley-do-right',
                name: "Dudley Do-Right's Ripsaw Falls",
                type: 'Log Flume',
                thrillLevel: 3,
                heightRequirement: 44,
                duration: '~8 min',
                openingYear: 1999,
                description: 'Help Dudley Do-Right rescue Nell from Snidely Whiplash on this beloved flume ride — culminating in a stomach-dropping underground plunge.',
                history: 'Dudley Do-Right\'s Ripsaw Falls opened with IOA in 1999 and features a unique subterranean drop — the log actually plunges BELOW the waterline before splashing back up.',
                trivia: [
                  'The drop goes UNDERGROUND below the water surface — a unique element in any flume ride',
                  'Based on the 1960s animated cartoon from the Rocky and Bullwinkle show',
                  'The final drop is 75 feet at 50 mph',
                  'Sit in the front to get the most soaked'
                ],
                specs: { type: 'Log Flume', heightRequirement: '44 inches', finalDrop: '75 feet underground', duration: '8 min' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['water', 'soaking', 'thrill', 'flume']
              },
              {
                id: 'popeye-bilge-rat',
                name: "Popeye & Bluto's Bilge-Rat Barges",
                type: 'Raft Ride',
                thrillLevel: 2,
                heightRequirement: 42,
                duration: '~5 min',
                openingYear: 1999,
                description: 'Spin through Popeye\'s world on a circular raft — getting blasted by water cannons, waterfalls, and waves. You will be soaked.',
                history: 'One of the original IOA rides, Bilge-Rat Barges is known for its aggressive water squirters operated by spectators on bridges above.',
                trivia: [
                  'Guests on shore can pay to operate water squirters aimed at riders on the barges',
                  'The rafts seat up to 12 guests and spin randomly throughout',
                  'Wear your poncho or accept total defeat to the water'
                ],
                specs: { type: 'Circular Raft Ride', heightRequirement: '42 inches', capacity: '12 per raft', wetness: 'Completely soaked' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['water', 'soaking', 'spinning', 'family']
              }
            ]
          },
          {
            id: 'skull-island-ioa',
            name: 'Skull Island',
            rides: [
              {
                id: 'skull-island-kong',
                name: 'Skull Island: Reign of Kong',
                type: 'Dark Ride',
                thrillLevel: 3,
                heightRequirement: 36,
                duration: '~5 min',
                openingYear: 2016,
                description: 'Board an expedition truck into the jungle of Skull Island and come face-to-face with King Kong and terrifying prehistoric predators in this massive 3D dark ride.',
                history: 'Skull Island: Reign of Kong opened July 13, 2016. The ride vehicles are enormous open-sided trucks that carry 72 guests through both outdoor jungle environments and massive 3D projection domes.',
                trivia: [
                  'The ride vehicles are 72-person open-sided trucks — among the largest in any theme park',
                  'Kong himself is an Audio-Animatronic approximately 18 feet tall',
                  'The 3D snake and bat scenes are designed to make guests grab each other in fright',
                  'The exterior building is a true architectural marvel — the largest themed show building at any Universal park'
                ],
                specs: { type: 'Large-Capacity Dark Ride Truck', heightRequirement: '36 inches', capacity: '72 per vehicle', duration: '5 min' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['thrill', 'dark', '3d', 'kong', 'scary']
              }
            ]
          }
        ]
      },

      {
        id: 'seuss-landing-ioa',
        name: 'Seuss Landing',
        emoji: '🎩',
        accentColor: '#ec4899',
        gradientFrom: '#4a0a2a',
        gradientTo: '#0a0f1e',
        description: 'The whimsical world of Dr. Seuss brought to life — a land with no straight lines and stories around every corner.',
        openingYear: 1999,
        lands: [
          {
            id: 'seuss-main',
            name: 'Seuss Landing',
            rides: [
              {
                id: 'cat-in-the-hat',
                name: 'The Cat in the Hat',
                type: 'Dark Ride', thrillLevel: 1, heightRequirement: null, duration: '~4 min',
                openingYear: 1999,
                description: 'Ride through the beloved Dr. Seuss story on a spinning couch while Thing 1 and Thing 2 wreak havoc.',
                history: 'One of the original 1999 IOA attractions. No height requirement makes it accessible to all ages.',
                trivia: ['No height requirement — one of the most accessible rides in any Universal park', 'The couch spins 360 degrees multiple times', 'Every element follows Seuss rules — no straight lines exist in Seuss Landing'],
                specs: { type: 'Spinning Dark Ride', duration: '4 min' },
                mustDo: false, lightningLane: false, tags: ['Dr. Seuss', 'family', 'gentle']
              },
              {
                id: 'high-in-sky-seuss',
                name: 'The High in the Sky Seuss Trolley Train Ride!',
                type: 'Aerial Train', thrillLevel: 1, heightRequirement: null, duration: '~4 min',
                openingYear: 1999,
                description: 'An elevated train weaving through Seuss Landing with character narration. Two separate tracks with different stories.',
                history: 'Original 1999 IOA attraction. The track weaves between buildings for overhead perspectives.',
                trivia: ['Two separate track paths — ride both for different narration', 'The track passes through Seuss Landing buildings', 'Great views of the entire land from altitude'],
                specs: { type: 'Elevated Train', duration: '4 min' },
                mustDo: false, lightningLane: false, tags: ['Dr. Seuss', 'family', 'gentle']
              },
              {
                id: 'one-fish-two-fish',
                name: 'One Fish, Two Fish, Red Fish, Blue Fish',
                type: 'Aerial Spinner', thrillLevel: 1, heightRequirement: null, duration: '~2 min',
                openingYear: 1999,
                description: 'Gentle aerial spinner on Seuss fish. A rhyming song gives instructions to avoid water squirts — most guests get wet anyway.',
                history: 'Original 1999 IOA opening-day attraction.',
                trivia: ['Instructions tell you exactly when to raise your fish to avoid water', 'Most guests get wet regardless', 'Based directly on the Dr. Seuss book'],
                specs: { type: 'Aerial Carousel', duration: '2 min' },
                mustDo: false, lightningLane: false, tags: ['Dr. Seuss', 'family', 'wet']
              },
              {
                id: 'caro-seuss-el',
                name: 'Caro-Seuss-el',
                type: 'Carousel', thrillLevel: 1, heightRequirement: null, duration: '~2 min',
                openingYear: 1999,
                description: 'A Dr. Seuss carousel with interactive animals from various books instead of traditional horses.',
                history: 'Original 1999 IOA attraction.',
                trivia: ['Each animal is from a different Dr. Seuss book', 'Animals have interactive tails, ears, and eyes', 'One of the most elaborately themed carousels in any theme park'],
                specs: { type: 'Interactive Carousel', duration: '2 min' },
                mustDo: false, lightningLane: false, tags: ['Dr. Seuss', 'family', 'gentle']
              }
            ]
          }
        ]
      },

            {
        id: 'epic-universe',
        name: 'Universal Epic Universe',
        emoji: '✨',
        accentColor: '#8B5CF6',
        gradientFrom: '#1a0a3d',
        gradientTo: '#0a0f1e',
        description: 'Universal\'s newest and most ambitious park, opened May 22, 2025 — featuring five spectacular worlds including Harry Potter\'s Ministry of Magic, Super Nintendo World, and How to Train Your Dragon.',
        imageUrl: '',
        openingYear: 2025,
        lands: [
          {
            id: 'celestial-park',
            name: 'Celestial Park',
            rides: [
              {
                id: 'stardust-racers',
                name: 'Stardust Racers',
                type: 'Roller Coaster',
                thrillLevel: 4,
                heightRequirement: 48,
                duration: '~2 min',
                openingYear: 2025,
                description: 'Race a rival coaster through the cosmos in this dueling roller coaster experience at the heart of Epic Universe\'s Celestial Park hub.',
                history: 'Starfall Racers opened with Epic Universe on May 22, 2025 as one of the park\'s signature rides, themed to a galactic racing story set in the beautiful starfield of Celestial Park.',
                trivia: [
                  'Starfall Racers is a dueling coaster — two trains race side by side simultaneously',
                  'Located in the center of Epic Universe\'s main hub, Celestial Park',
                  'One of the most visible rides in the park from the entrance'
                ],
                specs: { type: 'Dueling Roller Coaster', heightRequirement: '48 inches', opening: 'May 22, 2025' },
                mustDo: true,
                lightningLane: false,
                imageUrl: '',
                tags: ['thrill', 'coaster', 'new', 'dueling']
              }
            ,
              {
                id: 'constellation-carousel',
                name: 'Constellation Carousel',
                type: 'Carousel', thrillLevel: 1, heightRequirement: null, duration: '~2 min',
                openingYear: 2025,
                description: 'A carousel themed to star signs and constellations. Each figure is designed around a different zodiac constellation with LED lighting effects.',
                history: 'Opened with Epic Universe 2025 as a family centerpiece for Celestial Park.',
                trivia: ['Each carousel figure represents a different star sign', 'LED lighting shifts through nebula color spectrums', 'The canopy displays actual constellation maps'],
                specs: { type: 'Themed Carousel', duration: '2 min' },
                mustDo: false, lightningLane: false, tags: ['family', 'gentle', 'carousel', 'Epic Universe']
              }
            ]
          },
          {
            id: 'super-nintendo-world',
            name: 'Super Nintendo World',
            rides: [
              {
                id: 'mario-kart-eu',
                name: "Mario Kart: Bowser's Challenge",
                type: 'Interactive Dark Ride',
                thrillLevel: 2,
                heightRequirement: 40,
                duration: '~5 min',
                openingYear: 2025,
                description: 'Wear an AR headset and race against Bowser through beloved Mario Kart tracks, collecting coins and throwing shells in augmented reality.',
                history: 'Based on the version at Universal Japan (which opened in 2021) and Universal Hollywood (2023), Mario Kart: Bowser\'s Challenge opened at Epic Universe in May 2025. The AR headsets allow riders to see animated enemies and items overlaid on real physical sets.',
                trivia: [
                  'The AR headsets are mandatory and completely transform the experience',
                  'You throw virtual red shells and earn coins just like playing Mario Kart',
                  'Team-based scoring means your car\'s four riders work together',
                  'The physical sets are incredibly detailed — you drive through Bowser\'s Castle, Rainbow Road, and more',
                  'Power-up bands from the land sync with the ride to give you bonuses'
                ],
                specs: { type: 'AR Interactive Ride', heightRequirement: '40 inches', technology: 'Augmented Reality headsets', scoring: 'Team-based', opening: 'May 2025' },
                mustDo: true,
                lightningLane: false,
                imageUrl: '',
                tags: ['interactive', 'mario', 'ar', 'family', 'new']
              },
              {
                id: 'yoshi-adventure-eu',
                name: "Yoshi's Adventure",
                type: 'Dark Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~5 min',
                openingYear: 2025,
                description: 'Ride on Yoshi\'s back through the Mushroom Kingdom on a gentle egg-hunt adventure perfect for the whole family.',
                history: 'A version of this ride first opened in Japan in 2021. The Epic Universe version opened in May 2025.',
                trivia: [
                  'The vehicle is shaped like Yoshi himself — you sit on his back',
                  'You can look around to find hidden items throughout the ride',
                  'A family-friendly complement to Mario Kart next door'
                ],
                specs: { type: 'Dark Ride', capacity: 'Family-friendly, no height minimum', duration: '5 min', opening: 'May 2025' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['family', 'mario', 'kids', 'gentle']
              }
            ,
              {
                id: 'yoshis-adventure-eu',
                name: "Yoshi's Adventure",
                type: 'Omnimover Ride', thrillLevel: 1, heightRequirement: null, duration: '~5 min',
                openingYear: 2025,
                description: 'Gentle omnimover ride through the Super Mario world on the back of Yoshi. Search for colored eggs hidden throughout the landscape.',
                history: 'Opened with Super Nintendo World in Epic Universe 2025.',
                trivia: ['Omnimover system — continuous vehicles like Haunted Mansion', 'Hidden eggs scattered throughout for guests to spot', 'No height requirement — accessible to all guests'],
                specs: { type: 'Omnimover Dark Ride', duration: '5 min' },
                mustDo: false, lightningLane: false, tags: ['Nintendo', 'family', 'gentle', 'Mario']
              },
              {
                id: 'mine-cart-madness',
                name: 'Mine-Cart Madness',
                type: 'Boom Coaster', thrillLevel: 3, heightRequirement: 40, duration: '~3 min',
                openingYear: 2025,
                description: 'A unique "Boom Coaster" through Donkey Kong Country. Mine carts launch and bounce through DK environments in a completely new ride category.',
                history: 'Opened with Epic Universe 2025. The Boom Coaster system by Setpoint was invented specifically for this attraction.',
                trivia: ['The first ever "Boom Coaster" — a new ride category', 'Set in Donkey Kong Country — first DK-themed ride in the US', 'The bouncing mine cart motion is unlike any other coaster'],
                specs: { type: 'Setpoint Boom Coaster', heightReq: '40"', duration: '3 min' },
                mustDo: true, lightningLane: true, tags: ['Nintendo', 'Donkey Kong', 'coaster', 'new']
              }
            ]
          },
          {
            id: 'ministry-of-magic',
            name: "The Wizarding World of Harry Potter — Ministry of Magic",
            rides: [
              {
                id: 'battle-at-ministry',
                name: 'Harry Potter and the Battle at the Ministry',
                type: 'Dark Ride',
                thrillLevel: 3,
                heightRequirement: 40,
                duration: '~5 min',
                openingYear: 2025,
                description: 'Join the Order of the Phoenix in 1990s Paris and infiltrate the French Ministry of Magic to battle Death Eaters in Universal\'s most ambitious Harry Potter attraction yet.',
                history: 'Battle at the Ministry opened with Epic Universe in May 2025 and is set in the era of Fantastic Beasts, featuring 1990s Paris and the French Ministry of Magic. The ride uses next-generation projection technology and represents Universal\'s most technologically sophisticated Harry Potter attraction to date.',
                trivia: [
                  'Set in 1990s Paris — a completely new setting for the Wizarding World in the parks',
                  'Features characters from the Fantastic Beasts film series',
                  'Uses an entirely new generation of projection and ride technology vs. Forbidden Journey',
                  'The queue includes a recreation of 1990s Paris streets outside the Ministry'
                ],
                specs: { type: 'Next-Gen Dark Ride', heightRequirement: '40 inches', setting: '1990s Paris / French Ministry of Magic', opening: 'May 2025' },
                mustDo: true,
                lightningLane: false,
                imageUrl: '',
                tags: ['harry-potter', 'thrill', 'new', 'immersive']
              }
            ]
          },
          {
            id: 'how-to-train-your-dragon',
            name: 'How to Train Your Dragon — Isle of Berk',
            rides: [
              {
                id: 'hiccups-wing-gliders',
                name: "Hiccup's Wing Gliders",
                type: 'Aerial Ride',
                thrillLevel: 1,
                heightRequirement: null,
                duration: '~2.5 min',
                openingYear: 2025,
                description: 'Soar above the Isle of Berk on your very own Viking dragon in this family-friendly aerial ride.',
                history: 'Hiccup\'s Wing Gliders opened with Epic Universe in May 2025, themed to the hit DreamWorks animated franchise How to Train Your Dragon.',
                trivia: [
                  'Riders sit in Viking-style dragon-shaped vehicles',
                  'You can see the full Isle of Berk village as you fly above it',
                  'The dragon vehicles are designed to look like Toothless and other Night Fury species'
                ],
                specs: { type: 'Aerial Ride', capacity: 'Family-friendly', duration: '2.5 min', opening: 'May 2025' },
                mustDo: false,
                lightningLane: false,
                imageUrl: '',
                tags: ['family', 'aerial', 'dragons', 'gentle']
              },
              {
                id: 'untrainable-dragon',
                name: "The Untrainable Dragon",
                type: 'Roller Coaster',
                thrillLevel: 3,
                heightRequirement: 42,
                duration: '~2 min',
                openingYear: 2025,
                description: 'Attempt to tame the wildest dragon on Berk on this thrilling coaster through Viking training grounds.',
                history: 'The Untrainable Dragon opened with Epic Universe on May 22, 2025. It\'s the primary thrill coaster for the Isle of Berk land.',
                trivia: [
                  'Themed around the idea of attempting to train an ultra-wild dragon',
                  'The Viking village theming in the land is breathtakingly detailed',
                  'Gronckle, Monstrous Nightmare, and other dragon species can be found throughout the queue'
                ],
                specs: { type: 'Roller Coaster', heightRequirement: '42 inches', opening: 'May 2025' },
                mustDo: true,
                lightningLane: false,
                imageUrl: '',
                tags: ['thrill', 'coaster', 'dragons', 'new']
              }
            ,
              {
                id: 'hiccups-wing-gliders',
                name: "Hiccup's Wing Gliders",
                type: 'Launch Coaster', thrillLevel: 3, heightRequirement: 48, duration: '~3 min',
                openingYear: 2025,
                description: 'Family launch coaster simulating dragon flight through Isle of Berk. Multiple launches through sweeping turns themed to riding Toothless.',
                history: 'Opened with Epic Universe 2025. Manufactured by Intamin — same company as VelociCoaster and Hagrid motorbike.',
                trivia: ['Manufactured by Intamin — same company as VelociCoaster and Hagrid motorbike', 'Simulates the sensation of riding Toothless through Berk', 'Multiple launches simulate a dragon gathering speed to fly'],
                specs: { type: 'Intamin Launch Coaster', heightReq: '48"', duration: '3 min' },
                mustDo: true, lightningLane: true, tags: ['HTTYD', 'coaster', 'launch', 'Epic Universe']
              },
              {
                id: 'dragon-racers-rally',
                name: "Dragon Racer's Rally",
                type: 'Sky Fly Ride', thrillLevel: 2, heightRequirement: null, duration: '~3 min',
                openingYear: 2025,
                description: 'Dueling Gerstlauer Sky Fly rides where riders control their dragon orientation. Pilot your own dragon through Berk.',
                history: 'Opened with Epic Universe 2025. The Sky Fly system gives riders control over vehicle orientation.',
                trivia: ['Riders control how much their vehicle flips and rotates', 'Two dueling arms over the center of Isle of Berk', 'One of the few rides where rider skill meaningfully changes the experience'],
                specs: { type: 'Gerstlauer Sky Fly', duration: '3 min' },
                mustDo: false, lightningLane: false, tags: ['HTTYD', 'thrill', 'flying', 'Epic Universe']
              },
              {
                id: 'fyre-drill',
                name: 'Fyre Drill',
                type: 'Interactive Boat Ride', thrillLevel: 1, heightRequirement: null, duration: '~5 min',
                openingYear: 2025,
                description: 'Interactive boat ride through Isle of Berk. Help train dragons using fire-breathing targets in this team-based water experience.',
                history: 'Opened with Epic Universe 2025 as the family water experience in Isle of Berk.',
                trivia: ['Guests interact with dragon targets throughout the boat journey', 'The boat floats through an actual water channel', 'Based on dragon training scenes from the How to Train Your Dragon films'],
                specs: { type: 'Interactive Boat Ride', duration: '5 min' },
                mustDo: false, lightningLane: false, tags: ['HTTYD', 'family', 'interactive', 'water']
              }
            ]
          },
          {
            id: 'universal-monsters-eu',
            name: 'Universal Monsters',
            rides: [
              {
                id: 'monsters-unchained',
                name: 'Monsters Unchained: The Frankenstein Experiment',
                type: 'Dark Ride',
                thrillLevel: 3,
                heightRequirement: 42,
                duration: '~5 min',
                openingYear: 2025,
                description: 'Enter Frankenstein\'s castle and encounter the most fearsome Universal Monsters — Dracula, the Mummy, the Invisible Man, and more — in this horror-themed dark ride.',
                history: 'Monsters Unchained opened with Epic Universe in May 2025, bringing the classic Universal Monsters back to theme park glory. The land is designed as a 1930s Eastern European village, beautifully atmospheric and genuinely spooky.',
                trivia: [
                  'Features Dracula, the Mummy, Frankenstein\'s Monster, Invisible Man, Creature from the Black Lagoon, and the Wolf Man',
                  'The 1930s European village aesthetic is unlike anything else at Universal',
                  'Not recommended for young children due to genuine horror elements'
                ],
                specs: { type: 'Horror Dark Ride', heightRequirement: '42 inches', opening: 'May 2025', rating: 'Horror-themed, scary' },
                mustDo: true,
                lightningLane: false,
                imageUrl: '',
                tags: ['thrill', 'horror', 'monsters', 'dark']
              }
            ,
              {
                id: 'curse-of-werewolf',
                name: 'Curse of the Werewolf',
                type: 'Spinning Coaster', thrillLevel: 3, heightRequirement: 48, duration: '~3 min',
                openingYear: 2025,
                description: 'A spinning roller coaster through Dark Universe themed to the 1941 Wolf Man. Each car spins freely through the cursed forest.',
                history: 'Opened with Epic Universe 2025. Manufactured by Mack Rides.',
                trivia: ['Based on the 1941 Universal Monsters film The Wolf Man', 'Spinning is uncontrolled — each ride differs based on weight distribution', 'Dark Universe is themed to the classic Universal Monsters franchise'],
                specs: { type: 'Mack Spinning Coaster', heightReq: '48"', duration: '3 min' },
                mustDo: true, lightningLane: true, tags: ['horror', 'coaster', 'spinning', 'Epic Universe']
              }
            ]
          }
        ]
      }
    ]
  }
,
  // ──────────────────────────────────────────────────────────
  //  DISNEYLAND RESORT
  // ──────────────────────────────────────────────────────────
  {
    id: 'disneyland',
    name: 'Disneyland Resort',
    shortName: 'Disneyland',
    emoji: '🌟',
    tagline: 'The Happiest Place on Earth — Where It All Began',
    accentColor: '#1a6fd4',
    parks: [
      {
        id: 'disneyland-park',
        name: 'Disneyland Park',
        emoji: '🌟',
        accentColor: '#1a6fd4',
        gradientFrom: '#0d2b6b',
        gradientTo: '#0a0f1e',
        description: 'The original Disney theme park — opened July 17, 1955 by Walt Disney himself. Every park that followed was built in its image.',
        openingYear: 1955,
        lands: [
          {
            id: 'dl-main-street',
            name: 'Main Street, U.S.A.',
            rides: [
              {
                id: 'dl-railroad',
                name: 'Disneyland Railroad',
                type: 'Train', thrillLevel: 1, heightRequirement: null, duration: '~18 min',
                openingYear: 1955,
                description: 'The original steam-powered railroad that circles the park. Walt rode this on opening day. The trains date to the early 1900s.',
                history: 'Walt Disney personally oversaw the construction of the Disneyland Railroad, born from his lifelong love of trains. It is one of the few attractions that has been operating continuously since the park opened in 1955.',
                trivia: ['Walt Disney had a private miniature railroad at his home called the Carolwood Pacific', 'The locomotives are genuine antique steam engines from the early 1900s', 'The Grand Canyon Diorama opened in 1958 — the first diorama in any Disney park'],
                specs: { type: 'Narrow Gauge Steam Railroad', stops: 4, distance: '1.2 miles' },
                mustDo: false, lightningLane: false, tags: ['classic', 'family', 'historical']
              }
            ]
          },
          {
            id: 'dl-adventureland',
            name: 'Adventureland',
            rides: [
              {
                id: 'dl-jungle-cruise',
                name: 'Jungle Cruise',
                type: 'Boat Ride', thrillLevel: 1, heightRequirement: null, duration: '~10 min',
                openingYear: 1955,
                description: 'The original Jungle Cruise — every skipper pun you\'ve ever heard started here. The original that inspired every version worldwide.',
                history: 'The original Jungle Cruise was one of Walt Disney\'s personal favorite attractions. It opened on July 17, 1955 as a serious adventure ride — Walt was disappointed that real jungle animals wouldn\'t perform on cue, leading to the animatronic animals. Over decades it evolved into a beloved pun-fest.',
                trivia: ['One of the original five opening-day attractions in 1955', 'Walt Disney envisioned it as a genuine adventure — the comedy came later', 'The Disneyland version inspired every Jungle Cruise worldwide'],
                specs: { type: 'Guided Boat Tour', duration: '10 min' },
                mustDo: true, lightningLane: false, tags: ['classic', 'family', 'comedy']
              },
              {
                id: 'dl-indiana-jones',
                name: 'Indiana Jones Adventure',
                type: 'Jeep Ride', thrillLevel: 3, heightRequirement: 46, duration: '~4 min',
                openingYear: 1995,
                description: 'Board a troop transport jeep through the Temple of the Forbidden Eye. The enhanced motion system makes each ride feel different. One of Disneyland\'s signature attractions.',
                history: 'Indiana Jones Adventure opened in 1995 after years of development. It pioneered the Enhanced Motion Vehicle (EMV) system — jeeps that simulate out-of-control movement on a fixed track. The queue alone took five years to design and is considered one of the greatest queue experiences in any theme park.',
                trivia: ['The queue contains over 30 individual interactive elements', 'The ride uses 16 different random scene combinations — you never experience the exact same ride twice', 'Harrison Ford recorded dialogue specifically for the attraction'],
                specs: { type: 'Enhanced Motion Vehicle', capacity: 12, duration: '4 min', vehicles: 60 },
                mustDo: true, lightningLane: true, tags: ['adventure', 'thrill', 'family']
              },
              {
                id: 'dl-treehouse',
                name: 'Tarzan\'s Treehouse',
                type: 'Walk-Through', thrillLevel: 1, heightRequirement: null, duration: '~15 min (self-guided)',
                openingYear: 1962,
                description: 'A self-guided walk through a massive treehouse. Originally Swiss Family Robinson Treehouse, now themed to Tarzan.',
                history: 'Opened in 1962 as the Swiss Family Robinson Treehouse, rethemed to Tarzan in 1999 following the film\'s release.',
                trivia: ['The tree contains over 300,000 artificial leaves', 'The structure weighs over 150 tons'],
                specs: { type: 'Self-Guided Walk-Through' },
                mustDo: false, lightningLane: false, tags: ['family', 'walk-through']
              }
            ]
          },
          {
            id: 'dl-new-orleans-square',
            name: 'New Orleans Square',
            rides: [
              {
                id: 'dl-haunted-mansion',
                name: 'Haunted Mansion',
                type: 'Dark Ride', thrillLevel: 2, heightRequirement: null, duration: '~9 min',
                openingYear: 1969,
                description: 'The original Haunted Mansion — 999 happy haunts calling it home since 1969. Slightly different than WDW\'s version with a different layout and exterior.',
                history: 'The original Haunted Mansion opened on August 9, 1969 at Disneyland — two years before the Walt Disney World version. It uses a descending elevator (WDW uses a stretching room) because the Disneyland ride goes below ground. The two versions share most characters but differ significantly in layout.',
                trivia: ['The Disneyland version uses an actual elevator to go below ground — WDW cannot due to the water table', 'The exterior is based on plantation houses of the American South', 'Marc Davis and Claude Coats had two competing visions for the attraction — "gag" comedy vs. genuine horror. Both visions are present in the final version'],
                specs: { type: 'Omnimover Dark Ride', vehicles: 131, capacity: '2 per doom buggy', duration: '9 min' },
                mustDo: true, lightningLane: false, tags: ['classic', 'family', 'dark', 'ghost']
              },
              {
                id: 'dl-pirates',
                name: 'Pirates of the Caribbean',
                type: 'Boat Ride', thrillLevel: 1, heightRequirement: null, duration: '~16 min',
                openingYear: 1967,
                description: 'The original Pirates of the Caribbean — longer than WDW\'s version, with an extra battle scene and the iconic skeleton cavern approach. The ride Walt Disney supervised personally.',
                history: 'Pirates of the Caribbean was the last attraction personally supervised by Walt Disney before his death in 1966. It opened on March 18, 1967 — the first major attraction to open after Walt\'s death. The WDW version (1971) is shorter. The Disneyland version features an additional bayou sequence at the beginning.',
                trivia: ['Walt Disney personally oversaw much of the attraction\'s development before his death in 1966', 'The original featured actual human skeletons borrowed from UCLA medical school — most were later returned', 'The Disneyland version is longer than WDW\'s version with an additional bayou sequence', 'The film franchise was inspired by this ride — not the other way around'],
                specs: { type: 'Boat Dark Ride', duration: '16 min', boats: '~27 boats' },
                mustDo: true, lightningLane: false, tags: ['classic', 'family', 'adventure']
              }
            ]
          },
          {
            id: 'dl-frontierland',
            name: 'Frontierland',
            rides: [
              {
                id: 'dl-big-thunder',
                name: 'Big Thunder Mountain Railroad',
                type: 'Mine Coaster', thrillLevel: 3, heightRequirement: 40, duration: '~4 min',
                openingYear: 1979,
                description: 'The original Big Thunder Mountain — the "wildest ride in the wilderness." Opens one year before WDW\'s version. Slightly different track layout.',
                history: 'Disneyland\'s Big Thunder opened September 2, 1979 — a year before WDW\'s version. The original concept was Thunder Mesa, developed in the late 1970s as a massive Western-themed expansion that would have included multiple attractions. Only Big Thunder was built.',
                trivia: ['Opened 1979 — one year before WDW\'s version', 'The original concept Thunder Mesa would have been an entire Western-themed expansion', 'The mine shaft collapse sound was recorded from an actual mine'],
                specs: { type: 'Mine Train Coaster', heightReq: '40"', duration: '4 min' },
                mustDo: true, lightningLane: true, tags: ['coaster', 'thrill', 'family']
              },
              {
                id: 'dl-splash',
                name: 'Splash Mountain',
                type: 'Log Flume', thrillLevel: 3, heightRequirement: 40, duration: '~11 min',
                openingYear: 1989,
                description: 'The classic 5-story drop log flume. Note: This attraction is being rethemed to Tiana\'s Bayou Adventure. Check current operating status.',
                history: 'Splash Mountain opened at Disneyland in 1989, one year before the WDW version. Based on the 1946 film Song of the South, it has been announced for rethemeing to Tiana\'s Bayou Adventure, though the transition timeline differs from WDW.',
                trivia: ['The Disneyland version opened in 1989', 'The 52-foot final drop is one of the tallest in any Disney park', 'Rethemeing to Tiana\'s Bayou Adventure announced — check current status'],
                specs: { type: 'Log Flume', heightReq: '40"', drop: '52 feet', duration: '11 min' },
                mustDo: true, lightningLane: true, tags: ['flume', 'thrill', 'family', 'wet']
              }
            ]
          },
          {
            id: 'dl-fantasyland',
            name: 'Fantasyland',
            rides: [
              {
                id: 'dl-matterhorn',
                name: 'Matterhorn Bobsleds',
                type: 'Mountain Coaster', thrillLevel: 3, heightRequirement: 42, duration: '~3 min',
                openingYear: 1959,
                description: 'One of the most iconic roller coasters in history — a twin-track bobsled coaster through a recreation of the Swiss Matterhorn. The Yeti inside is a Disneyland exclusive.',
                history: 'The Matterhorn Bobsleds opened June 14, 1959 — becoming the first tubular steel roller coaster in the world. The Matterhorn mountain itself is 1/100th scale replica of the real Swiss mountain. The basketball court inside the mountain is one of Disneyland\'s most famous secrets.',
                trivia: ['The first tubular steel roller coaster ever built (1959)', 'A regulation-size basketball court exists inside the mountain, used by cast members', 'The Yeti (Harold) inside the Matterhorn is a Disneyland exclusive — WDW doesn\'t have this version', 'The mountain is built at 1/100th the scale of the real Swiss Matterhorn'],
                specs: { type: 'Steel Bobsled Coaster', heightReq: '42"', dual: 'Two separate tracks', duration: '3 min' },
                mustDo: true, lightningLane: true, tags: ['coaster', 'classic', 'thrill']
              },
              {
                id: 'dl-peter-pan',
                name: 'Peter Pan\'s Flight',
                type: 'Dark Ride', thrillLevel: 1, heightRequirement: null, duration: '~3 min',
                openingYear: 1955,
                description: 'The original Peter Pan\'s Flight — one of the most beloved dark rides in history. Your pirate ship soars over London and Neverland.',
                history: 'Peter Pan\'s Flight was one of the original attractions at Disneyland in 1955 and is considered by many to be the quintessential Disney dark ride. The suspended vehicle system — flying over London — was groundbreaking in 1955.',
                trivia: ['Original opening-day attraction in 1955', 'Consistently one of the highest wait times in the park despite its brevity', 'The flying pirate ship mechanism was revolutionary in 1955'],
                specs: { type: 'Suspended Dark Ride', duration: '3 min' },
                mustDo: true, lightningLane: true, tags: ['classic', 'family', 'dark ride']
              },
              {
                id: 'dl-small-world',
                name: 'it\'s a small world',
                type: 'Boat Ride', thrillLevel: 1, heightRequirement: null, duration: '~11 min',
                openingYear: 1966,
                description: 'The original it\'s a small world — created for the 1964 New York World\'s Fair and brought to Disneyland in 1966. The song will never leave your head.',
                history: 'Originally created for the UNICEF pavilion at the 1964-1965 New York World\'s Fair, it\'s a small world came to Disneyland in 1966. The WDW version (1971) is the most elaborate iteration. The Disneyland version includes Disney characters integrated into the dolls — a controversial addition in 2008.',
                trivia: ['Originally created for the 1964 New York World\'s Fair', 'The song was composed by the Sherman Brothers and is the most performed song in history', 'Disney characters were added to the Disneyland version in 2008 — a controversial update'],
                specs: { type: 'Slow Boat Ride', duration: '11 min', capacity: '~600 per hour' },
                mustDo: false, lightningLane: false, tags: ['classic', 'family', 'gentle']
              },
              {
                id: 'dl-matterhorn-sub',
                name: 'Finding Nemo Submarine Voyage',
                type: 'Submarine', thrillLevel: 1, heightRequirement: null, duration: '~15 min',
                openingYear: 2007,
                description: 'A submarine voyage through the underwater world of Finding Nemo. Uses the original 1959 submarine lagoon — one of Disneyland\'s most beloved former attractions.',
                history: 'The submarine lagoon was originally home to the Submarine Voyage (1959-1998), one of the most beloved original Disneyland attractions. After nearly a decade dormant, it reopened as Finding Nemo Submarine Voyage in 2007.',
                trivia: ['The lagoon was built for the original 1959 Submarine Voyage', 'The original yellow submarines were decommissioned in 1998', 'The lagoon sat empty for nearly 10 years before Nemo reopened it'],
                specs: { type: 'Submarine Ride', duration: '15 min' },
                mustDo: false, lightningLane: false, tags: ['family', 'gentle', 'Pixar']
              }
            ]
          },
          {
            id: 'dl-tomorrowland',
            name: 'Tomorrowland',
            rides: [
              {
                id: 'dl-space-mountain',
                name: 'Space Mountain',
                type: 'Indoor Coaster', thrillLevel: 3, heightRequirement: 40, duration: '~3 min',
                openingYear: 1977,
                description: 'Disneyland\'s Space Mountain — smaller and slightly rougher than WDW\'s version, with a single track that spirals through the darkness. The classic original.',
                history: 'Disneyland\'s Space Mountain opened May 27, 1977 — two years after WDW\'s version. It uses a single track (WDW has two) and was built to fit within Tomorrowland\'s constraints. It is noticeably rougher than the WDW version but beloved by enthusiasts for that reason.',
                trivia: ['Opened 1977 — two years after WDW\'s version', 'Uses a single track (WDW uses two simultaneous tracks)', 'The Disneyland version is generally considered rougher and more intense than WDW\'s', 'The exterior white spires are one of Disneyland\'s most recognizable silhouettes'],
                specs: { type: 'Indoor Steel Coaster', heightReq: '40"', tracks: 1, duration: '3 min' },
                mustDo: true, lightningLane: true, tags: ['coaster', 'classic', 'dark', 'thrill']
              },
              {
                id: 'dl-buzz',
                name: 'Buzz Lightyear Astro Blasters',
                type: 'Interactive Ride', thrillLevel: 1, heightRequirement: null, duration: '~5 min',
                openingYear: 2005,
                description: 'Compete against other riders with your laser blasters as you help Buzz Lightyear defeat Emperor Zurg. Score tracked throughout the ride.',
                history: 'Buzz Lightyear Astro Blasters opened in 2005, inspired by the WDW version that opened in 1998. The Disneyland version uses the same interactive shooter concept.',
                trivia: ['The highest score targets are often hidden in surprising spots', 'Your score can be emailed to you — link appears at the end'],
                specs: { type: 'Interactive Dark Ride', duration: '5 min' },
                mustDo: false, lightningLane: false, tags: ['family', 'interactive', 'Pixar']
              }
            ]
          },
          {
            id: 'dl-galaxys-edge',
            name: "Star Wars: Galaxy's Edge",
            rides: [
              {
                id: 'dl-millennium-falcon',
                name: "Millennium Falcon: Smugglers Run",
                type: 'Interactive Simulator', thrillLevel: 2, heightRequirement: 38, duration: '~5 min',
                openingYear: 2019,
                description: 'Pilot the Millennium Falcon on a smuggling mission. You have a role — pilot, gunner, or engineer — that actually affects the outcome.',
                history: 'Opened at Disneyland on May 31, 2019 — a few months before the WDW version. Galaxy\'s Edge was the largest single-themed land expansion in Disneyland\'s history.',
                trivia: ['Galaxy\'s Edge was built on the site of the former Big Thunder Ranch area', 'The land is the largest expansion in Disneyland\'s 65-year history', 'You are addressed as a "guest" not a "rider" in Galaxy\'s Edge — you\'re a citizen of Batuu'],
                specs: { type: 'Motion Simulator', heightReq: '38"', crew: '6 per cockpit', duration: '5 min' },
                mustDo: true, lightningLane: true, tags: ['Star Wars', 'interactive', 'thrill']
              },
              {
                id: 'dl-rise',
                name: "Star Wars: Rise of the Resistance",
                type: 'Trackless Dark Ride', thrillLevel: 2, heightRequirement: 40, duration: '~18 min',
                openingYear: 2020,
                description: 'The most technologically ambitious attraction ever built — a seamless immersive experience as you\'re captured by the First Order. Multiple ride systems in one attraction.',
                history: 'Rise of the Resistance opened at Disneyland on January 17, 2020, a month after the WDW version. It is widely considered the most complex and ambitious theme park attraction ever constructed.',
                trivia: ['Uses five different ride systems in a single continuous experience', 'The AT-AT walker is 22 feet tall — the largest audio-animatronic figure ever built', 'The total experience including all pre-shows runs approximately 18 minutes'],
                specs: { type: 'Multi-System Dark Ride', heightReq: '40"', systems: 5, duration: '~18 min' },
                mustDo: true, lightningLane: true, tags: ['Star Wars', 'immersive', 'thrill']
              }
            ]
          },
          {
            id: 'dl-mickey-toontown',
            name: "Mickey's Toontown",
            rides: [
              {
                id: 'dl-mickey-minnie',
                name: "Mickey & Minnie's Runaway Railway",
                type: 'Trackless Dark Ride', thrillLevel: 1, heightRequirement: null, duration: '~7 min',
                openingYear: 2023,
                description: 'A cartoon-style adventure inside a Mickey Mouse cartoon short. The first ride-through attraction to star Mickey Mouse himself.',
                history: 'Opened March 8, 2023 at Disneyland as part of the reimagined Mickey\'s Toontown. The WDW version opened in 2020. This is the first ride to star Mickey Mouse in any Disney park.',
                trivia: ['The first Disney ride to star Mickey Mouse (2023)', 'Uses "2½D" technology — real sets enhanced with 2D cartoon effects', 'No height requirement — one of the most accessible attractions in the park'],
                specs: { type: 'Trackless Dark Ride', duration: '7 min' },
                mustDo: true, lightningLane: true, tags: ['Mickey Mouse', 'family', 'new']
              }
            ]
          }
        ]
      },
      {
        id: 'disney-california-adventure',
        name: 'Disney California Adventure',
        emoji: '🎡',
        accentColor: '#e53935',
        gradientFrom: '#7b1a1a',
        gradientTo: '#0a0f1e',
        description: 'A celebration of California and the Disney/Pixar legacy. Home to Radiator Springs Racers, Incredicoaster, and the beloved Guardians of the Galaxy – Mission: BREAKOUT!',
        openingYear: 2001,
        lands: [
          {
            id: 'dca-buena-vista',
            name: 'Buena Vista Street',
            rides: []
          },
          {
            id: 'dca-avengers',
            name: 'Avengers Campus',
            rides: [
              {
                id: 'dca-web-slingers',
                name: 'WEB SLINGERS: A Spider-Man Adventure',
                type: 'Interactive Ride', thrillLevel: 1, heightRequirement: null, duration: '~5 min',
                openingYear: 2021,
                description: 'Sling webs alongside Spider-Man using motion-sensing technology — no physical props required. An innovative hands-free interactive attraction.',
                history: 'WEB SLINGERS opened with Avengers Campus on June 4, 2021. The motion-sensing web-slinging mechanic represented a new approach to interactive dark rides.',
                trivia: ['No physical controllers — your arm movements sling webs via motion sensing', 'The attraction uses a proprietary hand-tracking system', 'Tom Holland recorded dialogue for the attraction'],
                specs: { type: 'Interactive Dark Ride', duration: '5 min' },
                mustDo: true, lightningLane: true, tags: ['Marvel', 'interactive', 'family']
              }
            ]
          },
          {
            id: 'dca-cars-land',
            name: 'Cars Land',
            rides: [
              {
                id: 'dca-racers',
                name: 'Radiator Springs Racers',
                type: 'Simulated Racing Ride', thrillLevel: 3, heightRequirement: 40, duration: '~7 min',
                openingYear: 2012,
                description: 'Race through Radiator Springs in a six-person car. Consistently rated one of the best theme park attractions in the world — the finale race around the track is breathtaking.',
                history: 'Radiator Springs Racers opened June 21, 2012 as the centerpiece of Cars Land — the most expensive expansion in Disneyland Resort history at the time. The attraction uses the same ride system as Test Track at EPCOT but with dramatically superior theming.',
                trivia: ['Consistently voted the best attraction at any Disney or Universal park by enthusiasts', 'Cars Land is a 1:1 recreation of the animated town of Radiator Springs — the buildings match the film exactly', 'The attraction features 54 audio-animatronics including all the major characters'],
                specs: { type: 'Enhanced Motion Vehicle Racing', heightReq: '40"', capacity: 6, duration: '7 min' },
                mustDo: true, lightningLane: true, tags: ['Pixar', 'racing', 'thrill', 'family']
              },
              {
                id: 'dca-mater',
                name: 'Mater\'s Junkyard Jamboree',
                type: 'Spinning Ride', thrillLevel: 1, heightRequirement: null, duration: '~3 min',
                openingYear: 2012,
                description: 'Spin around Mater\'s barnyard dance party. Surprisingly whippy — adults enjoy it as much as kids.',
                history: 'Opened with Cars Land in 2012.',
                trivia: ['The spinning is more intense than it looks from outside', 'Larry the Cable Guy recorded new dialogue for the attraction'],
                specs: { type: 'Spinning Tractor', duration: '3 min' },
                mustDo: false, lightningLane: false, tags: ['Pixar', 'family', 'spinning']
              }
            ]
          },
          {
            id: 'dca-pixar-pier',
            name: 'Pixar Pier',
            rides: [
              {
                id: 'dca-incredicoaster',
                name: 'Incredicoaster',
                type: 'Launch Coaster', thrillLevel: 4, heightRequirement: 48, duration: '~2.5 min',
                openingYear: 2018,
                description: 'The fastest coaster in any Disney park — the former California Screamin\' rethemed to The Incredibles. 0-55mph in 4 seconds on the beachfront.',
                history: 'Originally opened as California Screamin\' in 2001 — a record-breaking looping coaster that launched at 55mph along the boardwalk. Rethemed to Incredicoaster in 2018 as Pixar Pier opened.',
                trivia: ['Originally California Screamin\' (2001) — one of the longest steel coasters in the world at the time', 'The 0-55mph launch happens in under 4 seconds', 'The full loop was the first loop in any Disney-owned park'],
                specs: { type: 'Launch Steel Coaster', heightReq: '48"', topSpeed: '55 mph', length: '6,072 ft', duration: '2.5 min' },
                mustDo: true, lightningLane: true, tags: ['Pixar', 'coaster', 'intense', 'launch']
              },
              {
                id: 'dca-toy-story',
                name: 'Toy Story Midway Mania!',
                type: 'Interactive Ride', thrillLevel: 1, heightRequirement: null, duration: '~6 min',
                openingYear: 2008,
                description: 'Shoot at 4D targets in a carnival game midway hosted by Toy Story characters. Competitive and fun for all ages.',
                history: 'Opened in 2008 at both DCA and Hollywood Studios. Uses the same ride system at both parks.',
                trivia: ['Your score is visible to your car-mate — competitive rides increase replay value', 'The glasses are required — targets have 3D effects'],
                specs: { type: 'Interactive 4D Shooter', duration: '6 min' },
                mustDo: true, lightningLane: true, tags: ['Pixar', 'interactive', 'family']
              }
            ]
          },
          {
            id: 'dca-grizzly-peak',
            name: 'Grizzly Peak',
            rides: [
              {
                id: 'dca-grizzly-river',
                name: 'Grizzly River Run',
                type: 'Raft Ride', thrillLevel: 3, heightRequirement: 42, duration: '~7 min',
                openingYear: 2001,
                description: 'A round raft ride through Grizzly Peak — the largest of its kind in the world when it opened. You will get wet.',
                history: 'Opened with Disney California Adventure on February 8, 2001. Claims the title of world\'s longest raft flume at opening.',
                trivia: ['The world\'s longest raft flume when it opened', 'The circular raft spins randomly — no two rides face the same direction', 'Lockers are available at the entrance — use them'],
                specs: { type: 'Circular Raft Ride', heightReq: '42"', duration: '7 min' },
                mustDo: false, lightningLane: false, tags: ['wet', 'family', 'thrill']
              },
              {
                id: 'dca-soarin',
                name: 'Soarin\' Around the World',
                type: 'Hang Gliding Simulator', thrillLevel: 1, heightRequirement: 40, duration: '~5 min',
                openingYear: 2016,
                description: 'Hang glide over iconic world landmarks — the Eiffel Tower, the Great Wall, the Serengeti. Scents and breezes enhance the experience.',
                history: 'The original Soarin\' Over California was one of DCA\'s original 2001 attractions and became its most beloved. The current "Around the World" version replaced it in 2016 when new film footage was added.',
                trivia: ['Originally Soarin\' Over California (2001) before the global version replaced it', 'The attraction adds scents at key moments — pine forests, the ocean, orange groves', 'The film footage was shot with an IMAX camera mounted on a helicopter'],
                specs: { type: 'Hang Glider Simulator', heightReq: '40"', capacity: 87, duration: '5 min' },
                mustDo: true, lightningLane: true, tags: ['family', 'scenic', 'gentle']
              }
            ]
          },
          {
            id: 'dca-hollywood',
            name: 'Hollywood Land',
            rides: [
              {
                id: 'dca-guardians',
                name: 'Guardians of the Galaxy — Mission: BREAKOUT!',
                type: 'Drop Tower', thrillLevel: 4, heightRequirement: 40, duration: '~2 min',
                openingYear: 2017,
                description: 'A randomized drop sequence with rock music and Guardians of the Galaxy theming. The West Coast version of Tower of Terror — many argue it\'s superior.',
                history: 'Replaced the beloved Tower of Terror on May 27, 2017 — one of the most controversial changes in California theme park history. The building, elevator system, and general mechanics are identical to Tower of Terror. The randomized soundtrack and visual experience are new. Many fans mourned Tower of Terror; most now agree BREAKOUT is excellent.',
                trivia: ['Replaced Tower of Terror (2004-2017) — one of the most controversial Disney decisions in California', 'The drop sequences are randomized and synced to the Guardians soundtrack', 'The building and elevator system are structurally identical to Tower of Terror', 'Vin Diesel, Chris Pratt, and the full cast recorded lines for the attraction'],
                specs: { type: 'Randomized Drop Ride', heightReq: '40"', drops: 'Randomized', duration: '2 min' },
                mustDo: true, lightningLane: true, tags: ['Marvel', 'thrill', 'drop', 'intense']
              },
              {
                id: 'storm-force-accelatron',
                name: 'Storm Force Accelatron',
                type: 'Spinning Ride', thrillLevel: 1, heightRequirement: null, duration: '~2 min',
                openingYear: 2000,
                description: 'A teacups-style spinning ride themed to the X-Men character Storm. Fun and mild — a palate cleanser between the bigger Marvel thrills.',
                history: 'Opened in 2000 as part of Marvel Super Hero Island.',
                trivia: ['One of the few Marvel attractions themed to Storm specifically', 'Guests control spinning speed by turning the center wheel', 'Themed to Storm channeling lightning into the spinning vehicles'],
                specs: { type: 'Spinning Teacups', duration: '2 min' },
                mustDo: false, lightningLane: false, tags: ['Marvel', 'family', 'spinner', 'gentle']
              }
            ]
          }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  //  UNIVERSAL STUDIOS HOLLYWOOD
  // ──────────────────────────────────────────────────────────
  {
    id: 'universal-hollywood',
    name: 'Universal Studios Hollywood',
    shortName: 'Universal Hollywood',
    emoji: '🎬',
    tagline: 'The Entertainment Capital of L.A.',
    accentColor: '#ff6b35',
    parks: [
      {
        id: 'universal-studios-hollywood',
        name: 'Universal Studios Hollywood',
        emoji: '🎬',
        accentColor: '#ff6b35',
        gradientFrom: '#7a2900',
        gradientTo: '#0a0f1e',
        description: 'The original Universal theme park — built on an active film studio lot. The Studio Tour remains its signature experience. Home to the Wizarding World, Super Nintendo World, and working soundstages.',
        openingYear: 1964,
        lands: [
          {
            id: 'ush-upper-lot',
            name: 'Upper Lot',
            rides: [
              {
                id: 'ush-mario',
                name: 'Super Nintendo World',
                type: 'Interactive Land', thrillLevel: 2, heightRequirement: null, duration: 'Varies',
                openingYear: 2023,
                description: 'Enter the world of Nintendo — Mario Kart: Bowser\'s Challenge is the centerpiece attraction. Interactive wristbands let you punch question blocks and collect coins throughout the land.',
                history: 'Super Nintendo World opened at Universal Studios Hollywood on February 17, 2023 — the first in North America, following the Japan version in 2021. The land represents years of collaboration between Universal and Nintendo.',
                trivia: ['The first Super Nintendo World in North America (2023)', 'Interactive wristbands connect to a smartphone app to track your score', 'The entire land is designed to feel like you\'ve been shrunk into a video game'],
                specs: { type: 'Themed Land with Attractions', openYear: 2023 },
                mustDo: true, lightningLane: true, tags: ['Nintendo', 'interactive', 'family', 'new']
              },
              {
                id: 'ush-mario-kart',
                name: 'Mario Kart: Bowser\'s Challenge',
                type: 'AR Ride', thrillLevel: 2, heightRequirement: 40, duration: '~5 min',
                openingYear: 2023,
                description: 'Race against Bowser\'s team in a kart through Mario Kart tracks using AR glasses. Team-based competition — your whole vehicle contributes to a shared score.',
                history: 'Opened with Super Nintendo World on February 17, 2023. Uses augmented reality glasses to overlay the Mario Kart game world onto physical sets.',
                trivia: ['Uses AR glasses rather than screens — the physical sets are real but overlaid with digital content', 'The entire kart vehicle counts as one team — coordination with your cart-mates matters', 'Features music composed specifically for the attraction'],
                specs: { type: 'AR Dark Ride', heightReq: '40"', capacity: 4, duration: '5 min' },
                mustDo: true, lightningLane: true, tags: ['Nintendo', 'AR', 'racing', 'family']
              },
              {
                id: 'ush-transformers',
                name: 'Transformers: The Ride-3D',
                type: '3D Motion Simulator', thrillLevel: 3, heightRequirement: 40, duration: '~5 min',
                openingYear: 2012,
                description: 'Join the Autobots in a battle against the Decepticons. A 3D multi-sensory motion simulator that uses the same system as Spider-Man at Universal Orlando.',
                history: 'Opened June 20, 2012 at Universal Studios Hollywood. Uses the same groundbreaking simulator system as The Amazing Adventures of Spider-Man at Universal Orlando.',
                trivia: ['Uses the same ride system as Spider-Man at Universal Orlando', 'The screens cover your entire field of vision — there is no visible edge', 'Peter Cullen (original Optimus Prime) voiced the attraction'],
                specs: { type: '3D Motion Simulator', heightReq: '40"', duration: '5 min' },
                mustDo: false, lightningLane: false, tags: ['action', 'simulator', '3D']
              },
              {
                id: 'ush-despicable-me',
                name: 'Despicable Me Minion Mayhem',
                type: 'Motion Simulator', thrillLevel: 1, heightRequirement: 40, duration: '~5 min',
                openingYear: 2014,
                description: 'Get transformed into a Minion and join Gru\'s family. A standing simulator that has riders literally jumping during the experience.',
                history: 'Opened July 2, 2014 at Universal Studios Hollywood.',
                trivia: ['The "transformation" into a Minion uses vibration seats', 'The post-show dance party is genuinely fun'],
                specs: { type: 'Standing Motion Simulator', heightReq: '40"', duration: '5 min' },
                mustDo: false, lightningLane: false, tags: ['family', 'Minions', 'simulator']
              }
            ]
          },
          {
            id: 'ush-wizarding-world',
            name: 'The Wizarding World of Harry Potter',
            rides: [
              {
                id: 'ush-forbidden-journey',
                name: 'Harry Potter and the Forbidden Journey',
                type: 'Robotic Arm Ride', thrillLevel: 3, heightRequirement: 48, duration: '~5 min',
                openingYear: 2016,
                description: 'The KUKA robotic arm experience through Hogwarts — Quidditch, Dementors, the Whomping Willow. The Hogwarts Castle queue is as impressive as the ride itself.',
                history: 'The Wizarding World opened at Universal Studios Hollywood on April 7, 2016. The Forbidden Journey uses the same KUKA robotic arm system as the Universal Orlando version.',
                trivia: ['The Hogwarts Castle exterior took 3 years to build', 'The robotic arm system generates unpredictable g-forces unlike any fixed-track ride', 'The queue passes through Dumbledore\'s office, the Gryffindor common room, and more iconic HP locations'],
                specs: { type: 'KUKA Robotic Arm Ride', heightReq: '48"', duration: '5 min' },
                mustDo: true, lightningLane: true, tags: ['Harry Potter', 'thrill', 'immersive']
              },
              {
                id: 'ush-flight-hippogriff',
                name: 'Flight of the Hippogriff',
                type: 'Family Coaster', thrillLevel: 2, heightRequirement: 39, duration: '~1 min',
                openingYear: 2016,
                description: 'A family roller coaster themed to Buckbeak. Short but fun — great views of Hogsmeade and the Hogwarts Castle.',
                history: 'Opened with the Wizarding World in 2016. Similar to the Orlando version at Islands of Adventure.',
                trivia: ['At the top of the lift hill you can see all the way to the lower lot', 'Bow before Buckbeak in the queue — it\'s required'],
                specs: { type: 'Family Coaster', heightReq: '39"', duration: '1 min' },
                mustDo: false, lightningLane: false, tags: ['Harry Potter', 'coaster', 'family']
              }
            ]
          },
          {
            id: 'ush-lower-lot',
            name: 'Lower Lot',
            rides: [
              {
                id: 'ush-jurassic-world',
                name: 'Jurassic World — The Ride',
                type: 'Water Ride', thrillLevel: 4, heightRequirement: 42, duration: '~8 min',
                openingYear: 2019,
                description: 'A river raft ride through Jurassic World that culminates in a terrifying 84-foot drop — one of the steepest water ride drops in the world.',
                history: 'Jurassic World — The Ride replaced the beloved Jurassic Park: The Ride in 2019. The original 1996 Jurassic Park ride was a Hollywood landmark for 23 years. The new version is themed to the current film series with new animatronics and an 84-foot drop.',
                trivia: ['Replaced the beloved original Jurassic Park: The Ride (1996-2018)', 'The 84-foot drop is one of the steepest in any water ride worldwide', 'New Indominus Rex animatronic is the centerpiece of the new version'],
                specs: { type: 'River Raft Water Ride', heightReq: '42"', drop: '84 feet', duration: '8 min' },
                mustDo: true, lightningLane: true, tags: ['Jurassic World', 'wet', 'thrill', 'intense']
              },
              {
                id: 'ush-mummy',
                name: 'Revenge of the Mummy — The Ride',
                type: 'Indoor Coaster', thrillLevel: 3, heightRequirement: 48, duration: '~3 min',
                openingYear: 2004,
                description: 'The West Coast version of the indoor psychological coaster. Launches forward AND backward through Egyptian-themed darkness.',
                history: 'Opened June 6, 2004 at Universal Studios Hollywood. Uses the same track layout as the Florida version but with different theming elements.',
                trivia: ['Features both forward and backward launches', 'The fire effects at the loading area use real ignition systems', 'The psychological element — lights that suggest the ride is over — is one of the best fake-outs in theme park history'],
                specs: { type: 'Indoor Launched Coaster', heightReq: '48"', duration: '3 min' },
                mustDo: true, lightningLane: true, tags: ['coaster', 'thrill', 'dark', 'launch']
              }
            ]
          },
          {
            id: 'ush-studio-tour',
            name: 'Studio Tour',
            rides: [
              {
                id: 'ush-studio-tour-ride',
                name: 'The World-Famous Studio Tour',
                type: 'Tram Tour', thrillLevel: 2, heightRequirement: null, duration: '~60 min',
                openingYear: 1964,
                description: 'The original Universal attraction — a tram tour through the actual working film studio. Includes encounters with King Kong 360°, Fast & Furious — Supercharged, Skull Island: Reign of Kong, and disaster sequences. The signature Universal Hollywood experience.',
                history: 'The Studio Tour began on June 3, 1964 — literally the first attraction Universal Studios Hollywood ever offered. For 60 years it has been the park\'s defining experience. The tour passes through actual film sets and studio infrastructure used in real productions.',
                trivia: ['The original 1964 tour was simply buses driving through the studio for $1', 'The Bates Motel from Psycho is on the tour route — the original set', 'King Kong 360° was designed by Peter Jackson and is the largest 3D experience ever created', 'The Flash Flood sequence uses 9.5 million gallons of water per show'],
                specs: { type: 'Guided Tram Tour', duration: '~60 min', trams: 'Multiple per hour', year: 1964 },
                mustDo: true, lightningLane: false, tags: ['classic', 'film', 'iconic', 'studio']
              }
            ]
          }
        ]
      }
    ]
  }

];

// ============================================================
// HIDDEN MICKEYS
// ============================================================
export const HIDDEN_MICKEYS = [
  // MAGIC KINGDOM
  { id: 'hm-1', park: 'Magic Kingdom', location: 'Haunted Mansion', description: 'In the ballroom scene, look at the circular plates on the long dinner table — three are arranged in a classic Mickey head silhouette.', difficulty: 'Easy', imageUrl: '', found: false },
  { id: 'hm-2', park: 'Magic Kingdom', location: 'Haunted Mansion Queue', description: 'On the iron fence posts outside, look for circular decorative orbs grouped in threes on the fence tops.', difficulty: 'Medium', imageUrl: '', found: false },
  { id: 'hm-3', park: 'Magic Kingdom', location: 'Pirates of the Caribbean', description: 'In the bayou scene near the beginning, look for fireflies grouped in a Mickey shape in the trees on the right side.', difficulty: 'Hard', imageUrl: '', found: false },
  { id: 'hm-4', park: 'Magic Kingdom', location: 'Big Thunder Mountain Railroad', description: 'In the loading area, look for three gears arranged in a Mickey head among the mining equipment on the walls.', difficulty: 'Medium', imageUrl: '', found: false },
  { id: 'hm-5', park: 'Magic Kingdom', location: 'Seven Dwarfs Mine Train Queue', description: 'In the interactive queue area, watch the projection on the water barrels — Mickey pops up hidden among the diamonds.', difficulty: 'Easy', imageUrl: '', found: false },
  { id: 'hm-6', park: 'Magic Kingdom', location: 'Buzz Lightyear Space Ranger Spin', description: 'Toward the end of the ride, look for three circular targets grouped together on the left side wall near an alien planet scene.', difficulty: 'Medium', imageUrl: '', found: false },
  { id: 'hm-7', park: 'Magic Kingdom', location: 'Fantasyland — Cinderella Fountain', description: 'Stand at a specific angle on the southeast side of the fountain — the reflection creates a Mickey head profile in the water spray.', difficulty: 'Hard', imageUrl: '', found: false },
  { id: 'hm-8', park: 'Magic Kingdom', location: 'Under the Sea Journey of the Little Mermaid Queue', description: 'On Mickey\'s birthday (November 18) around noon, sunlight through a rock formation creates a perfect Mickey shadow on the queue wall.', difficulty: 'Legendary', imageUrl: '', found: false },
  { id: 'hm-9', park: 'Magic Kingdom', location: 'Mickey\'s PhilharMagic Queue', description: 'Look at the sheet music decorations on the walls of the queue — three circular notes are grouped in a Mickey formation.', difficulty: 'Easy', imageUrl: '', found: false },
  { id: 'hm-10', park: 'Magic Kingdom', location: 'Tomorrowland PeopleMover', description: 'While riding through Buzz Lightyear, look for circles in the alien planet floor mosaics that form a Mickey head.', difficulty: 'Hard', imageUrl: '', found: false },

  // EPCOT
  { id: 'hm-11', park: 'EPCOT', location: 'Spaceship Earth', description: 'In the Renaissance scene, look at a mosaic tile floor or wall — three circular tiles create a subtle Mickey head.', difficulty: 'Hard', imageUrl: '', found: false },
  { id: 'hm-12', park: 'EPCOT', location: 'Soarin\' Queue', description: 'On the upper level of the queue, look at the old photographs of aviation pioneers — one has a circular Mickey shape in the equipment.', difficulty: 'Medium', imageUrl: '', found: false },
  { id: 'hm-13', park: 'EPCOT', location: 'Test Track Queue', description: 'In the SimCar design area, some of the holographic car elements contain hidden circular Mickey ear shapes in the wheels.', difficulty: 'Medium', imageUrl: '', found: false },
  { id: 'hm-14', park: 'EPCOT', location: 'Living with the Land', description: 'In the greenhouse section, Disney\'s agricultural scientists grow pumpkins in Mickey-shaped molds — look for the Mickey pumpkins!', difficulty: 'Easy', imageUrl: '', found: false },
  { id: 'hm-15', park: 'EPCOT', location: 'France Pavilion', description: 'On the rooftops and architectural details of the France Pavilion, look for circular dormer windows arranged in Mickey head patterns.', difficulty: 'Medium', imageUrl: '', found: false },
  { id: 'hm-16', park: 'EPCOT', location: 'Germany Pavilion', description: 'In the Karamell-Küche (caramel shop), look for Mickey shapes in the caramel art decorations on the walls.', difficulty: 'Easy', imageUrl: '', found: false },
  { id: 'hm-17', park: 'EPCOT', location: 'Japan Pavilion', description: 'In the Mitsukoshi department store, look at the circular decorative displays — some have circles arranged in Mickey proportions.', difficulty: 'Medium', imageUrl: '', found: false },
  { id: 'hm-18', park: 'EPCOT', location: 'Guardians of the Galaxy Cosmic Rewind Queue', description: 'In the Galaxarium pre-show area, look at the star maps — three stars in the cosmos are arranged in a Mickey head formation.', difficulty: 'Hard', imageUrl: '', found: false },
  { id: 'hm-19', park: 'EPCOT', location: 'Solar Panels (aerial view)', description: 'The solar panel array near the EPCOT toll plaza is laid out in the exact shape of Mickey Mouse\'s head when viewed from above.', difficulty: 'Legendary', imageUrl: '', found: false },
  { id: 'hm-20', park: 'EPCOT', location: 'Mexico Pavilion', description: 'Inside the pyramid, look at the architectural details of the mural near the entrance — circular decorative elements form a Mickey.', difficulty: 'Medium', imageUrl: '', found: false },

  // HOLLYWOOD STUDIOS
  { id: 'hm-21', park: 'Hollywood Studios', location: 'Tower of Terror Queue', description: 'In the hotel library queue, look at the lamp shades and circular decorative elements on the shelf — three circles form a Mickey.', difficulty: 'Medium', imageUrl: '', found: false },
  { id: 'hm-22', park: 'Hollywood Studios', location: 'Toy Story Mania Queue', description: 'Mr. Potato Head in the queue has circular Mickey shapes hidden in his costume details.', difficulty: 'Easy', imageUrl: '', found: false },
  { id: 'hm-23', park: 'Hollywood Studios', location: 'Slinky Dog Dash Queue', description: 'On Andy\'s building blocks scattered around the queue area, look for blocks with circular Mickey-shaped indentations.', difficulty: 'Easy', imageUrl: '', found: false },
  { id: 'hm-24', park: 'Hollywood Studios', location: 'Galaxy\'s Edge — Millennium Falcon', description: 'On the full-scale Millennium Falcon, look at the circular details on the ship\'s hull — three circular panels near the cockpit form Mickey ears.', difficulty: 'Hard', imageUrl: '', found: false },
  { id: 'hm-25', park: 'Hollywood Studios', location: 'Mickey & Minnie\'s Runaway Railway', description: 'During the cartoon scenes, background paintings include circular cloud formations and dots in Mickey head patterns.', difficulty: 'Hard', imageUrl: '', found: false },

  // ANIMAL KINGDOM
  { id: 'hm-26', park: 'Animal Kingdom', location: 'Tree of Life', description: 'Look at the Tree of Life mosaic — carved into the tree\'s intricate animal tapestry is a hidden Mickey face made from circular knots in the bark, to the right of the tiger.', difficulty: 'Hard', imageUrl: '', found: false },
  { id: 'hm-27', park: 'Animal Kingdom', location: 'Kilimanjaro Safaris', description: 'In the flamingo pond area, look for flamingos arranged in a group — sometimes three of them position themselves in a Mickey head formation.', difficulty: 'Legendary', imageUrl: '', found: false },
  { id: 'hm-28', park: 'Animal Kingdom', location: 'Avatar Flight of Passage Queue', description: 'In the Bioluminescent lab area of the queue, look at the blue and purple glowing bubbles on the science equipment — three bubbles are grouped in Mickey proportions.', difficulty: 'Medium', imageUrl: '', found: false },
  { id: 'hm-29', park: 'Animal Kingdom', location: 'Expedition Everest Queue', description: 'In the Yeti museum queue, look at circular artifacts and relics on the shelves — three round items form a Mickey silhouette.', difficulty: 'Medium', imageUrl: '', found: false },
  { id: 'hm-30', park: 'Animal Kingdom', location: 'It\'s Tough to Be a Bug', description: 'In the pre-show area inside the Tree of Life, look at the circular patterns in the roots and bark around the theater entrance.', difficulty: 'Medium', imageUrl: '', found: false },
  { id: 'hm-31', park: 'Animal Kingdom', location: 'Pandora — Na\'vi River Journey Queue', description: 'In the glowing bioluminescent foliage of the queue, look for three circular glowing pods clustered in a Mickey head formation among the plants.', difficulty: 'Hard', imageUrl: '', found: false },
];

// ============================================================
// FOOD & DRINK TRACKER
// ============================================================
export const FOOD_DRINKS = {
  drinkingAroundTheWorld: {
    title: 'Drinking Around the World',
    subtitle: 'EPCOT World Showcase Challenge',
    description: 'Sample a drink from each of the 11 World Showcase country pavilions. Tips: pace yourself (eat food between drinks!), allow 4–6 hours, start at Mexico and go counterclockwise, and always bring water.',
    countries: [
      {
        id: 'datw-mexico',
        country: 'Mexico',
        pavilionOrder: 1,
        flag: '🇲🇽',
        recommendedDrink: 'Margarita (La Cava del Tequila)',
        alternatives: ['Tequila flight', 'Gran Fiesta margarita', 'House Margarita at La Hacienda'],
        description: 'La Cava del Tequila inside the Mexico pyramid serves over 200 tequilas. The house margaritas with jalapeño or tamarind are legendary.',
        proTip: 'The Mexico pavilion is INSIDE the pyramid — the tequila bar is a gem. Arrive early or wait.',
        difficulty: 'Easy — lots of options'
      },
      {
        id: 'datw-norway',
        country: 'Norway',
        pavilionOrder: 2,
        flag: '🇳🇴',
        recommendedDrink: 'Frozen Viking Coffee',
        alternatives: ['Oslo Aquavit', 'Ottawa Apple (at Canada)', 'Kringla bakery hot chocolate'],
        description: 'The Kringla Bakeri serves the Frozen Viking Coffee with Bailey\'s Irish Cream, Kamora Coffee Liqueur, and mocha sauce. Rich and dessert-like.',
        proTip: 'Try the school bread pastry here — it pairs perfectly with the coffee drink.',
        difficulty: 'Easy'
      },
      {
        id: 'datw-china',
        country: 'China',
        pavilionOrder: 3,
        flag: '🇨🇳',
        recommendedDrink: 'Kung Fu Punch',
        alternatives: ['Honey Hibiscus Iced Tea (with rum)', 'TsingTao Beer', 'Plum Wine'],
        description: 'The Kung Fu Punch at Joy of Tea is a perennial fan favorite: vodka, triple sec, mango, and orange juice. Tropical and refreshing.',
        proTip: 'Joy of Tea has the fastest service in World Showcase — great if you\'re falling behind pace.',
        difficulty: 'Easy'
      },
      {
        id: 'datw-germany',
        country: 'Germany',
        pavilionOrder: 4,
        flag: '🇩🇪',
        recommendedDrink: 'German Draft Beer (Paulaner or Warsteiner)',
        alternatives: ['Glühwein (mulled wine)', 'Märzen Oktoberfest lager', 'Schnapps shot'],
        description: 'The Bier und Brezeln cart or Biergarten Restaurant serves authentic German draft beers. Paulaner Hefeweizen is a crowd favorite.',
        proTip: 'Karamell-Küche is right here — grab a caramel item with your beer. Best snack combo at EPCOT.',
        difficulty: 'Easy — multiple options'
      },
      {
        id: 'datw-italy',
        country: 'Italy',
        pavilionOrder: 5,
        flag: '🇮🇹',
        recommendedDrink: 'Bellini (Frozen or Classic)',
        alternatives: ['Aperol Spritz', 'Limoncello', 'Chianti or Italian red wine'],
        description: 'A prosecco Bellini with peach purée from the Italy kiosk is the quintessential Italian aperitivo. Frozen version is perfect in Florida heat.',
        proTip: 'Get the Aperol Spritz if you want something a little more bitter and sophisticated.',
        difficulty: 'Easy'
      },
      {
        id: 'datw-america',
        country: 'America',
        pavilionOrder: 6,
        flag: '🇺🇸',
        recommendedDrink: 'Moonshine Sour (Regal Eagle Smokehouse)',
        alternatives: ['Craft beer from Florida Sunshine Seasonings', 'American bourbon', 'Draft beer'],
        description: 'The Regal Eagle Smokehouse walk-up bar serves a popular Moonshine Sour — a sweet-tart combination with real moonshine.',
        proTip: 'America tends to have shorter waits than other pavilions. Rest your feet here if needed.',
        difficulty: 'Easy'
      },
      {
        id: 'datw-japan',
        country: 'Japan',
        pavilionOrder: 7,
        flag: '🇯🇵',
        recommendedDrink: 'Sake (Garden House or Mitsukoshi)',
        alternatives: ['Japanese whisky', 'Kirin draft beer', 'Frozen Japanese cocktail'],
        description: 'Garden House near the front of the Japan Pavilion offers sake sampling with knowledgeable staff who will help you find the right style.',
        proTip: 'Tell them what you usually like to drink — they\'ll match you to a sake variety you\'ll love.',
        difficulty: 'Medium — sake can be unfamiliar'
      },
      {
        id: 'datw-morocco',
        country: 'Morocco',
        pavilionOrder: 8,
        flag: '🇲🇦',
        recommendedDrink: 'Moroccan Mule (Spice Road Table)',
        alternatives: ['Casablanca wine', 'Mint tea cocktail', 'Beer Casablanca'],
        description: 'The Moroccan Mule at Spice Road Table features fig vodka — giving it a uniquely sweet, earthy twist on the Moscow Mule.',
        proTip: 'Order a small plate here — Moroccan food absorbs alcohol beautifully and keeps you going.',
        difficulty: 'Medium'
      },
      {
        id: 'datw-france',
        country: 'France',
        pavilionOrder: 9,
        flag: '🇫🇷',
        recommendedDrink: 'French Champagne or Kir Royale',
        alternatives: ['Grey Goose Citron Slush', 'Bordeaux red wine', 'Pastis (anise spirit)'],
        description: 'Blend in with the French and order a genuine sparkling Champagne or a Kir Royale (Champagne with blackcurrant liqueur) from any of the multiple kiosks.',
        proTip: 'L\'Artisan des Glaces has amazing ice cream to pair with your drink — don\'t skip it.',
        difficulty: 'Easy'
      },
      {
        id: 'datw-uk',
        country: 'United Kingdom',
        pavilionOrder: 10,
        flag: '🇬🇧',
        recommendedDrink: 'Bass Ale or Guinness on Draft',
        alternatives: ['Pimm\'s Cup', 'Scottish whisky', 'Rose & Crown cider'],
        description: 'Rose & Crown Pub is a genuine British-style pub serving Bass Ale, Guinness, and British ciders. The Pimm\'s Cup is refreshing on a hot day.',
        proTip: 'If you can get a table at Rose & Crown facing World Showcase Lagoon, the EPCOT fireworks view is stunning.',
        difficulty: 'Easy'
      },
      {
        id: 'datw-canada',
        country: 'Canada',
        pavilionOrder: 11,
        flag: '🇨🇦',
        recommendedDrink: 'Ottawa Apple',
        alternatives: ['Le Cellier house wine', 'Moosehead beer', 'Canadian Club whisky cocktail'],
        description: 'The Ottawa Apple combines Crown Royal Whisky, maple syrup, apple flavoring, and cranberry juice. A fitting Canadian send-off.',
        proTip: 'You made it! The Ottawa Apple is delicious AND Instagram-worthy. Celebrate with a group photo at the waterfall.',
        difficulty: 'Easy — you deserve it!'
      }
    ]
  },

  disneyWorldFood: [
    { id: 'dwf-1', category: 'Magic Kingdom', name: 'Dole Whip Float', location: 'Aloha Isle, Adventureland', description: 'The legendary pineapple soft-serve in a pineapple juice float. Iconic Disney snack #1.', price: '$6-8', tried: false, mustTry: true, imageUrl: '' },
    { id: 'dwf-2', category: 'Magic Kingdom', name: 'Mickey Premium Bar', location: 'Multiple carts', description: 'Vanilla ice cream in the shape of Mickey\'s head on a chocolate-dipped stick. The classic.', price: '$6', tried: false, mustTry: true, imageUrl: '' },
    { id: 'dwf-3', category: 'Magic Kingdom', name: 'Turkey Leg', location: 'Frontierland carts', description: 'Giant smoked turkey leg. A Disney World rite of passage.', price: '$14', tried: false, mustTry: false, imageUrl: '' },
    { id: 'dwf-4', category: 'Magic Kingdom', name: 'Churro', location: 'Multiple carts', description: 'Hot, crispy cinnamon-sugar churros. Perfect park snack.', price: '$5-7', tried: false, mustTry: false, imageUrl: '' },
    { id: 'dwf-5', category: 'EPCOT', name: 'School Bread (Norway)', location: 'Kringla Bakeri, Norway', description: 'A cardamom-spiced sweet bun filled with custard and topped with coconut. Absolutely wonderful.', price: '$5', tried: false, mustTry: true, imageUrl: '' },
    { id: 'dwf-6', category: 'EPCOT', name: 'Karamell Popcorn', location: 'Karamell-Küche, Germany', description: 'Caramel-drizzled popcorn from EPCOT\'s most beloved snack shop.', price: '$7', tried: false, mustTry: true, imageUrl: '' },
    { id: 'dwf-7', category: 'EPCOT', name: 'Croissant au Beurre', location: 'Boulangerie Pâtisserie, France', description: 'Buttery, flaky French croissant from the best bakery in Walt Disney World.', price: '$5', tried: false, mustTry: true, imageUrl: '' },
    { id: 'dwf-8', category: 'EPCOT', name: 'Bratwurst with Sauerkraut', location: 'Sommerfest, Germany', description: 'Authentic German bratwurst in a pretzel roll. Excellent with a German beer.', price: '$12', tried: false, mustTry: false, imageUrl: '' },
    { id: 'dwf-9', category: 'Hollywood Studios', name: 'Ronto Wrap (Galaxy\'s Edge)', location: 'Ronto Roasters, Galaxy\'s Edge', description: 'A signature dish of Galaxy\'s Edge — spiced pork with roasted noodles in a flatbread. Surprisingly amazing.', price: '$13', tried: false, mustTry: true, imageUrl: '' },
    { id: 'dwf-10', category: 'Hollywood Studios', name: 'Blue Milk / Green Milk', location: 'Milk Stand, Galaxy\'s Edge', description: 'Blue milk (citrus-coconut-pineapple) and green milk (citrus-tropical-floral) from Star Wars. Unique and delicious.', price: '$8', tried: false, mustTry: true, imageUrl: '' },
    { id: 'dwf-11', category: 'Hollywood Studios', name: 'Woody\'s Lunchbox Toasted Cheese', location: 'Woody\'s Lunchbox, Toy Story Land', description: 'A grilled cheese sandwich pressed in a waffle iron with tomato soup for dipping. Childhood nostalgia maximized.', price: '$10', tried: false, mustTry: false, imageUrl: '' },
    { id: 'dwf-12', category: 'Animal Kingdom', name: 'Flame Tree BBQ Ribs', location: 'Flame Tree Barbecue, Discovery Island', description: 'Slow-smoked ribs with coleslaw and beans. Best BBQ in all of Walt Disney World.', price: '$18', tried: false, mustTry: true, imageUrl: '' },
    { id: 'dwf-13', category: 'Animal Kingdom', name: 'Harambe Market Chicken Skewer', location: 'Harambe Market, Africa', description: 'African-spiced chicken skewer with corn. The whole Harambe Market area has excellent food.', price: '$12', tried: false, mustTry: false, imageUrl: '' },
  ],

  universalFood: [
    { id: 'uf-1', category: 'Wizarding World', name: 'Butterbeer (Frozen)', location: 'Three Broomsticks / Hogshead', description: 'The legendary drink of Hogwarts: a butterscotch-cream soda base with a thick frothy cream topping. Must-try. Get FROZEN.', price: '$8', tried: false, mustTry: true, imageUrl: '' },
    { id: 'uf-2', category: 'Wizarding World', name: 'Butterbeer Ice Cream', location: 'Florean Fortescue\'s, Diagon Alley', description: 'Butterbeer-flavored soft-serve. Even richer and creamier than the drink version.', price: '$6', tried: false, mustTry: true, imageUrl: '' },
    { id: 'uf-3', category: 'Wizarding World', name: 'Pumpkin Juice', location: 'Multiple Wizarding World locations', description: 'Non-alcoholic pumpkin, apple, and spice juice. Refreshingly autumnal and unique.', price: '$5', tried: false, mustTry: false, imageUrl: '' },
    { id: 'uf-4', category: 'Wizarding World', name: 'Chocolate Frog', location: 'Honeydukes, Hogsmeade', description: 'A frog-shaped chocolate with a wizard trading card inside. Iconic Harry Potter collectible.', price: '$15', tried: false, mustTry: true, imageUrl: '' },
    { id: 'uf-5', category: 'Wizarding World', name: 'Fishy Green Ale', location: 'Hog\'s Head Pub', description: 'Cinnamon apple-flavored drink with blueberry bubbles at the bottom. Refreshing and Instagram-worthy.', price: '$7', tried: false, mustTry: false, imageUrl: '' },
    { id: 'uf-6', category: 'Springfield', name: 'Flaming Moe (non-alcoholic)', location: 'Moe\'s Tavern, Springfield', description: 'An orange-flavored fizzy drink with dry ice smoke effects — looks amazing. Based on the iconic Simpsons cocktail.', price: '$9', tried: false, mustTry: true, imageUrl: '' },
    { id: 'uf-7', category: 'Springfield', name: 'Lard Lad Donut', location: 'Lard Lad Donuts', description: 'A giant pink-frosted donut with sprinkles — the exact donut Homer drools over. Instagram gold.', price: '$6', tried: false, mustTry: true, imageUrl: '' },
    { id: 'uf-8', category: 'Epic Universe', name: 'Mushroom Kingdom Meal', location: 'Super Nintendo World restaurants', description: 'Mario-themed meals with mushroom burgers, koopa troopa shells, and Power-Up themed desserts.', price: '$18', tried: false, mustTry: true, imageUrl: '' },
    { id: 'uf-9', category: 'Epic Universe', name: 'Dragon Fire Cocktail', location: 'Isle of Berk, Epic Universe', description: 'A smoky cocktail themed to dragon fire from the How to Train Your Dragon land. Served with dry ice effects.', price: '$16', tried: false, mustTry: false, imageUrl: '' },
  ]
};
