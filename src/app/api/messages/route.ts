import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { z } from "zod";
import { ObjectId } from "mongodb";

const messageSchema = z.object({
  sender: z.string().min(1, "Sender name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  read: z.boolean().default(false),
});

export async function GET(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';
    
    // Build query
    const query: any = {};
    
    // Add search condition if search term exists
    if (search) {
      query.$or = [
        { sender: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Add status filter
    if (status !== 'all') {
      query.read = status === 'read';
    }
    
    // Get messages from database
    const messages = await db.collection("messages")
      .find(query)
      .sort({ date: -1 })
      .toArray();
    
    return NextResponse.json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch messages',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = messageSchema.parse(body);

    const { db } = await connectToDatabase();
    
    const message = {
      ...validatedData,
      date: new Date(),
    };

    const result = await db.collection("messages").insertOne(message);

    return NextResponse.json({
      success: true,
      data: { ...message, _id: result.insertedId },
    });
  } catch (error) {
    console.error("Error creating message:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create message" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();
    
    if (!body._id || !ObjectId.isValid(body._id)) {
      return NextResponse.json(
        { success: false, error: "Invalid message ID" },
        { status: 400 }
      );
    }
    
    // Update message
    const result = await db.collection("messages").updateOne(
      { _id: new ObjectId(body._id) },
      { $set: { read: body.read } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Message not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Message updated successfully"
    });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update message',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid message ID" },
        { status: 400 }
      );
    }
    
    // Delete message
    const result = await db.collection("messages").deleteOne({
      _id: new ObjectId(id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Message not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Message deleted successfully"
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete message',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 