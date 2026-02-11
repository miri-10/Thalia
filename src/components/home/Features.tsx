import { CloudSun, Sprout, TrendingUp, Users } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function Features() {
    return (
        <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24" id="features">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                    Everything you need to grow
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Thalia provides a complete ecosystem for modern farming in Nepal.
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CloudSun className="h-10 w-10 text-green-600 mb-2" />
                        <CardTitle>Weather</CardTitle>
                        <CardDescription>
                            Localized 7-day forecasts and severe weather alerts.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <Sprout className="h-10 w-10 text-green-600 mb-2" />
                        <CardTitle>Crops</CardTitle>
                        <CardDescription>
                            Detailed guides for 50+ crops suitable for your district.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <TrendingUp className="h-10 w-10 text-green-600 mb-2" />
                        <CardTitle>Market</CardTitle>
                        <CardDescription>
                            Live price updates from Kalimati and regional markets.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <Users className="h-10 w-10 text-green-600 mb-2" />
                        <CardTitle>Experts</CardTitle>
                        <CardDescription>
                            Connect with agriculture experts and fellow farmers.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </section>
    )
}
