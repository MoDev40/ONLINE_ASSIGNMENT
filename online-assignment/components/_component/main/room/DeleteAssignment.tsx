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
import { useDeleteAssignmentMutation } from "@/lib/features/roomSlice";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
  
type DeleteAssignmentProps = {
    teacher_id: string;
    assignment_id: string;
    classroom_id: string;
}
const DeleteAssignment = (props:DeleteAssignmentProps) => {
    const [deleteAssignment] = useDeleteAssignmentMutation()
    async function handleDelete() {
        await deleteAssignment(props)
    }

  return (
    <AlertDialog>
    <AlertDialogTrigger>
        <Trash2 size={20}/>
    </AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
            This action cannot be undone. It will permanently delete your assignment files 
            and remove student submission data from our servers
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

export default DeleteAssignment