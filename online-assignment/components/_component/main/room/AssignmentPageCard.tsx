"use client"
import { useGetUserQuery } from "@/lib/features/userSlice";
import AssignmentList from "./AssignmentList"
import CreateAssignment from "./CreateAssignment"
import Loading from "../../Loading";

type PageCardProps = {
  room_id:string;
  user_id:string;
}

const AssignmentPageCard = ({ room_id, user_id }:PageCardProps) => {
  const {data:user, isLoading,isFetching} = useGetUserQuery(user_id);
  
  if(isLoading || isFetching) return <div className="container mx-auto"><Loading /></div>
  
  if(user?.role === "student"){
    window.location.pathname = "/"
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <AssignmentList/>
      <CreateAssignment room_id={room_id} user_id={user?.id as string}/>
    </div>
  )
}

export default AssignmentPageCard