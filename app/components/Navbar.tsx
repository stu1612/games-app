"use client";

// react
import { useState } from "react";

// components
import { MobileSidebar, SearchField } from "../components";

export default function Navbar() {
  // state
  const [isOpen, setIsOpen] = useState(false);

  //voids
  const toggleMobileMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-[#151515] relative w-full top-0 h-20 z-30 flex items-center justify-between p-4 ">
      <div className="flex flex-1">
        <h1 className="text-5xl text-white">Game Stop</h1>
      </div>
      <SearchField />
      <button onClick={toggleMobileMenu} className="flex flex-1 bg-red-400">
        open
      </button>
      {isOpen && <MobileSidebar toggleMenu={toggleMobileMenu} />}
    </div>
  );
}
