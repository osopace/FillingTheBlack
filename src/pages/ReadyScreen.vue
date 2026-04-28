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

    <div class="ready-rules">
      <!-- Remote rules -->
      <template v-if="store.mode === 'remote'">
        <div class="rule-item">
          <div class="rule-icon"></div>
          <div class="rule-text">
            <strong>Screen Share Mode</strong> — share your screen so everyone
            on the call can see the hints.
          </div>
        </div>
        <div class="rule-item">
          <div class="rule-icon"></div>
          <div class="rule-text">
            The <strong>answer is hidden</strong> — read the numbered hints
            aloud to help your teammates guess.
          </div>
        </div>
        <div class="rule-item">
          <div class="rule-icon"></div>
          <div class="rule-text">
            When someone guesses correctly, hit <strong>Got It</strong>. The
            answer reveals and the next card loads after 3 seconds.
          </div>
        </div>
        <div class="rule-item">
          <div class="rule-icon">⏭</div>
          <div class="rule-text">
            If time runs out or you want to skip, press <strong>Skip</strong>.
            You can also go back to the previous card.
          </div>
        </div>
      </template>

      <!-- Local rules -->
      <template v-else>
        <div class="rule-item">
          <div class="rule-icon"></div>
          <div class="rule-text">
            <strong>Lead player</strong> — hold the screen so only you can see
            it. Describe the bold word using clues.
          </div>
        </div>
        <div class="rule-item">
          <div class="rule-icon"></div>
          <div class="rule-text">
            You <strong>cannot say</strong> any of the forbidden words listed on
            the card. No languages, no sign language.
          </div>
        </div>
        <div class="rule-item">
          <div class="rule-icon"></div>
          <div class="rule-text">
            <strong>Guessers</strong> — shout your answers! Mimes and dances are
            fair game too.
          </div>
        </div>
        <div class="rule-item">
          <div class="rule-icon"></div>
          <div class="rule-text">
            You have
            <strong>{{ store.secondsPerQ }} seconds per card</strong> and
            <strong>{{ store.questionsPerTeam }} cards</strong> this round. Go!
          </div>
        </div>
      </template>
    </div>

    <button class="btn-primary" @click="beginTurns()">WE'RE READY →</button>
    <div style="height: 8px"></div>
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/gameStore";
import { useRouter } from "vue-router";

const store = useGameStore();
const router = useRouter();

function beginTurns() {
  store.beginTurn();
  router.push("/game");
}
</script>
