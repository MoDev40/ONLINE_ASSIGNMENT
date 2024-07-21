import { useGetAssignmentsQuery } from "@/lib/features/roomSlice";
import Loading from "../../Loading";

import { Button } from "@/components/ui/button";
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
import { usePathname, useRouter } from "next/navigation";
import DeleteAssignment from "./DeleteAssignment";

type Props = {
  room_id:string;
  user_id:string;
}

const AssignmentList = ({ room_id,user_id }:Props) => {
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
        <TableHead></TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {
        assignments&&
        assignments.map((assignment)=>(
        <TableRow key={assignment.id}>
          <TableCell className="font-medium">{assignment.title}</TableCell>
          <TableCell>{format(new Date(assignment.dueDate),"P")}</TableCell>
          <TableCell> <Button size="sm"  variant="link" onClick={()=> router.push(`${pathName}/${assignment.id}/`)}>link</Button>
          </TableCell>
          <TableCell>
            <DeleteAssignment
              classroom_id={assignment?.classroomId as string}
              assignment_id={assignment?.id as string}
              teacher_id={user_id}
            />
          </TableCell>
        </TableRow>
        ))
      }
    </TableBody>
  </Table>
  )
}

export default AssignmentList