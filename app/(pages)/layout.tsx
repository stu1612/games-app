import { Navbar, Sidebar } from "../components";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className=" relative  min-h-screen h-auto flex gap-4">
        <Sidebar />
        <div className=" flex-1 p-8">
          <div className=" h-full ">{children}</div>
        </div>
      </div>
    </>
  );
}
