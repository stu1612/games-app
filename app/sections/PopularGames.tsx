"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPopularGames } from "../lib/fetchGames";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Heading } from "../components";
import Image from "next/image";
import ImageCarousel from "../components/ImageCarousel";

export default function PopularGames() {
  const [index, setIndex] = useState(3);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["popularGames"],
    queryFn: fetchPopularGames,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((index + 1) % 5);
    }, 5000);

    return () => clearInterval(timer);
  }, [index]);

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
      className="h-auto"
    >
      {/* <Heading title="Top 5 Games since 2019" /> */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-auto md:h-screen relative"
      >
        {games?.[index] && (
          <div className="h-screen w-full relative cursor-pointer">
            <Image
              src={games[index]?.background_image}
              alt={games[index]?.name}
              className="object-cover"
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-transparent pointer-events-none" />

            <div className="z-10 absolute top-20 left-0 right-0 md:left-20 px-12 ">
              <Heading title="Top 5 Games since 2019" />

              <motion.h2
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="font-black text-2xl text-white leading-normal tracking-widest"
              >
                {games[index].name}
              </motion.h2>
              <motion.h3
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className=" font-thin uppercase text-white text-4xl md:text-6xl opacity-40 leading-normal tracking-widest"
              >
                {games[index].genres[0].name}
              </motion.h3>
            </div>
            {/* <div className="z-20 absolute bottom-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-4 md:px-8 w-full gap-4">
              {games[index].short_screenshots
                .slice(1, 5)
                .map((img: any, idx: any) => (
                  <img
                    src={img.image}
                    alt="hi"
                    key={idx}
                    className="h-50 md:h-40 w-full rounded-2xl object-cover"
                  />
                ))}
            </div> */}
            <ImageCarousel
              images={games[index].short_screenshots}
              className="hidden md:grid absolute bottom-4"
            />
          </div>
        )}
        <ImageCarousel
          images={games[index].short_screenshots}
          className="grid relative top-4 md:hidden"
        />
        {/* <div className="z-20 absolute bottom-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-4 md:px-8 w-full gap-4">
          {games[index].short_screenshots
            .slice(1, 5)
            .map((img: any, idx: any) => (
              <img
                src={img.image}
                alt="hi"
                key={idx}
                className="h-50 md:h-40 w-full rounded-2xl object-cover"
              />
            ))}
        </div> */}
      </motion.div>
    </motion.div>
  );
}
