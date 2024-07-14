import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:RouteParams}){
    try {

        const { id } = params

        const classRoom = await prisma.classroom.findUnique({
            where:{
                id
            }
        })

        const userClassroom = await prisma.userClassroom.findUnique({
            where:{
                id
            }
        })

        if(!classRoom && !userClassroom){
            return NextResponse.json({message:"Unable to find classRoom un expected error ocurred"},{status:404})
        }

        const assignments = await prisma.assignment.findMany({
            where:{
                classroomId:classRoom?.id || userClassroom?.classroomId
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