import { NextRequest,NextResponse } from "next/server";
import messages from "@/libs/models/messages";
import connectDatabase from "@/libs/database";


export async function GET(req:NextRequest,{params} : any) {
    try {
        await connectDatabase();
        const {id} = params;
        const data = await messages.findById(id);
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDatabase();

    const id = params.id; // this should now just be "683b72..."
    console.log("id", id);
    
    const data = await req.json();
    console.log("data", data);
    

    const updatedMessage = await messages.findByIdAndUpdate(id, data, { new: true });
    console.log('updatedMessage', updatedMessage);
    
    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}