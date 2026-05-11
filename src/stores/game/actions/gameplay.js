import {
  isRevealed,
  teams,
  currTeamIdx,
  roundScore,
  mode,
  actionsDisabled,
  timerInterval,
  delayCount,
  delayWord,
  delayVisible,
  delayTimeout,
  history,
  questionsDoneThisTurn,
  questionsPerTeam,
  cardIdx,
  deck,
  timeLeft,
  secondsPerQ,
  toasts,
  flashClass,
} from "../state.js";
import { sfx, shuffleArr, ALL_CARDS } from "../state.js";

export function showToast(msg, dur = 2200) {
  const id = Date.now();
  toasts.value.push({ id, msg });
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, dur);
}

export function flash(type) {
  flashClass.value = type;
  setTimeout(() => {
    flashClass.value = "";
  }, 460);
}

export function revealAnswer() {
  if (isRevealed.value) return;
  isRevealed.value = true;
  sfx.reveal();
}

export function doCorrect() {
  clearInterval(timerInterval.value);
  sfx.ok();
  flash("green");
  teams.value[currTeamIdx.value].score++;
  roundScore.value++;
  if (mode.value === "remote") {
    revealAnswer();
    advanceAfterDelay(true);
  } else {
    advanceCard();
  }
}

export function doPass() {
  clearInterval(timerInterval.value);
  sfx.pass();
  flash("red");
  if (mode.value === "remote") {
    advanceAfterDelay(false);
  } else {
    advanceCard();
  }
}

export function advanceAfterDelay(wasCorrect) {
  actionsDisabled.value = true;
  clearInterval(timerInterval.value);
  let countdown = 3;
  const card = deck.value[cardIdx.value];
  delayCount.value = countdown;
  delayWord.value = wasCorrect ? "✓ " + card.word : "↷ Skipped";
  delayVisible.value = true;

  delayTimeout.value = setInterval(async () => {
    countdown--;
    delayCount.value = countdown;
    if (countdown <= 0) {
      clearInterval(delayTimeout.value);
      delayVisible.value = false;
      actionsDisabled.value = false;
      await advanceCard();
    }
  }, 1000);
}

export async function advanceCard() {
  history.value.push(cardIdx.value);
  questionsDoneThisTurn.value++;
  if (questionsDoneThisTurn.value >= questionsPerTeam.value) {
    const gameFlowModule = await import("./gameFlow.js");
    gameFlowModule.endTurn();
    return;
  }
  cardIdx.value++;
  if (cardIdx.value >= deck.value.length) {
    deck.value = shuffleArr([...ALL_CARDS]);
    cardIdx.value = 0;
  }
  isRevealed.value = false;
  timeLeft.value = secondsPerQ.value;
  const timerModule = await import("./timer.js");
  timerModule.startTimer();
}

export async function prevCard() {
  if (history.value.length === 0) {
    showToast("No previous card");
    return;
  }
  clearInterval(timerInterval.value);
  clearInterval(delayTimeout.value);
  delayVisible.value = false;
  actionsDisabled.value = false;
  cardIdx.value = history.value.pop();
  if (questionsDoneThisTurn.value > 0) questionsDoneThisTurn.value--;
  isRevealed.value = false;
  timeLeft.value = secondsPerQ.value;
  const timerModule = await import("./timer.js");
  timerModule.startTimer();
}
