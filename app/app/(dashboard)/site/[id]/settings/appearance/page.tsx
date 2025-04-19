import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import DeleteSiteForm from "@/components/form/delete-site-form";
import Generator from "@/components/qr/Generator";
import ImageGenerator from "@/components/image/ImageGenerator"
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Stylist from "@/components/stylist";
import SocialMediaPostGenerator from "@/components/SocialMediaPostGenerator"; // Import the new component
import SwagCard from "@/components/SwagCard";
import Builder from "@/components/builder";
import Mosaic from "@/components/Mosaic";
import { updateClicklink, updateClicklinks } from "@/lib/actions";

export default async function SiteSettingsAppearance({
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

  const stringClicklink = data?.clicklink || "policy";
  const stringDescription = data?.description || "A magic carpet with a cat riding on it";

  return (
    <>
    <div className="flex items-center justify-center">
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <h1 className="font-cal text-xl font-bold dark:text-black sm:text-3xl mb-5">
              QR Experience
            </h1>
        </div>
        </div>
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
            {/* Description Form */}
            <Form
        title="QR Experience Headline"
        description="The headline description of your QR. This will be used as the landing page headline, meta description on Google, and for AI Prompts."
        helpText="Include SEO-optimized keywords that you want to rank for."
        inputAttrs={{
          name: "description",
          type: "text",
          defaultValue: data?.description!,
          placeholder: "A QR tshirt with sale code: Spring2025",
        }}
        handleSubmit={updateSite}
      />
      <Mosaic />
       {/* Image Generator */}
     {data?.description && <ImageGenerator clicklink={stringClicklink} description={stringDescription} />}
     {/* Social Media Post Generator */}
     <SocialMediaPostGenerator clicklink={stringClicklink} description={data?.description!} />
      {/* QR Code Generator */}
      {data?.QrUrl && <Generator clicklink={stringClicklink} />}
        {/* QR Builder Component */}
        <Builder />
      {/* Swag Component */}
      {/* <SwagCard /> */}
             {/* Stylist Component */}
             <Stylist />
      </>
  );
}
