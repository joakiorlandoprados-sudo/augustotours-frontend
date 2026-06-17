"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";

type Props = {
  images: string[];
  alts?: string[];
  tourName: string;
  open: boolean;
  startIndex: number;
  onClose: () => void;
};

/**
 * Lightbox full-screen multi-imagen.
 *
 * - Navegación con flechas (loop infinito).
 * - Swipe táctil (umbral 50 px).
 * - Teclado: Esc cierra, ←/→ navega.
 * - Thumbnails abajo: clic salta a la foto.
 * - Contador "Foto N de M · {tour}".
 * - Descarga por foto.
 * - Scroll lock del body al abrir.
 * - Respeta prefers-reduced-motion (entrada sin scale).
 */
export function Lightbox({
  images,
  alts = [],
  tourName,
  open,
  startIndex,
  onClose,
}: Props) {
  const [index, setIndex] = useState(startIndex);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Reset al abrir o cuando cambia startIndex
  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  const go = useCallback(
    (delta: number) => {
      if (images.length === 0) return;
      setIndex((i) => (i + delta + images.length) % images.length);
    },
    [images.length],
  );

  // Teclado + scroll lock + foco inicial
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Foco inicial en el botón cerrar para que Tab quede dentro del modal
    queueMicrotask(() => closeRef.current?.focus());

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, go, onClose]);

  // Swipe en móvil
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  }

  if (!open || images.length === 0) return null;
  const current = images[index];
  const alt = alts[index] ?? `Foto ${index + 1} de ${images.length} — ${tourName}`;

  // Detecta prefers-reduced-motion
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="fixed inset-0 z-[60] flex flex-col bg-black/95"
        role="dialog"
        aria-modal="true"
        aria-label={`Galería de ${tourName}`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 text-white">
          <p className="text-sm font-medium">
            Foto {index + 1} de {images.length}
            <span className="ml-2 text-white/60">· {tourName}</span>
          </p>
          <div className="flex items-center gap-2">
            <a
              href={current}
              download
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="Descargar foto"
            >
              <Download size={14} /> Descargar
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="Cerrar galería"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Imagen principal + flechas */}
        <div className="relative flex flex-1 items-center justify-center px-2 sm:px-12">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:left-4 sm:p-3"
            aria-label="Foto anterior"
          >
            <ChevronLeft size={22} />
          </button>

          <motion.div
            key={current}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="relative h-full w-full max-w-6xl"
          >
            <Image
              src={current}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-contain"
              priority
            />
          </motion.div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:right-4 sm:p-3"
            aria-label="Foto siguiente"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex gap-2 overflow-x-auto px-4 py-3"
          >
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md ring-2 transition ${
                  i === index
                    ? "ring-white"
                    : "ring-white/20 hover:ring-white/60"
                }`}
                aria-label={`Ir a foto ${i + 1}`}
                aria-current={i === index}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
