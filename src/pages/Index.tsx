import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Background3D from "@/components/Background3D";
import NepalMap from "@/components/NepalMap";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0f1a0f] text-white relative overflow-hidden">
      <Background3D />
      
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 bg-black/20 backdrop-blur-sm border-b border-white/10 py-2 px-4 text-center text-xs tracking-widest uppercase"
      >
        Empowering Nepalese farmers with district-specific agricultural insights
      </motion.div>

      {/* Header */}
      <header className="relative z-20 px-6 py-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl font-bold flex items-center gap-2"
          >
            <img src="/logo.png" alt="Thalia Logo" className="h-8 w-8 object-contain" />
            Thalia
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-6"
          >
            <Link to="/map" className="text-sm hover:text-primary transition-colors hidden sm:block font-medium">
              Districts
            </Link>
            <Link to="/dashboard" className="text-sm hover:text-primary transition-colors hidden sm:block font-medium">
              Dashboard
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
              >
                Sign In
              </Button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-180px)] px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <img src="/logo.png" alt="Thalia Logo" className="h-32 w-32 object-contain" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight tracking-tight"
            style={{ fontFamily: 'Talent, Plus Jakarta Sans, sans-serif' }}
          >
            Join The Agriculture
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
              Layer of Nepal
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Thalia is a community of the best farmers learning, growing,
            <br />
            and building sustainable agriculture in Nepal
          </motion.p>
        </div>
      </main>

      {/* Map Section */}
      <section id="map" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Explore <span className="text-primary">Nepal's Districts</span>
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              Click on any district to discover crop recommendations, weather patterns, 
              market prices, and expert farming advice specific to that region.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <NepalMap />
            <div className="flex justify-center mt-8">
              <Link to="/map">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
                >
                  View Full Screen Map
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What is <span className="text-primary">Thalia</span>?
            </h2>
            <div className="max-w-4xl mx-auto space-y-6 text-base md:text-lg text-gray-300 leading-relaxed">
              <p>
                Thalia is Nepal's first comprehensive agricultural platform that combines 
                district-specific data, real-time insights, and expert guidance to empower 
                farmers across all 77 districts.
              </p>
              <p>
                Get tailored agricultural information for each district, including soil types, 
                climate patterns, and recommended crops. Track live market prices for crops 
                across different regions, helping farmers make informed decisions about when 
                and where to sell.
              </p>
              <p>
                Access accurate weather predictions and climate data to plan your farming 
                activities and protect your crops from adverse conditions. Connect with 
                agricultural experts and fellow farmers to share knowledge and build a 
                stronger farming community.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-orange-500/10 border border-white/10 rounded-3xl p-12 text-center"
          >
            <Users className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Join 50,000+ Farmers
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Be part of Nepal's growing agricultural community. Get access to expert 
              advice, connect with fellow farmers, and transform your farming practices 
              with data-driven insights.
            </p>
            <Link to="/login">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-200 font-semibold px-10"
              >
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="Thalia Logo" className="h-8 w-8 object-contain" />
                <span className="text-xl font-bold">Thalia</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering Nepalese farmers with smart agricultural solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/map" className="hover:text-white transition-colors">Districts</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Thalia Agri. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
