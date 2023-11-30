import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { userContext } from '../App'
import { Heading, Button, SmallContainer, InputText } from '../components'

export function Login() {
	
	const { setUserName, setUserPassword } = useContext(userContext)
	
	const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm();
	
	const {
		register: register2,
		formState: { errors: errors2 },
		handleSubmit: handleSubmit2,
		reset: reset2
	} = useForm()
	
	const onSubmit = handleSubmit((data) => {
        fetch("http://localhost:3001/login", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
			reset()
		})
    })
	
	const onSubmitRegistration = handleSubmit2((data) => {
		fetch("http://localhost:3001/signup", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
			if (response.ok) {
				alert("Регистрация прошла успешно")
			}
			else {
				alert("Ошибка регистрации")
			}
			reset2()
		})
	})


	return (
		<>
			<form action="#" onSubmit={onSubmit}>
				<Heading>Войти</Heading>
				<InputText {...register("login", {
							required: "Поле обязательно к заполнению"
						})}
					placeholder="Логин"
					type="text"
				/>
				<SmallContainer>{errors?.login && <p>{String(errors.login.message)}</p>}</SmallContainer>
				<InputText
					{...register("password", {
							required: "Поле обязательно к заполнению"
						})}
					type="password"
					placeholder="Пароль"
				/>
				<SmallContainer>{errors?.password && <p>{String(errors.password.message)}</p>}</SmallContainer>
				<Button type="submit">Войти</Button>
			</form>
			
			{/* Регистрация */}
			<form action="#" onSubmit={onSubmitRegistration}>
				<Heading>Регистрация</Heading>
				<InputText {...register2("login", {
						required: "Поле обязательно к заполнению",
						minLength: {
							value: 2,
							message: "Введите больше 1 символов"
						},
						maxLength: {
							value: 20,
							message: "Введите менее 20 символов"
						},
						pattern: {
							value: /^[a-zA-Z0-9]+$/,
							message: "Только цифры и английские буквы"
						},
					})}
					placeholder="Логин"
				/>
				<SmallContainer>{errors2?.login && <p>{String(errors2.login.message)}</p>}</SmallContainer>
				<InputText
					{...register2("password", {
						required: "Поле обязательно к заполнению",
						pattern: {
							value: /^[a-z0-9_\-*]+$/,
							message: "Только цифры и маленькие английские буквы и _-*"
						},
					})}
					type="password"
					placeholder="Пароль"
				/>
				<SmallContainer>{errors2?.password && <p>{String(errors2.password.message)}</p>}</SmallContainer>
				<Button type="submit">Регистрация</Button>
			</form>
		</>
	)
}
