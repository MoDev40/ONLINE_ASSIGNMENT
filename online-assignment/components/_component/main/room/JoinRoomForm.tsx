"use client"
import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useJoinRoomMutation } from '@/lib/features/roomSlice'
import toast from 'react-hot-toast'

const formSchema = z.object({
    joinCode: z.string()
    .max(6, {
    message: "joinCode must be at least 6 characters."})
    .min(6, {
    message: "joinCode must be at least 6 characters."}),
})

type Inputs = z.infer<typeof formSchema>

type JoinRoomFormProps = {
    student_id: string
}

const JoinRoomForm = ({ student_id }: JoinRoomFormProps) => {
    const [joinRoom,{ isLoading }] = useJoinRoomMutation()
    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            joinCode: "",
        }
    })

    const  onSubmit : SubmitHandler<Inputs>  = async(data) => {
        await joinRoom({ student_id,data }).unwrap()
        .then(() => {
            toast.success("Room joined successfully")
            form.reset()
        }).catch(() => {
            toast.error("Unable to joined room")
        });
    }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="gap-2 space-y-4">
            <FormField
            control={form.control}
            name="joinCode"
            render={({ field }) => (
                <FormItem>
                <FormLabel/>
                <FormControl>
                    <Input type="text" placeholder="joinCode" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" className="w-full">{isLoading ? <Loader2 className="animate-spin"/> : "join"}</Button>
    </form>
    </Form>  
    )
}

export default JoinRoomForm