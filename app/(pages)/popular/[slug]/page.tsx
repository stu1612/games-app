// import { apiKey, baseURL } from "@/app/lib/api";
// import { fetchGamesFromAPI } from "@/app/lib/fetcher";
// import { popularGameFilters, popularSlug } from "@/app/lib/api";
// import GamesList from "@/app/sections/GamesList";

// export async function generateStaticParams() {
//   return Object.keys(popularGameFilters).map((slug) => ({ slug }));
// }

// export default async function Releases({
//   params,
// }: {
//   params: { slug: popularSlug };
// }) {
//   const { slug } = await params;

//   const query = popularGameFilters[slug];

//   const url = `${baseURL}/games?${query}&key=${apiKey}`;

//   const { results: games } = await fetchGamesFromAPI(url);

//   return <GamesList games={games} />;
// }

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { apiKey, baseURL, slugToQueryKey, URLSlug } from "@/app/lib/api";
import { fetchGamesFromAPI } from "@/app/lib/fetcher";
import { getFilteredQueriesBySlug, queriesBySlug } from "@/app/lib/api";
import GamesList from "@/app/sections/GamesList";

export async function generateStaticParams() {
  return Object.keys(slugToQueryKey).map((slug) => ({ slug }));
}

export default async function PopularGames({
  params,
}: {
  params: { slug: URLSlug };
}) {
  const queryClient = new QueryClient();

  const { slug } = await params;

  const key = slugToQueryKey[slug];

  const query = getFilteredQueriesBySlug[key];

  const url = `${baseURL}/games?${query}&key=${apiKey}`;

  console.log("url ", url);

  await queryClient.prefetchQuery({
    queryKey: ["popular", slug],
    queryFn: () => fetchGamesFromAPI(url),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GamesList slug={slug} />
    </HydrationBoundary>
  );
}

// export async function generateStaticParams() {
//   return Object.keys(popularGameFilters).map((slug) => ({ slug }));
// }

// export async function fetchPopularGames(query: string) {
//   return fetch(`${baseURL}/games?${query}&key=${apiKey}`).then((res) =>
//     res.json()
//   );
// }

// export default async function PopularGames({
//   params,
// }: {
//   params: { slug: popularSlug };
// }) {
//   const { slug } = params;
//   const query = popularGameFilters[slug];
//   const games = await fetchPopularGames(query);

//   return <GamesList initialData={games} />;
// }
