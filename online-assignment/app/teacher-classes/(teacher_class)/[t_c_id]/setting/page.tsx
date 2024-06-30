import ClassRoomSettings from '@/components/_component/ClassRoomSettings';
import { auth } from '@clerk/nextjs/server';

const TeacherClassSettingPage = ({ params }:{ params:RouteParams }) => {
    const { t_c_id } = params
    const { userId } : { userId: string | null } = auth();
  return (
    <ClassRoomSettings action='Delete' room_id={t_c_id} user_id={userId as string}/>
  )
}

export default TeacherClassSettingPage