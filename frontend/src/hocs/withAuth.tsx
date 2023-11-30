import * as React from 'react';
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../App'
 
export const RequireAuth = ({ children }: {children: JSX.Element}) => {
	
	const { userName } = useContext(userContext)
	
    if (!userName) {
        return <Navigate to='/login'/>
    }
	
    return children
}