import Head from "next/head";

export default function GameCardTitle({ title }: { title: string }) {
  return (
    <Head>
      <title className="font-black text-6xl p-0 m-0">{title}</title>
      <meta property="og:title" content={title} key={title} />
    </Head>
  );
}
