import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure Prisma is set up correctly in lib/prisma.ts

export async function POST(req: Request) {
  try {
    const { siteId, name, email, phone, message } = await req.json();

    // Check if all required fields are provided
    if (!siteId || !name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create a new SiteFormSubmission record in Prisma
    const submission = await prisma.siteFormSubmission.create({
      data: {
        siteId,
        name,
        email,
        phone,
        message,
      },
    });

    // Respond with success
    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error('Error creating form submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
