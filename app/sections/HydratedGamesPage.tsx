// npm
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// libs
import { fetchGamesFromAPI } from "../lib/fetchGames";

// components
import GamesGrid from "@/app/sections/GamesGrid";
import { slugToString } from "../utils/slugToString";

type PageProps = {
  url: string;
  slug?: string;
  param?: string;
};

/**
 * HydratedGamesPage — Server Component
 *
 * Purpose:
 * - Prefetches and hydrates game data on the server before rendering a client component.
 * - Uses TanStack React Query to fetch game data based on a dynamic slug (e.g., 'popular-2024').
 * - Wraps the client-side `GamesGrid` component in a <HydrationBoundary> to enable seamless hydration.
 *
 * Workflow:
 * 1. Receives props:
 *    - `slug`: dynamic route parameter (e.g., 'popular-2024', 'best-of-the-year')
 *    - `url`: fully constructed RAWG API URL for fetching game data
 *
 * 2. Uses a new `QueryClient` instance to prefetch data server-side with `queryClient.prefetchQuery(...)`.
 *
 * 3. Dehydrates the fetched state with `dehydrate(queryClient)` and passes it to `<HydrationBoundary>`.
 *
 * 4. Renders the client-side `GamesGrid` component inside the hydration boundary.
 *    - `GamesGrid` consumes the prehydrated data using `useQuery` with the same `queryKey`.
 *
 * Notes:
 * - This component is NOT marked with `"use client"`, so it runs exclusively on the server.
 * - This approach avoids redundant fetching on the client and enables instant display of content.
 * - Hydration relies on consistent `queryKey` usage between prefetch and client query.
 */

export default async function HydratedGamesPage(props: PageProps) {
  const { slug, url, param } = props;

  const queryClient = new QueryClient();

  // TANSTACK : Prefetch game data on the server to enable hydration on the client
  await queryClient.prefetchQuery({
    queryKey: ["games", slug], // unique key 'games' keep the cache isolated to this request
    queryFn: () => fetchGamesFromAPI(url),
  });

  const generateTitle = () => {
    if (slug && param === "genres") {
      return `${slugToString(slug)} Games`;
    } else if (slug && param === "platforms") {
      return `Games for ${slugToString(slug)}`;
    } else if (slug) return `${slugToString(slug)}`;
    else return "New and Trending Games";
  };

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GamesGrid
        title={generateTitle()}
        url={url}
        queryKey={["games", slug ?? "all"]}
      />
    </HydrationBoundary>
  );
}
