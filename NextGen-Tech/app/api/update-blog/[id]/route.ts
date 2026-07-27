import blogs from "@/libs/models/blogs";
import connectDatabase from "@/libs/database";
import { NextRequest, NextResponse } from "next/server";
import { toast } from "react-toastify";

export async function PATCH(req: NextRequest, { params }: any) {
  const { id } = params;
  try {
    await connectDatabase();
    const data = await req.json();

    if (data.status === "active") {
      // Count currently active blogs
      const activeCount = await blogs.countDocuments({ status: "active" });

      // If this blog isn't already active and we already have 6 active blogs
      const currentBlog = await blogs.findById(id);
      if (activeCount >= 6 && currentBlog.status !== "active") {
        return NextResponse.json(
          { error: "Only 6 blogs can be active at a time." },
          { status: 400 }
        );
      }
    }

    const updatedBlog = await blogs.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
