import Replicate from 'replicate';
import { getEnv, ENV_KEY } from '@/utils/env';
import { LogoCodeControlNetRequest, LogoCodeControlNetResponse } from './types';

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
    request: LogoCodeControlNetRequest,
  ): Promise<string> => {
    try {
      const dubUrl = `go.qrexperiences.com/` + request.clicklink;
      // Generate the Image:
      const output = (await this.replicate.run(
        "recraft-ai/recraft-v3-svg:latest",
        {
          input: {
            clicklink: request.clicklink,
            url: dubUrl, // Use the shortened URL here
            size: "1024x1024",
            style: "any",
            prompt: `${request.prompt} against a transparent background`, // Template literal
          },
        }
      )) as LogoCodeControlNetResponse;

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
