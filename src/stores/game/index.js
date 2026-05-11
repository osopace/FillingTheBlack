import { defineStore } from "pinia";

// State
import {
  mode,
  teams,
  questionsPerTeam,
  secondsPerQ,
  currentScreen,
  currTeamIdx,
  roundScore,
  deck,
  cardIdx,
  questionsDoneThisTurn,
  timerInterval,
  timeLeft,
  totalTurns,
  isRevealed,
  history,
  delayTimeout,
  delayVisible,
  delayCount,
  delayWord,
  actionsDisabled,
  flashClass,
  toasts,
  TEAM_COLORS,
  CSS_COLORS,
  sfx,
  initAudio,
} from "./state.js";

// Getters
import {
  currentTeam,
  currentCard,
  leaderTeam,
  sortedTeams,
  progressPct,
  timerColor,
  timerOffset,
} from "./getters.js";

// Actions
import { loadGame, setupPersistence } from "./actions/persistence.js";
import {
  go,
  startGame,
  beginTurn,
  resumeGame,
  endTurn,
  nextTeamTurn,
  showGameOver,
  playAgain,
} from "./actions/gameFlow.js";
import { startTimer } from "./actions/timer.js";
import {
  selectMode,
  addTeam,
  removeTeam,
  stepQ,
  stepT,
  setTime,
} from "./actions/team.js";
import {
  showToast,
  flash,
  revealAnswer,
  doCorrect,
  doPass,
  advanceAfterDelay,
  advanceCard,
  prevCard,
} from "./actions/gameplay.js";

export const useGameStore = defineStore("game", () => {
  // Load persisted state
  loadGame();

  // Setup persistence
  setupPersistence();

  return {
    // State
    mode,
    teams,
    questionsPerTeam,
    secondsPerQ,
    currentScreen,
    currTeamIdx,
    roundScore,
    deck,
    cardIdx,
    questionsDoneThisTurn,
    timerInterval,
    timeLeft,
    totalTurns,
    isRevealed,
    history,
    delayTimeout,
    delayVisible,
    delayCount,
    delayWord,
    actionsDisabled,
    flashClass,
    toasts,

    // Getters
    currentTeam,
    currentCard,
    leaderTeam,
    sortedTeams,
    progressPct,
    timerColor,
    timerOffset,

    // Actions
    go,
    showToast,
    flash,
    selectMode,
    addTeam,
    removeTeam,
    stepQ,
    stepT,
    setTime,
    startGame,
    beginTurn,
    resumeGame,
    revealAnswer,
    doCorrect,
    doPass,
    advanceAfterDelay,
    advanceCard,
    prevCard,
    startTimer,
    endTurn,
    nextTeamTurn,
    showGameOver,
    playAgain,

    // Constants
    TEAM_COLORS,
    CSS_COLORS,

    // Audio
    sfx,
    initAudio,
  };
});

// Export audio utilities for direct import
export { sfx, initAudio };
