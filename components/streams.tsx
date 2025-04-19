// Streams.tsx
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { GetClicksDomain } from "@/lib/actions"; // For fetching clicks
import { Card, Title, Text } from "@tremor/react"; // Import necessary components
import SiteCard from "./site-card"; // Your SiteCard component
import ConsolidatedClickGraph from "@/components/ClickGraph"; // The new graph component
import Image from "next/image"; // Import image component for illustrations

export default async function Streams({ limit }: { limit?: number }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // Fetch the sites for the user
  const sites = await prisma.site.findMany({
    where: {
      user: {
        id: session.user.id as string,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    ...(limit ? { take: limit } : {}),
  });

  // Fetch and aggregate clicks data for each site
  const clickData = await Promise.all(
    sites.map(async (site) => {
      try {
        // Ensure the site has a subdomain and fetch clicks for it
        if (site.subdomain) {
          const clicks = await GetClicksDomain(site.subdomain);
          return { name: site.name ?? "Unknown Site", clicks, siteId: site.id }; // Pass siteId here
        }
        return { name: site.name ?? "Unknown Site", clicks: 0, siteId: site.id }; // Pass siteId here
      } catch (error) {
        console.error(`Error fetching clicks for ${site.name}:`, error);
        return { name: site.name ?? "Unknown Site", clicks: 0, siteId: site.id }; // Pass siteId here
      }
    })
  );

  // Calculate the total number of clicks
  const totalClicks = clickData.reduce((sum, siteData) => sum + siteData.clicks, 0);

  return (
    <div>
      {/* Show Click Graph if there are sites */}
      {sites.length > 0 && (
        <Card className="mb-6">
          <Title>QR Click Data</Title>
          {/* Display the total clicks */}
          <Text>{totalClicks} clicks across all QR experiences</Text>
          <ConsolidatedClickGraph data={clickData} /> {/* Pass full site data to graph */}
        </Card>
      )}

      {/* Grid of Sites */}
      {sites.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sites.map((site) => (
            <SiteCard key={site.id} data={site} />
          ))}
        </div>
      ) : (
        // "No QRs Yet" message when no sites exist
        <div className="flex flex-col items-center space-x-4">
          <h1 className="font-cal text-4xl">No QRs Yet</h1>
          <div className="image-wrapper relative">
            <Image
              alt="missing site"
              src="https://illustrations.popsy.co/violet/cute-smiling-cat.svg"
              width={400}
              height={400}
              className="transition-image"
            />
            <Image
              alt="missing site"
              src="https://illustrations.popsy.co/pink/cute-smiling-cat.svg"
              width={400}
              height={400}
              className="absolute top-0 left-0 transition-image"
            />
          </div>
          <p className="text-lg text-stone-500">Create a QR to get started.</p>
          <a href="/create">
            <button className="mt-4 bg-black text-white px-4 py-2 rounded transition duration-200 hover:bg-violet-700">
              Create QR Experience
            </button>
          </a>
        </div>
      )}
    </div>
  );
}
