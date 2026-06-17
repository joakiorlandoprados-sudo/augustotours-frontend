"use client";

import { motion } from "framer-motion";
import { Languages, ShieldCheck, Heart, Clock } from "lucide-react";

const features = [
  {
    icon: Languages,
    title: "Atención multilingüe",
    desc: "Guías nativos con diversidad lingüística, comunicación sin barreras.",
  },
  {
    icon: ShieldCheck,
    title: "Reservas seguras",
    desc: "Pago flexible: efectivo, Pix, tarjeta o débito.",
  },
  {
    icon: Heart,
    title: "Atención personalizada",
    desc: "Asesoría por WhatsApp antes y durante tu viaje.",
  },
  {
    icon: Clock,
    title: "Salidas diarias",
    desc: "Itinerarios que se adaptan a tu ritmo.",
  },
];

export function WhyUs() {
  return (
    <section className="container-page py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-sunset-orange">
            Por qué elegirnos
          </span>
          <h2 className="mt-2 font-display text-3xl text-ocean-deep sm:text-4xl">
            Hecho por gente que vive Río y te lo cuenta en tu idioma.
          </h2>
          <p className="mt-4 max-w-xl text-neutral-mid">
            Más de una década acompañando a viajeros hispanohablantes a
            descubrir lo mejor de Río de Janeiro. Excursiones curadas,
            logística cuidada y guías locales que aman lo que hacen.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="card border border-transparent p-6"
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ocean-pale text-ocean-deep">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-lg text-ocean-deep">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-mid">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
