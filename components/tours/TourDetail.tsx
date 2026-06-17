"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  CalendarDays,
  Check,
  X as XIcon,
  Info,
  MessageCircle,
  CreditCard,
  Users,
  Sparkles,
} from "lucide-react";
import type { Tour } from "@/types";
import { formatCategory, categoryColor, whatsappLink } from "@/lib/utils";
import { tourImages } from "@/lib/tours-manifest";
import { TourHeroCinematic } from "./TourHeroCinematic";
import { TourGallery } from "./TourGallery";

export function TourDetail({ tour }: { tour: Tour }) {
  const images = tourImages(tour.slug);

  return (
    <article>
      <TourHeroCinematic
        images={images}
        tourName={tour.name}
        category={tour.category}
      />

      <div className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-lg text-neutral-dark">{tour.shortDesc}</p>
            <p className="mt-4 leading-relaxed text-neutral-mid">{tour.fullDesc}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="card border border-transparent p-5">
                <div className="flex items-center gap-2 text-ocean-deep">
                  <Clock size={18} />
                  <span className="font-semibold">Duración</span>
                </div>
                <p className="mt-2 text-sm text-neutral-mid">{tour.duration}</p>
              </div>
              <div className="card border border-transparent p-5">
                <div className="flex items-center gap-2 text-ocean-deep">
                  <CalendarDays size={18} />
                  <span className="font-semibold">Horarios</span>
                </div>
                <p className="mt-2 text-sm text-neutral-mid">{tour.schedule}</p>
              </div>
            </div>

            {tour.includes.length > 0 && (
              <section className="mt-10">
                <h2 className="font-display text-2xl text-ocean-deep">
                  Qué incluye
                </h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {tour.includes.map((i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-neutral-dark"
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      {i}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {tour.excludes.length > 0 && (
              <section className="mt-8">
                <h2 className="font-display text-2xl text-ocean-deep">
                  No incluye
                </h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {tour.excludes.map((i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-neutral-dark"
                    >
                      <XIcon size={16} className="mt-0.5 shrink-0 text-sunset-warm" />
                      {i}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {tour.extras && (
              <section className="mt-8 rounded-card border border-ocean-light/50 bg-ocean-pale/30 p-5">
                <div className="flex items-start gap-2">
                  <Sparkles size={18} className="mt-0.5 text-sunset-orange" />
                  <div>
                    <h3 className="font-display text-lg text-ocean-deep">
                      Extras y destacados
                    </h3>
                    <p className="mt-1 text-sm text-neutral-dark">{tour.extras}</p>
                  </div>
                </div>
              </section>
            )}

            {tour.notes && (
              <section className="mt-6 rounded-card border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-start gap-2">
                  <Info size={18} className="mt-0.5 text-amber-600" />
                  <div>
                    <h3 className="font-semibold text-amber-800">Notas importantes</h3>
                    <p className="mt-1 text-sm text-amber-900">{tour.notes}</p>
                  </div>
                </div>
              </section>
            )}

            {/* Galería editorial con lightbox multi-imagen */}
            {images.length > 1 && (
              <TourGallery
                images={images}
                tourName={tour.name}
                tourSlug={tour.slug}
              />
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card border border-transparent p-6">
              {tour.priceAdult && (
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-widest text-neutral-mid">
                    Desde
                  </p>
                  <p className="font-display text-3xl text-ocean-deep">
                    R$ {tour.priceAdult}
                    <span className="text-sm font-normal text-neutral-mid">
                      {" "}
                      / persona
                    </span>
                  </p>
                </div>
              )}

              {tour.childPolicy && (
                <div className="mb-4 flex items-start gap-2 text-sm text-neutral-mid">
                  <Users size={16} className="mt-0.5 shrink-0 text-ocean-mid" />
                  <span>{tour.childPolicy}</span>
                </div>
              )}

              {tour.paymentMethods.length > 0 && (
                <div className="mb-6 flex items-start gap-2 text-sm text-neutral-mid">
                  <CreditCard size={16} className="mt-0.5 shrink-0 text-ocean-mid" />
                  <div>
                    <p className="font-semibold text-neutral-dark">Pagos aceptados:</p>
                    <p className="mt-1">{tour.paymentMethods.join(" · ")}</p>
                  </div>
                </div>
              )}

              <Link
                href={`/contacto?tour=${tour.slug}`}
                className="btn-primary w-full"
              >
                Reservar este tour
              </Link>
              <a
                href={whatsappLink(
                  `Hola AugustoTours! Me interesa el tour "${tour.name}". ¿Podrían darme más información?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-ocean-mid px-6 py-3 font-semibold text-ocean-mid transition hover:bg-ocean-mid hover:text-neutral-white"
              >
                <MessageCircle size={18} /> Hablar por WhatsApp
              </a>

              <p className="mt-4 text-center text-xs text-neutral-mid">
                Confirmación en menos de 24 hs
              </p>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
