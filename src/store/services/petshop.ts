// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { Pet } from '../../types'


// Define a service using a base URL and expected endpoints
export const petShopApi = createApi({
    reducerPath: 'petShopApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
    tagTypes: ['Pet'],
    endpoints: (builder) => ({
        getPets: builder.query<Pet[], void>({
            query: () => `pets`,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Pet' as const, id })), 'Pet']
                    : ['Pet'],
        }),
        addPet: builder.mutation<string, Omit<Pet, 'id'>>({
            query: (body) => ({
                url: 'post',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Pet'],
        }),
        adoptPet: builder.mutation<string, Partial<Pet> & Pick<Pet, 'id'>>({
            query: (pet) => ({
                url: `pets/${pet.id}`,
                method: 'PATCH',
            }),
            invalidatesTags: (result, error, arg) =>
                [{ type: 'Pet', id: arg.id }],
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetPetsQuery,
    useAddPetMutation,
    useAdoptPetMutation
} = petShopApi