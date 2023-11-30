import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
	margin: 20px;
	text-align: center;
	align-items: center;
	justify-content: center;
`

export const SmallContainer = styled.div`
	margin: 1px;
`

export const Heading = styled.h1`
	color: white;
	background-color: black;
`

export const Button = styled.button`
	margin: 3px
`

export const InputText = styled.input`
	margin: 3px
`
export const NavLi = styled.li`
	display: inline;
	margin-right: 10px;
`

export const NavLink = styled(Link)`
	color: black;
	padding: 5px;
	text-decoration: none;
	&:hover {
		color: white;
		background: black;
	}
`;