import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CloudSun, Sprout, Info, ArrowLeft, Thermometer, Droplets, CloudRain } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function DistrictPage({ params }: { params: { district: string } }) {
    const districtNameSlug = decodeURIComponent(params.district)

    // Attempt to find district case-insensitively or by exact match
    // For SQLite/Postgres in Prisma, standard filtering is case-sensitive usually.
    // We'll try to match exact name first, assuming seed data is "Kathmandu".
    // If we use slug in URL, we might need a transform. 
    // Let's assume the URL param matches the DB name for now (e.g. /districts/Kathmandu)
    // or we Capitalize the first letter.

    const formattedName = districtNameSlug.charAt(0).toUpperCase() + districtNameSlug.slice(1).toLowerCase();

    const district = await db.district.findFirst({
        where: {
            name: {
                equals: formattedName // Simplified, should ideally use mode: 'insensitive' if PG
            }
        },
        include: {
            suitableCrops: true,
            weather: true
        }
    })

    if (!district) {
        return (
            <div className="container py-12 text-center">
                <h1 className="text-2xl font-bold">District not found</h1>
                <p>Could not find data for {formattedName}.</p>
                <Link href="/districts" className="mt-4 inline-block">
                    <Button>Back to Map</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container py-8 md:py-12">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/#districts">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight capitalize">{district.name}</h1>
                    <p className="text-muted-foreground">{district.region}</p>
                </div>
            </div>

            <Tabs defaultValue="crops" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="crops" className="flex gap-2"><Sprout className="h-4 w-4" /> Suitable Crops</TabsTrigger>
                    <TabsTrigger value="weather" className="flex gap-2"><CloudSun className="h-4 w-4" /> Weather</TabsTrigger>
                    <TabsTrigger value="info" className="flex gap-2"><Info className="h-4 w-4" /> Agriculture Info</TabsTrigger>
                </TabsList>
                <TabsContent value="crops" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {district.suitableCrops.length > 0 ? (
                            district.suitableCrops.map((crop) => (
                                <Card key={crop.id}>
                                    <CardHeader>
                                        <CardTitle>{crop.name}</CardTitle>
                                        <CardDescription>{crop.scientificName || "Crop"}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {crop.description || "No description available."}
                                            </p>
                                            <div className="mt-2">
                                                <Badge variant="secondary">{crop.season || "All Season"}</Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-muted-foreground col-span-full">No crop data available for this district yet.</p>
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="weather">
                    {district.weather ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Current Weather</CardTitle>
                                <CardDescription>{district.name}, Nepal</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-5xl font-bold">{district.weather.temp}°C</div>
                                        <p className="text-xl text-muted-foreground mt-1 capitalize">{district.weather.conditions}</p>
                                    </div>
                                    <CloudSun className="h-20 w-20 text-yellow-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="flex items-center gap-2">
                                        <Droplets className="h-5 w-5 text-blue-500" />
                                        <span>Humidity: {district.weather.humidity}%</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CloudRain className="h-5 w-5 text-blue-400" />
                                        <span>Rainfall: {district.weather.rainfall} mm</span>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-muted rounded-lg">
                                    <h4 className="font-semibold mb-2">Forecast</h4>
                                    <p className="text-sm">{district.weather.forecast}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardContent className="pt-6">
                                <p>Weather data not available.</p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
                <TabsContent value="info">
                    <Card>
                        <CardHeader>
                            <CardTitle>District Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Additional agricultural information about soil types, irrigation, and local farming practices will be displayed here.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
