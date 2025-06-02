// react
import Link from "next/link";

type MobileSidebarProps = {
  toggleMenu: () => void;
};

export default function MobileSidebar({ toggleMenu }: MobileSidebarProps) {
  return (
    <div className="bg-red-500 w-[80%] p-8 absolute top-0 left-0 min-h-screen block md:hidden">
      <div className="bg-white h-full">
        <div className="flex flex-col items-start">
          <h3>New Releases</h3>
          <Link
            href="/releases/last_month"
            prefetch={true}
            onClick={toggleMenu}
          >
            Last 30 days
          </Link>
          <Link href="/releases/this_week" prefetch={true} onClick={toggleMenu}>
            This week
          </Link>
          <Link
            href="/releases/next_month"
            prefetch={true}
            onClick={toggleMenu}
          >
            Next month
          </Link>
          <h3>Popular</h3>
          <Link
            href="/popular/best_of_the_year"
            prefetch={true}
            onClick={toggleMenu}
          >
            Best of the Year
          </Link>
          <Link
            href="/popular/popular_last_year"
            prefetch={true}
            onClick={toggleMenu}
          >
            Popular Last Year
          </Link>
          <Link href="/popular/all_stars" prefetch={true} onClick={toggleMenu}>
            All stars
          </Link>
        </div>
      </div>
    </div>
  );
}
