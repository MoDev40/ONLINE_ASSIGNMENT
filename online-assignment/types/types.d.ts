declare type RouteParams = {
    [key: string]:string
}

declare type UserData = {
    id: string;
    email: string;
    clerkId: string;
    idCard: string | null;
    className: string | null;
    name: string | null;
    role: string;
    createdAt: Date;
}

declare type Assignment = {
    id?: string;
    title: string;
    description?: string ;
    fileUrl: string;
    fileKey: string;
    classroomId?: string;
    dueDate: Date;
    createdAt?: Date;
}

declare type ClassRoom = {
    id: string;
    name: string;
    teacherId: string;
    joinCode: string;
    createdAt: Date;
}

declare interface TeacherClassRoom  extends ClassRoom {
    assignments: Assignment[];
    userClassrooms:any[];
}

declare type CreateUpdateRoom = {
    teacherId:string;
    room:{
        roomId?:string;
        name:string;
    }
}

declare type RoomUsers = {
    user:UserData,
    id: string;
    userId: string;
    classroomId: string;
    joinedAt: Date;
}

declare type StudentRoom = {
    id: string;
    userId: string;
    classroomId: string;
    joinedAt: Date;
}

declare interface StudentRoomsWithAssignments extends StudentRoom {
    classroom:ClassroomWithAssignments
}

declare interface ClassroomWithAssignments extends ClassRoom {
    assignments:Assignment[]
}