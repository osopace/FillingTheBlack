import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// ══════════════════════════════
// CARD DATA
// ══════════════════════════════
const ALL_CARDS = [
  {
    word: "BUDGET",
    hints: ["Money", "Financial", "Economy", "Rental", "Savings"],
  },
  {
    word: "ANCESTRY.COM",
    hints: ["DNA", "Heritage", "Lineage", "Family", "Adoption"],
  },
  {
    word: "ANGELIQUE KIDJO",
    hints: ["Grammy", "Legend", "Benin", "Agolo", "Lombo"],
  },
  {
    word: "DANGOTE",
    hints: ["Billionaire", "Cement", "Monopoly", "Money", "Africa"],
  },
  {
    word: "CHIMAMANDA ADICHIE",
    hints: ["Nigerian", "Feminist", "Author", "Americanah", "Story"],
  },
  {
    word: "ANTHONY JOSHUA",
    hints: ["Boxer", "Heavyweight", "Champion", "British", "Nigeria"],
  },
  {
    word: "STEVIE WONDER",
    hints: ["Musician", "Piano", "Blind", "Legend", "Birthday"],
  },
  {
    word: "BRAZIL",
    hints: ["Redeemer", "Carnival", "Football", "Samba", "World"],
  },
  {
    word: "AIRPLANE",
    hints: ["Flight", "Travel", "Pilot", "Airport", "Wings"],
  },
  {
    word: "STEVE HARVEY",
    hints: ["Comedian", "Feud", "Moustache", "Bald", "Harvey"],
  },
  {
    word: "ANIME",
    hints: ["Japanese", "Cartoon", "Animation", "Manga", "Art"],
  },
  {
    word: "BRAIDS",
    hints: ["Cornrows", "Twists", "Hair", "Professional", "Extensions"],
  },
  {
    word: "DAVIDO",
    hints: ["Chioma", "Assurance", "Fall", "Nigerian", "Artist"],
  },
  {
    word: "FACEBOOK",
    hints: ["Zuckerberg", "Data", "Social", "Media", "Friends"],
  },
  {
    word: "GAME OF THRONES",
    hints: ["Dragons", "Stark", "Snow", "HBO", "Thrones"],
  },
  {
    word: "ENTREPRENEUR",
    hints: ["Owner", "Business", "CEO", "Founder", "Startup"],
  },
  {
    word: "FREEDOM",
    hints: ["Independence", "Bondage", "War", "Activism", "Colonization"],
  },
  { word: "AFRO", hints: ["Natural", "Hair", "Black", "African", "Pride"] },
  {
    word: "COUSINS",
    hints: ["Annoying", "Family", "Friends", "Uncles", "Aunties"],
  },
  { word: "DISNEY", hints: ["Children", "Walt", "Land", "World", "Mickey"] },
  {
    word: "FRIED CHICKEN",
    hints: ["Chips", "Delicious", "KFC", "Soul", "Oil"],
  },
  {
    word: "DJ",
    hints: ["Dance", "Tables", "Party", "Mixing", "Entertainment"],
  },
  {
    word: "DREADLOCKS",
    hints: ["Rastafarian", "Reggae", "Marley", "Dada", "Locs"],
  },
  { word: "GHANA", hints: ["Accra", "Gold", "Nkrumah", "Star", "Chale"] },
  {
    word: "ANCESTORS",
    hints: ["Tradition", "Survivors", "Fighters", "Sacrifice", "Slave"],
  },
  { word: "BEYONCE", hints: ["Queen", "Singer", "Lemonade", "Hive", "Jay-Z"] },
  {
    word: "ALBINO",
    hints: ["Freckles", "Blonde", "Skin", "Melanin", "Pigment"],
  },
  {
    word: "WIZKID",
    hints: ["Starboy", "Davido", "Musician", "Nigerian", "Grammy"],
  },
  {
    word: "CINEMA",
    hints: ["Movies", "Theatre", "Popcorn", "Films", "Screen"],
  },
  {
    word: "CO-FOUNDER",
    hints: ["Partner", "Innovation", "CEO", "Startup", "Business"],
  },
  { word: "ENGLAND", hints: ["UK", "Queen", "Prince", "Accent", "Colonial"] },
  {
    word: "CHURCH",
    hints: ["Pastor", "Worship", "Usher", "Offering", "Sunday"],
  },
  {
    word: "CHOIR",
    hints: ["Singing", "Soprano", "Uniforms", "Harmony", "Church"],
  },
  { word: "CHARGER", hints: ["Phone", "Socket", "Plug", "Power", "Juice"] },
  { word: "BASKETBALL", hints: ["James", "Bryant", "NBA", "Hoops", "Jordan"] },
  { word: "CHRISTMAS", hints: ["Jesus", "December", "Tree", "Santa", "Gifts"] },
  {
    word: "BOB MARLEY",
    hints: ["Dreadlocks", "Reggae", "Jamaica", "Legend", "Peace"],
  },
  { word: "DUBAI", hints: ["UAE", "Khalifa", "Desert", "Luxury", "Gold"] },
  {
    word: "EGYPT",
    hints: ["Salah", "Mummies", "Pharaoh", "Pyramids", "Cairo"],
  },
  {
    word: "FELA KUTI",
    hints: ["Musician", "Activist", "Shrine", "Seun", "Femi"],
  },
  {
    word: "ARTIFICIAL INTELLIGENCE",
    hints: ["Computer", "Robots", "Technology", "Smart", "Machines"],
  },
  {
    word: "DBANJ",
    hints: ["Kokomaster", "Jozzy", "Tongolo", "Legacy", "Entertainer"],
  },
  {
    word: "JOLLOF RICE",
    hints: ["Ghana", "Nigeria", "Plantain", "Wars", "Chicken"],
  },
  {
    word: "COMICS",
    hints: ["Avengers", "Heroes", "Marvel", "DC", "Illustrations"],
  },
  { word: "GOOGLE", hints: ["Gmail", "Search", "Youtube", "Maps", "Internet"] },
  {
    word: "AKON",
    hints: ["Senegalese", "Convict", "Music", "Locked", "Lonely"],
  },
  { word: "CASINO", hints: ["Gambling", "Betting", "Poker", "Vegas", "Money"] },
];

const TEAM_COLORS = ["tc-0", "tc-1", "tc-2", "tc-3", "tc-4", "tc-5"];
const CSS_COLORS = [
  "var(--gold)",
  "var(--ember)",
  "#27c96a",
  "#3a8ef6",
  "#c03af6",
  "#f63a7a",
];
const DEFAULT_TEAM_NAMES = [
  "Team A",
  "Team B",
  "Team C",
  "Team D",
  "Team E",
  "Team F",
];

function shuffleArr(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ══════════════════════════════
// AUDIO ENGINE
// ══════════════════════════════
let ctx = null;
function initCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
}
function playTone(f, t, d, v = 0.25) {
  try {
    initCtx();
    const o = ctx.createOscillator(),
      g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.type = t;
    o.frequency.value = f;
    g.gain.setValueAtTime(v, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d);
    o.start();
    o.stop(ctx.currentTime + d);
  } catch (e) {}
}
export const sfx = {
  ok: () => {
    playTone(523, "sine", 0.08, 0.22);
    setTimeout(() => playTone(659, "sine", 0.1, 0.25), 70);
    setTimeout(() => playTone(784, "sine", 0.22, 0.28), 140);
  },
  pass: () => {
    playTone(330, "triangle", 0.1, 0.18);
    setTimeout(() => playTone(220, "triangle", 0.18, 0.14), 80);
  },
  tick: () => playTone(900, "square", 0.04, 0.08),
  end: () =>
    [200, 160, 120].forEach((f, i) =>
      setTimeout(() => playTone(f, "sawtooth", 0.15, 0.28), i * 90),
    ),
  win: () =>
    [523, 659, 784, 1047].forEach((f, i) =>
      setTimeout(() => playTone(f, "sine", 0.3, 0.28), i * 100),
    ),
  reveal: () => {
    playTone(440, "sine", 0.06, 0.2);
    setTimeout(() => playTone(660, "sine", 0.15, 0.25), 60);
  },
};
export function initAudio() {
  initCtx();
}

export { TEAM_COLORS, CSS_COLORS, DEFAULT_TEAM_NAMES, shuffleArr, ALL_CARDS };

// ══════════════════════════════
// PINIA STORE
// ══════════════════════════════
export const useGameStore = defineStore("game", () => {
  // ── Config ──
  const mode = ref("local"); // 'local' | 'remote'
  const teams = ref([
    { name: "Team A", score: 0, colorIdx: 0 },
    { name: "Team B", score: 0, colorIdx: 1 },
  ]);
  const questionsPerTeam = ref(10);
  const secondsPerQ = ref(30);

  // ── Runtime ──
  const currentScreen = ref("splash");
  const currTeamIdx = ref(0);
  const roundScore = ref(0);
  const deck = ref([]);
  const cardIdx = ref(0);
  const questionsDoneThisTurn = ref(0);
  const timerInterval = ref(null);
  const timeLeft = ref(30);
  const totalTurns = ref(0);
  const isRevealed = ref(false);
  const history = ref([]);
  const delayTimeout = ref(null);
  const delayVisible = ref(false);
  const delayCount = ref(3);
  const delayWord = ref("");
  const actionsDisabled = ref(false);
  const flashClass = ref("");
  const toasts = ref([]);

  // ── Computed ──
  const currentTeam = computed(() => teams.value[currTeamIdx.value]);
  const currentCard = computed(() => deck.value[cardIdx.value] || null);
  const leaderTeam = computed(
    () => [...teams.value].sort((a, b) => b.score - a.score)[0],
  );
  const sortedTeams = computed(() =>
    [...teams.value]
      .map((t, i) => ({ ...t, idx: i }))
      .sort((a, b) => b.score - a.score),
  );
  const progressPct = computed(
    () => (questionsDoneThisTurn.value / questionsPerTeam.value) * 100,
  );
  const timerColor = computed(() => {
    const pct = timeLeft.value / secondsPerQ.value;
    return pct > 0.45
      ? "var(--gold)"
      : pct > 0.22
        ? "var(--ember)"
        : "var(--red)";
  });
  const timerOffset = computed(() => {
    const pct = timeLeft.value / secondsPerQ.value;
    return 175.9 * (1 - pct);
  });

  // ── Navigation ──

  // ── Toast ──
  function showToast(msg, dur = 2200) {
    const id = Date.now();
    toasts.value.push({ id, msg });
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, dur);
  }

  // ── Flash ──
  function flash(type) {
    flashClass.value = type;
    setTimeout(() => {
      flashClass.value = "";
    }, 460);
  }

  // ── Mode select ──
  function selectMode(m) {
    mode.value = m;
  }

  // ── Team management ──
  function addTeam() {
    if (teams.value.length >= 6) {
      showToast("Max 6 teams!");
      return;
    }
    const idx = teams.value.length;
    teams.value.push({
      name: DEFAULT_TEAM_NAMES[idx] || `Team ${idx + 1}`,
      score: 0,
      colorIdx: idx,
    });
  }

  function removeTeam(i) {
    if (teams.value.length <= 2) {
      showToast("Minimum 2 teams");
      return;
    }
    teams.value.splice(i, 1);
    teams.value.forEach((t, i2) => (t.colorIdx = i2));
  }

  function stepQ(d) {
    questionsPerTeam.value = Math.max(
      3,
      Math.min(25, questionsPerTeam.value + d),
    );
  }
  function stepT(d) {
    secondsPerQ.value = Math.max(10, Math.min(60, secondsPerQ.value + d));
  }
  function setTime(v) {
    secondsPerQ.value = v;
  }

  // ── Game start ──
  function startGame() {
    teams.value.forEach((t) => (t.score = 0));
    currTeamIdx.value = 0;
    totalTurns.value = 0;
    deck.value = shuffleArr([...ALL_CARDS]);
    cardIdx.value = 0;
  }

  // ── Turn flow ──
  function beginTurn() {
    roundScore.value = 0;
    questionsDoneThisTurn.value = 0;
    isRevealed.value = false;
    history.value = [];
    timeLeft.value = secondsPerQ.value;
    startTimer();
  }

  function revealAnswer() {
    if (isRevealed.value) return;
    isRevealed.value = true;
    sfx.reveal();
  }

  function doCorrect() {
    sfx.ok();
    flash("green");
    teams.value[currTeamIdx.value].score++;
    roundScore.value++;
    if (mode.value === "remote") {
      revealAnswer();
      advanceAfterDelay(true);
    } else {
      advanceCard();
    }
  }

  function doPass() {
    sfx.pass();
    flash("red");
    if (mode.value === "remote") {
      advanceAfterDelay(false);
    } else {
      advanceCard();
    }
  }

  function advanceAfterDelay(wasCorrect) {
    actionsDisabled.value = true;
    clearInterval(timerInterval.value);
    let countdown = 3;
    const card = deck.value[cardIdx.value];
    delayCount.value = countdown;
    delayWord.value = wasCorrect ? "✓ " + card.word : "↷ Skipped";
    delayVisible.value = true;

    delayTimeout.value = setInterval(() => {
      countdown--;
      delayCount.value = countdown;
      if (countdown <= 0) {
        clearInterval(delayTimeout.value);
        delayVisible.value = false;
        actionsDisabled.value = false;
        advanceCard();
      }
    }, 1000);
  }

  function advanceCard() {
    history.value.push(cardIdx.value);
    cardIdx.value++;
    questionsDoneThisTurn.value++;
    if (cardIdx.value >= deck.value.length) {
      deck.value = shuffleArr([...ALL_CARDS]);
      cardIdx.value = 0;
    }
    if (questionsDoneThisTurn.value >= questionsPerTeam.value) {
      endTurn();
      return;
    }
    isRevealed.value = false;
    timeLeft.value = secondsPerQ.value;
    startTimer();
  }

  function prevCard() {
    if (history.value.length === 0) {
      showToast("No previous card");
      return;
    }
    clearInterval(timerInterval.value);
    clearInterval(delayTimeout.value);
    delayVisible.value = false;
    actionsDisabled.value = false;
    cardIdx.value = history.value.pop();
    if (questionsDoneThisTurn.value > 0) questionsDoneThisTurn.value--;
    isRevealed.value = false;
    timeLeft.value = secondsPerQ.value;
    startTimer();
  }

  // ── Timer ──
  function startTimer() {
    clearInterval(timerInterval.value);
    timerInterval.value = setInterval(() => {
      timeLeft.value--;
      if (timeLeft.value <= 5 && timeLeft.value > 0) sfx.tick();
      if (timeLeft.value <= 0) {
        clearInterval(timerInterval.value);
        sfx.end();
        if (mode.value === "remote") {
          advanceAfterDelay(false);
        } else {
          advanceCard();
        }
      }
    }, 1000);
  }

  // ── End turn ──
  function endTurn() {
    clearInterval(timerInterval.value);
    totalTurns.value++;
    go("roundend");
  }

  function nextTeamTurn() {
    const nextIdx = (currTeamIdx.value + 1) % teams.value.length;
    currTeamIdx.value = nextIdx;
    go("ready");
  }

  function showGameOver() {
    go("gameover");
  }

  function playAgain() {
    teams.value.forEach((t) => (t.score = 0));
    currTeamIdx.value = 0;
    totalTurns.value = 0;
    deck.value = shuffleArr([...ALL_CARDS]);
    cardIdx.value = 0;
    go("ready");
  }

  return {
    mode,
    teams,
    questionsPerTeam,
    secondsPerQ,
    currentScreen,
    currTeamIdx,
    roundScore,
    deck,
    cardIdx,
    questionsDoneThisTurn,
    timeLeft,
    totalTurns,
    isRevealed,
    history,
    delayVisible,
    delayCount,
    delayWord,
    actionsDisabled,
    flashClass,
    toasts,
    currentTeam,
    currentCard,
    leaderTeam,
    sortedTeams,
    progressPct,
    timerColor,
    timerOffset,

    showToast,
    flash,
    selectMode,
    addTeam,
    removeTeam,
    stepQ,
    stepT,
    setTime,
    startGame,
    beginTurn,
    revealAnswer,
    doCorrect,
    doPass,
    prevCard,
    advanceCard,
    startTimer,
    endTurn,
    nextTeamTurn,
    showGameOver,
    playAgain,
    TEAM_COLORS,
    CSS_COLORS,
  };
});
