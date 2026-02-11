import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Background3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Enhanced 3D Particles
    class Particle {
      x: number;
      y: number;
      z: number;
      prevX: number;
      prevY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width - canvas.width / 2;
        this.y = Math.random() * canvas.height - canvas.height / 2;
        this.z = Math.random() * 2000;
        this.prevX = this.x;
        this.prevY = this.y;
        
        // Random green shades
        const greenShades = [
          'rgba(34, 197, 94,',
          'rgba(74, 222, 128,',
          'rgba(134, 239, 172,',
          'rgba(187, 247, 208,',
        ];
        this.color = greenShades[Math.floor(Math.random() * greenShades.length)];
      }

      update(speed: number) {
        this.prevX = this.x;
        this.prevY = this.y;
        
        this.z -= speed;
        
        if (this.z <= 0) {
          this.z = 2000;
          this.x = Math.random() * canvas.width - canvas.width / 2;
          this.y = Math.random() * canvas.height - canvas.height / 2;
          this.prevX = this.x;
          this.prevY = this.y;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const x = (this.x / this.z) * 1000 + canvas.width / 2;
        const y = (this.y / this.z) * 1000 + canvas.height / 2;
        const prevX = (this.prevX / (this.z + 3)) * 1000 + canvas.width / 2;
        const prevY = (this.prevY / (this.z + 3)) * 1000 + canvas.height / 2;

        const size = (1 - this.z / 2000) * 4;
        const opacity = (1 - this.z / 2000) * 0.8;

        // Draw trail
        ctx.strokeStyle = `${this.color} ${opacity * 0.4})`;
        ctx.lineWidth = size * 0.5;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
        gradient.addColorStop(0, `${this.color} ${opacity})`);
        gradient.addColorStop(0.5, `${this.color} ${opacity * 0.5})`);
        gradient.addColorStop(1, `${this.color} 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const numParticles = 300;
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = "rgba(15, 26, 15, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(3);
        particle.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* 3D Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Gradient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Deep earth gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1a0f] via-[#1a2a1a] to-[#0f1a0f]" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-50"
          style={{
            background: "radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] rounded-full opacity-50"
          style={{
            background: "radial-gradient(ellipse, rgba(180, 83, 9, 0.3) 0%, rgba(34, 197, 94, 0.2) 50%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-50"
          style={{
            background: "radial-gradient(circle, rgba(21, 128, 61, 0.4) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* 3D Geometric Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Floating 3D Hexagons */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`hex-${i}`}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -50, 0],
              rotateZ: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60">
              <polygon
                points="30,5 50,17.5 50,42.5 30,55 10,42.5 10,17.5"
                fill="none"
                stroke="rgba(34, 197, 94, 0.3)"
                strokeWidth="2"
              />
              <polygon
                points="30,15 42,22 42,38 30,45 18,38 18,22"
                fill="rgba(34, 197, 94, 0.05)"
                stroke="rgba(74, 222, 128, 0.2)"
                strokeWidth="1"
              />
            </svg>
          </motion.div>
        ))}

        {/* 3D Wireframe Cubes */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`cube-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + (i % 2) * 30}%`,
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
              y: [0, -40, 0],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1,
            }}
          >
            <div className="relative w-16 h-16" style={{ transformStyle: "preserve-3d" }}>
              <div className="absolute inset-0 border-2 border-green-500/30 rounded-sm" />
              <div className="absolute inset-0 border-2 border-emerald-400/20 rounded-sm transform translate-x-2 translate-y-2" />
            </div>
          </motion.div>
        ))}

        {/* Floating Rings */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute w-20 h-20 rounded-full border-2 border-green-400/20"
            style={{
              left: `${10 + i * 18}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7,
            }}
          >
            <div className="absolute inset-2 rounded-full border border-emerald-300/15" />
          </motion.div>
        ))}

        {/* 3D Grid Floor */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[50vh]"
          style={{ 
            perspective: "800px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(70deg) translateZ(-150px)",
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ transform: "translateZ(0)" }}
            >
              <defs>
                <linearGradient id="gridGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(34, 197, 94, 0)" />
                  <stop offset="50%" stopColor="rgba(34, 197, 94, 0.5)" />
                  <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
                </linearGradient>
              </defs>
              
              {Array.from({ length: 15 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={`${(i / 14) * 100}%`}
                  y1="0%"
                  x2={`${(i / 14) * 100}%`}
                  y2="100%"
                  stroke="url(#gridGradient)"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
              ))}
              
              {Array.from({ length: 20 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0%"
                  y1={`${(i / 19) * 100}%`}
                  x2="100%"
                  y2={`${(i / 19) * 100}%`}
                  stroke="url(#gridGradient)"
                  strokeWidth="1.5"
                  opacity={0.8 - (i / 19) * 0.5}
                />
              ))}
            </svg>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Background3D;
