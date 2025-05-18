// npm
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// libs
import {
  apiKey,
  baseURL,
  slugToQueryKey,
  URLSlug,
  getFilteredQueriesBySlug,
} from "@/app/lib/api";
import { fetchGamesFromAPI } from "@/app/lib/fetcher";

// components
import GamesList from "@/app/sections/GamesList";

/**
 * Generates the static paths for the dynamic `popular/[slug]` route.
 * Ensures that all slugs defined in `slugToQueryKey` are statically generated at build time.
 */
export async function generateStaticParams() {
  return Object.keys(slugToQueryKey).map((slug) => ({ slug }));
}

/**
 * Renders a page of popular games based on a dynamic category (slug).
 *
 * Workflow:
 * - Recieves a route slug ('best-of-the-year', 'popular-2024', 'all-stars')
 * - Maps the slug to a query key (e.g., 'bestOfTheYear') using `slugToQueryKey`
 * - Retrieves the actual query string from `getFilteredQueriesBySlug`
 * - EXAMPLE - if slug is 'all-stars' - it is mapped to the key 'allStars' via `slugToQueryKey`
 * - EXAMPLE - which then retrives query string `dates=2000-01-01,${currentDate}&ordering=-added&page_size=20`
 * - Constructs the RAWG API URL with query string
 * - Prefetches data on the server via React Query
 * - Wraps the client component in <HydrationBoundary> to hydrate data on the client
 */

export default async function ReleasedGames({
  params,
}: {
  params: { slug: URLSlug };
  // slug is type defined with URLSlug because
  // export type URLSlug = keyof typeof slugToQueryKey in lib/api.ts
  // contains all valid url slugs expected in app
}) {
  // tanstack code
  const queryClient = new QueryClient();

  // Destructured slug from route params (eg 'best-of-year')
  // next js says that await is not needed - but next docs explain it is required because its async function - if removed console will flag error
  const { slug } = await params;

  // Object literal map slug to query Key (eg 'lastMonth, nextMonth')
  const key = slugToQueryKey[slug];

  // get the date filtered query string for returned key (eg dates=${string},${string}&ordering=-added&page_size=20)
  const query = getFilteredQueriesBySlug[key];

  // construct api url string required to fetch dames
  const url = `${baseURL}/games?${query}&key=${apiKey}`;

  // TANSTACK : Prefetch game data on the server to enable hydration on the client
  await queryClient.prefetchQuery({
    queryKey: ["games", slug], // unique key 'games' keep the cache isolated to this request
    queryFn: () => fetchGamesFromAPI(url),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GamesList slug={slug} />
    </HydrationBoundary>
  );
}
