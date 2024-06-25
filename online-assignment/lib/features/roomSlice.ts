import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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

        getRooms:builder.query<TeacherClassRoom,string>({
            query:(teacherId)=> `/api/rooms/${teacherId}`,
            providesTags:['room']
        }),

        createRoom:builder.mutation<ClassRoom,CreateUpdateRoom>({
            query:({teacherId,room})=>({
                url:`/api/rooms/${teacherId}/create`,
                method: 'POST',
                body:room
            }),
            invalidatesTags:['room']
        }),

        updateRoom:builder.mutation<ClassRoom,CreateUpdateRoom>({
            query:({teacherId,room})=>({
                url:`/api/rooms/${teacherId}/update`,
                method: 'PUT',
                body:room
            }),
            invalidatesTags:['room']
        }),
    
        deleteRoom:builder.mutation<string,DeleteRoomParams>({
            query:({roomId,teacherId})=>({
                url:`/api/rooms/${roomId}/delete/${teacherId}`,
                method: 'DELETE',
            }),
            invalidatesTags:['room']
        }),
        
    })
})