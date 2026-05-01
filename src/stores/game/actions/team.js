import { mode, teams, questionsPerTeam, secondsPerQ } from "../state.js";
import { DEFAULT_TEAM_NAMES } from "../state.js";

export function selectMode(m) {
  mode.value = m;
}

export async function addTeam() {
  if (teams.value.length >= 6) {
    const gameplayModule = await import("./gameplay.js");
    gameplayModule.showToast("Max 6 teams!");
    return;
  }
  const idx = teams.value.length;
  teams.value.push({
    name: DEFAULT_TEAM_NAMES[idx] || `Team ${idx + 1}`,
    score: 0,
    colorIdx: idx,
  });
}

export async function removeTeam(i) {
  if (teams.value.length <= 2) {
    const gameplayModule = await import("./gameplay.js");
    gameplayModule.showToast("Minimum 2 teams");
    return;
  }
  teams.value.splice(i, 1);
  teams.value.forEach((t, i2) => (t.colorIdx = i2));
}

export function stepQ(d) {
  questionsPerTeam.value = Math.max(
    3,
    Math.min(25, questionsPerTeam.value + d),
  );
}

export function stepT(d) {
  secondsPerQ.value = Math.max(10, Math.min(60, secondsPerQ.value + d));
}

export function setTime(v) {
  secondsPerQ.value = v;
}
