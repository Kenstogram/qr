import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ensure prisma client is set up
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clicklink = searchParams.get("clicklink");

    if (!clicklink) {
      return NextResponse.json({ error: "clicklink parameter is required" }, { status: 400 });
    }

    // Step 1: Fetch the site by clicklink to get the siteId
    const site = await prisma.site.findUnique({
      where: {
        clicklink: clicklink, // Find site by clicklink
      },
    });

    if (!site) {
      return NextResponse.json({ error: "Site not found for the provided clicklink" }, { status: 404 });
    }

    const siteId = site.id; // Get the siteId from the site

    // Step 2: Fetch form submissions for the found siteId
    const submissions = await prisma.siteFormSubmission.findMany({
      where: {
        siteId: siteId, // Filter submissions by the siteId
      },
      orderBy: {
        createdAt: "desc", // Optional: Order by the most recent submissions first
      },
    });

    // Return the form submissions as JSON
    return NextResponse.json(submissions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred while fetching submissions" }, { status: 500 });
  }
}
