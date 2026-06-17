export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, tourName, tourId, date, passengers, message, source } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nombre y email son obligatorios" },
        { status: 400 }
      );
    }

    let resolvedTourId: string | undefined = tourId;
    if (!resolvedTourId && tourName) {
      const tour = await prisma.tour.findFirst({
        where: { name: { equals: tourName, mode: "insensitive" } },
        select: { id: true },
      });
      if (tour) resolvedTourId = tour.id;
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        tourId: resolvedTourId || null,
        tourName: tourName || null,
        date: date || null,
        passengers: passengers ? Number(passengers) : null,
        message: message || null,
        source: source || "contact-form",
      },
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Error al guardar el lead" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ leads });
  } catch (err) {
    return NextResponse.json({ leads: [] });
  }
}
