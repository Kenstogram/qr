import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import ReferralsMockup from "@/components/referrals";
import CreateReferralButton from "@/components/create-referral-button";
import CreateReferralModal from "@/components/modal/create-referral";

export default async function SiteSettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.site.findUnique({
    where: {
      id: params.id,
    },
  });
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  const stringClicklink = data?.clicklink as string;

  return (
    <>
      <div className="flex items-center justify-center sm:justify-start">
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal text-xl font-bold dark:text-black sm:text-3xl">
            {data?.name} Settings
          </h1>
          <a
            href={`https://go.qrexperiences.com/${data?.subdomain}`}
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-black transition-colors hover:bg-stone-200 dark:bg-stone-300 dark:hover:bg-stone-700"
          >
            {`go.qrexperiences.com/${data?.subdomain}`} ↗
          </a>
          {/* <CreateReferralButton>
            <CreateReferralModal />
          </CreateReferralButton> */}
                    {/* <a
                      href={`https://${url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="truncate rounded-md px-2 py-1 text-sm font-medium text-white transition-colors bg-black dark:hover:bg-stone-700"
                    >
                            Add Brand Ambassador
                    </a>     */}
        </div>
      </div>
      {/*<ReferralsMockup />*/}
    </>
  );
}