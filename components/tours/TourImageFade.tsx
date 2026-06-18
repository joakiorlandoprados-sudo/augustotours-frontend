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
};

/**
 * Cross-fade entre varias imágenes.
 * - En desktop: controlado por hover (reproduce y vuelve al salir).
 * - En mobile / touch: auto-reproducción cada `intervalMs` sin necesidad de
 *   interacción, ya que hover no existe.
 * - En reposo (sin hover, desktop): muestra la primera imagen, quieta.
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
}: Props) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detección de mobile / touch: innerWidth < 768 o dispositivo touch.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const detectMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          ("ontouchstart" in window) ||
          (navigator.maxTouchPoints ?? 0) > 0
      );
    };

    detectMobile();
    window.addEventListener("resize", detectMobile);
    // Una vez que el usuario toca la pantalla, también activamos autoplay.
    window.addEventListener("touchstart", detectMobile, { passive: true });

    return () => {
      window.removeEventListener("resize", detectMobile);
      window.removeEventListener("touchstart", detectMobile);
    };
  }, []);

  // En mobile el carrusel reproduce solo; en desktop solo con hover.
  const shouldPlay = isMobile ? true : hover;

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
      onMouseEnter={() => !isMobile && setHover(true)}
      onMouseLeave={resetOnLeave}
      onFocus={() => !isMobile && setHover(true)}
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
