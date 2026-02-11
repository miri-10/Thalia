import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const districtId = searchParams.get("districtId");

    if (districtId) {
      const weather = await db.weather.findUnique({
        where: { districtId },
        include: {
          district: true,
        },
      });

      if (!weather) {
        return NextResponse.json(
          { error: "Weather data not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(weather);
    }

    const allWeather = await db.weather.findMany({
      include: {
        district: true,
      },
    });

    return NextResponse.json(allWeather);
  } catch (error) {
    console.error("Error fetching weather:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
