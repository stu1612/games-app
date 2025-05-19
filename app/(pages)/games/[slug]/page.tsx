// libs
import { apiKey, baseURL, slugToGamesId, GamesID } from "@/app/lib/api";

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

export default async function Games({ params }: { params: { slug: GamesID } }) {
  // Destructured slug from route params (eg 'best-of-year')
  // next js says that await is not needed - but next docs explain it is required because its async function - if removed console will flag error
  const { slug } = await params;

  const platformId = slugToGamesId[slug];

  // WILL COME BACK TO THIS TO UPDATE SAFEGUEARDS FOR ALL FETCH REQUESTS
  if (!platformId) {
    throw new Error(`Unknown platform slug: ${slug}`);
  }

  // construct api url string required to fetch dames
  const param = platformId.type === "platform" ? "platforms" : "genres";
  const url = `${baseURL}/games?key=${apiKey}&${param}=${platformId.id}`;

  //   const url = `${baseURL}/games?key=${apiKey}&platforms=${platformId}`;
  //   const url = `${baseURL}/games?key=${apiKey}&genres=racing`;

  return <HydratedGamesPage url={url} slug={slug} param={param} />;
}
