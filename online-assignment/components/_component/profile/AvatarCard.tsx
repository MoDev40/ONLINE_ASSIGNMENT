"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

function AvatarCard({fallback}:{fallback:string}) {
  return (
  <Avatar>
    <AvatarFallback>{fallback}</AvatarFallback>
  </Avatar>
  )
}

export default AvatarCard