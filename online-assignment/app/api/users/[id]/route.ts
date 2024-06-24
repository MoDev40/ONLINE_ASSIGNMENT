import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:RouteParams}) {
    try {
        const { id } = params
        const user = await prisma.user.findUnique({
            where:{
                clerkId:id
            }
        })

        if(!user){
            return NextResponse.json({message:"user not found"},{status:404})
        }
        
        return NextResponse.json(user,{status:200})
    } catch (error) {
        return NextResponse.json({message:"unable to get user unexpected error ocurred"},{status:500})
    }
}