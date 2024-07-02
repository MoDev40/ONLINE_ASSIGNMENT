import { useGetTeacherAssignmentsQuery } from "@/lib/features/roomSlice";
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
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";

type Props = {
  room_id:string;
  teacher_id:string;
}

const AssignmentList = (props:Props) => {
  const { data:assignments, isLoading, isFetching } = useGetTeacherAssignmentsQuery(props)
  const router = useRouter()

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
        <TableHead>Docs</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {
        assignments&&
        assignments.map((assignment)=>(
        <TableRow onClick={()=> router.push(`/assignment/${assignment.id}/details/`)} key={assignment.id}>
          <TableCell className="font-medium">{assignment.title}</TableCell>
          <TableCell>{format(new Date(assignment.dueDate),"PP")}</TableCell>
          <TableCell><Link target="_blank"  href={assignment.fileUrl}>Link</Link></TableCell>
        </TableRow>
        ))
      }
    </TableBody>
  </Table>
  )
}

export default AssignmentList