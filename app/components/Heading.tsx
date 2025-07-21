"use client";

// framer
import { motion } from "framer-motion";

export default function Heading({ title }: { title: string }) {
  return (
    <motion.h1
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      className="text-lg md:text-3xl lg:text-5xl py-8 font-black text-rose-600 tracking-widest capitalize"
    >
      {title}
    </motion.h1>
  );
}
