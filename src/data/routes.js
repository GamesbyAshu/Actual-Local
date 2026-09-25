// The route network. Physical equivalent: printed paths of stepping-stone
// spaces between destinations. Waypoints are plain route spaces (no card).
// Some waypoints sit where future destinations will go (Polpis, Miacomet).

export const WAYPOINTS = {
  w_surf: { id: 'w_surf', road: 'Surfside Road', pos: { x: 496, y: 472 } },
  w_hummock: { id: 'w_hummock', road: 'Hummock Pond Road', pos: { x: 408, y: 462 } },
  w_mad1: { id: 'w_mad1', road: 'Madaket Road', pos: { x: 350, y: 420 } },
  w_mad2: { id: 'w_mad2', road: 'Madaket Road', pos: { x: 222, y: 424 } },
  w_ms1: { id: 'w_ms1', road: 'Milestone Road', pos: { x: 610, y: 440 } },
  w_ms2: { id: 'w_ms2', road: 'Milestone Road', pos: { x: 748, y: 458 } },
  w_pol1: { id: 'w_pol1', road: 'Polpis Road', pos: { x: 584, y: 396 } },
  w_pol2: { id: 'w_pol2', road: 'Polpis Road', pos: { x: 694, y: 374 } },
  w_pol3: { id: 'w_pol3', road: 'Polpis Road', pos: { x: 790, y: 378 } },
  w_mia: { id: 'w_mia', road: 'South Shore (beach)', pos: { x: 432, y: 556 } },
};

// type 'road' = paved road or bike path (walk, bike)
// type 'beach' = along the sand (walk only)
export const EDGES = [
  { a: 'town', b: 'brant', type: 'road', road: 'Easton Street' },
  { a: 'town', b: 'jetties', type: 'road', road: 'North Beach Street' },
  { a: 'brant', b: 'jetties', type: 'beach', road: 'Harbour beach' },

  { a: 'town', b: 'w_surf', type: 'road', road: 'Surfside Road' },
  { a: 'w_surf', b: 'surfside', type: 'road', road: 'Surfside Road' },

  { a: 'town', b: 'w_hummock', type: 'road', road: 'Hummock Pond Road' },
  { a: 'w_hummock', b: 'cisco', type: 'road', road: 'Hummock Pond Road' },

  { a: 'cisco', b: 'w_mia', type: 'beach', road: 'South Shore' },
  { a: 'w_mia', b: 'surfside', type: 'beach', road: 'South Shore' },

  { a: 'town', b: 'w_mad1', type: 'road', road: 'Madaket Road' },
  { a: 'w_mad1', b: 'w_mad2', type: 'road', road: 'Madaket Road' },
  { a: 'w_mad2', b: 'madaket', type: 'road', road: 'Madaket Road' },

  { a: 'town', b: 'w_ms1', type: 'road', road: 'Milestone Road' },
  { a: 'w_ms1', b: 'w_ms2', type: 'road', road: 'Milestone Road' },
  { a: 'w_ms2', b: 'sconset', type: 'road', road: 'Milestone Road' },

  { a: 'town', b: 'w_pol1', type: 'road', road: 'Polpis Road' },
  { a: 'w_pol1', b: 'w_pol2', type: 'road', road: 'Polpis Road' },
  { a: 'w_pol2', b: 'w_pol3', type: 'road', road: 'Polpis Road' },
  { a: 'w_pol3', b: 'sankaty', type: 'road', road: 'Polpis Road' },

  { a: 'sconset', b: 'sankaty', type: 'road', road: 'Baxter Road' },
];

// The Wave: the island's seasonal public shuttle (NRTA).
// A rider travels along ONE line per turn, from stop to stop.
// Source for the real service: https://www.nrtawave.com (routes vary by season).
export const SHUTTLE_LINES = [
  { id: 'madaket', name: 'Madaket Route', path: ['town', 'w_mad1', 'w_mad2', 'madaket'] },
  { id: 'surfside', name: 'Surfside Beach Route', path: ['town', 'w_surf', 'surfside'] },
  { id: 'sconset', name: "'Sconset via Milestone", path: ['town', 'w_ms1', 'w_ms2', 'sconset'] },
];
