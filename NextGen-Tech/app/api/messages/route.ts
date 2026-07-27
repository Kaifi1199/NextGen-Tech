import { NextRequest,NextResponse } from "next/server";
import messages from "@/libs/models/messages";
import connectDatabase from "@/libs/database";


export async function GET(){
    try {
        await connectDatabase();
        const data = await messages.find();
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req:NextRequest){
    try {
        await connectDatabase();
        const data = await req.json();
        await messages.create(data);
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
    }
}

export async function  DELETE(req:NextRequest) {
    const id = new URL(req.url).searchParams.get('id');
    try {
        await connectDatabase();
        await messages.findByIdAndDelete(id);
        return NextResponse.json("Deleted Successfully");
    } catch (error) {
        console.log(error);
    }
}