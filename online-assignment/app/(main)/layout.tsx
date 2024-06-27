"use client"
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { Home, Menu, UserCircle } from "lucide-react"
import Link from "next/link"
import React from 'react'

function Layout({ children }:{children:React.ReactNode}) {
  return (
    <div>
      <SignedOut>
        <div className='text-center items-center'>
          <Link href="/auth/sign-in">Login</Link>
        </div>
      </SignedOut>
      <SignedIn>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
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
                    href='/'
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Home />
                    <span className="sr-only">Classes</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Classes</TooltipContent>
            </Tooltip>
        </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
              <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href='/profile'
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <UserCircle />
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
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Menu/>
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
            <Link href="/" className="flex flex-row space-x-3 items-center" >
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
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex flex-1 items-start  p-4 sm:px-6 sm:py-0 flex-col">
          {children}
        </main>
      </div>
      </div>
      </SignedIn>
    </div>
  )
}

export default Layout