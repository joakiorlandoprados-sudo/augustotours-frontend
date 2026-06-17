import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { TourDetail } from "@/components/tours/TourDetail";
import type { Tour } from "@/types";

export const dynamic = "force-dynamic";

async function getTour(slug: string): Promise<Tour | null> {
  try {
    const t = await prisma.tour.findUnique({ where: { slug } });
    if (!t) return null;
    return { ...t, createdAt: t.createdAt.toISOString() };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tour = await getTour(params.slug);
  if (!tour) return { title: "Tour no encontrado · AugustoTours" };
  return {
    title: `${tour.name} · AugustoTours`,
    description: tour.shortDesc,
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const tour = await getTour(params.slug);
  if (!tour) notFound();
  return <TourDetail tour={tour} />;
}
