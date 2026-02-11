"use client"

import { TrendingUp, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface MarketPriceData {
    id: string
    name: string
    district: string
    price: string
    unit: string
    trend: "up" | "down"
    change: string
}

export function MarketOverview() {
    const [prices, setPrices] = useState<MarketPriceData[]>([])
    const [loading, setLoading] = useState(true)
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

    const fetchPrices = async () => {
        try {
            const res = await fetch('/api/market-prices')
            if (res.ok) {
                const data = await res.json()
                setPrices(data)
                setLastUpdated(new Date())
            }
        } catch (error) {
            console.error("Failed to fetch market prices", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPrices()
        const interval = setInterval(fetchPrices, 30000) // Poll every 30 seconds
        return () => clearInterval(interval)
    }, [])

    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Market Prices</CardTitle>
                        <CardDescription>Live updates from key markets</CardDescription>
                    </div>
                    {loading && <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />}
                    {!loading && lastUpdated && (
                        <span className="text-[10px] text-muted-foreground">
                            Updated: {lastUpdated.toLocaleTimeString()}
                        </span>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {prices.length > 0 ? (
                        prices.map((item) => (
                            <div key={item.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={cn("p-2 rounded-full", item.trend === "up" ? "bg-green-100" : "bg-red-100")}>
                                        <TrendingUp className={cn("h-4 w-4", item.trend === "up" ? "text-green-600" : "text-red-500")} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium leading-none">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.district} • per {item.unit}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold">Rs. {item.price}</span>
                                    <Badge variant={item.trend === "up" ? "default" : "destructive"} className={item.trend === "up" ? "bg-green-600" : "bg-red-500"}>
                                        {item.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                        {item.change}%
                                    </Badge>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                            {loading ? "Fetching latest prices..." : "No active market data."}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
