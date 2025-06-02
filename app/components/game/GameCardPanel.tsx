// npm
import { HiOutlineChevronRight } from "react-icons/hi";

// types
import { GameCardProps } from "@/app/types/games";

// hooks
import useGameIdUpdater from "@/app/hooks/useGameIdUpdater";

// utils
import formatDate from "@/app/utils/formatDate";

// components
import GameLink from "./GameLink";
import GameCardGenres from "./GameCardGenres";

export default function GameCardPanel({ game }: GameCardProps) {
  // initiate custom hook
  const updateGameId = useGameIdUpdater();

  return (
    <div className="flex flex-col w-full md:absolute bg-zinc-800 md:left-0 z-10 px-4 pt-4 py-8 rounded-b-2xl">
      <div className="decoration-1 py-4 flex flex-row justify-between border-b-[0.5px] border-text border-zinc-500 border-solid w-full">
        <small className="text-zinc-500">Released Date: </small>
        <small>{formatDate(game.released)}</small>
      </div>

      <div className="decoration-1 py-4 flex flex-row justify-between items-center w-full">
        <small className="text-zinc-500">Genres:</small>
        <div className="flex flex-wrap justify-end gap-1">
          <GameCardGenres game={game} />
        </div>
      </div>

      <GameLink game={game}>
        <button
          onClick={() => updateGameId(game.id)}
          className="bg-zinc-700 py-3 rounded-md flex flex-row items-center justify-between w-full px-4 cursor-pointer group"
        >
          <p className="text-sm group-hover:text-amber-200">See Details</p>
          <HiOutlineChevronRight />
        </button>
      </GameLink>
    </div>
  );
}
