"use client"
import { useGetStudentAssignmentsQuery } from "@/lib/features/roomSlice";
import { useGetUserQuery } from "@/lib/features/userSlice";
import Loading from "../../Loading";

import { Card } from "@/components/ui/card";
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
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
  
type AssignmentListsProps = {
    room_id:string;
    student_id:string;
}
const AssignmentsLists = ({ room_id,student_id }:AssignmentListsProps) => {
    const { data:user,isFetching } = useGetUserQuery(student_id)
    const { data:assignments,isLoading } = useGetStudentAssignmentsQuery({ room_id, student_id: user?.id as string})

    const router = useRouter()
    const pathName = usePathname()

    if(isFetching || isLoading) return <div className="container mx-auto"><Loading /></div>
  
    if(user?.role === "teacher"){
      window.location.pathname = "/"
      return null;
    }
      
  return (
    <Card
    className="w-full p-5 shadow-sm"
    >
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
        <TableRow onClick={()=> router.push(`${pathName}/assignments/${assignment.id}/${user?.id}`)} key={assignment.id}>
          <TableCell className="font-medium">{assignment.title}</TableCell>
          <TableCell>{format(new Date(assignment.dueDate),"PP")}</TableCell>
          <TableCell><Link target="_blank"  href={assignment.fileUrl}>Link</Link></TableCell>
        </TableRow>
        ))
      }
    </TableBody>
  </Table>
  </Card>
  )
}

export default AssignmentsLists