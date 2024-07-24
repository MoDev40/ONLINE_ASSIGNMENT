import DeskNav from '@/components/_component/navigation/DeskNav'
import MobileNav from '@/components/_component/navigation/MobileNav'
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { auth } from '@clerk/nextjs/server'
import Link from "next/link"
import React from 'react'

function Layout({ children }:{children:React.ReactNode}) {
  const { userId } : { userId: string | null } = auth();
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
        <DeskNav userId={userId as string}/>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
         <MobileNav userId={userId as string}/>
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