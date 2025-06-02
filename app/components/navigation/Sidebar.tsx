"use client";

import NavLink from "./NavLink";
import Image from "next/image";

import { navLinks } from "../../constants/navLinks";

export default function Sidebar() {
  const navigationLinks = navLinks.map((section) => (
    <ul className="flex flex-col items-start" key={section.title}>
      <h3>{section.title}</h3>
      {section.links.map((link) => (
        <NavLink key={link.href} href={link.href}>
          <div className="flex flex-row items-center gap-2 pb-2">
            {link.icon ? (
              <Image
                alt={link.label}
                src={link.icon}
                height={40}
                width={40}
                className="object-cover"
              />
            ) : (
              <link.componentIcon
                size={"40px"}
                color="white"
                className="border-1 border-red-400 p-2 bg-black rounded-xl"
              />
            )}
            <p className="text-[1rem] font-bold">{link.label}</p>
          </div>
        </NavLink>
      ))}
    </ul>
  ));
  return (
    <div className="bg-red-500 w-[300px] p-8 hidden md:block">
      <div className="bg-white h-full">
        <nav>{navigationLinks}</nav>
      </div>
    </div>
  );
}
