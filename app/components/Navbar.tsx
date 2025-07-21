"use client";

// react
import { useState } from "react";

// components
import { MobileSidebar, SearchField } from "../components";

//npm
import { IoMdOpen } from "react-icons/io";

export default function Navbar() {
  // state
  const [isOpen, setIsOpen] = useState(false);

  //voids
  const toggleMobileMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-[#151515] relative w-full top-0 h-auto z-30 flex items-center justify-between px-4 md:px-8 py-4 ">
      <div className="flex flex-col lg:flex-row w-full gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl text-white whitespace-nowrap overflow-hidden">
            Ⓖⓐⓜⓔ Ⓢⓣⓞⓟ
          </h1>
        </div>
        <div className="flex w-full">
          <div className="flex flex-1 ">
            <SearchField />
          </div>
          <div className="flex md:hidden">
            <button onClick={toggleMobileMenu} className=" px-4">
              {isOpen ? null : <IoMdOpen color="green" size={28} />}
            </button>
            {isOpen && <MobileSidebar toggleMenu={toggleMobileMenu} />}
          </div>
        </div>
      </div>

      {/* <div className="flex flex-1">
        <SearchField />
      </div>
      <div className="flex flex-2">
        <button onClick={toggleMobileMenu} className=" bg-red-400">
          open
        </button>
      </div> */}
    </div>
  );
}
