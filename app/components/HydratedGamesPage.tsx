// npm
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// libs
import { fetchGamesFromAPI } from "@/app/lib/fetcher";

// components
import GamesGrid from "@/app/sections/GamesGrid";
import { slugToString } from "../utils/slugToString";

type PageProps = {
  url: string;
  slug: string;
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
