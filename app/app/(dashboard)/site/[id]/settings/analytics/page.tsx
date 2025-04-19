import prisma from "@/lib/prisma";
import AnalyticsMockup from "@/components/analytics";
import AnalyticsGeo from "@/components/analyticGeo";
// import ReferralsMockup from "@/components/referrals";
// import CreateReferralButton from "@/components/create-referral-button";
// import CreateReferralModal from "@/components/modal/create-referral";
import { updateClicklink, updateClicklinks } from "@/lib/actions";
import Form from "@/components/form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import DeleteSiteForm from "@/components/form/delete-site-form";
// Import the FormSubmissions component
import FormSubmissions from "@/components/FormSubmissions"; 

export default async function SiteSettingsAnalytics({
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

  const stringClicklink = data?.name || "policy";

  return (
    <>
      <div className="flex items-center justify-center sm:justify-start">
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal text-xl font-bold dark:text-black sm:text-3xl">
            QR Analytics
          </h1>
          {/* <a
            href={`https://go.qrexperiences.com/${data.subdomain}`}
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-black transition-colors hover:bg-stone-200 dark:bg-stone-300 dark:hover:bg-stone-700"
          >
            {`go.qrexperiences.com/${data.subdomain}`} ↗
          </a> */}
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
      <Suspense
        fallback={
          <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
        }
      >
        <AnalyticsMockup clicklink={stringClicklink} />
        <AnalyticsGeo clicklink={stringClicklink} />
        <FormSubmissions clicklink={stringClicklink} />
      </Suspense>
      {/* Form for QR Experience Link if not set */}
      {!data?.QrUrl && (
        <Form
          title="QR Experience Link"
          description="Provide a Link for the QR Experience displayed on the Livestream."
          inputAttrs={{
            name: "QrUrl",
            type: "text",
            defaultValue: data?.QrUrl || "",
            placeholder: "Link to Websites, Event Pages, Products, Livestream or Shop",
            maxLength: 250,
          }}
          handleSubmit={updateClicklink}
          helpText={""}
        />
      )}

      {/* Form for updating QR Experience Link if already set */}
      {data?.QrUrl && (
        <Form
          title="Update QR Experience Link"
          description="Provide a Link for the QR Experience."
          inputAttrs={{
            name: "QrUrl",
            type: "text",
            defaultValue: data?.QrUrl || "",
            placeholder: "Update Link to Websites, Event Pages, Products, Livestream or Shop",
            maxLength: 250,
          }}
          handleSubmit={updateClicklinks}
          helpText={""}
        />
      )}

      {/* Delete Site Form */}
      <DeleteSiteForm siteName={data?.name!} />
    </>
  );
}
