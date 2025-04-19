"use client";

import {
  Card,
  Text,
  Title,
  BarList,
  Flex,
  Grid,
  Bold,
  AreaChart,
} from "@tremor/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchDiscounts } from "@/actions/product-requests";

const ReferralsMockup = () => {
  const [data, setData] = useState<{ discounts: any[] } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const discountsData = await fetchDiscounts();
        setData(discountsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid gap-6">
      <Card>
        <Title>Affiliate Referral Program</Title>
        {data && (
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
          {data.discounts.map((category: any) => (
            <Card key={category.id} className="max-w-lg">
              {/* <Title>{category.code}</Title> */}
              <div className="mt-4 bg-black border border-stone-500 rounded-md border-1 p-2">
              <Flex className="p-1">
                <Text>
                  <Bold className="text-white">Influencer: {category.code}</Bold>
                </Text>
                </Flex>
                <Flex className="mt-4">
                <Text>
                  <Bold className="text-white">Referrals: {category.usage_count}</Bold>
                </Text>
              </Flex>
              </div>
              {/* <BarList
                // @ts-ignore
                data={category.regions.map((region: any) => ({
                  name: region.name,
                  value: region.tax_rate,
                  icon: () => (
                    <Image
                      src={`https://flag.vercel.app/m/${region.code}.svg`}
                      className="mr-2.5"
                      alt={region.code}
                      width={24}
                      height={16}
                    />
                  ),
                }))}
                className="mt-2"
              /> */}
            </Card>
          ))}
        </Grid>
      )}
      </Card>
    </div>
  );
};

export default ReferralsMockup;
