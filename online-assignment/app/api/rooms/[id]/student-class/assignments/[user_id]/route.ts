import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{ params }:{params:RouteParams}){
    try {

        const { id,user_id } = params

        const user = await prisma.user.findUnique({
            where:{
                id:user_id
            }
        })
        
        if(!user || user.role !== "student"){
            return NextResponse.json({message:"user not found"},{status:404})
        }
        
        const classroom = await prisma.userClassroom.findUnique({
            where:{
                id
            },
            include:{
                classroom:{
                    include:{
                        assignments:true
                    }
                }
            }
        })

        if(!classroom || classroom.userId !== user.id){
            return NextResponse.json({message:"student doesn't join any classroom"},{status:404})
        }

        return NextResponse.json(classroom.classroom.assignments,{status:200})
    } catch (error) {
        return NextResponse.json({message:"unable to find assignments unexpected error ocurred"},{status:500})
    }
}