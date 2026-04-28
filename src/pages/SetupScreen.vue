<template>
  <div id="setup" class="screen active">
    <div class="setup-header">
      <button class="btn-back" @click="store.go('splash')">←</button>
      <div class="setup-title">GAME SETUP</div>
      <div class="setup-mode-pill">
        {{ store.mode === "remote" ? "Remote" : "In The Room" }}
      </div>
    </div>

    <!-- TEAMS -->
    <div class="section">
      <div class="section-title">Teams</div>
      <div class="teams-list">
        <div v-for="(team, i) in store.teams" :key="i" class="team-row">
          <div
            :class="['team-color-dot', store.TEAM_COLORS[team.colorIdx]]"
          ></div>
          <input
            class="team-name-input"
            :value="team.name"
            placeholder="Team name"
            maxlength="18"
            @input="team.name = $event.target.value"
          />
          <button
            :class="[
              'btn-remove-team',
              store.teams.length <= 2 ? 'disabled' : '',
            ]"
            @click="store.removeTeam(i)"
          >
            ✕
          </button>
        </div>
      </div>
      <button
        v-if="store.teams.length < 6"
        class="btn-add-team"
        @click="store.addTeam()"
      >
        <span style="font-size: 18px">+</span> Add another team
      </button>
    </div>

    <!-- QUESTIONS -->
    <div class="section">
      <div class="section-title">Questions per team</div>
      <div class="ctrl-row">
        <div class="ctrl-left">
          <div class="ctrl-name">No. of questions</div>
          <div class="ctrl-hint">Each team gets this many cards</div>
        </div>
        <div class="ctrl-right">
          <button class="stepper-btn" @click="store.stepQ(-1)">−</button>
          <div class="stepper-val">{{ store.questionsPerTeam }}</div>
          <button class="stepper-btn" @click="store.stepQ(1)">+</button>
        </div>
      </div>
    </div>

    <!-- TIME -->
    <div class="section">
      <div class="section-title">Time per question</div>
      <div class="ctrl-row">
        <div class="ctrl-left">
          <div class="ctrl-name">Seconds on the clock</div>
          <div class="ctrl-hint">Timer resets for every new card</div>
        </div>
        <div class="ctrl-right">
          <button class="stepper-btn" @click="store.stepT(-5)">−</button>
          <div class="stepper-val">{{ store.secondsPerQ }}s</div>
          <button class="stepper-btn" @click="store.stepT(5)">+</button>
        </div>
      </div>
      <div class="pills">
        <div
          v-for="t in [15, 20, 30, 45, 60]"
          :key="t"
          :class="['pill', store.secondsPerQ === t ? 'on' : '']"
          @click="store.setTime(t)"
        >
          {{ t }}s
        </div>
      </div>
    </div>

    <div style="flex: 1"></div>
    <button class="btn-primary" @click="Startgame()">LET'S PLAY →</button>
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/gameStore";
import { useRouter } from "vue-router";
const store = useGameStore();
const router = useRouter();
function Startgame() {
  store.startGame();
  router.push("/ready");
}
</script>
