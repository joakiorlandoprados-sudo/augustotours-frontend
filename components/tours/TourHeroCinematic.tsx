"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Category } from "@/types";
import { categoryColor, formatCategory } from "@/lib/utils";

type Props = {
  images: string[];
  tourName: string;
  category: Category;
  /** Cada cuántos ms cambia la foto del cross-fade. */
  intervalMs?: number;
};

/**
 * Hero full-bleed con cross-fade cinematográfico.
 * - Toma solo las 3 primeras fotos del tour (para que sea ágil de cargar).
 * - Ken Burns sutil: zoom 1.00 → 1.05 en la imagen activa, reinicia al rotar.
 * - Respeta prefers-reduced-motion: queda estático en la primera imagen.
 * - Mantiene el gradiente, la categoría y el botón "Volver" del hero original.
 */
export function TourHeroCinematic({
  images,
  tourName,
  category,
  intervalMs = 5000,
}: Props) {
  const heroImages = images.slice(0, 3);
  const [i, setI] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Detectar prefers-reduced-motion en cliente
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq) {
      setReduceMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
      mq.addEventListener?.("change", handler);
      return () => mq.removeEventListener?.("change", handler);
    }
  }, []);

  // Cross-fade automático solo si hay >1 imagen y no se pidió reduced motion
  useEffect(() => {
    if (reduceMotion || heroImages.length < 2) return;
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % heroImages.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [reduceMotion, heroImages.length, intervalMs]);

  if (heroImages.length === 0) {
    // Fallback: gradiente oceánico sin imagen
    return (
      <div className="relative h-[70vh] min-h-[480px] w-full bg-ocean-deep" />
    );
  }

  return (
    <div className="relative h-[70vh] min-h-[480px] max-h-[720px] w-full overflow-hidden bg-ocean-deep sm:h-[80vh]">
      {heroImages.map((src, idx) => {
        const isActive = idx === i;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!isActive}
          >
            <div
              className={`relative h-full w-full ${
                isActive && !reduceMotion
                  ? "[animation:kenburns_8s_ease-out_forwards]"
                  : ""
              }`}
            >
              <Image
                src={src}
                alt={isActive ? tourName : ""}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        );
      })}

      {/* Gradiente inferior para legibilidad del título */}
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/40 to-transparent" />

      {/* Contenido */}
      <div className="container-page absolute inset-x-0 bottom-0 pb-8 text-neutral-white">
        <Link
          href="/tours"
          className="mb-3 inline-flex items-center gap-2 text-sm text-ocean-pale hover:text-neutral-white"
        >
          <ArrowLeft size={16} /> Volver a tours
        </Link>
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${categoryColor(
            category,
          )}`}
        >
          {formatCategory(category)}
        </span>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl"
        >
          {tourName}
        </motion.h1>
      </div>

      {/* Keyframes locales (no se exponen globalmente) */}
      <style jsx>{`
        @keyframes kenburns {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
