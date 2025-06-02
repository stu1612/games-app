"use client";

// react
import { useState } from "react";

// components
import MobileSidebar from "./MobileSidebar";
import SearchBar from "./SearchField";

export default function Navbar() {
  // state
  const [isOpen, setIsOpen] = useState(false);

  //voids
  const toggleMobileMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-green-500 relative w-full top-0 h-20 z-30 flex items-center justify-between p-4 ">
      <div className="flex flex-1 bg-red-400">Game Stop</div>
      <SearchBar />
      <button onClick={toggleMobileMenu} className="flex flex-1 bg-red-400">
        open
      </button>
      {isOpen && <MobileSidebar toggleMenu={toggleMobileMenu} />}
    </div>
  );
}
