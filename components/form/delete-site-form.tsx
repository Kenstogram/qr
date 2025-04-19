"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
// @ts-expect-error
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { deleteSite } from "@/lib/actions";
import va from "@vercel/analytics";

export default function DeleteSiteForm({ siteName }: { siteName: string }) {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  return (
    <form
      action={async (data: FormData): Promise<void> => {
        if (window.confirm("Are you sure you want to delete your site?")) {
          try {
            const res = await deleteSite(data, id, "delete");

            if (res.error) {
              toast.error(res.error);
            } else {
              va.track("Deleted Site");
              router.refresh();
              router.push("/");
              toast.success(`Successfully deleted site!`);
            }
          } catch (err: any) {
            toast.error(err.message);
          }
        }
      }}
      className="rounded-lg border border-red-600 bg-white dark:bg-white"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h2 className="font-cal text-xl dark:text-black">Delete QR</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Deletes your QR and all content associated with it. Type in the name
          of your QR <b>{siteName}</b> to confirm.
        </p>

        <input
          name="confirm"
          type="text"
          required
          pattern={siteName}
          placeholder={siteName}
          className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-white dark:bg-white dark:text-black dark:placeholder-stone-300"
        />
      </div>

      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-300 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <p className="text-center text-sm text-stone-500 dark:text-stone-400">
          This action is irreversible. Please proceed with caution.
        </p>
        <div className="w-32">
          <FormButton />
        </div>
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
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-300 dark:text-stone-300"
          : "border-red-600 bg-red-600 text-black hover:bg-white hover:text-red-600 dark:hover:bg-transparent",
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Confirm Delete</p>}
    </button>
  );
}
