"use client"
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
  
  if(user?.role === "student"){
    window.location.pathname = "/"
    return null;
  }

  return (
    <Card className="flex flex-row gap-3 shadow-sm p-5 w-full">
      <AssignmentList room_id={room_id} teacher_id={user?.id as string}/>
      <Separator orientation="vertical"/>
      <CreateAssignment room_id={room_id} user_id={user?.id as string}/>
    </Card>
  )
}

export default AssignmentPageCard