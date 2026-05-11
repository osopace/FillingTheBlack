# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite, hot-reload)
npm run build     # Production build → dist/
npm run preview   # Serve the dist/ build locally
```

No test runner is configured. There are no lint scripts — the project has no ESLint/Prettier config files.

## Architecture

**Fill in the BLACK** is a Vue 3 turn-based word-guessing game. Two game modes: **Local** (in-person, card shown to lead player) and **Remote** (screen-share, answer hidden until revealed).

### State management — Pinia store split across files

The store lives in `src/stores/game/` and is deliberately split:

| File | Responsibility |
|---|---|
| `state.js` | All `ref()` declarations, card data (`ALL_CARDS`), team colors, audio engine (`sfx` via Web Audio API) |
| `getters.js` | Computed properties (`currentTeam`, `currentCard`, `timerColor`, `timerOffset`, `progressPct`) |
| `actions/gameFlow.js` | Navigation (`go()`), `startGame`, `beginTurn`, `resumeGame`, `endTurn` → `/roundend`, `nextTeamTurn`, `showGameOver`, `playAgain` |
| `actions/gameplay.js` | `doCorrect`, `doPass`, `advanceCard`, `prevCard`, `advanceAfterDelay`, `revealAnswer`, `flash`, `showToast` |
| `actions/timer.js` | `startTimer` — 1 s interval, calls `sfx.tick()` at ≤5 s, auto-advances on 0 |
| `actions/persistence.js` | `loadGame`, `setupPersistence` (Vue `watch` → sessionStorage), `clearPersistence`, `getRestoredRoute` |
| `actions/team.js` | `addTeam`, `removeTeam`, `selectMode`, `stepQ`, `stepT`, `setTime` |
| `index.js` | Assembles everything into the Pinia store via `defineStore` |

Everything is wired through the single store — components only import `useGameStore()`.

### Router

`src/router/index.js` exports the router as a **default export**. Store actions (`gameFlow.js`, `persistence.js`) import it directly — do **not** use `useRouter()` inside store actions since that composable only works inside component `setup()`.

Route flow: `/` → `/setup` → `/ready` → `/game` → `/roundend` → (back to `/ready` for next team, or `/gameover` when all teams done).

### Session storage / reload resume

`setupPersistence()` watches all game state via a deep Vue watcher and writes to `sessionStorage["gameState"]` on every change, including the **current route path**. On app mount (`App.vue`), if the current path is `/game` and a deck exists, `store.resumeGame()` is called to restart the timer without resetting turn state. `clearPersistence()` is called only at game over.

### Circular import avoidance

`gameplay.js` and `timer.js` use **dynamic `import()`** (`await import('./gameFlow.js')`, `await import('./timer.js')`) to break the mutual dependency cycle between timer ↔ gameplay ↔ gameFlow.

### UI conventions

- Icons: **Lucide Vue Next** only — no emojis anywhere in the UI.
- Fonts: Bebas Neue (display/headings), Syne (body), DM Mono (numbers/mono labels).
- All CSS is in `src/style.css` as a single file — no scoped styles in SFCs.
- Tailwind 4 is included via `@tailwindcss/vite` plugin but the design primarily uses CSS custom properties defined in `:root` (`--gold`, `--ink`, `--ember`, `--fog`, `--snow`, etc.).
- Cards animate in with `slideUp` keyframe; the timer uses an SVG `stroke-dashoffset` approach.
