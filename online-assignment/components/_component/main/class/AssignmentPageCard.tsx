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
    <div className="grid grid-cols-1  md:grid-cols-2 gap-4 w-full">
        <div className="md:shadow-md md:rounded-md md:bg-white md:p-5">
          <AssignmentList room_id={room_id} user_id={user.id} />
        </div>
        <div className="shadow-md rounded-md bg-white p-5">
          <CreateAssignment room_id={room_id} user_id={user?.id as string}/>
        </div>
    </div>
  )
}

export default AssignmentPageCard