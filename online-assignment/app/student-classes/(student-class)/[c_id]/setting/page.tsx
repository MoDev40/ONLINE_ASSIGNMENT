import ClassRoomSettings from '@/components/_component/ClassRoomSettings';
import { auth } from '@clerk/nextjs/server';

function StudentClassSettingPage({ params }:{ params : RouteParams }){
  const { userId } : { userId: string | null } = auth();
  return (
    <ClassRoomSettings action='Leave' room_id={params.c_id} user_id={userId as string}/>
  )
}

export default StudentClassSettingPage