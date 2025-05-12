import { apiKey, baseURL } from "@/app/lib/api";
import { fetchGamesFromAPI } from "@/app/lib/fetcher";

export async function generateStaticParams() {
  const url = `${baseURL}/games?key=${apiKey}`;
  const { results } = await fetchGamesFromAPI(url);
  console.log(results);
  return results;
}

export default async function Releases({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);

  return <div>My Post: {slug}</div>;
}
