export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  try {
    if (slug) {
      const tour = await prisma.tour.findUnique({ where: { slug } });
      if (!tour) {
        return NextResponse.json({ error: "Tour no encontrado" }, { status: 404 });
      }
      return NextResponse.json({ tour: { ...tour, createdAt: tour.createdAt.toISOString() } });
    }

    const tours = await prisma.tour.findMany({
      where: {
        active: true,
        ...(category ? { category: category as any } : {}),
        ...(featured === "true" ? { featured: true } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      tours: tours.map((t) => ({ ...t, createdAt: t.createdAt.toISOString() })),
    });
  } catch (err) {
    return NextResponse.json({ tours: [] });
  }
}
