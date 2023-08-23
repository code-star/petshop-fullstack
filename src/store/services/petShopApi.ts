import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Pet } from "../../types";

export const petShopApi = createApi({
  reducerPath: "petShopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/pets",
    prepareHeaders: (headers, { getState }) => {

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

/*
prepareHeaders:(headers, store)=> {
  return {
    username: store.getState().user.username,
    password: store.getState().user.password,
  }
}*/
