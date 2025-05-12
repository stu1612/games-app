"use client";

import { useState } from "react";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
  // state
  const [isOpen, setIsOpen] = useState(false);

  //voids
  const toggleMobileMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-green-500 w-full fixed top-0 h-20 z-30 flex items-center justify-between p-4">
      <div>Game Stop</div>
      <div>Search</div>
      <button onClick={toggleMobileMenu}>open</button>
      {isOpen && <MobileSidebar toggleMenu={toggleMobileMenu} />}
    </div>
  );
}
