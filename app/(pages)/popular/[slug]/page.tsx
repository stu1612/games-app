import { apiKey, baseURL } from "@/app/lib/api";
import { fetchGamesFromAPI } from "@/app/lib/fetcher";
import { popularGameFilters, popularSlug } from "@/app/lib/api";
import GamesList from "@/app/components/GamesList";

// type GamesProps = {
//   games: {
//     name: string;
//   }[];
// };

export async function generateStaticParams() {
  return Object.keys(popularGameFilters).map((slug) => ({ slug }));
}

export default async function Releases({
  params,
}: {
  params: { slug: popularSlug };
}) {
  const { slug } = await params;
  console.log(slug);
  const query = popularGameFilters[slug];

  const url = `${baseURL}/games?${query}&key=${apiKey}`;

  const { results: games } = await fetchGamesFromAPI(url);

  return <GamesList games={games} />;
}
