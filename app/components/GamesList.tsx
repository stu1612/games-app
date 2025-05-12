import React from "react";

type GamesProps = {
  games: {
    name: string;
  }[];
};

export default function GamesList({ games }: GamesProps) {
  const gamesList = games?.map((game) => (
    <div key={game.name}>
      <p className="z-20 text-white">{game.name}</p>
    </div>
  ));
  return <div className="w-full">{gamesList}</div>;
}
