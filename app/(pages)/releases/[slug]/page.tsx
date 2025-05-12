import { apiKey, baseURL } from "@/app/lib/api";
import { fetchGamesFromAPI } from "@/app/lib/fetcher";
import { releasedGameFilters, releasesSlug } from "@/app/lib/api";
import GamesList from "@/app/components/GamesList";

type GamesProps = {
  games: {
    name: string;
  }[];
};

export async function generateStaticParams() {
  return Object.keys(releasedGameFilters).map((slug) => ({ slug }));
}

export default async function Releases({
  params,
}: {
  params: { slug: releasesSlug };
}) {
  const { slug } = await params;
  const query = releasedGameFilters[slug];

  const url = `${baseURL}/games?${query}&key=${apiKey}`;

  const { results: games } = await fetchGamesFromAPI(url);

  return <GamesList games={games} />;
}
