import * as React from "react"
import { Routes, Route } from 'react-router-dom'
import { RequireAuth, RequireNotAuth } from './hocs'
import { Login, MainPage, EditPage } from './pages'
import { useState, useEffect } from 'react'
import { Container, NavLi, Button, NavLink } from './components'

const ROUTES = {
	main: '/',
	login: '/login',
	edit: '/edit'
}

interface IUserContext {
		userName: string | null;
		userPassword: string | null;
		setUserName: React.Dispatch<React.SetStateAction<string | null>>;
		setUserPassword: React.Dispatch<React.SetStateAction<string | null>>;
	}

  
const initUserContextState = {
    userName: null,
	userPassword: null,
    setUserName: () => {},
	setUserPassword: () => {},
}

export const userContext = React.createContext<IUserContext>(initUserContextState)

export function App() {
	
	const [userName, setUserName] = useState<string | null>(localStorage.getItem('user'))
	const [userPassword, setUserPassword] = useState<string | null>(localStorage.getItem('password'))
		
	useEffect(() => {
        fetch("http://localhost:3001/login", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
				login: userName,
				password: userPassword,
			})
        }).then((response) => {
			if (response.ok) {
				return response.json()
			}
			throw new Error('Something went wrong')
		}).then(data => {
			setUserName(data.login)
			localStorage.setItem('user', data.login)
			setUserPassword(data.password)
			localStorage.setItem('password', data.password)
		}).catch(error => {
			setUserName(null)
			localStorage.setItem('user', '')
			setUserPassword(null)
			localStorage.setItem('password', '')
		})
    }, [])
	
	function handleExit() {
		setUserName(null)
		localStorage.setItem('user', '')
		setUserPassword(null)
		localStorage.setItem('password', '')
	}
	
	return (
		<userContext.Provider value={{ userName, setUserName, userPassword, setUserPassword }}>
			<Container>
				<ul>
					{userName && <NavLi><NavLink to={ ROUTES.main }>Главная</NavLink></NavLi>}
					{userName && <NavLi><NavLink to={ ROUTES.edit }>Редактировать</NavLink></NavLi>}
					{userName && <Button onClick={handleExit}>Выйти</Button>}
				</ul>
				<Routes>
					<Route path={ ROUTES.main } element={
							<RequireAuth>
								<MainPage />
							</RequireAuth>
						} />
					<Route path={ ROUTES.edit } element={
							<RequireAuth>
								<EditPage />
							</RequireAuth>
						} />
					<Route path={ ROUTES.login } element={
							<RequireNotAuth>
								<Login />
							</RequireNotAuth>
						} />
				</Routes>
			</Container>
		</userContext.Provider>
	)
}
