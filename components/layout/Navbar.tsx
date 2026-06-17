"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/tours", label: "Tours" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all ${
        scrolled
          ? "bg-neutral-white/90 backdrop-blur shadow-soft"
          : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/img/logo.jpeg"
            alt="AugustoTours"
            width={48}
            height={48}
            className="h-10 w-10 rounded-full object-cover md:h-12 md:w-12"
            priority
          />
          <div className="leading-tight">
            <p className="font-display text-lg font-bold text-ocean-deep md:text-xl">
              AugustoTours
            </p>
            <p className="text-[10px] uppercase tracking-widest text-neutral-mid md:text-xs">
              Río de Janeiro
            </p>
          </div>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-medium text-neutral-dark transition-colors hover:text-ocean-mid"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/tours" className="btn-primary text-sm">
              Reservar
            </Link>
          </li>
        </ul>

        <button
          aria-label="Abrir menú"
          className="rounded-full p-2 text-ocean-deep md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-neutral-light bg-neutral-white md:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block rounded-lg px-3 py-2 text-base font-medium text-neutral-dark hover:bg-ocean-pale/40"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="px-3 pt-2">
                <Link
                  href="/tours"
                  className="btn-primary w-full text-sm"
                  onClick={() => setOpen(false)}
                >
                  Reservar
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
