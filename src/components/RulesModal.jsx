import { useState } from 'react';
import { RULE_SECTIONS, rankTable } from '../data/rules.js';
import { GAME_CONFIG } from '../config/gameConfig.js';
import { CloseIcon } from './Icons.jsx';

export default function RulesModal({ onClose, rankSet = 'quick' }) {
  const [active, setActive] = useState(RULE_SECTIONS[0].id);
  const [set, setSet] = useState(rankSet);
  const section = RULE_SECTIONS.find((s) => s.id === active);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="rules" onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn rules__close" onClick={onClose} aria-label="Close rules"><CloseIcon size={18} /></button>
        <nav className="rules__nav">
          <div className="rules__eyebrow">Rulebook</div>
          <div className="rules__brand">How to Play</div>
          {RULE_SECTIONS.map((s) => (
            <button key={s.id} className={`rules__tab ${active === s.id ? 'is-active' : ''}`} onClick={() => setActive(s.id)}>
              {s.title}
            </button>
          ))}
        </nav>
        <article className="rules__body" key={section.id}>
          <h2>{section.title}</h2>
          {section.body.map((p) => <p key={p}>{p}</p>)}
          {section.list && <ul>{section.list.map((li) => <li key={li}>{li}</li>)}</ul>}
          {section.ranks && (
            <>
              <div className="rules__set">
                {Object.values(GAME_CONFIG.modes).map((m) => (
                  <button key={m.id} className={`btn btn--small ${set === m.rankSet ? '' : 'btn--ghost'}`} onClick={() => setSet(m.rankSet)}>
                    {m.label}
                  </button>
                ))}
              </div>
              <table className="rules__ranks">
                <tbody>
                  {rankTable(set).map((r, i) => (
                    <tr key={r.label} className={i === 5 ? 'is-top' : ''}>
                      <th>{r.label}</th>
                      <td>{r.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          <div className="rules__pager">
            {RULE_SECTIONS.map((s, i) => s.id === active && (
              <span key={s.id}>
                {i > 0 && <button className="btn btn--ghost btn--small" onClick={() => setActive(RULE_SECTIONS[i - 1].id)}>← {RULE_SECTIONS[i - 1].title}</button>}
                {i < RULE_SECTIONS.length - 1 && <button className="btn btn--small" onClick={() => setActive(RULE_SECTIONS[i + 1].id)}>{RULE_SECTIONS[i + 1].title} →</button>}
              </span>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
