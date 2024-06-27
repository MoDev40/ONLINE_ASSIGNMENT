"use client"
import { useGetRoomQuery } from "@/lib/features/roomSlice"
import Loading from "../../Loading"
import { Card,CardHeader,CardTitle,CardContent,CardDescription } from "@/components/ui/card"

type RoomPageCard = {
    room_id:string
}

const RoomPageCard = ({ room_id }:RoomPageCard)=>{
    const { data:room, isFetching,isLoading } = useGetRoomQuery(room_id as string)

    if(isLoading || isFetching) return <div className="container mx-auto"><Loading/></div>

    if(!room) return <h1>Not found</h1>

    return(
        <Card>
            <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{new Date(room.createdAt).toString()}</CardDescription>
            </CardHeader>
        </Card>
    )
}

export default RoomPageCard