import { CloudSun, CloudRain, Sun, Wind } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function WeatherCard() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Weather (Kathmandu)
                </CardTitle>
                <CloudSun className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">24°C</div>
                <p className="text-xs text-muted-foreground">
                    Partly Cloudy
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Wind className="h-3 w-3" /> 5 km/h
                    </div>
                    <div className="flex items-center gap-1">
                        <CloudRain className="h-3 w-3" /> 10%
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
