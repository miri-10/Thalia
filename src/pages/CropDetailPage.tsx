import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Droplets, Sprout, TrendingUp, Truck } from "lucide-react";
import { getCropById } from "@/data/crops";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const priceTrend = [
  { month: "Aug", price: 32 }, { month: "Sep", price: 34 }, { month: "Oct", price: 33 },
  { month: "Nov", price: 36 }, { month: "Dec", price: 38 }, { month: "Jan", price: 35 },
  { month: "Feb", price: 37 },
];

const CropDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const crop = getCropById(id || "");

  if (!crop) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Crop not found</h1>
          <Link to="/" className="text-primary mt-4 inline-block">← Back to map</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Crop Header */}
      <div className="bg-gradient-hero">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-4">
            <Link to="/" className="hover:text-primary-foreground">Home</Link>
            <span>/</span>
            <span className="text-primary-foreground">{crop.name}</span>
          </div>
          <div className="flex items-center gap-5">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-5xl">{crop.image}</div>
            <div>
              <h1 className="text-3xl font-bold text-primary-foreground">{crop.name} <span className="text-lg font-normal text-primary-foreground/60">({crop.nameNe})</span></h1>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className="inline-flex items-center gap-1 text-sm text-primary-foreground/70">
                  <Calendar className="h-3.5 w-3.5" />{crop.season}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  crop.difficulty === "Easy" ? "bg-primary-foreground/20 text-primary-foreground" :
                  crop.difficulty === "Medium" ? "bg-harvest/30 text-primary-foreground" :
                  "bg-destructive/30 text-primary-foreground"
                }`}>
                  {crop.difficulty}
                </span>
                <span className="text-sm text-primary-foreground/70">{crop.growthDays} days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="plant" className="w-full">
          <TabsList className="w-full justify-start bg-muted mb-6 flex-wrap h-auto gap-1">
            <TabsTrigger value="plant" className="gap-2"><Sprout className="h-4 w-4" />How to Plant</TabsTrigger>
            <TabsTrigger value="info" className="gap-2"><Droplets className="h-4 w-4" />Plant Info</TabsTrigger>
            <TabsTrigger value="market" className="gap-2"><TrendingUp className="h-4 w-4" />Profit & Market</TabsTrigger>
            <TabsTrigger value="distribution" className="gap-2"><Truck className="h-4 w-4" />Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="plant">
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-4">Step-by-Step Guide</h3>
                <ol className="space-y-3">
                  {crop.plantingSteps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{i + 1}</span>
                      <span className="text-muted-foreground pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <h3 className="text-lg font-semibold mb-3">Soil Preparation</h3>
                  <p className="text-sm text-muted-foreground">{crop.soilType}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <h3 className="text-lg font-semibold mb-3">Fertilizer Needs</h3>
                  <p className="text-sm text-muted-foreground">{crop.fertilizer}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <h3 className="text-lg font-semibold mb-3">Water Requirements</h3>
                  <p className="text-sm text-muted-foreground">{crop.waterNeeds}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="info">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-3">Growth Cycle</h3>
                <p className="text-sm text-muted-foreground mb-2">{crop.description}</p>
                <p className="text-sm text-muted-foreground">Growth period: <strong>{crop.growthDays} days</strong></p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-3">Common Diseases</h3>
                <div className="flex flex-wrap gap-2">
                  {crop.diseases.map((d) => (
                    <span key={d} className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">{d}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-card lg:col-span-2">
                <h3 className="text-lg font-semibold mb-3">Harvest Guide</h3>
                <p className="text-sm text-muted-foreground">{crop.harvestGuide}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="market">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-4">Price Trend</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={priceTrend.map((p) => ({ ...p, price: p.price * (crop.avgPrice / 35) }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                    <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <h4 className="font-semibold mb-2">Current Market Price</h4>
                  <p className="text-3xl font-bold text-primary">{crop.avgPrice} <span className="text-lg font-normal text-muted-foreground">{crop.priceUnit}</span></p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <h4 className="font-semibold mb-2">Yield Estimate</h4>
                  <p className="text-sm text-muted-foreground">{crop.yieldPerHectare} per hectare</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <h4 className="font-semibold mb-2">Profit Calculator</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Estimated revenue: <strong className="text-foreground">NPR {(crop.avgPrice * 3500).toLocaleString()}/ha</strong></p>
                    <p>Estimated cost: <strong className="text-foreground">NPR {Math.round(crop.avgPrice * 3500 * 0.55).toLocaleString()}/ha</strong></p>
                    <p className="text-primary font-semibold">Est. profit: NPR {Math.round(crop.avgPrice * 3500 * 0.45).toLocaleString()}/ha</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="distribution">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-3">Market Locations</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Kalimati Fruits & Vegetables Market, Kathmandu</li>
                  <li>• Biratnagar Agricultural Market</li>
                  <li>• Butwal Regional Market Center</li>
                  <li>• Local haat bazaars (weekly markets)</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-3">Storage Guide</h3>
                <p className="text-sm text-muted-foreground">
                  Store in cool, dry, well-ventilated spaces. Maintain moisture below 14% for grains.
                  Use improved grain storage bins (metallic bins) to prevent pest damage. Check regularly for signs of spoilage.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-card lg:col-span-2">
                <h3 className="text-lg font-semibold mb-3">Export Potential</h3>
                <p className="text-sm text-muted-foreground">
                  Nepal exports select agricultural products to India, Bangladesh, and international markets.
                  Key opportunities include orthodox tea, large cardamom, ginger, and specialty herbs. Contact the
                  Trade and Export Promotion Centre (TEPC) for certification and export guidelines.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default CropDetailPage;
