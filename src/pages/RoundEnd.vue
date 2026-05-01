<template>
  <div id="roundend" class="screen active">
    <div class="re-eyebrow">
      Round {{ Math.ceil(store.totalTurns / store.teams.length) }}
    </div>
    <div class="re-headline">
      {{ store.currentTeam.name.toUpperCase() }} DONE!
    </div>

    <div class="scores-grid">
      <div
        v-for="t in store.sortedTeams"
        :key="t.idx"
        :class="[
          'score-row',
          t.score === maxScore && maxScore > 0 ? 'leading' : '',
        ]"
      >
        <div class="sr-left">
          <div :class="['sr-dot', store.TEAM_COLORS[t.colorIdx]]"></div>
          <div class="sr-name">{{ t.name }}</div>
        </div>
        <div
          :class="[
            'sr-score',
            t.score === maxScore && maxScore > 0 ? 'top' : '',
          ]"
        >
          {{ t.score }}
        </div>
      </div>
    </div>

    <div class="re-earned">
      <div class="re-earned-label">
        {{ store.currentTeam.name }} scored this round
      </div>
      <div class="re-earned-val">+{{ store.roundScore }}</div>
    </div>

    <button class="btn-primary" @click="handleNext">
      {{ isDone ? "SEE FINAL RESULTS 🏆" : nextTeamName + "'S TURN →" }}
    </button>
    <div style="height: 4px"></div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useGameStore } from "../stores/game";
const store = useGameStore();

const maxScore = computed(() => Math.max(...store.teams.map((t) => t.score)));
const isDone = computed(() => store.totalTurns >= store.teams.length);
const nextTeamIdx = computed(
  () => (store.currTeamIdx + 1) % store.teams.length,
);
const nextTeamName = computed(
  () => store.teams[nextTeamIdx.value]?.name.toUpperCase() || "",
);

function handleNext() {
  if (isDone.value) {
    store.showGameOver();
  } else {
    store.nextTeamTurn();
  }
}
</script>
