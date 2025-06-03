console.log('==== ENTERED /api/admin/estimates/[id]/send ROUTE ====');
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEstimateEmail } from '@/lib/email';
import { v4 as uuidv4 } from 'uuid';
// import { Prisma } from '@prisma/client';

interface EstimateWithCustomer {
  id: string;
  customerId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  preferredDate: Date;
  preferredTime: string;
  paymentMethod: string;
  additionalInfo: string | null;
  status: string;
  estimatedAmount: number | null;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  stripeInvoiceId: string | null;
  paymentStatus: string;
  analysis: string | null;
  paymentToken: string | null;
  confirmationToken: string | null;
  customer: {
    id: string;
    customerId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export async function POST(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const estimate = await prisma.estimate.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
      },
    }) as EstimateWithCustomer | null;

    console.log('Fetched estimate:', estimate);

    if (!estimate) {
      return NextResponse.json(
        { error: 'Estimate not found' },
        { status: 404 }
      );
    }

    // Always generate a new confirmation token if missing or invalid
    const confirmationToken = estimate.confirmationToken && estimate.confirmationToken !== 'null'
      ? estimate.confirmationToken
      : uuidv4();

    console.log('About to update with confirmationToken:', confirmationToken);

    await prisma.estimate.update({
      where: {
        id,
      },
      data: {
        confirmationToken,
        status: 'ESTIMATE_SENT',
      },
      include: {
        customer: true,
      },
    });

    // Fetch the estimate again to ensure confirmationToken is present
    const freshEstimate = await prisma.estimate.findUnique({
      where: { id },
      include: { customer: true },
    }) as EstimateWithCustomer;

    console.log('Fresh estimate after update:', freshEstimate);
    console.log('Fresh confirmationToken:', freshEstimate.confirmationToken);

    await sendEstimateEmail({
      to: freshEstimate.customer.email,
      serviceType: freshEstimate.serviceType,
      preferredDate: freshEstimate.preferredDate,
      preferredTime: freshEstimate.preferredTime,
      estimatedAmount: freshEstimate.estimatedAmount ?? 0,
      additionalInfo: freshEstimate.additionalInfo ?? '',
      confirmationToken: freshEstimate.confirmationToken ?? '',
    });

    return NextResponse.json(freshEstimate);
  } catch (error) {
    console.error('Error sending estimate:', error);
    return NextResponse.json(
      { error: 'Failed to send estimate' },
      { status: 500 }
    );
  }
} 