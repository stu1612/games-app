"use client";

import { useQuery } from "@tanstack/react-query";

import useStore from "@/app/lib/store";

// export async function fetchGame() {
//   const res = await fetch(`${baseURL}/games?key=${apiKey}`);
//   if (!res.ok) throw new Error("Failed to load");
//   return res.json();
// }

export default function GameDisplay() {
  const { id, updateId } = useStore();

  console.log("id :", id);
  // const searchParams = useSearchParams();
  // const id = searchParams.get("id");

  // console.log("id: ", id);

  // const {
  //   data: game,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["game", id],
  //   queryFn: () => fetchGame(id!),
  //   enabled: !!id,
  // });

  return <div>GameDisplay</div>;
}
