import { useState } from 'react';
import { CATEGORIES, CATEGORY_IDS } from '../game/constants.js';
import { NODES } from '../game/board.js';
import { EVENTS } from '../data/events.js';
import { CARDS } from '../data/cards.js';

// Hidden playtest panel. Toggle with the ` (backtick) key.
export default function DebugPanel({ state, actions, onClose }) {
  const [pid, setPid] = useState(state.players[state.currentIdx]?.id);
  const [cardId, setCardId] = useState(CARDS[0].id);
  const p = state.players.find((x) => x.id === pid) || state.players[0];
  const d = actions.debug;

  return (
    <div className="debug">
      <div className="debug__head">
        <strong>Playtest tools</strong>
        <button className="icon-btn" onClick={onClose}>×</button>
      </div>

      <label>Player
        <select value={p.id} onChange={(e) => setPid(e.target.value)}>
          {state.players.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
      </label>

      <div className="debug__grid">
        {CATEGORY_IDS.map((c) => (
          <div key={c} className="debug__row">
            <span>{CATEGORIES[c].label}: {p.cred[c]}</span>
            <button onClick={() => d({ type: 'DEBUG_CRED', playerId: p.id, category: c, delta: -1 })}>−</button>
            <button onClick={() => d({ type: 'DEBUG_CRED', playerId: p.id, category: c, delta: 1 })}>+</button>
          </div>
        ))}
        <div className="debug__row">
          <span>Know-How: {p.knowHow}</span>
          <button onClick={() => d({ type: 'DEBUG_KNOWHOW', playerId: p.id, delta: -1 })}>−</button>
          <button onClick={() => d({ type: 'DEBUG_KNOWHOW', playerId: p.id, delta: 1 })}>+</button>
        </div>
        <div className="debug__row">
          <span>Secrets: {p.secrets.length}</span>
          <button onClick={() => d({ type: 'DEBUG_SECRET', playerId: p.id })}>+</button>
        </div>
      </div>

      <label>Teleport
        <select value="" onChange={(e) => e.target.value && d({ type: 'DEBUG_TELEPORT', playerId: p.id, nodeId: e.target.value })}>
          <option value="">— choose —</option>
          {Object.values(NODES).map((n) => <option key={n.id} value={n.id}>{n.kind === 'location' ? n.name : `· ${n.road} (${n.id})`}</option>)}
        </select>
      </label>

      <label>Trigger Island Event
        <select value="" onChange={(e) => e.target.value && d({ type: 'DEBUG_EVENT', eventId: e.target.value })}>
          <option value="">— choose —</option>
          {EVENTS.map((ev) => <option key={ev.id} value={ev.id}>{ev.name}</option>)}
        </select>
      </label>

      <label>Force card (current player)
        <div className="debug__inline">
          <select value={cardId} onChange={(e) => setCardId(e.target.value)}>
            {CARDS.map((c) => <option key={c.id} value={c.id}>{c.id}</option>)}
          </select>
          <button onClick={() => d({ type: 'DEBUG_FORCE_CARD', cardId })}>Draw</button>
        </div>
      </label>

      <div className="debug__inline">
        <button onClick={actions.endGame}>End game now</button>
        <button onClick={() => window.confirm('Reset and discard this game?') && actions.reset()}>Reset</button>
      </div>
      <p className="debug__note">Season switching arrives with the Seasons module (Phase 6).</p>
    </div>
  );
}
