<template>
  <div id="splash" class="screen active">
    <div class="splash-top">
      <div class="logo-lockup">
        <div class="logo-line1">FILL IN THE</div>
        <div class="logo-line2">BLACK</div>
      </div>
      <div class="logo-sub">The Word Guessing Game</div>
    </div>

    <div class="splash-middle">
      <div class="mode-label">Choose how you're playing</div>

      <div class="mode-card" @click="handleChangemode('remote')">
        <div class="mc-icon remote"><RadioTower w="6" h="6" /></div>
        <div class="mc-text">
          <div class="mc-name">Remote Play</div>
          <div class="mc-desc">
            Playing over Zoom, Meet or any screen share? This mode is built for
            you.
          </div>
        </div>
        <div class="mc-arrow">→</div>
      </div>

      <div class="mode-card" @click="handleChangemode('local')">
        <div class="mc-icon local"><Home w="6" h="6" /></div>
        <div class="mc-text">
          <div class="mc-name">In The Room</div>
          <div class="mc-desc">
            Everyone's together in person? Classic game, no distractions.
          </div>
        </div>
        <div class="mc-arrow">→</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/game";
import { useRouter } from "vue-router";
import { RadioTower, Home } from "lucide-vue-next";
const router = useRouter();
const store = useGameStore();

function handleChangemode(mode) {
  store.selectMode(mode);
  router.push("/setup");
}
</script>
