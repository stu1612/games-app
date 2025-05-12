import React from "react";
import Navbar from "@/app/components/Navbar";

export default function Games() {
  return (
    <>
      <Navbar />
      <div className="bg-blue-400 relative top-30 h-screen flex gap-4">
        <div className="bg-red-500 w-[300px] fixed left-0 top-30 h-screen">
          <div className="flex flex-col items-start">
            <h3>Popular</h3>
            <button>Last 30</button>
            <button>this week</button>
            <button>next week</button>
          </div>
        </div>
        <div className="bg-red-700 w-full"></div>
      </div>
    </>
  );
}
