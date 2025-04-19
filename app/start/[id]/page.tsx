import { kv } from '@vercel/kv';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Body from '@/components/Body';
import Navbar from '@/components/NavbarDark';
import { Suspense } from "react";

async function getAllKv(id: string) {
  const data = await kv.hgetall<{
    clicklink: string;
    prompt: string;
    image?: string;
    website_url?: string;
    model_latency?: string;
  }>(id);

  return data;
}

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata | undefined> {
  const data = await getAllKv(params.id);
  if (!data) {
    return;
  }

  const clicklink = `${data.clicklink}`;
  const title = `QR Experiences: ${data.prompt}`;
  const description = `A QR Experience generated from QRExperiences.com linking to: ${data.website_url}`;
  const image = data.image || 'https://QRExperiences.com/og-image.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@qrexperiences',
    },
  };
}

export default async function Results({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const data = await getAllKv(params.id);
  if (!data) {
    notFound();
  }
  return (
    <>
        <Suspense fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-300" />
          }>
    <Navbar />
    </Suspense>
    <div className="mt-16 ml-5">
    <Body
      clicklink={data.clicklink}
      prompt={data.prompt}
      imageUrl={data.image}
      redirectUrl={data.website_url}
      modelLatency={Number(data.model_latency)}
      id={params.id}
    />
    </div>
    </>
  );
}
