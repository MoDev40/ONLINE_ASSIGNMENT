"use client"
import { useCompleteSingUpMutation, useGetUserQuery } from "@/lib/features/userSlice"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import Loading from "./Loading"
import RoleSelection from "./RoleSelection"
import { useRouter } from "next/navigation"


const schema = z.object({
  idCard:z.string({
    required_error:"ID card must 4 be character."
  }),
  name:z.string({
    required_error:"Name must 2 be character."
  }),
  className:z.string({
    required_error:"className must 2 be character."
  }),
  
})


function isEmpty ( id:string,name:string,className:string ) : boolean {
  return id === '' && name === '' && className === ''
}

type Inputs = z.infer<typeof schema>

function CompleteSignUp({ id }:{ id:string }) {
  const { data:user,isFetching } = useGetUserQuery(id)
  const [role, setRole] = useState<string>("student")

  const [ completeSignUp,{ isLoading,isError }] = useCompleteSingUpMutation()
  const form = useForm<Inputs>({
    resolver:zodResolver(schema)
  })
  const onSubmit : SubmitHandler<Inputs> = async(data) => {
    const {idCard,name , className} = data
    if(role === "student" && isEmpty(idCard,name,className)){
      toast.error("Student must enter id & name ")
      return
    }
    const userData = { idCard, name, role,className }
    console.log(userData)
    await completeSignUp({id:user?.id!, userData}).unwrap().then(()=>{
      toast.success("Sign up successfully")
      form.reset()
    }).catch(()=>{
      toast.error("Failed try again")
    })
  }

  const router = useRouter()
  return (
  isFetching ? ( <Loading/>) : (
  user&&
  user?.name && user?.idCard && user.className || user?.role === "teacher" ? router.push("/") :
  <div className="flex flex-col justify-center h-screen container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Complete Sign Up</CardTitle>
          <CardDescription>Please complete your sign up to continue</CardDescription>
        </CardHeader>
        <CardContent>          
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn(
          "flex flex-col gap-4"
        )}>
        <RoleSelection role={user?.role!} setRole={setRole}/>
        { user&&
          role === "student" && 
          <>
          <FormField
            control={form.control}
            name="name"
            defaultValue={user?.name! || ""}
            render={({ field }) =>(
              <FormItem>
              <FormLabel/>
              <FormControl>
                <Input type="text" {...field} placeholder="Your name"/>
              </FormControl>
              <FormMessage />
              </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name="className"
            defaultValue={user?.className! || ""}
            render={({ field }) =>(
              <FormItem>
              <FormLabel/>
              <FormControl>
                <Input type="text" {...field} placeholder="Your classname"/>
              </FormControl>
              <FormMessage />
              </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name="idCard"
            defaultValue={user?.idCard! || ""}
            render={({ field }) =>(
              <FormItem>
              <FormLabel/>
              <FormControl>
                <Input type="text" {...field} placeholder="Your id"/>
              </FormControl>
              <FormMessage />
              </FormItem>
            )}
            />
            </>
          }
          <Button>{isLoading ? "Loading...":"Submit"}</Button>
        </form>
        </Form>
        </CardContent>
     </Card>
  </div>
  )
)}

export default CompleteSignUp