"use client";

import { PokemonStat } from "@/types/pokemon";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";

interface StatChartProps {
    stats: PokemonStat[];
    color: string;
}

export function StatChart({ stats, color }: StatChartProps) {
    const data = stats.map((s) => ({
        subject: s.stat.name.replace("-", " ").toUpperCase(),
        A: s.base_stat,
        fullMark: 255,
    }));

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#e5e5e5" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 255]} tick={false} axisLine={false} />
                    <Radar
                        name="Stats"
                        dataKey="A"
                        stroke={color}
                        fill={color}
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
