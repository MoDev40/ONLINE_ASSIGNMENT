"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="flex flex-col justify-between gap-4 ">
        <section className="flex flex-row justify-between items-center">
          <Link href='/'><h1 className="text-2xl font-black">EDP</h1></Link>
          <ul className="flex flex-row justify-between gap-4 space-x-4">
              <li>
              <Link href='/sign-in'><Button className="px-5 ">Login</Button></Link>
              </li>
          </ul>
        </section>
    </div>
  )
}

export default Navbar