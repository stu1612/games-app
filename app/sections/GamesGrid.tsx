"use client";

// npm
import { useQuery } from "@tanstack/react-query";
import Masonry from "react-masonry-css";

// libs
import { fetchGamesFromAPI } from "../lib/fetcher";
import {
  URLSlug,
  getFilteredQueriesBySlug,
  slugToQueryKey,
  apiKey,
  baseURL,
} from "../lib/api";

// utils
import { slugToString } from "../utils/slugToString";

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

/**
 * GamesList Component
 *
 * Displays a list of games fetched from the RAWG API based on the provided slug.
 * It uses React Query for data fetching and caching, and react-masonry-css
 * for a responsive, Pinterest-style grid layout.
 *
 * @param slug - A URLSlug that identifies the game category or filter to fetch.
 *
 * Workflow:
 * - Maps the `slug` to a query key using `slugToQueryKey`.
 * - Uses the query key to get the corresponding date-filtered query string from `getFilteredQueriesBySlug`.
 * - Constructs the API URL using the base URL, query string, and API key.
 * - Uses `useQuery` from React Query to fetch games from the API.
 * - Shows a loading state while data is being fetched.
 * - Maps over the fetched games and renders a `GameCard` for each inside a Masonry grid.
 * - Converts the slug to a readable string title using `slugToString` for display.
 *
 * @returns JSX element containing the title and a responsive masonry grid of game cards.
 */

export default function GamesGrid({
  title,
  url,
  queryKey,
}: {
  title: string;
  url: string;
  queryKey: string[];
}) {
  // map slug to query key (e.g. 'best-of-the-year' -> 'bestOfTheYear')
  // const key = slugToQueryKey[slug];

  // Retrieve the actual API query string for the selected filter
  // Example - bestOfTheYear: `dates=2025-01-01,${currentDate}&ordering=-rating&page_size=20`,
  // const query = getFilteredQueriesBySlug[key];

  // construct full RAWG api url to fetch popular games
  // const url = `${baseURL}/games?${query}&key=${apiKey}`;

  // Fetch games using React Query, keyed by ['games', slug] is important - do not replace 'games'
  const { data: games, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: () => fetchGamesFromAPI(url),
  });

  if (isLoading) return <p>Loading...</p>;

  // mapped fecthed games to render GameCards inside Masonry Grid
  const gamesList = games?.results.map((game: Game) => (
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
        {gamesList}
      </Masonry>
    </>
  );
}
