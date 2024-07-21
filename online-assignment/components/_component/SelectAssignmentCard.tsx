"use client"
import { useGetAssignmentsQuery } from "@/lib/features/roomSlice";
import { Dispatch, SetStateAction } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type SelectAssignmentProps = {
    student_id:string;
    assignment_id:string
    setAssignment_id:Dispatch<SetStateAction<string>>;
}

const SelectAssignmentCard = ({ student_id,assignment_id,setAssignment_id }:SelectAssignmentProps)=>{
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

export default SelectAssignmentCard