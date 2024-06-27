import { useGetRoomUsersQuery } from "@/lib/features/roomSlice";
import Loading from "../../Loading";

type RoomUsersProps = {
    room_id:string;
}
const RoomUsers = ({ room_id }:RoomUsersProps) => {
    const { data:roomUsers, isFetching , isLoading } = useGetRoomUsersQuery(room_id)
    if(isLoading || isFetching) return <div className="container mx-auto"><Loading/></div>
  return (
    <div>
    RoomUsers
    </div>
  )
}

export default RoomUsers