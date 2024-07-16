"use client"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useGetUserQuery } from "@/lib/features/userSlice"
import { UserButton } from "@clerk/nextjs"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { File, Folder, Home, Settings2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

type DeskNavProps = {
    userId: string;
}

const DeskNav = ({ userId }:DeskNavProps) => {
    const { data:user } = useGetUserQuery(userId)
    const params = useParams()   
  return (
    <TooltipProvider>
    <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
      <Link
        href="/"
      >
        <h1 className='font-black'>EDP</h1>
      </Link>
        <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='/'
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Home />
                <span className="sr-only">Home</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Home</TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={user&& user?.role === "student" ? "/student-classes" : "/teacher-classes"}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Folder/>
                <span className="sr-only">Classes</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Classes</TooltipContent>
        </Tooltip>
            <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={user&& user.role === "student" ? `/student-classes/${ params.c_id }/submitedfiles` : `/teacher-classes/${params.t_c_id}/assignments`}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <File/>
                <span className="sr-only">{user&& user.role === "student" ? "submitedfiles" :"Assignments"}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{user&& user.role === "student" ? "submitedfiles" :"Assignments"}</TooltipContent>
            </Tooltip>
            <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={user&& user.role === "student" ? `/student-classes/${params.c_id}/setting` : `/teacher-classes/${params.t_c_id}/setting`}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings2/>
                <span className="sr-only">Setting</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Setting</TooltipContent>
            </Tooltip>
    </nav>
    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
            <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <UserButton afterSignOutUrl="/"/>
                    <span className="sr-only">Account</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">Account</TooltipContent>
            </Tooltip>
    </nav>
    </TooltipProvider>
  )
}

export default DeskNav