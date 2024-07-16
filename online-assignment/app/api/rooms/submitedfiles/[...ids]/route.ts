import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    ids:string[]
}

export async function GET(req:NextRequest,{ params }:{ params:Params }){
    try {

        const [assignmentId,studentId] = params.ids

        const submitedFiles = await prisma.submission.findMany({
            where:{
                AND:[
                    {assignmentId},
                    {studentId}
                ]
            }
        })
        
        return NextResponse.json(submitedFiles,{status:200})        
    } catch (error) {
        return NextResponse.json({message:"unable to find submitedFiles unexpected error ocurred"},{status:500})
    }
}