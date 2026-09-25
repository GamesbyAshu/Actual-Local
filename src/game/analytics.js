// Playtest session summary: the data used to balance the physical game.
import { CATEGORY_IDS } from './constants.js';
import { computeRank, standings, totalCred } from './scoring.js';

export function buildSessionSummary(state) {
  const { stats, players, config } = state;
  const table = standings(players, config.rankSet);
  const answers = stats.answers;
  const pct = (list) => (list.length ? Math.round((100 * list.filter((x) => x.correct).length) / list.length) : null);

  return {
    version: 1,
    mode: config.mode,
    season: config.season,
    startedAt: new Date(stats.startedAt).toISOString(),
    endedAt: stats.endedAt ? new Date(stats.endedAt).toISOString() : null,
    durationMinutes: stats.endedAt ? Math.round((stats.endedAt - stats.startedAt) / 6000) / 10 : null,
    rounds: stats.roundsPlayed ?? state.round,
    turns: stats.turns,
    winner: table[0]?.player.name,
    eventsDrawn: stats.events,
    players: players.map((p) => ({
      name: p.name,
      status: computeRank(p, config.rankSet).rank.label,
      totalCred: totalCred(p),
      cred: p.cred,
      secrets: p.secrets.length,
      knowHowLeft: p.knowHow,
      locationsVisited: p.visited,
      challenges: p.challenges,
    })),
    answers: {
      total: answers.length,
      correctPct: pct(answers),
      byDifficulty: Object.fromEntries(['easy', 'medium', 'local'].map((d) => {
        const l = answers.filter((x) => x.difficulty === d && !x.secret);
        return [d, { count: l.length, correctPct: pct(l) }];
      })),
      byCategory: Object.fromEntries(CATEGORY_IDS.map((c) => {
        const l = answers.filter((x) => x.category === c);
        return [c, { count: l.length, correctPct: pct(l) }];
      })),
      secretAttempts: answers.filter((x) => x.secret).length,
      secretSuccesses: answers.filter((x) => x.secret && x.correct).length,
      hintsUsed: answers.filter((x) => x.usedHint).length,
    },
    travel: {
      byMode: stats.travel.reduce((acc, t) => {
        acc[t.mode] ||= { trips: 0, failures: 0 };
        acc[t.mode].trips += 1;
        if (t.failed) acc[t.mode].failures += 1;
        return acc;
      }, {}),
    },
    cardsEncountered: answers.map((x) => ({ card: x.cardId, player: x.playerId, correct: x.correct })),
    raw: { answers, travel: stats.travel },
  };
}

const SESSIONS_KEY = 'acktual-local:sessions:v1';

export function archiveSession(summary) {
  try {
    const list = JSON.parse(localStorage.getItem(SESSIONS_KEY) || '[]');
    list.push(summary);
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(list.slice(-50)));
  } catch {
    /* storage unavailable: the in-page export still works */
  }
}

export function loadSessions() {
  try {
    return JSON.parse(localStorage.getItem(SESSIONS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
