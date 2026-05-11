<template>
  <div id="gameover" class="screen active">
    <div class="go-icon-wrap" :class="isTie ? 'tie' : 'win'">
      <Trophy v-if="!isTie" :size="44" :stroke-width="1.5" />
      <Users v-else :size="44" :stroke-width="1.5" />
    </div>

    <div class="go-winner">
      {{ isTie ? "IT'S A TIE!" : sorted[0].name.toUpperCase() + " WINS!" }}
    </div>
    <div class="go-sub">
      {{
        isTie
          ? sorted.filter((t) => t.score === topScore).map((t) => t.name).join(" & ") +
            " are perfectly matched"
          : "Outstanding — well played by all."
      }}
    </div>

    <div class="final-scores">
      <div
        v-for="(t, i) in sorted"
        :key="t.idx"
        :class="['final-row', i === 0 && !isTie ? 'first' : '']"
      >
        <div class="fr-left">
          <div class="fr-rank-badge" :class="'rank-' + Math.min(i + 1, 4)">
            <Crown v-if="i === 0 && !isTie" :size="13" :stroke-width="2" />
            <Medal v-else-if="i === 1" :size="13" :stroke-width="2" />
            <Star v-else-if="i === 2" :size="13" :stroke-width="2" />
            <span v-else class="rank-num">{{ i + 1 }}</span>
          </div>
          <div class="fr-name">{{ t.name }}</div>
        </div>
        <div :class="['fr-score', i > 0 && !isTie ? 'dim' : '']">
          {{ t.score }}
        </div>
      </div>
    </div>

    <div style="flex: 1"></div>
    <button class="btn-primary" @click="store.playAgain()">PLAY AGAIN</button>
    <button
      class="btn-primary ghost"
      @click="store.go('splash')"
      style="margin-top: 6px"
    >
      CHANGE SETTINGS
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useGameStore } from "../stores/game";
import { sfx } from "../stores/game";
import { Trophy, Users, Crown, Medal, Star } from "lucide-vue-next";
const store = useGameStore();

const sorted = computed(() =>
  [...store.teams]
    .map((t, i) => ({ ...t, idx: i }))
    .sort((a, b) => b.score - a.score),
);
const topScore = computed(() => sorted.value[0]?.score || 0);
const isTie = computed(
  () => sorted.value.filter((t) => t.score === topScore.value).length > 1,
);

onMounted(() => {
  if (!isTie.value) sfx.win();
});
</script>
