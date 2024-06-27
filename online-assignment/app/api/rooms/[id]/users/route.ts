import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{ params }:{params:RouteParams}){
    try {

        const { id } = params
        const roomUsers = await prisma.userClassroom.findMany({
            where:{
                classroomId:id,
            },
            include:{
                user:true
            }
        })

        if(roomUsers.length === 0) {
            return NextResponse.json({message:"Unable to find: room doesn't have user's "},{status:404});
        }

        return NextResponse.json(roomUsers,{status:200});
        
    } catch (error) {
        return NextResponse.json({message:"unable to find user's unexpected error ocurred"},{status:500})
    }
}