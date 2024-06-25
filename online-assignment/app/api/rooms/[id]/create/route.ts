import prisma from "@/lib/client";
import { generateKey } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:RouteParams}){
    try {

        const { id } = params
        const { name } = await req.json();

        const teacher = await prisma.user.findFirst({
            where:{
                AND:[

                    {id},
                    {role:"teacher"}
                ]
            }
        })
        if(!teacher){
            return NextResponse.json({message:"Unable to find teacher or an authorized user"},{status:401})
        }

        let joinCode = "";
        // why length is 24 because we need 6 digit in hex 1 digit is equal to 4 bit like 5 = 0101
        generateKey('hmac', { length: 24 ,}, (err, key) => {
            if (err) throw err;
            joinCode = key.export().toString('hex').toUpperCase();
        });

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