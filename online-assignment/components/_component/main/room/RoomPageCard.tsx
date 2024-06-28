"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetRoomQuery } from "@/lib/features/roomSlice"
import Loading from "../../Loading"
import RoomUsers from "./RoomUsers"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type RoomPageCard = {
    room_id:string
}

const RoomPageCard = ({ room_id }:RoomPageCard)=>{
    const { data:room, isFetching,isLoading } = useGetRoomQuery(room_id as string)

    if(isLoading || isFetching) return <div className="container mx-auto"><Loading/></div>

    if(!room) return <h1>Not found</h1>

    return(
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{new Date(room.createdAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <Separator/>
            <CardContent className="p-5">
                <RoomUsers room_id={room.id}/>
            </CardContent>
        </Card>
    )
}

export default RoomPageCard