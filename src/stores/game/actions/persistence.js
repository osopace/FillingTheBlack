import { watch } from "vue";
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
} from "../state.js";

export function loadGame() {
  const saved = sessionStorage.getItem("gameState");
  if (saved) {
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
    } catch (e) {
      // Handle invalid data gracefully
    }
  }
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
    }),
    (newState) => {
      sessionStorage.setItem("gameState", JSON.stringify(newState));
    },
    { deep: true },
  );
}

export function clearPersistence() {
  sessionStorage.removeItem("gameState");
}
