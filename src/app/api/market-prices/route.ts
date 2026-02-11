import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = 'force-dynamic' // defaults to auto, but we want to ensure it's treated as dynamic if we were deploying

export async function GET() {
    try {
        // Fetch latest prices for a few key crops from DB
        // In a real app, this would be complex. For MVP, we get the latest price for each crop/district combo
        // We'll just fetch a few distinct ones for the dashboard overview.

        // For the purpose of "Simulated Realtime", we can fetch the base prices and randomly fluctuate them slightly.

        const basePrices = await db.marketPrice.findMany({
            take: 5,
            orderBy: {
                date: 'desc'
            },
            include: {
                crop: true,
                district: true
            }
        })

        // Simulate live changes
        const livePrices = basePrices.map(bp => {
            const fluctuation = (Math.random() - 0.5) * 5; // +/- 2.5
            const newPrice = Math.max(10, bp.price + fluctuation);
            const trend = fluctuation > 0 ? "up" : "down";
            const change = Math.abs((fluctuation / bp.price) * 100).toFixed(1);

            return {
                id: bp.id,
                name: bp.crop.name,
                district: bp.district.name,
                price: newPrice.toFixed(0),
                unit: bp.unit,
                trend,
                change
            }
        })

        return NextResponse.json(livePrices)
    } catch (error) {
        console.error("Error fetching market prices:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
