
import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/fetchers";
import Rooms from "@components/rooms";

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const [data] = await Promise.all([
    getSiteData(params.domain),
  ]);

  if (!data) {
    notFound();
  }

  const stringDomain = params.domain as string;

  return (
    <>
      <div className="relative top-0 left-0 w-full">
        <div className="relative">
          <Rooms 
            domain={stringDomain} 
          />
        </div>
      </div>
    </>
  );
}