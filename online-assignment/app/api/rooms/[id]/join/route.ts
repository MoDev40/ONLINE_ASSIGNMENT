import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{ params }:{ params:RouteParams }){
    try {
        const { id } = params;
        const { joinCode } = await req.json();

        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })
        
        if(!user || user.role !== "student"){
            return NextResponse.json({message:"Student not found"},{status:404})
        }

        const classroom = await prisma.classroom.findUnique({
            where:{
                joinCode
            }
        })

        if(!classroom){
            return NextResponse.json({message:"Unable to find: room not exist"},{status:404})
        }

        const isStudentJoined = await prisma.userClassroom.findFirst({
            where:{
                AND:[
                    { userId:user.id },
                    { classroomId:classroom.id },
                ]
            }
        })

        if(isStudentJoined){
            return NextResponse.json({message:"Student already joined the room"},{status:400})
        }
        
        const joinedRoom = await prisma.userClassroom.create({
            data:{
                userId:user.id,
                classroomId:classroom.id
            }
        })

        if(!joinedRoom){
            return NextResponse.json({message:"Unable to join room"},{status:400})
        }

        return NextResponse.json(joinedRoom,{status:201})
    } catch (error) {
        return NextResponse.json({message:"unable to join rooms unexpected error ocurred"},{status:500})

    }
}