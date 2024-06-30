import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetRoomUsersQuery } from "@/lib/features/roomSlice";
import { useRouter } from "next/navigation";
import Loading from "../../Loading";


type RoomUsersProps = {
    room_id:string;
}
const RoomUsers = ({ room_id }:RoomUsersProps) => {
    const router = useRouter()
    const { data:roomUsers, isFetching , isLoading } = useGetRoomUsersQuery(room_id)
    if(isLoading || isFetching) return <div className="container mx-auto"><Loading/></div>
  return (
    <Table>
      <TableCaption>A list of joined users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Class</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          roomUsers&&
          roomUsers.map((room) => (
          <TableRow onClick={()=> router.push(`/student/${room.user.id}/details/${room.classroomId}`)} key={room.userId}>
            <TableCell className="font-medium">{room.user.idCard}</TableCell>
            <TableCell>{room.user.name}</TableCell>
            <TableCell>{room.user.className}</TableCell>
          </TableRow>
          ))
        }

      </TableBody>
    </Table>
  )
}

export default RoomUsers