import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { districts } from "@/data/districts";
import { motion } from "framer-motion";
import Background3D from "@/components/Background3D";

// District positions mapped to the nepal.png image (percentage-based for responsiveness)
const districtPositions: Record<string, { x: number; y: number }> = {
  // Province 1 - Koshi (Far East)
  ilam: { x: 88, y: 35 },
  jhapa: { x: 92, y: 48 },
  morang: { x: 86, y: 50 },
  sunsari: { x: 82, y: 48 },
  
  // Province 2 - Madhesh (South Central)
  dhanusha: { x: 68, y: 68 },
  bara: { x: 60, y: 70 },
  parsa: { x: 56, y: 68 },
  
  // Province 3 - Bagmati (Central)
  kathmandu: { x: 54, y: 52 },
  lalitpur: { x: 55, y: 56 },
  makwanpur: { x: 52, y: 60 },
  chitwan: { x: 48, y: 64 },
  
  // Province 4 - Gandaki (Central West)
  kaski: { x: 40, y: 48 },
  gorkha: { x: 44, y: 44 },
  "nawalparasi-east": { x: 42, y: 62 },
  
  // Province 5 - Lumbini (West)
  rupandehi: { x: 34, y: 68 },
  palpa: { x: 36, y: 58 },
  dang: { x: 30, y: 62 },
  banke: { x: 25, y: 62 },
  
  // Province 6 - Karnali (Mid West)
  surkhet: { x: 20, y: 52 },
  
  // Province 7 - Sudurpashchim (Far West)
  kailali: { x: 12, y: 54 },
};

const MapPage = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black flex flex-col relative">
      <Background3D />
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-background/95 backdrop-blur border-b z-10 relative">
        <div>
          <h1 className="text-2xl font-bold">Nepal Provinces Map</h1>
          <p className="text-sm text-muted-foreground">Click on any district to explore</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="h-10 w-10"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Full Screen Map with Interactive Districts */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden relative z-10">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src="/nepal.png"
            alt="Nepal Provinces Map"
            className="w-full h-full object-contain select-none"
          />
          
          {/* Interactive District Markers Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {districts.map((district) => {
              const pos = districtPositions[district.id];
              if (!pos) return null;
              const isHovered = hovered === district.id;

              return (
                <g key={district.id} className="pointer-events-auto">
                  {/* Hover ring */}
                  {isHovered && (
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={2.5}
                      fill="hsl(142, 72%, 29%)"
                      opacity={0.2}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  
                  {/* District Dot */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isHovered ? 1.2 : 0.8}
                    fill={isHovered ? "hsl(142, 72%, 29%)" : "hsl(0, 100%, 50%)"}
                    stroke="hsl(0, 0%, 100%)"
                    strokeWidth={isHovered ? 0.3 : 0.2}
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setHovered(district.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => navigate(`/district/${district.id}`)}
                  />

                  {/* Tooltip */}
                  {isHovered && (
                    <motion.g
                      initial={{ opacity: 0, y: 0.5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <rect
                        x={pos.x - district.name.length * 0.35 - 1}
                        y={pos.y - 4}
                        width={district.name.length * 0.7 + 2}
                        height={2.5}
                        rx={0.3}
                        fill="hsl(200, 10%, 18%)"
                        opacity={0.95}
                      />
                      {/* Arrow */}
                      <polygon
                        points={`${pos.x - 0.4},${pos.y - 1.5} ${pos.x + 0.4},${pos.y - 1.5} ${pos.x},${pos.y - 0.8}`}
                        fill="hsl(200, 10%, 18%)"
                        opacity={0.95}
                      />
                      <text
                        x={pos.x}
                        y={pos.y - 2.2}
                        textAnchor="middle"
                        fontSize="1.2"
                        fontWeight="600"
                        fill="hsl(0, 0%, 100%)"
                        fontFamily="Plus Jakarta Sans, sans-serif"
                      >
                        {district.name}
                      </text>
                    </motion.g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t bg-background/95 backdrop-blur flex items-center justify-center gap-6 text-sm text-muted-foreground relative z-10">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span>District</span>
        </div>
        <span className="text-border">|</span>
        <span>Hover to see names • Click to explore</span>
      </div>
    </div>
  );
};

export default MapPage;
