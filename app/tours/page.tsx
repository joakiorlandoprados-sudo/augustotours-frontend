"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TourGrid } from "@/components/tours/TourGrid";
import { TourFilter, type Filters } from "@/components/tours/TourFilter";
import type { Tour } from "@/types";

const CATEGORIES = [
  { key: "EXCURSION", label: "Excursiones" },
  { key: "CITY", label: "City Tours" },
  { key: "AVENTURA", label: "Aventura" },
  { key: "NAUTICO", label: "Náutico" },
  { key: "CULTURAL", label: "Cultural" },
];

function ToursPageInner() {
  const params = useSearchParams();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    category: params.get("cat") || "ALL",
    query: "",
  });

  useEffect(() => {
    setFilters((f) => ({ ...f, category: params.get("cat") || "ALL" }));
  }, [params]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/tours")
      .then((r) => r.json())
      .then((data) => !cancelled && setTours(data.tours || []))
      .catch(() => !cancelled && setTours([]))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return tours.filter((t) => {
      if (filters.category !== "ALL" && t.category !== filters.category) return false;
      if (
        filters.query &&
        !`${t.name} ${t.shortDesc}`.toLowerCase().includes(filters.query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [tours, filters]);

  return (
    <div className="container-page py-12">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-sunset-orange">
          Catálogo completo
        </span>
        <h1 className="mt-2 font-display text-3xl text-ocean-deep sm:text-4xl">
          Todos los tours
        </h1>
        <p className="mt-2 max-w-2xl text-neutral-mid">
          Elegí entre excursiones, paseos en barco, aventuras y experiencias
          culturales. Reservá con anticipación para asegurar tu lugar.
        </p>
      </div>

      <TourFilter
        filters={filters}
        onChange={setFilters}
        categories={CATEGORIES}
      />

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-card bg-neutral-light"
            />
          ))}
        </div>
      ) : (
        <TourGrid tours={filtered} />
      )}
    </div>
  );
}

export default function ToursPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-card bg-neutral-light"
              />
            ))}
          </div>
        </div>
      }
    >
      <ToursPageInner />
    </Suspense>
  );
}
