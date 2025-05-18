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
// export const getTopFiveGames = {
//   top_five: `dates=2000-01-01,${currentDate}&ordering=-added&page_size=5`,
// };

// export const getReleasedGamesBySlug = {
//   last_month: `dates=${formattedLast30Days},${currentDate}&ordering=-added&page_size=20`,
//   this_week: `dates=${formattedLast7Days},${currentDate}&ordering=-added&page_size=10`,
//   next_month: `dates=${currentDate},${formattedNext30Days}&ordering=-released&page_size=20`,
// } as const;

// export const getPopularGamesBySlug = {
//   best_of_the_year: `dates=2025-01-01,${currentDate}&ordering=-rating&page_size=20`,
//   popular_last_year: `dates=${lastYear},${currentDate}&ordering=-added&page_size=20`,
//   all_stars: `dates=2000-01-01,${currentDate}&ordering=-added&page_size=20`,
// } as const;

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

// export type queriesBySlug = keyof typeof getFilteredQueriesBySlug;
export type URLSlug = keyof typeof slugToQueryKey;

// export type releasesSlug = keyof typeof getReleasedGamesBySlug;
// export type popularSlug = keyof typeof getPopularGamesBySlug;
// export type topFiveSlug = keyof typeof getTopFiveGames;
