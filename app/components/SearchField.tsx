"use client";

// react
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { fetchGameByQuery } from "../lib/fetchGames";
import GameLink from "./GameLink";

import useGameIdUpdater from "../hooks/useGameIdUpdater";

// npm
import { MdOutlineSwipe } from "react-icons/md";

export default function SearchField() {
  const [value, setValue] = useState("");

  const updateGameId = useGameIdUpdater();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleResetForm = () => {
    setValue("");
  };

  // query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["queriedGames", value],
    queryFn: () => fetchGameByQuery(value),
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div className="w-full">
      <form className="w-full h-full">
        <input
          type="text"
          value={value}
          placeholder="Search games"
          onChange={handleChange}
          onSubmit={(e) => e.preventDefault()}
          className="bg-white w-full h-full text-black px-4 rounded-2xl focus:outline-hidden"
        />
        {value.length !== 0 ? (
          <div className="bg-zinc-700 absolute w-[70vw] h-auto p-4 mt-2">
            <div className="flex justify-between">
              <h4 className="text-2xl md:text-3xl font-bold py-4">Games</h4>
              <button onClick={handleResetForm}>
                <MdOutlineSwipe color="yellow" size={28} />
              </button>
            </div>
            {data?.results.map((game: any) => (
              <div
                className="flex flex-row items-center gap-4 pb-8"
                key={game.id}
              >
                {game?.background_image ? (
                  <Image
                    alt={game.name}
                    src={game.background_image}
                    height={500}
                    width={500}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "16px",
                    }}
                  />
                ) : null}
                <GameLink game={game}>
                  <h2
                    className="flex flex-wrap"
                    onClick={() => updateGameId(game.id)}
                  >
                    {game.name}
                  </h2>
                </GameLink>
              </div>
            ))}
          </div>
        ) : null}
      </form>
    </div>
  );
}
