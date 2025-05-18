"use client";

import NavLink from "./NavLink";

import { navLinks } from "../constants/navLinks";

export default function Sidebar() {
  const navigationLinks = navLinks.map((section) => (
    <ul className="flex flex-col items-start" key={section.title}>
      <h3>{section.title}</h3>
      {section.links.map((link) => (
        <NavLink key={link.href} href={link.href}>
          {link.label}
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
