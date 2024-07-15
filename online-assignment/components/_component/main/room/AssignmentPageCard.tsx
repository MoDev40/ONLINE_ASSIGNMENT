"use client"
import { useGetUserQuery } from "@/lib/features/userSlice";
import Loading from "../../Loading";
import AssignmentList from "./AssignmentList";
import CreateAssignment from "./CreateAssignment";

type PageCardProps = {
  room_id:string;
  user_id:string;
}

const AssignmentPageCard = ({ room_id, user_id }:PageCardProps) => {
  const {data:user, isLoading,isFetching} = useGetUserQuery(user_id);
  
  if(isLoading || isFetching) return <div className="container mx-auto"><Loading /></div>
  
  if(user?.role !== "teacher"){
    window.location.pathname = "/"
    return null;
  }

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 gap-3 shadow-sm p-5 w-full">
        <div>
          <AssignmentList room_id={room_id} />
        </div>
        <div>
          <CreateAssignment room_id={room_id} user_id={user?.id as string}/>
        </div>
    </div>
  )
}

export default AssignmentPageCard