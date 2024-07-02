import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:RouteParams}){
    try {

        const { id,teacher_id } = params

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
            return NextResponse.json({message:"Unable find assignment only allowed teacher's can get"},{status:401}) 
        }

        const assignments = await prisma.assignment.findMany({
            where:{
                classroomId:classRoom.id
            }
        })
        
        if(assignments.length === 0){
            return NextResponse.json({message:"Unable to find assignments unexpected error ocurred"},{status:404})
        }

        return NextResponse.json(assignments,{status:200})        
    } catch (error) {
        return NextResponse.json({message:"unable to find rooms unexpected error ocurred"},{status:500})
    }
}