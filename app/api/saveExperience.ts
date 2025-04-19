import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { imageUrl } = req.body as { imageUrl: string }; // Type assertion

  try {
    const prisma = new PrismaClient();
    const newPost = await prisma.post.create({
      data: {
        title: 'Generated QR Experience',
        image: imageUrl,
        published: true,
      },
    });
    await prisma.$disconnect();
    return res.status(200).json({ message: 'Post created successfully', post: newPost });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
