<template>
  <div id="splash" class="screen active">
    <div class="splash-top">
      <div class="splash-badge">Word Guessing Game</div>
      <div class="logo-lockup">
        <div class="logo-line1">FILL IN THE</div>
        <div class="logo-line2">BLACK</div>
      </div>
    </div>

    <div class="splash-middle">
      <div class="mode-label">Choose your game mode</div>

      <div class="mode-card" @click="handleChangemode('remote')">
        <div class="mc-icon remote">
          <Wifi :size="24" :stroke-width="1.75" />
        </div>
        <div class="mc-text">
          <div class="mc-name">Remote Play</div>
          <div class="mc-desc">
            Playing over Zoom, Meet or any screen share — this mode is built for
            you.
          </div>
        </div>
        <ChevronRight class="mc-arrow" :size="20" :stroke-width="2" />
      </div>

      <div class="mode-card" @click="handleChangemode('local')">
        <div class="mc-icon local">
          <Users :size="24" :stroke-width="1.75" />
        </div>
        <div class="mc-text">
          <div class="mc-name">In The Room</div>
          <div class="mc-desc">
            Everyone's together in person? Classic game, no distractions.
          </div>
        </div>
        <ChevronRight class="mc-arrow" :size="20" :stroke-width="2" />
      </div>
    </div>

    <div class="splash-footer">
      Built for curious minds &amp; competitive spirits
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/game";
import { useRouter } from "vue-router";
import { Wifi, Users, ChevronRight } from "lucide-vue-next";
const router = useRouter();
const store = useGameStore();

function handleChangemode(mode) {
  store.selectMode(mode);
  router.push("/setup");
}
</script>
