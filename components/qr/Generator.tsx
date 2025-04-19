"use client";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCallback, useState } from 'react';
import { QrGenerateRequest, QrGenerateResponse } from '@/utils/service';
import { QrCard } from '@/components/qr/QrCard';
import LoadingDots from '@/components/ui/loadingdots';
import downloadQrCode from '@/utils/downloadQrCode';
import va from '@vercel/analytics';
import { PromptSuggestion } from '@/components/qr/PromptSuggestion';
import { toast, Toaster } from 'react-hot-toast';
import { Textarea } from '@/components/ui/textarea';

const promptSuggestions = [
  'Blooming Flowers on a Golf Course',
  'A Florida Beach',
  'Iguanas on a Rock',
  'Fireworks in the Mountains',
];

const generateFormSchema = z.object({
  clicklink: z.string().min(1),
  prompt: z.string().min(3).max(160),
});

type GenerateFormValues = z.infer<typeof generateFormSchema>;

const Generator = ({
  clicklink,
  imageUrl,
  modelLatency,
  id,
}: {
  clicklink?: string;
  imageUrl?: string;
  modelLatency?: number;
  id?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<QrGenerateResponse | null>(null);
  const [submittedURL, setSubmittedURL] = useState<string | null>(null);

  const form = useForm<GenerateFormValues>({
    resolver: zodResolver(generateFormSchema),
    mode: 'onChange',
    defaultValues: {
      clicklink: clicklink || '', // Set the initial value for clicklink
      prompt: '',
    },
  });

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      form.setValue('prompt', suggestion);
    },
    [form],
  );

  const handleSubmit = useCallback(
    async (values: GenerateFormValues) => {
      setIsLoading(true);
      setResponse(null);
      setSubmittedURL(values.clicklink);

      try {
        const request: QrGenerateRequest = {
          clicklink: values.clicklink,
          url: values.clicklink,
          prompt: values.prompt,
        };
        const response = await fetch('/api/generate_qr', {
          method: 'POST',
          body: JSON.stringify(request),
        });

        if (!response.ok || response.status !== 200) {
          const text = await response.text();
          throw new Error(`Failed to generate QR Experience: ${response.status}, ${text}`);
        }

        const data = await response.json();

        va.track('Generated QR Experience', {
          prompt: values.prompt,
        });

        setResponse(data);
      } catch (error) {
        va.track('Failed to generate', {
          prompt: values.prompt,
        });
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return (
  <div className="rounded-lg border border-stone-200 bg-white dark:border-white dark:bg-black">
    <div className="flex justify-center items-center flex-col w-full p-6 sm:mb-28 mb-0">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-6">
        <div className="col-span-1">
          <h1 className="text-lg font-bold mb-6 text-black dark:text-white">Create QR Experience with AI Generated Background Image</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-4 text-black dark:text-white">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image Prompt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Blooming Flowers on a Golf Course"
                          className="resize-none text-black"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="">
                        This is what the image in your QR Experience will look like.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <div className="my-2">
                  <p className="text-sm font-medium mb-3">Prompt suggestions</p>
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 text-center text-black text-sm">
                    {promptSuggestions.map((suggestion) => (
                      <PromptSuggestion
                        key={suggestion}
                        suggestion={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)} 
                        isLoading={isLoading}
                      />
                    ))}
                  </div>
                </div> */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center max-w-[200px] mx-auto w-full bg-black text-white border-2 border-stone-700"
                >
                  {isLoading ? <LoadingDots color="black" /> : response ? '✨ Regenerate' : 'Generate'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="col-span-1">
          {submittedURL && (
            <>
              <h1 className="text-xl font-bold sm:mb-5 mb-5 mt-5 sm:mt-0 sm:text-center text-left text-black dark:text-white">AI Inspired QR Experience</h1>
              <div>
                <div className="flex flex-col justify-center relative h-auto items-center">
                  {response ? (
                    <QrCard 
                      imageURL={response.image_url} 
                      time={(response.model_latency_ms / 1000).toFixed(2)}
                      clicklink={form.getValues('clicklink')}
                    />
                  ) : (
                    <div className="relative flex flex-col justify-center items-center gap-y-2 w-[510px] border border-gray-300 rounded shadow group p-2 mx-auto animate-pulse bg-gray-400 aspect-square max-w-full" />
                  )}
                </div>
                {response && (
                  <div className="flex flex-wrap justify-center gap-5 mt-4">
                    <Button
                      className="text-white bg-black"
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(submittedURL);
                        toast.success('Analytics link copied to clipboard');
                      }}
                    >
                      Copy Analytics Link
                    </Button>
                    <Button
                    className="text-white bg-black"
                      variant="outline"
                      onClick={() => {
                        const encodedQueryString = encodeURIComponent(response.image_url);
                        const fullImageUrl = `https://qrexperiences.com/_next/image?url=${encodedQueryString}&w=1080&q=75`;
                        navigator.clipboard.writeText(fullImageUrl);
                        toast.success('Image URL copied to clipboard');
                      }}
                    >
                      Copy Image URL
                    </Button>
                    <Button 
                      className="text-white bg-black"
                      variant="outline"
                      onClick={() => downloadQrCode(response.image_url, 'qrCode')}
                    >
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  </div>
  );
};

export default Generator;
