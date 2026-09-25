// Nantucket status ladder. Labels are placeholders the brand owner can rename.
// Physical equivalent: the scoring chart printed on each player board.
//
// Requirements (all must be met):
//   total   — overall Local Cred
//   each    — minimum in EVERY category (forces breadth)
//   secrets — Local Secret tokens
//   visited — distinct destinations visited (exploration)

export const RANKS = [
  { id: 'dayTripper', label: 'Day-Tripper' },
  { id: 'weekender', label: 'Weekender' },
  { id: 'summerRegular', label: 'Summer Regular' },
  { id: 'seasonedVisitor', label: 'Seasoned Visitor' },
  { id: 'islandInsider', label: 'Island Insider' },
  { id: 'acktualLocal', label: 'Acktual Local' },
];

export const RANK_REQUIREMENTS = {
  quick: {
    dayTripper: {},
    weekender: { total: 3, visited: 2 },
    summerRegular: { total: 6, each: 1, visited: 3 },
    seasonedVisitor: { total: 10, each: 1, visited: 4 },
    islandInsider: { total: 13, each: 2, visited: 5 },
    acktualLocal: { total: 16, each: 3, secrets: 1, visited: 6 },
  },
  // NOTE: the vertical slice has one Local Secret site, so standard mode asks
  // for 1 secret. Raise to 2–3 once more secret sites exist (Phase 5).
  standard: {
    dayTripper: {},
    weekender: { total: 5, visited: 3 },
    summerRegular: { total: 10, each: 1, visited: 4 },
    seasonedVisitor: { total: 16, each: 2, visited: 5 },
    islandInsider: { total: 22, each: 3, visited: 6 },
    acktualLocal: { total: 28, each: 5, secrets: 1, visited: 8 },
  },
};

// Final-results copy. Assembled from: rank verdict + strongest category + gap.
export const JOURNEY_TEXT = {
  verdict: {
    dayTripper: 'You came over on the morning boat and saw the highlights. The island is only starting to open up to you.',
    weekender: 'A good long weekend. You found your way around, but the island still has plenty it hasn’t shown you.',
    summerRegular: 'You keep coming back, and it shows. You know your beach, your bike route and where to get coffee.',
    seasonedVisitor: 'You’ve seen the island in more than one mood, and you’re starting to answer other people’s questions.',
    islandInsider: 'People ask you for directions, and you get them right. Very little on this island surprises you.',
    acktualLocal: 'You know your way around the island, you know its history, and you got through enough island surprises to prove you’re more than a visitor.',
  },
  strength: {
    history: 'Whaling captains, the Great Fire and the keepers of the lights: you carry the island’s past with you.',
    knowledge: 'You could draw the roads from memory and you never confuse Madaket with Milestone.',
    life: 'Fog, ferries, surf and sunsets: you know how the island actually works day to day.',
    community: 'You understand the unwritten rules: patience, courtesy and a wave on the road.',
  },
  gap: {
    history: 'Next trip, spend an afternoon with the island’s history. The lighthouses and museums have more to tell you.',
    knowledge: 'Next trip, get out of town. The roads to the far ends of the island are worth learning.',
    life: 'Next trip, go to the beaches and ride out in the weather. That’s how the island gets under your skin.',
    community: 'Next trip, slow down and watch how islanders do things. That’s what earns their respect.',
  },
};
