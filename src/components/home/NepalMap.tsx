"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const DistrictPath = ({
    d,
    id,
    name,
    className,
    onClick
}: {
    d: string;
    id: string;
    name: string;
    className?: string;
    onClick: (name: string) => void;
}) => {
    return (
        <path
            d={d}
            id={id}
            data-name={name}
            className={cn(
                "fill-slate-200 stroke-white stroke-2 transition-all duration-200 hover:fill-green-500 hover:cursor-pointer",
                className
            )}
            onClick={() => onClick(name)}
        >
            <title>{name}</title>
        </path>
    )
}

export function NepalMap() {
    const router = useRouter()
    const [hoveredDistrict, setHoveredDistrict] = React.useState<string | null>(null)

    const handleDistrictClick = (districtName: string) => {
        // In a real app we'd likely have a map of display names to slug names
        router.push(`/districts/${districtName.toLowerCase()}`)
    }

    return (
        <div className="relative w-full aspect-video flex items-center justify-center bg-slate-50/50 rounded-xl overflow-hidden p-4">
            <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-md shadow-sm text-sm border z-10">
                {hoveredDistrict ? hoveredDistrict : "Hover over a district"}
            </div>

            <svg
                viewBox="0 0 1000 600"
                className="w-full h-full max-h-[600px]"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* 
                  Simplified paths for demonstration. 
                  A full SVG would be too large to inline here without optimization.
                */}

                {/* Province 1 (Koshi) Area - simplified */}
                <DistrictPath
                    d="M800,300 L950,300 L920,450 L780,400 Z"
                    id="d-jhapa-area"
                    name="Jhapa"
                    onClick={handleDistrictClick}
                    className="hover:fill-green-600"
                />

                {/* Bagmati Area (Kathmandu, etc) */}
                <DistrictPath
                    d="M550,250 L650,250 L650,350 L550,350 Z"
                    id="d-kathmandu-area"
                    name="Kathmandu"
                    onClick={handleDistrictClick}
                    className="fill-green-100 hover:fill-green-600"
                />

                {/* Gandaki Area (Mustang, etc) */}
                <DistrictPath
                    d="M400,150 L500,150 L520,300 L380,280 Z"
                    id="d-mustang-area"
                    name="Mustang"
                    onClick={handleDistrictClick}
                    className="hover:fill-blue-500"
                />

                {/* Chitwan Area */}
                <DistrictPath
                    d="M480,350 L550,350 L540,400 L470,390 Z"
                    id="d-chitwan-area"
                    name="Chitwan"
                    onClick={handleDistrictClick}
                    className="hover:fill-yellow-500"
                />

                {/* Karnali / Far West placeholder */}
                <DistrictPath
                    d="M50,150 L350,120 L350,300 L100,280 Z"
                    id="d-west-area"
                    name="Kanchanpur"
                    onClick={handleDistrictClick}
                    className="hover:fill-orange-500"
                />

                <text x="500" y="550" textAnchor="middle" className="fill-slate-400 text-sm">
                    (Interactive Map Placeholder - Click colored regions)
                </text>
            </svg>
        </div>
    )
}
