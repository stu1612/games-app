"use client";

// npm
import Masonry from "react-masonry-css";

// components
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

export default function GamesList({ games }: GameListProps) {
  const gamesList = games?.map((game) => (
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
