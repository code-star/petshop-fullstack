import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CreatePet, Pet } from "../../types";

export const petShopApi = createApi({
  reducerPath: "petShopApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  tagTypes: ["Pet"],
  endpoints: (builder) => ({
    getPets: builder.query<Pet[], void>({
      query: () => `pets`,
      providesTags: ["Pet"],
    }),
    addPet: builder.mutation<Pet, CreatePet>({
      query: (body) => ({
        url: "/pets",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Pet"],
    }),
    adoptPet: builder.mutation<string, Pick<Pet, "id">>({
      query: (pet) => ({
        url: `pets/${pet.id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Pet"],
    }),
  }),
});

export const { useGetPetsQuery, useAddPetMutation, useAdoptPetMutation } =
  petShopApi;
