import { NextRequest, NextResponse } from "next/server";
import connectDatabase from "@/libs/database";
import blogs from "@/libs/models/blogs";
import { mkdir, writeFile, existsSync } from "fs";
import { promisify } from "util";
import path from "path";

const mkdirAsync = promisify(mkdir);
const writeFileAsync = promisify(writeFile);
export async function GET(req: NextRequest) {
  try {
    await connectDatabase();
    const data = await blogs.find();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDatabase();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content = formData.get("description") as string;
    const image = formData.get("image") as File;
    const shortDescription = formData.get('shortDescription') as string

    if (!title || !content || !image) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert image to buffer
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const fileName = `${Date.now()}_${image.name}`;
    const folderPath = path.join(process.cwd(), "public", "images", "blogs");

    // Check if directory exists, if not, create it
    if (!existsSync(folderPath)) {
      await mkdirAsync(folderPath, { recursive: true });
    }

    // Write file to public/images/blogs
    const uploadPath = path.join(folderPath, fileName);
    await writeFileAsync(uploadPath, imageBuffer);

    // Save blog data
    const newBlog = await blogs.create({
      title,
      description: content,
      image: fileName,
      shortDescription
    });

    return NextResponse.json({ message: "Blog saved", blog: newBlog });
  } catch (error) {
    console.error("Error uploading blog:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id");
  try {
    await connectDatabase();
    await blogs.findByIdAndDelete(id);
    return NextResponse.json("Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
}
