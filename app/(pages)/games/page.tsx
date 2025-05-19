// libs
import {
  apiKey,
  baseURL,
  slugToGamesId,
  slugToGamesQuery,
  getFilteredQueriesBySlug,
} from "@/app/lib/api";

// components
import HydratedGamesPage from "@/app/components/HydratedGamesPage";

/**
 * Generates the static paths for the dynamic `popular/[slug]` route.
 * Ensures that all slugs defined in `slugToQueryKey` are statically generated at build time.
 */
export async function generateStaticParams() {
  return Object.keys(slugToGamesId).map((slug) => ({ slug }));
}

/**
 * Dynamic Route: Renders a page of games filtered by category via slug.
 *
 * This route handles requests to `/popular/[slug]`, where `[slug]` is a dynamic
 * segment representing different game categories (e.g. 'best-of-the-year', 'popular-2024').
 *
 * Workflow:
 * 1. Extracts the `slug` from route parameters.
 * 2. Maps the slug to a query key using `slugToQueryKey` (e.g. 'all-stars' → 'allStars').
 * 3. Uses the query key to retrieve a date-filtered query string from `getFilteredQueriesBySlug`.
 *    - Example: 'all-stars' → `dates=2000-01-01,${currentDate}&ordering=-added&page_size=20`
 * 4. Constructs the full RAWG API URL for the selected category using the query string and API key.
 * 5. Passes the URL and slug to the `HydratedGamesPage` client component,
 *    where React Query will handle the actual data fetching and hydration.
 *
 * Notes:
 * - The `slug` param is typed as `URLSlug`, which maps to a known set of slugs via `slugToQueryKey`.
 * - Data is not prefetched here directly; instead, hydration is handled in the client component.
 *
 */

export default async function Home() {
  const slug = "trending";

  // mapped slug to query Key (eg 'allStars')
  const key = slugToGamesQuery[slug];

  // get the date filtered query string for returned key (eg `dates=2000-01-01,${currentDate}&ordering=-added&page_size=20`)
  const query = getFilteredQueriesBySlug[key];

  const url = `${baseURL}/games?${query}&key=${apiKey}`;

  return <HydratedGamesPage url={url} />;
}
