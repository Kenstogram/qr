"use client";

import {
  Wand,
} from "lucide-react";
import { useModal } from "@/components/modal/provider";
import { ReactNode } from "react";

export default function CreateButton({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();
  return (
    <div>
        <button
            onClick={() => modal?.show(children)}
            className="mb-2 mr-2 text-white group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#ff00d4] no-underline active:scale-95 scale-100 duration-75 w-full"
            style={{
              boxShadow: "0 1px 1px #0c192714, 0 1px 3px #34FFF6",
            }}
              >
                <Wand className="h-6 w-6 mr-2" /> 
                Create QR Brand Kit
          </button>
    </div>
  );
}