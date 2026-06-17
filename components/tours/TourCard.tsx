"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import type { Tour } from "@/types";
import { formatCategory, categoryColor } from "@/lib/utils";
import { tourImages } from "@/lib/tours-manifest";
import { TourImageFade } from "./TourImageFade";

export function TourCard({ tour, index = 0 }: { tour: Tour; index?: number }) {
  const images = tourImages(tour.slug);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="card overflow-hidden border border-transparent"
    >
      <Link
        href={`/tours/${tour.slug}`}
        className="group block transition-transform duration-300 group-hover:scale-[1.04]"
      >
        <div className="relative h-48 w-full overflow-hidden bg-ocean-mid">
          <TourImageFade
            images={images}
            alt={tour.name}
            className="h-full w-full"
          />
          <span
            className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[11px] font-semibold ${categoryColor(
              tour.category
            )}`}
          >
            {formatCategory(tour.category)}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg leading-snug text-ocean-deep">
            {tour.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-neutral-mid">
            {tour.shortDesc}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1.5 text-neutral-mid">
              <Clock size={14} className="text-ocean-mid" />
              {tour.duration}
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-ocean-deep group-hover:gap-2 transition-all">
              Ver más <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
