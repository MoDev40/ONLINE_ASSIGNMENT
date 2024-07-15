"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { useJoinRoomMutation } from '@/lib/features/roomSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { FolderPlus, Loader2 } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

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
    <Dialog>
        <DialogTrigger asChild>
        {/* color='#f43f5e' */}
        <FolderPlus size={25} />
        </DialogTrigger>
    <DialogContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid flex-1 gap-2 space-y-4">
                <FormField
                control={form.control}
                name="joinCode"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel/>
                    <FormControl>
                        <Input className='w-full' type="text" placeholder="JoinCode" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button className='w-full' type="submit" >{isLoading ? <Loader2 className="animate-spin"/> : "join"}</Button>
        </form>
        </Form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> 
    </DialogContent>
    </Dialog>
    )
}

export default JoinRoomForm