import Replicate from 'replicate';
import { getEnv, ENV_KEY } from '@/utils/env';
import { ImageCodeControlNetRequest, ImageCodeControlNetResponse } from './types';

export class ReplicateImage {
  replicate: Replicate;

  constructor(apiKey: string) {
    this.replicate = new Replicate({
      auth: apiKey,
    });
  }

  /**
   * Generate a QR Experience.
   */
  generateImage = async (
    request: ImageCodeControlNetRequest,
  ): Promise<string> => {
    try {
      const dubUrl = `go.qrexperiences.com/` + request.clicklink;
      // Generate the Image:
      const output = (await this.replicate.run(
        'bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637',
        {
          input: {
            clicklink: request.clicklink,
            url: dubUrl, // Use the shortened URL here
            width: 1024,
            height: 1024,
            scheduler: "K_EULER",
            num_outputs: 1,
            prompt: request.prompt,
            guidance_scale: request.guidance_scale,
            negative_prompt: request.negative_prompt,
            num_inference_steps: request.num_inference_steps,
          },
        }
      )) as ImageCodeControlNetResponse;

      if (!output) {
        throw new Error('Failed to generate Image');
      }

      return output[0];
    } catch (error) {
      throw new Error(`Failed to generate Image: ${(error as Error).message}`);
    }
  };
}

const apiKey = getEnv(ENV_KEY.REPLICATE_API_KEY);
if (!apiKey) {
  throw new Error('REPLICATE_API_KEY is not set');
}
export const replicateClient = new ReplicateImage(apiKey);
