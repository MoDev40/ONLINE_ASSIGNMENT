import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{ params }:{params:RouteParams}){
    try {

        const { a_id } = params

        const assignment = await prisma.assignment.findUnique({
            where:{
                id:a_id
            }
        })

        if(!assignment){
            return NextResponse.json({message:"assignment not found"},{status:404})
        }

        return NextResponse.json(assignment,{status:200})
    } catch (error) {
        return NextResponse.json({message:"unable to find assignments unexpected error ocurred"},{status:500})
    }
}