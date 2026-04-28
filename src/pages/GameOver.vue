<template>
  <div id="gameover" class="screen active">
    <div class="go-emoji">{{ isTie ? '🤝' : '🏆' }}</div>
    <div class="go-winner">{{ isTie ? "IT'S A TIE!" : sorted[0].name.toUpperCase() + ' WINS!' }}</div>
    <div class="go-sub">{{ isTie ? sorted.filter(t=>t.score===topScore).map(t=>t.name).join(' & ') + ' are perfectly matched' : 'Congratulations — well played 🎉' }}</div>

    <div class="final-scores">
      <div
        v-for="(t, i) in sorted"
        :key="t.idx"
        :class="['final-row', i === 0 && !isTie ? 'first' : '']"
      >
        <div class="fr-left">
          <div class="fr-rank">{{ ranks[i] || '—' }}</div>
          <div class="fr-name">{{ t.name }}</div>
        </div>
        <div :class="['fr-score', i > 0 && !isTie ? 'dim' : '']">{{ t.score }}</div>
      </div>
    </div>

    <button class="btn-primary" @click="store.playAgain()">PLAY AGAIN</button>
    <button class="btn-primary ghost" @click="store.go('splash')" style="margin-top:6px">CHANGE SETTINGS</button>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useGameStore } from '../stores/gameStore'
import { sfx } from '../stores/gameStore'
const store = useGameStore()

const ranks = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣']
const sorted = computed(() =>
  [...store.teams].map((t,i)=>({...t,idx:i})).sort((a,b)=>b.score-a.score)
)
const topScore = computed(() => sorted.value[0]?.score || 0)
const isTie = computed(() => sorted.value.filter(t=>t.score===topScore.value).length > 1)

onMounted(() => { if (!isTie.value) sfx.win() })
</script>
