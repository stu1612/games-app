export const apiKey = process.env.NEXT_PUBLIC_API_KEY;
export const baseURL = "https://api.rawg.io/api";

// helper functions
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) return `0${month}`;
  else return month;
};

const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10) return `0${day}`;
  else return day;
};

// dynamic dates
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const today = new Date();

const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

const last30Days = new Date(new Date().setDate(today.getDate() - 30));
const next30Days = new Date(new Date().setDate(today.getDate() + 30));
const last7Days = new Date(new Date().setDate(today.getDate() - 7));
const next7Days = new Date(new Date().setDate(today.getDate() + 7));

const formattedLast30Days = last30Days.toISOString().slice(0, 10);
const formattedNext30Days = next30Days.toISOString().slice(0, 10);
const formattedLast7Days = last7Days.toISOString().slice(0, 10);
const formattedNext7Days = next7Days.toISOString().slice(0, 10);

export const getFilteredQueriesBySlug = {
  topFive: `dates=2000-01-01,${currentDate}&ordering=-added&page_size=5`,
  trending: `dates=${formattedLast7Days},${formattedNext7Days}&ordering=-added&page_size=20`,
  lastMonth: `dates=${formattedLast30Days},${currentDate}&ordering=-added&page_size=20`,
  thisWeek: `dates=${formattedLast7Days},${currentDate}&ordering=-added&page_size=10`,
  nextMonth: `dates=${currentDate},${formattedNext30Days}&ordering=-released&page_size=20`,
  bestOfTheYear: `dates=2025-01-01,${currentDate}&ordering=-rating&page_size=20`,
  popularLastYear: `dates=${lastYear},${currentDate}&ordering=-added&page_size=20`,
  allStars: `dates=2000-01-01,${currentDate}&ordering=-added&page_size=20`,
} as const;

export const slugToGamesQuery = {
  "top-five": { type: "trending", id: "topFive" },
  trending: { type: "trending", id: "trending" },
  "last-month": { type: "trending", id: "lastMonth" },
  "this-week": { type: "trending", id: "thisWeek" },
  "next-month": { type: "trending", id: "nextMonth" },
  "best-of-the-year": { type: "popular", id: "bestOfTheYear" },
  "popular-last-year": { type: "popular", id: "popularLastYear" },
  "all-stars": { type: "popular", id: "allStars" },
} as const;

export const slugToGamesId = {
  "playstation-5": { type: "platform", id: 187 },
  "xbox-one": { type: "platform", id: 1 },
  "nintendo-switch": { type: "platform", id: 7 },
  pc: { type: "platform", id: 4 },
  ios: { type: "platform", id: 3 },
  android: { type: "platform", id: 21 },
  macos: { type: "platform", id: 5 },
  linux: { type: "platform", id: 6 },
  action: { type: "genre", id: "action" },
  adventure: { type: "genre", id: "adventure" },
  arcade: { type: "genre", id: "arcade" },
  board_games: { type: "genre", id: "board-games" },
  card: { type: "genre", id: "card" },
  casual: { type: "genre", id: "casual" },
  educational: { type: "genre", id: "educational" },
  family: { type: "genre", id: "family" },
  fighting: { type: "genre", id: "fighting" },
  indie: { type: "genre", id: "indie" },
  massively_multiplayer: { type: "genre", id: "massively-multiplayer" },
  platformer: { type: "genre", id: "platformer" },
  puzzle: { type: "genre", id: "puzzle" },
  racing: { type: "genre", id: "racing" },
  rpg: { type: "genre", id: "role-playing-games-rpg" },
  "role-playing-games-rpg": { type: "genre", id: "role-playing-games-rpg" },
  shooter: { type: "genre", id: "shooter" },
  simulation: { type: "genre", id: "simulation" },
  sports: { type: "genre", id: "sports" },
  strategy: { type: "genre", id: "strategy" },
} as const;

export type GamesSlug = keyof typeof slugToGamesQuery;
export type GamesID = keyof typeof slugToGamesId;
