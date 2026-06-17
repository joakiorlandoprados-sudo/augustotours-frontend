import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { whatsappLink, mailtoLink } from "@/lib/utils";

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
          <ul className="space-y-3 text-sm text-ocean-pale">
            <li className="flex items-center gap-2">
              <a
                href={whatsappLink("Hola AugustoTours! Me gustaría recibir información sobre sus tours.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-neutral-white"
              >
                <MessageCircle size={16} /> WhatsApp AugustoTours
              </a>
            </li>
            <li className="flex items-center gap-2">
              <a
                href={mailtoLink("Consulta desde la web")}
                className="inline-flex items-center gap-2 hover:text-neutral-white"
              >
                <Mail size={16} /> joakiorlandoprados@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/augusto.tours"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-neutral-white"
              >
                <Instagram size={20} />
              </a>
            </li>
          </ul>
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
