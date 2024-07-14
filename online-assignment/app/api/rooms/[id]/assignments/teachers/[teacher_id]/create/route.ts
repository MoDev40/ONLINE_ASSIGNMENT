import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:RouteParams}){
    try {

        const currentDate = new Date();
        const { id ,teacher_id } = params
        const { title,description,dueDate,fileKey,fileUrl } : Assignment = await req.json();

        const teacher = await prisma.user.findUnique({
            where:{
                id:teacher_id
            }
        })
        
        if(!teacher || teacher.role !== 'teacher'){
            return NextResponse.json({message:"Unable to find teacher or an authorized user"},{status:401})
        }

        
        const classRoom = await prisma.classroom.findUnique({
            where:{
                id
            }
        })

        if(!classRoom){
            return NextResponse.json({message:"Unable to find classRoom un expected error ocurred"},{status:404})
        }

        if(classRoom.teacherId !== teacher.id){
            return NextResponse.json({message:"Unable add assignment only allowed teacher's can add"},{status:401}) 
        }

        const assignment = await prisma.assignment.create({
            data:{
                classroomId:classRoom.id,
                title,
                description,
                dueDate,
                fileKey,
                fileUrl,
                createdAt:currentDate
            }
        })

        if(!assignment){
            return NextResponse.json({message:"Unable to create assignment unexpected error ocurred"},{status:400})
        }
        
        return NextResponse.json(assignment,{status:201})
        
    } catch (error) {
        return NextResponse.json({message:"unable to create room unexpected error ocurred"},{status:500})
    }
}