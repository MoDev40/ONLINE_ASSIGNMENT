import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../baseUrl";

type CompleteSingUpBody = {
    userData: {
        idCard: string;
        name: string;
        role: string;
        className: string;
    },
    id:string;
}

const userSlice = createApi({
    reducerPath:'userApi',
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL
    }),
    tagTypes:['user'],
    endpoints:(builder)=>({
        getUser:builder.query<UserData,string>({
            query:(id)=>({
                url:`users/${id}`,
                method:'GET'
            }),
            providesTags:['user'],
        }), 
        completeSingUp:builder.mutation<UserData,CompleteSingUpBody>({
            query:({ id,userData })=>({
                url:`users/${id}/complete-sign-up`,
                method:'PUT',
                body:userData
            }),
            invalidatesTags:['user'],
        })       
    })
})

export const {
    useGetUserQuery,
    useCompleteSingUpMutation
} = userSlice;

export default userSlice;