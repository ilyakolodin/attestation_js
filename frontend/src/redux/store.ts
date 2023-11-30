import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { mapsApi } from './mapsApi'
import { airQualityApi } from './airQualityApi'
import { dataBaseApi } from './dataBaseApi'

const rootReducer = combineReducers({
	[mapsApi.reducerPath]: mapsApi.reducer,
	[airQualityApi.reducerPath]: airQualityApi.reducer,
	[dataBaseApi.reducerPath]: dataBaseApi.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => 
		getDefaultMiddleware().concat(mapsApi.middleware)
							  .concat(airQualityApi.middleware)
							  .concat(dataBaseApi.middleware)
})