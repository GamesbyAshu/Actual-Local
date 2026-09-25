import { SEASONS, GAME_CONFIG } from '../config/gameConfig.js';
import { getEvent } from '../game/events.js';
import { PawnBadge } from './PlayerPanel.jsx';

export default function TopBar({ state, onShowEvent, onMenu, onRules }) {
  const { round, config, eventId, players, currentIdx } = state;
  const ev = getEvent(eventId);
  return (
    <header className="topbar">
      <div className="wordmark">
        <span className="wordmark__small">Are you an</span>
        <span className="wordmark__main">Acktual Local?</span>
      </div>

      <div className="topbar__facts">
        <div className="fact">
          <span className="fact__label">Round</span>
          <span className="fact__value">{round}<small> / {config.rounds}</small></span>
        </div>
        <div className="fact">
          <span className="fact__label">Season</span>
          <span className="fact__value">{SEASONS[config.season].label}</span>
        </div>
        <button className="fact fact--event" onClick={onShowEvent} title="View the Island Event">
          <span className="fact__label">Island Event · {ev?.kicker}</span>
          <span className="fact__value">{ev?.name}</span>
        </button>
        <div className="fact">
          <span className="fact__label">Game</span>
          <span className="fact__value">{GAME_CONFIG.modes[config.mode].label}</span>
        </div>
      </div>

      <div className="topbar__players">
        {players.map((p, i) => (
          <span key={p.id} className={`topbar__player ${i === currentIdx ? 'is-active' : ''}`} title={p.name}>
            <PawnBadge token={p.token} size={26} />
            <span>{p.name}</span>
          </span>
        ))}
        <button className="btn btn--ghost btn--small" onClick={onRules}>Rules</button>
        <button className="btn btn--ghost btn--small" onClick={onMenu}>Menu</button>
      </div>
    </header>
  );
}
