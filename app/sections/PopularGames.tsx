"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPopularGames } from "../lib/fetchGames";
import { motion } from "framer-motion";
import { useState } from "react";
import { Heading } from "../components";
import Image from "next/image";

export default function PopularGames() {
  const [index, setIndex] = useState(3);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["popularGames"],
    queryFn: fetchPopularGames,
  });

  if (isLoading) return <p>Loading games...</p>;
  if (isError) return <p>Something went wrong!</p>;

  const games = data?.results.map((game: any) => game);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.2,
        ease: "linear",
      }}
    >
      <Heading title="Top 5 Games since 2019" />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {games?.[index] && (
          <div className="relative cursor-pointer">
            <Image
              src={games[index].background_image}
              alt="Carousel"
              className="w-full h-full"
              width={500}
              height={500}
            />
            <motion.h2
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="py-4 md:py-0 z-10  md:absolute md:top-10 md:left-20 font-black text-2xl text-black md:text-white leading-normal tracking-widest"
            >
              {games[index].name}
            </motion.h2>
            <motion.h3
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden z-10 md:block absolute top-20 left-20 font-thin uppercase text-black md:text-white text-6xl opacity-40 leading-normal tracking-widest"
            >
              {games[index].genres[0].name}
            </motion.h3>

            <div className="mt-8 z-10 bg-transparent md:absolute md:bottom-2 grid grid-cols-2 md:grid-cols-4 md:px-8 w-full gap-4">
              {games[index].short_screenshots
                .slice(1, 5)
                .map((img: any, idx: any) => (
                  <img
                    src={img.image}
                    alt="hi"
                    key={idx}
                    className="h-40 w-full object-cover"
                  />
                ))}
            </div>
            <div className="hidden md:block absolute z-0 inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]   from-[rgba(71,85,105,0.1)]  via-[rgba(0,0,0,.3)]  to-[rgba(0,0,0,1)] w-full " />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
