"use client";

// react
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

// libs
import useStore from "@/app/lib/store";
import { fetchGameById } from "@/app/lib/fetchGames";

// npm
import { twMerge } from "tailwind-merge";

export default function GameDisplay() {
  const router = useRouter();
  const { id, hydrated } = useStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["game", id],
    queryFn: () => fetchGameById(id),
    enabled: hydrated && !!id,
  });

  if (!hydrated) return <div>Loading store...</div>;
  if (isLoading) return <div>Loading game...</div>;
  if (error) return <div>Error loading game</div>;

  const handleBackClick = () => {
    router.back();
  };

  const dataRatingPercent = `${data?.ratings[0]?.percent}`;
  const dataRatingTitle = `${data?.ratings[0]?.title}`;

  return (
    <section>
      <div className="h-auto md:h-[50vh] lg:h-[80vh] relative">
        <Image
          alt={`${data.name}`}
          width={500}
          height={500}
          src={`${data.background_image}`}
          priority={true}
          style={{ width: "100%", height: "100%" }}
          className="object-contain md:object-fill lg:object-cover"
        />
        <div className="md:absolute md:top-2 md:left-2 px-8 py-6 ">
          <h1 className="text-2xl md:text-3xl font-bold text-strong-shadow">
            {data.name}
          </h1>
        </div>
        <div className="px-8 md:absolute md:bottom-2 md:right-2">
          <p className="font-black text-5xl text-strong-shadow">
            <span
              className={twMerge(
                data.rating <= 2 && "text-red-500",
                data.rating <= 4 ? "text-yellow-500" : "text-green-500"
              )}
            >
              {data.rating}
            </span>
            /5
          </p>
        </div>
        <div className="px-8 py-6 ">
          <h4 className="pb-4 font-bold text-2xl">
            {data?.ratings[0]
              ? `${dataRatingPercent} % rating score of ${dataRatingTitle}`
              : null}
          </h4>
          <p className="font-medium">{data?.description_raw}</p>
        </div>
        <button
          onClick={handleBackClick}
          className="flex justify-self-center cursor-pointer bg-white text-black py-2 px-4 rounded-2xl uppercase text-sm"
        >
          go back
        </button>
      </div>
    </section>
  );
}
