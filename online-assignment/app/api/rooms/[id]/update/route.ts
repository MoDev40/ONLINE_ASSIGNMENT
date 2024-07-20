import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,{params}:{params:RouteParams}){
    try {

        const { id } = params
        const { name } = await req.json();

        const classRoom = await prisma.classroom.findUnique({
            where:{
                id
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
                id,
            }
        })

        if(!updatedClassRoom){
            return NextResponse.json({message:"Unable to update classRoom unexpected error ocurred"},{status:201})
        }
        
        return NextResponse.json(updatedClassRoom,{status:200})
        
    } catch (error) {
        return NextResponse.json({message:"unable to update room unexpected error ocurred"},{status:500})
    }
}