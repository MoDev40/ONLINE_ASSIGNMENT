"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useAddAssignmentMutation } from "@/lib/features/roomSlice";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { string, z } from "zod";
import FileUpload from "../../media-upload/FileUpload";
import Loader from "../../Loader";

type CreateAssignmentProps = {
    room_id:string;
    user_id:string;
}

const formSchema = z.object({
    title:z.string().min(3,{
        message: "Title must be at least 3 characters."
    }),
    description: z.string().optional(),
    dueDate: z.date({
        required_error:"Please specify due date"
    }),
    fileUrl:string().min(1,{
        message: "File URL is required upload file."
    }),
})

type Inputs = z.infer<typeof formSchema>

const CreateAssignment = ({ room_id,user_id }:CreateAssignmentProps) => {
    const [add,{ isLoading }] = useAddAssignmentMutation()
    const [fileKey,setFileKey] = useState<string | undefined>()
    const form = useForm<Inputs>({
      resolver: zodResolver(formSchema),
      defaultValues:{
        title: "",
        description: "",
        fileUrl: "",
      }
  })

    const onSubmit : SubmitHandler<Inputs> = async (data) => {
        const { fileUrl,dueDate,description,title }  = data;

        if(!fileKey){
          toast.error("Please upload a file")
          return;
        }

        const assignment : Assignment = {
          title,
          description,
          dueDate,
          fileUrl,
          fileKey
        }
        await add({room_id,teacher_id:user_id,assignment}).unwrap()
        .then(() =>{
          toast.success("Assignment created successfully")
          form.reset()
          setFileKey(undefined)
        }).catch(() =>{
          toast.error("Failed to create assignment")
        })
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
            <FormField
            control={form.control}
            name="title"
            rules={ { required: true } }
            render={({ field })=>(
                <FormItem>
                    <FormLabel/>
                    <FormControl>
                        <Input {...field} type="text" placeholder="title" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="dueDate"
            rules={ { required: true } }
            render={({ field })=>(
            <FormItem className="flex flex-col">
              <FormLabel/>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      type="button"
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a due date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="description"
            render={({ field })=>(
                <FormItem>
                    <FormLabel/>
                    <FormControl>
                        <Textarea {...field}  placeholder="description" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="fileUrl"
            rules={ { required: true } }
            render={({ field })=>(
                <FormItem>
                    <FormLabel/>
                    <FormControl>
                        <FileUpload 
                        setFileKey={setFileKey} 
                        onValueChange={field.onChange}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <Button disabled={isLoading} type="submit">{ isLoading ? <Loader/> : "Save"}</Button>
        </form>
    </Form>
  )
}

export default CreateAssignment