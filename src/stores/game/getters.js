import { computed } from "vue";
import {
  teams,
  currTeamIdx,
  deck,
  cardIdx,
  questionsDoneThisTurn,
  questionsPerTeam,
  timeLeft,
  secondsPerQ,
} from "./state.js";

export const currentTeam = computed(() => teams.value[currTeamIdx.value]);
export const currentCard = computed(() => deck.value[cardIdx.value] || null);
export const leaderTeam = computed(
  () => [...teams.value].sort((a, b) => b.score - a.score)[0],
);
export const sortedTeams = computed(() =>
  [...teams.value]
    .map((t, i) => ({ ...t, idx: i }))
    .sort((a, b) => b.score - a.score),
);
export const progressPct = computed(
  () => (questionsDoneThisTurn.value / questionsPerTeam.value) * 100,
);
export const timerColor = computed(() => {
  const pct = timeLeft.value / secondsPerQ.value;
  return pct > 0.45
    ? "var(--gold)"
    : pct > 0.22
      ? "var(--ember)"
      : "var(--red)";
});
export const timerOffset = computed(() => {
  const pct = timeLeft.value / secondsPerQ.value;
  return 175.9 * (1 - pct);
});
