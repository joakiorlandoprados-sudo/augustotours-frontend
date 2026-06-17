"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { Tour } from "@/types";
import { formatCategory, categoryColor } from "@/lib/utils";
import { tourImages } from "@/lib/tours-manifest";
import { TourImageFade } from "@/components/tours/TourImageFade";

export function FeaturedTours({ tours }: { tours: Tour[] }) {
  const featured = tours.filter((t) => t.featured).slice(0, 4);

  return (
    <section id="featured" className="container-page py-20">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-sunset-orange">
            Imperdibles
          </span>
          <h2 className="mt-2 font-display text-3xl text-ocean-deep sm:text-4xl">
            Tours destacados
          </h2>
          <p className="mt-2 max-w-xl text-neutral-mid">
            Las experiencias más elegidas por nuestros viajeros. Reservá con
            anticipación para asegurar tu lugar.
          </p>
        </div>
        <Link
          href="/tours"
          className="text-sm font-semibold text-ocean-deep hover:text-ocean-mid"
        >
          Ver todos →
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((tour, i) => (
          <motion.article
            key={tour.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="card overflow-hidden border border-transparent"
          >
            <Link
              href={`/tours/${tour.slug}`}
              className="group block transition-transform duration-300 group-hover:scale-[1.04]"
            >
              <div className="relative h-48 w-full overflow-hidden bg-ocean-mid">
                <TourImageFade
                  images={tourImages(tour.slug)}
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
                <div className="mt-4 flex items-center gap-2 text-xs text-neutral-mid">
                  <Clock size={14} className="text-ocean-mid" />
                  {tour.duration}
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
