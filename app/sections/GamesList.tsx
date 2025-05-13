"use client";

// npm
import Masonry from "react-masonry-css";

// components
import { GameCard } from "../components";

const breakpoints = {
  default: 4,
  1500: 3,
  1200: 2,
  980: 1,
};

type GamesProps = {
  games: {
    name: string;
  }[];
};

export default function GamesList({ games }: GamesProps) {
  // const gamesList = games?.map((game) => (
  //   <div key={game.name}>
  //     <p className="z-20 text-black">{game.name}</p>
  //   </div>
  // ));
  const gamesList = games?.map((game) => (
    <GameCard game={game} key={game.name} />
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
