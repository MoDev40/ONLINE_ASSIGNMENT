import CompleteSignUp from '@/components/shared/CompleteSignUp'
import { auth } from '@clerk/nextjs/server'

function CompleteSignUpPage() {
    const {userId} = auth()
  return (
  <CompleteSignUp id={userId!} />
  )
}

export default CompleteSignUpPage