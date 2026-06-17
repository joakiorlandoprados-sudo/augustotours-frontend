"use client";

import { Search, X } from "lucide-react";

export interface Filters {
  category: string;
  query: string;
}

export function TourFilter({
  filters,
  onChange,
  categories,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  categories: { key: string; label: string }[];
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 rounded-card border border-neutral-light bg-neutral-white p-4 shadow-soft md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onChange({ ...filters, category: "ALL" })}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            filters.category === "ALL"
              ? "bg-ocean-deep text-neutral-white"
              : "bg-neutral-light text-neutral-dark hover:bg-ocean-pale/40"
          }`}
        >
          Todos
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => onChange({ ...filters, category: c.key })}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              filters.category === c.key
                ? "bg-ocean-deep text-neutral-white"
                : "bg-neutral-light text-neutral-dark hover:bg-ocean-pale/40"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="relative w-full md:w-72">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-mid"
        />
        <input
          type="text"
          placeholder="Buscar tour..."
          value={filters.query}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
          className="w-full rounded-full border border-neutral-light bg-neutral-white py-2 pl-9 pr-9 text-sm text-neutral-dark placeholder:text-neutral-mid focus:border-ocean-mid focus:outline-none"
        />
        {filters.query && (
          <button
            onClick={() => onChange({ ...filters, query: "" })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-mid hover:text-ocean-deep"
            aria-label="Limpiar búsqueda"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
