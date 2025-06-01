"use client";

// react
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// components
import MobileSidebar from "./MobileSidebar";
import { fetchGameByQuery } from "../lib/fetchGames";

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
    setValue(input); // updates state
    console.log("search query:", input); // use the actual up-to-date input
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
          <div className=" bg-blue-400 absolute w-[70vw] h-screen">
            some content
          </div>
        </form>
      </div>
      <button onClick={toggleMobileMenu} className="flex flex-1 bg-red-400">
        open
      </button>
      {isOpen && <MobileSidebar toggleMenu={toggleMobileMenu} />}
    </div>
  );
}
