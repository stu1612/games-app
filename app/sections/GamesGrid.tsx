"use client";

// npm
import { useQuery } from "@tanstack/react-query";
import Masonry from "react-masonry-css";

// libs
import { fetchGamesFromAPI } from "../lib/fetcher";

// components
import { GameCard } from "../components";

// types
import { Game } from "../types/games";

/**
 * Responsive breakpoints for the Masonry grid - from docs.
 * Defines the number of columns for various viewport widths.
 */
const breakpoints = {
  default: 4,
  1500: 3,
  1200: 2,
  980: 1,
};

type GameProps = {
  title: string;
  url: string;
  queryKey: string[];
};

/**
 * GamesGrid Component
 *
 * Renders a grid of game cards based on the provided URL and query key.
 * This component is intended to run on the client and assumes data has already been prefetched
 * and hydrated using TanStack React Query's <HydrationBoundary>.
 *
 * Props:
 * - title (string): The title displayed above the grid (e.g., "Best of the Year").
 * - url (string): The API endpoint to fetch game data from. Must match the one used during server-side prefetch.
 * - queryKey (string[]): A unique query key for React Query (e.g., ['games', 'best-of-the-year']).
 *                        This key should match the one used in the server component to ensure proper hydration.
 *
 * Usage:
 * <GamesGrid
 *   title="Popular in 2024"
 *   url="https://api.rawg.io/api/games?dates=2024-01-01,2024-12-31&ordering=-added&page_size=20&key=YOUR_API_KEY"
 *   queryKey={['games', 'popular-2024']}
 * />
 *
 * Notes:
 * - This component relies on React Query's `useQuery()` hook to access hydrated data.
 * - If hydration is not present, it will fall back to fetching on the client.
 */

export default function GamesGrid({ title, url, queryKey }: GameProps) {
  const { data: games, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: () => fetchGamesFromAPI(url),
  });

  if (isLoading) return <p>Loading...</p>;

  const gamesGrid = games?.results.map((game: Game) => (
    <div key={game.name} className="card">
      <GameCard game={game} />
    </div>
  ));

  return (
    <>
      <div className="px-4">
        <h2 className="font-black text-6xl capitalize p-0 m-0">{title}</h2>
      </div>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {gamesGrid}
      </Masonry>
    </>
  );
}
