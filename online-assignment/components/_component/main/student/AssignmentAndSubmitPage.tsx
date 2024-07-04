"use client"

import { Suspense } from "react";
import Assignment from "../room/Assignment";
import Loading from "../../Loading";
import SubmitForm from "./SubmitForm";

type AssignmentAndSubmitPageProps = {
    assignment_id:string;
    student_id:string;
    classroom_id:string;
}

const AssignmentAndSubmitPage = ({ student_id,assignment_id,classroom_id }:AssignmentAndSubmitPageProps) => {

  return (
    <div className="w-full flex flex-col gap-4 md:flex-row">
        <Suspense fallback={<Loading/>}>
            <Assignment assignment_id={assignment_id} />
        </Suspense>
        <SubmitForm
            student_id={student_id}
            assignment_id={assignment_id}
            classroom_id={classroom_id}
        />
    </div>
  )
}

export default AssignmentAndSubmitPage