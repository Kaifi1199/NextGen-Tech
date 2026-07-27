import blogs from "@/libs/models/blogs";
import { NextRequest, NextResponse } from "next/server";
import connectDatabase from "@/libs/database";

export async function PATCH(req: NextRequest, { params }: any) {
  const { id } = params;
  try {
    await connectDatabase();
    const blog = await blogs.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true } // return the updated document
    );
    return NextResponse.json(blog);
  } catch (error) {
    console.log(error);
  }
}
