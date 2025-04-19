"use client";

import { Card, Text, Title, Button } from "@tremor/react";
import { GetClickAnalyticsGeo } from "@/lib/actions";
import { useState, useEffect } from "react";

interface ClickData {
  city: string;
  region: string;
  country: string;
  device: string;
  browser: string;
  os: string;
  clicks: number;
}

interface Props {
  clicklink: string;
}

export default function AnalyticsGeo({ clicklink }: Props) {
  const [clicksData, setClicksData] = useState<ClickData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    if (clicklink) {
      console.log(`Fetching geographical analytics for clicklink: ${clicklink}`);
      const response = await GetClickAnalyticsGeo(clicklink);

      if (response && response.length) {
        // Ensure the response structure is correct and map it properly
        const formattedData = response.map((entry: any) => ({
          city: entry.click.city || "Unknown",
          region: entry.click.region || "Unknown",
          // country: entry.click.country || "Unknown",
          // device: entry.click.device || "Unknown",
          // browser: entry.click.browser || "Unknown",
          // os: entry.click.os || "Unknown",
          // clicks: entry.clicks || 0,  // Default to 0 if clicks are missing
        }));

        setClicksData(formattedData);  // Update state with formatted data
      } else {
        setClicksData([]);  // Handle empty or null response
      }

      setLoading(false);  // Set loading to false once data is fetched
    }
  };

  useEffect(() => {
    fetchData();
  }, [clicklink]);  // Dependency array ensures this runs when `clicklink` changes

  const handleRefresh = () => {
    setLoading(true);  // Set loading to true when refreshing
    fetchData();  // Fetch the data again
  };

  if (loading) {
    return (
      <Card>
        <Title>Loading Geographical Analytics...</Title>
        <Text>Please wait while we fetch the data.</Text>
      </Card>
    );
  }

  if (clicksData.length === 0) {
    return (
      <Card>
        <Title>No Data Available</Title>
        <Text>No geographical clicks data found for this link.</Text>
        <Button onClick={handleRefresh} className="mt-4">Refresh</Button>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      <Card>
        <Title>Geographical Click Analytics</Title>
        <table className="min-w-full table-auto mt-4">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">City</th>
              <th className="py-2 px-4 text-left">State/Region</th>
              {/* <th className="py-2 px-4 text-left">Country</th>
              <th className="py-2 px-4 text-left">Device</th>
              <th className="py-2 px-4 text-left">Browser</th>
              <th className="py-2 px-4 text-left">OS</th>
              <th className="py-2 px-4 text-left">Clicks</th> */}
            </tr>
          </thead>
          <tbody>
            {clicksData.map((data, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{data.city}</td>
                <td className="py-2 px-4">{data.region}</td>
                {/* <td className="py-2 px-4">{data.country}</td>
                <td className="py-2 px-4">{data.device}</td>
                <td className="py-2 px-4">{data.browser}</td>
                <td className="py-2 px-4">{data.os}</td>
                <td className="py-2 px-4">{data.clicks}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <Button onClick={handleRefresh} className="mt-4">Refresh</Button>
      </Card>
    </div>
  );
}
