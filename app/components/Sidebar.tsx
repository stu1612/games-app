import NavigationLinks from "./NavigationLinks";

export default function Sidebar() {
  return (
    <div className="w-[300px] p-8 hidden md:block">
      <div className="h-full">
        <nav>
          <NavigationLinks />
        </nav>
      </div>
    </div>
  );
}
