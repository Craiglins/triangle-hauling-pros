import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteContext = {
  params: {
    token: string;
  };
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const estimate = await prisma.estimate.findFirst({
      where: {
        confirmationToken: context.params.token,
      },
      include: {
        customer: true,
      },
    });

    if (!estimate) {
      return NextResponse.json(
        { error: 'Estimate not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(estimate);
  } catch (error) {
    console.error('Error fetching estimate by token:', error);
    return NextResponse.json(
      { error: 'Failed to fetch estimate' },
      { status: 500 }
    );
  }
} 