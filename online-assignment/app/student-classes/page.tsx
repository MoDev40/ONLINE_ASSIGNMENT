import StudentClassesCard from "@/components/_component/main/student/StudentClassesCard";
import { auth } from "@clerk/nextjs/server";

function StudentClasses() {
  const { userId } : { userId: string | null } = auth();
  return (
    <StudentClassesCard userId={userId as string} />
  )
}

export default StudentClasses