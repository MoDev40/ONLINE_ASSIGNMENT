import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    id:string;
    ids:string[];
}
export async function DELETE(req:NextRequest,{ params }:{ params:Params }){
    try {

        const { id ,ids } = params
        const [teacher_id,assignment_id] = ids
        
        const teacher = await prisma.user.findUnique({
            where:{
                id:teacher_id
            }
        })
        
        if(!teacher || teacher.role !== 'teacher'){
            return NextResponse.json({message:"Unable to find teacher or an authorized user"},{ status:401 })
        }

        
        const classRoom = await prisma.classroom.findUnique({
            where:{
                id
            }
        })

        if(!classRoom){
            return NextResponse.json({message:"Unable to find classRoom unexpected error ocurred"},{ status:404 })
        }

        if(classRoom.teacherId !== teacher.id){
            return NextResponse.json({message:"Unable to delete assignment only allowed teacher's can delete"},{ status:401 }) 
        }
        
        await prisma.assignment.delete({
            where:{
                id:assignment_id
            }
        })

        return NextResponse.json("Deleted successfully",{ status:200 })
        
    } catch (error) {
        return NextResponse.json({message:"unable to delete assignment unexpected error ocurred"},{status:500})
    }
}