import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mapsApi = createApi({
	reducerPath: 'mapsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://geocode-maps.yandex.ru/1.x/'
	}),
	endpoints: (build) => ({
		getPosition: build.query<any, string>({
			query: (city: string) => `?apikey=85eaff1b-ef9e-4c11-89bc-ca01d1ae43de&geocode=${city}&format=json`,
		})
	})
})

export const { useGetPositionQuery } = mapsApi