import { NextRequest, NextResponse } from "next/server";
import connectDatabase from "@/libs/database";
import users from "@/libs/models/users";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { clerkId, email, firstName, lastName, imageUrl } = data;

    if (!clerkId || !email) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await connectDatabase();

    const existingUser = await users.findOne({ clerkId });
    if (!existingUser) {
      const newUser = await users.create({
        clerkId,
        email,
        firstName,
        lastName,
        imageUrl,
      });
      return NextResponse.json({ message: "User created", user: newUser }, { status: 201 });
    }

    return NextResponse.json({ message: "User already exists", user: existingUser }, { status: 200 });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
