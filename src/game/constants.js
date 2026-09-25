// Core vocabulary shared by data, logic and UI.
// Physical equivalent: the four coloured Local Cred tracks on each player board.

export const CATEGORIES = {
  history: {
    id: 'history',
    label: 'History',
    blurb: "Maritime heritage, whaling, the lights, and the people who shaped the island.",
  },
  knowledge: {
    id: 'knowledge',
    label: 'Island Knowledge',
    blurb: 'Geography, landmarks, roads, beaches and knowing where things are.',
  },
  life: {
    id: 'life',
    label: 'Island Life',
    blurb: 'Weather, getting around, beaches, seasons and everyday island routines.',
  },
  community: {
    id: 'community',
    label: 'Community',
    blurb: 'Traditions, etiquette and the judgment of someone who belongs here.',
  },
};

export const CATEGORY_IDS = Object.keys(CATEGORIES);

// Card decks. A deck is the "flavour" printed on a card back; the Local Cred
// category it awards is set per card.
export const DECKS = {
  knowIt: { id: 'knowIt', label: 'Know It' },
  knowTheIsland: { id: 'knowTheIsland', label: 'Know the Island' },
  islandLife: { id: 'islandLife', label: 'Island Life' },
  history: { id: 'history', label: 'History' },
  acktualLocal: { id: 'acktualLocal', label: 'Acktual Local' },
  localSecret: { id: 'localSecret', label: 'Local Secret' },
  islandEvent: { id: 'islandEvent', label: 'Island Event' },
};

export const DIFFICULTY_IDS = ['easy', 'medium', 'local'];

export const PHASES = {
  EVENT: 'event', // new round: reveal the Island Event
  TRAVEL: 'travel', // choose transport + destination
  ROLLED: 'rolled', // a transport roll failed; reroll or accept
  MOVING: 'moving', // pawn animating along its route
  ARRIVED: 'arrived', // choose an experience at the destination
  CHALLENGE: 'challenge', // answering a card
  RESOLVED: 'resolved', // answer revealed, explanation shown
  DONE: 'done', // nothing left but End Turn
};
