import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || "private_MMmQCjQ1cAF/jO/hOoog1Fi6hxo=";
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || "public_k6bzOd7x0lsM6rWPSGpxbm01Z3E=";
    
    // Generate expire time (30 minutes from now)
    const expire = Math.floor(Date.now() / 1000) + 1800;
    
    // Generate token
    const token = crypto.randomBytes(16).toString('hex');
    
    // Generate signature
    const signature = crypto
      .createHmac('sha1', privateKey)
      .update(token + expire)
      .digest('hex');

    return NextResponse.json({
      signature,
      expire,
      token,
      publicKey,
    });
  } catch (error) {
    console.error('Error generating authentication:', error);
    return NextResponse.json(
      { error: 'Failed to generate authentication' },
      { status: 500 }
    );
  }
} 