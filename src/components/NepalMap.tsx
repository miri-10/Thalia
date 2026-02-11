import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { districts } from "@/data/districts";
import { motion } from "framer-motion";

// District positions mapped to the nepal.png image (percentage-based)
const districtPositions: Record<string, { x: number; y: number }> = {
  // Province 1 - Koshi (Far East)
  ilam: { x: 90, y: 28 },
  jhapa: { x: 95, y: 35 },
  morang: { x: 92, y: 38 },
  sunsari: { x: 88, y: 35 },
  
  // Province 2 - Madhesh (South Central)
  dhanusha: { x: 78, y: 58 },
  bara: { x: 68, y: 60 },
  parsa: { x: 64, y: 58 },
  
  // Province 3 - Bagmati (Central)
  kathmandu: { x: 62, y: 42 },
  lalitpur: { x: 63, y: 46 },
  makwanpur: { x: 58, y: 50 },
  chitwan: { x: 54, y: 54 },
  
  // Province 4 - Gandaki (Central West)
  kaski: { x: 48, y: 38 },
  gorkha: { x: 54, y: 32 },
  "nawalparasi-east": { x: 50, y: 52 },
  
  // Province 5 - Lumbini (West)
  rupandehi: { x: 42, y: 56 },
  palpa: { x: 44, y: 48 },
  dang: { x: 36, y: 48 },
  banke: { x: 30, y: 42 },
  
  // Province 6 - Karnali (Mid West)
  surkhet: { x: 28, y: 35 },
  
  // Province 7 - Sudurpashchim (Far West)
  kailali: { x: 18, y: 38 },
};

const NepalMap = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="relative w-full select-none">
      <div className="w-full rounded-xl overflow-hidden border border-border shadow-lg bg-muted/30 relative">
        <img
          src="/nepal.png"
          alt="Nepal Provinces Map"
          className="w-full h-auto object-contain"
          style={{ maxHeight: "500px" }}
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

      {/* Legend */}
      <div className="absolute bottom-3 right-4 flex items-center gap-2 text-[10px] text-muted-foreground bg-background/90 backdrop-blur px-3 py-1.5 rounded-full border border-border">
        <div className="h-2 w-2 rounded-full bg-red-500" />
        <span>Click districts to explore</span>
      </div>
    </div>
  );
};

export default NepalMap;
