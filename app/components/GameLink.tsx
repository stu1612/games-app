import Link from "next/link";

type PropTypes = {
  game: {
    id: number;
    slug: string;
  };
  children: React.ReactNode;
};

export default function GameLink({ children, game }: PropTypes) {
  return (
    <Link
      href={{
        pathname: `/game/${game.slug}`,
      }}
    >
      {children}
    </Link>
  );
}
