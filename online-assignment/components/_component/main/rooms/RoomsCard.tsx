"use client"
import { useGetRoomsQuery } from "@/lib/features/roomSlice"
import { useGetUserQuery } from "@/lib/features/userSlice"
import Loading from "../../Loading"
import RoomCard from "./RoomCard"
import CreateRoomDialog from "./CreateRoomDialog"

const RoomsCard = ({ userId }:{ userId:string })=> {
    const { data:user,isLoading } = useGetUserQuery(userId)
    const { data:rooms,isFetching } = useGetRoomsQuery(user?.id as string)

    if(isLoading || isFetching) return <div className="container mx-auto"><Loading/></div>

    return(
        <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-2xl font-bold">Rooms</h1>
                <CreateRoomDialog teacherId={user?.id as string}/>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 container mx-auto xl:grid-cols-4 mt-6 lg:grid-cols-3">
                {   rooms&&
                    rooms.map((room)=>(
                        <RoomCard key={room.id} room={room}/>
                    ))
                }
            </div>

        </div>
    )
}

export default RoomsCard