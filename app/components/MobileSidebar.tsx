"use client";

// npm
import { BsFillStopCircleFill } from "react-icons/bs";

import NavigationLinks from "./NavigationLinks";

type MobileSidebarProps = {
  toggleMenu: () => void;
};

export default function MobileSidebar({ toggleMenu }: MobileSidebarProps) {
  return (
    <div className="bg-zinc-800 w-[90%] p-4 fixed top-0 left-0 bottom-0 h-full overflow-y-scroll block md:hidden">
      <nav className="relative">
        <button className="absolute top-2 right-2" onClick={toggleMenu}>
          <BsFillStopCircleFill color="red" size={22} />
        </button>
        <NavigationLinks />
      </nav>
    </div>
  );
}
