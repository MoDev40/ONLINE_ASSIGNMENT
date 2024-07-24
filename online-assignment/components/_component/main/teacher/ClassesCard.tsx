"use client"
import { useGetRoomsQuery } from "@/lib/features/roomSlice"
import { useGetUserQuery } from "@/lib/features/userSlice"
import useScroll from "@/lib/scroll"
import Link from "next/link"
import Loading from "../../Loading"
import ClassCard from "./ClassCard"
import CreateRoomDialog from "./CreateRoomDialog"

const ClassesCard = ({ userId }:{ userId:string })=> {
    const { data:user,isLoading } = useGetUserQuery(userId)
    const { data:rooms,isFetching } = useGetRoomsQuery(user?.id as string)
    const scrolled = useScroll(50)
    if(isLoading || isFetching) return <div className="container mx-auto"><Loading/></div>

    return(
        <div className="flex flex-col my-14 justify-center">
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
                <CreateRoomDialog teacherId={user?.id as string}/>
            </section>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 container mx-auto xl:grid-cols-4 mt-6 lg:grid-cols-3">
                {   rooms&&
                    rooms.map((room)=>(
                        <ClassCard key={room.id} room={room}/>
                    ))
                }
            </div>

        </div>
    )
}

export default ClassesCard
