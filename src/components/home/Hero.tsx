import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
                    Empowering Nepalese Farmers with <span className="text-green-600">Smart Agriculture</span>
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                    Get district-specific crop guidance, real-time market prices, weather forecasts, and expert advice to maximize your yield and profits.
                </p>
                <div className="space-x-4">
                    <Link href="/login">
                        <Button size="lg" className="h-11 px-8">
                            Get Started
                        </Button>
                    </Link>
                    <Link href="#districts">
                        <Button variant="outline" size="lg" className="h-11 px-8">
                            Explore Districts
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
