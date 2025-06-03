import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, description } = await request.json();
    if (!amount || !description) {
      return NextResponse.json({ error: 'Missing amount or description' }, { status: 400 });
    }

    // Dynamically import Stripe and initialize with env var
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json({ error: 'Missing STRIPE_SECRET_KEY environment variable' }, { status: 500 });
    }
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2022-11-15' });

    // Create a price object
    const price = await stripe.prices.create({
      currency: 'usd',
      product_data: { name: description },
      unit_amount: Math.round(amount * 100),
    });

    // Create a payment link
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [{ price: price.id, quantity: 1 }],
    });

    return NextResponse.json({ url: paymentLink.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Stripe error' }, { status: 500 });
  }
} 