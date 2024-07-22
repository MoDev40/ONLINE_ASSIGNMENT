"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteServerFileMutation, useDeleteSubmittedFileMutation } from "@/lib/features/roomSlice";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

type DeleteSubmittedFileProps = {
    id:string;
    fileKey:string;
    student_id:string;
}
const DeleteSubmittedFile = ({ fileKey,id,student_id }:DeleteSubmittedFileProps) => {
    const [deleteServerFile,{ isLoading }] = useDeleteServerFileMutation()
    const [deleteSubmittedFile,{ isLoading:load }] = useDeleteSubmittedFileMutation()
    async function handleDelete() {
        await deleteSubmittedFile({ student_id,fileId:id }).unwrap().then(async(res)=>{
            await deleteServerFile(res.fileKey).unwrap().then(()=>{
                toast.success("Successfully")
            })
        })
    }
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
        <Button disabled={isLoading || load } variant="ghost" size="icon">
            <Trash2 className="w-4 h-4" />
        </Button>    
    </AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
            This action cannot be undone. It will permanently student submission files from our servers.
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={()=>{
            toast.promise(handleDelete(),
            {
                loading: 'deleing...',
                success: <b>success.</b>,
                error: <b>error.</b>,
            })
        }}>Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteSubmittedFile