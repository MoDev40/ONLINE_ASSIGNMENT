"use client"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetRoomQuery } from "@/lib/features/roomSlice"
import Loading from "../../Loading"

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