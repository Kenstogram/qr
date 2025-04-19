"use client";
// ConsolidatedClickGraph.tsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { Bold, Text } from "@tremor/react";

interface ConsolidatedClickGraphProps {
  data: { name: string; clicks: number }[]; // Data structure from Streams component
}

const ConsolidatedClickGraph: React.FC<ConsolidatedClickGraphProps> = ({ data }) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Transform the data for recharts
    const transformedData = data.map((item) => ({
      name: item.name,
      clicks: item.clicks,
    }));

    setChartData(transformedData);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="clicks"
          stroke="#8884d8"
          fill="#8884d8"
          activeDot={{ r: 8 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ConsolidatedClickGraph;
