"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, Title } from "@tremor/react";
import { toast, Toaster } from "react-hot-toast"; // Import toast for notifications

const SocialMediaPostGenerator = ({
  description,
  clicklink, // Accept clicklink prop
}: {
  description: string;
  clicklink: string; // Define clicklink as a string
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("X");
  const [generatedPost, setGeneratedPost] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlatform(event.target.value);
  };

  const handleGeneratePost = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-social-media-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          platform: selectedPlatform,
          clicklink: clicklink, // Pass clicklink in the request body
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate post");
      }

      const data = await response.json();
      console.log("Generated post data:", data); // Debug log for response
      setGeneratedPost(data.content); // Use 'content' to support both posts and articles
    } catch (error) {
      console.error("Error generating post:", error);
      setGeneratedPost("Failed to generate post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle copying the generated post to clipboard
  const handleCopyClick = () => {
    if (generatedPost) {
      // Ensure the string is trimmed and clean
      const sanitizedPost = generatedPost.trim();

      // Use a unique ID to prevent stacking the same toast
      const toastId = "post-copied-toast";

      // Dismiss any existing toasts with the same ID before showing a new one
      toast.dismiss(toastId);

      // Write the sanitized post to the clipboard
      navigator.clipboard.writeText(sanitizedPost)
        .then(() => {
          toast.success("Post copied to clipboard!", { id: toastId }); // Show toast notification on success
        })
        .catch(() => {
          toast.error("Failed to copy post.", { id: toastId }); // Show toast notification on failure
        });
    }
  };

  return (
    <Card className="space-y-6 p-4">
      <Title>Generate Social Media Post</Title>

      {/* Platform Selection */}
      <div className="flex flex-col space-y-2">
        <p className="mt-2 text-sm leading-6 text-gray-900 dark:text-gray-50">
          Social Media Post Drafts are Generated using the QR Description. Update the Description to create a new Prompt.
        </p>
        <label className="font-medium">Select Social Media Platform</label>
        <select
          className="border p-2 rounded"
          value={selectedPlatform}
          onChange={handlePlatformChange}
        >
          <option value="X">X</option>
          <option value="Meta">Meta</option>
          <option value="Bluesky">Bluesky</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="NewsArticle">1000 Word News Article</option> {/* Added News Article Option */}
        </select>
      </div>

      {/* Generate Post Button */}
      <Button variant="outline" onClick={handleGeneratePost} disabled={loading}>
        {loading ? "Generating..." : "Generate Post or Article"}
      </Button>

      {/* Display Generated Post or Article */}
      {generatedPost && (
        <div className="mt-4">
          <h3 className="font-semibold">Generated Content:</h3>
          <Textarea
            className="resize-none h-48" // Set height to 12 rows (adjust as needed)
            value={generatedPost}
            readOnly
            rows={12} // Set a fixed number of rows, or make it flexible
          />

          {/* Copy Button */}
          <div className="mt-4 flex items-center justify-between">
            <Button variant="outline" onClick={handleCopyClick}>
              Copy Content
            </Button>
          </div>
        </div>
      )}

    </Card>
  );
};

export default SocialMediaPostGenerator;
