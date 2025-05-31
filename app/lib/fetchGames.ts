import { baseURL, apiKey } from "./api";

export async function fetchPopularGames() {
  const res = await fetch(`${baseURL}/games?key=${apiKey}`);
  if (!res.ok) throw new Error("Failed to load");
  return res.json();
}

export async function fetchGameById(id: number) {
  const res = await fetch(`${baseURL}/games/${id}?key=${apiKey}`);
  if (!res.ok) throw new Error("Failed to load");
  return res.json();
}

export async function fetchGameByQuery(query: string) {
  const res = await fetch(
    `${baseURL}/games?key=${apiKey}&search=${query}&page_size=10&ordering=-rating`
  );
  if (!res.ok) throw new Error("Failed to load");
  return res.json();
}
