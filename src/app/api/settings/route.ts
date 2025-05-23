import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { z } from "zod";

const settingsSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  contactEmail: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  storeAddress: z.string().min(1, "Store address is required"),
  currency: z.string().default("usd"),
  adminProfile: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    role: z.string().min(1, "Role is required"),
    phone: z.string().min(1, "Phone number is required"),
    photoURL: z.string().optional(),
  }),
});

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Get settings from the database
    const settings = await db.collection("settings").findOne({});
    
    if (!settings) {
      return NextResponse.json({ 
        success: false, 
        error: 'Settings not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      data: settings 
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch settings' 
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();

    // Validate the settings data
    const validatedData = settingsSchema.parse(body);

    // Update or insert settings
    const result = await db.collection("settings").updateOne(
      {}, // empty filter to match any document
      { 
        $set: {
          ...validatedData,
          updatedAt: new Date()
        }
      },
      { upsert: true } // create if doesn't exist
    );

    if (result.matchedCount === 0 && result.upsertedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Failed to update settings" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
      data: validatedData
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Validation error",
          details: error.errors 
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to update settings",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 