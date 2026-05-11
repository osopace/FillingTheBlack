import { watch } from "vue";
import router from "../../../router/index.js";
import {
  mode,
  teams,
  questionsPerTeam,
  secondsPerQ,
  currTeamIdx,
  deck,
  cardIdx,
  questionsDoneThisTurn,
  totalTurns,
  roundScore,
} from "../state.js";

const SAVE_KEY = "gameState";
const RESTORABLE_ROUTES = ["/setup", "/ready", "/game", "/roundend"];

export function loadGame() {
  const saved = sessionStorage.getItem(SAVE_KEY);
  if (!saved) return;
  try {
    const data = JSON.parse(saved);
    if (data.mode) mode.value = data.mode;
    if (data.teams) teams.value = data.teams;
    if (data.questionsPerTeam !== undefined)
      questionsPerTeam.value = data.questionsPerTeam;
    if (data.secondsPerQ !== undefined) secondsPerQ.value = data.secondsPerQ;
    if (data.currTeamIdx !== undefined) currTeamIdx.value = data.currTeamIdx;
    if (data.deck) deck.value = data.deck;
    if (data.cardIdx !== undefined) cardIdx.value = data.cardIdx;
    if (data.questionsDoneThisTurn !== undefined)
      questionsDoneThisTurn.value = data.questionsDoneThisTurn;
    if (data.totalTurns !== undefined) totalTurns.value = data.totalTurns;
    if (data.roundScore !== undefined) roundScore.value = data.roundScore;
  } catch (e) {
    sessionStorage.removeItem(SAVE_KEY);
  }
}

export function getRestoredRoute() {
  const saved = sessionStorage.getItem(SAVE_KEY);
  if (!saved) return null;
  try {
    const data = JSON.parse(saved);
    if (data.route && RESTORABLE_ROUTES.includes(data.route)) {
      return data.route;
    }
  } catch (e) {}
  return null;
}

export function setupPersistence() {
  watch(
    () => ({
      mode: mode.value,
      teams: teams.value,
      questionsPerTeam: questionsPerTeam.value,
      secondsPerQ: secondsPerQ.value,
      currTeamIdx: currTeamIdx.value,
      deck: deck.value,
      cardIdx: cardIdx.value,
      questionsDoneThisTurn: questionsDoneThisTurn.value,
      totalTurns: totalTurns.value,
      roundScore: roundScore.value,
    }),
    (newState) => {
      const route = router.currentRoute.value.path;
      sessionStorage.setItem(SAVE_KEY, JSON.stringify({ ...newState, route }));
    },
    { deep: true },
  );
}

export function clearPersistence() {
  sessionStorage.removeItem(SAVE_KEY);
}
