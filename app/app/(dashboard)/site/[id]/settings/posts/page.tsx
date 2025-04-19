import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import ReferralsMockup from "@/components/referrals";
import CreatePostButton from "@/components/create-post-button";
import Posts from "@/components/posts";

export default async function SitePosts({
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

  return (
    <>
      <div className="flex items-center justify-center sm:justify-start">
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal text-xl font-bold dark:text-black sm:text-3xl">
            Posts for {data.name}
          </h1>
          <a
            href={`https://go.qrexperiences.com/${data.subdomain}`}
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-black transition-colors hover:bg-stone-200 dark:bg-stone-300 dark:hover:bg-stone-700"
          >
            {`go.qrexperiences.com/${data.subdomain}`} ↗
          </a>
        </div>
      </div>
      <div className="flex justify-start mt-8">
        <CreatePostButton />
      </div>
      <div className="mt-8">
        <Posts siteId={params.id} />
      </div>
      {/*<ReferralsMockup />*/}
      </>
  );
}
