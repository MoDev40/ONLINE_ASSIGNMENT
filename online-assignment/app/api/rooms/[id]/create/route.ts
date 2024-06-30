import prisma from "@/lib/client";
import randomatic from "randomatic"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:RouteParams}){
    try {

        const { id } = params
        const { name } = await req.json();

        const teacher = await prisma.user.findFirst({
            where:{
                id
            }
        })
        
        if(!teacher || teacher.role !== 'teacher'){
            return NextResponse.json({message:"Unable to find teacher or an authorized user"},{status:401})
        }

        let joinCode = randomatic("A0",6)
        
        const classRoom = await prisma.classroom.create({
            data:{
                name,
                teacherId:teacher.id,
                joinCode
            }
        })

        if(!classRoom){
            return NextResponse.json({message:"Unable to create classRoom un expected error ocurred"},{status:201})
        }
        return NextResponse.json(classRoom,{status:201})
        
    } catch (error) {
        return NextResponse.json({message:"unable to create room unexpected error ocurred"},{status:500})
    }
}