import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";
import Background3D from "@/components/Background3D";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0a0a1f] text-white relative overflow-hidden">
      <Background3D />
      
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 bg-black/20 backdrop-blur-sm border-b border-white/10 py-2 px-4 text-center text-sm"
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
            className="text-2xl font-bold flex items-center gap-2"
          >
            <Sprout className="h-6 w-6 text-primary" />
            Thalia
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-6"
          >
            <Link to="/map" className="text-sm hover:text-primary transition-colors hidden sm:block">
              Districts
            </Link>
            <Link to="/dashboard" className="text-sm hover:text-primary transition-colors hidden sm:block">
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
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
              <Sprout className="h-10 w-10 text-primary" />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            Join The Agriculture
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Layer of Nepal
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Thalia is a platform connecting farmers with district-specific insights,
            real-time data, and expert guidance for modern agriculture
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/map">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-200 font-semibold px-8 min-w-[200px]"
              >
                Explore Districts
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 border-white/20 hover:bg-white/20 text-white min-w-[200px]"
              >
                Get Started
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 text-sm"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">77</div>
              <div className="text-gray-400">Districts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">25+</div>
              <div className="text-gray-400">Crops</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">50K+</div>
              <div className="text-gray-400">Farmers</div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Bottom fade */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a1f] to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default Index;
