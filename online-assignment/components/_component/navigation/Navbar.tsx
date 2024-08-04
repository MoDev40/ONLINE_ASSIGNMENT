"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetUserQuery } from "@/lib/features/userSlice"
import useScroll from "@/lib/scroll"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"

type NavbarProps = {
  userId:string;
}

const Navbar = ({ userId }:NavbarProps) => {
  const scrolled = useScroll(50);
  const { data:user,isLoading,isFetching } = useGetUserQuery(userId)

  if(isLoading || isFetching) {
    return(
    <section className="flex flex-row container p-4 mx-auto justify-between items-center">
      <Skeleton className="w-24 h-8 rounded-md animate-pulse" /> 
      <ul className="flex flex-row items-center space-x-4">
        <Skeleton className="w-20 hidden lg:inline h-6 rounded-md animate-pulse" />
        <Skeleton className="w-20 h-6 rounded-md animate-pulse" />
        <Skeleton className=" w-20 rounded-md h-6  animate-pulse" />
      </ul>
    </section>
    )
  }
  return (
    <div
      className={`fixed top-0 w-full flex flex-col p-4 justify-between ${
      scrolled
        ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
        : "bg-white/0"
      } z-30 transition-all`}
      >
        <section className="flex flex-row justify-between items-center">
          <Link href='/'>
            <h1 className="relative flex flex-row items-baseline text-2xl font-bold"><span className="sr-only">EDP</span><span className="tracking-tight hover:cursor-pointer">ED<span className="text-primary">P</span></span><sup className="absolute left-[calc(100%+.1rem)] top-0 text-xs font-bold text-black">[BETA]</sup></h1>
          </Link>
          <ul className="flex flex-row items-center space-x-4">
            <li>
              <SignedIn>
                <Label>
                  <Link href={user?.role === "student" ? "/student-classes" : "/teacher-classes"}>Classes</Link>
                </Label>
              </SignedIn>
            </li>
            <li>
              <SignedIn>
                <Label>
                  <Link href="/profile">Profile</Link>
                </Label>
              </SignedIn>
            </li>
            <li>
              <SignedIn>
                <UserButton/>
              </SignedIn>
            </li>
            <li>
              <SignedOut>
                  <Link href='/auth/sign-in'><Button size="sm" className="px-5">Login</Button></Link>
              </SignedOut>
            </li>
          </ul>
        </section>
    </div>
  )
}

export default Navbar