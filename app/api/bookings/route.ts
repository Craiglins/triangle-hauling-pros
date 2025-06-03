import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/prisma';
import { sendAdminEstimateNotification } from '@/lib/email';
import { stripe } from '@/lib/stripe';
// import { ServiceType, TimeSlot, PaymentMethod } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Generate a unique customer ID
    const customerId = uuidv4();

    // Create a new customer record
    const customer = await prisma.customer.create({
      data: {
        customerId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
    });
    
    let estimatedAmount = null;
    let status = 'PENDING';
    let analysis = '';
    let aiFailed = false;

    // If text description is provided, try to generate an automated estimate
    if (data.additionalInfo) {
      try {
        // Combine serviceType and additionalInfo for a better description
        const description = `${data.serviceType ? data.serviceType + ': ' : ''}${data.additionalInfo || ''}`;
        console.log('Attempting to generate estimate for description:', description);
        
        const analysisResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/estimates/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            textDescription: description,
          }),
        });

        if (!analysisResponse.ok) {
          throw new Error(`Estimate analysis failed with status: ${analysisResponse.status}`);
        }

        const analysisData = await analysisResponse.json();
        console.log('Received analysis data:', analysisData);

        if (analysisData.error) {
          throw new Error(analysisData.error);
        }

        analysis = analysisData.analysis;
        estimatedAmount = parseFloat(analysisData.estimatedAmount) || null;
        status = 'PENDING_ADMIN_REVIEW';
      } catch (error) {
        console.error('Error generating automated estimate:', error);
        aiFailed = true;
        status = 'PENDING_ADMIN_REVIEW';
        analysis = 'AI failed to generate an estimate. An admin will provide an estimate shortly.';
      }
    }

    // Generate a unique confirmation token for the estimate
    const confirmationToken = uuidv4();
    console.log('BOOKINGS: Generated confirmationToken:', confirmationToken);
    
    // Create a new estimate record linked to the customer
    const estimate = await prisma.estimate.create({
      data: {
        customerId: customer.customerId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        serviceType: data.serviceType,
        preferredDate: new Date(data.date),
        preferredTime: data.time,
        paymentMethod: data.paymentMethod,
        additionalInfo: data.additionalInfo,
        status,
        estimatedAmount,
        images: data.images || [], // Keep images for storage
        analysis,
        confirmationToken,
      },
    });
    console.log('BOOKINGS: Estimate after create:', estimate);

    // Send admin notification email
    if (estimatedAmount) {
      await sendAdminEstimateNotification({
        serviceType: estimate.serviceType,
        preferredDate: estimate.preferredDate,
        preferredTime: estimate.preferredTime,
        estimatedAmount: estimate.estimatedAmount ?? 0,
        additionalInfo: estimate.additionalInfo ?? '',
        customerName: estimate.name,
        customerEmail: estimate.email,
        customerPhone: estimate.phone,
        customerAddress: estimate.address,
      });
    }

    return NextResponse.json({
      success: true,
      customerId,
      estimateId: estimate.id,
      confirmationToken,
      message: aiFailed
        ? 'AI failed to generate an estimate. An admin will provide an estimate shortly.'
        : status === 'PENDING_ADMIN_REVIEW' 
          ? 'Booking request received and sent for admin review'
          : 'Booking request received successfully'
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

// export async function POSTStripe(request: Request) {
//   try {
//     const { amount, description } = await request.json();
//     if (!amount || !description) {
//       return NextResponse.json({ error: 'Missing amount or description' }, { status: 400 });
//     }
//
//     // Create a price object
//     const price = await stripe.prices.create({
//       currency: 'usd',
//       product_data: { name: description },
//       unit_amount: Math.round(amount * 100),
//     });
//
//     // Create a payment link
//     const paymentLink = await stripe.paymentLinks.create({
//       line_items: [{ price: price.id, quantity: 1 }],
//     });
//
//     return NextResponse.json({ url: paymentLink.url });
//   } catch (error) {
//     console.error('Stripe error:', error);
//     return NextResponse.json({ error: 'Stripe error' }, { status: 500 });
//   }
// } 