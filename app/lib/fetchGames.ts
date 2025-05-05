import { baseURL, apiKey } from "./api";

export async function fetchPopularGames() {
  const res = await fetch(`${baseURL}/games?key=${apiKey}`);
  if (!res.ok) throw new Error("Failed to load");
  return res.json();
}
