import { GAME_CONFIG } from '../config/gameConfig.js';
import { SHUTTLE_LINES } from '../data/routes.js';
import { ADJACENCY, isLocation, shuttleStopsFor, nodeName } from './board.js';
import { getEvent } from './events.js';

// Transport rules after the current Island Event has modified them.
export function effectiveTransport(modeId, eventId) {
  const base = GAME_CONFIG.transport[modeId];
  const override = getEvent(eventId)?.effects?.transport?.[modeId] || {};
  return { ...base, ...override };
}

export function blockedEdgeTypes(eventId) {
  return getEvent(eventId)?.effects?.blockedEdgeTypes || [];
}

// Breadth-first search along allowed route types, up to `steps` spaces.
function reachableByRoad(start, steps, edgeTypes, blocked) {
  const allowed = edgeTypes.filter((t) => !blocked.includes(t));
  const paths = { [start]: [start] };
  let frontier = [start];
  for (let s = 0; s < steps; s++) {
    const next = [];
    for (const node of frontier) {
      for (const edge of ADJACENCY[node] || []) {
        if (!allowed.includes(edge.type) || paths[edge.to]) continue;
        paths[edge.to] = [...paths[node], edge.to];
        next.push(edge.to);
      }
    }
    frontier = next;
  }
  delete paths[start];
  return paths;
}

function reachableByShuttle(start) {
  const paths = {};
  for (const line of SHUTTLE_LINES) {
    const i = line.path.indexOf(start);
    if (i === -1 || !isLocation(start)) continue;
    for (const stop of shuttleStopsFor(line)) {
      if (stop === start) continue;
      const j = line.path.indexOf(stop);
      const path = i < j ? line.path.slice(i, j + 1) : line.path.slice(j, i + 1).reverse();
      if (!paths[stop]) paths[stop] = { path, line: line.name };
    }
  }
  return paths;
}

// -> { [nodeId]: { path: [...ids], line? } }
export function getReachable(from, modeId, eventId) {
  const t = effectiveTransport(modeId, eventId);
  if (!t || t.disabled) return {};
  if (t.lineBased) return reachableByShuttle(from);
  const byRoad = reachableByRoad(from, t.steps, t.edgeTypes, blockedEdgeTypes(eventId));
  return Object.fromEntries(Object.entries(byRoad).map(([id, path]) => [id, { path }]));
}

export function modeAvailability(from, modeId, eventId) {
  const t = effectiveTransport(modeId, eventId);
  if (t.disabled) return { ok: false, reason: 'Unavailable during this Island Event.' };
  const count = Object.keys(getReachable(from, modeId, eventId)).length;
  if (!count) {
    return { ok: false, reason: t.lineBased ? 'Not at a Wave shuttle stop.' : 'No routes open.' };
  }
  return { ok: true, count };
}

// What the confirmation panel shows before travelling.
export function travelPreview(from, dest, modeId, eventId) {
  const t = effectiveTransport(modeId, eventId);
  const r = getReachable(from, modeId, eventId)[dest];
  if (!r) return null;
  const steps = r.path.length - 1;
  const consequences = [];
  if (t.failOn?.length) {
    const odds = `${t.failOn.length} in 6`;
    consequences.push(`Roll a die. On ${t.failOn.join(' or ')} (${odds}): ${t.failText}`);
  } else {
    consequences.push('No roll needed. You arrive for certain.');
  }
  if (!isLocation(dest)) consequences.push('A route space: no experience here, but you’ll be closer next turn.');
  return {
    mode: t,
    dest,
    destName: nodeName(dest),
    path: r.path,
    steps,
    line: r.line,
    cost: 'Free',
    consequences,
    needsRoll: Boolean(t.failOn?.length),
  };
}

export const rollFails = (modeId, eventId, roll) =>
  effectiveTransport(modeId, eventId).failOn?.includes(roll) ?? false;
