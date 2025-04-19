"use client";

import { useModal } from "@/components/modal/provider";
import { ReactNode } from "react";

export default function CreateSiteButton({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();
  return (
    <button
      onClick={() => modal?.show(children)}
      className="fixed z-20 text-black right-7 top-20 rounded-lg border border-black bg-white px-4 py-1.5 text-sm font-medium text-black transition-all hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-white dark:text-black dark:hover:text-black dark:active:bg-stone-300"
    >
      Create New QR Experiences
    </button>
  );
}
