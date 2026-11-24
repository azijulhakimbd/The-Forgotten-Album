"use client";

import React from "react";
import Link from "next/link";
import { Category } from "@/types";
import { ArrowUpRight } from "lucide-react";
import { motion } from "@/components/ui/motion";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        href={`/categories/${category.slug}`}
        className="group relative rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden aspect-[4/3] flex flex-col justify-end p-5 transition-colors duration-300 hover:border-amber-600/50 hover:shadow-xl block h-full"
      >
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[35%] group-hover:grayscale-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/60 to-transparent" />

        <div className="relative z-10 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
              Category
            </span>
            <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
