'use client';

import { toast } from "sonner";
import { createSite } from "@/lib/actions";
import { useRouter } from "next/navigation";
// @ts-expect-error
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { useModal } from "./provider";
import va from "@vercel/analytics";
import { useEffect, useState } from "react";

export default function CreateExperienceModal() {
  const router = useRouter();
  const modal = useModal();

  const [data, setData] = useState({
    name: "",
    subdomain: "",
    description: "",
    image: "", // Add the image field to the data state
    video: "", // Add the video field to the data state
    clicklink: "", // Add the clicklink field to the data state
    livestreamVideoUrl: "",
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      subdomain: prev.name
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, "-"),
    }));
  }, [data.name]);

  const { pending } = useFormStatus();

  const handleSaveExperience = async () => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('subdomain', data.subdomain);
      formData.append('description', data.description);
      formData.append('image', data.image);
      formData.append('clicklink', data.clicklink);
      formData.append('livestreamVideoUrl', data.livestreamVideoUrl);

      const res = await createSite(formData);
    
      if ('error' in res) {
        toast.error(res.error);
      } else {
        va.track("Created Site");
        const { id, subdomain } = res;
        router.refresh();
        router.push(`/site/${id}/settings`);
        router.push(`https://app.qrexperiences.com`);
        window.location.href = `https://app.qrexperiences.com`;
      }
    } catch (error) {
      console.error('Failed to create site:', error);
      toast.error('Failed to create site');
    }
  };
  
  return (
    <form
      onSubmit={handleSaveExperience}
      className="w-full rounded-md bg-white dark:bg-white md:max-w-md md:border md:border-stone-200 md:shadow dark:md:border-stone-700"
    >
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        <h2 className="font-cal text-2xl dark:text-black">Save QR Experience</h2>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Experience Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="My Experience"
            autoFocus
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            maxLength={32}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-white dark:bg-white dark:text-black dark:placeholder-stone-300 dark:focus:ring-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="subdomain"
            className="text-sm font-medium text-stone-500"
          >
            Subdomain
          </label>
          <div className="flex w-full max-w-md">
            <input
              name="subdomain"
              type="text"
              placeholder="subdomain"
              value={data.subdomain}
              onChange={(e) => setData({ ...data, subdomain: e.target.value })}
              autoCapitalize="off"
              pattern="[a-zA-Z0-9\-]+" // only allow lowercase letters, numbers, and dashes
              maxLength={32}
              required
              className="w-full rounded-l-lg border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-white dark:bg-white dark:text-black dark:placeholder-stone-300 dark:focus:ring-white"
            />
            <div className="flex items-center rounded-r-lg border border-l-0 border-stone-200 bg-stone-100 px-3 text-sm dark:border-stone-600 dark:bg-stone-300 dark:text-stone-400">
              .{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-stone-500"
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description about Experience"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            maxLength={140}
            rows={3}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black  focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-white dark:bg-white dark:text-black dark:placeholder-stone-300 dark:focus:ring-white"
          />
        </div>

        {/* Add the image URL input field */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="image"
            className="text-sm font-medium text-stone-500"
          >
            Image URL
          </label>
          <input
            name="image"
            type="text"
            placeholder="Enter the URL of the image"
            value={data.image}
            onChange={(e) => setData({ ...data, image: e.target.value })}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-white dark:bg-white dark:text-black dark:placeholder-stone-300 dark:focus:ring-white"
          />
        </div>
                {/* Add the Analytics Link input field */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="clicklink"
            className="text-sm font-medium text-stone-500"
          >
            Analytics Link
          </label>
          <input
            name="clicklink"
            type="text"
            placeholder="Enter the Analytics Link"
            value={data.clicklink}
            onChange={(e) => setData({ ...data, clicklink: e.target.value })}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-white dark:bg-white dark:text-black dark:placeholder-stone-300 dark:focus:ring-white"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="livestreamVideoUrl" // Change htmlFor to "livestreamVideoUrl"
            className="text-sm font-medium text-stone-500"
          >
            Livestream URL
          </label>
          <input
            name="livestreamVideoUrl" // Change name to "livestreamVideoUrl"
            type="text"
            placeholder="Enter the URL of the Movie"
            value={data.livestreamVideoUrl}
            onChange={(e) => setData({ ...data, livestreamVideoUrl: e.target.value })}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-white dark:bg-white dark:text-black dark:placeholder-stone-300 dark:focus:ring-white"
          />
        </div>
        {/* <div className="flex flex-col space-y-2">
          <label
            htmlFor="video" // Change htmlFor to "video"
            className="text-sm font-medium text-stone-500"
          >
            Video URL
          </label>
          <input
            name="video" // Change name to "video"
            type="text"
            placeholder="Enter the URL of the video"
            value={data.video}
            onChange={(e) => setData({ ...data, video: e.target.value })}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-white dark:bg-white dark:text-black dark:placeholder-stone-300 dark:focus:ring-white"
          />
        </div> */}
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-300 md:px-10">
        <button
          type="submit"
          className={cn(
            "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
            pending
              ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-300 dark:text-stone-300"
              : "border-black bg-white text-black hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200"
              )}
              disabled={pending}
            >
              {pending ? <LoadingDots color="#808080" /> : <p>Save Experience</p>}
            </button>
          </div>
        </form>
      );
    }
    