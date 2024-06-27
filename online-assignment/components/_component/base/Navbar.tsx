"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import useScroll from "@/lib/scroll"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"

const Navbar = () => {
  const scrolled = useScroll(50);
  return (
    <div
      className={`fixed top-0 w-full flex flex-col p-4 justify-between ${
      scrolled
        ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
        : "bg-white/0"
      } z-30 transition-all`}
      >
        <section className="flex flex-row justify-between items-center">
          <Link href='/'><h1 className="text-2xl font-black">EDP</h1></Link>
          <ul className="flex flex-row items-center space-x-4">
            <li>
              <SignedIn>
                <Label>
                  <Link href="/rooms">Classes</Link>
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
                  <Link href='/auth/sign-in'><Button className="px-5">Login</Button></Link>
              </SignedOut>
            </li>
          </ul>
        </section>
    </div>
  )
}

export default Navbar