import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEstimateEmail } from '@/lib/email';

export async function PUT(
  request: Request,
  context: unknown
) {
  const { params } = context as { params: { id: string } };
  try {
    const { estimatedAmount, status } = await request.json();

    const updatedEstimate = await prisma.estimate.update({
      where: {
        id: params.id,
      },
      data: {
        estimatedAmount,
        status,
      },
      include: {
        customer: true,
      },
    });

    // If status is ESTIMATE_SENT, send email (no payment link)
    if (status === 'ESTIMATE_SENT') {
      await sendEstimateEmail({
        to: updatedEstimate.customer.email,
        serviceType: updatedEstimate.serviceType,
        preferredDate: updatedEstimate.preferredDate,
        preferredTime: updatedEstimate.preferredTime,
        estimatedAmount: updatedEstimate.estimatedAmount ?? 0,
        additionalInfo: updatedEstimate.additionalInfo ?? '',
        confirmationToken: updatedEstimate.confirmationToken ?? '',
      });
    }

    return NextResponse.json(updatedEstimate);
  } catch (error) {
    console.error('Error updating estimate:', error);
    return NextResponse.json(
      { error: 'Failed to update estimate' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  context: unknown
) {
  const { params } = context as { params: { id: string } };
  try {
    const estimate = await prisma.estimate.findUnique({
      where: { id: params.id },
    });
    if (!estimate) {
      return NextResponse.json({ error: 'Estimate not found' }, { status: 404 });
    }
    return NextResponse.json(estimate);
  } catch (error) {
    console.error('Error fetching estimate:', error);
    return NextResponse.json(
      { error: 'Failed to fetch estimate' },
      { status: 500 }
    );
  }
} 