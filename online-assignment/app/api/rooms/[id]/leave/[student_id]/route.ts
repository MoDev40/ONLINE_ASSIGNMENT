import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest,{params}:{params:RouteParams}){
    try {

        const { id,student_id } = params

        const classRoom = await prisma.userClassroom.findFirst({
            where:{
                AND:[
                    {id},
                    { userId: student_id}
                ]
            }
        })

        if(!classRoom){
            return NextResponse.json({message:"Unable to find: room not exist"},{status:404})
        }

        const deletedRoom = await prisma.userClassroom.delete({
            where:{
                id:classRoom.id,
            }
        })

        if(!deletedRoom){
            return NextResponse.json({message:"Unable to Leave: unexpected error"},{status:400})
        }

        return NextResponse.json('Successfully Leaved the room',{status:200});
        
    } catch (error) {
        return NextResponse.json({message:"unable to find rooms unexpected error ocurred"},{status:500})
    }
}