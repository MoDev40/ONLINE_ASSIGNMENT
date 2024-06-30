import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,{params}:{params:RouteParams}){
    try {

        const { id } = params
        const { name,roomId } = await req.json();

        const teacher = await prisma.user.findFirst({
            where:{
                id
            }
        })
        
        if(!teacher || teacher.role !== 'teacher'){
            return NextResponse.json({message:"Unable to find teacher or an authorized user"},{status:401})
        }

        const classRoom = await prisma.classroom.findFirst({
            where:{
                AND:[
                    {id:roomId},
                    {teacherId:id}
                ]
            }
        })

        if(!classRoom){
            return NextResponse.json({message:"Unable to find: room not exist"},{status:404})
        }

        const updatedClassRoom = await prisma.classroom.update({
            data:{
                name
            },
            where:{
                id:roomId,
                teacherId:id
            }
        })

        if(!updatedClassRoom){
            return NextResponse.json({message:"Unable to update classRoom un expected error ocurred"},{status:201})
        }
        
        return NextResponse.json(updatedClassRoom,{status:200})
        
    } catch (error) {
        return NextResponse.json({message:"unable to create room unexpected error ocurred"},{status:500})
    }
}