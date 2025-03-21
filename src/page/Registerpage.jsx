import React, { useState } from 'react'
import { Link } from 'react-router-dom'



const Registerpage = () => {


  const [loding, setloding] = useState(false)
  const [Error, setError] = useState('')
  const [Success, setSuccess] = useState('')

  const [formdata, setformdata] = useState({
    username: '',
    email: "",
    password: "",
  })

  const handlchange = (e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value})
  }
  
  const handlsubmit = async (e)=>{
    e.preventDefault()
    setloding(true)
    
   if(!formdata.username || !formdata.email ||!formdata.password){
    setError("all fields are required")
    setTimeout(() => {setError("")}, 3000);
    setloding(false);
    return;
   }
   if(formdata.username.length<3){
    setError("user name is to short")
    setTimeout(() => {setError("")}, 3000);
    setloding(false);
    return;
   } 
   if(formdata.password.length<6){
    setError("passwrod must be at last 6 characters long")
    setTimeout(() => {setError("")}, 3000);
    setloding(false)
    return;
   }

   try{
    const respons = await fetch("http://localhost:3000/user/register",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
    const data = await respons.json();
    setloding(false)

    if(!respons.ok){

      setError(data.message|| "something went wrong");
      setTimeout(() => {setError("")}, 3000);
      return 
      
    }
    setSuccess("registration successfull!")
    setTimeout(() => {setSuccess("")}, 3000);
    setformdata({username:"",email:"",password:""})


   }catch(error){
     setloding(false)
     setError("failed to connect to the server")
   }



  }

  return (
    <>
      <div className='bg-[url("/night-sky.jpg")] bg-cover bg-center h-screen w-screen flex justify-center items-center '>
        <div className='h-[45%] w-[60%] bg-zinc-900 opacity-80 backdrop-blur-3xl rounded-3xl flex justify-center items-center flex-col'>
          <form onSubmit={handlsubmit} className='flex flex-col text-white justify-center items-center gap-2 w-full '>
               
               {Success && <p className='text-green-500'>{Success}</p>}
               {Error && <p className='text-red-500'>{Error}</p>}
            


            <input
            onChange={handlchange}
              type="text"
              id='username'
              value={formdata.username}
              name='username'
              placeholder='Enter username'
              className=' placeholder:text-white border-1 border-white px-4 py-3 w-[80%] rounded-lg' />
            <input
            onChange={handlchange}
              type="email"
              id='email'
              value={formdata.email}
              name='email'
              placeholder='Enter Email'
              className=' placeholder:text-white border-1 border-white px-4 py-3 w-[80%] rounded-lg' />
            <input
            onChange={handlchange}
              type="password"
              id='password'
              value={formdata.password}
              name='password'
              placeholder='Enter password'
              className=' placeholder:text-white border-1 border-white px-4 py-3 w-[80%] rounded-lg' />
             <div className='w-[80%] flex justify-end '>
             
                           <div className='text-blue-600 text-sm  cursor-pointer '>
                             <Link to={"/login"}>
                             Log in
                             </Link>
                             </div>
                           </div>
            <button
            type='submit'
            disabled={loding}
            className='h-10 w-[40%] rounded-4xl bg-blue-500 hover:bg-blue-600'>
              {loding ? 'Registering...': "Rgister"}
            </button>
          </form>
        </div>

      </div>

    </>
  )
}

export default Registerpage
