import { headers } from "next/headers";
import { getPostsForSite } from "@/lib/fetchers";

export default async function Sitemap() {
  const headersList = headers();
  const domain = headersList.get("host")?.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) ?? "qrexperiences.com";

  const posts = await getPostsForSite(domain);

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/start/*`,
      lastModified: new Date(),
    },
    {
      url: `https://app.${domain}/admin`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/blog`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/blog/*`,
      lastModified: new Date(),
    },
    {
      url: `https://app.${domain}/company`,
      lastModified: new Date(),
    },
    {
      url: `https://app.${domain}/create`,
      lastModified: new Date(),
    },
    {
      url: `https://app.${domain}/creators`,
      lastModified: new Date(),
    },
    {
      url: `https://app.${domain}/create/*`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/checkout`,
      lastModified: new Date(),
    },
    {
      url: `https://app.${domain}/documentation`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/experiences`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/enterprise`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/events`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/faq`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/healthcare`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/influencers`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/industrial`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/landing`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/livestream`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/liveshop`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/mosaic`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/nonprofits`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/pricing`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/policy`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/platforms`,
      lastModified: new Date(),
    },
    {
      url: `https://app.${domain}/realestate`,
      lastModified: new Date(),
    },
    {
      url: `https://app.${domain}/restaurants`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/tokens`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/training`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/travel`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/transportation`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/scan`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/subscriber`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/superapp`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/support`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/smb`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/sweatpants`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/waitlist`,
      lastModified: new Date(),
    },
    ...posts.map(({ slug }) => ({
      url: `https://${domain}/${slug}`,
      lastModified: new Date(),
    })),
    ...posts.map(({ slug }) => ({
      url: `https://${domain}/${slug}/instagram`,
      lastModified: new Date(),
    })),
    ...posts.map(({ slug }) => ({
      url: `https://${domain}/${slug}/linkedin`,
      lastModified: new Date(),
    })),
    ...posts.map(({ slug }) => ({
      url: `https://${domain}/${slug}/meta`,
      lastModified: new Date(),
    })),
    ...posts.map(({ slug }) => ({
      url: `https://${domain}/${slug}/x`,
      lastModified: new Date(),
    })),
  ];
}
