import { useEffect, useMemo, useReducer, useRef } from 'react';
import { reducer } from '../game/reducer.js';
import { initialState } from '../game/state.js';
import { GAME_CONFIG } from '../config/gameConfig.js';
import { buildEventDeck, drawEvent } from '../game/events.js';
import { drawCardId, drawSecretCardId, getCard } from '../game/challenges.js';
import { effectiveTransport } from '../game/movement.js';
import { archiveSession, buildSessionSummary } from '../game/analytics.js';
import { rollD6, shuffle, pickOne } from '../utils/random.js';

const SAVE_KEY = 'acktual-local:game:v1';

function loadSaved() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : initialState;
  } catch {
    return initialState;
  }
}

// Wraps the pure reducer: rolls dice, shuffles decks and draws cards, then
// dispatches the outcome. Physical equivalent: the players' hands.
export function useGame() {
  const [state, dispatch] = useReducer(reducer, undefined, loadSaved);
  // A game restored onto the results screen was already archived.
  const archived = useRef(state.screen === 'results');

  useEffect(() => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  useEffect(() => {
    if (state.screen === 'results' && !archived.current && state.stats) {
      archived.current = true;
      archiveSession(buildSessionSummary(state));
    }
    if (state.screen !== 'results') archived.current = false;
  }, [state]);

  const actions = useMemo(() => {
    const player = () => state.players[state.currentIdx];
    return {
      startGame(setup) {
        const turnOrder = shuffle(setup.players.map((_, i) => i));
        const season = setup.season || GAME_CONFIG.seasons.default;
        const { eventId, deck } = drawEvent(buildEventDeck(season, GAME_CONFIG.seasons.enabled), season, GAME_CONFIG.seasons.enabled);
        dispatch({ type: 'START_GAME', setup, turnOrder, eventId, eventDeck: deck });
      },
      ackEvent: () => dispatch({ type: 'ACK_EVENT' }),
      selectMode: (mode) => dispatch({ type: 'SELECT_MODE', mode }),
      selectDest: (dest) => dispatch({ type: 'SELECT_DEST', dest }),
      clearDest: () => dispatch({ type: 'CLEAR_DEST' }),
      beginTravel() {
        const t = effectiveTransport(state.turn.mode, state.eventId);
        dispatch({ type: 'BEGIN_TRAVEL', roll: t.failOn?.length ? rollD6() : null });
      },
      reroll: () => dispatch({ type: 'REROLL', roll: rollD6() }),
      acceptFailure: () => dispatch({ type: 'ACCEPT_FAILURE' }),
      finishMove: () => dispatch({ type: 'FINISH_MOVE' }),
      linger: () => dispatch({ type: 'LINGER' }),
      chooseExperience(category, difficulty) {
        const cardId = drawCardId(player().location, category, difficulty, state.usedCards);
        dispatch({ type: 'DRAW_CARD', cardId });
      },
      attemptSecret() {
        dispatch({ type: 'DRAW_CARD', cardId: drawSecretCardId(player().location, state.usedCards) });
      },
      useHint() {
        const card = getCard(state.turn.cardId);
        const wrong = card.choices.map((_, i) => i).filter((i) => i !== card.correctAnswer && !state.turn.hidden.includes(i));
        if (wrong.length > 1) dispatch({ type: 'USE_HINT', removeIndex: pickOne(wrong) });
      },
      answer: (index) => dispatch({ type: 'ANSWER', index }),
      skip: () => dispatch({ type: 'SKIP_EXPERIENCE' }),
      continueTurn: () => dispatch({ type: 'CONTINUE' }),
      endTurn() {
        const wraps = state.currentIdx === state.players.length - 1;
        if (wraps && state.round < state.config.rounds) {
          const { eventId, deck } = drawEvent(state.eventDeck, state.config.season, state.config.seasonsEnabled);
          dispatch({ type: 'END_TURN', eventId, eventDeck: deck });
        } else {
          dispatch({ type: 'END_TURN' });
        }
      },
      endGame: () => dispatch({ type: 'END_GAME' }),
      reset() {
        try {
          localStorage.removeItem(SAVE_KEY);
        } catch {
          /* ignore */
        }
        dispatch({ type: 'RESET' });
      },
      debug: (action) => dispatch(action),
    };
  }, [state]);

  return { state, actions };
}
