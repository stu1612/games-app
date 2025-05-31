"use client";

import { useState } from "react";
import getPlatform from "../lib/getPlatform";
import Link from "next/link";
import { HiOutlineChevronRight } from "react-icons/hi";
import formatDate from "../utils/formatDate";
import { GameCardProps } from "../types/games";

import useStore from "../lib/store";

export default function GameCard({ game }: GameCardProps) {
  // properties
  const [onHover, setOnHover] = useState(false);
  const [gameId, setGameId] = useState(null);

  // methods
  const handleHover = () => {
    if (window.innerWidth < 760) return;
    else setOnHover((prev) => !prev);
  };

  return (
    <div
      className=" rounded-2xl h-fit overflow-visible flex flex-col bg-slate-200 cursor-pointer  relative"
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
          {game.name} - {game.id}
        </h1>
        {onHover && <GameContent game={game} />}
        <div className="block md:hidden">
          <GameContent game={game} />
        </div>
      </div>
    </div>
  );
}

function GameContent({ game }: GameCardProps) {
  const { updateId } = useStore();

  const genreLength = game.genres?.length;
  const genres = game.genres?.map((genre, idx) => (
    <small
      key={genre.id}
      className="mr-2 underline underline-offset-4 text-[10px]"
    >
      <Link href={`/games/${genre.slug}`}>{genre.name}</Link>
      {genreLength && idx < genreLength - 1 && ","}
    </small>
  ));

  return (
    <div className="flex flex-col w-full md:absolute bg-slate-200 md:left-0 z-10 px-4 pt-4 py-8 rounded-b-2xl">
      <div className="decoration-1 py-4 flex flex-row justify-between border-b-[0.5px] border-text border-zinc-500 border-solid w-full">
        <small className="text-zinc-500">Released Date: </small>
        <small>{formatDate(game.released)}</small>
      </div>

      <div className="decoration-1 py-4 flex flex-row justify-between items-center w-full">
        <small className="text-zinc-500">Genres:</small>
        <div className="flex flex-wrap justify-end gap-1">{genres}</div>
      </div>
      <Link
        href={{
          pathname: `/game/${game.slug}`,
        }}
      >
        <button
          onClick={() => updateId(game.id)}
          className="bg-[#ababab] py-3 rounded-md flex flex-row items-center justify-between w-full px-4"
        >
          <p className="text-sm">See Details</p>
          <HiOutlineChevronRight />
        </button>
      </Link>
    </div>
  );
}
