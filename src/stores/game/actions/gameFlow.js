import router from "../../../router/index.js";
import {
  teams,
  currTeamIdx,
  totalTurns,
  roundScore,
  questionsDoneThisTurn,
  isRevealed,
  history,
  timeLeft,
  secondsPerQ,
  deck,
  cardIdx,
  timerInterval,
  actionsDisabled,
  delayTimeout,
  delayVisible,
} from "../state.js";
import { shuffleArr, ALL_CARDS } from "../state.js";
import { clearPersistence } from "./persistence.js";

export function go(screen) {
  const path = screen === "splash" ? "/" : `/${screen}`;
  router.push(path);
}

export function startGame() {
  teams.value.forEach((t) => (t.score = 0));
  currTeamIdx.value = 0;
  totalTurns.value = 0;
  deck.value = shuffleArr([...ALL_CARDS]);
  cardIdx.value = 0;
}

export async function beginTurn() {
  roundScore.value = 0;
  questionsDoneThisTurn.value = 0;
  isRevealed.value = false;
  history.value = [];
  timeLeft.value = secondsPerQ.value;
  const timerModule = await import("./timer.js");
  timerModule.startTimer();
}

export async function resumeGame() {
  clearInterval(timerInterval.value);
  clearInterval(delayTimeout.value);
  delayVisible.value = false;
  actionsDisabled.value = false;
  isRevealed.value = false;
  timeLeft.value = secondsPerQ.value;
  const timerModule = await import("./timer.js");
  timerModule.startTimer();
}

export function endTurn() {
  clearInterval(timerInterval.value);
  clearInterval(delayTimeout.value);
  delayVisible.value = false;
  actionsDisabled.value = false;
  totalTurns.value++;
  go("roundend");
}

export function nextTeamTurn() {
  const nextIdx = (currTeamIdx.value + 1) % teams.value.length;
  currTeamIdx.value = nextIdx;
  go("ready");
}

export function showGameOver() {
  clearPersistence();
  go("gameover");
}

export function playAgain() {
  teams.value.forEach((t) => (t.score = 0));
  currTeamIdx.value = 0;
  totalTurns.value = 0;
  deck.value = shuffleArr([...ALL_CARDS]);
  cardIdx.value = 0;
  go("ready");
}
