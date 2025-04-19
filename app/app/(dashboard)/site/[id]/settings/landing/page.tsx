import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import DeleteSiteForm from "@/components/form/delete-site-form";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

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

  return (
    <>
    <div className="flex items-center justify-center">
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal text-xl font-bold dark:text-black sm:text-3xl mb-5">
            QR Landing Page
          </h1>
          </div>
        </div>
        <Form
          title="Landing Page Logo"
          description="The logo for your site. Accepted formats: .png, .jpg, .jpeg"
          helpText="Max file size 50MB. Recommended size 400x400."
          inputAttrs={{
            name: "logo",
            type: "file",
            defaultValue: data?.logo!,
          }}
          handleSubmit={updateSite}
        />
         <Form
          title="QR Thumbnail image"
          description="The thumbnail image for your site. Accepted formats: .png, .jpg, .jpeg"
          helpText="Max file size 50MB. Recommended size 1200x630."
          inputAttrs={{
            name: "image",
            type: "file",
            defaultValue: data?.image!,
          }}
          handleSubmit={updateSite}
        />
                 <Form
        title="Page Banner"
        description="Welcome to our QR Experience."
        helpText="If no Banner is included, no banner is displayed."
        inputAttrs={{
          name: "Banner",
          type: "text",
          defaultValue: data?.Banner || "",
          placeholder: "This is a LivestreamQR Banner",
        }}
        handleSubmit={updateSite}
      />
              <Form
        title="Page Headline"
        description="The headline of your QR. This will be used as the headline text and meta description on Google."
        helpText="Include SEO-optimized keywords that you want to rank for."
        inputAttrs={{
          name: "description",
          type: "text",
          defaultValue: data?.description || "",
          placeholder: "LivestreamQR Link",
        }}
        handleSubmit={updateSite}
      />
          <Form
      title="Enable Contact Form"
      description="Toggle this option to enable or disable a Contact Form."
      helpText="Meet your clients with a Contact Form!"
      inputAttrs={{
        name: "enableFeature",
        type: "checkbox",
        defaultValue: data?.enableFeature || false, // Default to false if not set
      }}
      handleSubmit={updateSite}
    />
      {/* <Form
        title="Landing Page Video"
        description="Provide a link to YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, or DailyMotion video."
        inputAttrs={{
          name: "livestreamVideoUrl",
          type: "text",
          defaultValue: data?.livestreamVideoUrl || "",
          placeholder: "QR Landing Page Video Link",
          maxLength: 250,
        }}
        handleSubmit={updateSite}
        helpText={""}
      /> */}
          {/* <Form
            title="YouTube Livestream Key"
            description="Provide a YouTube Stream Key to enable YouTube Live Streaming."
            inputAttrs={{
              name: "YouTubeKey",
              type: "text",
              defaultValue: data?.YouTubeKey || "",
              placeholder: "YouTube Stream Key",
              maxLength: 250,
            }}
            handleSubmit={updateSite}
            helpText={""}
          /> */}
                    <Form
            title="Text Color"
            description="Provide the color for your text."
            inputAttrs={{
              name: "textColor",
              type: "text",
              defaultValue: data?.textColor || "",
              placeholder: "Your Text Color",
              maxLength: 7,
            }}
            handleSubmit={updateSite}
            helpText={""}
          />
          {/* <Form
            title="Features Link"
            description="Provide a Link to the Your Pages."
            inputAttrs={{
              name: "YouTubeUrl",
              type: "text",
              defaultValue: data?.YouTubeUrl || "",
              placeholder: "Your Page Link",
              maxLength: 250,
            }}
            handleSubmit={updateSite}
            helpText={""}
          /> */}
        </>
  );
}
