"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { QrCard } from "@/components/image/QrCard";
import LoadingDots from "@/components/ui/loadingdots";
import downloadQrCode from "@/utils/downloadQrCode";
import { toast, Toaster } from "react-hot-toast";
import va from "@vercel/analytics";
import { useRouter } from "next/navigation";
import { TokGenerateRequest, TokGenerateResponse } from '@/utils/service';

type ImageGenerateResponse = {
  image_url: string;
  model_latency_ms: number;
  id: string;
};

type ImageGeneratorProps = {
  imageUrl?: string;
  clicklink: string;  // Directly passed as prop
  description?: string;  // Used as prompt for image generation
  modelLatency?: number;
  id?: string;
};

const ImageGenerator = ({
  imageUrl,
  clicklink,
  description,
  modelLatency,
  id,
}: ImageGeneratorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ImageGenerateResponse | null>(null);
  const [submittedURL, setSubmittedURL] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (clicklink && imageUrl && description && modelLatency && id) {
      setResponse({
        image_url: imageUrl,
        model_latency_ms: modelLatency,
        id: id,
      });
      setSubmittedURL(clicklink);
    }
  }, [imageUrl, modelLatency, description, clicklink, id]);

  const handleGenerate = async () => {
    // Ensure that both clicklink and description are provided
    if (!clicklink || !description) {
      toast.error("Clicklink and description are required.");
      return;
    }

    setIsLoading(true);
    setResponse(null);

    try {
      const request: TokGenerateRequest = {
        clicklink: clicklink,
        url: clicklink,  // This URL is based on the clicklink
        prompt: description || "",  // Use the description as the prompt
      };

      const apiResponse = await fetch("/api/generate_tok", {
        method: "POST",
        body: JSON.stringify(request),
      });

      if (!apiResponse.ok) {
        const text = await apiResponse.text();
        if (apiResponse.status === 500) {
          toast.error("Click link already exists.");
        } else {
          throw new Error(`Failed to generate Image Experience: ${apiResponse.status}, ${text}`);
        }
        return;
      }

      const data: TokGenerateResponse = await apiResponse.json();
      va.track("Generated QR Experience", { prompt: description });

      setResponse({
        image_url: data.image_url,
        model_latency_ms: data.model_latency_ms,
        id: data.id,
      });
      setSubmittedURL(clicklink);
    } catch (error) {
      va.track("Failed to generate", { prompt: description });
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-stone-200 bg-white dark:border-white dark:bg-black p-6 sm:mb-28 mb-0">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-6">
        <div className="col-span-1">
          <h1 className="text-lg font-bold mb-6 text-black dark:text-white">Create Images with AI using the QR Experience Description</h1>
          <Button
            onClick={handleGenerate}
            disabled={isLoading}
            className="inline-flex justify-center max-w-[200px] mx-auto w-full border border-stone-200 text-black"
          >
            {isLoading ? <LoadingDots color="black" /> : "Generate Image"}
          </Button>
        </div>
        <div className="col-span-1">
          {submittedURL && response && (
            <>
              <h1 className="text-3xl font-bold sm:mb-5 mb-5 mt-5 sm:mt-0 sm:text-center text-left">
                Your QR Experience Image
              </h1>
              {description && <p className="font-bold">Image prompt: </p>}  {/* Display description if available */}
              {description && <p>Image prompt: {description}</p>}  {/* Display description if available */}
              <div>
                <QrCard
                  imageURL={response.image_url}
                  time={(response.model_latency_ms / 1000).toFixed(2)}
                />
                <div className="flex flex-wrap justify-center gap-5 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => downloadQrCode(response.image_url, "qrCode")}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ImageGenerator;
