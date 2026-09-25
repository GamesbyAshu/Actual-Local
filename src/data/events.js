// Island Event deck. One event is turned over at the start of each round and
// applies to everyone for that round. Physical equivalent: an event deck
// beside the board.
//
// effects schema:
//   transport:        per-mode overrides { disabled, steps, failOn }
//   blockedEdgeTypes: route types nobody can use this round (e.g. 'beach')
//   bonuses:          extra Local Cred for a CORRECT answer at a location with `tag`
//                     (optionally only for cards of `whenCategory`)
//   seasons:          which seasons this card is shuffled into (Phase 6)

export const EVENTS = [
  {
    id: 'fog',
    name: 'The Grey Lady Rolls In',
    kicker: 'Fog',
    text: 'Thick fog covers the island. Cyclists slow to a crawl and the foghorns start up.',
    rules: [
      'Bike: at most 2 spaces, and a flat tire on a 1 or 2.',
      'Correct History answers at a lighthouse earn +1 History.',
    ],
    effects: {
      transport: { bike: { steps: 2, failOn: [1, 2] } },
      bonuses: [{ tag: 'lighthouse', whenCategory: 'history', category: 'history', amount: 1 }],
    },
    seasons: ['spring', 'summer', 'fall', 'winter'],
  },
  {
    id: 'beachDay',
    name: 'A Perfect Beach Day',
    kicker: 'Island Life',
    text: 'Blue sky, light breeze, warm sand. Half the island heads for the beach, and the shuttles fill up.',
    rules: [
      'Any correct answer at a beach earns +1 Island Life.',
      'The Wave: missed on a 1 or 2.',
    ],
    effects: {
      transport: { shuttle: { failOn: [1, 2] } },
      bonuses: [{ tag: 'beach', category: 'life', amount: 1 }],
    },
    seasons: ['summer'],
  },
  {
    id: 'traffic',
    name: 'Summer Traffic',
    kicker: 'Getting Around',
    text: 'Cars are backed up on the way out of town, and bikes are passing all of them.',
    rules: ['The Wave: missed on a 1, 2 or 3.', 'Bikes are unaffected.'],
    effects: {
      transport: { shuttle: { failOn: [1, 2, 3] } },
    },
    seasons: ['summer'],
  },
  {
    id: 'noreaster',
    name: "Nor'easter",
    kicker: 'Weather',
    text: 'Wind and driving rain off the Atlantic. Nobody is biking, the beaches are washed over, and everyone is sheltering in town.',
    rules: [
      'No bikes this round.',
      'Beach routes are closed.',
      'Correct answers in Town earn +1 Community.',
    ],
    effects: {
      transport: { bike: { disabled: true } },
      blockedEdgeTypes: ['beach'],
      bonuses: [{ tag: 'town', category: 'community', amount: 1 }],
    },
    seasons: ['spring', 'fall', 'winter'],
  },
  {
    id: 'calm',
    name: 'Calm Seas, Clear Skies',
    kicker: 'Weather',
    text: 'A still, bright day. The ferries run on time and the whole island is easy to get around.',
    rules: ['No special effects this round.'],
    effects: {},
    seasons: ['spring', 'summer', 'fall', 'winter'],
  },
];

export const EVENTS_BY_ID = Object.fromEntries(EVENTS.map((e) => [e.id, e]));
