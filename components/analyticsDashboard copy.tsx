"use client";

import { Card, Text, Title, AreaChart } from "@tremor/react";
import { useState, useEffect } from "react";

// Generate simplified click data for a smaller range of days
export const GetClickAnalytics = async (): Promise<ClickData[]> => {
  const sampleData: ClickData[] = [
    { start: "2024-11-01T00:00:00Z", clicks: 5 },
    { start: "2024-11-02T00:00:00Z", clicks: 10 },
    { start: "2024-11-03T00:00:00Z", clicks: 20 },
    { start: "2024-11-04T00:00:00Z", clicks: 15 },
    { start: "2024-11-05T00:00:00Z", clicks: 25 },
    { start: "2024-11-06T00:00:00Z", clicks: 30 },
    { start: "2024-11-07T00:00:00Z", clicks: 40 },
    { start: "2024-11-08T00:00:00Z", clicks: 35 },
    { start: "2024-11-09T00:00:00Z", clicks: 50 },
    { start: "2024-11-10T00:00:00Z", clicks: 45 }
  ];

  return sampleData;
};

interface ClickData {
  start: string;  // Timestamp in ISO string format
  clicks: number;
}

export default function AnalyticsDashboard() {
  const [clicksData, setClicksData] = useState<ClickData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetClickAnalytics();
      setClicksData(response || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card>
        <Title>Loading Click Analytics</Title>
        <Text>Loading...</Text>
      </Card>
    );
  }

  if (clicksData.length === 0) {
    return (
      <Card>
        <Title>No Data Available</Title>
        <Text>No clicks data found for this link.</Text>
      </Card>
    );
  }

  // Calculate cumulative clicks data
  let cumulativeTotal = 0;
  const cumulativeClicksData = clicksData.map(({ start, clicks }) => {
    cumulativeTotal += clicks;
    return {
      start,
      cumulativeClicks: cumulativeTotal
    };
  });

  // Prepare chart data
  const chartData = cumulativeClicksData.map(({ start, cumulativeClicks }) => ({
    date: new Date(start).toLocaleString("default", {
      weekday: "short",
      month: "short",
      day: "2-digit"
    }),
    Visitors: cumulativeClicks
  }));

  const totalClicks =
    cumulativeClicksData[cumulativeClicksData.length - 1]?.cumulativeClicks || 0;

  return (
    <div className="grid gap-6">
      <Card className="bg-white shadow-lg rounded-xl p-6">
        <Title className="text-lg font-semibold text-gray-800">QR Analytics (Last 10 Days)</Title>
        <AreaChart
          className="mt-4 h-72 rounded-xl"
          data={chartData}
          index="date"
          categories={["Visitors"]}
          colors={["pink"]}
          valueFormatter={(number: number) =>
            Intl.NumberFormat("us").format(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        />
        <Text
          className="font-bold dark:text-stone-200 mt-4 text-2xl text-gray-800"
          style={{
            animation: "number-increase 2s ease-out forwards",
            fontFamily: "'Quicksand', sans-serif"
          }}
        >
          Total Clicks:{" "}
          <span
            className="text-pink-600 text-2xl font-extrabold"
            style={{
              animation: "swirly-effect 2s ease-out infinite alternate"
            }}
          >
            {totalClicks}
          </span>
        </Text>
      </Card>
    </div>
  );
}

