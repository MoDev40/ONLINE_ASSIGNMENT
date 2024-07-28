"use client"
import { Button } from "@/components/ui/button";
import { useGetUserQuery } from "@/lib/features/userSlice";
import { FilePenLineIcon } from "lucide-react";
import { useState } from "react";
import CompleteRegisterForm from "../auth/CompleteRegisterForm";
import Loading from "../Loading";
import AvatarCard from "./AvatarCard";

type ProfileProps = {
  id:string;
}
const Profile = ({ id }:ProfileProps) => {
    const {data:user,isFetching} = useGetUserQuery(id)
    const [editing, setEditing] = useState(false)
  return (          
    isFetching ? <Loading/>: (
    <div className="flex flex-col justify-center  h-screen items-center container mx-auto">
      <div className="w-full mx-auto p-5 bg-background space-y-4 rounded-lg shadow-lg">
      <div className="flex items-center flex-row  gap-3">
          <AvatarCard fallback={user?.email?.charAt(0).toUpperCase() as string}/>
        { !editing&&
          <div className="grid gap-1">
            <div className="font-semibold text-lg">{user?.name}</div>
            <div className="text-muted-foreground">{user?.email}</div>
          </div>
        }
        { user?.role === "student" &&
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setEditing(!editing)}>
          <FilePenLineIcon className="h-5 w-5" />
          <span className="sr-only">Edit</span>
          </Button>
        }
      </div>
      {editing && (
        <CompleteRegisterForm role="student" user={user!}/>
      )}
      {!editing && user?.role === 'student' && (
        <div className="mt-6 grid gap-4">
          <div className="flex items-center gap-2">
            <div className="text-muted-foreground">Class: {user?.className}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-muted-foreground">ID: {user?.idCard}</div>
          </div>
        </div>
      )}
      </div>
    </div>
    )
  )
}

export default Profile