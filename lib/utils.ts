import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCategory(category: string) {
  const map: Record<string, string> = {
    EXCURSION: "Excursión",
    CITY: "City Tour",
    AVENTURA: "Aventura",
    NAUTICO: "Náutico",
    CULTURAL: "Cultural",
  }
  return map[category] || category
}

export function categoryColor(category: string) {
  const map: Record<string, string> = {
    EXCURSION: "bg-ocean-light text-ocean-deep",
    CITY: "bg-sunset-orange/20 text-sunset-warm",
    AVENTURA: "bg-emerald-100 text-emerald-700",
    NAUTICO: "bg-sky-100 text-sky-700",
    CULTURAL: "bg-purple-100 text-purple-700",
  }
  return map[category] || "bg-neutral-light text-neutral-mid"
}

export function tourImage(slug: string) {
  return `/img/tours/${slug}.jpg`
}

// Número de WhatsApp de AugustoTours (código de país + DDD + número, sin '+' ni espacios).
// Si cambia, se actualiza acá y se replica en todos los botones.
export const WHATSAPP_NUMBER = "5521985436387"

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : ""
  return `https://wa.me/${WHATSAPP_NUMBER}${text}`
}

// Email de contacto. Centralizado para no repetirlo en cada componente.
export const CONTACT_EMAIL = "joakiorlandoprados@gmail.com"

export function mailtoLink(subject?: string, body?: string) {
  const params = new URLSearchParams()
  if (subject) params.set("subject", subject)
  if (body) params.set("body", body)
  const qs = params.toString()
  return `mailto:${CONTACT_EMAIL}${qs ? `?${qs}` : ""}`
}
