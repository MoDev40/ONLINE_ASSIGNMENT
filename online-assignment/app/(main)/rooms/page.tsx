import RoomsCard from "@/components/_component/main/rooms/RoomsCard"
import { auth } from "@clerk/nextjs/server";

function RoomsPage() {
  const { userId } : { userId: string | null } = auth();
  return (
    <RoomsCard userId={userId as string}/>
  )
}

export default RoomsPage