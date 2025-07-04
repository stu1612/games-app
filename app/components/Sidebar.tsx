"use client";

import NavLink from "../components/navigation/NavLink";
import Image from "next/image";

import { navLinks } from "../constants/navLinks";

export default function Sidebar() {
  const navigationLinks = navLinks.map((section) => (
    <ul className="flex flex-col items-start " key={section.title}>
      <h3 className="text-3xl font-bold py-4">{section.title}</h3>
      {section.links.map((link) => (
        <NavLink key={link.href} href={link.href}>
          <div className="flex flex-row items-center gap-2 pb-2 group">
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
                color="#18181B"
                className=" p-2 bg-[#52525B] rounded-xl group-hover:bg-white "
              />
            )}
            <p className="text-[1rem] font-medium ">{link.label}</p>
          </div>
        </NavLink>
      ))}
    </ul>
  ));
  return (
    <div className=" w-[300px] p-8 hidden md:block">
      <div className=" h-full">
        <nav>{navigationLinks}</nav>
      </div>
    </div>
  );
}
