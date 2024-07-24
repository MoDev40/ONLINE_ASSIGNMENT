"use client"
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { useDeleteRoomMutation, useLeaveRoomMutation } from '@/lib/features/roomSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Route } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'


type LeaveRoomFormProps = {
    user_id: string;
    room_id: string;
    action:string;
}

const LeaveOrDeleteRoomForm = ({ user_id,room_id,action }: LeaveRoomFormProps) => {
    const formSchema = z.object({
        code: z.string()
        .max(6, {
        message: `Write ${action} to proceed.`})
        .min(5, {
        message: `Write ${action} to proceed.`}),
    })

    type Inputs = z.infer<typeof formSchema>

    const [ leaveRoom,{ isLoading }] = useLeaveRoomMutation()
    const [ deleteClass,{ isLoading:DeleteLoad }] = useDeleteRoomMutation()

    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            code: "",
        }
    })
    
    const router = useRouter()

    const  onSubmit : SubmitHandler<Inputs>  = async(data) => {
        const { code } = data;

        if(code === "Delete" && action === "Delete"){

            await deleteClass({roomId:room_id,teacherId:user_id}).unwrap()
            .then(() => {
                toast.success("Room Deleted successfully")
                router.push("/teacher-classes")
                form.reset()
            }).catch(() => {
                toast.error("Unable to leave room")
            });           
            
            return
        }else if (code === "Leave" && action === "Leave"){

            await leaveRoom({ student_id:user_id,roomId:room_id }).unwrap()
            .then(() => {
                toast.success("Room leaved successfully")
                router.push("/student-classes")
                form.reset()
            }).catch(() => {
                toast.error("Unable to leave room")
            });   

            return
        }else{
            toast.error(`Invalid: Write ${action} to proceed`)
            return
        }
    }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
            <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
                <FormItem>
                <FormLabel/>
                <FormControl>
                <Input  type="text" {...field} placeholder={`Write ${action} to proceed`}/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button className='w-24' disabled={isLoading || DeleteLoad} type="submit" >{isLoading || DeleteLoad ? <Loader2 className="animate-spin"/> : `${action}`}</Button>
    </form>
    </Form>  
    )
}

export default LeaveOrDeleteRoomForm