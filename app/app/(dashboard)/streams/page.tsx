import { Suspense } from "react";
import Streams from "@/components/streamsnograph";
import CreateSiteButton from "@/components/create-site-button";
import CreateSiteModal from "@/components/modal/create-site";
import CreateNoSiteModal from "@/components/modal/create-no-site";
import PlaceholderCard from "@/components/placeholder-card";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function LocalSites({ params }: { params: { id: string } }) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
    select: {
      siteMatch: true,
    },
  });

  const siteMatch = user?.siteMatch ?? false; // Default to false if user is not found

  return (
    <div className="flex flex-col space-y-6 p-8">
      <div className="flex flex-col space-y-6">
        {/* <div className="flex items-center justify-between">
          <CreateSiteButton>
            {siteMatch ? (
              <CreateNoSiteModal />
            ) : (
              <CreateSiteModal />
            )}
          </CreateSiteButton> 
        </div>*/}
        <h1 className="font-cal text-xl font-bold dark:text-white">
          QR Experiences Studio
        </h1>
        <div className="snap-x overflow-x-auto">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 100 }).map((_, i) => (
                  <PlaceholderCard key={i} />
                ))}
              </div>
            }
          >
            {/* @ts-expect-error Server Component */}
            <Streams siteId={params.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
