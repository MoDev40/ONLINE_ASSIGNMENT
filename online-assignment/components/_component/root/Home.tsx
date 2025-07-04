"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Home = () => {
  return (
    <div className='flex flex-col h-screen text-center gap-4 items-center justify-center'>
        <section>
            <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>Online Assignments</h1>
            <p className='text-xl font-light'>A simple way to manage your assignments</p>
        </section>
        <section className='flex flex-row items-center'>
            <Link href='/auth/sign-in'>
            <Button className='rounded-r-none'>Start</Button>
            </Link>
            <Button variant="outline" className='rounded-l-none'>Demo</Button>
        </section>
    </div>
  )
}

export default Home