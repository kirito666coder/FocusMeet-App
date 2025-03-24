import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/Authprovider'

const Navbar = () => {

  const{setuser} = useContext(AuthContext)

const handelLogout = async ()=>{

  console.log("logout")
const respons = await fetch("http://localhost:3000/user/logout",{
  method:"POST",
  credentials:"include",

})


setuser(null)

}

const getnavbarBG = ()=>{
  if(location.pathname=== "/") return `bg-[url("/bg-blue.webp")]`
  if(location.pathname=== "/Note")return `bg-[url("/note-nab.jpg")]`
  if(location.pathname=== "/Task")return `bg-[url("/task-nav-bg.avif")]`
  return `bg-[url("/bg-blue.webp")]`
}

  return (
    <>
    <div className= {` ${getnavbarBG()} h-10  w-screen px-3 font-bold text-white flex justify-between items-center`}>
      <nav>
        HELLO WORLD 
      </nav>
      <ul className='flex  gap-3'>
        <li><Link className=' hover:border-b-3 hover:border-b-white' to={'/'}>HOME</Link></li>
        <li><Link className=' hover:border-b-3 hover:border-b-white' to={'/Note'}>Note</Link></li>
        <li><Link className=' hover:border-b-3 hover:border-b-white' to={'/Task'}>Task</Link></li>
        <button onClick={handelLogout} className='hover:text-red-400 hover:border-b-3 hover:border-b-white'>Log out</button>
      </ul>

    </div>
    
    
    </>
  )
}

export default Navbar
