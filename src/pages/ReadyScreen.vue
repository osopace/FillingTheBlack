<template>
  <div id="ready" class="screen active">
    <div class="ready-eyebrow">
      {{ store.totalTurns === 0 ? "FIRST UP" : "UP NEXT" }}
    </div>

    <div
      class="ready-team"
      :style="{ color: store.CSS_COLORS[store.currentTeam.colorIdx] }"
    >
      {{ store.currentTeam.name.toUpperCase() }}
    </div>

    <div class="ready-meta">
      <span class="ready-meta-item">
        <Layers :size="13" :stroke-width="2" />
        {{ store.questionsPerTeam }} cards
      </span>
      <span class="ready-meta-sep">·</span>
      <span class="ready-meta-item">
        <Clock :size="13" :stroke-width="2" />
        {{ store.secondsPerQ }}s each
      </span>
    </div>

    <div class="ready-rules">
      <!-- Remote rules -->
      <template v-if="store.mode === 'remote'">
        <div class="rule-item">
          <div class="rule-icon"><Monitor :size="15" :stroke-width="2" /></div>
          <div class="rule-text">
            <strong>Screen Share Mode</strong> — share your screen so everyone
            on the call can see the hints.
          </div>
        </div>
        <div class="rule-item">
          <div class="rule-icon"><EyeOff :size="15" :stroke-width="2" /></div>
          <div class="rule-text">
            The <strong>answer is hidden</strong> — read the numbered hints
            aloud to help your teammates guess.
          </div>
        </div>
        <div class="rule-item">
          <div class="rule-icon"><Check :size="15" :stroke-width="2" /></div>
          <div class="rule-text">
            When someone guesses correctly, hit <strong>Got It</strong>. The
            answer reveals and the next card loads after 3 seconds.
          </div>
        </div>
        <div class="rule-item">
          <div class="rule-icon"><SkipForward :size="15" :stroke-width="2" /></div>
          <div class="rule-text">
            If time runs out or you want to skip, press <strong>Skip</strong>.
            You can also go back to the previous card.
          </div>
        </div>
      </template>

      <!-- Local rules -->
      <template v-else>
        <div class="rule-item">
          <div class="rule-icon"><UserCheck :size="15" :stroke-width="2" /></div>
          <div class="rule-text">
            <strong>Lead player</strong> — hold the screen so only you can see
            it. Describe the bold word using clues.
          </div>
        </div>
        <div class="rule-item">
          <div class="rule-icon"><Ban :size="15" :stroke-width="2" /></div>
          <div class="rule-text">
            You <strong>cannot say</strong> any of the forbidden words listed on
            the card. No languages, no sign language.
          </div>
        </div>
        <div class="rule-item">
          <div class="rule-icon"><Users :size="15" :stroke-width="2" /></div>
          <div class="rule-text">
            <strong>Guessers</strong> — shout your answers. Mimes and gestures
            are fair game too.
          </div>
        </div>
        <div class="rule-item">
          <div class="rule-icon"><Zap :size="15" :stroke-width="2" /></div>
          <div class="rule-text">
            Score as many points as you can before time runs out. Every correct
            guess counts.
          </div>
        </div>
      </template>
    </div>

    <div style="flex: 1"></div>
    <button class="btn-primary" @click="beginTurns()">
      WE'RE READY
      <ChevronRight :size="22" :stroke-width="2.5" />
    </button>
    <div style="height: 8px"></div>
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/game";
import { useRouter } from "vue-router";
import {
  Monitor,
  EyeOff,
  Check,
  SkipForward,
  UserCheck,
  Ban,
  Users,
  Zap,
  Clock,
  Layers,
  ChevronRight,
} from "lucide-vue-next";

const store = useGameStore();
const router = useRouter();

function beginTurns() {
  store.beginTurn();
  router.push("/game");
}
</script>
