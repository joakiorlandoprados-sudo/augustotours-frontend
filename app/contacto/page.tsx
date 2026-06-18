"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Send, CheckCircle2, MessageCircle, Mail, MapPin } from "lucide-react";

function ContactForm() {
  const params = useSearchParams();
  const initialTour = params.get("tour") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    tourName: initialTour,
    date: "",
    passengers: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          passengers: form.passengers ? Number(form.passengers) : null,
          source: "contact-form",
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Error al enviar");
      }
      setStatus("sent");
      setForm({
        name: "",
        email: "",
        phone: "",
        tourName: initialTour,
        date: "",
        passengers: "",
        message: "",
      });
    } catch (err: any) {
      setErrorMsg(err?.message || "Error desconocido");
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={onSubmit}
          className="card border border-transparent p-6 sm:p-8"
        >
          <h2 className="font-display text-2xl text-ocean-deep">
            Pedinos tu cotización
          </h2>
          <p className="mt-1 text-sm text-neutral-mid">
            Completá el formulario y te respondemos en menos de 24 hs.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-neutral-dark">
                Nombre y apellido *
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full rounded-xl border border-neutral-light bg-neutral-light px-4 py-2.5 text-sm focus:border-ocean-mid focus:bg-neutral-white focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-neutral-dark">
                Email *
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full rounded-xl border border-neutral-light bg-neutral-light px-4 py-2.5 text-sm focus:border-ocean-mid focus:bg-neutral-white focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-neutral-dark">
                Teléfono / WhatsApp
              </label>
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+54 11 ..."
                className="w-full rounded-xl border border-neutral-light bg-neutral-light px-4 py-2.5 text-sm focus:border-ocean-mid focus:bg-neutral-white focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-neutral-dark">
                Tour de interés
              </label>
              <input
                value={form.tourName}
                onChange={(e) => update("tourName", e.target.value)}
                placeholder="Ej: Angra dos Reis"
                className="w-full rounded-xl border border-neutral-light bg-neutral-light px-4 py-2.5 text-sm focus:border-ocean-mid focus:bg-neutral-white focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-neutral-dark">
                Fecha aproximada
              </label>
              <input
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                placeholder="Ej: 15 de marzo"
                className="w-full rounded-xl border border-neutral-light bg-neutral-light px-4 py-2.5 text-sm focus:border-ocean-mid focus:bg-neutral-white focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-neutral-dark">
                Pasajeros
              </label>
              <input
                value={form.passengers}
                onChange={(e) => update("passengers", e.target.value)}
                type="number"
                min={1}
                className="w-full rounded-xl border border-neutral-light bg-neutral-light px-4 py-2.5 text-sm focus:border-ocean-mid focus:bg-neutral-white focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-semibold text-neutral-dark">
              Mensaje
            </label>
            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              rows={4}
              placeholder="Contanos qué te gustaría vivir en Río..."
              className="w-full rounded-xl border border-neutral-light bg-neutral-light px-4 py-2.5 text-sm focus:border-ocean-mid focus:bg-neutral-white focus:outline-none"
            />
          </div>

          {status === "error" && (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMsg}
            </p>
          )}

          {status === "sent" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
            >
              <CheckCircle2 size={16} /> ¡Listo! Recibimos tu consulta y te
              respondemos pronto.
            </motion.div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary mt-6 w-full sm:w-auto"
          >
            {status === "sending" ? "Enviando..." : "Enviar consulta"}{" "}
            <Send size={16} />
          </button>
        </motion.form>
      </div>

      <aside className="space-y-4 lg:col-span-2">
        <div className="card border border-transparent p-6">
          <h3 className="font-display text-lg text-ocean-deep">
            Otras formas de contactarnos
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href="https://wa.me/5521985436387"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-xl p-2 -m-2 transition-colors hover:bg-neutral-light"
              >
                <MessageCircle size={18} className="mt-0.5 text-ocean-mid" />
                <div>
                  <p className="font-semibold text-neutral-dark">WhatsApp</p>
                  <p className="text-neutral-mid">Respuesta inmediata</p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="mailto:joakiorlandoprados@gmail.com"
                className="flex items-start gap-3 rounded-xl p-2 -m-2 transition-colors hover:bg-neutral-light"
              >
                <Mail size={18} className="mt-0.5 text-ocean-mid" />
                <div>
                  <p className="font-semibold text-neutral-dark">Email</p>
                  <p className="text-neutral-mid">Te respondemos en menos de 24 hs</p>
                </div>
              </a>
            </li>
            <li className="flex items-start gap-3 p-2 -m-2">
              <MapPin size={18} className="mt-0.5 text-ocean-mid" />
              <div>
                <p className="font-semibold text-neutral-dark">Base operativa</p>
                <p className="text-neutral-mid">Copacabana, Río de Janeiro</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="rounded-card bg-ocean-deep p-6 text-neutral-white">
          <h3 className="font-display text-lg">¿Preferís chatear?</h3>
          <p className="mt-2 text-sm text-ocean-pale">
            Tocá el botón azul abajo a la derecha y nuestro asistente virtual
            te ayuda al instante con dudas, itinerarios y reservas.
          </p>
        </div>
      </aside>
    </div>
  );
}

export default function ContactoPage() {
  return (
    <div className="container-page py-12">
      <div className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-sunset-orange">
          Hablemos
        </span>
        <h1 className="mt-2 font-display text-3xl text-ocean-deep sm:text-4xl">
          Contacto
        </h1>
        <p className="mt-2 max-w-2xl text-neutral-mid">
          ¿Tenés un viaje en mente? Escribinos y armamos juntos la mejor
          experiencia para tu visita a Río.
        </p>
      </div>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-card bg-neutral-light" />}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
