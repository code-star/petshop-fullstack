import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Pet } from "../../types";
import {AuthState} from "./authSlice";

export const petShopApi = createApi({
  reducerPath: "petShopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/pets",
    prepareHeaders: (headers, { getState }) => {
      return {
        ...headers,
        userName: (getState() as {auth: AuthState}).auth.user?.userName,
        password: (getState() as {auth: AuthState}).auth.user?.password,
      }
    },
  }),
  tagTypes: ["Pet"],
  endpoints: (builder) => ({
    getPets: builder.query<Pet[], void>({
      query: () => "",
      providesTags: ["Pet"],
    }),
    addPet: builder.mutation<Pet, Omit<Pet, "id" | "adopted">>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Pet"],
    }),
    adoptPet: builder.mutation<string, Pick<Pet, "id">>({
      query: (pet) => ({
        url: `/${pet.id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Pet"],
    }),
  }),
});

export const { useGetPetsQuery, useAddPetMutation, useAdoptPetMutation } =
  petShopApi;
