import useStore from "@/app/lib/store";

export default function useGameIdUpdater() {
  const { updateId } = useStore();
  return (id: number) => {
    // console.log("Updating game ID:", id);
    updateId(id);
  };
}
