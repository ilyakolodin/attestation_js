import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const dataBaseApi = createApi({
	reducerPath: 'dataBaseApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3001/'
	}),
	endpoints: (build) => ({
		addData: build.mutation({
			query: (body) => ({
				url: 'add-data',
				method: 'POST',
				body
			}),
		}),
		getData: build.query({
			query: (body) => ({
				url: 'login',
				method: 'POST',
				body
			})
		}),
		addRecord: build.mutation({
			query: (body) => ({
				url: 'add-record',
				method: 'POST',
				body
			})
		})
	})
})

export const { useAddDataMutation,  useGetDataQuery, useAddRecordMutation } = dataBaseApi