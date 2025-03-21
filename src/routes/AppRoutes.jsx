import React, { useContext } from 'react'


import { Route, Routes } from 'react-router-dom'
import Home from '../page/Home'
import Task from '../page/Task'
import Note from '../page/Note'
import Login from '../page/Login'
import Registerpage from '../page/Registerpage'


import ProtectedRoute from '../components/ProtectedRoute'
import { AuthContext } from '../context/Authprovider'
import PublicRoute from '../components/PublicRoute'

const AppRoutes = () => {
    
  const {user} =useContext(AuthContext)
  return (
    <>
     <Routes>




<Route path='/login' element={
  <PublicRoute>
    <Login />
  </PublicRoute>
    } />

<Route path='/register' element={
  <PublicRoute>
  <Registerpage />
  </PublicRoute>
  
  } />


<Route path='/' element={
  <ProtectedRoute >
    <Home />
  </ProtectedRoute>
} />
  
  <Route path='/Task' element={
    <ProtectedRoute >
      <Task/>
    </ProtectedRoute>
  }/>
  
  <Route path='/Note' element={
    <ProtectedRoute >
      <Note/>
    </ProtectedRoute>
  }/>

</Routes>
    </>
  )
}

export default AppRoutes
