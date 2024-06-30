import StudentClassSetting from '@/components/_component/main/student/StudentClassSetting'
import { auth } from '@clerk/nextjs/server';
import React from 'react'

function StudentClassSettingPage({ params }:{ params : RouteParams }){
  const { userId } : { userId: string | null } = auth();
  return (
    <StudentClassSetting student_id={userId as string} room_id={params.id} />
  )
}

export default StudentClassSettingPage