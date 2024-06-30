"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import LeaveRoomForm from './LeaveRoomForm'
import { useGetUserQuery } from '@/lib/features/userSlice'
import Loading from '../../Loading'

type StudentClassSettingProps = {
  student_id: string;
  room_id: string;
}

const StudentClassSetting = ({ student_id,room_id }:StudentClassSettingProps) => {
  const { data:user , isLoading , isFetching } = useGetUserQuery(student_id as string);

  if(isLoading || isFetching) return <div className="container mx-auto"><Loading/></div>

  if(user?.role === "teacher") {
    window.location.pathname = "/"
    return null
  }

  return (
    <Card
    className={cn("w-full")}
    >
      <CardHeader>
        <CardTitle className="text-red-500 font-black text-2xl">Danger-Zone</CardTitle>
        <CardDescription>Alert: If you leave the class, all of your files will be deleted</CardDescription>
      </CardHeader>
      <CardContent
      className={cn("flex gap-4 flex-col")}
      >
        <p className='text-sm'>This is a very dangerous feature. Are you sure you want to delete all your files in this class?</p>
        <LeaveRoomForm student_id={ user?.id as string } room_id={ room_id } />
      </CardContent>
      <CardFooter>
        <p className="mt-4">Note: This action cannot be undone.</p>
      </CardFooter>
    </Card>
  )
}

export default StudentClassSetting