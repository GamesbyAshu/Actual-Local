import { TOKENS_BY_ID } from '../data/tokens.js';
import { RANK_REQUIREMENTS, RANKS } from '../data/ranks.js';
import { nodeName } from '../game/board.js';
import { computeRank, totalCred } from '../game/scoring.js';
import { TOKEN_ICONS } from './Icons.jsx';
import { CredTracker, KnowHowSlots, SecretSlots } from './CredTracker.jsx';

export function PawnBadge({ token, size = 40 }) {
  const t = TOKENS_BY_ID[token];
  const Icon = TOKEN_ICONS[token];
  return (
    <span className="pawn-badge" style={{ background: t.color, width: size, height: size }}>
      <Icon size={size * 0.55} strokeWidth={1.6} />
    </span>
  );
}

function StatusLadder({ index }) {
  return (
    <ol className="ladder" aria-label="Status ladder">
      {RANKS.map((r, i) => (
        <li key={r.id} className={`${i <= index ? 'is-reached' : ''} ${i === index ? 'is-current' : ''}`} title={r.label} />
      ))}
    </ol>
  );
}

export default function PlayerPanel({ state }) {
  const { players, currentIdx, config } = state;
  const p = players[currentIdx];
  const { rank, index, next } = computeRank(p, config.rankSet);
  const topReq = RANK_REQUIREMENTS[config.rankSet].acktualLocal;

  return (
    <aside className="panel panel--left">
      <div className="panel__eyebrow">Now playing</div>
      <div className="player-head">
        <PawnBadge token={p.token} size={48} />
        <div>
          <h2 className="player-head__name">{p.name}</h2>
          <div className="player-head__where">at {nodeName(p.location)}</div>
        </div>
      </div>

      <section className="status-block">
        <div className="status-block__label">Island Status</div>
        <div className="status-block__rank" key={rank.id}>{rank.label}</div>
        <StatusLadder index={index} />
        {next && (
          <div className="status-block__next">
            <span>Toward <em>{next.rank.label}</em>:</span>
            <ul>
              {next.missing.map((m) => (
                <li key={m.key}>{m.label} <span className="muted">({m.have})</span></li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section>
        <div className="section-title">
          Local Cred <span className="section-title__aside">{totalCred(p)} total</span>
        </div>
        <CredTracker cred={p.cred} target={topReq.each} />
      </section>

      <section className="tokens-row">
        <div>
          <div className="section-title">Local Secrets</div>
          <SecretSlots count={p.secrets.length} needed={topReq.secrets || 1} />
        </div>
        {config.knowHowEnabled && (
          <div>
            <div className="section-title">Island Know-How</div>
            <KnowHowSlots count={p.knowHow} />
          </div>
        )}
      </section>

      <section>
        <div className="section-title">
          Explored <span className="section-title__aside">{p.visited.length} places</span>
        </div>
        <div className="visited">
          {p.visited.map((id) => <span key={id} className="visited__chip">{nodeName(id)}</span>)}
        </div>
      </section>

      <section className="others">
        <div className="section-title">Fellow travellers</div>
        {players.filter((_, i) => i !== currentIdx).map((o) => {
          const r = computeRank(o, config.rankSet);
          return (
            <div key={o.id} className="other">
              <PawnBadge token={o.token} size={28} />
              <div className="other__body">
                <div className="other__name">{o.name} <span className="muted">· {r.rank.label}</span></div>
                <CredTracker cred={o.cred} compact trackLength={0} />
              </div>
              <div className="other__meta" title="Local Secrets">{o.secrets.length}<small>sec</small></div>
            </div>
          );
        })}
      </section>
    </aside>
  );
}
