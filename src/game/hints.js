// Strategy tips based on the player's position.
// Physical equivalent: the "Island Tips" panel printed on each player board.
import { CARDS } from '../data/cards.js';
import { LOCATIONS } from '../data/locations.js';
import { RANK_REQUIREMENTS } from '../data/ranks.js';
import { GAME_CONFIG } from '../config/gameConfig.js';
import { CATEGORIES, CATEGORY_IDS, PHASES } from './constants.js';
import { computeRank } from './scoring.js';

// Destinations that still hold unused cards for a category.
function placesOffering(category, usedCards) {
  const ids = new Set(
    CARDS.filter((c) => !c.secret && c.category === category && !usedCards.includes(c.id)).map((c) => c.location),
  );
  return [...ids].map((id) => LOCATIONS[id].shortName);
}

export function strategyHints(state) {
  const p = state.players[state.currentIdx];
  const { phase } = state.turn;
  const tips = [];
  const roundsLeft = state.config.rounds - state.round;
  const top = RANK_REQUIREMENTS[state.config.rankSet].acktualLocal;

  if (phase === PHASES.TRAVEL) {
    // Weakest category, and where to find it.
    const weakest = [...CATEGORY_IDS].sort((a, b) => p.cred[a] - p.cred[b])[0];
    if (p.cred[weakest] < (top.each || 0)) {
      const where = placesOffering(weakest, state.usedCards);
      if (where.length) tips.push(`You need ${CATEGORIES[weakest].label}. Try ${where.slice(0, 4).join(', ')}.`);
    }

    // Local Secret progress.
    for (const loc of Object.values(LOCATIONS).filter((l) => l.secret)) {
      if (p.secrets.includes(loc.secret.id)) continue;
      const missing = Object.entries(loc.secret.requires).filter(([c, n]) => p.cred[c] < n);
      tips.push(
        missing.length
          ? `${loc.shortName}'s Local Secret needs ${missing.map(([c, n]) => `${n} ${CATEGORIES[c].label}`).join(', ')}. You have ${missing.map(([c]) => p.cred[c]).join(', ')}.`
          : `You qualify for the Local Secret at ${loc.shortName}. Get there!`,
      );
    }

    // Exploration.
    if (top.visited && p.visited.length < top.visited) {
      const unvisited = Object.values(LOCATIONS).filter((l) => !p.visited.includes(l.id)).map((l) => l.shortName);
      tips.push(`Places you haven't visited yet: ${unvisited.join(', ')}.`);
    }

    if (roundsLeft <= 1 && GAME_CONFIG.lastBoat.enabled && p.location !== GAME_CONFIG.lastBoat.location) {
      tips.push('Final rounds: be back in Town at the end to make the Last Boat (+1 Island Life).');
    }
    if (p.knowHow >= GAME_CONFIG.knowHow.max) tips.push('Your Know-How is full. Lingering won’t add more, so spend some.');
  }

  if (phase === PHASES.ARRIVED) {
    const { next } = computeRank(p, state.config.rankSet);
    if (next?.missing.length) tips.push(`Next status (${next.rank.label}) needs: ${next.missing.map((m) => m.label).join(', ')}.`);
    if (p.knowHow === 0 && state.config.knowHowEnabled) tips.push('No Know-How left. A Local card answered correctly earns one.');
  }

  return tips.slice(0, 3);
}
