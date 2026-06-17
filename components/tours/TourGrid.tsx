"use client";

import type { Tour } from "@/types";
import { TourCard } from "./TourCard";

export function TourGrid({ tours }: { tours: Tour[] }) {
  if (tours.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-ocean-light bg-ocean-pale/30 p-10 text-center">
        <p className="font-display text-xl text-ocean-deep">
          No encontramos tours con esos filtros.
        </p>
        <p className="mt-2 text-sm text-neutral-mid">
          Probá con otra categoría o limpiá los filtros para ver todas las
          opciones.
        </p>
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tours.map((t, i) => (
        <TourCard key={t.id} tour={t} index={i} />
      ))}
    </div>
  );
}
