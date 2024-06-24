"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="flex flex-col justify-between gap-4 ">
        <section className="flex flex-row justify-between items-center">
          <Link href='/'><h1 className="text-2xl font-black">EDP</h1></Link>
          <ul className="flex flex-row items-center space-x-4">
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
                  <Link href='/auth/sign-in'><Button className="px-5">Login</Button></Link>
              </SignedOut>
            </li>
          </ul>
        </section>
    </div>
  )
}

export default Navbar