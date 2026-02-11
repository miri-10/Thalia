import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sprout, Info, ArrowLeft, TrendingUp, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CropDetailPage(props: any) {
    const params = await props.params;
    const cropParam = params.crop;
    const cropNameSlug = decodeURIComponent(cropParam);
    // Simple case handling
    const formattedName = cropNameSlug.charAt(0).toUpperCase() + cropNameSlug.slice(1).toLowerCase();

    const crop = await db.crop.findFirst({
        where: {
            name: {
                equals: formattedName // Case handling improvement needed for production
            }
        },
        include: {
            districts: true,
            marketPrices: {
                include: {
                    district: true
                },
                orderBy: {
                    date: 'desc'
                },
                take: 5
            }
        }
    })

    if (!crop) {
        return (
            <div className="container py-12 text-center">
                <h1 className="text-2xl font-bold">Crop not found</h1>
                <p>Could not find data for {formattedName}.</p>
                <Link href="/crops" className="mt-4 inline-block">
                    <Button>Back to Crops</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container py-8 md:py-12">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/crops">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight capitalize">{crop.name}</h1>
                    <p className="text-muted-foreground italic">{crop.scientificName}</p>
                </div>
            </div>

            <Tabs defaultValue="info" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="info" className="flex gap-2"><Info className="h-4 w-4" /> Information</TabsTrigger>
                    <TabsTrigger value="market" className="flex gap-2"><TrendingUp className="h-4 w-4" /> Market Price</TabsTrigger>
                    <TabsTrigger value="distribution" className="flex gap-2"><MapPin className="h-4 w-4" /> Distribution</TabsTrigger>
                </TabsList>

                <TabsContent value="info">
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>About {crop.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="leading-7">{crop.description || "No detailed description available."}</p>
                                <div className="mt-6">
                                    <h4 className="font-semibold mb-2">Planting Season</h4>
                                    <Badge>{crop.season || "Varies"}</Badge>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Facts</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <span className="font-semibold block text-sm text-muted-foreground">Type</span>
                                    <span>Cash Crop / Cereal</span>
                                </div>
                                <div>
                                    <span className="font-semibold block text-sm text-muted-foreground">Water Requirement</span>
                                    <span>High</span>
                                </div>
                                <div>
                                    <span className="font-semibold block text-sm text-muted-foreground">Soil Type</span>
                                    <span>Alluvial, Clay</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="market">
                    <Card>
                        <CardHeader>
                            <CardTitle>Latest Market Prices</CardTitle>
                            <CardDescription>Recent price updates from various districts.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {crop.marketPrices.length > 0 ? (
                                <div className="space-y-4">
                                    {crop.marketPrices.map((price: any) => (
                                        <div key={price.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                            <div>
                                                <div className="font-medium">{price.district.name}</div>
                                                <div className="text-xs text-muted-foreground">{new Date(price.date).toLocaleDateString()}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold">Rs. {price.price}</span>
                                                <span className="text-sm text-muted-foreground">/ {price.unit}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No recent market data available.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="distribution">
                    <Card>
                        <CardHeader>
                            <CardTitle>Suitable Districts</CardTitle>
                            <CardDescription>Districts where {crop.name} is commonly grown.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {crop.districts.length > 0 ? (
                                    crop.districts.map((d: any) => (
                                        <Link key={d.id} href={`/districts/${d.name.toLowerCase()}`}>
                                            <Badge variant="secondary" className="hover:bg-green-100 cursor-pointer transition-colors">
                                                {d.name}
                                            </Badge>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground">Distribution data not computed.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
