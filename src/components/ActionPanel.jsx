import { GAME_CONFIG } from '../config/gameConfig.js';
import { LOCATIONS } from '../data/locations.js';
import { CATEGORIES, PHASES } from '../game/constants.js';
import { nodeName, isLocation } from '../game/board.js';
import { modeAvailability, effectiveTransport } from '../game/movement.js';
import { getEvent } from '../game/events.js';
import { MODE_ICONS, Die, CompassIcon } from './Icons.jsx';
import { PHASE_RULES } from '../data/rules.js';
import { strategyHints } from '../game/hints.js';

function Guidance({ state }) {
  const rule = PHASE_RULES[state.turn.phase];
  const tips = strategyHints(state);
  if (!rule && !tips.length) return null;
  return (
    <div className="guidance">
      {rule && <p className="guidance__rule"><strong>Rule:</strong> {rule}</p>}
      {tips.length > 0 && (
        <div className="guidance__tips">
          <div className="guidance__label"><CompassIcon size={14} /> Island tips</div>
          <ul>{tips.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

const MODE_ORDER = ['walk', 'bike', 'shuttle'];

function TransportChooser({ state, actions }) {
  const p = state.players[state.currentIdx];
  return (
    <div className="modes">
      {MODE_ORDER.map((id) => {
        const t = effectiveTransport(id, state.eventId);
        const avail = modeAvailability(p.location, id, state.eventId);
        const base = GAME_CONFIG.transport[id];
        const Icon = MODE_ICONS[id];
        const modified = JSON.stringify(t) !== JSON.stringify(base);
        return (
          <button
            key={id}
            className={`mode ${state.turn.mode === id ? 'is-selected' : ''}`}
            disabled={!avail.ok}
            onClick={() => actions.selectMode(id)}
          >
            <span className="mode__icon"><Icon size={26} /></span>
            <span className="mode__body">
              <span className="mode__name">
                {t.label}
                {modified && <span className="mode__flag">event</span>}
              </span>
              <span className="mode__text">
                {avail.ok
                  ? t.lineBased
                    ? `Stop to stop along one Wave line. Miss on ${t.failOn.join('/')}.`
                    : `${t.steps} space${t.steps > 1 ? 's' : ''}${t.failOn?.length ? ` · flat on ${t.failOn.join('/')}` : ' · reliable'}${t.edgeTypes.includes('beach') ? ' · beach OK' : ''}`
                  : avail.reason}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Destinations({ state, reachable, onPick }) {
  if (!state.turn.mode) return <p className="hint">Choose how to travel, then pick a highlighted place on the map.</p>;
  const entries = Object.entries(reachable);
  if (!entries.length) return <p className="hint">Nowhere reachable this way.</p>;
  const places = entries.filter(([id]) => isLocation(id));
  const spaces = entries.filter(([id]) => !isLocation(id));
  const item = ([id, r]) => (
    <li key={id}>
      <button className={`dest-item ${state.turn.dest === id ? 'is-selected' : ''}`} onClick={() => onPick(id)}>
        <span className={`dest-item__dot ${isLocation(id) ? '' : 'is-waypoint'}`} />
        <span className="dest-item__name">{isLocation(id) ? LOCATIONS[id].name : nodeName(id)}</span>
        <span className="dest-item__steps">{r.line ? 'Wave' : `${r.path.length - 1} sp`}</span>
      </button>
    </li>
  );
  return (
    <>
      {places.length ? <ul className="dest-list">{places.map(item)}</ul> : <p className="hint">No destination in one move. Head out along a road.</p>}
      {spaces.length > 0 && (
        <details className="route-spaces" open={!places.length}>
          <summary>Or stop partway: {spaces.length} route space{spaces.length > 1 ? 's' : ''}</summary>
          <ul className="dest-list">{spaces.map(item)}</ul>
        </details>
      )}
    </>
  );
}

export default function ActionPanel({ state, actions, reachable, onPickDest }) {
  const { turn } = state;
  const p = state.players[state.currentIdx];
  const ev = getEvent(state.eventId);
  const here = LOCATIONS[p.location];
  const lingerAbility = here?.specialAbility?.linger && !p.usedAbilities.includes(here.specialAbility.id) ? here.specialAbility : null;
  const t = turn.mode ? effectiveTransport(turn.mode, state.eventId) : null;

  return (
    <aside className="panel panel--right">
      <div className="panel__eyebrow">Your turn · {p.name}</div>
      <Guidance state={state} />

      {turn.phase === PHASES.TRAVEL && (
        <>
          <h3 className="panel__title">Travel</h3>
          <TransportChooser state={state} actions={actions} />
          <h4 className="section-title">Reachable</h4>
          <Destinations state={state} reachable={reachable} onPick={onPickDest} />
          <div className="linger">
            <button className="btn btn--ghost" onClick={actions.linger}>Linger here instead</button>
            <p className="hint">
              {lingerAbility
                ? `${lingerAbility.label}: +${lingerAbility.linger.amount} ${CATEGORIES[lingerAbility.linger.category].label} (once per game).`
                : state.config.knowHowEnabled
                  ? 'Stay put, talk to locals: +1 Island Know-How. No experience this turn.'
                  : 'Stay put this turn.'}
            </p>
          </div>
        </>
      )}

      {turn.phase === PHASES.ROLLED && (
        <div className="roll-result">
          <h3 className="panel__title">Bad luck</h3>
          <Die value={turn.roll} size={64} tone="bad" />
          <p>{t.failText}</p>
          {state.config.knowHowEnabled && (
            <button className="btn" disabled={p.knowHow < GAME_CONFIG.knowHow.costs.reroll} onClick={actions.reroll}>
              Spend 1 Know-How to reroll
            </button>
          )}
          <button className="btn btn--ghost" onClick={actions.acceptFailure}>Accept it</button>
        </div>
      )}

      {turn.phase === PHASES.MOVING && (
        <div className="roll-result">
          <h3 className="panel__title">On the way…</h3>
          {turn.roll != null && <Die value={turn.roll} size={52} tone={turn.failed ? 'bad' : 'good'} />}
          <p className="hint">{turn.failed ? t?.failText : `Heading to ${nodeName(turn.path[turn.path.length - 1])}.`}</p>
        </div>
      )}

      {turn.phase === PHASES.ARRIVED && (
        <>
          <h3 className="panel__title">You’ve arrived</h3>
          <p className="hint">Choose an experience at {here.name} in the location panel, or pass.</p>
        </>
      )}

      {(turn.phase === PHASES.CHALLENGE || turn.phase === PHASES.RESOLVED) && (
        <>
          <h3 className="panel__title">Experience in progress</h3>
          <p className="hint">Answer the card on the table.</p>
        </>
      )}

      {turn.phase === PHASES.DONE && (
        <div className="end-turn">
          <h3 className="panel__title">Turn complete</h3>
          <p className="hint">Pass the pawn to the next player.</p>
          <button className="btn btn--primary btn--large" onClick={actions.endTurn}>End Turn</button>
        </div>
      )}

      {ev && (
        <div className="event-mini">
          <div className="event-mini__kicker">Island Event · {ev.kicker}</div>
          <div className="event-mini__name">{ev.name}</div>
          <ul>{ev.rules.map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
      )}
    </aside>
  );
}
