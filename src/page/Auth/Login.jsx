import React, { useContext, useEffect, useState } from 'react'

import { Link, useNavigate, } from 'react-router-dom'

import { AuthContext } from '../../context/Authprovider'

import { motion } from 'framer-motion'

const Login = () => {

  const [loding, setloding] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { checkUserAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  const [logform, setlogform] = useState({
    email: '',
    password: '',

  })

  const handelchange = (e) => {
    setlogform({ ...logform, [e.target.name]: e.target.value })
  }

  const handelSubmit = async (e) => {
    e.preventDefault()
    setloding(true)

    if (!logform.email || !logform.password) {
      setError("Email and password are required")
      setTimeout(() => { setError("") }, 3000);
      setloding(false)
      return
    }

    try {

      const respons = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(logform)
      })

      const data = await respons.json()

      if (!respons.ok) {
        setError(data.message)
        setTimeout(() => { setError("") }, 3000);
        setloding(false)
        return
      }
      setloding(false)

      await checkUserAuth()

      navigate('/')


    } catch (error) {
      console.error("Error in logging :", error);
    }
  }

  const [isShrinking, setisShrinking] = useState(false)

 useEffect(() => {
   setTimeout(() => {
    setisShrinking(true)
   }, 100);
 
 
 }, [])
 

 const handelAnimasion = ()=>{
     setisShrinking(false)
   setTimeout(() => {
    navigate('/register')   
  }, 100);
 }


  return (
    <>
      <div className='bg-[url("/bg-blue.webp")] bg-cover bg-center h-screen w-screen flex justify-center items-center '>
        <motion.div className='w-full h-full flex justify-center items-center'
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: isShrinking ? 1 : 0, opacity: isShrinking ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >

          <div className='h-[45%] w-[60%] bg-zinc-900 opacity-70 backdrop-blur-3xl rounded-3xl flex justify-center items-center flex-col'>
          <h1 className='text-[#001b9b] mb-8 font-bold text-4xl'>Log in</h1>
             <form onSubmit={handelSubmit} className=' text-white flex flex-col justify-center items-center gap-2 w-full '>
              {error && <p className='text-red-500'>{error}</p>}
              {success && <p className='text-green-500'>{success}</p>}

              <input
                value={logform.email}
                onChange={handelchange}
                type="email"
                id='email'
                name='email'
                placeholder='Enter Email'
                className=' placeholder:text-white border-1 border-white px-4 py-3 w-[80%] rounded-lg' />
              <input
                value={logform.password}
                onChange={handelchange}
                type="password"
                id='password'
                name='password'
                placeholder='Enter password'
                className=' placeholder:text-white border-1 border-white px-4 py-3 w-[80%] rounded-lg' />
              <div className='w-[80%] flex justify-end '>

                <div onClick={handelAnimasion} className='text-blue-500 text-sm cursor-pointer '>
                 Register
                </div>
              </div>
              <button
                type='submit'
                disabled={loding}
                className='h-10 w-[40%] rounded-4xl bg-[#003971] hover:bg-[#001b9b]'>
                Log in
              </button>
            </form>
          </div>
        </motion.div>
      </div>

    </>
  )
}

export default Login
