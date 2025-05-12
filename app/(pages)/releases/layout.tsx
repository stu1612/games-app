import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <div className="bg-blue-400 relative top-30 min-h-screen flex flex-row gap-12">
        <div className="bg-red-500 w-[300px] p-8">
          <div className="bg-white h-full">
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
              <h3>Popular</h3>
              <Link href="/popular/best_of_the_year" prefetch={true}>
                Best of the Year
              </Link>
              <Link href="/popular/popular_last_year" prefetch={true}>
                Popular Last Year
              </Link>
              <Link href="/popular/all_stars" prefetch={true}>
                All stars
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-red-800 flex-1 p-8">
          <div className="bg-white h-full ">{children}</div>
        </div>
      </div>
    </>
  );
}
