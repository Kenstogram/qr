import Replicate from 'replicate';
import { getEnv, ENV_KEY } from '@/utils/env';
import { TokCodeControlNetRequest, TokCodeControlNetResponse } from './types';

export class ReplicateTok {
  replicate: Replicate;

  constructor(apiKey: string) {
    this.replicate = new Replicate({
      auth: apiKey,
    });
  }

  /**
   * Generate a QR Experience.
   */
  generateTok = async (
    request: TokCodeControlNetRequest,
  ): Promise<string> => {
    try {
      const dubUrl = `go.qrexperiences.com/` + request.clicklink;
      // Generate the Tok:
      const output = (await this.replicate.run(
        'davisbrown/flux-half-illustration:687458266007b196a490e79a77bae4b123c1792900e1cb730a51344887ad9832',
        {
          input: {
            clicklink: request.clicklink,
            url: dubUrl, // Use the shortened URL here
            aspect_ratio: "3:2",
            prompt: `In the style of TOK, ${request.prompt}`,
            guidance_scale: request.guidance_scale,
          },
        }
      )) as TokCodeControlNetResponse;

      if (!output) {
        throw new Error('Failed to generate Tok');
      }

      return output[0];
    } catch (error) {
      throw new Error(`Failed to generate Tok: ${(error as Error).message}`);
    }
  };
}

const apiKey = getEnv(ENV_KEY.REPLICATE_API_KEY);
if (!apiKey) {
  throw new Error('REPLICATE_API_KEY is not set');
}
export const replicateClient = new ReplicateTok(apiKey);
