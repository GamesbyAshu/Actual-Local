// The rules engine. Pure: every random value arrives inside the action
// (see hooks/useGame.js), so any game can be replayed from its action log.

import { GAME_CONFIG } from '../config/gameConfig.js';
import { LOCATIONS } from '../data/locations.js';
import { CATEGORIES, DECKS, PHASES } from './constants.js';
import { initialState, emptyTurn, createPlayer } from './state.js';
import { isLocation, nodeName } from './board.js';
import { getReachable, rollFails, effectiveTransport } from './movement.js';
import { getCard, resolveAnswer } from './challenges.js';
import { getEvent } from './events.js';
import { uid } from '../utils/random.js';

const current = (s) => s.players[s.currentIdx];
const clampKnowHow = (n) => Math.max(0, Math.min(GAME_CONFIG.knowHow.max, n));

function updateCurrent(s, fn) {
  return { ...s, players: s.players.map((p, i) => (i === s.currentIdx ? fn(p) : p)) };
}
function updatePlayer(s, id, fn) {
  return { ...s, players: s.players.map((p) => (p.id === id ? fn(p) : p)) };
}
function log(s, text, tone = 'neutral', playerId = current(s)?.id) {
  const entry = { id: uid(), round: s.round, playerId, text, tone, at: Date.now() };
  return { ...s, log: [entry, ...s.log].slice(0, 200) };
}
const setTurn = (s, patch) => ({ ...s, turn: { ...s.turn, ...patch } });

function applyAwards(p, awards) {
  const cred = { ...p.cred };
  for (const a of awards) cred[a.category] = Math.max(0, (cred[a.category] || 0) + a.amount);
  return { ...p, cred };
}

const awardText = (awards) =>
  awards.map((a) => `${a.amount > 0 ? '+' : ''}${a.amount} ${CATEGORIES[a.category].label}`).join(', ');

function arrive(s) {
  const path = s.turn.path;
  const to = path[path.length - 1];
  const from = path[0];
  let next = updateCurrent(s, (p) => ({
    ...p,
    location: to,
    visited: isLocation(to) && !p.visited.includes(to) ? [...p.visited, to] : p.visited,
  }));
  const firstVisit = isLocation(to) && !current(s).visited.includes(to);
  next = {
    ...next,
    stats: {
      ...next.stats,
      travel: [
        ...next.stats.travel,
        { round: s.round, playerId: current(s).id, mode: s.turn.mode, from, to, roll: s.turn.roll, failed: s.turn.failed },
      ],
    },
  };
  next = log(next, `${current(s).name} ${s.turn.failed ? 'limped' : 'travelled'} by ${effectiveTransport(s.turn.mode).label} to ${nodeName(to)}${firstVisit ? ' (first visit)' : ''}.`);

  // Brant Point: toss a penny (once per game).
  if (to === 'brant' && !current(next).usedAbilities.includes('pennies') && s.config.knowHowEnabled) {
    next = updateCurrent(next, (p) => ({ ...p, knowHow: clampKnowHow(p.knowHow + 1), usedAbilities: [...p.usedAbilities, 'pennies'] }));
    next = log(next, `${current(s).name} tossed a penny off Brant Point. +1 Know-How.`, 'good');
  }
  return setTurn(next, { phase: isLocation(to) ? PHASES.ARRIVED : PHASES.DONE, traveled: true });
}

function finishGame(s) {
  let next = s;
  const lb = GAME_CONFIG.lastBoat;
  if (lb.enabled) {
    for (const p of s.players.filter((pl) => pl.location === lb.location)) {
      next = updatePlayer(next, p.id, (pl) => applyAwards(pl, [{ category: lb.category, amount: lb.amount }]));
      next = log(next, `${p.name} made the Last Boat from town. +${lb.amount} ${CATEGORIES[lb.category].label}.`, 'good', p.id);
    }
  }
  return { ...next, screen: 'results', stats: { ...next.stats, endedAt: Date.now(), roundsPlayed: Math.min(s.round, s.config.rounds) } };
}

export function reducer(s, a) {
  switch (a.type) {
    case 'START_GAME': {
      const { setup, turnOrder, eventId, eventDeck } = a;
      const players = turnOrder.map((i) => createPlayer({ ...setup.players[i], id: `p${i + 1}` }));
      const mode = GAME_CONFIG.modes[setup.mode];
      const next = {
        ...initialState,
        screen: 'game',
        config: {
          mode: mode.id,
          rounds: mode.rounds,
          rankSet: mode.rankSet,
          season: setup.season || GAME_CONFIG.seasons.default,
          seasonsEnabled: GAME_CONFIG.seasons.enabled,
          knowHowEnabled: GAME_CONFIG.knowHow.enabled,
        },
        players,
        eventId,
        eventDeck,
        turn: { ...emptyTurn(), phase: PHASES.EVENT },
        stats: { startedAt: Date.now(), turns: 0, answers: [], travel: [], events: [eventId] },
      };
      return log(next, `The ${mode.label} begins. ${players[0].name} was drawn to go first.`, 'event', null);
    }

    case 'ACK_EVENT':
      return setTurn(s, { phase: PHASES.TRAVEL });

    case 'SELECT_MODE':
      return setTurn(s, { mode: a.mode, dest: null });

    case 'SELECT_DEST':
      return setTurn(s, { dest: a.dest });

    case 'CLEAR_DEST':
      return setTurn(s, { dest: null });

    case 'BEGIN_TRAVEL': {
      const p = current(s);
      const r = getReachable(p.location, s.turn.mode, s.eventId)[s.turn.dest];
      if (!r) return s;
      const failed = a.roll != null && rollFails(s.turn.mode, s.eventId, a.roll);
      const next = setTurn(s, { path: r.path, roll: a.roll, failed });
      if (failed) return setTurn(log(next, `${p.name} rolled a ${a.roll}. ${effectiveTransport(s.turn.mode, s.eventId).failText}`, 'bad'), { phase: PHASES.ROLLED });
      return setTurn(next, { phase: PHASES.MOVING });
    }

    case 'REROLL': {
      const cost = GAME_CONFIG.knowHow.costs.reroll;
      if (current(s).knowHow < cost) return s;
      let next = updateCurrent(s, (p) => ({ ...p, knowHow: p.knowHow - cost }));
      const failed = rollFails(s.turn.mode, s.eventId, a.roll);
      next = log(next, `${current(s).name} spent Know-How to reroll: ${a.roll}.`, failed ? 'bad' : 'good');
      return setTurn(next, { roll: a.roll, failed, phase: failed ? PHASES.ROLLED : PHASES.MOVING });
    }

    case 'ACCEPT_FAILURE': {
      if (effectiveTransport(s.turn.mode).lineBased) {
        const next = {
          ...s,
          stats: { ...s.stats, travel: [...s.stats.travel, { round: s.round, playerId: current(s).id, mode: s.turn.mode, from: current(s).location, to: current(s).location, roll: s.turn.roll, failed: true }] },
        };
        return setTurn(next, { phase: PHASES.DONE, path: null });
      }
      // Bike: flat tire, only the first space.
      return setTurn(s, { path: s.turn.path.slice(0, 2), phase: PHASES.MOVING });
    }

    case 'FINISH_MOVE':
      return s.turn.phase === PHASES.MOVING ? arrive(s) : s;

    case 'LINGER': {
      const p = current(s);
      const ability = LOCATIONS[p.location]?.specialAbility;
      let next = s;
      if (ability?.linger && !p.usedAbilities.includes(ability.id)) {
        const { category, amount } = ability.linger;
        next = updateCurrent(s, (pl) => ({ ...applyAwards(pl, [{ category, amount }]), usedAbilities: [...pl.usedAbilities, ability.id] }));
        next = log(next, `${p.name} lingered: ${ability.label}. +${amount} ${CATEGORIES[category].label}.`, 'good');
      } else if (s.config.knowHowEnabled) {
        next = updateCurrent(s, (pl) => ({ ...pl, knowHow: clampKnowHow(pl.knowHow + GAME_CONFIG.linger.knowHow) }));
        next = log(next, `${p.name} lingered in ${nodeName(p.location)} talking with locals. +1 Know-How.`, 'good');
      } else {
        next = log(next, `${p.name} stayed put.`);
      }
      return setTurn(next, { phase: PHASES.DONE });
    }

    case 'DRAW_CARD': {
      if (!a.cardId) return s;
      return setTurn({ ...s, usedCards: [...s.usedCards, a.cardId] }, {
        phase: PHASES.CHALLENGE, cardId: a.cardId, hidden: [], result: null,
      });
    }

    case 'USE_HINT': {
      const cost = GAME_CONFIG.knowHow.costs.hint;
      if (current(s).knowHow < cost || a.removeIndex == null) return s;
      const next = updateCurrent(s, (p) => ({ ...p, knowHow: p.knowHow - cost }));
      return setTurn(log(next, `${current(s).name} used Island Know-How for a hint.`), { hidden: [...s.turn.hidden, a.removeIndex] });
    }

    case 'ANSWER': {
      const card = getCard(s.turn.cardId);
      const p = current(s);
      const res = resolveAnswer({ card, answerIndex: a.index, player: p, eventId: s.eventId });
      let next = updateCurrent(s, (pl) => {
        let u = applyAwards(pl, res.awards);
        u = {
          ...u,
          knowHow: s.config.knowHowEnabled ? clampKnowHow(u.knowHow + res.knowHow) : u.knowHow,
          secrets: res.secretId ? [...u.secrets, res.secretId] : u.secrets,
          challenges: { attempted: u.challenges.attempted + 1, correct: u.challenges.correct + (res.correct ? 1 : 0) },
        };
        return u;
      });
      next = {
        ...next,
        stats: {
          ...next.stats,
          answers: [
            ...next.stats.answers,
            {
              round: s.round, playerId: p.id, cardId: card.id, category: card.category, deck: card.deck,
              difficulty: card.difficulty, location: card.location, secret: Boolean(card.secret),
              correct: res.correct, usedHint: s.turn.hidden.length > 0,
            },
          ],
        },
      };
      const gained = awardText(res.awards);
      if (res.secretId) next = log(next, `${p.name} earned a LOCAL SECRET at ${LOCATIONS[card.location].name}! ${gained}.`, 'secret');
      else {
        const what = `a ${GAME_CONFIG.difficulty[card.difficulty].label} ${DECKS[card.deck].label} card at ${LOCATIONS[card.location].shortName}`;
        next = log(next, `${p.name} ${res.correct ? 'answered' : 'missed'} ${what}${gained ? ` (${gained})` : ''}.`, res.correct ? 'good' : 'bad');
      }
      return setTurn(next, { phase: PHASES.RESOLVED, result: { ...res, answerIndex: a.index } });
    }

    case 'SKIP_EXPERIENCE':
    case 'CONTINUE':
      return setTurn(s, { phase: PHASES.DONE });

    case 'END_TURN': {
      const nextIdx = (s.currentIdx + 1) % s.players.length;
      const newRound = nextIdx === 0;
      let next = { ...s, currentIdx: nextIdx, turn: emptyTurn(), stats: { ...s.stats, turns: s.stats.turns + 1 } };
      if (!newRound) return setTurn(next, { phase: PHASES.TRAVEL });
      if (s.round >= s.config.rounds) return finishGame(next);
      next = { ...next, round: s.round + 1, eventId: a.eventId, eventDeck: a.eventDeck, stats: { ...next.stats, events: [...next.stats.events, a.eventId] } };
      next = log(next, `Round ${next.round}: ${getEvent(a.eventId).name}.`, 'event', null);
      return setTurn(next, { phase: PHASES.EVENT });
    }

    // ─────────── Debug / playtest tools ───────────
    case 'DEBUG_CRED':
      return updatePlayer(s, a.playerId, (p) => applyAwards(p, [{ category: a.category, amount: a.delta }]));
    case 'DEBUG_KNOWHOW':
      return updatePlayer(s, a.playerId, (p) => ({ ...p, knowHow: clampKnowHow(p.knowHow + a.delta) }));
    case 'DEBUG_SECRET':
      return updatePlayer(s, a.playerId, (p) => ({ ...p, secrets: [...p.secrets, `debug-secret-${p.secrets.length + 1}`] }));
    case 'DEBUG_TELEPORT': {
      const next = updatePlayer(s, a.playerId, (p) => ({
        ...p, location: a.nodeId,
        visited: isLocation(a.nodeId) && !p.visited.includes(a.nodeId) ? [...p.visited, a.nodeId] : p.visited,
      }));
      return log(next, `[debug] Teleported to ${nodeName(a.nodeId)}.`, 'neutral', a.playerId);
    }
    case 'DEBUG_EVENT':
      return log({ ...s, eventId: a.eventId, turn: { ...s.turn, phase: PHASES.EVENT } }, `[debug] Event: ${getEvent(a.eventId).name}.`, 'event', null);
    case 'DEBUG_FORCE_CARD':
      return setTurn({ ...s, usedCards: [...s.usedCards, a.cardId] }, { phase: PHASES.CHALLENGE, cardId: a.cardId, hidden: [], result: null });
    case 'END_GAME':
      return finishGame(s);
    case 'LOAD':
      return a.state;
    case 'RESET':
      return initialState;
    default:
      return s;
  }
}
