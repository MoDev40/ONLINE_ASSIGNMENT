"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function AvatarCard({fallback}:{fallback:string}) {
  return (
  <Avatar>
    <AvatarFallback>{fallback}</AvatarFallback>
  </Avatar>
  )
}

export default AvatarCard