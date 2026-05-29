"use client";

import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

interface WeightChartProps {
  data: { m: string; v: number }[];
}

export function WeightChart({ data }: WeightChartProps) {
  return (
    <ResponsiveContainer width="100%" height={144}>
      <LineChart data={data}>
        <Tooltip
          contentStyle={{ background: "white", border: "1px solid #e8e8e0", borderRadius: "12px", fontSize: "12px" }}
          formatter={(v) => [`${v} kg`, "Weight"]}
        />
        <Line
          type="monotone"
          dataKey="v"
          stroke="#7c6af7"
          strokeWidth={2.5}
          dot={{ fill: "#7c6af7", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
