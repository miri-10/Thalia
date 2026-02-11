import { Hero } from "@/components/home/Hero"
import { Features } from "@/components/home/Features"
import { Stats } from "@/components/home/Stats"
import { NepalMap } from "@/components/home/NepalMap"

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <div id="districts" className="container py-12 text-center bg-green-50/50 rounded-3xl my-8">
        <h2 className="text-3xl font-bold mb-6">Explore Nepal by District</h2>
        <div className="flex items-center justify-center min-h-[400px]">
          <NepalMap />
        </div>
      </div>
      <Features />
      <Stats />
    </>
  )
}
