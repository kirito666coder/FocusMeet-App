import React, { useContext, useState } from 'react'

import { Link, useNavigate,  } from 'react-router-dom'

import { AuthContext } from '../context/Authprovider'

const Login =  () => {

  const [loding, setloding] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const{checkUserAuth} = useContext(AuthContext)
  const navigate = useNavigate()

  const [logform, setlogform] = useState({
    email:'',
    password:'',

  })

 const handelchange = (e)=>{
  setlogform({...logform,[e.target.name]:e.target.value})
 }

 const handelSubmit = async (e)=>{
  e.preventDefault()
  setloding(true)
  
  if(!logform.email || !logform.password){
    setError("Email and password are required")
    setTimeout(() => {setError("")}, 3000);
    setloding(false)
    return
  }

  try{
   
    const respons = await fetch("http://localhost:3000/user/login",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      credentials:"include",
      body:JSON.stringify(logform)
    })
    
    const data = await respons.json()

    if(!respons.ok){
      setError(data.message)
      setTimeout(() => {setError("")}, 3000);
      setloding(false)
      return
    }
    setloding(false)

   await checkUserAuth()
    
   navigate('/')

  
  }catch(error){
    console.error("Error in logging :", error);
  }
 }


  return (
    <>
      <div className='bg-[url("/blue-sky.jpg")] bg-cover bg-center h-screen w-screen flex justify-center items-center '>
        <div className='h-[45%] w-[60%] bg-zinc-800 opacity-70 backdrop-blur-3xl rounded-3xl flex justify-center items-center flex-col'>
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

              <div className='text-blue-500 text-sm cursor-pointer '>
                <Link to={"/register"}>
                  register
                </Link>
              </div>
            </div>
            <button
              type='submit'
              disabled={loding}
              className='h-10 w-[40%] rounded-4xl bg-blue-500 hover:bg-blue-600'>
              Log in
            </button>
          </form>
        </div>

      </div>

    </>
  )
}

export default Login
