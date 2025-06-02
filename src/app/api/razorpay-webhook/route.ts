import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = headers().get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json(
        { success: false, message: "No signature found" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);

    // Handle different webhook events
    switch (event.event) {
      case 'payment.authorized':
        // Payment was authorized
        await handlePaymentAuthorized(event.payload.payment.entity);
        break;

      case 'payment.captured':
        // Payment was captured
        await handlePaymentCaptured(event.payload.payment.entity);
        break;

      case 'payment.failed':
        // Payment failed
        await handlePaymentFailed(event.payload.payment.entity);
        break;

      default:
        console.log('Unhandled event:', event.event);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { success: false, message: "Error processing webhook" },
      { status: 500 }
    );
  }
}

async function handlePaymentAuthorized(payment: any) {
  try {
    // Update order status in your database
    await fetch('/api/orders/update-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: payment.order_id,
        status: 'payment_authorized',
        paymentId: payment.id,
      }),
    });
  } catch (error) {
    console.error('Error handling payment authorized:', error);
  }
}

async function handlePaymentCaptured(payment: any) {
  try {
    // Update order status in your database
    await fetch('/api/orders/update-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: payment.order_id,
        status: 'payment_captured',
        paymentId: payment.id,
      }),
    });
  } catch (error) {
    console.error('Error handling payment captured:', error);
  }
}

async function handlePaymentFailed(payment: any) {
  try {
    // Update order status in your database
    await fetch('/api/orders/update-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: payment.order_id,
        status: 'payment_failed',
        paymentId: payment.id,
        errorCode: payment.error_code,
        errorDescription: payment.error_description,
      }),
    });
  } catch (error) {
    console.error('Error handling payment failed:', error);
  }
} 