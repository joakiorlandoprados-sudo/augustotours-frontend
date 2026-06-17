"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/img/tours/city-tour.jpg"
          alt="Cristo Redentor, Río de Janeiro"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ocean-deep/70" />
      </div>

      <div className="container-page relative z-10 flex min-h-[78vh] flex-col items-start justify-center py-20 text-neutral-white">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-sunset-orange/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sunset-orange"
        >
          <Sparkles size={14} /> Río en español
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Descubrí Río de Janeiro
          <br />
          <span className="text-sunset-orange">sin barreras de idioma.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 max-w-2xl text-base text-ocean-pale sm:text-lg"
        >
          Excursiones, paseos en barco, city tours, aventuras y experiencias
          únicas. Todo con guías bilingües y atención personalizada en español.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link href="/tours" className="btn-primary">
            Ver todos los tours <ArrowRight size={18} />
          </Link>
          <Link
            href="#featured"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-neutral-white/70 px-6 py-3 font-semibold text-neutral-white transition hover:bg-neutral-white hover:text-ocean-deep"
          >
            Tours destacados
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
