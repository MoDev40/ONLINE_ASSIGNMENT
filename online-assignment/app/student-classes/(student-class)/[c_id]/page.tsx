import AssignmentsLists from "@/components/_component/main/student/AssignmentsLists"
import { auth } from "@clerk/nextjs/server";

function StudentClass({ params }:{ params : RouteParams }) {
  const { c_id } = params;
  const { userId } : { userId: string | null } = auth();

  return (
    <AssignmentsLists room_id={c_id} student_id={userId as string} />
  )
}

export default StudentClass