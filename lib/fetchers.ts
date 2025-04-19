import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { serialize } from "next-mdx-remote/serialize";
import { replaceExamples, replaceTweets } from "@/lib/remark-plugins";

export async function getSiteData(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "").toLowerCase()
    : null;

  if (!subdomain) return null; // Handle the case where subdomain is null

  // Query the database directly without caching
  return await prisma.site.findUnique({
    where: { subdomain },
    include: { user: true },
  });
}


export async function getPostsForSite(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "").toLowerCase()
    : null;

  return await unstable_cache(
    async () => {
      if (!subdomain) return []; // Return an empty array if subdomain is null

      return prisma.post.findMany({
        where: {
          site: { subdomain },
          published: true,
        },
        select: {
          title: true,
          description: true,
          slug: true,
          image: true,
          imageBlurhash: true,
          createdAt: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    },
    [`${subdomain}-posts`],
    {
      revalidate: 900,
      tags: [`${subdomain}-posts`],
    },
  )();
}

export async function getPostData(domain: string, slug: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "").toLowerCase()
    : null;

  return await unstable_cache(
    async () => {
      if (!subdomain) return null; // Handle the case where subdomain is null

      const data = await prisma.post.findFirst({
        where: {
          site: { subdomain },
          slug,
          published: true,
        },
        include: {
          site: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!data) return null;

      const [mdxSource, adjacentPosts] = await Promise.all([
        getMdxSource(data.content!),
        prisma.post.findMany({
          where: {
            site: { subdomain },
            published: true,
            NOT: {
              id: data.id,
            },
          },
          select: {
            slug: true,
            title: true,
            createdAt: true,
            description: true,
            image: true,
            imageBlurhash: true,
          },
        }),
      ]);

      return {
        ...data,
        mdxSource,
        adjacentPosts,
      };
    },
    [`${subdomain}-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`${subdomain}-${slug}`],
    },
  )();
}

async function getMdxSource(postContents: string) {
  const content =
    postContents?.replaceAll(/<(https?:\/\/\S+)>/g, "[$1]($1)") ?? "";
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [replaceTweets, () => replaceExamples(prisma)],
    },
  });

  return mdxSource;
}