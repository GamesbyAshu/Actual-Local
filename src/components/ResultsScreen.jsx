import { useMemo } from 'react';
import { RANKS } from '../data/ranks.js';
import { getEvent } from '../game/events.js';
import { CATEGORIES, CATEGORY_IDS } from '../game/constants.js';
import { journeyText, standings } from '../game/scoring.js';
import { buildSessionSummary, downloadJson, loadSessions } from '../game/analytics.js';
import { CATEGORY_ICONS, KeyIcon } from './Icons.jsx';
import { PawnBadge } from './PlayerPanel.jsx';

function JourneyCard({ entry, rankSet, place, delay }) {
  const { player: p, rank, total } = entry;
  const j = journeyText(p, rankSet);
  return (
    <article className={`journey ${rank.index === 5 ? 'journey--local' : ''}`} style={{ animationDelay: `${delay}ms` }}>
      <div className="journey__place">{place === 0 ? 'Overall winner' : `No. ${place + 1}`}</div>
      <header className="journey__head">
        <PawnBadge token={p.token} size={44} />
        <h2>{p.name}’s Nantucket Journey</h2>
      </header>
      <dl className="journey__stats">
        <div><dt>Locations visited</dt><dd>{p.visited.length}</dd></div>
        {CATEGORY_IDS.map((c) => {
          const Icon = CATEGORY_ICONS[c];
          return <div key={c}><dt><Icon size={15} /> {CATEGORIES[c].label}</dt><dd>{p.cred[c]}</dd></div>;
        })}
        <div><dt><KeyIcon size={15} /> Local Secrets</dt><dd>{p.secrets.length}</dd></div>
        <div><dt>Challenges completed</dt><dd>{p.challenges.correct}<small> / {p.challenges.attempted}</small></dd></div>
        <div className="journey__total"><dt>Total Local Cred</dt><dd>{total}</dd></div>
      </dl>
      <div className="journey__status">
        <div className="journey__status-label">Final status</div>
        <div className="journey__status-value" style={{ animationDelay: `${delay + 500}ms` }}>{rank.rank.label}</div>
        <ol className="ladder ladder--wide">
          {RANKS.map((r, i) => <li key={r.id} className={`${i <= rank.index ? 'is-reached' : ''} ${i === rank.index ? 'is-current' : ''}`} title={r.label} />)}
        </ol>
      </div>
      <p className="journey__text">{j.text}</p>
    </article>
  );
}

function PlaytestSummary({ summary }) {
  const a = summary.answers;
  return (
    <section className="playtest">
      <h3>Playtest summary</h3>
      <div className="playtest__grid">
        <div><span>Duration</span><strong>{summary.durationMinutes ?? '–'} min</strong></div>
        <div><span>Rounds · turns</span><strong>{summary.rounds} · {summary.turns}</strong></div>
        <div><span>Cards answered</span><strong>{a.total} <small>({a.correctPct ?? '–'}% correct)</small></strong></div>
        <div><span>Secrets</span><strong>{a.secretSuccesses} / {a.secretAttempts} attempts</strong></div>
        {Object.entries(a.byDifficulty).map(([d, v]) => (
          <div key={d}><span>{d}</span><strong>{v.count} <small>({v.correctPct ?? '–'}%)</small></strong></div>
        ))}
        {Object.entries(summary.travel.byMode).map(([m, v]) => (
          <div key={m}><span>{m} trips</span><strong>{v.trips} <small>({v.failures} failed)</small></strong></div>
        ))}
        <div><span>Events</span><strong><small>{summary.eventsDrawn.map((id) => getEvent(id)?.name).join(' · ')}</small></strong></div>
      </div>
    </section>
  );
}

export default function ResultsScreen({ state, onNewGame }) {
  const table = standings(state.players, state.config.rankSet);
  const summary = useMemo(() => buildSessionSummary(state), [state]);
  const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');

  return (
    <div className="results">
      <header className="results__head">
        <div className="setup__eyebrow">The last boat has left Steamboat Wharf</div>
        <h1 className="results__title">How local are you, really?</h1>
      </header>
      <div className="results__grid">
        {table.map((entry, i) => (
          <JourneyCard key={entry.player.id} entry={entry} rankSet={state.config.rankSet} place={i} delay={i * 250} />
        ))}
      </div>
      <PlaytestSummary summary={summary} />
      <div className="btn-row btn-row--center">
        <button className="btn" onClick={() => downloadJson(summary, `acktual-local-playtest-${stamp}.json`)}>Export this session (JSON)</button>
        <button className="btn btn--ghost" onClick={() => downloadJson(loadSessions(), `acktual-local-all-sessions-${stamp}.json`)}>Export all saved sessions</button>
        <button className="btn btn--primary" onClick={onNewGame}>New game</button>
      </div>
    </div>
  );
}
