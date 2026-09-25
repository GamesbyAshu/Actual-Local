// Board destinations. Positions are on the 1000 x 640 board (x east, y south)
// and are a stylised but geographically faithful layout of Nantucket.
//
// IMAGES: no photograph is bundled yet. Each location carries an `image`
// record with `src: null` and a suggested licensed source. Until a licensed
// image is added, the UI shows a clearly labelled illustrated placeholder.
// When adding a photo, fill in src, credit and license together.

export const LOCATIONS = {
  town: {
    id: 'town',
    name: 'Nantucket Town',
    shortName: 'Town',
    type: 'hub',
    tags: ['town', 'historic', 'harbor', 'shuttleStop'],
    pos: { x: 478, y: 392 },
    labelOffset: { x: 0, y: 30 },
    description:
      'Cobblestoned Main Street, captains’ houses and the wharves where the ferries arrive. Every road on the island leads back here.',
    history:
      'In the first half of the 19th century Nantucket was the world capital of whaling. The Great Fire of July 13, 1846 destroyed some 250 buildings in the town centre, and much of what you see downtown was rebuilt soon after.',
    specialAbility: {
      id: 'hub',
      label: 'Steamboat Wharf',
      text: 'Every Wave shuttle line starts here. At the end of the game, players in Town have made the Last Boat (+1 Island Life).',
    },
    image: {
      src: null,
      alt: 'Main Street, Nantucket, with its cobblestones and brick storefronts',
      credit: null,
      license: null,
      suggestedSource: 'Wikimedia Commons — “Main Street, Nantucket” (check each file’s licence)',
    },
  },

  brant: {
    id: 'brant',
    name: 'Brant Point',
    shortName: 'Brant Point',
    type: 'lighthouse',
    tags: ['lighthouse', 'harbor'],
    pos: { x: 448, y: 344 },
    labelOffset: { x: -8, y: -18 },
    description:
      'The small white lighthouse at the harbour mouth that every ferry passes on its way in and out.',
    history:
      'Established in 1746, Brant Point was the second lighthouse station in colonial America. The present 26-foot tower, built in 1901, is the shortest lighthouse in New England.',
    specialAbility: {
      id: 'pennies',
      label: 'Toss a Penny',
      text: 'The first time you arrive here, toss a penny for luck and gain 1 Island Know-How.',
    },
    image: {
      src: null,
      alt: 'Brant Point Light at the entrance to Nantucket Harbor',
      credit: null,
      license: null,
      suggestedSource: 'U.S. Coast Guard History Program (public domain) or Wikimedia Commons',
    },
  },

  jetties: {
    id: 'jetties',
    name: 'Jetties Beach',
    shortName: 'Jetties',
    type: 'beach',
    tags: ['beach', 'northShore'],
    pos: { x: 392, y: 356 },
    labelOffset: { x: -18, y: -16 },
    description:
      'The family beach on the north shore, a short walk from town, with calmer water on the Nantucket Sound side.',
    history:
      'The beach takes its name from the stone jetties that line the channel into Nantucket Harbor.',
    specialAbility: null,
    image: {
      src: null,
      alt: 'Jetties Beach on the north shore of Nantucket',
      credit: null,
      license: null,
      suggestedSource: 'Wikimedia Commons — “Jetties Beach” (check each file’s licence)',
    },
  },

  surfside: {
    id: 'surfside',
    name: 'Surfside',
    shortName: 'Surfside',
    type: 'beach',
    tags: ['beach', 'southShore', 'shuttleStop'],
    pos: { x: 512, y: 552 },
    labelOffset: { x: 0, y: 30 },
    description:
      'A wide south-shore beach facing the open Atlantic, a straight bike ride from town.',
    history:
      'The Surfside Life-Saving Station, the first on the island, was built here in 1874. It has served as a youth hostel since 1963.',
    specialAbility: null,
    image: {
      src: null,
      alt: 'Surfside Beach on Nantucket’s south shore',
      credit: null,
      license: null,
      suggestedSource: 'Library of Congress HABS survey of the Surfside station (public domain)',
    },
  },

  cisco: {
    id: 'cisco',
    name: 'Cisco',
    shortName: 'Cisco',
    type: 'beach',
    tags: ['beach', 'southShore'],
    pos: { x: 352, y: 536 },
    labelOffset: { x: -4, y: 30 },
    description:
      'South-shore surf, open moorland and a long road out from town past Hummock Pond.',
    history:
      'Cisco sits on the island’s exposed south shore, where Atlantic swell arrives with nothing in the way.',
    specialAbility: null,
    image: {
      src: null,
      alt: 'Cisco Beach and the south-shore surf',
      credit: null,
      license: null,
      suggestedSource: 'Wikimedia Commons — “Cisco Beach Nantucket” (check each file’s licence)',
    },
  },

  madaket: {
    id: 'madaket',
    name: 'Madaket',
    shortName: 'Madaket',
    type: 'village',
    tags: ['beach', 'westEnd', 'shuttleStop', 'sunset'],
    pos: { x: 100, y: 440 },
    labelOffset: { x: 6, y: 30 },
    description:
      'The far west end of the island: a harbour, a beach and famous sunsets.',
    history:
      'Mildred “Madaket Millie” Jewett watched over the west end for decades. The Coast Guard gave her the honorary title “Commanding Officer, West End Command.”',
    specialAbility: {
      id: 'sunset',
      label: 'Madaket Sunset',
      text: 'Linger here once per game to gain 1 Island Life instead of Know-How.',
      linger: { category: 'life', amount: 1 },
    },
    image: {
      src: null,
      alt: 'Sunset over Madaket',
      credit: null,
      license: null,
      suggestedSource: 'Wikimedia Commons — “Madaket” (check each file’s licence)',
    },
  },

  sconset: {
    id: 'sconset',
    name: "Siasconset ('Sconset)",
    shortName: "'Sconset",
    type: 'village',
    tags: ['village', 'historic', 'eastEnd', 'shuttleStop'],
    pos: { x: 878, y: 468 },
    labelOffset: { x: -6, y: 30 },
    description:
      'A village of small, rose-covered cottages at the east end of the island, along the Milestone Road from town.',
    history:
      "'Sconset began as a fishing village. In 1824 granite markers were set along the road from town to time horse races, which is how Milestone Road got its name.",
    specialAbility: {
      id: 'bluffWalk',
      label: 'The Bluff Walk',
      text: 'Linger here once per game to gain 1 Island Knowledge instead of Know-How.',
      linger: { category: 'knowledge', amount: 1 },
    },
    image: {
      src: null,
      alt: "Rose-covered cottages in 'Sconset",
      credit: null,
      license: null,
      suggestedSource: "Nantucket Historical Association digital exhibits (request permission) or Wikimedia Commons",
    },
  },

  sankaty: {
    id: 'sankaty',
    name: 'Sankaty Head',
    shortName: 'Sankaty Head',
    type: 'lighthouse',
    tags: ['lighthouse', 'eastEnd', 'secretSite'],
    pos: { x: 866, y: 398 },
    labelOffset: { x: -8, y: -20 },
    description:
      'A white lighthouse with a red band on the bluff north of ’Sconset, looking out over the Atlantic.',
    history:
      "First lit in 1850. By 2006 erosion had brought the bluff's edge to within about 72 feet of the tower, and in 2007 the 'Sconset Trust moved the 400-ton lighthouse about 405 feet to safer ground.",
    specialAbility: {
      id: 'secret',
      label: 'Local Secret',
      text: 'Hard-won knowledge lives here. With 2 History you may attempt this Local Secret.',
    },
    secret: {
      id: 'secret-sankaty',
      name: 'The Moving Lighthouse',
      requires: { history: 2 },
      reward: { category: 'history', amount: 2, knowHow: 1 },
    },
    image: {
      src: null,
      alt: 'Sankaty Head Light on the bluff',
      credit: null,
      license: null,
      suggestedSource: 'U.S. Coast Guard History Program (public domain) or Wikimedia Commons',
    },
  },
};

export const LOCATION_IDS = Object.keys(LOCATIONS);
