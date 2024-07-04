"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAssignmentQuery } from "@/lib/features/roomSlice";
import { download } from "@/utils/Download";
import { format } from "date-fns";
import Loading from "../../Loading";

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
        <CardDescription>Due: {format(new Date(assignment?.dueDate),"PP")}</CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>{assignment?.description ? assignment?.description : "No description provided"}</CardDescription>
      </CardContent>
      <CardFooter>
        <h1>Download Resources</h1>
        <Button onClick={()=>{
          download(assignment.fileUrl,`${assignment.title}.${assignment.fileUrl.split(".")[2]}`)
        }} variant="link"> 
          here
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Assignment