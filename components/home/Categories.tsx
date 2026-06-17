"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Compass,
  Building2,
  Mountain,
  Waves,
  Landmark,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    key: "EXCURSION",
    label: "Excursiones",
    desc: "Angra, Búzios, Arraial y más",
    icon: Compass,
    color: "from-ocean-light to-ocean-mid",
  },
  {
    key: "CITY",
    label: "City Tours",
    desc: "Cristo, Pan de Azúcar, Maracanã",
    icon: Building2,
    color: "from-sunset-orange to-sunset-warm",
  },
  {
    key: "AVENTURA",
    label: "Aventura",
    desc: "Trekking, paddle y naturaleza",
    icon: Mountain,
    color: "from-emerald-400 to-emerald-600",
  },
  {
    key: "NAUTICO",
    label: "Náutico",
    desc: "Lanchas, jet ski y helicopteros",
    icon: Waves,
    color: "from-sky-400 to-sky-600",
  },
  {
    key: "CULTURAL",
    label: "Cultural",
    desc: "Favelas, museos e historia",
    icon: Landmark,
    color: "from-purple-400 to-purple-600",
  },
];

export function Categories() {
  return (
    <section className="bg-neutral-light py-20">
      <div className="container-page">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-sunset-orange">
            Explorá por tipo
          </span>
          <h2 className="mt-2 font-display text-3xl text-ocean-deep sm:text-4xl">
            ¿Qué querés vivir en Río?
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={`/tours?cat=${c.key}`}
                  className="group flex h-full flex-col rounded-card bg-neutral-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
                >
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-neutral-white`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-lg text-ocean-deep">
                    {c.label}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-mid">{c.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ocean-mid group-hover:gap-2 transition-all">
                    Ver tours <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
