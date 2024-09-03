import React from 'react'
import { useAuth } from '../../context/UseAuth'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {

  const {user, isLoading} = useAuth()
  if(isLoading){
    return null;
  }
  return (
    <>
    {user? children: <Navigate to={"/"}/>}
    </>
  )
}

export default ProtectedRoutes