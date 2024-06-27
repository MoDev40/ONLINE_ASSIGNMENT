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
import { useCreateRoomMutation } from "@/lib/features/roomSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, PlusCircle, PlusIcon } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const formSchema = z.object({
    name: z.string().min(2, {
    message: "name must be at least 2 characters.",
    }),
})

type Inputs = z.infer<typeof formSchema>

type CreateRoomDialogProps = {
    teacherId: string;
}
function CreateRoomDialog({ teacherId }: CreateRoomDialogProps) {
    const [createRoom,{ isLoading }] = useCreateRoomMutation()
    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: "",
        }
    })

    const  onSubmit : SubmitHandler<Inputs>  = async(data) => {
        const { name } = data
        await createRoom({teacherId,room:{ name }}).unwrap()
        .then(() => {
            toast.success("Room created successfully")
            form.reset()
        }).catch(() => {
            toast.error("Unable to create room")
        });
    }

    return (
        <Dialog>
          <DialogTrigger asChild>
          <PlusCircle size={25}/>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create room</DialogTitle>
            </DialogHeader>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid flex-1 gap-2 space-y-4">
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
                        <Button type="submit" className="w-full">{isLoading ? <Loader2 className="animate-spin"/> : "Save"}</Button>
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

export default CreateRoomDialog