"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { ReactNode, useState, useEffect, useMemo } from "react";
import { useParams, usePathname, useSelectedLayoutSegments, redirect } from "next/navigation";
import { getSiteFromPostId } from "@/lib/actions";
import { UpgradeCard } from "@/components/upgrade-card";
import { Button } from "@/components/ui/button";

export default function Nav({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };
  const [siteId, setSiteId] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (segments[0] === "post" && id) {
      getSiteFromPostId(id).then((result) => {
        // Ensure result is string or null before setting
        setSiteId(result || null);
      });
    }
  }, [segments, id]);

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  const pathname = usePathname();

  useEffect(() => {
    setShowSidebar(false);
  }, [pathname]);


  const tabs = useMemo(() => {
    if (segments[0] === "site" && id) {
      return [
        { name: "Back", href: "/", icon: "↩️" },
        { name: "Settings", href: `/site/${id}/settings`, icon: "✏️" },
      ];
    } else if (segments[0] === "post" && id) {
      return [
        { name: "Back", href: siteId ? `/site/${siteId}` : "/", icon: "↩️" },
        { name: "Editor", href: `/post/${id}`, icon: "✏️" },
        { name: "Settings", href: `/post/${id}/settings`, icon: "⚙️" },
      ];
    }
    return [
      { name: "Dashboard", href: "/", icon: "🌐" },
      { name: "Create", href: "/create", icon: "🚀" },
      { name: "Studio", href: "/streams", icon: "🖼️" },
      // { name: "Trending", href: "/sites", icon: "📱" },
      // { name: "Resources", href: "/resources", icon: "🚀" },
      { name: "Settings", href: "/settings", icon: "⚙️" },
    ];
  }, [segments, id, siteId]);

  return (
    <>
      {/* Sidebar button */}
      <div className="sticky h-16 top-0 bg-black p-4 z-[70]">
        <div className="absolute top-4 left-4">
          <button
            className="text-white rounded-lg bg-black ml-4 hover:text-grey-400"
            onClick={toggleSidebar}
          >
            <Menu width={20} />
          </button>
        </div>
        <div className="top-5 flex justify-center items-center">
          <Link href="https://app.qrexperiences.com" className="flex items-center space-x-0.5">
            <span className="font-urban text-xl text-white">
              QR <span className="font-bold font-urban text-xl text-white">Experiences</span>
            </span>
          </Link>
        </div>
      </div>

      {/* Sidebar content */}
      <div
        className={`fixed z-30 h-full bg-black bg-opacity-90 p-4 transition-transform ease-in-out duration-300 ${
          showSidebar ? "translate-x-0 w-60" : "-translate-x-full w-16"
        }`}
      >
        <div className="grid gap-1 text-white">
          <div className={`${showSidebar ? "" : "sr-only"}`}>
            <Link href="https://qrexperiences.com">
             <Button size="sm" className="bg-stone-100 text-black border border-gray font-bold w-full">
              Get Started
             </Button>
            </Link>
          </div>
          {tabs.map(({ name, href, icon }) => (
            <Link key={name} href={href}>
              <a
                className={`flex items-center space-x-3 rounded-lg px-2 py-1.5 transition-all hover:bg-stone-600 text-white ${
                  showSidebar ? "" : "sr-only"
                }`}
              >
                <span className="text-xl mr-1">{icon}</span>
                <span className="text-sm font-medium text-stone-100 active:text-white">{name}</span>
              </a>
            </Link>
          ))}
        </div>
        <div className="my-2 text-white" />
        {children}
        {showSidebar && (
          <div className="absolute bottom-36">
            <UpgradeCard />
          </div>
        )}
      </div>
    </>
  );
}