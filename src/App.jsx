import { useEffect, useState } from 'react';
import { useGame } from './hooks/useGame.js';
import SetupScreen from './components/SetupScreen.jsx';
import GameScreen from './components/GameScreen.jsx';
import ResultsScreen from './components/ResultsScreen.jsx';
import DebugPanel from './components/DebugPanel.jsx';
import RulesModal from './components/RulesModal.jsx';

export default function App() {
  const { state, actions } = useGame();
  const [debugOpen, setDebugOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const openRules = () => setRulesOpen(true);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '`' && !['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) setDebugOpen((v) => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {state.screen === 'setup' && <SetupScreen onStart={actions.startGame} onRules={openRules} />}
      {state.screen === 'game' && <GameScreen state={state} actions={actions} onMenu={() => setMenuOpen(true)} onRules={openRules} />}
      {state.screen === 'results' && <ResultsScreen state={state} onNewGame={actions.reset} />}

      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu" onClick={(e) => e.stopPropagation()}>
            <h2>Menu</h2>
            <p className="hint">The game saves automatically in this browser.</p>
            <button className="btn" onClick={() => { setMenuOpen(false); actions.endGame(); }}>Finish game &amp; see results</button>
            <button className="btn btn--ghost" onClick={() => { if (window.confirm('Abandon this game and start over?')) { setMenuOpen(false); actions.reset(); } }}>New game</button>
            <button className="btn btn--ghost" onClick={() => { setMenuOpen(false); openRules(); }}>Rules</button>
            <button className="btn btn--ghost" onClick={() => { setMenuOpen(false); setDebugOpen(true); }}>Playtest tools</button>
            <button className="btn btn--ghost" onClick={() => setMenuOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {rulesOpen && <RulesModal rankSet={state.config?.rankSet} onClose={() => setRulesOpen(false)} />}

      {debugOpen && state.screen === 'game' && <DebugPanel state={state} actions={actions} onClose={() => setDebugOpen(false)} />}
    </>
  );
}
