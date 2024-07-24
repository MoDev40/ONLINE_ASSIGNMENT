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
import { usePathname, useRouter } from "next/navigation";
import Loading from "../../Loading";


type ClassUsersProps = {
    room_id:string;
}
const ClassUsers = ({ room_id }:ClassUsersProps) => {
    const router = useRouter()
    const pathName = usePathname()
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
          roomUsers.map((user) => (
          <TableRow onClick={()=> router.push(`${pathName}/submitedfiles/${user.id}`)} key={user.userId}>
            <TableCell className="font-medium">{user.user.idCard}</TableCell>
            <TableCell>{user.user.name}</TableCell>
            <TableCell>{user.user.className}</TableCell>
          </TableRow>
          ))
        }

      </TableBody>
    </Table>
  )
}

export default ClassUsers