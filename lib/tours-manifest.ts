// Listado de fotos por tour, en el orden en que deben aparecer.
// La primera foto de cada array se usa como "principal" en la grilla y como hero del detalle.
// Los nombres de archivo preservan mayúsculas/minúsculas del original (.JPEG vs .jpeg)
// porque al desplegar en Linux (Vercel, etc.) el filesystem ES case-sensitive.
// Si agregás una foto nueva, copiala a public/img/tours/<slug>/ y sumá la entrada acá.

export const TOUR_IMAGES: Record<string, string[]> = {
  "angra-dos-reis": [
    "angra-dos-reis/IMG_2654.JPEG",
    "angra-dos-reis/IMG_2655.JPEG",
    "angra-dos-reis/IMG_2656.JPEG",
    "angra-dos-reis/IMG_2657.JPEG",
    "angra-dos-reis/IMG_2658.JPEG",
    "angra-dos-reis/IMG_2659.JPEG",
  ],
  "buzios": [
    "buzios/buzios1.jpeg",
    "buzios/buzios2.jpeg",
    "buzios/buzios3.jpeg",
    "buzios/buzios4.jpeg",
    "buzios/buzios5.jpeg",
  ],
  "arraial-do-cabo": [
    "arraial-do-cabo/IMG_2660.JPEG",
    "arraial-do-cabo/IMG_2661.JPEG",
    "arraial-do-cabo/IMG_2662.JPEG",
    "arraial-do-cabo/IMG_2663.JPEG",
    "arraial-do-cabo/IMG_2664.JPEG",
    "arraial-do-cabo/IMG_2665.JPEG",
  ],
  "city-tour": [
    "city-tour/IMG_2666.JPEG",
    "city-tour/IMG_2667.JPEG",
    "city-tour/IMG_2668.JPEG",
    "city-tour/IMG_2669.JPEG",
    "city-tour/IMG_2670.JPEG",
    "city-tour/IMG_2671.JPEG",
    "city-tour/IMG_2672.JPEG",
    "city-tour/IMG_2673.JPEG",
    "city-tour/IMG_2674.JPEG",
    "city-tour/IMG_2675.JPEG",
  ],
  "un-dia-en-rio": [
    "un-dia-en-rio/IMG_2679.JPEG",
    "un-dia-en-rio/IMG_2680.JPEG",
    "un-dia-en-rio/IMG_2681.JPEG",
    "un-dia-en-rio/IMG_2682.JPEG",
    "un-dia-en-rio/IMG_2683.JPEG",
    "un-dia-en-rio/IMG_2684.JPEG",
    "un-dia-en-rio/IMG_2685.JPEG",
    "un-dia-en-rio/IMG_2686.JPEG",
    "un-dia-en-rio/IMG_2687.JPEG",
  ],
  "aquario-boulevard": [
    "aquario-boulevard/IMG_2688.JPEG",
    "aquario-boulevard/IMG_2689.JPEG",
    "aquario-boulevard/IMG_2690.JPEG",
    "aquario-boulevard/IMG_2691.JPEG",
    "aquario-boulevard/IMG_2692.JPEG",
  ],
  "maracana": [
    "maracana/IMG_2693.JPEG",
    "maracana/IMG_2694.JPEG",
    "maracana/IMG_2695.JPEG",
    "maracana/IMG_2696.JPEG",
    "maracana/IMG_2697.JPEG",
  ],
  "petropolis": [
    "petropolis/IMG_2698.JPEG",
    "petropolis/IMG_2699.JPEG",
    "petropolis/IMG_2700.JPEG",
    "petropolis/IMG_2701.JPEG",
  ],
  "favela-rocinha": [
    "favela-rocinha/IMG_2702.JPEG",
    "favela-rocinha/IMG_2703.JPEG",
    "favela-rocinha/IMG_2704.JPEG",
    "favela-rocinha/IMG_2705.JPEG",
    "favela-rocinha/IMG_2706.JPEG",
    "favela-rocinha/IMG_2707.JPEG",
    "favela-rocinha/IMG_2708.JPEG",
  ],
  "helicoptero": [
    "helicoptero/IMG_2709.JPEG",
    "helicoptero/IMG_2710.JPEG",
    "helicoptero/IMG_2711.JPEG",
    "helicoptero/IMG_2712.JPEG",
    "helicoptero/IMG_2713.JPEG",
  ],
  "pedra-do-telegrafo": [
    "pedra-do-telegrafo/IMG_2714.JPEG",
    "pedra-do-telegrafo/IMG_2715.JPEG",
    "pedra-do-telegrafo/IMG_2716.JPEG",
    "pedra-do-telegrafo/IMG_2717.JPEG",
    "pedra-do-telegrafo/IMG_2718.JPEG",
    "pedra-do-telegrafo/IMG_2719.JPEG",
  ],
  "lancha-jet-ski": [
    "lancha-jet-ski/IMG_2720.JPEG",
    "lancha-jet-ski/IMG_2721.JPEG",
    "lancha-jet-ski/IMG_2722.JPEG",
    "lancha-jet-ski/IMG_2723.JPEG",
    "lancha-jet-ski/IMG_2724.JPEG",
    "lancha-jet-ski/IMG_2725.JPEG",
    "lancha-jet-ski/IMG_2726.JPEG",
    "lancha-jet-ski/IMG_2727.JPEG",
    "lancha-jet-ski/IMG_2728.JPEG",
    "lancha-jet-ski/IMG_2729.JPEG",
  ],
  "sup-amanecer": [
    "sup-amanecer/IMG_2730.JPEG",
    "sup-amanecer/IMG_2731.JPEG",
    "sup-amanecer/IMG_2732.JPEG",
    "sup-amanecer/IMG_2733.JPEG",
    "sup-amanecer/IMG_2734.JPEG",
    "sup-amanecer/IMG_2735.JPEG",
    "sup-amanecer/IMG_2736.JPEG",
    "sup-amanecer/IMG_2737.JPEG",
  ],
  "morro-dois-irmaos": [
    "morro-dois-irmaos/IMG_2738.JPEG",
    "morro-dois-irmaos/IMG_2739.JPEG",
    "morro-dois-irmaos/IMG_2740.JPEG",
    "morro-dois-irmaos/IMG_2741.JPEG",
    "morro-dois-irmaos/IMG_2742.JPEG",
    "morro-dois-irmaos/IMG_2743.JPEG",
  ],
}

/**
 * Devuelve el listado de rutas completas de imágenes para un tour.
 * Si el slug no está en el manifest, devuelve un fallback con la ruta legacy
 * para no romper consumidores que ya usaban `tourImage(slug)`.
 */
export function tourImages(slug: string): string[] {
  const list = TOUR_IMAGES[slug]
  if (list && list.length > 0) {
    return list.map((p) => `/img/tours/${p}`)
  }
  return [`/img/tours/${slug}.jpg`]
}

/** Devuelve solo la foto principal (primera del manifest) o el fallback legacy. */
export function mainTourImage(slug: string): string {
  return tourImages(slug)[0]
}
