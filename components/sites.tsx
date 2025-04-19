// import { getSession } from "@/lib/auth";
// import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import GuestCard from "./guest-card";
import Image from "next/image";
// import PageFooter from "@components/PageFooter";

export default async function Sites({ limit }: { limit?: number }) {
  // const session = await getSession();
  // if (!session) {
  //   redirect("/login");
  // }
  const sites = await prisma.site.findMany({
    // where: {
    //   user: {
    //     id: session.user.id as string,
    //   },
    // },
    where: {
      private: true,
    },
    orderBy: {
      name: "asc",
    },
    ...(limit ? { take: limit } : {}),
  });

  return sites.length > 0 ? (
    <div className="overflow-x-auto pt-20 pr-10 pl-10 pb-20">
      <div className="flex grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {sites.map((site) => (
          <GuestCard data={site} key={site.id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="mt-5 flex flex-col items-center space-x-4">
      <h1 className="pt-20 font-cal text-4xl">No Sites Yet</h1>
      <Image
        alt="missing site"
        src="https://illustrations.popsy.co/violet/cute-smiling-cat.svg"
        width={400}
        height={400}
      />
      {/* <p className="text-lg text-stone-500">
        You do not have any sites yet. Create one to get started.
      </p> */}
      {/* <div className="pb-96">
        <PageFooter />
      </div> */}
    </div>
  );
}
