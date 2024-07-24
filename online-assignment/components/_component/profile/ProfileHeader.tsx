import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import AvatarCard from "./AvatarCard"

type ProfileHeaderProps = {
    user:UserData
}
const ProfileHeader = ({ user }:ProfileHeaderProps) => {
  return (
    <Card className="rounded-b-none shadow-sm">
        <CardHeader className={cn(
            "flex flex-col items-center justify-center text-center"
        )}>
            <CardTitle>
                <AvatarCard fallback={user?.email?.charAt(0).toUpperCase()}/>
            </CardTitle>
            <CardDescription className="space-y-1 flex flex-col">
                <Label>{user?.email}</Label>
                <Label>{user?.name || user.role}</Label>
            </CardDescription>
        </CardHeader>
        <CardContent className={cn(
            "flex flex-col md:flex-row items-center justify-center text-center"
        )}>
            <Card className="w-full shadow-sm md:rounded-r-none">
                <CardHeader>
                <CardTitle>{user?.role === "student" ? user.className : 0}</CardTitle>
                </CardHeader>
            </Card>
            <Card className="w-full shadow-sm md:rounded-l-none">
                <CardHeader>
                <CardTitle>{user?.role === "student" ? user.idCard : 0}</CardTitle>
                </CardHeader>
            </Card>
        </CardContent>
    </Card>
  )
}

export default ProfileHeader