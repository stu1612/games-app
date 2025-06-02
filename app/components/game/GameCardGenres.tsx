import { GameCardProps } from "@/app/types/games";
import Link from "next/link";

export default function GameCardGenres({ game }: GameCardProps) {
  const genreLength = game.genres?.length;
  return game.genres?.map((genre, idx) => (
    <small
      key={genre.id}
      className="mr-2 underline underline-offset-4 text-[10px] hover:text-amber-200"
    >
      <Link href={`/games/${genre.slug}`}>{genre.name}</Link>
      {genreLength && idx < genreLength - 1 && ","}
    </small>
  ));
}
