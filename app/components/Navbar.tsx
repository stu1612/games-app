"use client";

// react
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

// components
import MobileSidebar from "./MobileSidebar";
import { fetchGameByQuery } from "../lib/fetchGames";
import { div } from "framer-motion/client";

export default function Navbar() {
  // state
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isQueried, setIsQueried] = useState(false);

  //voids
  const toggleMobileMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = "";
    input = event.target.value;
    setValue(input);
    console.log("search query:", input);
  };

  // query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["queriedGames", value],
    queryFn: () => fetchGameByQuery(value),
    staleTime: 1000 * 60 * 10,
  });

  console.log("data :", data);

  return (
    <div className="bg-green-500 relative w-full top-0 h-20 z-30 flex items-center justify-between p-4 ">
      <div className="flex flex-1 bg-red-400">Game Stop</div>
      <div className="w-[70vw] ">
        <form action="" className="">
          <input
            type="text"
            placeholder="Search"
            onChange={handleChange}
            className="bg-white w-full"
          />
          {value.length !== 0 ? (
            <div className=" bg-blue-400 absolute w-[70vw] h-auto p-4">
              <h4>Games</h4>
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
                  <h2 className="flex flex-wrap">{game.name}</h2>
                </div>
              ))}
            </div>
          ) : null}
        </form>
      </div>
      <button onClick={toggleMobileMenu} className="flex flex-1 bg-red-400">
        open
      </button>
      {isOpen && <MobileSidebar toggleMenu={toggleMobileMenu} />}
    </div>
  );
}
