import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{ params }:{params:RouteParams}){
    try {

        const { id } = params

        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })
        
        if(!user || user.role !== "student"){
            return NextResponse.json({message:"user not found"},{status:404})
        }
        
        const classrooms = await prisma.userClassroom.findMany({
            where:{
                userId:user.id
            },
            include:{
                classroom:{
                    include:{
                        assignments:true,
                    }
                }
            }
        })

        if(classrooms.length === 0){
            return NextResponse.json({message:"student doesn't join any classrooms"},{status:404})
        }

        return NextResponse.json(classrooms,{status:200})
    } catch (error) {
        return NextResponse.json({message:"unable to find user's unexpected error ocurred"},{status:500})
    }
}