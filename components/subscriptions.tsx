"use client";
import React, { useEffect, useState } from "react";
import { Card, Title, Flex, Text, Bold, AreaChart } from "@tremor/react";
import { GetSubscriptions } from "@/actions/get-subscriptions";

interface Subscription {
  id: string;
  object: string;
  plan: {
    active: boolean;
  };
  created: number;
}

export default function SubscriptionsMockup() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const sortedSubscriptions = subscriptions.sort(
    (a: Subscription, b: Subscription) => a.created - b.created
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriptionsData = await GetSubscriptions();
        const activeSubs = subscriptionsData.filter(
          (sub: Subscription) => sub.plan.active
        );
        setSubscriptions(activeSubs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid gap-6">
      <Card>
        <Title>Subscriptions</Title>
        <AreaChart
          className="mt-4 h-72"
          data={sortedSubscriptions.map((subscription: Subscription) => ({
            date: new Date(subscription.created * 1000).toLocaleDateString(),
            SubscriptionQuantity: 1, // You may need to adjust this based on your data
          }))}
          index="date"
          categories={["SubscriptionQuantity"]}
          colors={["pink"]}
          valueFormatter={(number: number) =>
            Intl.NumberFormat("us").format(number).toString()
          }
        />
        <div className="mt-4">
          {subscriptions.map((subscription: Subscription) => (
            <Card
              key={subscription.id}
              className="mb-4 p-4 bg-white rounded-xl"
            >
              <Flex className="p-1">
                <Text>
                  <Bold>Subscription ID:</Bold> {subscription.id}
                </Text>
              </Flex>
              <Flex className="p-1">
                <Text>
                  <Bold>Status:</Bold> {subscription.plan.active ? 'Active' : 'Inactive'}
                </Text>
              </Flex>
              {/* Add more subscription details as needed */}
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
