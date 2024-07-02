"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { File } from "lucide-react"
import Link from "next/link"

const StudentClassCard = ({ room }:{ room:StudentRoomsWithAssignments}) => {
  return (
    <Link href={`/student-classes/${room.id}`}>
    <Card>
        <CardHeader>
            <CardTitle>
                {room.classroom.name}
            </CardTitle>
            <CardDescription>
                <Label>JoinedAt: {format(new Date(room.joinedAt),"PP")}</Label>
            </CardDescription>
        </CardHeader>
        <Separator/>
        <CardContent className="flex flex-row justify-between items-center">
            <section className="flex flex-col p-4 items-center space-y-2">
                <File size={25}/>
                <Label>{room.classroom.assignments.length}</Label>
            </section>
        </CardContent>
    </Card>
    </Link>
  )
}

export default StudentClassCard