import * as React from "react"
import * as ReactDOM from "react-dom/client"
import {BrowserRouter} from 'react-router-dom' 
import {App} from "./App"

import { Provider } from 'react-redux'
import { store } from './redux'

const root = ReactDOM.createRoot(document.getElementById("app") as Element)
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
)