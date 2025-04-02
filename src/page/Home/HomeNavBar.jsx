import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { logoutapi } from '../../api/api.Logout'

const HomeNavBar = ({ setPostpage, setProfilepageture, hovercolore, bgcorlor, textcolor, bordercolor, setDarckMode, DarckMode }) => {

const handellogout =()=>{
  logoutapi()
  window.location.reload()
}



  return (
    <>
      <div className={`w-[25vw] ${bgcorlor} flex justify-end `}>

        <div className={` ${bgcorlor}  border-l-1 border-${bordercolor} w-40 h-[97vh]  m-2`}>
          <div className={`h-[15%]  ${bgcorlor}`}></div>
          <div className='h-[60%] '>
            <ul
              onClick={() => {
                setPostpage(false)
                setProfilepageture(false)
              }}
              className='h-full w-full flex items-start  pt-2 flex-col gap-4'>
              <li className={`h-8 ${hovercolore} text-2xl ${textcolor} font-bold  justify-center items-center flex rounded-full px-2 py-4 `}><Link to={"/"}><span className=' rounded-full px-2  '>Home</span></Link></li>
              <li className={`h-8 ${hovercolore} text-2xl ${textcolor} font-bold  justify-center items-center flex rounded-full px-2 py-4 `}><Link to={"/Task"}><span className=' rounded-full px-2  '>Task</span></Link></li>
              <li className={`h-8 ${hovercolore} text-2xl ${textcolor} font-bold  justify-center items-center flex rounded-full px-2 py-4 `}><Link to={"/Note"}><span className=' rounded-full px-2  '>Note</span></Link></li>
              <li
                onClick={(e) => {
                  e.stopPropagation()
                  setPostpage(false)
                  setProfilepageture(true)
                }}
                className={`h-8 ${hovercolore} text-2xl ${textcolor} cursor-pointer font-bold  justify-center items-center flex rounded-full px-2 py-4 `}><span className=' rounded-full px-2  '>profile</span></li>
            </ul>
          </div>
          <div className='h-[25%] '>

            {/* post */}
            <div
              onClick={(e) => {
                e.stopPropagation()
                setPostpage(true)
                setProfilepageture(false)
              }}
              className={`w-[70%] border-${bordercolor} ${bgcorlor} ${textcolor} cursor-pointer invert border-1 mx-auto h-11 rounded-3xl mb-5 flex justify-center items-center font-bold text-2xl`}>
              Post
            </div>

            {/* Darck mode */}
            <div className={` cursor-pointer relative border-${bordercolor} h-12 w-[75%] mx-auto border-2  rounded-full `} >
              <motion.div
                onClick={() => {
                  setDarckMode(!DarckMode)

                }}
                animate={{ left: DarckMode ? "61%" : "0" }}
                className={`absolute rounded-full ${bgcorlor} border-${bordercolor} border-1 h-11 w-11 top-0 `}>

              </motion.div>

              {/* moon svg */}
              <svg
                onClick={() => {
                  setDarckMode(!DarckMode)
                }}
                className=' z-2 absolute top-1 left-1'
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                width="38"
                height="38"
              >
                <path
                  d="M100,20 
       A80,80 0 1,0 180,100 
       A60,60 0 1,1 100,20"
                  fill="black"
                />
              </svg>

              {/* sun svg */}
              <svg
                onClick={() => {
                  setDarckMode(!DarckMode)
                }}
                className='z-2 absolute top-1 right-1'
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                width="38"
                height="38"
              >
                <circle cx="12" cy="12" r="5" stroke="#e4e4e7" stroke-width="2" fill="none" />
                <line x1="12" y1="2" x2="12" y2="5" stroke="#e4e4e7" stroke-width="2" stroke-linecap="round" />
                <line x1="12" y1="19" x2="12" y2="22" stroke="#e4e4e7" stroke-width="2" stroke-linecap="round" />
                <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="#e4e4e7" stroke-width="2" stroke-linecap="round" />
                <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="#e4e4e7" stroke-width="2" stroke-linecap="round" />
                <line x1="2" y1="12" x2="5" y2="12" stroke="#e4e4e7" stroke-width="2" stroke-linecap="round" />
                <line x1="19" y1="12" x2="22" y2="12" stroke="#e4e4e7" stroke-width="2" stroke-linecap="round" />
                <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="#e4e4e7" stroke-width="2" stroke-linecap="round" />
                <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="#e4e4e7" stroke-width="2" stroke-linecap="round" />
              </svg>

            </div>
            <div
            className='h-20 w-full flex justify-center items-center'>
              <svg
              onClick={()=>handellogout()}
              fill="none" height="40" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke={`${bordercolor}`} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
              </svg>

            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default HomeNavBar
