"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPopularGames } from "../lib/fetchGames";

export default function PopularGames() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["popularGames"],
    queryFn: fetchPopularGames,
  });

  if (isLoading) return <p>Loading games...</p>;
  if (isError) return <p>Something went wrong!</p>;

  const popularGames = data?.results.map((game: any) => game.name);

  return <div>{popularGames}</div>;
}
