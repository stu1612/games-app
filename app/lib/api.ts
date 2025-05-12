export const apiKey = process.env.NEXT_PUBLIC_API_KEY;
export const baseURL = "https://api.rawg.io/api";

// slug dates

export const releasedGameFilters = {
  last_30: `dates=2024-04-12,2024-05-12&ordering=-added`,
  this_week: `dates=2024-05-06,2024-05-12&ordering=-added`,
  last_week: `dates=2024-04-29,2024-05-05&ordering=-added`,
} as const;

export type releasesSlug = keyof typeof releasedGameFilters;
