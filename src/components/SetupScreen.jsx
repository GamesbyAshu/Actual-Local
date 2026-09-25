import { useState } from 'react';
import { GAME_CONFIG } from '../config/gameConfig.js';
import { TOKENS } from '../data/tokens.js';
import { TOKEN_ICONS, CATEGORY_ICONS, KeyIcon } from './Icons.jsx';
import { CATEGORIES, CATEGORY_IDS } from '../game/constants.js';

const DEFAULT_NAMES = ['Player One', 'Player Two', 'Player Three', 'Player Four', 'Player Five', 'Player Six'];

export default function SetupScreen({ onStart, onRules }) {
  const [players, setPlayers] = useState([
    { name: '', token: TOKENS[0].id },
    { name: '', token: TOKENS[3].id },
  ]);
  const [mode, setMode] = useState('quick');
  const { min, max } = GAME_CONFIG.players;

  const update = (i, patch) => setPlayers((ps) => ps.map((p, j) => (j === i ? { ...p, ...patch } : p)));
  const taken = (tokenId, i) => players.some((p, j) => j !== i && p.token === tokenId);
  const addPlayer = () => {
    const free = TOKENS.find((t) => !players.some((p) => p.token === t.id));
    setPlayers((ps) => [...ps, { name: '', token: free.id }]);
  };

  const start = () =>
    onStart({
      mode,
      players: players.map((p, i) => ({ name: p.name.trim() || DEFAULT_NAMES[i], token: p.token })),
    });

  return (
    <div className="setup">
      <div className="setup__hero">
        <div className="setup__eyebrow">A Nantucket parlour game · prototype</div>
        <h1 className="setup__title">
          <span>Are you an</span>
          Acktual Local?
        </h1>
        <p className="setup__lede">How well do you really know Nantucket?</p>
        <div className="setup__rules">
          <p>
            Travel the island by foot, bike and the Wave. Every destination has its own experiences: lighthouse history
            at Sankaty, surf and safety at Cisco, sunset rituals at Madaket.
          </p>
          <p>
            Earn Local Cred in four areas, and win Local Secrets at the hardest places to reach. You only become an Acktual
            Local if your knowledge covers the whole island, not just one corner of it.
          </p>
          <ul className="setup__cats">
            {CATEGORY_IDS.map((c) => {
              const Icon = CATEGORY_ICONS[c];
              return <li key={c}><Icon size={20} /> <strong>{CATEGORIES[c].label}</strong> <span>{CATEGORIES[c].blurb}</span></li>;
            })}
            <li><KeyIcon size={20} /> <strong>Local Secrets</strong> <span>Rare tokens won by hard challenges at special destinations.</span></li>
          </ul>
          <button className="btn btn--ghost setup__rules-btn" onClick={onRules}>Read the full rules</button>
        </div>
      </div>

      <div className="setup__form">
        <h2 className="setup__h2">Who’s coming over on the ferry?</h2>
        <ol className="setup__players">
          {players.map((p, i) => (
            <li key={i} className="setup__player">
              <span className="setup__num">{i + 1}</span>
              <input
                className="input"
                placeholder={DEFAULT_NAMES[i]}
                value={p.name}
                maxLength={18}
                onChange={(e) => update(i, { name: e.target.value })}
              />
              <div className="token-pick" role="radiogroup" aria-label="Choose a pawn">
                {TOKENS.map((t) => {
                  const Icon = TOKEN_ICONS[t.id];
                  const isTaken = taken(t.id, i);
                  return (
                    <button
                      key={t.id}
                      className={`token ${p.token === t.id ? 'is-selected' : ''}`}
                      style={{ '--token': t.color }}
                      disabled={isTaken}
                      title={t.label}
                      onClick={() => update(i, { token: t.id })}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </button>
                  );
                })}
              </div>
              {players.length > min && (
                <button className="icon-btn" onClick={() => setPlayers((ps) => ps.filter((_, j) => j !== i))} aria-label="Remove player">×</button>
              )}
            </li>
          ))}
        </ol>
        {players.length < max && (
          <button className="btn btn--ghost btn--small" onClick={addPlayer}>+ Add a player</button>
        )}

        <h2 className="setup__h2">Length of stay</h2>
        <div className="mode-pick">
          {Object.values(GAME_CONFIG.modes).map((m) => (
            <button key={m.id} className={`mode-card ${mode === m.id ? 'is-selected' : ''}`} onClick={() => setMode(m.id)}>
              <span className="mode-card__name">{m.label}</span>
              <span className="mode-card__rounds">{m.rounds} rounds</span>
              <span className="mode-card__blurb">{m.blurb}</span>
            </button>
          ))}
        </div>
        <p className="hint">Season: Summer. (Seasons are a modular system arriving in a later phase.) Starting player is drawn at random.</p>

        <button className="btn btn--primary btn--large" onClick={start}>Board the ferry</button>
      </div>
    </div>
  );
}
