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
import { useLeaveRoomMutation } from '@/lib/features/roomSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Route } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const formSchema = z.object({
    leaveCode: z.string()
    .max(5, {
    message: "Write Leave to proceed."})
    .min(5, {
    message: "Write Leave to proceed."}),
})

type Inputs = z.infer<typeof formSchema>

type LeaveRoomFormProps = {
    student_id: string;
    room_id: string;
}

const LeaveRoomForm = ({ student_id,room_id }: LeaveRoomFormProps) => {
    const [ leaveRoom,{ isLoading }] = useLeaveRoomMutation()
    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            leaveCode: "",
        }
    })
    
    const router = useRouter()

    const  onSubmit : SubmitHandler<Inputs>  = async(data) => {
        const { leaveCode } = data;
        // Check if Write Leave is entered correctly
        if(leaveCode !== "Leave"){
            toast.error("Invalid Write Leave to proceed")
            return
        }

        await leaveRoom({ student_id,roomId:room_id }).unwrap()
        .then(() => {
            toast.success("Room leaved successfully")
            router.push("/student-classes")
            form.reset()
        }).catch(() => {
            toast.error("Unable to leave room")
        });
    }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
            <FormField
            control={form.control}
            name="leaveCode"
            render={({ field }) => (
                <FormItem>
                <FormLabel/>
                <FormControl>
                <Input  type="text" {...field} placeholder='Write Leave to proceed'/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button className='w-24' type="submit" >{isLoading ? <Loader2 className="animate-spin"/> : "Leave"}</Button>
    </form>
    </Form>  
    )
}

export default LeaveRoomForm