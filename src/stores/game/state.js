import { ref } from "vue";

// ══════════════════════════════
// CARD DATA
// ══════════════════════════════
export const ALL_CARDS = [
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

export const TEAM_COLORS = ["tc-0", "tc-1", "tc-2", "tc-3", "tc-4", "tc-5"];
export const CSS_COLORS = [
  "var(--gold)",
  "var(--ember)",
  "#27c96a",
  "#3a8ef6",
  "#c03af6",
  "#f63a7a",
];
export const DEFAULT_TEAM_NAMES = [
  "Team A",
  "Team B",
  "Team C",
  "Team D",
  "Team E",
  "Team F",
];

export function shuffleArr(a) {
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

// ══════════════════════════════
// STATE
// ══════════════════════════════
export const mode = ref("local");
export const teams = ref([
  { name: "Team A", score: 0, colorIdx: 0 },
  { name: "Team B", score: 0, colorIdx: 1 },
]);
export const questionsPerTeam = ref(10);
export const secondsPerQ = ref(30);
export const currentScreen = ref("splash");
export const currTeamIdx = ref(0);
export const roundScore = ref(0);
export const deck = ref([]);
export const cardIdx = ref(0);
export const questionsDoneThisTurn = ref(0);
export const timerInterval = ref(null);
export const timeLeft = ref(30);
export const totalTurns = ref(0);
export const isRevealed = ref(false);
export const history = ref([]);
export const delayTimeout = ref(null);
export const delayVisible = ref(false);
export const delayCount = ref(3);
export const delayWord = ref("");
export const actionsDisabled = ref(false);
export const flashClass = ref("");
export const toasts = ref([]);
