import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../baseUrl";

type DeleteOrLeaveRoomParams = {
    roomId: string;
    // teacherId: string; or StudentId: string;
    [key:string]: string;
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

        createRoom:builder.mutation<ClassRoom,CreateUpdateRoom>({
            query:({teacherId,room})=>({
                url:`/rooms/${teacherId}/create`,
                method: 'POST',
                body:room
            }),
            invalidatesTags:['room']
        }),

        updateRoom:builder.mutation<ClassRoom,CreateUpdateRoom>({
            query:({teacherId,room})=>({
                url:`/rooms/${teacherId}/update`,
                method: 'PUT',
                body:room
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
        })
        
    })
})

export default roomSLice

export const {
    useGetRoomsQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
    useGetRoomQuery,
    useGetRoomUsersQuery,
    useGetStudentRoomsQuery,
    useJoinRoomMutation,
    useLeaveRoomMutation,
} = roomSLice;