"use client"

import { useCompleteSingUpMutation } from "@/lib/features/userSlice";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";

type FormProps = {
    user:UserData;
    role:string;
}

const schema = z.object({
  idCard:z.string({
    required_error:"ID card must 4 be character."
  }).min(4),
  name:z.string({
    required_error:"Name must 2 be character."
  }).min(3),
  className:z.string({
    required_error:"className must 2 be character."
  }).min(3),
  
})

type Inputs = z.infer<typeof schema>

const CompleteRegisterForm = ({ user , role } : FormProps) => {
  const [ completeSignUp,{ isLoading }] = useCompleteSingUpMutation()
  const form = useForm<Inputs>({
    resolver:zodResolver(schema)
  })

  const onSubmit : SubmitHandler<Inputs> = async(data) => {

    const {idCard,name , className} = data
    
    const userData = { idCard, name, role, className }
    
    await completeSignUp({id:user?.id!, userData}).unwrap().then(()=>{
      toast.success("Successfully Updated")
      form.reset()
    }).catch(()=>{
      toast.error("Failed try again")
    })
    
  }
  
  if(role !== "student"){
    return null
  }
    
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className={cn(
      "flex flex-col gap-4"
    )}>
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
      <Button type="submit">{isLoading ? <Loader2 className=" animate-spin"/>:"Update"}</Button>
    </form>
    </Form>
  )
}

export default CompleteRegisterForm