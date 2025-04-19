import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Make sure prisma client is set up

// Utility function to check if a string is a valid UUID
const isValidUUID = (uuid: string) => {
  const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return regex.test(uuid);
};

export async function POST(req: NextRequest) {
  try {
    const { userId, siteId } = await req.json();

    // Check if userId and siteId are provided and valid UUIDs
    if (!userId || !siteId) {
      return NextResponse.json({ message: 'User ID and Site ID are required.' }, { status: 400 });
    }

    if (!isValidUUID(userId)) {
      return NextResponse.json({ message: 'Invalid User ID format.' }, { status: 400 });
    }

    if (!isValidUUID(siteId)) {
      return NextResponse.json({ message: 'Invalid Site ID format.' }, { status: 400 });
    }

    // Check if the site and user exist in parallel to optimize the query
    const [site, user] = await Promise.all([
      prisma.site.findUnique({ where: { id: siteId } }),
      prisma.user.findUnique({ where: { id: userId } }),
    ]);

    if (!site) {
      return NextResponse.json({ message: 'Site not found.' }, { status: 404 });
    }

    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    // Use Prisma transaction for better consistency
    const result = await prisma.$transaction(async (tx) => {
      const existingLike = await tx.like.findUnique({
        where: {
          userId_siteId: {
            userId,
            siteId,
          },
        },
      });

      let updatedLikeCount: number;

      if (existingLike) {
        // Remove the like if it exists
        await tx.like.delete({
          where: {
            userId_siteId: {
              userId,
              siteId,
            },
          },
        });
        // Get the updated like count after removing the like
        updatedLikeCount = await tx.like.count({
          where: { siteId },
        });

        return {
          message: 'Unliked successfully.',
          updatedLikeCount,
        };
      } else {
        // Add the like if it doesn't exist
        await tx.like.create({
          data: {
            userId,
            siteId,
          },
        });
        // Get the updated like count after adding the like
        updatedLikeCount = await tx.like.count({
          where: { siteId },
        });

        return {
          message: 'Liked successfully.',
          updatedLikeCount,
        };
      }
    });

    // Return the response after the transaction completes
    return NextResponse.json({
      message: result.message,
      likeCount: result.updatedLikeCount, // Return the updated like count
    });

  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { message: 'Internal Server Error: Unable to toggle like' },
      { status: 500 }
    );
  }
}
