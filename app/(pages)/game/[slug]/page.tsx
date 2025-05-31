"use client";

import { useQuery } from "@tanstack/react-query";

import Image from "next/image";

import useStore from "@/app/lib/store";
import { fetchGameById } from "@/app/lib/fetchGames";

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

  console.log(data);

  const ratingsScore =
    "This game has a {data?.ratings[0].percent}% ratings score of {data?.ratings[0].title}";

  return (
    <div className="">
      <div className="grid grid-cols-3 h-auto">
        <div className="col-span-2 bg-red-500">
          <Image
            alt={`${data.name}`}
            width={500}
            height={500}
            src={`${data.background_image}`}
            priority={true}
            style={{ objectFit: "cover", width: "100%", height: "50%" }}
          />
          <h1>
            {data.name} <span>{data.rating}/5</span>
          </h1>
          <h4>{data?.ratings[0] ? ratingsScore : null}</h4>
          <p>{data?.description_raw}</p>
        </div>
        <div className="col-span-1 bg-blue-300 flex flex-col">
          {data?.genres.map((genre: any) => (
            <Image
              key={genre?.name}
              alt={`${genre.name}`}
              width={500}
              height={500}
              src={`${genre.image_background}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
