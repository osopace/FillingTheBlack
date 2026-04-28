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
    <div class="delay-label">Next question in</div>
    <div class="delay-count">{{ store.delayCount }}</div>
    <div class="delay-word">{{ store.delayWord }}</div>
  </div>

  <!-- SCREENS -->
  <RouterView />
</template>

<script setup>
import { onMounted } from "vue";
import { useGameStore, initAudio } from "./stores/gameStore";

const store = useGameStore();

onMounted(() => {
  document.addEventListener("click", () => initAudio(), { once: true });
});
</script>
