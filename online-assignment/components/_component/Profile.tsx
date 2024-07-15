"use client"
import { useGetUserQuery } from "@/lib/features/userSlice";
import { Card } from "../ui/card";
import CompleteRegisterForm from "./CompleteRegisterForm";
import Loading from "./Loading";
import ProfileHeader from "./ProfileHeader";

type ProfileProps = {
  id:string;
}
const Profile = ({ id }:ProfileProps) => {
    const {data:user,isFetching} = useGetUserQuery(id)
  return (          
    isFetching ? <Loading/>: (
    <div className="flex flex-col my-24 md:my-0 justify-center h-screen container mx-auto">
      <section>
      <ProfileHeader user={user!}/>
      </section>
      <Card className="p-5 rounded-t-none shadow-sm">
        <CompleteRegisterForm role={user?.role!} user={user!}/>
      </Card>
    </div>
    )
  )
}

export default Profile