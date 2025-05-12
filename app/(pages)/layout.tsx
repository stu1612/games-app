import Navbar from "@/app/components/Navbar";
import Link from "next/link";

export default function layout() {
  return (
    <>
      <Navbar />
      <div className="bg-blue-400 relative top-30 h-screen flex gap-4">
        <div className="bg-red-500 w-[300px] fixed left-0 top-30 h-screen">
          <div className="flex flex-col items-start">
            <h3>New Releases</h3>
            <Link href="/releases/last_30">Last 30 days</Link>
            <Link href="/releases/this_week">This week</Link>
            <Link href="/releases/last_week">Last week</Link>
          </div>
        </div>
        <div className="bg-red-700 w-full"></div>
      </div>
    </>
  );
}
