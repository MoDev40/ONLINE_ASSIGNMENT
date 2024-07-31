"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
  

const ProfileAlertDialog = () => {
    const router = useRouter()
  return (
    <AlertDialog defaultOpen>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>Complete your profile</AlertDialogTitle>
        <AlertDialogDescription>
            Please complete your profile information to continue.
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel onClick={()=>{
            router.push("/")
        }}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={()=>{
            router.push("/profile")
        }}>Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  )
}

export default ProfileAlertDialog