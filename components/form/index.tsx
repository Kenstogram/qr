"use client";

import { useState } from "react";
import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
// @ts-expect-error
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import DomainStatus from "./domain-status";
import DomainConfiguration from "./domain-configuration";
import Uploader from "./uploader";
import va from "@vercel/analytics";

export default function Form({
  title,
  description,
  helpText,
  inputAttrs,
  handleSubmit,
}: {
  title: string;
  description: string;
  helpText: string;
  inputAttrs: {
    name: string;
    type: string;
    defaultValue: string | boolean;
    private?: boolean;
    enableFeature?: boolean;
    placeholder?: string;
    maxLength?: number;
    pattern?: string;
  };
  handleSubmit: any;
}) {
  const { id } = useParams() as { id?: string };
  const router = useRouter();
  const { update } = useSession();
  const [enableFeature, setEnableFeature] = useState(inputAttrs.defaultValue as boolean);

  return (
    <form
      action={async (data: FormData) => {
        if (
                  inputAttrs.name === "customDomain" &&
                  inputAttrs.defaultValue &&
                  data.get("customDomain") !== inputAttrs.defaultValue &&
                  !confirm("Are you sure you want to change your custom domain?")
                ) {
                  return;
                }
                handleSubmit(data, id, inputAttrs.name).then(async (res: any) => {
                  if (res.error) {
                    toast.error(res.error);
                  } else {
                    va.track(`Updated ${inputAttrs.name}`, id ? { id } : {});
                    if (id) {
                      router.refresh();
                    } else {
                      await update();
                      router.refresh();
                    }
                    toast.success(`Success!`);
                  }
                });
              }}
              className="rounded-lg border border-stone-200 dark:border-white"
            >
              <div className="relative flex flex-col space-y-4 p-5 sm:p-10 border rounded-t border-black">
                <h2 className="font-cal text-xl dark:text-white">{title}</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  {description}
                </p>
                {inputAttrs.name === "image" || inputAttrs.name === "logo" ? (
                  <Uploader
                    defaultValue={inputAttrs.defaultValue as string}
                    name={inputAttrs.name}
                  />
                ) : inputAttrs.name === "font" ? (
                  <div className="flex max-w-sm items-center overflow-hidden rounded-lg border border-stone-200 dark:border-white">
                    <select
                      name="font"
                      defaultValue={inputAttrs.defaultValue as string}
                      className="w-full rounded-none border-none bg-white px-4 py-2 text-sm font-medium text-stone-700 focus:outline-none focus:ring-black dark:bg-black dark:text-white dark:focus:ring-white"
                    >
                      <option value="font-cal">Cal Sans</option>
                      <option value="font-lora">Lora</option>
                      <option value="font-work">Work Sans</option>
                    </select>
                  </div>
                ) : inputAttrs.name === "subdomain" ? (
                  <div className="flex w-full max-w-md">
                    <input
                      {...inputAttrs}
                      required
                      defaultValue={inputAttrs.defaultValue as string} // Cast to string
                      className="z-10 flex-1 rounded-l-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-white dark:bg-black dark:bg-black dark:text-white dark:placeholder-stone-300"
                    />
                    <div className="flex items-center rounded-r-md border border-l-0 border-stone-300 bg-stone-100 px-3 text-sm dark:border-stone-600 dark:bg-stone-800 dark:text-stone-400">
                      {process.env.NEXT_PUBLIC_ROOT_DOMAIN}
                    </div>
                  </div>
                ) : inputAttrs.name === "customDomain" ? (
                  <div className="relative flex w-full max-w-md">
                    <input
                      {...inputAttrs}
                      defaultValue={inputAttrs.defaultValue as string} // Cast to string
                      className="z-10 flex-1 rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-white dark:bg-black dark:bg-black dark:text-white dark:placeholder-stone-300"
                    />
                    {inputAttrs.defaultValue && (
                      <div className="absolute right-3 z-10 flex h-full items-center">
                        <DomainStatus domain={inputAttrs.defaultValue as string} />
                      </div>
                    )}
                  </div>
                ) : inputAttrs.name === "description" ? (
                  <textarea
                    {...inputAttrs}
                    rows={3}
                    required
                    defaultValue={inputAttrs.defaultValue as string} // Cast to string
                    className="w-full max-w-xl rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-white dark:bg-black dark:bg-black dark:text-white dark:placeholder-stone-300"
                  />
                ) : inputAttrs.name === "livestreamVideoUrl" ? (
                  <input
                    {...inputAttrs}
                    required
                    defaultValue={inputAttrs.defaultValue as string} // Cast to string
                    className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-white dark:bg-black dark:bg-black dark:text-white dark:placeholder-stone-300"
                  />
                ) : inputAttrs.name === "Banner" ? (
                  <input
                    {...inputAttrs}
                    required
                    defaultValue={inputAttrs.defaultValue as string} // Cast to string
                    className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-white dark:bg-black dark:bg-black dark:text-white dark:placeholder-stone-300"
                  />
                ) : inputAttrs.name === "QrUrl" ? (
                  <input
                    {...inputAttrs}
                    required
                    defaultValue={inputAttrs.defaultValue as string} // Cast to string
                    className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-white dark:bg-black dark:bg-black dark:text-white dark:placeholder-stone-300"
                  />    
                ) : inputAttrs.name === "YouTubeUrl" ? (
                  <input
                    {...inputAttrs}
                    required
                    defaultValue={inputAttrs.defaultValue as string} // Cast to string
                    className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-white dark:bg-black dark:bg-black dark:text-white dark:placeholder-stone-300"
                  />    
                ) : inputAttrs.name === "textColor" ? (
                  <input
                    {...inputAttrs}
                    required
                    defaultValue={inputAttrs.defaultValue as string} // Cast to string
                    className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-white dark:bg-black dark:bg-black dark:text-white dark:placeholder-stone-300"
                  />    
                ) : inputAttrs.name === "YouTubeKey" ? (
                  <input
                    {...inputAttrs}
                    required
                    defaultValue={inputAttrs.defaultValue as string} // Cast to string
                    className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-white dark:bg-black dark:bg-black dark:text-white dark:placeholder-stone-300"
                  />    
                ) : inputAttrs.name === "TwitchKey" ? (
                  <input
                    {...inputAttrs}
                    required
                    defaultValue={inputAttrs.defaultValue as string} // Cast to string
                    className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-white dark:bg-black dark:bg-black dark:text-white dark:placeholder-stone-300"
                  />
                ) : inputAttrs.name === "username" ? (
                  <input
                    {...inputAttrs}
                    required
                    defaultValue={inputAttrs.defaultValue as string} // Cast to string
                    className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-white dark:bg-black dark:bg-black dark:text-white dark:placeholder-stone-300"
                  />
                ) : inputAttrs.name === "stripeId" ? (
                  <input
                    {...inputAttrs}
                    required
                    defaultValue={inputAttrs.defaultValue as string} // Cast to string
                    className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-white dark:bg-black dark:bg-black dark:text-white dark:placeholder-stone-300"
                  />
                ) : inputAttrs.name === "shareKey" ? (
                  <input
                    {...inputAttrs}
                    required
                    defaultValue={inputAttrs.defaultValue as string} // Cast to string
                    className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-white dark:bg-black dark:bg-black dark:text-white dark:placeholder-stone-300"
                  />
                ) : inputAttrs.name === "enableFeature" ? (
                  <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="enableFeature"
                        checked={enableFeature}
                        className="form-checkbox h-5 w-5 text-blue-600"
                        onChange={(e) => setEnableFeature(e.target.checked)}
                      />
                  </label>
                ) : inputAttrs.name === "private" ? (
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="private"
                      defaultChecked={inputAttrs.defaultValue as boolean}
                      className="form-checkbox h-5 w-5 text-blue-600"
                      onChange={(e) => {
                        inputAttrs.defaultValue = e.target.checked;
                      }}
                    />
                    <span className="text-sm text-stone-500 dark:text-stone-400">
                      {description}
                    </span>
                  </label>
                ) : (
                  <input
                  {...inputAttrs}
                  required
                  defaultValue={inputAttrs.defaultValue as string} // Cast to string
                  className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-white dark:text-black dark:placeholder-stone-300"
                />
              )}
              </div>
              {inputAttrs.name === "customDomain" && inputAttrs.defaultValue && (
                <DomainConfiguration domain={inputAttrs.defaultValue as string} />
              )}
              <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-black bg-stone-50 p-3 dark:border-white dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
                <p className="text-sm text-stone-500 dark:text-stone-400">{helpText}</p>
                <FormButton />
              </div>
            </form>
          );
        }

        function FormButton() {
          const { pending } = useFormStatus();
          return (
            <button
              className={cn(
                "flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
                pending
                  ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                  : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:text-white dark:hover:text-white dark:active:bg-stone-800",
              )}
              disabled={pending}
            >
              {pending ? <LoadingDots color="#808080" /> : <p>Save Changes</p>}
            </button>
          );
        }
