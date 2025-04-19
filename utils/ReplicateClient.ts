import axios from 'axios';
import Replicate from 'replicate';
import { getEnv, ENV_KEY } from '@/utils/env';
import { QrCodeControlNetRequest, QrCodeControlNetResponse } from './types';

export class ReplicateClient {
  replicate: Replicate;

  constructor(apiKey: string) {
    this.replicate = new Replicate({
      auth: apiKey,
    });
  }

  /**
   * Generate a QR Experience.
   */
  generateQrCode = async (
    request: QrCodeControlNetRequest,
  ): Promise<string> => {
    try {
      // Make a request to the Dub API to shorten the URL
      // Extract the shortened URL from the Dub API response
      const dubUrl = `go.qrexperiences.com/` + request.clicklink;

      // Generate the QR Experience using the shortened URL
      const output = (await this.replicate.run(
        'zylim0702/qr_code_controlnet:628e604e13cf63d8ec58bd4d238474e8986b054bc5e1326e50995fdbc851c557',
        {
          input: {
            clicklink: request.clicklink,
            url: dubUrl, // Use the shortened URL here
            prompt: request.prompt,
            qr_conditioning_scale: request.qr_conditioning_scale,
            num_inference_steps: request.num_inference_steps,
            guidance_scale: request.guidance_scale,
            negative_prompt: request.negative_prompt,
          },
        }
      )) as QrCodeControlNetResponse;

      if (!output) {
        throw new Error('Failed to generate QR Experience');
      }

      return output[0];
    } catch (error) {
      throw new Error(`Failed to generate QR Experience: ${(error as Error).message}`);
    }
  };
}

const apiKey = getEnv(ENV_KEY.REPLICATE_API_KEY);
if (!apiKey) {
  throw new Error('REPLICATE_API_KEY is not set');
}
export const replicateClient = new ReplicateClient(apiKey);
