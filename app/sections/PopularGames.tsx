"use client";

// react
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

// libs
import { fetchPopularGames } from "../lib/fetchGames";

// npm
import { motion } from "framer-motion";

// components
import { Heading, ImageCarousel } from "../components";
import Link from "next/link";

export default function PopularGames() {
  // state
  const [index, setIndex] = useState(0);

  // query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["popularGames"],
    queryFn: fetchPopularGames,
    staleTime: 1000 * 60 * 10,
  });

  const games = data?.results ?? [];

  useEffect(() => {
    const length = games?.length ?? 0;
    if (length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, 5000);

    return () => clearInterval(timer);
  }, [games, index]);

  if (isLoading) return <p>Loading games...</p>;
  if (isError) return <p>Something went wrong!</p>;

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
            <div className="gradient-bg" />

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
            <div className="absolute top-8 right-8">
              <Link href={"/games"}>
                <button className="bg-white px-6 py-4 cursor-pointer">
                  Enter
                </button>
              </Link>
            </div>
            {games[index] && games[index].short_screenshots && (
              <ImageCarousel
                images={games[index].short_screenshots}
                className="hidden md:grid absolute bottom-4"
              />
            )}
          </div>
        )}
        {games[index] && games[index].short_screenshots && (
          <ImageCarousel
            images={games[index].short_screenshots}
            className="grid relative top-4 md:hidden"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
