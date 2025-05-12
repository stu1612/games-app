export async function fetchGamesFromAPI(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load");
  return res.json();
}
