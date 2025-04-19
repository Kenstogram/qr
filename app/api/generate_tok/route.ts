import { replicateClient } from '@/utils/ReplicateTok';
import { TokGenerateRequest, TokGenerateResponse } from '@/utils/service';
import { NextRequest } from 'next/server';
// import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { put } from '@vercel/blob';
import { nanoid } from '@/utils/utils';

/**
 * Validates a request object.
 *
 * @param {TokGenerateRequest} request - The request object to be validated.
 * @throws {Error} Error message if URL or prompt is missing.
 */

const validateRequest = (request: TokGenerateRequest) => {
  if (!request.url) {
    throw new Error('URL is required');
  }
  if (!request.prompt) {
    throw new Error('Prompt is required');
  }
};

// const ratelimit = new Ratelimit({
//   redis: kv,
//   // Allow 20 requests from the same IP in 1 day.
//   limiter: Ratelimit.slidingWindow(20, '1 d'),
// });

export async function POST(request: NextRequest) {
  const reqBody = (await request.json()) as TokGenerateRequest;

  // const ip = request.ip ?? '127.0.0.1';
  // const { success } = await ratelimit.limit(ip);

  // if (!success && process.env.NODE_ENV !== 'development') {
  //   return new Response('Too many requests. Please try again after 24h.', {
  //     status: 429,
  //   });
  // }

  try {
    validateRequest(reqBody);
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message, { status: 400 });
    }
  }

  const id = nanoid();
  const startTime = performance.now();

  let TokUrl = await replicateClient.generateTok({
    clicklink: reqBody.clicklink,
    url: reqBody.url,
    prompt: reqBody.prompt,
    num_inference_steps: 5,
    guidance_scale: 3.5,
    negative_prompt: 'low quality, blurry, no watermark, no signature, no copyright, no labels, no captions, no annotation, no text overlay, no text in the background, no distracting text, no tok text mark',
  });

  const endTime = performance.now();
  const durationMS = endTime - startTime;

  // convert output to a blob object
  const file = await fetch(TokUrl).then((res) => res.blob());

  // upload & store in Vercel Blob
  const { url } = await put(`${id}.png`, file, { access: 'public' });

  await kv.hset(id, {
    clicklink: reqBody.clicklink,
    prompt: reqBody.prompt,
    image: url,
    website_url: reqBody.url,
    componentType: "BodyTok", // componentType can be 'Body', 'BodyTok', or 'BodyImage'
    model_latency: Math.round(durationMS),
  });
  const response: TokGenerateResponse = {
    image_url: url,
    model_latency_ms: Math.round(durationMS),
    id: id,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
}