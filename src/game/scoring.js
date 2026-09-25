import { RANKS, RANK_REQUIREMENTS, JOURNEY_TEXT } from '../data/ranks.js';
import { CATEGORIES, CATEGORY_IDS } from './constants.js';

export const totalCred = (p) => CATEGORY_IDS.reduce((s, c) => s + (p.cred[c] || 0), 0);

function measures(p) {
  return {
    total: totalCred(p),
    each: Math.min(...CATEGORY_IDS.map((c) => p.cred[c] || 0)),
    secrets: p.secrets.length,
    visited: p.visited.length,
  };
}

const REQ_LABEL = {
  total: (n) => `${n} total Local Cred`,
  each: (n) => `${n} in every category`,
  secrets: (n) => `${n} Local Secret${n > 1 ? 's' : ''}`,
  visited: (n) => `${n} destinations visited`,
};

function missingFor(m, req) {
  return Object.entries(req)
    .filter(([k, n]) => m[k] < n)
    .map(([k, n]) => ({ key: k, need: n, have: m[k], label: REQ_LABEL[k](n) }));
}

// Highest rank whose requirements are ALL met (ranks are cumulative).
export function computeRank(player, rankSet) {
  const reqs = RANK_REQUIREMENTS[rankSet];
  const m = measures(player);
  let index = 0;
  RANKS.forEach((r, i) => {
    if (i === index + 1 && missingFor(m, reqs[r.id]).length === 0) index = i;
  });
  const next = RANKS[index + 1];
  return {
    rank: RANKS[index],
    index,
    next: next ? { rank: next, missing: missingFor(m, reqs[next.id]) } : null,
  };
}

export function strongestAndWeakest(player) {
  const sorted = [...CATEGORY_IDS].sort((a, b) => (player.cred[b] || 0) - (player.cred[a] || 0));
  return { strongest: sorted[0], weakest: sorted[sorted.length - 1] };
}

export function journeyText(player, rankSet) {
  const { rank, index } = computeRank(player, rankSet);
  const { strongest, weakest } = strongestAndWeakest(player);
  const parts = [JOURNEY_TEXT.verdict[rank.id]];
  if ((player.cred[strongest] || 0) > 0) parts.push(JOURNEY_TEXT.strength[strongest]);
  if (index < 5 && player.cred[weakest] < player.cred[strongest]) parts.push(JOURNEY_TEXT.gap[weakest]);
  return { text: parts.join(' '), strongest: CATEGORIES[strongest].label, weakest: CATEGORIES[weakest].label };
}

// Competitive order: status first, then Local Cred, secrets, exploration.
export function standings(players, rankSet) {
  return [...players]
    .map((p) => ({ player: p, rank: computeRank(p, rankSet), total: totalCred(p) }))
    .sort(
      (a, b) =>
        b.rank.index - a.rank.index ||
        b.total - a.total ||
        b.player.secrets.length - a.player.secrets.length ||
        b.player.visited.length - a.player.visited.length,
    );
}
