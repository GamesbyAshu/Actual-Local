import { useEffect, useState } from 'react';
import { GAME_CONFIG } from '../config/gameConfig.js';
import { LOCATIONS } from '../data/locations.js';
import { CATEGORIES, DECKS, PHASES } from '../game/constants.js';
import { getCard } from '../game/challenges.js';
import { CATEGORY_ICONS, KeyIcon, KnotIcon } from './Icons.jsx';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export default function ChallengeCard({ state, actions }) {
  const { turn } = state;
  const card = getCard(turn.cardId);
  const player = state.players[state.currentIdx];
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
    const t = setTimeout(() => setFlipped(true), 900);
    return () => clearTimeout(t);
  }, [turn.cardId]);

  if (!card) return null;
  const Icon = card.secret ? KeyIcon : CATEGORY_ICONS[card.category];
  const diff = GAME_CONFIG.difficulty[card.difficulty];
  const resolved = turn.phase === PHASES.RESOLVED;
  const result = turn.result;
  const canHint =
    state.config.knowHowEnabled &&
    !resolved &&
    player.knowHow >= GAME_CONFIG.knowHow.costs.hint &&
    card.choices.length - turn.hidden.length > 2;

  return (
    <div className="overlay">
      <div className={`flip ${flipped ? 'is-flipped' : ''}`}>
        <div className="flip__inner">
          {/* Card back */}
          <div className={`card card--back card--${card.secret ? 'secret' : card.category}`}>
            <div className="card-back__frame">
              <Icon size={64} strokeWidth={1} />
              <div className="card-back__deck">{DECKS[card.deck].label}</div>
              <div className="card-back__loc">{LOCATIONS[card.location].name}</div>
              <div className="card-back__diff">{diff.label}</div>
            </div>
          </div>

          {/* Card face */}
          <div className={`card card--front card--${card.secret ? 'secret' : card.category}`}>
            <div className="card__head">
              <span className="card__deck"><Icon size={16} /> {DECKS[card.deck].label}</span>
              <span className="card__meta">
                {LOCATIONS[card.location].shortName} · {card.secret ? 'Local Secret' : `${diff.label} · +${diff.reward} ${CATEGORIES[card.category].label}`}
              </span>
            </div>
            <p className="card__question">{card.question}</p>
            <ol className="choices">
              {card.choices.map((c, i) => {
                const hidden = turn.hidden.includes(i);
                let cls = '';
                if (resolved) {
                  if (i === card.correctAnswer) cls = 'is-correct';
                  else if (i === result.answerIndex) cls = 'is-wrong';
                  else cls = 'is-dim';
                }
                return (
                  <li key={i}>
                    <button className={`choice ${cls} ${hidden ? 'is-hidden' : ''}`} disabled={resolved || hidden} onClick={() => actions.answer(i)}>
                      <span className="choice__letter">{LETTERS[i]}</span>
                      <span>{c}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {!resolved && canHint && (
              <button className="btn btn--ghost btn--small hint-btn" onClick={actions.useHint}>
                <KnotIcon size={16} /> Spend 1 Know-How: remove a wrong answer
              </button>
            )}

            {resolved && (
              <div className={`verdict ${result.correct ? 'is-good' : 'is-bad'}`}>
                <div className="verdict__title">
                  {result.secretId ? 'A Local Secret is yours.' : result.correct ? 'Spoken like a local.' : 'Not quite.'}
                </div>
                <p className="verdict__explain">{card.explanation}</p>
                <div className="awards">
                  {result.awards.map((a, i) => {
                    const AIcon = CATEGORY_ICONS[a.category];
                    return (
                      <span key={i} className={`award ${a.amount < 0 ? 'is-loss' : ''}`} style={{ animationDelay: `${i * 160}ms` }}>
                        <AIcon size={16} /> {a.amount > 0 ? '+' : ''}{a.amount} {CATEGORIES[a.category].label}
                        <small>{a.reason}</small>
                      </span>
                    );
                  })}
                  {result.knowHow > 0 && state.config.knowHowEnabled && (
                    <span className="award" style={{ animationDelay: `${result.awards.length * 160}ms` }}>
                      <KnotIcon size={16} /> +{result.knowHow} Know-How
                    </span>
                  )}
                  {result.secretId && (
                    <span className="award award--secret" style={{ animationDelay: '400ms' }}>
                      <KeyIcon size={16} /> Local Secret token
                    </span>
                  )}
                </div>
                <div className="source">
                  Source: {card.source?.url ? <a href={card.source.url} target="_blank" rel="noreferrer">{card.source.label}</a> : card.source?.label}
                  <span className={`badge badge--${card.verification}`}>{card.verification}</span>
                </div>
                <button className="btn btn--primary" onClick={actions.continueTurn}>Continue</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
