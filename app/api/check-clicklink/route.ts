import prisma from '@/lib/prisma'; // Adjust path to your prisma instance

export async function GET(req: Request) {
  const url = new URL(req.url); // Get the URL for the current request
  const clicklink = url.searchParams.get('clicklink'); // Extract clicklink from query params

  if (!clicklink || typeof clicklink !== 'string') {
    return new Response(
      JSON.stringify({ error: 'Clicklink is required' }),
      { status: 400 }
    );
  }

  try {
    // Check if the clicklink already exists in the database using findFirst
    const existingClicklink = await prisma.site.findFirst({
      where: {
        clicklink: clicklink.toLowerCase().trim(),
      },
    });

    if (existingClicklink) {
      // If a record exists, return false for uniqueness
      return new Response(
        JSON.stringify({ isUnique: false }),
        { status: 200 }
      );
    }

    // If no record exists, the clicklink is unique
    return new Response(
      JSON.stringify({ isUnique: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking clicklink uniqueness:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
