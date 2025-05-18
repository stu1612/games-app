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
import { getFilteredQueriesBySlug, queriesBySlug } from "../lib/api";
import { apiKey, baseURL } from "@/app/lib/api";
import Masonry from "react-masonry-css";

import { GameCard } from "../components";

import { Game } from "../types/games";
import { slugToString } from "../utils/slugToString";

const breakpoints = {
  default: 4,
  1500: 3,
  1200: 2,
  980: 1,
};

export default function GamesList({ slug }: { slug: queriesBySlug }) {
  const query = getFilteredQueriesBySlug[slug];
  const url = `${baseURL}/games?${query}&key=${apiKey}`;

  const { data: games, isLoading } = useQuery({
    queryKey: ["games", slug],
    queryFn: () => fetchGamesFromAPI(url),
  });

  if (isLoading) return <p>Loading...</p>;

  const gamesList = games?.results.map((game: Game) => (
    <div key={game.name} className="card">
      <GameCard game={game} />
    </div>
  ));

  return (
    <>
      <div className="px-4">
        <h2 className="font-black text-6xl capitalize p-0 m-0">
          {slugToString(slug)}
        </h2>
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
