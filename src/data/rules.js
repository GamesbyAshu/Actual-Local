// The rulebook. Written for the printed game and shown in the prototype.
// Numbers are read from gameConfig/ranks so the text never drifts from the rules engine.
import { GAME_CONFIG } from '../config/gameConfig.js';
import { RANKS, RANK_REQUIREMENTS } from './ranks.js';

const T = GAME_CONFIG.transport;
const D = GAME_CONFIG.difficulty;
const K = GAME_CONFIG.knowHow;

const reqText = (r) =>
  [
    r.total && `${r.total} total Local Cred`,
    r.each && `${r.each} in every category`,
    r.secrets && `${r.secrets} Local Secret${r.secrets > 1 ? 's' : ''}`,
    r.visited && `${r.visited} places visited`,
  ].filter(Boolean).join(' · ') || 'Where everyone starts';

export const RULE_SECTIONS = [
  {
    id: 'goal',
    title: 'The Goal',
    body: [
      'Explore Nantucket, earn Local Cred, and find out how local you really are.',
      'At the end, every player gets a Nantucket status, from Day-Tripper up to Acktual Local. Status depends on breadth: to become an Acktual Local you need Local Cred in all four categories, at least one Local Secret, and a good number of places visited. Being brilliant at only History is not enough.',
      'The player with the highest status wins. Ties go to total Local Cred, then Local Secrets, then places visited.',
    ],
  },
  {
    id: 'setup',
    title: 'Setup',
    body: [
      `${GAME_CONFIG.players.min}–${GAME_CONFIG.players.max} players. Each chooses a pawn and places it in Nantucket Town (Steamboat Wharf).`,
      `Each player starts with 0 Local Cred and ${K.start} Island Know-How.`,
      `Draw a random start player. Quick Game: ${GAME_CONFIG.modes.quick.rounds} rounds. Standard Game: ${GAME_CONFIG.modes.standard.rounds} rounds.`,
    ],
  },
  {
    id: 'round',
    title: 'Each Round',
    body: [
      'At the start of each round, turn over one Island Event card. It affects everyone until the next round (for example, Fog slows bikes and a Nor’easter closes the beaches).',
      'Then each player takes one turn in order: Travel → Arrive → Experience → End Turn.',
    ],
  },
  {
    id: 'travel',
    title: '1. Travel',
    body: ['Choose ONE way to travel, then move your pawn along the printed routes. Or linger instead.'],
    list: [
      `${T.walk.label}: ${T.walk.steps} space. Never fails. The only way along beach paths (dotted sand lines).`,
      `${T.bike.label}: up to ${T.bike.steps} spaces on roads and bike paths only. Roll the die first: on a ${T.bike.failOn.join(' or ')} you get a flat tire and move just 1 space.`,
      `${T.shuttle.label}: ride one shuttle line from stop to stop (Town ↔ Madaket, Surfside or ’Sconset). Roll: on a ${T.shuttle.failOn.join(' or ')} you miss it and stay where you are.`,
      `Linger: stay put and gain ${GAME_CONFIG.linger.knowHow} Know-How. Some places give a once-per-game bonus for lingering instead (Madaket Sunset, the ’Sconset Bluff Walk).`,
      'Small dots on the map are route spaces. You may stop on one partway through a journey, but nothing happens there.',
    ],
  },
  {
    id: 'experience',
    title: '2. Arrive & Experience',
    body: [
      'When you reach a named destination, you may take ONE experience there. Each place offers only certain categories. Beaches lean toward Island Life, lighthouses toward History, and Town toward Community and History.',
      'Choose a category, then choose how local you’re feeling:',
    ],
    list: [
      `${D.easy.label}: +${D.easy.reward} if correct. No risk.`,
      `${D.medium.label}: +${D.medium.reward} if correct. No risk.`,
      `${D.local.label}: +${D.local.reward} if correct, plus ${D.local.knowHow} Know-How. Lose ${D.local.penalty} in that category if wrong.`,
      'Another player reads the card aloud. Answer, then read the explanation together.',
      'Cards you have drawn leave the game, so popular places eventually run dry. Keep moving.',
    ],
  },
  {
    id: 'secrets',
    title: 'Local Secrets',
    body: [
      'Some hard-to-reach places hold a Local Secret. Sankaty Head is one. When you arrive there, you may attempt the Secret instead of a normal experience, if you meet its requirement (Sankaty needs 2 History).',
      'Answer correctly and you take the Secret token plus bonus Local Cred and Know-How. Get it wrong and you lose nothing, but your turn’s experience is over. You may try again on a later visit.',
      'Local Secrets are rare, and you need one to become an Acktual Local.',
    ],
  },
  {
    id: 'knowhow',
    title: 'Island Know-How',
    body: [`A small, scarce resource (maximum ${K.max}). Earn it by answering Local-difficulty cards, lingering, or tossing a penny at Brant Point. Spend it to:`],
    list: [
      `Reroll a failed Bike or Wave roll (${K.costs.reroll} Know-How).`,
      `Remove one wrong answer from a card (${K.costs.hint} Know-How).`,
    ],
  },
  {
    id: 'end',
    title: 'The Last Boat & Scoring',
    body: [
      `After the final round the last boat leaves Steamboat Wharf. Anyone standing in Town made it: +${GAME_CONFIG.lastBoat.amount} Island Life.`,
      'Everyone then reads their status off the scoring chart: the highest rank whose requirements are ALL met.',
    ],
    ranks: true,
  },
];

export function rankTable(rankSet) {
  const reqs = RANK_REQUIREMENTS[rankSet];
  return RANKS.map((r) => ({ label: r.label, text: reqText(reqs[r.id]) }));
}

// One-line reminders shown in the action panel for each part of the turn.
export const PHASE_RULES = {
  travel: 'Pick one transport, then a glowing place. Walk is safe, Bike is fast but can get a flat tire, and the Wave only runs from its stops.',
  rolled: 'Your roll failed. Spend 1 Know-How to reroll, or accept it: on a bike you move 1 space, and if you missed the Wave you stay put.',
  moving: 'Moving along the route…',
  arrived: 'Pick ONE category this place offers, then a difficulty. Local cards pay the most but cost you if wrong.',
  challenge: 'Answer the card. A Know-How can remove one wrong answer.',
  resolved: 'Read the explanation. That’s how visitors become locals.',
  done: 'Your turn is over. Click End Turn and pass to the next player.',
};
