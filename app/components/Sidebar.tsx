"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="bg-red-500 w-[300px] p-8 hidden md:block">
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
  );
}
