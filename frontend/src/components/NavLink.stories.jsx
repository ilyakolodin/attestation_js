import * as React from 'react'
import { NavLink } from './myStyledComponents'
import { Link } from 'react-router-dom'

export default {
    title: "NavLink",
    component: NavLink,
}

export const Default = () => <NavLink>Главная</NavLink>
