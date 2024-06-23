"use client"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="flex flex-col justify-between gap-4 ">
        <section className="flex flex-row justify-between items-center">
          <Link href='/'><h1 className="text-2xl font-black">EDP</h1></Link>
          <ul className="flex flex-row justify-between gap-4 space-x-4">
              <li>
            <SignedIn>
              <UserButton/>
            </SignedIn>
            <SignedOut>
              <Link href='/auth/sign-in'><Button className="px-5 ">Login</Button></Link>
            </SignedOut>
              </li>
          </ul>
        </section>
    </div>
  )
}

export default Navbar