import { Navbar, Sidebar } from "../components";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="bg-blue-400 relative top-30 min-h-screen flex gap-4">
        <Sidebar />
        <div className="bg-red-800 flex-1 p-8">
          <div className="bg-white h-full ">{children}</div>
        </div>
      </div>
    </>
  );
}
