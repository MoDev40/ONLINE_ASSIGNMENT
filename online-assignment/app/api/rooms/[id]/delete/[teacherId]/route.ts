import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_req:NextRequest,{ params }:{params:RouteParams}){
    try {

        const { id,teacherId } = params

        const classRoom = await prisma.classroom.findFirst({
            where:{
                AND:[
                    {id},
                    {teacherId}
                ]
            },include:{
                submissions:true,
                assignments:true
            }
        })

        if(!classRoom){
            return NextResponse.json({message:"Unable to find: room not exist"},{status:404})
        }

        const { submissions, assignments } = classRoom
        const fileKeys = [
            ...assignments.map((a)=>( a.fileKey)),
            ...submissions.map((s)=>( s.fileKey))
        ]

        const deletedRoom = await prisma.classroom.delete({
            where:{
                id:classRoom.id,
            }
        })

        if(!deletedRoom){
            return NextResponse.json({message:"Unable to Delete: unexpected error"},{status:400})
        }

        return NextResponse.json(fileKeys,{status:200});
        
    } catch (error) {
        return NextResponse.json({message:"Unable to Delete room: unexpected error ocurred"},{status:500})
    }
}