"use client"
import { useGetStudentRoomsQuery } from '@/lib/features/roomSlice'
import { useGetUserQuery } from '@/lib/features/userSlice'
import Loading from '../../Loading'
import JoinRoomForm from '../room/JoinRoomForm'
import StudentClassCard from './StudentClassCard'

const StudentClassesCard = ({ userId }:{ userId:string }) => {
    const { data:user,isLoading } = useGetUserQuery(userId)
    const { data:studentClasses,isFetching } = useGetStudentRoomsQuery(user?.id as string)

    if(isLoading || isFetching) return <div className="container mx-auto"><Loading/></div>
    
    if(user?.role === "teacher") {
        window.location.pathname = "/"
        return null
    }
    
    return(
        <div className="flex flex-col container mx-auto">
            <JoinRoomForm student_id={user?.id as string}/>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 container mx-auto xl:grid-cols-4 mt-6 lg:grid-cols-3">
                {   studentClasses&&
                    studentClasses.map((room)=>(
                        <StudentClassCard key={room.id} room={room} />
                    ))
                }
            </div>

        </div>
    )
}

export default StudentClassesCard