"use client"

import { useGetAssignmentsQuery } from "@/lib/features/roomSlice";
import { Dispatch, SetStateAction, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import SubmitedFilesCard from "./SubmitedFilesCard";

type Props = {
    student_id:string;
}

const SubmitedFiles = ({ student_id }:Props) => {
    const [assignment_id,setAssignment_id] = useState<string>("")

    return (
    <div className="w-full md:container gap-3 mx-auto flex flex-col">
        <SelectAssignment
            setAssignment_id={setAssignment_id}
            assignment_id={assignment_id}
            student_id={student_id}
        />
        <SubmitedFilesCard
            assignment_id={assignment_id}
            student_id={student_id}
        />
    </div>
  )
}


type SelectAssignmentProps = {
    student_id:string;
    assignment_id:string
    setAssignment_id:Dispatch<SetStateAction<string>>;
}

const SelectAssignment = ({ student_id,assignment_id,setAssignment_id }:SelectAssignmentProps)=>{
    const { data:assignments } = useGetAssignmentsQuery(student_id);
    return(
        <Select
        onValueChange={(assignment_id)=>{
            setAssignment_id(assignment_id)
        }} 
        defaultValue={assignment_id}
    >
        <SelectTrigger>
            <SelectValue placeholder="Select assignment" />
        </SelectTrigger>
        <SelectContent>
            {
                assignments&&
                assignments.map((assignment) =>(
                    <SelectItem key={assignment?.id} value={assignment?.id!}>{assignment.title}</SelectItem>
                ))
            }
        </SelectContent>
    </Select> 
    )
}


export default SubmitedFiles



