import React from 'react'


import { Route, Routes } from 'react-router-dom'
import Home from '../page/Home'
import Task from '../page/Task'
import Note from '../page/Note'
import Login from '../page/Login'
import Registerpage from '../page/Registerpage'

import { useState } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'

const AppRoutes = () => {
    const [user, setuser] = useState(false)
  return (
    <>
     <Routes>


<Route path='/login' element={<Login />} />

<Route path='/register' element={<Registerpage />} />


<Route path='/' element={
  <ProtectedRoute user={user}>
    <Home />
  </ProtectedRoute>
} />
  
  <Route path='/Task' element={
    <ProtectedRoute user={user}>
      <Task/>
    </ProtectedRoute>
  }/>
  
  <Route path='/Note' element={
    <ProtectedRoute user={user}>
      <Note/>
    </ProtectedRoute>
  }/>

</Routes>
    </>
  )
}

export default AppRoutes
