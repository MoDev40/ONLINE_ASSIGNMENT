"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { File } from "lucide-react"
import Link from "next/link"

const StudentClassCard = ({ room }:{ room:ClassroomWithAssignments}) => {
  return (
    <Link href={`/rooms/${room.id}`}>
    <Card>
        <CardHeader>
            <CardTitle>
                {room.name}
            </CardTitle>
            <CardDescription>
                <Label>{new Date(room.createdAt).toLocaleDateString()}</Label>
            </CardDescription>
        </CardHeader>
        <Separator/>
        <CardContent className="flex flex-row justify-between items-center">
            <section className="flex flex-col p-4 items-center space-y-2">
                <File size={25}/>
                <Label>{room.assignments.length}</Label>
            </section>
        </CardContent>
    </Card>
    </Link>
  )
}

export default StudentClassCard