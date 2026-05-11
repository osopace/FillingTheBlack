<template>
  <div id="game" class="screen active">
    <!-- HEADER -->
    <div class="game-header">
      <div class="score-chip" id="chip-curr">
        <div class="chip-team">{{ store.currentTeam.name }}</div>
        <div
          class="chip-score"
          :style="{ color: store.CSS_COLORS[store.currentTeam.colorIdx] }"
        >
          {{ store.currentTeam.score }}
        </div>
      </div>

      <!-- TIMER -->
      <div class="timer-wrap">
        <svg class="timer-svg" width="68" height="68" viewBox="0 0 68 68">
          <circle class="t-bg" cx="34" cy="34" r="28" />
          <circle
            class="t-fill"
            cx="34"
            cy="34"
            r="28"
            :style="{
              strokeDashoffset: store.timerOffset,
              stroke: store.timerColor,
            }"
          />
        </svg>
        <div class="timer-num" :style="{ color: store.timerColor }">
          {{ store.timeLeft }}
        </div>
      </div>

      <div class="score-chip" id="chip-lead">
        <div class="chip-team" style="letter-spacing: 1px; font-size: 9px; color: var(--mist)">
          LEADING
        </div>
        <div class="chip-score" style="color: var(--ghost); font-size: 17px">
          {{
            store.leaderTeam
              ? store.leaderTeam.name.substring(0, 8).toUpperCase() +
                " · " +
                store.leaderTeam.score
              : "—"
          }}
        </div>
      </div>
    </div>

    <!-- PROGRESS -->
    <div class="q-progress">
      <div class="q-bar-wrap">
        <div class="q-bar-fill" :style="{ width: store.progressPct + '%' }"></div>
      </div>
      <div class="q-label">
        {{ store.questionsDoneThisTurn + 1 }} / {{ store.questionsPerTeam }}
      </div>
    </div>

    <!-- CARD SLOT -->
    <div style="width: 100%; flex: 1; display: flex; flex-direction: column">

      <!-- PHYSICAL CARD (Local Mode) -->
      <template v-if="store.mode === 'local' && store.currentCard">
        <div class="card-physical" :key="store.cardIdx">
          <div class="card-banner">
            <div class="card-pack">Fill in the BLACK™</div>
            <div class="card-answer">{{ store.currentCard.word }}</div>
          </div>
          <div class="card-dash"></div>
          <div class="card-hints-list">
            <div
              v-for="(h, i) in store.currentCard.hints.slice(0, 5)"
              :key="i"
              class="hint-item"
            >
              <span class="hint-num">{{ i + 1 }}</span>{{ h }}
            </div>
          </div>
          <div class="card-foot">
            <span>Forbidden — these 5 words</span>
            <span>{{ store.cardIdx + 1 }} / {{ store.deck.length }}</span>
          </div>
        </div>
      </template>

      <!-- REMOTE CARD (Remote Mode) -->
      <template v-if="store.mode === 'remote' && store.currentCard">
        <div class="card-remote" :key="'r-' + store.cardIdx">
          <div
            :class="['remote-answer-zone', store.isRevealed ? 'revealed' : '']"
            @click="store.revealAnswer()"
          >
            <div class="remote-pack">Fill in the BLACK™ — Answer hidden from guessers</div>
            <div class="remote-answer">{{ store.currentCard.word }}</div>
            <div :class="['reveal-hint', store.isRevealed ? 'hidden' : '']">
              <Eye :size="15" :stroke-width="2" />
              <span>Tap to reveal answer</span>
            </div>
          </div>
          <div class="remote-dash"></div>
          <div class="remote-section-label">READ THESE HINTS ALOUD</div>
          <div class="remote-hints-list">
            <div
              v-for="(h, i) in store.currentCard.hints.slice(0, 5)"
              :key="i"
              class="remote-hint-item"
            >
              <span class="rhi-num">{{ i + 1 }}</span>{{ h }}
            </div>
          </div>
          <div class="remote-card-foot">
            <span>Screen Share Mode</span>
            <span>{{ store.cardIdx + 1 }} / {{ store.deck.length }}</span>
          </div>
        </div>
      </template>
    </div>

    <!-- ACTIONS -->
    <div class="action-row">
      <button
        class="act-btn btn-prev"
        :disabled="store.actionsDisabled"
        @click="store.prevCard()"
        title="Previous card"
      >
        <ArrowLeft :size="20" :stroke-width="2" />
      </button>
      <button
        class="act-btn btn-pass"
        :disabled="store.actionsDisabled"
        @click="store.doPass()"
      >
        <X :size="16" :stroke-width="2.5" />
        SKIP
      </button>
      <button
        class="act-btn btn-correct"
        :disabled="store.actionsDisabled"
        @click="store.doCorrect()"
      >
        <Check :size="16" :stroke-width="2.5" />
        GOT IT
      </button>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/game";
import { ArrowLeft, X, Check, Eye } from "lucide-vue-next";
const store = useGameStore();
</script>
