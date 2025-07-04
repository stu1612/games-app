import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode | React.ReactElement;
};

export default function NavLink({ href, children }: Props) {
  return (
    <Link href={href} prefetch={true} className="text-2xl">
      {children}
    </Link>
  );
}
