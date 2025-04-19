"use client";

import { Card, Title, AreaChart } from "@tremor/react";
import React, { useEffect, useState } from "react";
import { GetOrders } from "@/actions/product-requests";

export default function ProductsMockup() {
  const [ordersData, setOrdersData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await GetOrders();
        const filteredOrders = ordersResponse.orders.filter((order: any) => order.payment_status === "captured");
        setOrdersData(filteredOrders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid gap-6">
      <Card>
        <Title>Product Sales</Title>
        <AreaChart
          className="mt-4 h-72"
          data={ordersData.map((order: any) => ({
            date: new Date(order.created_at).toLocaleDateString(), // Use order creation date as the date
            OrderCount: 1, // Each order contributes 1 to the count
          }))}
          index="date"
          categories={["OrderCount"]}
          colors={["pink"]}
          valueFormatter={(number: number) =>
            Intl.NumberFormat("us").format(number).toString()
          }
        />
      </Card>
    </div>
  );
}
