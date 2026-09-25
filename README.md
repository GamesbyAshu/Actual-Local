# Are You an Acktual Local? — Board Game Prototype

A playable web prototype for testing and presenting the mechanics of a **physical** Nantucket board game.
The web version exists to test the physical game. Every mechanic below has a tabletop equivalent.

**Status: Vertical slice (Phases 1–4 core, with early pieces of 5, 7 and 9).**

---

## Running it

> The project folder name contains `#`, and Vite cannot serve files from a path with `#` in it.

- **Easiest:** double-click `start.cmd`. It maps the parent folder to drive `Q:` and opens the dev server.
- **Or** rename/move the folder so the path has no `#`, then run `npm install` and `npm run dev`.

Other commands (run them from a `#`-free path):

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build to `dist/` |
| `npm run simulate -- 300 quick 0.75` | Bots play 300 full games through the real rules engine and report the status distribution (a balance tool) |

Playtest tools: press <kbd>`</kbd> (backtick) during a game, or use **Menu → Playtest tools**.

---

## What's in the vertical slice

| Requirement | Slice |
|---|---|
| Players | 2–6 local players, names, pawns, random start player |
| Locations | 8: Nantucket Town (hub), Brant Point, Jetties, Surfside, Cisco, Madaket, ’Sconset, Sankaty Head |
| Routes | Node network with 10 route spaces on real roads (Milestone, Polpis, Madaket, Hummock Pond, Surfside) and beach paths |
| Transport | Walk, Bike, and **the Wave** shuttle (the island's real seasonal bus), each with trade-offs |
| Cards | 45 location-specific cards + 4 Local Secret cards, each with a source and verification status |
| Local Cred | History · Island Knowledge · Island Life · Community |
| Local Secret | Sankaty Head: “The Moving Lighthouse” (requires 2 History to attempt) |
| Island Events | 5 events (Fog, Perfect Beach Day, Summer Traffic, Nor’easter, Calm Seas); one per round |
| Status | 6-rank ladder with breadth requirements (not just total points) |
| End game | “Last Boat” bonus, per-player Nantucket Journey, winner, playtest summary, JSON export |
| Also | Island Know-How (toggleable), hidden debug panel, autosave, local session archive |

---

## How a turn works

1. **Round start:** turn over an **Island Event**. It applies to everyone for the round.
2. **Travel:** choose a transport, then a highlighted destination. The panel shows the route, the cost and what could go wrong. Confirm.
   - **Walk:** 1 space. Always works. The only way along the beach (Brant Point ↔ Jetties, Cisco ↔ Surfside).
   - **Bike:** up to 3 spaces on roads only. Roll a d6: on a 1 you get a flat tire and stop after 1 space.
   - **The Wave:** ride one line, stop to stop (Town ↔ Madaket / Surfside / ’Sconset). Roll: on a 1 you miss it and stay put.
   - **Linger** instead: stay put and gain 1 Know-How. Some places have a once-per-game linger bonus (Madaket Sunset, the ’Sconset Bluff Walk).
3. **Arrive:** at a destination, choose **which Local Cred category** to pursue from what *this place* offers, then a **difficulty**:
   - Easy +1 · Medium +2 · Local +3 (−1 if wrong, +1 Know-How if right)
   - Or attempt the **Local Secret**, if this place has one and you meet its prerequisite.
4. **Answer** the card. Read the explanation (so players learn something). **End Turn.**

After the last round, anyone in Town has made **the Last Boat** (+1 Island Life). Then each player's journey is scored.

### Status (Quick Game)

| Status | Total | Each category | Secrets | Places |
|---|---|---|---|---|
| Weekender | 3 | – | – | 2 |
| Summer Regular | 6 | 1 | – | 3 |
| Seasoned Visitor | 10 | 1 | – | 4 |
| Island Insider | 13 | 2 | – | 5 |
| **Acktual Local** | 16 | **3** | **1** | **6** |

All of these are in [src/data/ranks.js](src/data/ranks.js). The labels are placeholders the brand owner can rename.

---

## Why these mechanics are specific to Nantucket

The test we apply: *could you swap in another city without changing the mechanics?*

- **Geography decides what you can do.** Beaches give Island Life, lighthouses give History, and Town gives Community and History. You cannot collect a balanced set without actually crossing the island.
- **The real transport network.** The Wave only runs its real hub-and-spoke routes out of Town. Bikes can't use the beach, and walking is the only way along the sand.
- **Real roads.** You reach ’Sconset by Milestone Road (3 spaces) or Sankaty by the longer Polpis Road (4 spaces), as on the island.
- **Island weather and seasons drive the events.** Fog (“The Grey Lady”) slows bikes and rewards lighthouse history. A Nor’easter closes the beaches and gathers everyone in Town.
- **Local traditions become rules.** Toss a penny at Brant Point (+Know-How), watch the Madaket sunset, walk the ’Sconset Bluff Walk, and make the Last Boat from Steamboat Wharf.
- **Local Secrets are tied to hard-to-reach places.** Sankaty sits at the far east end and needs History to attempt.

---

## Physical conversion map

| Digital | Physical |
|---|---|
| Map with route nodes & highlighting | Illustrated board with printed stepping-stone paths |
| Transport rules & rolls | Transport reference card + one d6 |
| Location card decks | One small deck per destination, sorted by category & difficulty |
| Island Event deck | Event deck, one flip per round |
| Local Cred counters | Four peg tracks on each player board |
| Local Secrets / Know-How | Brass-look key tokens / rope-knot tokens (max 3) |
| Status calculation | Scoring chart printed on the player board |
| Pawn animation | Wooden pawns |

Nothing in the slice needs a computer. Hints (“remove a wrong answer”) work as a covered answer that the reader strikes through.

---

## Architecture

```
src/
  config/gameConfig.js     every tunable number (rewards, transport, modes, toggles)
  data/                    content only, no logic
    locations.js           destinations: description, history, ability, secret, image record
    routes.js              route spaces, edges (road/beach), Wave lines
    cards.js               challenge cards with source + verification status
    events.js              Island Event deck with declarative effects
    ranks.js               status ladder, requirements, journey text
    tokens.js, islandShape.js
  game/                    pure rules engine (no React)
    reducer.js             state machine; all randomness arrives in actions
    movement.js            reachability, transport + event modifiers, travel preview
    challenges.js          experiences per location, drawing, answer resolution
    scoring.js             status, standings, journey text
    events.js, board.js, state.js, analytics.js, constants.js
  hooks/useGame.js         rolls dice / shuffles / draws, dispatches, autosaves
  components/              presentational React components
  styles/index.css         design tokens + all styling
scripts/simulate.mjs       headless bot playtests against the real reducer
```

---

## Content & facts

- Every card has a `source` and a `verification` field:
  `web-checked` (checked against the source on 2026-09-25), `needs-verification` (believed accurate; confirm before print), or `judgment` (etiquette card; the brand owner should review the tone).
- **Images:** no photographs are bundled. Each location has an `image` record with `src: null` and a suggested licensed source. The UI shows a clearly labelled illustrated placeholder until you add a licensed photo (fill in `src`, `credit` and `license` together).
- The map is a stylised approximation to be replaced by the illustrator's final board.

---

## Balance notes from the simulator (quick mode, 2–4 bots)

- About 65% answer accuracy: most finish Seasoned Visitor / Summer Regular; about 3% reach Acktual Local.
- About 85% accuracy: most finish Island Insider; about 9% reach Acktual Local.
- **Standard mode runs out of cards at popular destinations.** It needs Phase 10 content (roughly 3× the cards) plus more Local Secret sites. Its secret requirement is temporarily set to 1.

---

## Roadmap

- **Phase 5:** more Local Secret sites (Great Point, Whaling Museum, Madaket); set standard mode to require 2–3 secrets.
- **Phase 6:** Seasons module (event filtering is already built; turn it on in `gameConfig.seasons`), plus Car and special transport (Great Point oversand, ferry).
- **Phase 7:** add Polpis, Wauwinet, Great Point, Miacomet and Main Street (route spaces are already placed); set-collection bonuses.
- **Social cards:** simultaneous answers, predictions and group votes.
- **Phases 8–10:** licensed photography, final illustrated board, content to 150+ cards, balance from exported playtest JSON.
