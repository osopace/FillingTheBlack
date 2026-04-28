import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Splash",
    component: () => import("../pages/SplashScreen.vue"),
  },
  {
    path: "/setup",
    name: "Setup",
    component: () => import("../pages/SetupScreen.vue"),
  },
  {
    path: "/ready",
    name: "Ready",
    component: () => import("../pages/ReadyScreen.vue"),
  },
  {
    path: "/game",
    name: "Game",
    component: () => import("../pages/GameScreen.vue"),
  },
  {
    path: "/roundend",
    name: "RoundEnd",
    component: () => import("../pages/RoundEnd.vue"),
  },
  {
    path: "/gameover",
    name: "GameOver",
    component: () => import("../pages/GameOver.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
