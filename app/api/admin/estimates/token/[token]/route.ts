import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, context: unknown) {
  const { params } = context as { params: { token: string } };
  const { token } = params;
  const estimate = await prisma.estimate.findFirst({
    where: {
      confirmationToken: token,
    },
  });

  if (!estimate) {
    return NextResponse.json({ error: 'Estimate not found' }, { status: 404 });
  }

  return NextResponse.json(estimate);
} 