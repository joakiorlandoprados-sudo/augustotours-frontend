"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
  className?: string;
  /** Tiempo hasta mostrar la segunda imagen (la "entrada" del ciclo). */
  firstIntervalMs?: number;
  /** Tiempo entre el resto de las imágenes del ciclo. */
  intervalMs?: number;
  sizes?: string;
  /**
   * Si se provee, el estado de reproducción se controla desde fuera.
   * - `true`  → reproduce el ciclo.
   * - `false` → pausa y vuelve a la primera imagen.
   * Si se omite, el componente gestiona el estado internamente con hover (desktop).
   */
  playing?: boolean;
};

/**
 * Cross-fade entre varias imágenes.
 * - En desktop: controlado por hover (reproduce y vuelve al salir).
 * - En mobile / touch: controlado por la prop `playing`. El padre decide cuándo
 *   activar / desactivar el carrusel (tocar la card, tocar fuera, etc.).
 * - En reposo: muestra la primera imagen, quieta.
 * - Solo la primera se carga con `priority` y `eager` (LCP).
 * - Si hay una sola imagen, se renderiza estática (sin JS corriendo).
 */
export function TourImageFade({
  images,
  alt,
  className = "",
  firstIntervalMs = 500,
  intervalMs = 2000,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  playing,
}: Props) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);

  // Modo controlado (padre maneja el estado) vs modo interno (solo hover).
  const controlled = playing !== undefined;
  const shouldPlay = controlled ? playing : hover;

  // Cuando se desactiva, volver a la primera imagen.
  useEffect(() => {
    if (!shouldPlay) setActive(0);
  }, [shouldPlay]);

  useEffect(() => {
    if (!shouldPlay || images.length < 2) return;

    // La primera transición usa `firstIntervalMs` (entrada rápida al ciclo),
    // las siguientes usan `intervalMs` (cadencia del resto).
    const initialId = setTimeout(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, firstIntervalMs);

    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => {
      clearTimeout(initialId);
      clearInterval(id);
    };
  }, [shouldPlay, images.length, firstIntervalMs, intervalMs]);

  const resetOnLeave = () => {
    setHover(false);
    setActive(0);
  };

  if (images.length === 0) return null;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => !controlled && setHover(true)}
      onMouseLeave={resetOnLeave}
      onFocus={() => !controlled && setHover(true)}
      onBlur={resetOnLeave}
    >
      {images.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt={idx === 0 ? alt : ""}
          fill
          sizes={sizes}
          priority={idx === 0}
          loading={idx === 0 ? "eager" : "lazy"}
          className={`object-cover transition-[opacity,transform] duration-700 ease-out ${
            idx === active ? "opacity-100" : "opacity-0"
          } ${shouldPlay ? "scale-110" : "scale-100"}`}
        />
      ))}
    </div>
  );
}