import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../baseUrl";

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
    })
})

export const {
    useGetUserQuery
} = userSlice;

export default userSlice;