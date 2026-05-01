export const GAMES_CATALOG = [
  {
    id: 1,
    key: "fast_tap",
    title: "Fast Tap",
    description: "Tap the target as fast as you can",
    available: true,
    image: makePlaceholder("Fast Tap", "#f97316"),
  },
  {
    id: 2,
    key: "guess_sound",
    title: "Guess The Sound",
    description: "Will be available soon",
    available: false,
    image: makePlaceholder("Guess The Sound", "#06b6d4"),
  },
  {
    id: 3,
    key: "memory_match",
    title: "Memory Match",
    description: "Will be available soon",
    available: false,
    image: makePlaceholder("Memory Match", "#7c3aed"),
  },
  {
    id: 4,
    key: "reaction_race",
    title: "Reaction Race",
    description: "Will be available soon",
    available: false,
    image: makePlaceholder("Reaction Race", "#ef4444"),
  },
  {
    id: 5,
    key: "trivia_blitz",
    title: "Trivia Blitz",
    description: "Will be available soon",
    available: false,
    image: makePlaceholder("Trivia Blitz", "#10b981"),
  },
  {
    id: 6,
    key: "balance_act",
    title: "Balance Act",
    description: "Will be available soon",
    available: false,
    image: makePlaceholder("Balance Act", "#3b82f6"),
  },
];

export const AVAILABLE_GAME_IDS = GAMES_CATALOG.filter((g) => g.available).map(
  (g) => g.id,
);

export const getGameById = (id) => GAMES_CATALOG.find((g) => g.id === id);

function makePlaceholder(title, color) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800'><rect width='100%' height='100%' fill='${color}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='36' fill='white' font-family='Arial'>${title}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
