// Headless playtest: bots play full games through the real reducer.
// Usage: node scripts/simulate.mjs [games=200] [mode=quick] [accuracy=0.65]
import { reducer } from '../src/game/reducer.js';
import { initialState } from '../src/game/state.js';
import { PHASES } from '../src/game/constants.js';
import { getReachable, effectiveTransport } from '../src/game/movement.js';
import { availableExperiences, drawCardId, drawSecretCardId, secretStatus, getCard } from '../src/game/challenges.js';
import { buildEventDeck, drawEvent } from '../src/game/events.js';
import { computeRank, totalCred } from '../src/game/scoring.js';
import { isLocation } from '../src/game/board.js';
import { rollD6, shuffle, pickOne } from '../src/utils/random.js';

const [games = 200, mode = 'quick', acc = 0.65] = process.argv.slice(2);
const ACC = { easy: +acc + 0.15, medium: +acc, local: +acc - 0.2 };
const tally = {}; const modes = {}; let answered = 0, secretsWon = 0, cardsExhausted = 0;

function play(nPlayers) {
  const { eventId, deck } = drawEvent(buildEventDeck('summer', false), 'summer', false);
  let s = reducer(initialState, { type: 'START_GAME', setup: { mode, players: Array.from({ length: nPlayers }, (_, i) => ({ name: `Bot${i}`, token: ['lighthouse','basket','scallop','sailboat','whale','rose'][i] })) }, turnOrder: shuffle([...Array(nPlayers).keys()]), eventId, eventDeck: deck });
  let guard = 0;
  while (s.screen === 'game' && guard++ < 5000) {
    const p = s.players[s.currentIdx];
    switch (s.turn.phase) {
      case PHASES.EVENT: s = reducer(s, { type: 'ACK_EVENT' }); break;
      case PHASES.TRAVEL: {
        // Strategy: prefer unvisited destinations, then any location.
        const options = ['walk', 'bike', 'shuttle'].flatMap((m) => Object.keys(getReachable(p.location, m, s.eventId)).map((d) => ({ m, d })));
        const score = ({ d, m }) => (isLocation(d) ? 2 : 0) + (isLocation(d) && !p.visited.includes(d) ? 3 : 0) + (m === 'walk' ? 0.3 : 0) + Math.random();
        const best = options.sort((a, b) => score(b) - score(a))[0];
        if (!best || Math.random() < 0.05) { s = reducer(s, { type: 'LINGER' }); break; }
        s = reducer(s, { type: 'SELECT_MODE', mode: best.m });
        s = reducer(s, { type: 'SELECT_DEST', dest: best.d });
        modes[best.m] = (modes[best.m] || 0) + 1;
        const t = effectiveTransport(best.m, s.eventId);
        s = reducer(s, { type: 'BEGIN_TRAVEL', roll: t.failOn?.length ? rollD6() : null });
        break;
      }
      case PHASES.ROLLED:
        s = p.knowHow > 1 ? reducer(s, { type: 'REROLL', roll: rollD6() }) : reducer(s, { type: 'ACCEPT_FAILURE' });
        break;
      case PHASES.MOVING: s = reducer(s, { type: 'FINISH_MOVE' }); break;
      case PHASES.ARRIVED: {
        const sec = secretStatus(p, p.location, s.usedCards);
        if (sec?.available) { s = reducer(s, { type: 'DRAW_CARD', cardId: drawSecretCardId(p.location, s.usedCards) }); break; }
        const exps = availableExperiences(p.location, s.usedCards);
        if (!exps.length) { cardsExhausted++; s = reducer(s, { type: 'SKIP_EXPERIENCE' }); break; }
        // Strategy: weakest category available, harder when confident.
        const e = exps.sort((a, b) => (p.cred[a.category] - p.cred[b.category]) || Math.random() - .5)[0];
        const diffs = ['local', 'medium', 'easy'].filter((d) => e.counts[d]);
        const d = Math.random() < 0.5 ? diffs[0] : pickOne(diffs);
        s = reducer(s, { type: 'DRAW_CARD', cardId: drawCardId(p.location, e.category, d, s.usedCards) });
        break;
      }
      case PHASES.CHALLENGE: {
        const c = getCard(s.turn.cardId);
        const right = Math.random() < ACC[c.difficulty];
        const idx = right ? c.correctAnswer : (c.correctAnswer + 1) % c.choices.length;
        s = reducer(s, { type: 'ANSWER', index: idx }); answered++;
        if (s.turn.result.secretId) secretsWon++;
        break;
      }
      case PHASES.RESOLVED: s = reducer(s, { type: 'CONTINUE' }); break;
      case PHASES.DONE: {
        const wraps = s.currentIdx === s.players.length - 1;
        if (wraps && s.round < s.config.rounds) { const ev = drawEvent(s.eventDeck, 'summer', false); s = reducer(s, { type: 'END_TURN', eventId: ev.eventId, eventDeck: ev.deck }); }
        else s = reducer(s, { type: 'END_TURN' });
        break;
      }
      default: throw new Error('stuck in phase ' + s.turn.phase);
    }
  }
  if (s.screen !== 'results') throw new Error('game did not finish');
  return s;
}

const totals = [];
for (let g = 0; g < +games; g++) {
  const s = play(2 + (g % 3));
  for (const p of s.players) {
    const r = computeRank(p, s.config.rankSet).rank.label;
    tally[r] = (tally[r] || 0) + 1;
    totals.push(totalCred(p));
  }
}
const avg = totals.reduce((a, b) => a + b, 0) / totals.length;
console.log(`${games} ${mode} games, answer accuracy ~${acc}`);
console.log('Final statuses:', tally);
console.log('Avg total Local Cred:', avg.toFixed(1), ' max:', Math.max(...totals));
console.log('Travel choices:', modes, ' answers:', answered, ' secrets won:', secretsWon, ' arrivals with no cards left:', cardsExhausted);
