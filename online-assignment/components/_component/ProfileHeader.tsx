import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import { cn } from "@/lib/utils"
import AvatarCard from "./AvatarCard"
import { Label } from "../ui/label"

type ProfileHeaderProps = {
    user:UserData
}
const ProfileHeader = ({ user }:ProfileHeaderProps) => {
  return (
    <Card>
        <CardHeader className={cn(
            "flex flex-col items-center justify-center text-center"
        )}>
            <CardTitle>
                <AvatarCard fallback={user?.email?.charAt(0).toUpperCase()}/>
            </CardTitle>
            <CardDescription className="space-y-1">
                <Label>{user?.email}</Label>
                <Label>{user?.name}</Label>
            </CardDescription>
        </CardHeader>
        <CardContent className={cn(
            "flex flex-col md:flex-row items-center justify-center text-center"
        )}>
            <Card className="w-full md:rounded-r-none">
                <CardHeader>
                <CardTitle>{user?.role === "student" ? user.className : 0}</CardTitle>
                </CardHeader>
            </Card>
            <Card className="w-full md:rounded-l-none">
                <CardHeader>
                <CardTitle>{user?.role === "student" ? user.idCard : 0}</CardTitle>
                </CardHeader>
            </Card>
        </CardContent>
    </Card>
  )
}

export default ProfileHeader