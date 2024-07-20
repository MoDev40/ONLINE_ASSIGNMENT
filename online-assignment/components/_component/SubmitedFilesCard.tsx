"use client"
import { useGetSubmitedFilesQuery } from "@/lib/features/roomSlice";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { File, Trash2 } from "lucide-react";
import Loading from "./Loading";

type SubmitedFilesCardProps = {
    assignment_id:string; 
    student_id:string;
}
const SubmitedFilesCard = (props:SubmitedFilesCardProps)=>{
    const { data:submitedFiles,isFetching} = useGetSubmitedFilesQuery(props)

    if(isFetching) return <div className="container mx-auto"><Loading/></div>
    
    return (
    <div className="flex flex-col gap-2">
        {submitedFiles&&
         submitedFiles.map((file, index) => (
          <div className="shadow-sm backdrop-brightness-125 rounded-sm" key={index}>
            <div className="flex flex-row p-2 items-center justify-between">
              <div className="flex flex-col p-1">
                <File/>
                <p className="text-muted-foreground">At: {format(new Date(file.submittedAt),"PPP")}</p>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
    </div>
    )
}

export default SubmitedFilesCard