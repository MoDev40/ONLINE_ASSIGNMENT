import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetRoomUsersQuery } from "@/lib/features/roomSlice";
import Loading from "../../Loading";
import AvatarCard from "../../AvatarCard";
import { cn } from "@/lib/utils";

type RoomUsersProps = {
    room_id:string;
}
const RoomUsers = ({ room_id }:RoomUsersProps) => {
    const { data:roomWithUsers, isFetching , isLoading } = useGetRoomUsersQuery(room_id)
    if(isLoading || isFetching) return <div className="container mx-auto"><Loading/></div>
  return (
    roomWithUsers&&
    roomWithUsers.map((room) => (
      <Card key={room.id} className={
        cn(
          "flex flex-row justify-between shadow-sm h-auto items-center gap-2",
        )
      }>
        <CardHeader>
          <CardTitle>{room.user.name}</CardTitle>
          <CardDescription>{room.user.idCard}</CardDescription>
        </CardHeader>
        <CardContent>
          <AvatarCard fallback={room.user.name?.charAt(0) as string}/>
        </CardContent>
      </Card>
    ))
  )
}

export default RoomUsers