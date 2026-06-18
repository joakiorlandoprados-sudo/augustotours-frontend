import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 bg-ocean-deep text-neutral-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/img/logo.jpeg"
              alt="AugustoTours"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover"
            />
            <div>
              <p className="font-display text-2xl font-bold">AugustoTours</p>
              <p className="text-sm text-ocean-pale">Río de Janeiro, Brasil</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-ocean-pale">
            Agencia de turismo especializada en viajeros hispanohablantes.
            Excursiones, city tours, aventuras y experiencias únicas en la
            Ciudad Maravillosa.
          </p>
        </div>

        <div>
          <p className="mb-3 font-semibold uppercase tracking-wider text-sm text-ocean-light">
            Navegación
          </p>
          <ul className="space-y-2 text-sm text-ocean-pale">
            <li>
              <Link href="/" className="hover:text-neutral-white">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/tours" className="hover:text-neutral-white">
                Tours
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-neutral-white">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-semibold uppercase tracking-wider text-sm text-ocean-light">
            Contacto
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/5521985436387"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-neutral-white transition-all duration-200 hover:scale-105 hover:bg-white/20"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href="mailto:joakiorlandoprados@gmail.com"
              aria-label="Email"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-neutral-white transition-all duration-200 hover:scale-105 hover:bg-white/20"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://instagram.com/augusto.tours"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-neutral-white transition-all duration-200 hover:scale-105 hover:bg-white/20"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ocean-mid/40">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-ocean-pale md:flex-row">
          <p>© {new Date().getFullYear()} AugustoTours. Todos los derechos reservados.</p>
          <p>Hecho con 💙 en Río de Janeiro.</p>
        </div>
      </div>
    </footer>
  );
}
