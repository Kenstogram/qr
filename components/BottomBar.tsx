"use client";

import Link from "next/link";
import { useMobile } from "@/utils/useMobile";

export function BottomBar() {
  const mobile = useMobile();

  return (
    <div className="relative flex w-full h-full justify-between">
      {/* Conditionally render the bottom bar for mobile view */}
      {mobile && (
        <div className="fixed bottom-0 w-full h-16 bg-black pt-4 pb-4 pr-4 z-[100] flex items-center justify-between rounded-t-sm shadow-lg">
          <div className="flex flex-grow justify-around">
            <Link href="/" className="flex flex-col items-center text-white space-y-0.5">
              <span role="img" aria-label="wrench" className="text-xl">📊</span> {/* Wrench emoji */}
              <span className="text-white text-xs">Dashboard</span>
            </Link>
            <Link href="/create" className="flex flex-col items-center text-white space-y-0.5">
              <span role="img" aria-label="learn" className="text-xl">🚀</span> {/* Earn Emoji */}
              <span className="text-white text-xs">Create</span>
            </Link>
            <Link href="/streams" className="flex flex-col items-center text-white space-y-0.5">
              <span role="img" aria-label="content" className="text-xl">🖼️</span> {/* Content Emoji */}
              <span className="text-white text-xs">Studio</span>
            </Link>
            <Link href="/settings" className="flex flex-col items-center text-white space-y-0.5">
              <span role="img" aria-label="profile" className="text-xl">🧰</span> {/* Wrench Emoji */}
              <span className="text-white text-xs">Settings</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
