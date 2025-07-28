// libs
import {
  apiKey,
  baseURL,
  // slugToGamesId,
  GamesSlug,
  getFilteredQueriesBySlug,
  slugToGamesQuery,
} from "@/app/lib/api";

// components
import HydratedGamesPage from "@/app/sections/HydratedGamesPage";

/**
 * Generates the static paths for the dynamic `discover/[slug]` route.
 * Ensures that all slugs defined in `slugToQueryKey` are statically generated at build time.
 */
// export async function generateStaticParams() {
//   return Object.keys(slugToGamesId).map((slug) => ({ slug }));
// }
export async function generateStaticParams() {
  return Object.keys(slugToGamesQuery).map((slug) => ({ slug }));
}

/**
 * Dynamic Route: Renders a page of games filtered by category via slug.
 *
 * This route handles requests to `/discover/[slug]`, where `[slug]` is a dynamic
 * segment representing different game categories (e.g. 'best-of-the-year', 'popular-2024').
 * All slugs for released and popular games will be rendered in discover folder
 *
 * Workflow:
 * 1. Extracts the `slug` from route parameters.
 * 2. Maps the slug to a query key using `slugToGamesQuery` (e.g. 'all-stars' → 'allStars').
 * 3. Uses the query key to retrieve a date-filtered query string from `getFilteredQueriesBySlug`.
 *    - Example: 'all-stars' → `dates=2000-01-01,${currentDate}&ordering=-added&page_size=20`
 * 4. Constructs the full RAWG API URL for the selected category using the query string and API key.
 * 5. Passes the URL and slug to the `HydratedGamesPage` client component,
 *    where React Query will handle the actual data fetching and hydration.
 *
 * Notes:
 * - The `slug` param is typed as `GamesSlug`, which maps to a known set of slugs via `slugToGamesQuery`.
 * - Data is not prefetched here directly; instead, hydration is handled in the client component - HydratedGamesPage
 *
 */

export default function Discover({ params }: { params: { slug: GamesSlug } }) {
  // Destructured slug from route params (eg 'best-of-year, 'last-week')
  // IDE says that await is not needed - but its async method and it's in next js docs
  const { slug } = params;

  // mapped slug to query Key (eg 'allStars')
  const key = slugToGamesQuery[slug];

  // get the date filtered query string for returned key (eg `dates=2000-01-01,${currentDate}&ordering=-added&page_size=20`)
  const query = getFilteredQueriesBySlug[key.id];

  // construct api url string required to fetch dames
  const url = `${baseURL}/games?${query}&key=${apiKey}`;

  return <HydratedGamesPage url={url} slug={slug} />;
}
