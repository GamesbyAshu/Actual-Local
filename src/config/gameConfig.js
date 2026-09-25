// Every tunable number for playtesting lives here.
// Physical equivalent: the rulebook's reference tables.

export const GAME_CONFIG = {
  players: { min: 2, max: 6 },
  startLocation: 'town',

  modes: {
    quick: {
      id: 'quick',
      label: 'Quick Game',
      rounds: 10,
      rankSet: 'quick',
      blurb: 'About 25–35 minutes. Lower thresholds, one Local Secret needed.',
    },
    standard: {
      id: 'standard',
      label: 'Standard Game',
      rounds: 16,
      rankSet: 'standard',
      blurb: 'The intended physical game length. Broad experience required.',
    },
  },

  // Reward = Local Cred gained on a correct answer.
  // Penalty = Local Cred lost on a wrong answer (never below zero).
  difficulty: {
    easy: { id: 'easy', label: 'Easy', reward: 1, penalty: 0, knowHow: 0 },
    medium: { id: 'medium', label: 'Medium', reward: 2, penalty: 0, knowHow: 0 },
    local: { id: 'local', label: 'Local', reward: 3, penalty: 1, knowHow: 1 },
  },

  // Optional spendable resource. Set enabled:false to playtest without it.
  knowHow: {
    enabled: true,
    start: 1,
    max: 3,
    costs: { hint: 1, reroll: 1 },
  },

  // Transportation. A d6 is rolled for anything with failOn values.
  // Edge types: 'road' (paved roads & bike paths) and 'beach' (on foot only).
  transport: {
    walk: {
      id: 'walk',
      label: 'Walk',
      steps: 1,
      edgeTypes: ['road', 'beach'],
      failOn: [],
      summary: 'One route space. Always reliable. The only way along the beach.',
    },
    bike: {
      id: 'bike',
      label: 'Bike',
      steps: 3,
      edgeTypes: ['road'],
      failOn: [1],
      failText: 'Flat tire — you only make it one space.',
      summary: 'Up to three spaces on roads and bike paths. Roll: on a 1, a flat tire.',
    },
    shuttle: {
      id: 'shuttle',
      label: 'The Wave',
      lineBased: true,
      failOn: [1],
      failText: 'You watched the Wave pull away. You stay put this turn.',
      summary: 'Ride one shuttle line from stop to stop. Roll: on a 1, you miss it.',
    },
  },

  // Staying put instead of travelling. Some locations override the reward.
  linger: { knowHow: 1 },

  // "The Last Boat": at game end, players back in Town made the last ferry.
  lastBoat: { enabled: true, location: 'town', category: 'life', amount: 1 },

  // Seasons are modular (Phase 6). The slice runs in summer.
  seasons: { enabled: false, default: 'summer' },
};

export const SEASONS = {
  spring: { id: 'spring', label: 'Spring' },
  summer: { id: 'summer', label: 'Summer' },
  fall: { id: 'fall', label: 'Fall' },
  winter: { id: 'winter', label: 'Winter' },
};
