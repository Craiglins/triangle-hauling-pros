import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
// import type { EstimateGetPayload, EstimateUpdateInput } from '@prisma/client';

// type EstimateWithCustomer = EstimateGetPayload<{
//   include: { customer: true }
// }>;

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const { preferredDate, preferredTime, paymentMethod } = await request.json();

    // Generate a new confirmation token for any future updates
    const confirmationToken = uuidv4();

    // Update the estimate with the confirmed details
    const updatedEstimate = await prisma.estimate.update({
      where: { id: id },
      data: {
        status: 'CONFIRMED',
        preferredDate: new Date(preferredDate),
        preferredTime,
        paymentMethod,
        confirmationToken,
      },
      include: {
        customer: true,
      },
    });

    // Send final confirmation email with Stripe link if needed
    let paymentLink: string | undefined = undefined;
    if (
      updatedEstimate.estimatedAmount &&
      (updatedEstimate.paymentMethod === 'CREDIT_CARD' || updatedEstimate.paymentMethod === 'DEBIT_CARD')
    ) {
      const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeSecretKey) {
        throw new Error('Missing STRIPE_SECRET_KEY environment variable');
      }
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe(stripeSecretKey, { apiVersion: '2022-11-15' });
      const amountCents = Math.round(Number(updatedEstimate.estimatedAmount) * 100);
      const price = await stripe.prices.create({
        currency: 'usd',
        product_data: { name: updatedEstimate.serviceType },
        unit_amount: amountCents,
      });
      const paymentLinkObj = await stripe.paymentLinks.create({
        line_items: [{ price: price.id, quantity: 1 }],
      });
      paymentLink = paymentLinkObj.url;
    }
    const { sendAppointmentConfirmationEmail } = await import('@/lib/email');
    await sendAppointmentConfirmationEmail({
      to: updatedEstimate.email,
      serviceType: updatedEstimate.serviceType,
      preferredDate: updatedEstimate.preferredDate,
      preferredTime: updatedEstimate.preferredTime,
      estimatedAmount: Number(updatedEstimate.estimatedAmount || 0),
      additionalInfo: updatedEstimate.additionalInfo ?? '',
      paymentMethod: updatedEstimate.paymentMethod,
      estimateId: updatedEstimate.id,
      paymentLink,
    });

    return NextResponse.json({ success: true, estimate: updatedEstimate });
  } catch (error) {
    console.error('Error confirming estimate:', error);
    return NextResponse.json(
      { error: 'Failed to confirm estimate' },
      { status: 500 }
    );
  }
} 