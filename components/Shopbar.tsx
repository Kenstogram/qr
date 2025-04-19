"use client";

import { ShoppingCart } from "lucide-react";
import { ReactNode } from "react";
import { useModal } from "@/components/modal/provider";

export default function Shopbar({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();
  return (
    <div className="fixed bottom-2 left-5 z-80">
      <button
        className="items-center rounded-full bg-transparent p-4 text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:shadow-sm z-70"
        onClick={() => modal?.show(children)} >
        <ShoppingCart size={24} />
      </button>
    </div>
  );
}

