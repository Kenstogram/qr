import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import SiteCard from "./site-card";
import Image from "next/image";

export default async function Streams({ limit }: { limit?: number }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const sites = await prisma.site.findMany({
    where: {
      user: {
        id: session.user.id as string,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    ...(limit ? { take: limit } : {}),
  });

  return sites.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {sites.map((site) => (
        <SiteCard key={site.id} data={site} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">No QRs Yet</h1>
      <div className="image-wrapper relative">
        <Image
          alt="missing site"
          src="https://illustrations.popsy.co/violet/cute-smiling-cat.svg"
          width={400}
          height={400}
          className="transition-image"
        />
        <Image
          alt="missing site"
          src="https://illustrations.popsy.co/pink/cute-smiling-cat.svg"
          width={400}
          height={400}
          className="absolute top-0 left-0 transition-image"
        />
      </div>
      <p className="text-lg text-stone-500">
        Create a QR to get started.
      </p>
      <a href="/create">
        <button className="mt-4 bg-black text-white px-4 py-2 rounded transition duration-200 hover:bg-violet-700">
          Create QR Experience
        </button>
      </a>
    </div>
  );
}