"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUpdateRoomMutation } from "@/lib/features/roomSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { FolderPen, Loader2 } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const formSchema = z.object({
    name: z.string().min(2, {
    message: "name must be at least 2 characters.",
    }),
})

type Inputs = z.infer<typeof formSchema>

type UpdateRoomDialogProps = {
    room_id: string;
    room:ClassRoom;
}
function UpdateRoom({ room_id,room }: UpdateRoomDialogProps) {
    const [ updateRoom,{ isLoading }] = useUpdateRoomMutation()

    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:room.name,
        }
    })


    const  onSubmit : SubmitHandler<Inputs>  = async(data) => {
        await updateRoom({room_id,data}).unwrap()
        .then(() => {
            toast.success("Room updated successfully")
            form.reset()
        }).catch(() => {
            toast.error("Unable to update room")
        });
    }

    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
                <FolderPen/>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update room</DialogTitle>
            </DialogHeader>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid flex-1 gap-2 space-y-4">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel/>
                            <FormControl>
                                <Input type="text" placeholder="name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full">{isLoading ? <Loader2 className="animate-spin"/> : "update"}</Button>
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

export default UpdateRoom