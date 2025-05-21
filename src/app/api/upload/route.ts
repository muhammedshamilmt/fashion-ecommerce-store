import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("image0") as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: "No files were uploaded" },
        { status: 400 }
      );
    }

    const urls: string[] = [];

    for (const file of files) {
      if (!file) continue;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { success: false, error: "Only image files are allowed" },
          { status: 400 }
        );
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: "File size must be less than 5MB" },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const uniqueId = uuidv4();
      const extension = file.name.split(".").pop();
      const filename = `${uniqueId}.${extension}`;

      // Save to public/uploads directory
      const uploadDir = join(process.cwd(), "public", "uploads");
      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);

      // Return the URL path
      urls.push(`/uploads/${filename}`);
    }

    if (urls.length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid files were processed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      urls,
      message: `Successfully uploaded ${urls.length} image${urls.length > 1 ? 's' : ''}`
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to upload file";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
} 