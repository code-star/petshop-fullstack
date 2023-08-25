import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Pet } from "../../types";
import { AuthState } from "./authSlice";

const buildAuthHeader = (getState: () => unknown) => {
  type Store = {
    auth: AuthState;
  };

  const state = getState() as Store;
  const userName = state.auth.user?.userName;
  const password = state.auth.user?.password;
  if (userName && password) {
    return `Basic ${btoa(userName + ":" + password)}`;
  }
  return "";
};
export const petShopApi = createApi({
  reducerPath: "petShopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/pets",
    prepareHeaders: (headers, { getState }) => {
      headers.append("Authorization", buildAuthHeader(getState));
      return headers;
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
