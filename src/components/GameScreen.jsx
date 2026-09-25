import { useMemo, useState } from 'react';
import { LOCATIONS } from '../data/locations.js';
import { PHASES } from '../game/constants.js';
import { isLocation } from '../game/board.js';
import { getReachable, travelPreview } from '../game/movement.js';
import { availableExperiences, secretStatus } from '../game/challenges.js';
import TopBar from './TopBar.jsx';
import PlayerPanel from './PlayerPanel.jsx';
import ActionPanel from './ActionPanel.jsx';
import Board from './Board.jsx';
import LocationPanel, { TravelBox } from './LocationPanel.jsx';
import ChallengeCard from './ChallengeCard.jsx';
import EventCard from './EventCard.jsx';
import ActivityLog from './ActivityLog.jsx';

export default function GameScreen({ state, actions, onMenu, onRules }) {
  const { turn } = state;
  const player = state.players[state.currentIdx];
  const [inspectId, setInspectId] = useState(null);
  const [viewEvent, setViewEvent] = useState(false);

  const reachable = useMemo(
    () => (turn.phase === PHASES.TRAVEL && turn.mode ? getReachable(player.location, turn.mode, state.eventId) : {}),
    [turn.phase, turn.mode, player.location, state.eventId],
  );

  const preview = turn.dest && turn.phase === PHASES.TRAVEL ? travelPreview(player.location, turn.dest, turn.mode, state.eventId) : null;

  const pickDest = (id) => {
    setInspectId(null);
    actions.selectDest(id);
  };

  const handleNodeClick = (id) => {
    if (reachable[id]) return pickDest(id);
    if (isLocation(id)) {
      actions.clearDest();
      setInspectId(id === inspectId ? null : id);
    }
  };

  const confirmTravel = () => {
    setInspectId(null);
    actions.beginTravel();
  };

  let panel = null;
  if (turn.phase === PHASES.ARRIVED) {
    const loc = LOCATIONS[player.location];
    panel = (
      <LocationPanel
        variant="arrival"
        location={loc}
        experiences={availableExperiences(loc.id, state.usedCards)}
        secret={secretStatus(player, loc.id, state.usedCards)}
        onChoose={actions.chooseExperience}
        onSecret={actions.attemptSecret}
        onSkip={actions.skip}
      />
    );
  } else if (preview && isLocation(turn.dest)) {
    panel = (
      <LocationPanel
        variant="travel"
        location={LOCATIONS[turn.dest]}
        preview={preview}
        experiences={availableExperiences(turn.dest, state.usedCards)}
        onClose={actions.clearDest}
        onConfirmTravel={confirmTravel}
        onCancelTravel={actions.clearDest}
      />
    );
  } else if (preview) {
    panel = (
      <div className="location-panel location-panel--compact">
        <div className="location-panel__body">
          <div className="location-panel__type">Route space</div>
          <h2 className="location-panel__name">{preview.destName}</h2>
          <TravelBox preview={preview} onConfirm={confirmTravel} onCancel={actions.clearDest} />
        </div>
      </div>
    );
  } else if (inspectId) {
    panel = (
      <LocationPanel
        variant="info"
        location={LOCATIONS[inspectId]}
        experiences={availableExperiences(inspectId, state.usedCards)}
        onClose={() => setInspectId(null)}
      />
    );
  }

  return (
    <div className="game">
      <TopBar state={state} onShowEvent={() => setViewEvent(true)} onMenu={onMenu} onRules={onRules} />
      <PlayerPanel state={state} />
      <main className="table">
        <div className="board-frame">
          <Board
            state={state}
            reachable={reachable}
            onNodeClick={handleNodeClick}
            onMoveComplete={actions.finishMove}
            inspectId={inspectId}
          />
          <div className="legend">
            <span><i className="lg lg--road" /> Road / bike path</span>
            <span><i className="lg lg--beach" /> Beach (walk only)</span>
            <span><i className="lg lg--wave" /> The Wave shuttle</span>
            <span><i className="lg lg--secret" /> Local Secret site</span>
          </div>
        </div>
        {panel}
      </main>
      <ActionPanel state={state} actions={actions} reachable={reachable} onPickDest={pickDest} />
      <ActivityLog log={state.log} players={state.players} />

      {turn.phase === PHASES.EVENT && <EventCard eventId={state.eventId} round={state.round} onClose={actions.ackEvent} />}
      {viewEvent && turn.phase !== PHASES.EVENT && (
        <EventCard eventId={state.eventId} round={state.round} onClose={() => setViewEvent(false)} closeLabel="Close" />
      )}
      {(turn.phase === PHASES.CHALLENGE || turn.phase === PHASES.RESOLVED) && <ChallengeCard state={state} actions={actions} />}
    </div>
  );
}
