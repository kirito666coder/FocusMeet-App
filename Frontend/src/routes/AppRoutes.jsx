import React, { useContext } from 'react'


import { Route, Routes } from 'react-router-dom'
import Home from '../page/Home/Home'
import Task from '../page/Task/Task'
import Note from '../page/Note/Note'
import Login from '../page/Auth/Login'
import Registerpage from '../page/Auth/Registerpage'


import ProtectedRoute from '../components/ProtectedRoute'
import { AuthContext } from '../context/Authprovider'
import PublicRoute from '../components/PublicRoute'

const AppRoutes = () => {
    
  
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
