"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
        <button
        onClick={() => signOut()}
        className="mb-2 mr-2 text-white group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#ff00d4] no-underline active:scale-95 scale-100 duration-75 w-full"
            style={{
              boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
            }}
              >
          <LogOut className="text-white" width={18} />
                Logout
          </button>
  );
}
