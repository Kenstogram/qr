import { Suspense } from "react";
import Sites from "@/components/sites";
import Streams from "@/components/streams";
import PlaceholderCard from "@/components/placeholder-card";
import AnalyticsDashboard from "@/components/analyticsDashboard";
import LogoutButton from "@/components/logout-button";

export default async function Overview() {
  return (
    <div className="flex flex-col space-y-6 p-8">
      {/* <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-xl font-bold dark:text-white">
          Welcome to QR Experiences
        </h1>
        <h3 className="font-cal font-bold dark:text-white">
          Enjoy the latest QR Analytics!
        </h3>
      </div>
      <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 100 }).map((_, i) => (
                  <PlaceholderCard key={i} />
                ))}
              </div>
            }
          >
      <AnalyticsDashboard />
      </Suspense> */}
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-xl font-bold dark:text-white">
          My QR Experiences
        </h1>
        {/* Sites Section */}
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
            <Streams limit={100} />
          </Suspense>
        </div>
      </div>

      {/* <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Top Experiences
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
            <Sites limit={100} />
          </Suspense>
        </div>
      </div> */}
      {/* <div className="flex flex-col pt-96 space-y-6">
      <LogoutButton /> 
      </div> */}
    </div>
  );
}
