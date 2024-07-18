"use client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useGetUserQuery } from "@/lib/features/userSlice"
import { UserButton } from "@clerk/nextjs"
import { File, FolderTree, Home, Menu, Settings2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

type MobileNavProps = {
    userId: string;
}
const MobileNav = ({ userId }:MobileNavProps) => {
    const { data:user } = useGetUserQuery(userId)
    const params = useParams()   

  return (
    <Sheet>
    <SheetTrigger asChild>
      <Button size="icon" variant="outline" className="sm:hidden">
        <Menu/>
        <span className="sr-only">Menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="sm:max-w-xs">
      <nav className="grid gap-6 text-lg font-medium">
    <Link 
        href={user&& user.role === "student" ? `/student-classes/${ params.c_id }` : `/teacher-classes/${params.t_c_id}`}
        className="flex flex-row space-x-3 items-center" >
      <h3 className="text-rose-600 text-xl font-black">EDP</h3>
    </Link>
      <ul className="flex flex-col space-y-5">
            <li>
              <Link
              href="/"
              className="flex flex-row items-center space-x-4"
              >
              <Home/>
              <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
              href={user&& user?.role === "student" ? "/student-classes" : "/teacher-classes"}
              className="flex flex-row items-center space-x-4"
              >
              <FolderTree/>
              <span>Classes</span>
              </Link>
            </li>
            <li>
              <Link
              href={user&& user.role === "student" ? `/student-classes/${ params.c_id }/submitedfiles` : `/teacher-classes/${params.t_c_id}/assignments`}
              className="flex flex-row items-center space-x-4"
              >
                <File/>
                <span>{user&& user.role === "student" ? "submitedfiles" :"Assignments"}</span>
              </Link>        
            </li>
            <li>

              <Link
              href={user&& user.role === "student" ? `/student-classes/${params.c_id}/setting` : `/teacher-classes/${params.t_c_id}/setting`}
              className="flex flex-row items-center space-x-4"
              >
                <Settings2/>
                <span>Setting</span>
              </Link>
            </li>
            <li>
              <UserButton showName afterSignOutUrl="/"/>
            </li>
        </ul>
      </nav>
    </SheetContent>
  </Sheet>
  )
}

export default MobileNav