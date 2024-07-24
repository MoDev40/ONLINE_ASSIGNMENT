"use client"
import { Button } from "@/components/ui/button";
import { useGetSubmitedFilesQuery } from "@/lib/features/roomSlice";
import { download } from "@/utils/Download";
import { format } from "date-fns";
import { Download, File, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import Loading from "../Loading";
import DeleteSubmittedFile from "./DeleteSubmittedFile";

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
                <p className="text-muted-foreground">submitted: {format(new Date(file.submittedAt),"PPP")}</p>
              </div>
              <div className="flex flex-row justify-between">
                <DeleteSubmittedFile 
                  fileKey={file.fileKey}
                  id={file.id}
                  student_id={file.studentId}
                />
                <Button variant="ghost" size="icon">
                  <Link href={file.fileUrl} target="_blank">
                    <LinkIcon className="w-4 h-4" />
                  </Link>
                </Button>
                <Button onClick={()=>{
                  download(file.fileUrl,`AnswerOf${file.assignment?.title}.${file.fileUrl.split(".")[2]}`)
                }} variant="ghost" size="icon" >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
    </div>
    )
}

export default SubmitedFilesCard