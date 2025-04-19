import { OpenAI } from "openai"; // Import OpenAI library

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set
});

// Function to generate content for the selected platform or as a news article
const generatePostForPlatform = async (description: string, platform: string, clicklink: string) => {
  const platformPrompts: Record<string, string> = {
    // Meta platform (Facebook/Instagram)
    Meta: `Generate a professional, SEO-optimized post for Meta (Facebook/Instagram) with hashtags for the following subject: "${description}". Keep the character count under 250 characters. Include the link: "https://go.qrexperiences.com/${clicklink}",`,

    // X (formerly Twitter)
    X: `Generate a short and catchy, SEO-optimized X post with hashtags for the following subject: "${description}". Keep the character count under 280 characters. Include the link: "https://go.qrexperiences.com/${clicklink}",`,

    // Bluesky
    Bluesky: `Generate a short and catchy, SEO-optimized post for Bluesky with hashtags for the following subject: "${description}". Keep the character count under 300 characters. Include the link: "https://go.qrexperiences.com/${clicklink}",`,

    // LinkedIn
    LinkedIn: `Generate a professional, SEO-optimized LinkedIn post for the following subject: "${description}". Keep it under 700 characters. Include the link: "https://go.qrexperiences.com/${clicklink}",`,

    // News Article
    NewsArticle: `Generate a 1000-word promotional news article about "${description}". The article should be engaging, informative, and well-written. Make sure it provides value, is SEO-optimized, and includes the link: "https://go.qrexperiences.com/${clicklink}".`,
  };

  // Ensure the platform is valid and has a prompt defined
  const prompt = platformPrompts[platform];

  if (!prompt) {
    throw new Error(`Platform ${platform} is not supported.`);
  }

  // Fetch the AI response
  const aiResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  // Return the generated content (post or article)
  return aiResponse.choices[0]?.message?.content || "";
};

// Define the POST request handler
export async function POST(req: Request) {
  const { description, platform, clicklink } = await req.json();

  if (!description || !platform || !clicklink) {
    return new Response(
      JSON.stringify({ error: "Description, platform, and clicklink are required" }),
      { status: 400 }
    );
  }

  try {
    const generatedContent = await generatePostForPlatform(description, platform, clicklink);
    return new Response(JSON.stringify({ content: generatedContent }), { status: 200 });
  } catch (error) {
    console.error("Error generating content:", error);
    return new Response(JSON.stringify({ error: "Failed to generate content" }), { status: 500 });
  }
}
