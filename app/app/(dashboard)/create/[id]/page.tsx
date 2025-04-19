import { kv } from '@vercel/kv';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from "react";
import Body from '@/components/Body'; // Import the default Body component
import BodyTok from '@/components/BodyTok'; // Import BodyTok
import BodyImage from '@/components/BodyImage'; // Import BodyImage
import Navbar from '@/components/NavbarDark';

async function getAllKv(id: string) {
  const data = await kv.hgetall<{
    clicklink: string;
    prompt: string;
    image?: string;
    website_url?: string;
    model_latency?: string;
    componentType?: string; // componentType can be 'Body', 'BodyTok', or 'BodyImage'
  }>(id);

  return data;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata | undefined> {
  const data = await getAllKv(params.id);
  if (!data) return;

  const title = `QR Experiences: ${data.prompt}`;
  const description = `A QR Experience Created at QRExperiences.com linking to: ${data.website_url}`;
  const image = data.image || 'https://QRExperiences.com/og-image.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
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

export default async function Results({ params }: { params: { id: string } }) {
  const data = await getAllKv(params.id);
  if (!data) {
    notFound();
  }

  // Determine which component to render based on componentType in data
  const ComponentToRender = data.componentType === 'BodyTok' 
    ? BodyTok 
    : data.componentType === 'BodyImage' 
      ? BodyImage 
      : Body; // Default to 'Body' if no componentType or it's not BodyTok/BodyImage

  return (
    <>
      <Suspense fallback={
        <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-300" />
      }>
        <Navbar />
      </Suspense>
      <div>
        <ComponentToRender
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
