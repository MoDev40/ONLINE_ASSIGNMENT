import CompleteSignUp from '@/components/shared/CompleteSignUp';
import { auth } from '@clerk/nextjs/server'

function CompleteSignUpPage() {
  const { userId } : { userId: string | null } = auth();
  return (
    <CompleteSignUp id={userId as string} />
  )
}

export default CompleteSignUpPage