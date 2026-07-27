import blogs from "@/libs/models/blogs";
import messages from "@/libs/models/messages";
import connectDatabase from "@/libs/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDatabase();
    const blogsCount = await blogs.countDocuments();
    const messagesCount = await messages.countDocuments();
    return NextResponse.json({ blogsCount, messagesCount });
  } catch (error) {
    console.log(error);
  }
}
