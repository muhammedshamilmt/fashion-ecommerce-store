import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import { z } from 'zod';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  image: z.any().optional(),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const image = formData.get('image') as File | null;

    // Validate the form data
    const validatedData = contactSchema.parse({
      name,
      email,
      subject,
      message,
      image
    });

    let imageUrl = null;
    
    // Handle image upload if present
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Create unique filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const filename = `${uniqueSuffix}-${image.name}`;
      
      // Save to public/uploads directory
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      const filepath = join(uploadDir, filename);
      
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    
    // Insert the message into the messages collection
    const result = await db.collection('messages').insertOne({
      ...validatedData,
      imageUrl,
      createdAt: new Date(),
      status: 'unread'
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully',
      id: result.insertedId 
    });
    
  } catch (error) {
    console.error('Error saving message:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid form data', errors: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
} 