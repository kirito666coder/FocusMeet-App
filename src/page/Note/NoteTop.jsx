import React, { useState } from 'react'

import { motion } from 'framer-motion'

const NoteTop = () => {

    const [typeOn, settypeOn] = useState(false)



  return (
    <div className=' h-[20vh] flex'>
      <div>

        <div className=' relative w-[55vw] h-15 flex justify-center items-center'>
        <input type="text" className='  bg-blue-100 w-[80%] text-white h-12 rounded-full outline-none font-bold border-none px-5 ' />
        <button
         className=' absolute right-24 text-white font-bold h-8 px-3 bg-blue-100 hover:bg-blue-200 rounded-full'
         onClick={()=>{
          settypeOn(true)
          setTimeout(() => {
            settypeOn(false)
          }, 2000);
         }}
         >Search</button>
        </div>

        <motion.div className=' w-[100%] flex justify-center items-center'>
          <ul className='flex flex-wrap gap-2 w-[90%] p-3 bg-blue-100 h-22 rounded-2xl '>
            <li className='bg-red-300 h-8 min-w-15 w-auto p-1 max-w-50 overflow-hidden rounded-2xl text-white font-bold flex justify-center items-center   hover:border-2 hover:border-white   ' >1</li>
            <li className='bg-blue-300 h-8 min-w-15 w-auto p-1 max-w-50 overflow-hidden rounded-2xl text-white font-bold flex justify-center items-center   hover:border-2 hover:border-white   ' >2ssssssssssss</li>
            <li className='bg-yellow-300 h-8 min-w-15 w-auto p-1 max-w-50 overflow-hidden rounded-2xl text-white font-bold flex justify-center items-center   hover:border-2 hover:border-white   ' >3</li>
            <li className='bg-green-300 h-8 min-w-15 w-auto p-1 max-w-50 overflow-hidden rounded-2xl text-white font-bold flex justify-center items-center   hover:border-2 hover:border-white   ' >4</li>
            <li className='bg-purple-300 h-8 min-w-15 w-auto p-1 max-w-50 overflow-hidden rounded-2xl text-white font-bold flex justify-center items-center   hover:border-2 hover:border-white   ' >5</li>
            <li className='bg-sky-300 h-8 min-w-15 w-auto p-1 max-w-50 overflow-hidden rounded-2xl text-white font-bold flex justify-center items-center   hover:border-2 hover:border-white   ' >6</li>
          </ul>
        </motion.div>

      </div>
      <div className=' w-full'>
            <motion.div className='bg-blue-100 h-[300%] mt-2 flex justify-center items-center rounded-b-2xl mr-3'
            initial={{height:"0"}}
            animate={{height:typeOn?"300%":"0%"}}
            
            >
            <motion.div className='text-7xl text-white font-bold mb-30'
            initial={{display:"none"}}
            animate={{display:typeOn?"block":"none"}}
            >Nothing to show</motion.div>
            </motion.div>

      </div>
      
    
      
    </div>
  )
}

export default NoteTop
