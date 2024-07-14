import { useGetAssignmentsQuery } from "@/lib/features/roomSlice";
import Loading from "../../Loading";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  room_id:string;
}

const AssignmentList = ({ room_id }:Props) => {
  const { data:assignments, isLoading, isFetching } = useGetAssignmentsQuery(room_id)
  const router = useRouter()
  const pathName = usePathname()

  if(isLoading || isFetching) return <div className="container mx-auto"><Loading/></div>
  return (
    <Table 
    className="w-full"
    >
    <TableCaption>A list of Assignments.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Due Date</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {
        assignments&&
        assignments.map((assignment)=>(
        <TableRow key={assignment.id}>
          <TableCell className="font-medium">{assignment.title}</TableCell>
          <TableCell>{format(new Date(assignment.dueDate),"PP")}</TableCell>
          <TableCell> <Button size="sm"  variant="link" onClick={()=> router.push(`${pathName}/${assignment.id}/`)}>link</Button>
          </TableCell>
          <TableCell> <Trash2  size={20}/> </TableCell>
        </TableRow>
        ))
      }
    </TableBody>
  </Table>
  )
}

export default AssignmentList