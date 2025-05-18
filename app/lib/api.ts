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
  lastMonth: `dates=${formattedLast30Days},${currentDate}&ordering=-added&page_size=20`,
  thisWeek: `dates=${formattedLast7Days},${currentDate}&ordering=-added&page_size=10`,
  nextMonth: `dates=${currentDate},${formattedNext30Days}&ordering=-released&page_size=20`,
  bestOfTheYear: `dates=2025-01-01,${currentDate}&ordering=-rating&page_size=20`,
  popularLastYear: `dates=${lastYear},${currentDate}&ordering=-added&page_size=20`,
  allStars: `dates=2000-01-01,${currentDate}&ordering=-added&page_size=20`,
} as const;

export const slugToQueryKey = {
  "top-five": "topFive",
  "last-month": "lastMonth",
  "this-week": "thisWeek",
  "next-month": "nextMonth",
  "best-of-the-year": "bestOfTheYear",
  "popular-last-year": "popularLastYear",
  "all-stars": "allStars",
} as const;

export const slugToPlatformId = {
  "playstation-5": 187,
  "xbox-1": 1,
  "nintendo-switch": 7,
  pc: 4,
  ios: 3,
  android: 21,
  macos: 5,
  linux: 6,
} as const;

export type URLSlug = keyof typeof slugToQueryKey;
export type PlatformID = keyof typeof slugToPlatformId;
