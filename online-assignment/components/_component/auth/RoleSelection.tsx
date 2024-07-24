"use client"
import { Dispatch, SetStateAction } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select"

type RoleSelectionProps = {
    role:string
    setRole:Dispatch<SetStateAction<string>>
}

const RoleSelection = ({setRole,role}:RoleSelectionProps) => {
  return (
    <div>   
    <Select 
        onValueChange={(role)=>{
        setRole(role)
        }} 
        defaultValue={role}
    >
        <SelectTrigger>
            <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="teacher">Teacher</SelectItem>
        </SelectContent>
    </Select>  
    </div>
  )
}

export default RoleSelection