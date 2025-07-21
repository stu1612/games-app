"use client";

import { useQuery } from "@tanstack/react-query";

import Image from "next/image";

import useStore from "@/app/lib/store";
import { fetchGameById } from "@/app/lib/fetchGames";
import { RxSection } from "react-icons/rx";
import { FaSection } from "react-icons/fa6";

export default function GameDisplay() {
  const { id, hydrated } = useStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["game", id],
    queryFn: () => fetchGameById(id),
    enabled: hydrated && !!id,
  });

  if (!hydrated) return <div>Loading store...</div>;
  if (isLoading) return <div>Loading game...</div>;
  if (error) return <div>Error loading game</div>;

  return (
    <section>
      <div>
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
          <h1 className="text-2xl md:text-3xl font-bold py-4">
            {data.name} <span>{data.rating}/5</span>
          </h1>
          <h4>
            {data?.ratings[0]
              ? `${data?.ratings[0].percent}% ratings score of ${data?.ratings[0].title}`
              : null}
          </h4>
          <p>{data?.description_raw}</p>
        </div>
        {/* <div className="col-span-1 bg-blue-300 flex flex-col">
          {data?.genres.map((genre: any) => (
            <Image
              key={genre?.name}
              alt={`${genre.name}`}
              width={500}
              height={500}
              src={`${genre.image_background}`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}
