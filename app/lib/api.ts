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

// slug dates
export const topFiveFilters = {
  top_five: `dates=2000-01-01,${currentDate}&ordering=-added&page_size=5`,
};

export const releasedGameFilters = {
  last_month: `dates=${formattedLast30Days},${currentDate}&ordering=-added&page_size=20`,
  this_week: `dates=${formattedLast7Days},${currentDate}&ordering=-added&page_size=10`,
  next_month: `dates=${currentDate},${formattedNext30Days}&ordering=-released&page_size=20`,
} as const;

export const popularGameFilters = {
  best_of_the_year: `dates=2025-01-01,${currentDate}&ordering=-rating&page_size=20`,
  popular_in_2024: `dates=2024-01-01,2024-12-30&ordering=-added&page_size=20`,
  all_stars: `dates=2000-01-01,${currentDate}&ordering=-added&page_size=20`,
} as const;

export type releasesSlug = keyof typeof releasedGameFilters;
export type popularSlug = keyof typeof popularGameFilters;
export type topFiveSlug = keyof typeof topFiveFilters;
