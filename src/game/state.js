import { GAME_CONFIG } from '../config/gameConfig.js';
import { CATEGORY_IDS } from './constants.js';

export const emptyTurn = () => ({
  phase: null,
  mode: null, // selected transport
  dest: null, // selected destination
  path: null, // path being travelled
  roll: null,
  failed: false,
  cardId: null,
  hidden: [], // answer indexes removed by a hint
  result: null, // { correct, awards, knowHow, secretId, answerIndex }
  traveled: false,
});

export function createPlayer({ id, name, token }) {
  return {
    id,
    name,
    token,
    location: GAME_CONFIG.startLocation,
    cred: Object.fromEntries(CATEGORY_IDS.map((c) => [c, 0])),
    secrets: [],
    knowHow: GAME_CONFIG.knowHow.enabled ? GAME_CONFIG.knowHow.start : 0,
    visited: [GAME_CONFIG.startLocation],
    challenges: { attempted: 0, correct: 0 },
    usedAbilities: [], // once-per-game location abilities
  };
}

export const initialState = {
  screen: 'setup', // 'setup' | 'game' | 'results'
  config: null, // { mode, rounds, rankSet, season, knowHowEnabled, seasonsEnabled }
  players: [],
  currentIdx: 0,
  round: 1,
  eventId: null,
  eventDeck: [],
  usedCards: [],
  turn: emptyTurn(),
  log: [],
  stats: null,
};
