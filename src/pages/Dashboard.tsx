import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell, User, CloudSun, TrendingUp, TrendingDown,
  BarChart3, Calendar, Wallet, Wheat, MessageCircle, AlertTriangle,
  Home, PieChart, Settings, LogOut, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { marketPrices } from "@/data/crops";
import {
  LineChart, Line, BarChart, Bar, PieChart as RPieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const calendarData = [
  { month: "Jan", rice: false, wheat: true, maize: false, potato: true, lentils: true },
  { month: "Feb", rice: false, wheat: true, maize: true, potato: true, lentils: true },
  { month: "Mar", rice: false, wheat: true, maize: true, potato: false, lentils: true },
  { month: "Apr", rice: false, wheat: true, maize: true, potato: false, lentils: false },
  { month: "May", rice: true, wheat: false, maize: true, potato: false, lentils: false },
  { month: "Jun", rice: true, wheat: false, maize: true, potato: false, lentils: false },
  { month: "Jul", rice: true, wheat: false, maize: true, potato: false, lentils: false },
  { month: "Aug", rice: true, wheat: false, maize: true, potato: false, lentils: false },
  { month: "Sep", rice: true, wheat: false, maize: false, potato: true, lentils: false },
  { month: "Oct", rice: true, wheat: false, maize: false, potato: true, lentils: true },
  { month: "Nov", rice: true, wheat: true, maize: false, potato: true, lentils: true },
  { month: "Dec", rice: false, wheat: true, maize: false, potato: true, lentils: true },
];

const expenseData = [
  { name: "Seeds", value: 15000, color: "hsl(142, 72%, 29%)" },
  { name: "Fertilizer", value: 25000, color: "hsl(200, 80%, 55%)" },
  { name: "Labor", value: 35000, color: "hsl(45, 90%, 50%)" },
  { name: "Equipment", value: 20000, color: "hsl(30, 40%, 45%)" },
  { name: "Other", value: 5000, color: "hsl(var(--muted-foreground))" },
];

const yieldData = [
  { season: "Spring '25", yield: 3.2, revenue: 112000 },
  { season: "Summer '25", yield: 4.1, revenue: 143500 },
  { season: "Autumn '25", yield: 3.8, revenue: 133000 },
  { season: "Winter '26", yield: 2.9, revenue: 101500 },
];

const sidebarItems = [
  { icon: Home, label: "Overview", active: true },
  { icon: TrendingUp, label: "Marketplace" },
  { icon: Calendar, label: "Calendar" },
  { icon: Wallet, label: "Expenses" },
  { icon: Wheat, label: "Yield" },
  { icon: BarChart3, label: "Analytics" },
  { icon: MessageCircle, label: "Chat" },
  { icon: AlertTriangle, label: "Alerts" },
];

const Dashboard = () => {
  const [lang, setLang] = useState<"en" | "ne">("en");
  const [activeSection, setActiveSection] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [expenses, setExpenses] = useState({
    seeds: "15000",
    fertilizer: "25000",
    labor: "35000",
    equipment: "20000",
    other: "5000",
  });

  const totalExpense = Object.values(expenses).reduce((s, v) => s + (parseInt(v) || 0), 0);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <BarChart3 className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Thalia Logo" className="h-8 w-8 object-contain" />
              <span className="text-lg font-bold hidden sm:block">Thalia</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="rounded-md border border-border px-2.5 py-1 text-xs font-medium"
              onClick={() => setLang(lang === "en" ? "ne" : "en")}
            >
              {lang === "en" ? "EN | नेपाली" : "नेपाली | EN"}
            </button>
            <button className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground flex items-center justify-center">3</span>
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-muted px-2.5 py-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">R</div>
              <span className="text-sm font-medium hidden sm:block">Ram</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "w-56" : "w-0 overflow-hidden"} shrink-0 border-r border-border bg-background transition-all duration-200 lg:w-56`}>
          <div className="p-4">
            <div className="rounded-xl bg-accent p-4 mb-6">
              <h4 className="text-sm font-semibold text-accent-foreground">Farm Profile</h4>
              <p className="text-xs text-muted-foreground mt-1">Ram's Farm, Chitwan</p>
              <p className="text-xs text-muted-foreground">2.5 hectares • Rice, Maize</p>
            </div>

            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveSection(item.label)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.label
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Weather mini */}
            <div className="mt-6 rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <CloudSun className="h-4 w-4 text-sky" />
                <span className="text-sm font-medium">Weather</span>
              </div>
              <div className="text-2xl font-bold">26°C</div>
              <p className="text-xs text-muted-foreground">Partly Cloudy, Chitwan</p>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
                <Settings className="h-4 w-4" />Settings
              </button>
              <Link to="/" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
                <LogOut className="h-4 w-4" />Logout
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={activeSection}>
            {/* Overview / Marketplace */}
            {(activeSection === "Overview" || activeSection === "Marketplace") && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {activeSection === "Overview" ? (lang === "en" ? "Dashboard Overview" : "ड्यासबोर्ड") : "Marketplace"}
                </h2>

                {/* Market prices table */}
                <div className="rounded-xl border border-border bg-card shadow-card mb-6">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-semibold">Live Market Prices</h3>
                    <Input placeholder="Search crops..." className="w-40 h-8 text-sm" />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="px-4 py-3 text-left font-medium text-muted-foreground">Crop</th>
                          <th className="px-4 py-3 text-right font-medium text-muted-foreground">Price</th>
                          <th className="px-4 py-3 text-right font-medium text-muted-foreground">Change</th>
                          <th className="px-4 py-3 text-right font-medium text-muted-foreground">Unit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {marketPrices.map((p) => (
                          <tr key={p.crop} className="border-b border-border last:border-0 hover:bg-muted/30">
                            <td className="px-4 py-3 font-medium">{p.crop}</td>
                            <td className="px-4 py-3 text-right font-semibold">NPR {p.price}</td>
                            <td className="px-4 py-3 text-right">
                              <span className={`inline-flex items-center gap-1 text-xs font-medium ${p.change > 0 ? "text-primary" : p.change < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                                {p.change > 0 ? <TrendingUp className="h-3 w-3" /> : p.change < 0 ? <TrendingDown className="h-3 w-3" /> : null}
                                {p.change > 0 ? "+" : ""}{p.change}%
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right text-muted-foreground">{p.unit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Calendar */}
            {activeSection === "Calendar" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Seasonal Crop Calendar</h2>
                <div className="rounded-xl border border-border bg-card shadow-card overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-3 py-3 text-left font-medium text-muted-foreground">Crop</th>
                        {calendarData.map((m) => (
                          <th key={m.month} className="px-2 py-3 text-center font-medium text-muted-foreground text-xs">{m.month}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(["rice", "wheat", "maize", "potato", "lentils"] as const).map((crop) => (
                        <tr key={crop} className="border-b border-border last:border-0">
                          <td className="px-3 py-3 font-medium capitalize">{crop}</td>
                          {calendarData.map((m) => (
                            <td key={m.month} className="px-2 py-3 text-center">
                              <div className={`mx-auto h-4 w-4 rounded-full ${m[crop] ? "bg-primary" : "bg-muted"}`} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-full bg-primary" /> Growing season</span>
                  <span className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-full bg-muted" /> Off season</span>
                </div>
              </div>
            )}

            {/* Expenses */}
            {activeSection === "Expenses" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Expense Tracker</h2>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                    <h3 className="font-semibold mb-4">Input Expenses (NPR)</h3>
                    <div className="space-y-3">
                      {Object.entries(expenses).map(([key, val]) => (
                        <div key={key} className="flex items-center gap-3">
                          <label className="w-24 text-sm capitalize text-muted-foreground">{key}</label>
                          <Input
                            type="number"
                            value={val}
                            onChange={(e) => setExpenses({ ...expenses, [key]: e.target.value })}
                            className="h-9"
                          />
                        </div>
                      ))}
                      <div className="pt-3 border-t border-border flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-primary">NPR {totalExpense.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                    <h3 className="font-semibold mb-4">Expense Breakdown</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <RPieChart>
                        <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50}>
                          {expenseData.map((e, i) => (
                            <Cell key={i} fill={e.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v: number) => `NPR ${v.toLocaleString()}`} />
                      </RPieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap gap-3 justify-center mt-2">
                      {expenseData.map((e) => (
                        <span key={e.name} className="flex items-center gap-1.5 text-xs">
                          <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: e.color }} />
                          {e.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Yield */}
            {activeSection === "Yield" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Yield Tracker</h2>
                <div className="grid gap-6 lg:grid-cols-3 mb-6">
                  <div className="rounded-xl border border-border bg-card p-6 shadow-card text-center">
                    <p className="text-sm text-muted-foreground">Total Yield</p>
                    <p className="text-3xl font-bold text-foreground mt-1">14.0 <span className="text-lg text-muted-foreground">tonnes</span></p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6 shadow-card text-center">
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-3xl font-bold text-primary mt-1">NPR 490K</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6 shadow-card text-center">
                    <p className="text-sm text-muted-foreground">Est. Profit</p>
                    <p className="text-3xl font-bold text-primary mt-1">NPR 390K</p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <h3 className="font-semibold mb-4">Seasonal Performance</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={yieldData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="season" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                      <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip />
                      <Bar dataKey="yield" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Yield (tonnes)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Analytics */}
            {activeSection === "Analytics" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Farm Analytics</h2>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                    <h3 className="font-semibold mb-4">Crop Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <RPieChart>
                        <Pie data={[
                          { name: "Rice", value: 40 },
                          { name: "Maize", value: 25 },
                          { name: "Wheat", value: 20 },
                          { name: "Vegetables", value: 15 },
                        ]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50}>
                          <Cell fill="hsl(142, 72%, 29%)" />
                          <Cell fill="hsl(45, 90%, 50%)" />
                          <Cell fill="hsl(30, 40%, 45%)" />
                          <Cell fill="hsl(200, 80%, 55%)" />
                        </Pie>
                        <Tooltip />
                      </RPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                    <h3 className="font-semibold mb-4">Revenue Trend</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={yieldData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="season" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                        <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                        <Tooltip formatter={(v: number) => `NPR ${v.toLocaleString()}`} />
                        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Chat */}
            {activeSection === "Chat" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Community Chat</h2>
                <Tabs defaultValue="farmer">
                  <TabsList className="mb-4">
                    <TabsTrigger value="farmer">Farmer to Farmer</TabsTrigger>
                    <TabsTrigger value="consumer">Farmer to Consumer</TabsTrigger>
                  </TabsList>
                  <TabsContent value="farmer">
                    <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
                      <div className="h-80 p-4 space-y-4 overflow-auto">
                        <div className="flex gap-3">
                          <div className="h-8 w-8 shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">S</div>
                          <div className="rounded-xl bg-muted px-4 py-2.5 max-w-sm">
                            <p className="text-xs font-medium text-foreground mb-0.5">Sita, Jhapa</p>
                            <p className="text-sm text-muted-foreground">Has anyone tried the new rice variety NR-1? How's the yield?</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="h-8 w-8 shrink-0 rounded-full bg-earth flex items-center justify-center text-earth-foreground text-xs font-bold">K</div>
                          <div className="rounded-xl bg-muted px-4 py-2.5 max-w-sm">
                            <p className="text-xs font-medium text-foreground mb-0.5">Kumar, Morang</p>
                            <p className="text-sm text-muted-foreground">Yes! I got about 4.5 tonnes/ha last season. Very good disease resistance too.</p>
                          </div>
                        </div>
                        <div className="flex gap-3 justify-end">
                          <div className="rounded-xl bg-primary/10 px-4 py-2.5 max-w-sm">
                            <p className="text-xs font-medium text-primary mb-0.5">You</p>
                            <p className="text-sm text-foreground">Thanks for sharing! What fertilizer schedule did you follow?</p>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-border p-3 flex gap-2">
                        <Input placeholder="Type a message..." className="h-9" />
                        <Button size="sm">Send</Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="consumer">
                    <div className="rounded-xl border border-border bg-card p-8 text-center shadow-card">
                      <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">Connect directly with consumers to sell your produce.</p>
                      <Button className="mt-4" size="sm">Start a Conversation</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Alerts */}
            {activeSection === "Alerts" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Weather Alerts</h2>
                <div className="space-y-4">
                  <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Heavy Rainfall Warning</h4>
                        <p className="text-sm text-muted-foreground mt-1">Expected 80-120mm rainfall in Chitwan district over next 48 hours. Secure stored grains and ensure drainage.</p>
                        <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-harvest/30 bg-harvest/5 p-5">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-harvest mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Frost Advisory</h4>
                        <p className="text-sm text-muted-foreground mt-1">Temperatures may drop below 5°C in Terai region tonight. Protect sensitive crops.</p>
                        <p className="text-xs text-muted-foreground mt-2">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-5 shadow-card">
                    <div className="flex items-start gap-3">
                      <CloudSun className="h-5 w-5 text-sky mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Clear Skies Expected</h4>
                        <p className="text-sm text-muted-foreground mt-1">Good weather expected from Friday. Ideal for harvesting and drying crops.</p>
                        <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
