"use client"
import { useCompleteSingUpMutation, useGetUserQuery } from "@/lib/features/userSlice"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import CompleteRegisterForm from "./CompleteRegisterForm"
import Loading from "./Loading"
import RoleSelection from "./RoleSelection"


type CompleteSignUpProps = {
  id:string | undefined;
}

const  CompleteSignUp = ({ id }:CompleteSignUpProps) => {
  const { data:user,isFetching } = useGetUserQuery(id as string)
  const [role, setRole] = useState<string>("student")
  const [ completeSignUp,{ isLoading }] = useCompleteSingUpMutation()

  const handleForm = async () =>{
    const userData = { idCard:"", name:"", role, className:"" }
    await completeSignUp({id:user?.id!, userData}).unwrap().then(()=>{
      toast.success("Sign up completed successfully")
      window.location.pathname = "/"
    }).catch(()=>{
      toast.error("Failed try again")
    })
  }
  return (
  <div className="flex flex-col justify-center h-screen container mx-auto">
    {
      isFetching ? <Loading/> : (
      <Card>
        <CardHeader>
          <CardTitle>Complete Sign Up</CardTitle>
          <CardDescription>Please complete your sign up to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <RoleSelection setRole={setRole} role={role}/>
            <CompleteRegisterForm user={user!} role={role}/>
            {
              role === "teacher"&&
              <Button onClick={handleForm}>{isLoading ? <Loader2 className=" animate-spin"/>:"Save"}</Button>
            }  
        </CardContent>
     </Card>
     )}
  </div>
  )
}
export default CompleteSignUp