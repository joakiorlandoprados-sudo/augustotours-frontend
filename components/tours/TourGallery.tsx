"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Images as ImagesIcon } from "lucide-react";
import { Lightbox } from "./Lightbox";

type Props = {
  images: string[];
  tourName: string;
  /** Slug del tour, se usa para construir alts y nombres de archivo. */
  tourSlug: string;
};

/**
 * Galería editorial estilo "experiencia".
 *
 * Layout desktop (md+):
 *   ┌─────────────────────────────┐
 *   │   Foto 0  (destacada, 3:2)  │
 *   ├──────────────┬──────────────┤
 *   │   Foto 1     │   Foto 2     │
 *   ├──────┬───────┴──┬────┬──────┤
 *   │  3   │    4     │ 5  │ +N   │
 *   └──────┴──────────┴────┴──────┘
 *
 * Layout móvil: grilla 2 columnas uniforme.
 *
 * - Cada miniatura abre el Lightbox en su índice.
 * - Si hay >7 fotos, la última miniatura visible muestra overlay "+N".
 * - Hover: ícono de lupa + ligero zoom.
 */
export function TourGallery({ images, tourName, tourSlug }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  // Cuántas miniaturas renderizamos en el collage.
  // Las que pasen de MAX_VISIBLE caen en el overlay "+N".
  const MAX_VISIBLE = 7;
  const visible = images.slice(0, MAX_VISIBLE);
  const hiddenCount = images.length - visible.length;

  // Alts descriptivas para el lightbox
  const alts = images.map(
    (_, i) => `Foto ${i + 1} de ${images.length} — ${tourName}`,
  );

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-ocean-deep">
            La experiencia en fotos
          </h2>
          <p className="mt-1 text-sm text-neutral-mid">
            Hacé clic en cualquier foto para verla en grande. Usá las flechas
            para pasar de una a otra.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ocean-pale/50 px-3 py-1 text-xs font-semibold text-ocean-deep">
          <ImagesIcon size={14} /> {images.length} fotos
        </span>
      </div>

      {/* Collage desktop / grilla uniforme en móvil */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-6 md:grid-rows-[auto_auto_auto]">
        {visible.map((src, idx) => {
          // Layout editorial solo en md+
          let desktopClass = "";
          if (idx === 0) {
            desktopClass = "md:col-span-6 md:row-span-1";
          } else if (idx === 1 || idx === 2) {
            desktopClass = "md:col-span-3";
          } else {
            desktopClass = "md:col-span-2";
          }

          const isLast = idx === visible.length - 1 && hiddenCount > 0;
          const aspectClass =
            idx === 0
              ? "aspect-[3/2] md:aspect-[21/9]"
              : "aspect-[4/3]";

          return (
            <button
              key={src}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className={`group relative ${desktopClass} ${aspectClass} overflow-hidden rounded-card bg-neutral-light focus:outline-none focus:ring-2 focus:ring-ocean-mid`}
              aria-label={`Ampliar foto ${idx + 1} de ${images.length}: ${tourName}`}
            >
              <Image
                src={src}
                alt={alts[idx]}
                fill
                sizes={
                  idx === 0
                    ? "(max-width: 768px) 100vw, 100vw"
                    : idx <= 2
                    ? "(max-width: 768px) 50vw, 50vw"
                    : "(max-width: 768px) 50vw, 33vw"
                }
                loading={idx < 3 ? "eager" : "lazy"}
                priority={idx < 2}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />

              {/* Overlay hover con lupa (oculto en la primera porque es muy grande) */}
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ocean-deep/0 transition-colors duration-300 group-hover:bg-ocean-deep/30">
                <span className="rounded-full bg-white/90 p-2 text-ocean-deep opacity-0 shadow-card transition-opacity duration-300 group-hover:opacity-100">
                  <Search size={20} />
                </span>
              </span>

              {/* Overlay "+N" sobre la última miniatura visible */}
              {isLast && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ocean-deep/70 text-neutral-white">
                  <span className="text-center">
                    <span className="block font-display text-3xl">
                      +{hiddenCount}
                    </span>
                    <span className="mt-1 block text-xs uppercase tracking-widest">
                      Ver más
                    </span>
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Nombre técnico (SEO + debugging) */}
      <p className="sr-only">Galería del tour {tourSlug}</p>

      <Lightbox
        images={images}
        alts={alts}
        tourName={tourName}
        open={lightboxIndex !== null}
        startIndex={lightboxIndex ?? 0}
        onClose={() => setLightboxIndex(null)}
      />
    </section>
  );
}
