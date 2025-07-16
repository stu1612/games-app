"use client";

// npm
import { useState } from "react";

// libs
import getPlatform from "@/app/lib/getPlatform";

// types
import { GameCardProps } from "@/app/types/games";

// components
import GameCardPanel from "./GameCardPanel";

export default function GameCard({ game }: GameCardProps) {
  // properties
  const [onHover, setOnHover] = useState(false);

  // methods
  const handleHover = () => {
    if (window.innerWidth < 760) return;
    else setOnHover((prev) => !prev);
  };

  return (
    <div
      className="rounded-2xl h-fit overflow-visible flex flex-col bg-zinc-800 relative hover:scale-105 "
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className="h-44 ">
        {game.background_image ? (
          <img
            src={game.background_image}
            alt={game.name}
            className="h-full w-full rounded-t-2xl object-cover"
          />
        ) : (
          <p>Image Not available</p>
        )}
      </div>
      <div className="pt-4 px-4 pb-8">
        <div className="flex flex-row ">
          {game.parent_platforms?.map((item, idx) => (
            <div className="h-5 w-5 mr-2" key={idx}>
              {getPlatform(item.platform.name)}
            </div>
          ))}
        </div>

        <h1 className="relative w-auto font-bold text-2xl mt-2 pr-12">
          {game.name}
        </h1>
        {onHover && <GameCardPanel game={game} />}
        <div className="block md:hidden">
          <GameCardPanel game={game} />
        </div>
      </div>
    </div>
  );
}
