import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { z } from "zod";
import { ObjectId } from "mongodb";

// Validation schemas
const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  photoURL: z.string().optional(),
  isAdmin: z.boolean().default(false),
});

const updateCustomerSchema = z.object({
  _id: z.string().min(1, "Customer ID is required"),
  isAdmin: z.boolean(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const id = searchParams.get('id');

    const { db } = await connectToDatabase();
    
    if (id) {
      // Get single customer
      const customer = await db.collection("customers").findOne({ _id: new ObjectId(id) });
      
      if (!customer) {
        return NextResponse.json(
          { success: false, error: "Customer not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: customer
      });
    }

    // Get all customers with search
    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const customers = await db.collection("customers")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: customers
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch customers',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();

    // Validate customer data
    const validatedData = customerSchema.parse(body);

    // Check if email already exists
    const existingCustomer = await db.collection("customers").findOne({ 
      email: validatedData.email 
    });

    if (existingCustomer) {
      return NextResponse.json(
        { success: false, error: "Email already exists" },
        { status: 400 }
      );
    }

    // Create new customer
    const customer = {
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("customers").insertOne(customer);

    if (!result.insertedId) {
      return NextResponse.json(
        { success: false, error: "Failed to create customer" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Customer created successfully",
      data: { ...customer, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating customer:', error);
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
        error: "Failed to create customer",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();

    // Validate update data
    const validatedData = updateCustomerSchema.parse(body);

    // Update customer
    const result = await db.collection("customers").updateOne(
      { _id: new ObjectId(validatedData._id) },
      { 
        $set: { 
          isAdmin: validatedData.isAdmin,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Customer updated successfully"
    });
  } catch (error) {
    console.error('Error updating customer:', error);
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
        error: "Failed to update customer",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Customer ID is required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const result = await db.collection("customers").deleteOne({ 
      _id: new ObjectId(id) 
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Customer deleted successfully"
    });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to delete customer",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 