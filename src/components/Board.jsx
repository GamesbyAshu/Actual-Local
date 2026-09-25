import { useEffect, useMemo, useState } from 'react';
import { NODES } from '../game/board.js';
import { EDGES, SHUTTLE_LINES } from '../data/routes.js';
import { MAIN_ISLAND, COATUE, TUCKERNUCK, PONDS, MAP_LABELS } from '../data/islandShape.js';
import { TOKENS_BY_ID } from '../data/tokens.js';
import { smoothClosedPath, routeCurve } from '../utils/geometry.js';
import { TOKEN_ICONS } from './Icons.jsx';
import { PHASES } from '../game/constants.js';

const STEP_MS = 430;

function CompassRose({ x, y, r = 46 }) {
  const pts = (len, w, rot) => {
    const rad = (rot * Math.PI) / 180;
    const tip = [x + Math.sin(rad) * len, y - Math.cos(rad) * len];
    const l = [x + Math.sin(rad - Math.PI / 2) * w, y - Math.cos(rad - Math.PI / 2) * w];
    const rr = [x + Math.sin(rad + Math.PI / 2) * w, y - Math.cos(rad + Math.PI / 2) * w];
    return { tip, l, rr };
  };
  const star = [0, 90, 180, 270].map((rot) => pts(r, 7, rot));
  const minor = [45, 135, 225, 315].map((rot) => pts(r * 0.6, 5, rot));
  return (
    <g className="compass">
      <circle cx={x} cy={y} r={r + 8} className="compass__ring" />
      <circle cx={x} cy={y} r={r + 3} className="compass__ring compass__ring--thin" />
      {minor.map(({ tip, l, rr }, i) => (
        <path key={`m${i}`} d={`M${x} ${y} L${l[0]} ${l[1]} L${tip[0]} ${tip[1]} L${rr[0]} ${rr[1]}Z`} className="compass__minor" />
      ))}
      {star.map(({ tip, l, rr }, i) => (
        <g key={i}>
          <path d={`M${x} ${y} L${l[0]} ${l[1]} L${tip[0]} ${tip[1]}Z`} className="compass__dark" />
          <path d={`M${x} ${y} L${rr[0]} ${rr[1]} L${tip[0]} ${tip[1]}Z`} className="compass__light" />
        </g>
      ))}
      <text x={x} y={y - r - 14} className="compass__n">N</text>
    </g>
  );
}

function Pawn({ player, pos, offset, active, moving }) {
  const token = TOKENS_BY_ID[player.token];
  const Icon = TOKEN_ICONS[player.token];
  return (
    <g
      className={`pawn ${active ? 'pawn--active' : ''} ${moving ? 'pawn--moving' : ''}`}
      style={{ transform: `translate(${pos.x + offset.x}px, ${pos.y + offset.y}px)` }}
    >
      <ellipse cx="0" cy="13" rx="11" ry="3.2" className="pawn__shadow" />
      <circle r="12.5" fill={token.color} className="pawn__body" />
      <circle r="10" className="pawn__inner" />
      <g transform="translate(-8,-8)" color="#f6f0e2">
        <Icon size={16} strokeWidth={1.6} />
      </g>
    </g>
  );
}

export default function Board({ state, reachable, onNodeClick, onMoveComplete, inspectId }) {
  const { players, currentIdx, turn } = state;
  const mover = players[currentIdx];
  const [animNode, setAnimNode] = useState(null);

  // Walk the moving pawn along its route one space at a time.
  const movingKey = turn.phase === PHASES.MOVING ? turn.path?.join('>') : null;
  useEffect(() => {
    if (!movingKey) {
      setAnimNode(null);
      return undefined;
    }
    const path = turn.path;
    const timers = path.map((node, i) => setTimeout(() => setAnimNode(node), i * STEP_MS));
    const done = setTimeout(() => {
      setAnimNode(null);
      onMoveComplete();
    }, path.length * STEP_MS + 120);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movingKey]);

  const islandPath = useMemo(() => smoothClosedPath(MAIN_ISLAND), []);
  const coatuePath = useMemo(() => smoothClosedPath(COATUE, 0.45), []);
  const tuckPath = useMemo(() => smoothClosedPath(TUCKERNUCK), []);

  const selectedPath = turn.dest && reachable[turn.dest] ? reachable[turn.dest].path : null;

  // Group pawns by node so they sit side by side.
  const pawnNodes = players.map((p, i) => (i === currentIdx && animNode ? animNode : p.location));
  const offsets = pawnNodes.map((node, i) => {
    const same = pawnNodes.map((n, j) => (n === node ? j : -1)).filter((j) => j >= 0);
    const k = same.indexOf(i);
    const spread = 20;
    return { x: (k - (same.length - 1) / 2) * spread, y: -22 };
  });

  const pathD = (ids) =>
    ids.slice(1).map((id, i) => routeCurve(NODES[ids[i]].pos, NODES[id].pos, 0.06)).join(' ');

  return (
    <svg className="board" viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Map of Nantucket">
      <defs>
        <pattern id="sea-lines" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 3h6" className="sea-line" />
        </pattern>
        <pattern id="land-stipple" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r=".55" className="stipple" />
          <circle cx="6.5" cy="6.5" r=".45" className="stipple" />
        </pattern>
        <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="1.6" />
        </filter>
      </defs>

      {/* Sea */}
      <rect x="0" y="0" width="1000" height="640" className="sea" />
      <rect x="0" y="0" width="1000" height="640" fill="url(#sea-lines)" opacity=".55" />

      {/* Graticule */}
      <g className="graticule">
        {[160, 320, 480, 640, 800].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="640" />)}
        {[140, 300, 460, 600].map((y) => <line key={y} x1="0" y1={y} x2="1000" y2={y} />)}
        <text x="164" y="14">70°10′ W</text>
        <text x="484" y="14">70°05′ W</text>
        <text x="804" y="14">70°00′ W</text>
      </g>

      {/* Coastline: offset ripple lines, then land */}
      <g className="coast-ripples" filter="url(#rough)">
        {[14, 8].map((w) => (
          <g key={w} strokeWidth={w} className={`ripple ripple--${w}`}>
            <path d={islandPath} />
            <path d={coatuePath} />
            <path d={tuckPath} />
          </g>
        ))}
      </g>
      <g className="land" filter="url(#rough)">
        <path d={islandPath} />
        <path d={coatuePath} />
        <path d={tuckPath} />
      </g>
      <g className="land-texture">
        <path d={islandPath} fill="url(#land-stipple)" />
      </g>
      <g className="ponds">
        {PONDS.map((p) => <path key={p.name} d={smoothClosedPath(p.points)} />)}
      </g>

      {MAP_LABELS.map((l) => (
        <text
          key={l.text}
          x={l.x}
          y={l.y}
          className={`map-label ${l.italic ? 'map-label--italic' : ''}`}
          style={{ fontSize: l.size, letterSpacing: l.spacing }}
          transform={l.rotate ? `rotate(${l.rotate} ${l.x} ${l.y})` : undefined}
        >
          {l.text}
        </text>
      ))}

      {/* Cartouche */}
      <g className="cartouche" transform="translate(56 48)">
        <rect width="262" height="118" rx="2" />
        <rect x="6" y="6" width="250" height="106" rx="1" className="cartouche__inner" />
        <text x="131" y="38" className="cartouche__small">THE ISLAND OF</text>
        <text x="131" y="72" className="cartouche__title">Nantucket</text>
        <text x="131" y="96" className="cartouche__small">A PLAYING CHART · THIRTY MILES AT SEA</text>
      </g>

      <CompassRose x={920} y={190} />

      {/* Scale bar (approx. 60px ≈ 1 mile on this stylised chart) */}
      <g className="scale" transform="translate(60 604)">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={i * 40} y="0" width="40" height="5" className={i % 2 ? 'scale__b' : 'scale__a'} />
        ))}
        <text x="0" y="-5">0</text>
        <text x="160" y="-5">≈ 2.5 MILES</text>
      </g>

      {/* Shuttle lines */}
      <g className="shuttle-lines">
        {SHUTTLE_LINES.map((l) => <path key={l.id} d={pathD(l.path)} />)}
      </g>

      {/* Routes */}
      <g className="routes">
        {EDGES.map((e) => (
          <path key={`${e.a}-${e.b}`} d={routeCurve(NODES[e.a].pos, NODES[e.b].pos, 0.06)} className={`route route--${e.type}`} />
        ))}
      </g>

      {selectedPath && <path d={pathD(selectedPath)} className="route-preview" />}

      {/* Waypoints */}
      {Object.values(NODES).filter((n) => n.kind === 'waypoint').map((n) => {
        const canGo = Boolean(reachable[n.id]);
        return (
          <g
            key={n.id}
            className={`waypoint ${canGo ? 'is-reachable' : ''} ${turn.dest === n.id ? 'is-selected' : ''}`}
            onClick={() => canGo && onNodeClick(n.id)}
          >
            {canGo && <circle cx={n.pos.x} cy={n.pos.y} r="11" className="reach-ring" />}
            <circle cx={n.pos.x} cy={n.pos.y} r="5" className="waypoint__dot" />
            <title>{n.road}</title>
          </g>
        );
      })}

      {/* Destinations */}
      {Object.values(NODES).filter((n) => n.kind === 'location').map((n) => {
        const canGo = Boolean(reachable[n.id]);
        const visitedByMover = mover?.visited.includes(n.id);
        const lx = n.pos.x + (n.labelOffset?.x || 0);
        const ly = n.pos.y + (n.labelOffset?.y || 0);
        return (
          <g
            key={n.id}
            className={`dest dest--${n.type} ${canGo ? 'is-reachable' : ''} ${turn.dest === n.id ? 'is-selected' : ''} ${inspectId === n.id ? 'is-inspected' : ''}`}
            onClick={() => onNodeClick(n.id)}
          >
            {canGo && <circle cx={n.pos.x} cy={n.pos.y} r="19" className="reach-ring" />}
            <circle cx={n.pos.x} cy={n.pos.y} r="11" className="dest__outer" />
            <circle cx={n.pos.x} cy={n.pos.y} r="6.5" className={`dest__inner ${visitedByMover ? 'is-visited' : ''}`} />
            {n.secret && <path d={`M${n.pos.x} ${n.pos.y - 17} l4 4 -4 4 -4 -4z`} className="dest__secret" />}
            <text x={lx} y={ly} className="dest__label">{n.shortName}</text>
          </g>
        );
      })}

      {/* Pawns (current player drawn last, on top) */}
      {players
        .map((p, i) => ({ p, i }))
        .sort((a, b) => (a.i === currentIdx) - (b.i === currentIdx))
        .map(({ p, i }) => (
          <Pawn
            key={p.id}
            player={p}
            pos={NODES[pawnNodes[i]].pos}
            offset={offsets[i]}
            active={i === currentIdx}
            moving={i === currentIdx && Boolean(animNode)}
          />
        ))}
    </svg>
  );
}

