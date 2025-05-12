export default async function Releases({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);
  return <div>My Post: {slug}</div>;
}
