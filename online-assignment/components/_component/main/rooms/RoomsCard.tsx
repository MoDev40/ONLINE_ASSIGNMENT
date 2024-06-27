"use client"
import { useGetRoomsQuery } from "@/lib/features/roomSlice"
import { useGetUserQuery } from "@/lib/features/userSlice"
import Loading from "../../Loading"
import RoomCard from "./RoomCard"

const RoomsCard = ({ userId }:{ userId:string })=> {
    const { data:user,isLoading } = useGetUserQuery(userId)
    const { data:rooms,isFetching } = useGetRoomsQuery(user?.id as string)

    if(isLoading || isFetching) return <div className="container mx-auto"><Loading/></div>

    return(
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 container mx-auto xl:grid-cols-4 mt-6 lg:grid-cols-3">
            {   rooms&&
                rooms.map((room)=>(
                    <RoomCard key={room.id} room={room}/>
                ))
            }
        </div>
    )
}

export default RoomsCard