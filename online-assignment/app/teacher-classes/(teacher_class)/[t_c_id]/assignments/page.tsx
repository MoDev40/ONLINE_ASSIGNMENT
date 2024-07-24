import AssignmentPageCard from "@/components/_component/main/class/AssignmentPageCard";
import { auth } from "@clerk/nextjs/server";

function AssignmentsPage({ params }:{ params:RouteParams}) {
  const { t_c_id } = params
  const { userId } : { userId: string | null } = auth();
  return (
    <AssignmentPageCard room_id={t_c_id} user_id={userId as string}/>
  )
}

export default AssignmentsPage

