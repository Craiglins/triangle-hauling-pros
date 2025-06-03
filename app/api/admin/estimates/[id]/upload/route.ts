import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  context: unknown
) {
  const { params } = context as { params: { id: string } };
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No images provided' },
        { status: 400 }
      );
    }

    // Convert files to base64 strings
    const imagePromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      return `data:${file.type};base64,${buffer.toString('base64')}`;
    });

    const images = await Promise.all(imagePromises);

    // Update the estimate with the new images
    const updatedEstimate = await prisma.estimate.update({
      where: {
        id: params.id,
      },
      data: {
        images: {
          push: images,
        },
      },
      include: {
        customer: true,
      },
    });

    return NextResponse.json(updatedEstimate);
  } catch (error) {
    console.error('Error uploading images:', error);
    return NextResponse.json(
      { error: 'Failed to upload images' },
      { status: 500 }
    );
  }
} 