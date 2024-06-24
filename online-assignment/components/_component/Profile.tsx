"use client"
import { useGetUserQuery } from "@/lib/features/userSlice";
import ProfileHeader from "./ProfileHeader";
import Loading from "./Loading";

type ProfileProps = {
  id:string;
}
const Profile = ({ id }:ProfileProps) => {
    const {data:user,isFetching} = useGetUserQuery(id)
  return (          
    isFetching ? <Loading/>: (
    <div className="flex flex-col justify-center h-screen container mx-auto">
      <section>
      <ProfileHeader user={user!}/>
      </section>
    </div>
    )
  )
}

export default Profile