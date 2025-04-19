"use client";

import { useModal } from "@/components/modal/provider";
import { ReactNode } from "react";

export default function CreateProductButton({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();
  return (
    <button
      onClick={() => modal?.show(children)}
      className="truncate rounded-md px-2 py-1 text-sm font-medium text-white transition-colors bg-black dark:hover:bg-stone-700"
    >
      Add Product
    </button>
  );
}
