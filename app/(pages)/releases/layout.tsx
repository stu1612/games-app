import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="bg-blue-400 relative top-30 h-screen flex gap-4">
        <div className="bg-red-500 w-[300px] fixed left-0 top-30 h-screen">
          <div className="flex flex-col items-start">
            <h3>New Releases</h3>
            <Link href="/releases/last_month" prefetch={true}>
              Last 30 days
            </Link>
            <Link href="/releases/this_week" prefetch={true}>
              This week
            </Link>
            <Link href="/releases/next_month" prefetch={true}>
              Next month
            </Link>
          </div>
        </div>
        <div className="bg-red-700 w-full absolute left-[300px]">
          {children}
        </div>
      </div>
    </>
  );
}
