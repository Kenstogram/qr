"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

export default function SiteSettingsNav() {
  const { id } = useParams() as { id?: string };
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      name: "Analytics",
      href: `/site/${id}/settings/analytics`,
      segment: "analytics",
    },
    // {
    //   name: "Posts",
    //   href: `/site/${id}/settings/posts`,
    //   segment: "posts",
    // },
    // {
    //   name: "Products",
    //   href: `/site/${id}/settings/products`,
    //   segment: "products",
    // },
    {
      name: "Experience",
      href: `/site/${id}/settings/appearance`,
      segment: "appearance",
    },
    {
      name: "Landing Page",
      href: `/site/${id}/settings/landing`,
      segment: "landing",
    },
    // {
    //   name: "Subscriptions",
    //   href: `/site/${id}/settings/subscriptions`,
    //   segment: null,
    // },
    // {
    //   name: "Payments",
    //   href: `/site/${id}/settings/products`,
    //   segment: "products",
    // },
    // {
    //   name: "Meetings",
    //   href: `/site/${id}/settings/appearance`,
    //   segment: "appearance",
    // },
    // {
    //   name: "General",
    //   href: `/site/${id}/settings/general`,
    //   segment: null,
    // },
    // {
    //   name: "Domains",
    //   href: `/site/${id}/settings/domains`,
    //   segment: "domains",
    // },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center space-x-1 border-b border-stone-200 pb-4 pt-2 dark:border-stone-700">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          // Change style depending on whether the link is active
          className={cn(
            "rounded-md px-2 py-1 text-sm font-medium transition-colors active:bg-stone-200 dark:active:bg-stone-600",
            segment === item.segment
              ? "bg-zinc-900 text-white dark:bg-stone-700 dark:text-white"
              : "text-black hover:bg-stone-100 dark:text-black dark:hover:bg-stone-300",
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
