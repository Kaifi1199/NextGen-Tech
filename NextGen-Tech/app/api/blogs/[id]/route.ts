import { NextRequest, NextResponse } from "next/server";
import connectDatabase from "@/libs/database";
import blogs from "@/libs/models/blogs";
import { mkdir, writeFile, existsSync } from "fs";
import { promisify } from "util";
import path from "path";

const mkdirAsync = promisify(mkdir);
const writeFileAsync = promisify(writeFile);

export async function GET(req: NextRequest, { params }: any) {
  try {
    await connectDatabase();
    const { id } = params;
    const data = await blogs.findById(id);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDatabase();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content = formData.get("description") as string;
    const image = formData.get("image") as File | null;
    const existingImage = formData.get("existingImage") as string | null;
    const shortDescription = formData.get('shortDescription') as string
    if (!title || !content) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const updateData: any = {
      title,
      description: content,
      shortDescription
    };

    if (image && image.size > 0) {
      const imageBuffer = Buffer.from(await image.arrayBuffer());
      const fileName = `${Date.now()}_${image.name}`;
      const folderPath = path.join(process.cwd(), "public", "images", "blogs");

      if (!existsSync(folderPath)) {
        await mkdirAsync(folderPath, { recursive: true });
      }

      const uploadPath = path.join(folderPath, fileName);
      await writeFileAsync(uploadPath, imageBuffer);

      updateData.image = fileName;
    } else if (existingImage) {
      updateData.image = existingImage;
    }

    const updatedBlog = await blogs.findByIdAndUpdate(params.id, updateData, {
      new: true,
    });

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
