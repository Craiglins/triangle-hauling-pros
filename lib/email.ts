import nodemailer from 'nodemailer';

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function sendEstimateEmail({
  to,
  serviceType,
  preferredDate,
  preferredTime,
  estimatedAmount,
  additionalInfo,
  confirmationToken,
}: {
  to: string;
  serviceType: string;
  preferredDate: Date;
  preferredTime: string;
  estimatedAmount: number;
  additionalInfo?: string | null;
  confirmationToken: string;
}) {
  console.log('EMAIL FUNCTION RECEIVED TOKEN:', confirmationToken);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Your Estimate for ${serviceType} - Action Required`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #5DB7E0; text-align: center; margin-bottom: 30px;">Your Estimate from Triangle Hauling Pros</h1>
        
        <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #333; margin-top: 0; margin-bottom: 20px;">Estimate Details</h2>
          
          <div style="margin-bottom: 15px;">
            <p style="margin: 5px 0;"><strong>Service Type:</strong> ${serviceType}</p>
            <p style="margin: 5px 0;"><strong>Preferred Date:</strong> ${new Date(preferredDate).toLocaleDateString()}</p>
            <p style="margin: 5px 0;"><strong>Preferred Time:</strong> ${preferredTime}</p>
            <p style="margin: 5px 0;"><strong>Estimated Amount:</strong> $${estimatedAmount.toFixed(2)}</p>
            ${additionalInfo ? `<p style="margin: 5px 0;"><strong>Additional Information:</strong> ${additionalInfo}</p>` : ''}
          </div>
        </div>

        <div style="background-color: #f0f9ff; padding: 25px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
          <h2 style="color: #2563eb; margin-top: 0; margin-bottom: 15px;">Confirm Your Appointment</h2>
          <p style="color: #1e40af; margin-bottom: 20px;">
            Please review your estimate details above. To proceed with your service, click the button below to confirm your appointment.
            You'll be able to review and update your preferred date and time if needed.
          </p>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/confirm-appointment/${confirmationToken}" 
             style="background-color: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px;">
            Confirm Your Appointment
          </a>
          <p style="margin-top: 15px; color: #666; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <span style="color: #2563eb;">${process.env.NEXT_PUBLIC_BASE_URL}/confirm-appointment/${confirmationToken}</span>
          </p>
        </div>

        <div style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;">
          <p>If you have any questions or need to make changes to your estimate, please reply to this email or call us at (555) 123-4567.</p>
          <p style="margin-top: 20px;">
            Best regards,<br>
            Triangle Hauling Pros Team
          </p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendAdminEstimateNotification({
  serviceType,
  preferredDate,
  preferredTime,
  estimatedAmount,
  additionalInfo,
  customerName,
  customerEmail,
  customerPhone,
  customerAddress,
}: {
  serviceType: string;
  preferredDate: Date;
  preferredTime: string;
  estimatedAmount: number;
  additionalInfo?: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
}) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'support@trianglehaulingpros.com',
    subject: `New Estimate Request for ${serviceType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #5DB7E0; text-align: center; margin-bottom: 30px;">New Estimate Request</h1>
        
        <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #333; margin-top: 0; margin-bottom: 20px;">Customer Details</h2>
          <div style="margin-bottom: 15px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${customerName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${customerEmail}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${customerPhone}</p>
            <p style="margin: 5px 0;"><strong>Address:</strong> ${customerAddress}</p>
          </div>
        </div>

        <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #333; margin-top: 0; margin-bottom: 20px;">Service Details</h2>
          <div style="margin-bottom: 15px;">
            <p style="margin: 5px 0;"><strong>Service Type:</strong> ${serviceType}</p>
            <p style="margin: 5px 0;"><strong>Preferred Date:</strong> ${new Date(preferredDate).toLocaleDateString()}</p>
            <p style="margin: 5px 0;"><strong>Preferred Time:</strong> ${preferredTime}</p>
            <p style="margin: 5px 0;"><strong>Estimated Amount:</strong> $${estimatedAmount.toFixed(2)}</p>
            ${additionalInfo ? `<p style="margin: 5px 0;"><strong>Additional Information:</strong> ${additionalInfo}</p>` : ''}
          </div>
        </div>

        <div style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;">
          <p>Please review this estimate in the admin dashboard and send the final estimate to the customer.</p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    throw error;
  }
}

export async function sendAppointmentConfirmationEmail({
  to,
  serviceType,
  preferredDate,
  preferredTime,
  estimatedAmount,
  additionalInfo,
  paymentMethod,
  paymentLink,
}: {
  to: string;
  serviceType: string;
  preferredDate: Date;
  preferredTime: string;
  estimatedAmount: number;
  additionalInfo: string;
  paymentMethod: string;
  paymentLink?: string;
}) {
  let paymentSection = '';

  if (paymentLink) {
    paymentSection = `
      <div style="background-color: #f0f9ff; padding: 25px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
        <h2 style="color: #2563eb; margin-top: 0; margin-bottom: 15px;">Complete Your Payment</h2>
        <p style="color: #1e40af; margin-bottom: 20px;">
          Please click the button below to complete your payment securely through Stripe.
        </p>
        <a href="${paymentLink}" 
           style="background-color: #635BFF; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px;">
          Pay Now
        </a>
        <p style="margin-top: 15px; color: #666; font-size: 14px;">
          If the button doesn't work, copy and paste this link into your browser:<br>
          <span style="color: #2563eb;">${paymentLink}</span>
        </p>
      </div>
    `;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Appointment Confirmed - ${serviceType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4CAF50; font-size: 28px; margin-bottom: 10px;">Appointment Confirmed!</h1>
          <p style="color: #666; font-size: 16px;">We're looking forward to serving you.</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #333; margin-top: 0; margin-bottom: 20px;">Appointment Details</h2>
          
          <div style="margin-bottom: 15px;">
            <p style="margin: 5px 0;"><strong>Service Type:</strong> ${serviceType}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(preferredDate).toLocaleDateString()}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${preferredTime}</p>
            <p style="margin: 5px 0;"><strong>Estimated Amount:</strong> $${estimatedAmount.toFixed(2)}</p>
            <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${paymentMethod.replace('_', ' ')}</p>
            ${additionalInfo ? `<p style="margin: 5px 0;"><strong>Additional Information:</strong> ${additionalInfo}</p>` : ''}
          </div>
        </div>

        <div style="background-color: #e8f5e9; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #2e7d32; margin-top: 0; margin-bottom: 15px;">What to Expect</h2>
          <p style="color: #1b5e20; margin-bottom: 15px;">
            Our team will arrive at your location during the scheduled time slot. Please ensure that:
          </p>
          <ul style="color: #1b5e20; margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">The items to be serviced are easily accessible</li>
            <li style="margin-bottom: 8px;">Someone is available to provide access</li>
            <li style="margin-bottom: 8px;">The area is clear for our team to work</li>
          </ul>
        </div>

        ${paymentSection}

        <div style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;">
          <p>If you need to make any changes to your appointment, please contact us as soon as possible.</p>
          <p style="margin-top: 20px;">
            Best regards,<br>
            Triangle Hauling Pros Team
          </p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
} 