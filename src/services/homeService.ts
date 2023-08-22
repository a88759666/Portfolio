import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Work } from "@/typings/type";

export const homeApi = createApi({
    reducerPath: "homeApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/'}),
    endpoints: (builder) => ({
        getWorks: builder.query<Work[], number | "all">({
            query: (id) => {
                if(id !== "all") {
                    return `works/${id}`
                }
                return "works"
            }
        })
    })
})

export const { useGetWorksQuery } = homeApi
export const homeApiReducer = homeApi.reducer