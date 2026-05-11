<template>
  <div id="setup" class="screen active">
    <div class="setup-header">
      <button class="btn-back" @click="store.go('splash')">
        <ArrowLeft :size="18" :stroke-width="2" />
      </button>
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
          <div :class="['team-color-dot', store.TEAM_COLORS[team.colorIdx]]"></div>
          <input
            class="team-name-input"
            :value="team.name"
            placeholder="Team name"
            maxlength="18"
            @input="team.name = $event.target.value"
          />
          <button
            :class="['btn-remove-team', store.teams.length <= 2 ? 'disabled' : '']"
            @click="store.removeTeam(i)"
          >
            <Trash2 :size="15" :stroke-width="2" />
          </button>
        </div>
      </div>
      <button v-if="store.teams.length < 6" class="btn-add-team" @click="store.addTeam()">
        <Plus :size="16" :stroke-width="2.5" />
        Add another team
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
          <button class="stepper-btn" @click="store.stepQ(-1)">
            <Minus :size="16" :stroke-width="2.5" />
          </button>
          <div class="stepper-val">{{ store.questionsPerTeam }}</div>
          <button class="stepper-btn" @click="store.stepQ(1)">
            <Plus :size="16" :stroke-width="2.5" />
          </button>
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
          <button class="stepper-btn" @click="store.stepT(-5)">
            <Minus :size="16" :stroke-width="2.5" />
          </button>
          <div class="stepper-val">{{ store.secondsPerQ }}s</div>
          <button class="stepper-btn" @click="store.stepT(5)">
            <Plus :size="16" :stroke-width="2.5" />
          </button>
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
    <button class="btn-primary" @click="startGame()">
      LET'S PLAY
      <ChevronRight :size="22" :stroke-width="2.5" />
    </button>
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/game";
import { useRouter } from "vue-router";
import { ArrowLeft, Trash2, Plus, Minus, ChevronRight } from "lucide-vue-next";
const store = useGameStore();
const router = useRouter();
function startGame() {
  store.startGame();
  router.push("/ready");
}
</script>
