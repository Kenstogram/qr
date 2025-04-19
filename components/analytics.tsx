"use client";

import { Card, Text, Title, AreaChart } from "@tremor/react";
import { GetClickAnalyticsDomain } from "@/lib/actions";
import { useState, useEffect } from 'react';

interface ClickData {
  start: string;
  clicks: number;
}

interface Props {
  clicklink: string;
}

export default function AnalyticsMockup({ clicklink }: Props) {
  const [clicksData, setClicksData] = useState<ClickData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (clicklink) {
        console.log(`Fetching click analytics for clicklink: ${clicklink}`);
        const response = await GetClickAnalyticsDomain(clicklink);
        setClicksData(response || []);
        setLoading(false);
      }
    };

    fetchData();
  }, [clicklink]);

  if (loading) {
    return (
      <Card>
        <Title>Add a Link to Create a QR Experience</Title>
        <Text>Add Links to Socials, Shops, Videos, and more</Text>
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

  // Process clicks data to sum daily clicks
  const dailyClicksMap: Record<string, number> = {};
  clicksData.forEach(({ start, clicks }) => {
    const date = new Date(start);
    const dayKey = new Date(date).toISOString().split("T")[0];

    dailyClicksMap[dayKey] = (dailyClicksMap[dayKey] || 0) + clicks;
  });

  // Add today's data with 0 clicks if missing
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  if (!dailyClicksMap[today]) {
    dailyClicksMap[today] = 0; // Add 0 clicks for today if it's missing
  }

  // Make sure the date range includes today (in case the API response doesn't)
  const dates = Object.keys(dailyClicksMap);
  const startDate = new Date(Math.min(...dates.map(d => new Date(d).getTime())));
  const endDate = new Date(); // Set end date to today to ensure it includes today

  // Generate full date range
  const dateRange: Record<string, number> = {};
  for (let dt = startDate; dt <= endDate; dt.setDate(dt.getDate() + 1)) {
    const dayKey = dt.toISOString().split("T")[0];
    dateRange[dayKey] = dailyClicksMap[dayKey] || 0;
  }

  // Calculate cumulative clicks
  let cumulativeClicks = 0;
  const chartData = Object.entries(dateRange).map(([date, clicks]) => {
    cumulativeClicks += clicks;
    return {
      date: new Date(date).toLocaleString("default", { weekday: 'short', month: 'short', day: '2-digit' }),
      Visitors: cumulativeClicks,
    };
  });

  const totalClicks = cumulativeClicks;

  return (
    <div className="grid gap-6">
      <Card>
        <Title>QR Analytics (Last 90 Days)</Title>
        <AreaChart
          className="mt-4 h-72"
          data={chartData}
          index="date"
          categories={["Visitors"]}
          colors={["pink"]}
          valueFormatter={(number: number) => Intl.NumberFormat("us").format(number)}
        />
        <Text className="font-bold dark:text-stone-200 mt-4">Total Clicks: {totalClicks}</Text>
      </Card>
    </div>
  );
}
