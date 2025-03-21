import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div className='h-10 bg-purple-300 w-screen px-3 font-bold text-white flex justify-between items-center'>
      <nav>
        HELLO WORLD 
      </nav>
      <ul className='flex  gap-3'>
        <li><Link className=' hover:border-b-3 hover:border-b-white' to={'/'}>HOME</Link></li>
        <li><Link className=' hover:border-b-3 hover:border-b-white' to={'/Note'}>Note</Link></li>
        <li><Link className=' hover:border-b-3 hover:border-b-white' to={'/Task'}>Task</Link></li>
        <li><Link className=' hover:border-b-3 hover:border-b-white' to={'/login'}>LOG IN </Link></li>
      </ul>

    </div>
    
    
    </>
  )
}

export default Navbar
