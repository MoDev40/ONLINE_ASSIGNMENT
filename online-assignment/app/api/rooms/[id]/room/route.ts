import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:RouteParams}){
    try {

        const { id } = params
        const room = await prisma.classroom.findUnique({
            where:{
                id,
            }
        })

        if(!room){
            return NextResponse.json({message:"Unable to find: room not exist"},{status:404});
        }

        return NextResponse.json(room,{status:200});
        
    } catch (error) {
        return NextResponse.json({message:"unable to find rooms unexpected error ocurred"},{status:500})
    }
}