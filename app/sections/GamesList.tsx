// "use client";

// // npm
// import Masonry from "react-masonry-css";

// // components
// import { GameCard } from "../components";

// import { Game } from "../types/games";

// type GameListProps = {
//   games: Game[];
// };

// const breakpoints = {
//   default: 4,
//   1500: 3,
//   1200: 2,
//   980: 1,
// };

// export default function GamesList({ games }: GameListProps) {
//   const gamesList = games?.map((game) => (
//     <div key={game.name} className="card">
//       <GameCard game={game} />
//     </div>
//   ));
//   return (
//     <Masonry
//       breakpointCols={breakpoints}
//       className="my-masonry-grid"
//       columnClassName="my-masonry-grid_column"
//     >
//       {gamesList}
//     </Masonry>
//   );
// }

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchGamesFromAPI } from "../lib/fetcher";
import { getFilteredQueriesBySlug } from "../lib/api";
import { apiKey, baseURL } from "@/app/lib/api";
import Masonry from "react-masonry-css";

import { GameCard } from "../components";

import { Game } from "../types/games";

type GameListProps = {
  games: Game[];
};

const breakpoints = {
  default: 4,
  1500: 3,
  1200: 2,
  980: 1,
};

export default function GamesList(query: { query: string }) {
  const url = `${baseURL}/games?${query}&key=${apiKey}`;

  const { data: games, isLoading } = useQuery({
    queryKey: ["games", query],
    queryFn: () => fetchGamesFromAPI(url),
  });

  if (isLoading) return <p>Loading...</p>;

  const gamesList = games?.results.map((game: Game) => (
    <div key={game.name} className="card">
      <GameCard game={game} />
    </div>
  ));

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {gamesList}
    </Masonry>
  );
}
