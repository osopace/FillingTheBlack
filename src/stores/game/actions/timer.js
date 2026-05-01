import { timerInterval, timeLeft, mode } from "../state.js";
import { sfx } from "../state.js";

export function startTimer() {
  clearInterval(timerInterval.value);
  timerInterval.value = setInterval(async () => {
    timeLeft.value--;
    if (timeLeft.value <= 5 && timeLeft.value > 0) sfx.tick();
    if (timeLeft.value <= 0) {
      clearInterval(timerInterval.value);
      sfx.end();
      const gameplayModule = await import("./gameplay.js");
      if (mode.value === "remote") {
        gameplayModule.advanceAfterDelay(false);
      } else {
        gameplayModule.advanceCard();
      }
    }
  }, 1000);
}
