import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { File, KeyRound, Users2Icon } from "lucide-react"
import Link from "next/link"

type RoomCardProps = {
    room: TeacherClassRoom
}
const RoomCard = ({ room }:RoomCardProps) => {
  return (
    <Link href={`/teacher-classes/${room.id}`}>
    <Card>
        <CardHeader>
            <CardTitle>
                {room.name}
            </CardTitle>
            <CardDescription>
                <Label>Share the key to students to join room</Label>
            </CardDescription>
        </CardHeader>
        <Separator/>
        <CardContent className="flex flex-row justify-between items-center">
            <section className="flex flex-col p-4 items-center space-y-2">
                <File size={25}/>
                <Label>{room.assignments.length}</Label>
            </section>
            <Separator orientation="vertical" />
            <section className="flex flex-col p-4 items-center space-y-2">
                <Users2Icon size={25}/>
                <Label>{room.userClassrooms.length}</Label>
            </section>
            <Separator orientation="vertical" />
            <section className="flex flex-col p-4 items-center space-y-2">
                <KeyRound size={25}/>
                <Label>{room.joinCode}</Label>
            </section>
        </CardContent>
    </Card>
    </Link>
  )
}

export default RoomCard