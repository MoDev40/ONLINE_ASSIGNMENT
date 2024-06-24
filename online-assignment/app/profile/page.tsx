import Profile from '@/components/_component/Profile'
import { auth } from '@clerk/nextjs/server';
import React from 'react'

function ProfilePage() {
  const { userId } : { userId: string | null } = auth();
  return (
    <Profile id={userId as string} />
  )
}

export default ProfilePage