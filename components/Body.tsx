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
import { QrGenerateRequest, QrGenerateResponse } from '@/utils/service';
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

// Zod schema with async refinement for unique clicklink validation
const generateFormSchema = z.object({
  clicklink: z.string().min(1, 'Clicklink is required').refine(async (value) => {
    const isUnique = await checkClicklinkUnique(value);  // Async check
    return isUnique;
  }, {
    message: 'This QR is already taken, please choose another one.',
  }),
  url: z.string().min(1, 'URL is required'),
  prompt: z.string().min(3, 'Prompt must be at least 3 characters').max(160, 'Prompt cannot exceed 160 characters'),
});

type GenerateFormValues = z.infer<typeof generateFormSchema>;

const Body = ({
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
  const [response, setResponse] = useState<QrGenerateResponse | null>(null);
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
      clicklink: '',
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
      form.setValue('clicklink', clicklink);
      form.setValue('prompt', prompt);
      form.setValue('url', redirectUrl);
    }
  }, [imageUrl, modelLatency, prompt, redirectUrl, id, form]);

  const handleSubmit = useCallback(
    async (values: GenerateFormValues) => {
      setIsLoading(true);
      setResponse(null);
      setSubmittedURL(values.url);
  
      // Set the values to the data state, ensuring `url` is included
      setData((prevData) => ({
        ...prevData,
        url: values.url, // Make sure the URL is included in the data
        clicklink: values.clicklink,
        description: values.prompt,
      }));
  
      try {
        const request: QrGenerateRequest = {
          clicklink: values.clicklink,
          url: values.url,
          prompt: values.prompt,
        };
  
        const response = await fetch('/api/generate_qr', {
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
    [router],
  );

  const handleSaveExperience = async () => {
    // First, check if the clicklink is unique
    const isUnique = await checkClicklinkUnique(data.clicklink);
  
    if (!isUnique) {
      toast.error('This clicklink is already taken, please choose another one.');
      return; // Don't proceed with saving if clicklink is not unique
    }
  
    try {
      // Proceed with saving experience
      const formData = new FormData();
      formData.append('name', data.clicklink);
      formData.append('subdomain', data.clicklink.toLowerCase().trim().replace(/[\W_]+/g, "-"));
      formData.append('description', data.description);
      formData.append('image', data.image);
      formData.append('clicklink', data.clicklink);
      formData.append('livestreamVideoUrl', data.livestreamVideoUrl);
      formData.append('QrUrl', data.QrUrl);
      formData.append('url', data.url);
  
      const res = await createExperience(formData);
  
      if ('error' in res) {
        toast.error(res.error);
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
    }
  };
  

  return (
    <div className="flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="md:mt-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div className="col-span-1">
          {/* <h1 className="text-xl font-bold mb-2">Create QR Experience</h1> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="clicklink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>QR Experience Name</FormLabel>
                    <FormControl>
                      <Input placeholder="flowers" {...field} />
                    </FormControl>
                    <FormDescription>This is the name for the QR Experience.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <FormLabel>QR Image Prompt</FormLabel>
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

export default Body;