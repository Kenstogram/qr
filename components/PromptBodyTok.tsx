"use client";

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useState } from 'react';
import { TokGenerateRequest, TokGenerateResponse } from '@/utils/service';
import { QrCard } from '@/components/QrCard';
import LoadingDots from '@/components/ui/loadingdots';
import downloadQrCode from '@/utils/downloadQrCode';
import va from '@vercel/analytics';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { createExperience } from "@/lib/actions"; // Import createSite function

const checkClicklinkUnique = async (clicklink: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/check-clicklink?clicklink=${clicklink}`);
    const data = await response.json();
    return data.isUnique;  // Return whether the clicklink is unique
  } catch (error) {
    console.error('Error checking clicklink uniqueness:', error);
    return false; // If there’s an error, assume it’s not unique
  }
};

// Zod schema for validation, ensuring at least 3 words in the prompt
const generateFormSchema = z.object({
  url: z.string().min(1, 'URL is required'),
  prompt: z.string()
    .min(3, 'Prompt must be at least 3 characters')
    .max(160, 'Prompt cannot exceed 160 characters')
    .refine((val) => val.split(' ').length >= 3, {
      message: 'Prompt must contain at least 3 words',
    }),
});

type GenerateFormValues = z.infer<typeof generateFormSchema>;

const BodyTok = ({
  imageUrl,
  clicklink,
  prompt,
  redirectUrl,
  modelLatency,
  id,
  siteId,
}: {
  imageUrl?: string;
  clicklink?: string;
  prompt?: string;
  url?: string;
  redirectUrl?: string;
  modelLatency?: number;
  id?: string;
  siteId?: string;
  QrUrl?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<TokGenerateResponse | null>(null);
  const [submittedURL, setSubmittedURL] = useState<string | null>(null);
  const [data, setData] = useState({
    name: "",
    subdomain: "",
    description: prompt || "",
    image: imageUrl || "",
    clicklink: clicklink || "",
    livestreamVideoUrl: "",
    QrUrl: redirectUrl || "",
    url: redirectUrl || "",
  });

  const router = useRouter();

  const form = useForm<GenerateFormValues>({
    resolver: zodResolver(generateFormSchema),
    mode: 'onChange',
    defaultValues: {
      url: '',
      prompt: '',
    },
  });

  useEffect(() => {
    if (clicklink && imageUrl && prompt && redirectUrl && modelLatency && id) {
      setResponse({
        image_url: imageUrl,
        model_latency_ms: modelLatency,
        id: id,
      });
      setSubmittedURL(redirectUrl);
      form.setValue('prompt', prompt);
      form.setValue('url', redirectUrl);
    }
  }, [imageUrl, modelLatency, prompt, redirectUrl, id, form]);

  const generateClicklinkFromPrompt = (prompt: string) => {
    // Extract first few words from the prompt, or create a more refined name
    const words = prompt.split(" ").slice(0, 3).join("-");
    return words.toLowerCase().replace(/[\W_]+/g, "-");
  };

  const handleSubmit = useCallback(
    async (values: GenerateFormValues) => {
      if (isLoading) return; // Prevent form submission if already loading

      setIsLoading(true);
      setResponse(null);
      setSubmittedURL(values.url);
  
      // Generate clicklink here before setting the data state
      const generatedClicklink = generateClicklinkFromPrompt(values.prompt);
  
      // Update the data state with generated clicklink and other values
      setData((prevData) => ({
        ...prevData,
        url: values.url,
        clicklink: generatedClicklink,  // Set generated clicklink here
        description: values.prompt,
      }));
  
      try {
        const request: TokGenerateRequest = {
          clicklink: generatedClicklink, // Use the generated clicklink here
          url: values.url,
          prompt: values.prompt,
        };
  
        const response = await fetch('/api/generate_tok', {
          method: 'POST',
          body: JSON.stringify(request),
        });
  
        if (!response.ok) {
          const text = await response.text();
          if (response.status === 500) {
            toast.error('Click link already exists.');
          } else {
            throw new Error(`Failed to generate QR Experience: ${response.status}, ${text}`);
          }
          return;
        }
  
        const data = await response.json();
        va.track('Generated QR Experience', { prompt: values.prompt });
        router.push(`/create/${data.id}`);
      } catch (error) {
        va.track('Failed to generate', { prompt: values.prompt });
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, router] // Include isLoading as a dependency
  );


  const handleSaveExperience = async () => {
    // Immediately set loading state to true
    setIsLoading(true);
  
    try {
      // Generate a unique clicklink as soon as the user starts the save process
      let uniqueClicklink = `${data.clicklink}-${Math.floor(Math.random() * 10000)}`;
  
      // Check if the generated clicklink is unique
      let isUnique = await checkClicklinkUnique(uniqueClicklink);
  
      // Retry once if the clicklink is not unique
      if (!isUnique) {
        uniqueClicklink = `${data.clicklink}-${Math.floor(Math.random() * 10000)}`;
        isUnique = await checkClicklinkUnique(uniqueClicklink);
      }
  
      // If still not unique after retry, show an error and exit
      if (!isUnique) {
        toast.error('Click link still not unique after retrying.');
        return; // Exit early if clicklink is not unique after retrying
      }
  
      // Update the data with the new unique clicklink
      setData((prevData) => ({
        ...prevData,
        clicklink: uniqueClicklink,
      }));
  
      const formData = new FormData();
      formData.append('name', data.clicklink);
      formData.append('subdomain', data.clicklink.toLowerCase().trim().replace(/[\W_]+/g, "-"));
      formData.append('description', data.description);
      formData.append('image', data.image);
      formData.append('clicklink', data.clicklink);
      formData.append('livestreamVideoUrl', data.livestreamVideoUrl);
      formData.append('QrUrl', data.QrUrl);
      formData.append('url', data.url);
  
      // Proceed with API call to save experience
      const res = await createExperience(formData);
  
      if ('error' in res) {
        await createExperience(formData);
        // toast.error(res.error);
      } else {
        va.track("Created QR");
        const { id } = res;
        router.refresh();
        router.push(`/site/${id}/settings/analytics`);
        window.location.href = `https://app.qrexperiences.com`;
      }
    } catch (error) {
      console.error('Failed to create site:', error);
      toast.error('Failed to create site');
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div className="flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="md:mt-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div className="col-span-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>QR Experience Destination</FormLabel>
                      <FormControl>
                        <Input placeholder="qrexperiences.com" {...field} />
                      </FormControl>
                      <FormDescription>This is the URL the QR will link to by default. You can update this later!</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Prompt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="An action shot of a vibrant golf course in Fort Lauderdale with an energetic rock-and-roll vibe by the oceanfront"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>This is a sample QR Experience Image Prompt.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center max-w-[200px] mx-auto w-full text-black"
                >
                  {isLoading ? <LoadingDots color="black" /> : response ? '✨ Regenerate' : 'Create Experience'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="col-span-1">
          {submittedURL && response && (
            <>
              <h1 className="text-3xl font-bold sm:mb-5 mb-5 mt-5 sm:mt-0 sm:text-center text-left">Your QR Experience</h1>
              <div>
                <QrCard imageURL={response.image_url} time={(response.model_latency_ms / 1000).toFixed(2)} />
                <div className="flex flex-wrap justify-center gap-5 mt-4">
                  <Button onClick={handleSaveExperience}>Save Experience</Button>
                  <Button variant="outline" onClick={() => downloadQrCode(response.image_url, 'qrCode')}>
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

export default BodyTok;
