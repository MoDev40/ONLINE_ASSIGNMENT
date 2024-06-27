"use client"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useGetUserQuery } from "@/lib/features/userSlice"
import { UserButton } from "@clerk/nextjs"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { File, Home, Settings2, UserCircle, UsersIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type DeskNavProps = {
    userId: string;
}

const DeskNav = ({ userId }:DeskNavProps) => {
    const { data:user,isLoading,isFetching } = useGetUserQuery(userId)
    const pathName = usePathname()
    
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
                href={user?.role === "student" ? "/student-rooms" : "/rooms"}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <UsersIcon/>
                <span className="sr-only">Classes</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Classes</TooltipContent>
        </Tooltip>
        {
          pathName !== "/rooms" && pathName !== "/profile" &&
          <>
            <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href=""
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <File/>
                <span className="sr-only">Assignments</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Assignments</TooltipContent>
            </Tooltip>
            <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href=""
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings2/>
                <span className="sr-only">Setting</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Setting</TooltipContent>
            </Tooltip>
          </>
        }
    </nav>
    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <Tooltip>
                <TooltipTrigger asChild>
                  <Link href='/profile'
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <UserCircle/>
                    <span className="sr-only">Profile</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Profile</TooltipContent>
            </Tooltip>
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