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
import GamesGrid from "@/app/sections/GamesGrid";
import { slugToString } from "../utils/slugToString";

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

type PageProps = {
  url: string;
  slug: string;
};

export default async function HydratedGamesPage(props: PageProps) {
  const { slug, url } = props;
  const queryClient = new QueryClient();

  // TANSTACK : Prefetch game data on the server to enable hydration on the client
  await queryClient.prefetchQuery({
    queryKey: ["games", slug], // unique key 'games' keep the cache isolated to this request
    queryFn: () => fetchGamesFromAPI(url),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GamesGrid
        title={slugToString(slug)}
        url={url}
        queryKey={["games", slug]}
      />
    </HydrationBoundary>
  );
}
