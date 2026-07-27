import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Not logged in. Please log in first.' }, { status: 401 });
  }

  try {
    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'admin'
      }
    });
    return NextResponse.json({ 
        message: 'Success! You have been granted admin privileges.',
        nextSteps: 'Please log out and log back in for the changes to take effect.'
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
