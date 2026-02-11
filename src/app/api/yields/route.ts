import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const yields = await db.yield.findMany({
      where: { userId: session.user.id },
      include: {
        crop: true,
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(yields);
  } catch (error) {
    console.error("Error fetching yields:", error);
    return NextResponse.json(
      { error: "Failed to fetch yields" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { cropId, amount, unit, revenue } = body;

    const yieldRecord = await db.yield.create({
      data: {
        userId: session.user.id,
        cropId,
        amount: parseFloat(amount),
        unit,
        revenue: revenue ? parseFloat(revenue) : null,
      },
    });

    return NextResponse.json(yieldRecord);
  } catch (error) {
    console.error("Error creating yield:", error);
    return NextResponse.json(
      { error: "Failed to create yield" },
      { status: 500 }
    );
  }
}
