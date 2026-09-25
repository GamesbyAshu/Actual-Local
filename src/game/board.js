import { LOCATIONS } from '../data/locations.js';
import { WAYPOINTS, EDGES, SHUTTLE_LINES } from '../data/routes.js';

// Every space on the board: named destinations + plain route spaces.
export const NODES = {
  ...Object.fromEntries(Object.values(LOCATIONS).map((l) => [l.id, { ...l, kind: 'location' }])),
  ...Object.fromEntries(Object.values(WAYPOINTS).map((w) => [w.id, { ...w, kind: 'waypoint' }])),
};

export const isLocation = (id) => NODES[id]?.kind === 'location';

export const nodeName = (id) => {
  const n = NODES[id];
  if (!n) return id;
  return n.kind === 'location' ? n.name : `${n.road} (route space)`;
};

// Adjacency list: nodeId -> [{ to, type, road }]
export const ADJACENCY = EDGES.reduce((acc, e) => {
  (acc[e.a] ||= []).push({ to: e.b, type: e.type, road: e.road });
  (acc[e.b] ||= []).push({ to: e.a, type: e.type, road: e.road });
  return acc;
}, {});

export const shuttleStopsFor = (line) => line.path.filter(isLocation);

export const isShuttleStop = (id) => SHUTTLE_LINES.some((l) => shuttleStopsFor(l).includes(id));
