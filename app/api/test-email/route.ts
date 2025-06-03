import { NextResponse } from 'next/server';
import { sendEstimateEmail } from '@/lib/email';

export async function GET() {
  try {
    await sendEstimateEmail({
      to: process.env.EMAIL_USER!,
      serviceType: 'Test Service',
      preferredDate: new Date(),
      preferredTime: 'Morning (8AM-12PM)',
      estimatedAmount: 123.45,
      additionalInfo: '',
      confirmationToken: 'test-token-123',
    });
    return NextResponse.json({ success: true, message: 'Test email sent!' });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
} 