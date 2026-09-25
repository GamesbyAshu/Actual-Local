import { EVENTS, EVENTS_BY_ID } from '../data/events.js';
import { shuffle } from '../utils/random.js';

export const getEvent = (id) => (id ? EVENTS_BY_ID[id] : null);

export function buildEventDeck(season, seasonsEnabled) {
  const pool = seasonsEnabled ? EVENTS.filter((e) => e.seasons.includes(season)) : EVENTS;
  return shuffle(pool.map((e) => e.id));
}

// Turn over the next event; reshuffle when the deck runs out.
export function drawEvent(deck, season, seasonsEnabled) {
  const d = deck.length ? deck : buildEventDeck(season, seasonsEnabled);
  return { eventId: d[0], deck: d.slice(1) };
}

// Extra Local Cred for a correct answer, from the active event.
export function eventBonuses(eventId, location, card) {
  const ev = getEvent(eventId);
  if (!ev?.effects?.bonuses || !location) return [];
  const tags = [location.id, ...(location.tags || [])];
  return ev.effects.bonuses.filter(
    (b) => tags.includes(b.tag) && (!b.whenCategory || b.whenCategory === card.category),
  );
}
