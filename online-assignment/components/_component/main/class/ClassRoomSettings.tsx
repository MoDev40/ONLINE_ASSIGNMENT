"use client"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetUserQuery } from '@/lib/features/userSlice'
import { cn } from '@/lib/utils'
import LeaveOrDeleteRoomForm from './LeaveOrDeleteRoomForm' 
import Loading from '../../Loading'

type ClassRoomSettingsProps = {
  user_id: string;
  room_id: string;
  action:string;
}

const ClassRoomSettings = ({ user_id,room_id,action }:ClassRoomSettingsProps) => {
  const { data:user , isLoading , isFetching } = useGetUserQuery(user_id as string);

  if(isLoading || isFetching) return <div className="container mx-auto"><Loading/></div>

  return (
    <div
    className={cn("w-full ")}
    >
      <CardHeader>
        <CardTitle className="text-red-500 font-black text-2xl">Danger Zone</CardTitle>
        <CardDescription>Alert: If you {action} the class, all of your files will be deleted</CardDescription>
      </CardHeader>
      <CardContent
      className={cn("flex gap-4 flex-col")}
      >
        <p className='text-sm'>This is a very dangerous feature. Are you sure you want to delete all your files in this class?</p>
        <LeaveOrDeleteRoomForm action={action} user_id={ user?.id as string } room_id={ room_id } />
      </CardContent>
      <CardFooter>
        <p className="mt-4">Note: This action cannot be undone.</p>
      </CardFooter>
    </div>
  )
}

export default ClassRoomSettings