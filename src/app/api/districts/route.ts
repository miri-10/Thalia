import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const districts = await db.district.findMany({
      include: {
        weather: true,
        _count: {
          select: {
            marketPrices: true,
            farmProfiles: true,
          },
        },
      },
    });

    return NextResponse.json(districts);
  } catch (error) {
    console.error("Error fetching districts:", error);
    return NextResponse.json(
      { error: "Failed to fetch districts" },
      { status: 500 }
    );
  }
}
