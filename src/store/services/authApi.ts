import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Role, User } from "../../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/auth" }),
  tagTypes: ["Role"],
  endpoints: (builder) => ({
    login: builder.mutation<Role, User>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Role"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
