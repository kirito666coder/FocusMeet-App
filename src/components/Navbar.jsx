import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/Authprovider'
import { AnimatePresence, motion } from 'framer-motion'

const Navbar = () => {

  const{setuser} = useContext(AuthContext)
  const location = useLocation();
  
const handelLogout = async ()=>{


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

const getanimation = ()=>{
  if(location.pathname ==='/Task'){ 
    return  {
       initial:{ opacity: 0, width:0 },
    animate:{ opacity: 1, width: "100vw" },
    exit:{ opacity: 0, width:0 },
    transition:{ duration: 0.5, delay: 0.3 } 
  }}
  if(location.pathname ==="/Note"){
    return{
      initial:{opacity:0,scale:0},
    animate:{opacity:1,scale:1},
    exit:{opacity:0.9,scale:0.9},
    transition:{duration:0.5},
    }
  }

  return{}
}


  return (
    <>
    <AnimatePresence mode='wait'>
    <motion.div
     key={location.pathname}
    className= {` ${getnavbarBG()} rounded-b-3xl  h-10  w-screen px-3 font-bold text-white flex justify-between items-center`}
    {...getanimation(location.pathname)}
    
   
    >
      <nav>
        HELLO WORLD 
      </nav>
      <ul className='flex  gap-3'>
        <li><Link className=' hover:border-b-3 hover:border-b-white' to={'/'}>HOME</Link></li>
        <li><Link className=' hover:border-b-3 hover:border-b-white' to={'/Note'}>Note</Link></li>
        <li><Link className=' hover:border-b-3 hover:border-b-white' to={'/Task'}>Task</Link></li>
        <button onClick={handelLogout} className='hover:text-red-400 hover:border-b-3 hover:border-b-white'>Log out</button>
      </ul>

    </motion.div>
    </AnimatePresence>
    
    </>
  )
}

export default Navbar
