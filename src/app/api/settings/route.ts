import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const settings = await db.collection('settings').findOne({});

    return NextResponse.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const data = await request.json();

    // Validate required fields
    if (!data.storeName || !data.contactEmail || !data.contactPhone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update or insert settings
    const result = await db.collection('settings').updateOne(
      { _id: data._id ? new ObjectId(data._id) : new ObjectId() },
      { 
        $set: {
          storeName: data.storeName,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          storeAddress: data.storeAddress,
          currency: data.currency,
          adminProfile: {
            fullName: data.adminProfile.fullName,
            email: data.adminProfile.email,
            role: data.adminProfile.role,
            phone: data.adminProfile.phone
          },
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    // Fetch the updated settings
    const updatedSettings = await db.collection('settings').findOne(
      { _id: result.upsertedId || new ObjectId(data._id) }
      );

    return NextResponse.json({
      success: true,
      data: updatedSettings 
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
} 