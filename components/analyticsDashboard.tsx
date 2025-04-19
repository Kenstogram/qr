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

const chartdata = [
  {
    date: "Jan 13",
    Visitors: 2890,
  },
  {
    date: "Feb 13",
    Visitors: 2756,
  },
  {
    date: "Mar 13",
    Visitors: 3322,
  },
  {
    date: "Apr 13",
    Visitors: 3470,
  },
  {
    date: "May 13",
    Visitors: 3475,
  },
  {
    date: "Jun 13",
    Visitors: 3179,
  },
];

const pages = [
  { name: "/qrexperiences", value: 3172 },
  { name: "/youtube", value: 1563 },
  { name: "/training", value: 492 },
  { name: "/about", value: 234 },
];

const referrers = [
  { name: "youtube.com", value: 465 },
  { name: "x.com", value: 387 },
  { name: "google.com", value: 897 },
  { name: "linkedin.com", value: 189 },
];

const countries = [
  { name: "United States of America", value: 3529, code: "US" },
  { name: "India", value: 2114, code: "IN" },
  { name: "United Kingdom", value: 764, code: "GB" },
  { name: "Spain", value: 432, code: "ES" },
];

const categories = [
  {
    title: "3x Better Analytics",
    subtitle: "Page",
    data: pages,
  },
  {
    title: "5x More Channels",
    subtitle: "Source",
    data: referrers,
  },
  {
    title: "Reach New Global Audiences",
    subtitle: "Country",
    data: countries,
  },
];

export default function AnalyticsDashboard() {
  return (
    <div className="pt-40 pb-40 bg-white py-16 px-8">
      <h2 className="text-black text-3xl font-bold text-center p-1">QR Click Analytics</h2>
      <h3 className="text-black text-l font-semibold text-center pb-2">QR Experiences for Every Occasion</h3>
    <div className="flex w-full flex-col gap-16 bg-white rounded-xl">
      <div className="grid gap-6">
        <Card>
          <Title>Get Better Insights for Customers in Person and Online</Title>
          <AreaChart
            className="mt-4 h-72"
            data={chartdata}
            index="date"
            categories={["Visitors"]}
            colors={["indigo"]}
            valueFormatter={(number: number) =>
              Intl.NumberFormat("us").format(number).toString()
            }
          />
        </Card>
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
          {categories.map(({ title, subtitle, data }) => (
            <Card key={title} className="max-w-lg">
              <Title>{title}</Title>
              <Flex className="mt-4">
                <Text>
                  <Bold>{subtitle}</Bold>
                </Text>
                <Text>
                  <Bold>Visitors</Bold>
                </Text>
              </Flex>
              <BarList
                // @ts-ignore
                data={data.map(({ name, value, code }) => ({
                  name,
                  value,
                  icon: () => {
                    if (title === "Top Referrers") {
                      return (
                        <Image
                          src={`https://www.google.com/s2/favicons?sz=64&domain_url=${name}`}
                          alt={name}
                          className="mr-2.5"
                          width={20}
                          height={20}
                        />
                      );
                    } else if (title === "Countries") {
                      return (
                        <Image
                          src={`https://flag.vercel.app/m/${code}.svg`}
                          className="mr-2.5"
                          alt={code}
                          width={24}
                          height={16}
                        />
                      );
                    } else {
                      return null;
                    }
                  },
                }))}
                className="mt-2"
              />
            </Card>
          ))}
        </Grid>
      </div>
    </div>
          <div className="flex justify-center">
            <a
              href="https://app.qrexperiences.com"
              className="mt-4 border border-1 border-slate-700 inline-flex justify-center items-center gap-2 font-medium text-sm text-black bg-white hover:bg-gray-100 active:bg-grey-100 max-w-[200px] py-2.5 px-4 text-center rounded-lg duration-150"
            >
              <span className="text-black">Try QR Experiences</span>
            </a>
          </div>
        </div> 
  );
}