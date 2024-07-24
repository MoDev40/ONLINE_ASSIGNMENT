import ClassesCard from "@/components/_component/main/teacher/ClassesCard";
import { auth } from "@clerk/nextjs/server";

function Classes() {
  const { userId } : { userId: string | null } = auth();
  return (
    <ClassesCard userId={userId as string}/>
  )
}

export default Classes