"use client"

import { Button } from "@/components/ui/button";
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
    <div className="w-full px-4 py-6 md:px-6 lg:py-16 flex flex-col space-y-6">
      <article className="prose prose-gray mx-auto max-w-3xl dark:prose-invert">
          <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl lg:leading-[3.5rem]">
          {assignment?.title}
          </h1>
          <div className="mt-6">
          <p><strong>Due:</strong>  {format(new Date(assignment?.dueDate),"PP")}</p>
          </div>
          <div className="mt-6">
            <p>{assignment?.description ? assignment?.description : "No description provided"}</p>
          </div>
          <div className="mt-6">
          <h1>Download Resources</h1>
          <Button onClick={()=>{
            download(assignment.fileUrl,`${assignment.title}.${assignment.fileUrl.split(".")[2]}`)
          }} variant="link"> 
            here
          </Button>         
         </div>
      </article>
    </div>
  )
}

export default Assignment