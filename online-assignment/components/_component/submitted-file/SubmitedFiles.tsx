"use client"

import { useState } from "react";
import SelectAssignment from "./SelectAssignment";
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


export default SubmitedFiles



