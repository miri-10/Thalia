import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CloudSun, Sprout, Info, Thermometer, Droplets, Wind } from "lucide-react";
import { getDistrictById } from "@/data/districts";
import { getCropsByIds } from "@/data/crops";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const tempData = [
  { day: "Mon", temp: 24 }, { day: "Tue", temp: 26 }, { day: "Wed", temp: 23 },
  { day: "Thu", temp: 28 }, { day: "Fri", temp: 25 }, { day: "Sat", temp: 22 }, { day: "Sun", temp: 24 },
];

const rainData = [
  { day: "Mon", rain: 5 }, { day: "Tue", rain: 12 }, { day: "Wed", rain: 8 },
  { day: "Thu", rain: 0 }, { day: "Fri", rain: 15 }, { day: "Sat", rain: 20 }, { day: "Sun", rain: 10 },
];

const DistrictPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const district = getDistrictById(id || "");

  if (!district) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">District not found</h1>
          <Link to="/" className="text-primary mt-4 inline-block">← Back to map</Link>
        </div>
      </div>
    );
  }

  const districtCrops = getCropsByIds(district.crops);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb + Header */}
      <div className="bg-gradient-hero">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-4">
            <Link to="/" className="hover:text-primary-foreground">Home</Link>
            <span>/</span>
            <span className="text-primary-foreground">{district.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary-foreground">{district.name}</h1>
              <p className="text-primary-foreground/70">{district.region} Province • {district.area} km²</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="crops" className="w-full">
          <TabsList className="w-full justify-start bg-muted mb-6">
            <TabsTrigger value="crops" className="gap-2"><Sprout className="h-4 w-4" />Crops</TabsTrigger>
            <TabsTrigger value="weather" className="gap-2"><CloudSun className="h-4 w-4" />Weather</TabsTrigger>
            <TabsTrigger value="info" className="gap-2"><Info className="h-4 w-4" />Agriculture Info</TabsTrigger>
          </TabsList>

          <TabsContent value="crops">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {districtCrops.map((crop, i) => (
                <motion.div
                  key={crop.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/crop/${crop.id}`}
                    className="block rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition-all hover:-translate-y-0.5"
                  >
                    <div className="text-4xl mb-3">{crop.image}</div>
                    <h3 className="font-semibold text-foreground">{crop.name}</h3>
                    <p className="text-xs text-muted-foreground">{crop.nameNe} • {crop.season}</p>
                    <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      crop.difficulty === "Easy" ? "bg-accent text-accent-foreground" :
                      crop.difficulty === "Medium" ? "bg-harvest/20 text-harvest-foreground" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {crop.difficulty}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weather">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Current weather */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-4">Current Weather</h3>
                <div className="flex items-center gap-6">
                  <div className="text-5xl">☀️</div>
                  <div>
                    <div className="text-4xl font-bold">26°C</div>
                    <p className="text-muted-foreground">Partly Cloudy</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Thermometer className="h-4 w-4 text-destructive" />
                    <span className="text-muted-foreground">Feels 28°C</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Droplets className="h-4 w-4 text-sky" />
                    <span className="text-muted-foreground">65% Humidity</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Wind className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">12 km/h</span>
                  </div>
                </div>
              </div>

              {/* Alert */}
              <div className="rounded-xl border border-harvest/30 bg-harvest/10 p-6">
                <h3 className="text-lg font-semibold text-harvest-foreground mb-2">⚠️ Weather Alert</h3>
                <p className="text-sm text-harvest-foreground/80">
                  Heavy rainfall expected in the next 48 hours. Secure harvested crops and ensure proper drainage in paddy fields.
                </p>
              </div>

              {/* Temperature chart */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-4">7-Day Temperature</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={tempData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                    <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Line type="monotone" dataKey="temp" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Rainfall chart */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-4">7-Day Rainfall (mm)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={rainData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                    <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Bar dataKey="rain" fill="hsl(var(--sky))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="info">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-3">Soil Type</h3>
                <p className="text-muted-foreground text-sm">
                  {district.region === "Madhesh" ? "Alluvial soil, rich in nutrients, ideal for cereal crops and sugarcane." :
                   district.region === "Koshi" ? "Sandy loam in Terai, acidic hill soil in higher elevations. Suitable for tea and paddy." :
                   "Loamy soil with moderate organic content. Good drainage for diverse crop cultivation."}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-3">Best Practices</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Practice crop rotation to maintain soil fertility</li>
                  <li>• Use organic compost alongside chemical fertilizers</li>
                  <li>• Implement proper irrigation and drainage systems</li>
                  <li>• Use disease-resistant varieties recommended by NARC</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-3">Seasonal Recommendations</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3"><span className="font-medium text-primary">Spring:</span><span className="text-muted-foreground">Prepare nursery for rice, plant maize and vegetables</span></div>
                  <div className="flex gap-3"><span className="font-medium text-primary">Summer:</span><span className="text-muted-foreground">Transplant rice, manage pests, irrigate crops</span></div>
                  <div className="flex gap-3"><span className="font-medium text-primary">Autumn:</span><span className="text-muted-foreground">Harvest rice, prepare for winter crops</span></div>
                  <div className="flex gap-3"><span className="font-medium text-primary">Winter:</span><span className="text-muted-foreground">Plant wheat, lentils, and mustard</span></div>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-3">Government Programs</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Prime Minister Agriculture Modernization Project (PMAMP)</li>
                  <li>• Agricultural subsidies for seeds and fertilizers</li>
                  <li>• Crop insurance schemes</li>
                  <li>• Youth in Agriculture program</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default DistrictPage;
