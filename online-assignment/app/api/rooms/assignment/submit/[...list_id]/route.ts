import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

type Param = {
    list_id: string[]
}
export async function POST(req:NextRequest,{ params }:{params:Param}) {

    const [studentId,classroomId,assignmentId,] = params.list_id
    const { fileKey,fileUrl } = await req.json();

    const user = await prisma.userClassroom.findUnique({
        where:{
            id:studentId
        },
        include:{
            user:true,
            classroom:true
        }
    })
    
    if(!user || user.user.role !=='student'){
        return NextResponse.json({message:"User not found or not a student"},{status:404})
    }


    if(classroomId !== user.classroom.id){
        return NextResponse.json({message:"classroom not found or user does not exist in classroom"},{status:404})
    }

    const assignment = await prisma.assignment.findUnique({
        where:{
            id:assignmentId
        },
        include:{
            classroom:true
        }
    })
    
    if(!assignment || assignment.classroom.id !== classroomId){
        return NextResponse.json({message:"Unable to find: assignment not found"},{status:404})
    }

    const submittedFile = await prisma.submission.create({
        data:{
            studentId:user.id,
            assignmentId:assignment.id,
            classroomId,
            fileKey,
            fileUrl
        }
    })

    if(!submittedFile) {
        return NextResponse.json({message:"Unable to submit assignment"},{status:500})
    }

    return NextResponse.json(submittedFile,{status:200})
}