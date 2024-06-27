import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../baseUrl";

type DeleteRoomParams = {
    roomId: string;
    teacherId: string;
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
            query:(id)=> `/rooms/${id}/room`,
            providesTags:["room"]
        }),

        deleteRoom:builder.mutation<string,DeleteRoomParams>({
            query:({roomId,teacherId})=>({
                url:`/rooms/${roomId}/delete/${teacherId}`,
                method: 'DELETE',
            }),
            invalidatesTags:['room']
        }),
        
    })
})

export default roomSLice

export const {
    useGetRoomsQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
    useGetRoomQuery,
} = roomSLice;