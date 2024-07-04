import AssignmentAndSubmitPage from "@/components/_component/main/student/AssignmentAndSubmitPage";

type Params = {
  id: string[];
  c_id:string;
}
function StudentClassAssignment({ params }:{ params : Params }) {
  return (
    <AssignmentAndSubmitPage assignment_id={params.id[0]} student_id={params.c_id} classroom_id={params.id[1]} />
  )
}

export default StudentClassAssignment