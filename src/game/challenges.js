import { CARDS, CARDS_BY_ID } from '../data/cards.js';
import { LOCATIONS } from '../data/locations.js';
import { GAME_CONFIG } from '../config/gameConfig.js';
import { CATEGORIES, CATEGORY_IDS, DIFFICULTY_IDS } from './constants.js';
import { eventBonuses } from './events.js';
import { pickOne } from '../utils/random.js';

export const getCard = (id) => CARDS_BY_ID[id];

const unused = (used) => CARDS.filter((c) => !used.includes(c.id));

// What a player can attempt at a destination: per category, remaining cards by difficulty.
export function availableExperiences(locationId, usedCards) {
  const pool = unused(usedCards).filter((c) => c.location === locationId && !c.secret);
  return CATEGORY_IDS.map((category) => {
    const counts = Object.fromEntries(
      DIFFICULTY_IDS.map((d) => [d, pool.filter((c) => c.category === category && c.difficulty === d).length]),
    );
    const decks = [...new Set(pool.filter((c) => c.category === category).map((c) => c.deck))];
    return { category, counts, decks, total: Object.values(counts).reduce((a, b) => a + b, 0) };
  }).filter((e) => e.total > 0);
}

export function drawCardId(locationId, category, difficulty, usedCards) {
  const pool = unused(usedCards).filter(
    (c) => c.location === locationId && !c.secret && c.category === category && c.difficulty === difficulty,
  );
  return pickOne(pool)?.id ?? null;
}

export function secretStatus(player, locationId, usedCards) {
  const secret = LOCATIONS[locationId]?.secret;
  if (!secret) return null;
  if (player.secrets.includes(secret.id)) return { secret, available: false, reason: 'You already hold this Local Secret.' };
  const cardsLeft = unused(usedCards).filter((c) => c.location === locationId && c.secret).length;
  if (!cardsLeft) return { secret, available: false, reason: 'No secret cards remain here.' };
  const missing = Object.entries(secret.requires || {}).filter(([cat, n]) => (player.cred[cat] || 0) < n);
  if (missing.length) {
    const needs = missing.map(([c, n]) => `${n} ${CATEGORIES[c].label}`).join(', ');
    return { secret, available: false, reason: `Requires ${needs}.`, missing };
  }
  return { secret, available: true, cardsLeft };
}

export function drawSecretCardId(locationId, usedCards) {
  return pickOne(unused(usedCards).filter((c) => c.location === locationId && c.secret))?.id ?? null;
}

// Pure resolution: returns the changes to apply; the reducer applies them.
export function resolveAnswer({ card, answerIndex, player, eventId }) {
  const correct = answerIndex === card.correctAnswer;
  const location = LOCATIONS[card.location];
  const awards = [];
  let knowHow = 0;
  let secretId = null;

  if (card.secret) {
    const s = location.secret;
    if (correct) {
      awards.push({ category: s.reward.category, amount: s.reward.amount, reason: s.name });
      knowHow = s.reward.knowHow || 0;
      secretId = s.id;
    }
  } else {
    const diff = GAME_CONFIG.difficulty[card.difficulty];
    if (correct) {
      awards.push({ category: card.category, amount: diff.reward, reason: `${diff.label} card` });
      knowHow = diff.knowHow;
      for (const b of eventBonuses(eventId, location, card)) {
        awards.push({ category: b.category, amount: b.amount, reason: 'Island Event bonus' });
      }
    } else if (diff.penalty) {
      const lost = Math.min(diff.penalty, player.cred[card.category] || 0);
      if (lost) awards.push({ category: card.category, amount: -lost, reason: 'Local card missed' });
    }
  }
  return { correct, awards, knowHow, secretId };
}
