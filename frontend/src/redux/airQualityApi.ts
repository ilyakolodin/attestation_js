import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const airQualityApi = createApi({
	reducerPath: 'airQualityApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://air-quality-api.open-meteo.com/v1/'
	}),
	endpoints: (build) => ({
		getAirQuality: build.query<any, any>({
			query: (position: any) => `air-quality?latitude=${position.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ', 2)[0]}&longitude=${position.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ', 2)[1]}&hourly=pm10,pm2_5`,
		})
	})
})

export const { useGetAirQualityQuery } = airQualityApi