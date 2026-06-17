import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/home/Hero";
import { FeaturedTours } from "@/components/home/FeaturedTours";
import { Categories } from "@/components/home/Categories";
import { WhyUs } from "@/components/home/WhyUs";
import type { Tour } from "@/types";

export const dynamic = "force-dynamic";

async function getTours(): Promise<Tour[]> {
  try {
    const tours = await prisma.tour.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });
    return tours.map((t) => ({
      ...t,
      createdAt: t.createdAt.toISOString(),
    }));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const tours = await getTours();

  return (
    <>
      <Hero />
      <FeaturedTours tours={tours} />
      <Categories />
      <WhyUs />
    </>
  );
}
