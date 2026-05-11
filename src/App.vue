<template>
  <!-- FLASH -->
  <div
    :class="['flash-layer', store.flashClass]"
    :style="
      store.flashClass
        ? { opacity: '1', transition: 'opacity 0.35s' }
        : { opacity: '0', transition: 'opacity 0.35s' }
    "
  ></div>

  <!-- TOASTS -->
  <div id="toasts">
    <div v-for="t in store.toasts" :key="t.id" class="toast">{{ t.msg }}</div>
  </div>

  <!-- DELAY OVERLAY -->
  <div :class="['delay-overlay', store.delayVisible ? 'show' : '']">
    <div class="delay-label">Next card in</div>
    <div class="delay-count">{{ store.delayCount }}</div>
    <div class="delay-word">{{ store.delayWord }}</div>
  </div>

  <!-- SCREENS -->
  <RouterView />
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useGameStore, initAudio } from "./stores/game";
import { getRestoredRoute } from "./stores/game/actions/persistence.js";

const store = useGameStore();
const router = useRouter();

onMounted(async () => {
  document.addEventListener("click", () => initAudio(), { once: true });

  const currentPath = router.currentRoute.value.path;

  // On /game reload: state is restored by loadGame(), just restart the timer
  if (currentPath === "/game" && store.deck.length > 0) {
    await store.resumeGame();
    return;
  }

  // On splash reload but there's a saved game: navigate back to it
  if (currentPath === "/") {
    const restoredRoute = getRestoredRoute();
    if (restoredRoute) {
      await router.replace(restoredRoute);
      if (restoredRoute === "/game") {
        await store.resumeGame();
      }
    }
  }
});
</script>
