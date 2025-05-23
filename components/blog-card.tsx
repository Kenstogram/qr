import Link from "next/link";
import Image from "next/image"; // Import Image component from next/image

import type { Post } from "@prisma/client";
import { toDateString } from "@/lib/utils";

interface BlogCardProps {
  data: Pick<Post, "slug" | "image" | "title" | "description" | "createdAt">;
}

export default function BlogCard({ data }: BlogCardProps) {
  return (
    <Link href={`/${data.slug}`}>
      <div className="ease overflow-hidden rounded-2xl border-2 border-stone-100 bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-stone-800">
        <div className="h-64 w-full relative">
          <Image
            src={data.image!}
            alt={data.title ?? "Blog Post"}
            width={500}
            height={400}
            layout="responsive"
            objectFit="cover"
            className="rounded-t-2xl"
          />
        </div>
        <div className="h-36 border-t border-stone-200 px-5 py-8 dark:border-stone-700 dark:bg-white">
          <h3 className="font-title text-xl tracking-wide dark:text-black">
            {data.title}
          </h3>
          <p className="text-md my-2 truncate italic text-stone-600 dark:text-stone-400">
            {data.description}
          </p>
          <p className="my-2 text-sm text-stone-600 dark:text-stone-400">
            Published {toDateString(data.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}
