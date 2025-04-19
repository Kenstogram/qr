import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AnalyticsGeo from "@/components/analyticGeo";
import Builder from "@/components/builder";

export default async function SiteAnalytics({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.site.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  const stringClicklink = data?.name || "policy";

  return (
    <div className="py-6 sm:py-8">
      {/* Title Section */}
      <div className="flex flex-col items-center sm:items-start sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-between">
        <div>
          <h1 className="font-cal text-2xl font-semibold dark:text-white sm:text-3xl">
            Analytics for {data?.name}
          </h1>
        </div>
        <div>
          <a
            href={`https://${url}`}
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
          >
            {url} ↗
          </a>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mt-6">
        <AnalyticsGeo clicklink={stringClicklink} />
      </div>

      {/* Builder Section */}
      <div className="mt-6">
        <Builder />
      </div>
    </div>
  );
}
