import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    ids:string[]
}

export async function DELETE(req:NextRequest,{ params }:{ params:Params }){
    try {

        const [id,studentId] = params.ids

        const submittedFile = await prisma.submission.findUnique({
            where:{
                id
            }
        })

        if(!submittedFile || submittedFile.studentId !== studentId){
            return NextResponse.json({message:"unable to find submittedFile or unauthorized user"},{status:401})
        }
        
        const deletedFile = await prisma.submission.delete({
            where:{
                id:submittedFile.id
            }
        })
        
        if(!deletedFile){
            return NextResponse.json({message:"unable to delete submittedFile"},{status:400})
        }

        return NextResponse.json(deletedFile,{status:200})        
    } catch (error) {
        return NextResponse.json({message:"unable to delete submittedFile unexpected error ocurred"},{status:500})
    }
}