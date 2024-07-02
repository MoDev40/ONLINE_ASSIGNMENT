"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAssignmentQuery } from "@/lib/features/roomSlice";
import Loading from "../../Loading";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

type AssignmentProps = {
  assignment_id:string;
}

const Assignment = ({ assignment_id }:AssignmentProps) => {
  const { data:assignment,isFetching,isLoading } = useGetAssignmentQuery(assignment_id)
  if(isLoading || isFetching) return <div className="container mx-auto"><Loading/></div>

  return (
    assignment&&
    <Card 
    className="w-full"
    >
      <CardHeader title={assignment?.title}>
        <CardTitle>{assignment?.title}</CardTitle>
        <CardDescription>{assignment?.description}</CardDescription>
        <CardDescription>Due: {format(new Date(assignment?.dueDate),"PP")}</CardDescription>
      </CardHeader>
      <CardContent>
        <h1>Download Resources</h1>
        <Button variant="link"> 
        <Link className="link" href={assignment?.fileUrl}>here</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default Assignment