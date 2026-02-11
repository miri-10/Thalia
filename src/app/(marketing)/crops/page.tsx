import Link from "next/link"
import { db } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sprout, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function CropsPage() {
    const crops = await db.crop.findMany({
        orderBy: { name: 'asc' }
    })

    return (
        <div className="container py-8 md:py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">All Crops</h1>
                <p className="text-muted-foreground">Browse all available crops and their details.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {crops.map((crop) => (
                    <Card key={crop.id} className="group hover:shadow-lg transition-all">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-xl mb-1">{crop.name}</CardTitle>
                                    <CardDescription>{crop.scientificName || "Scientific Name Unknown"}</CardDescription>
                                </div>
                                <Sprout className="h-5 w-5 text-green-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                {crop.description || "No description available."}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                                <Badge variant="outline">{crop.season || "Sesaon Info"}</Badge>
                                <Link href={`/crops/${crop.name.toLowerCase()}`}>
                                    <Button variant="ghost" size="sm" className="group-hover:text-green-600">
                                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
