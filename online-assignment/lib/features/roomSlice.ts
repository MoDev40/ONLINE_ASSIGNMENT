import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../baseUrl";

type DeleteOrLeaveRoomParams = {
    roomId: string;
    // teacherId: string; or StudentId: string;
    [key:string]: string;
}

type SubmitBody = {
    student_id: string;
    assignment_id: string;
    classroom_id: string;
    data:{
        fileUrl: string;
        fileKey: string;
    }
}
type deleteAssignment = {
    teacher_id: string;
    assignment_id: string;
    classroom_id: string;
}

interface AssignmentBody {
    assignment: Assignment,
    room_id: string;
    teacher_id: string;
}

type JoinRoom = {
    student_id: string;
    data:{
        joinCode: string;
    }
}

const roomSLice = createApi({
    reducerPath:'roomApi',
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL,
    }),

    tagTypes:['room'],

    endpoints:(builder)=>({

        getRooms:builder.query<TeacherClassRoom[],string>({
            query:(teacherId)=> `/rooms/${teacherId}`,
            providesTags:['room']
        }),

        createRoom:builder.mutation<ClassRoom,CreateRoom>({
            query:({teacherId,room})=>({
                url:`/rooms/${teacherId}/create`,
                method: 'POST',
                body:room
            }),
            invalidatesTags:['room']
        }),

        updateRoom:builder.mutation<ClassRoom,{ room_id:string,data:{ name:string } }>({
            query:({room_id,data})=>({
                url:`/rooms/${room_id}/update`,
                method: 'PUT',
                body:data
            }),
            invalidatesTags:['room']
        }),

        getRoom:builder.query<ClassRoom,string>({
            query:(room_id)=> `/rooms/${room_id}/room`,
            providesTags:["room"]
        }),

        getRoomUsers:builder.query<RoomUsers[],string>({
            query:(room_id)=> `/rooms/${room_id}/users`,
            providesTags:["room"]
        }),

        addAssignment:builder.mutation<Assignment,AssignmentBody>({
            query:({assignment,room_id,teacher_id})=>({
                url:`/rooms/${room_id}/assignments/${teacher_id}/create`,
                method: 'POST',
                body:assignment
            }),
            invalidatesTags:['room']
        }),
        
        deleteRoom:builder.mutation<string,DeleteOrLeaveRoomParams>({
            query:({roomId,teacherId})=>({
                url:`/rooms/${roomId}/delete/${teacherId}`,
                method: 'DELETE',
            }),
            invalidatesTags:['room']
        }),

        joinRoom:builder.mutation<StudentRoom,JoinRoom>({
            query:({ student_id,data })=>({
                url:`/rooms/${student_id}/join`,
                method: 'POST',
                body:data
            }),
            invalidatesTags:["room"]
        }),

        getStudentRooms:builder.query<StudentRoomsWithAssignments[],string>({
            query:(student_id)=> `/rooms/${student_id}/student-class`,
            providesTags:["room"]
        }),

        leaveRoom:builder.mutation<string,DeleteOrLeaveRoomParams>({
            query:({roomId,student_id})=>({
                url:`/rooms/${roomId}/leave/${student_id}`,
                method:"DELETE",
            }),
            invalidatesTags:["room"]
        }),

        getAssignments:builder.query<Assignment[],string>({
            query:(room_id)=> `/rooms/${room_id}/assignments`,
            providesTags:["room"]
        }),
        getAssignment:builder.query<Assignment,string>({
            query:(assignment_id)=> `/rooms/${0}/assignments/${assignment_id}`,
            providesTags:["room"]
        }),
        submitAssignmentAnswer:builder.mutation<SubmittedFile,SubmitBody>({
            query:({ student_id,classroom_id,assignment_id,data })=>({
                url:`/rooms/${classroom_id}/assignments/submit/${student_id}/${assignment_id}`,
                method: 'POST',
                body:data
            })
        }),
        getSubmitedFiles:builder.query<SubmittedFile[],{ assignment_id:string; student_id:string; }>({
            query:({assignment_id,student_id})=> `/rooms/submitedfiles/${assignment_id}/${student_id}`,
            providesTags:["room"]
        }),
        deleteAssignment:builder.mutation<string,deleteAssignment>({
            query:({classroom_id,teacher_id,assignment_id})=>({
                method:"DELETE",
                url:`/rooms/${classroom_id}/assignments/delete/${teacher_id}/${assignment_id}`,
            }),
            invalidatesTags:["room"]
        }),
        deleteSubmittedFile:builder.mutation<SubmittedFile,{student_id:string;fileId:string;}>({
            query:({student_id,fileId})=>({
                method:"DELETE",
                url:`/rooms/submitedfiles/delete/${fileId}/${student_id}`,
            }),
        }),
        deleteServerFile:builder.mutation<string,string | string[]>({
            query:(fileKeys)=>({
                method:"DELETE",
                url:"/uploadthing",
                body:{ fileKeys }
            }),
            invalidatesTags:["room"]
        }),
    })
})

export default roomSLice

export const {
    useGetRoomsQuery,
    useAddAssignmentMutation,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
    useGetRoomQuery,
    useGetRoomUsersQuery,
    useGetStudentRoomsQuery,
    useJoinRoomMutation,
    useLeaveRoomMutation,
    useGetAssignmentsQuery,
    useGetAssignmentQuery,
    useSubmitAssignmentAnswerMutation,
    useGetSubmitedFilesQuery,
    useDeleteAssignmentMutation,
    useDeleteServerFileMutation,
    useDeleteSubmittedFileMutation
} = roomSLice;