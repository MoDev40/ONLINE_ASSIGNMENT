import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,{params}:{params:RouteParams}){
    try {
        const { id } = params

        const { idCard , name , role , className} = await req.json();
        const updatedUser = await prisma.user.update({
            data:{
                idCard,
                name,
                role,
                className,
            },
            where:{
                id
            }
        })

        if(!updatedUser){
            return NextResponse.json({message:"complete user sign-up failed found"},{status:404})
        }

        return NextResponse.json(updatedUser,{status:200})
    } catch (error) {
        return NextResponse.json({message:"unable to complete user sign-up unexpected error ocurred"},{status:500})
    }
}