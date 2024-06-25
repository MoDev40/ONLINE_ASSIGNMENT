import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:RouteParams}){
    try {

        const { id } = params
        const rooms = await prisma.classroom.findMany({
            where:{
                teacherId:id,
            },
            include:{
                assignments:true,
                userClassrooms:true
            }
        })

        if(rooms.length === 0){
            return NextResponse.json({message:"Unable to find: room not exist"},{status:404});
        }

        return NextResponse.json(rooms,{status:200});
        
    } catch (error) {
        return NextResponse.json({message:"unable to find rooms unexpected error ocurred"},{status:500})
    }
}