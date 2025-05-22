import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const priority = formData.get('priority') as "low" | "medium" | "high";
    const image = formData.get('image') as File | null;

    // Validate the contact form data
    const validatedData = contactSchema.parse({
      name,
      email,
      subject,
      message,
      priority
    });

    const { db } = await connectToDatabase();
    
    // Create message document
    const messageDoc = {
      ...validatedData,
      date: new Date(),
      read: false,
      status: "new",
      hasAttachment: !!image
    };

    // Insert message into database
    const result = await db.collection("messages").insertOne(messageDoc);

    if (!result.insertedId) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Failed to save message" 
        },
        { status: 500 }
      );
    }

    // If there's an image, handle it here
    if (image) {
      // TODO: Implement image upload to your preferred storage service
      // For now, we'll just acknowledge that we received it
      console.log('Received image:', image.name);
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      data: { ...messageDoc, _id: result.insertedId }
    });
  } catch (error) {
    console.error("Error sending message:", error);
    
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
        error: "Failed to send message",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 