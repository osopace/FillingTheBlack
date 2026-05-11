<template>
  <div id="roundend" class="screen active">
    <div class="re-eyebrow">Round {{ Math.ceil(store.totalTurns / store.teams.length) }}</div>
    <div class="re-headline">
      {{ store.currentTeam.name.toUpperCase() }}
    </div>
    <div class="re-sub">finished their turn</div>

    <div class="re-earned">
      <div class="re-earned-label">Points scored this round</div>
      <div class="re-earned-val">
        <span class="re-plus">+</span>{{ store.roundScore }}
      </div>
    </div>

    <div class="scores-grid">
      <div
        v-for="t in store.sortedTeams"
        :key="t.idx"
        :class="['score-row', t.score === maxScore && maxScore > 0 ? 'leading' : '']"
      >
        <div class="sr-left">
          <div :class="['sr-dot', store.TEAM_COLORS[t.colorIdx]]"></div>
          <div class="sr-name">{{ t.name }}</div>
          <div v-if="t.score === maxScore && maxScore > 0" class="sr-lead-chip">
            <TrendingUp :size="10" :stroke-width="2.5" />
            LEADING
          </div>
        </div>
        <div :class="['sr-score', t.score === maxScore && maxScore > 0 ? 'top' : '']">
          {{ t.score }}
        </div>
      </div>
    </div>

    <div style="flex: 1"></div>
    <button class="btn-primary" @click="handleNext">
      <template v-if="isDone">
        <Trophy :size="20" :stroke-width="2" />
        FINAL RESULTS
      </template>
      <template v-else>
        {{ nextTeamName }}'S TURN
        <ChevronRight :size="22" :stroke-width="2.5" />
      </template>
    </button>
    <div style="height: 4px"></div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useGameStore } from "../stores/game";
import { Trophy, ChevronRight, TrendingUp } from "lucide-vue-next";
const store = useGameStore();

const maxScore = computed(() => Math.max(...store.teams.map((t) => t.score)));
const isDone = computed(() => store.totalTurns >= store.teams.length);
const nextTeamIdx = computed(() => (store.currTeamIdx + 1) % store.teams.length);
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
