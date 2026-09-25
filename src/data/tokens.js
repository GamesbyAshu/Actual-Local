// Player pawns. Physical equivalent: wooden pawns in muted coastal colours.
export const TOKENS = [
  { id: 'lighthouse', label: 'Lighthouse', color: '#9c4a3e' },
  { id: 'basket', label: 'Lightship Basket', color: '#8a6a3b' },
  { id: 'scallop', label: 'Bay Scallop', color: '#b98a6a' },
  { id: 'sailboat', label: 'Catboat', color: '#2f4a66' },
  { id: 'whale', label: 'Sperm Whale', color: '#4f6572' },
  { id: 'rose', label: "'Sconset Rose", color: '#a45d6b' },
];

export const TOKENS_BY_ID = Object.fromEntries(TOKENS.map((t) => [t.id, t]));
