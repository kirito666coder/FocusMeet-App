import React, { useState } from 'react'

import { motion } from 'framer-motion'


const NoteLeft = () => {

    const [isOpne, setisOpne] = useState(false)
    const [isOpneSecond, setisOpneSecond] = useState(false)

    return (
             <>
              <motion.div
          className='h-[100vh] bg-blue-200 absolute z-10 top-0'
          animate={{ width: isOpne ? "100vw" : "0vw" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >

        </motion.div>
            <div className=' h-[75vh] w-[55%] rounded-3xl relative'>

                <div className=' absolute h-full w-full top-0 left-0'>
                    <div className=' relative z-11 bg-white h-[98%] w-[90%] ml-8 white border-blue-100 border-6 border-l-0 border-b-0'>
                         <h1 className='text-blue-100 font-bold text-4xl absolute top-3 left-86'>Your Notes </h1>
                        <motion.div
                            className=' absolute right-0 z-11 bg-blue-200 h-full '
                            initial={{ width: "0%" }}
                            animate={{ width: isOpne ? "100%" : "0%" }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            style={{ transformOrigin: "right", overflow: 'hidden' }}
                        >
                         <h1 className='text-white font-bold text-4xl absolute top-3 left-86'>NotePad </h1>
                         <img src="/notepad.png" className='mt-25 ml-50 h-110 opacity-60 '/>
                    


                        </motion.div>

                    </div>

                </div>


                <motion.div
                    className='bg-blue-200  h-[60%] w-[60%] rounded-2xl absolute top-30 left-40 '
                    initial={{ top: "130px", left: "150px", height: "60%", width: "60%" }}
                    animate={{
                        top: isOpne ? "-120px" : "120px", left: isOpne ? "100px" : "150px",
                        height: isOpne ? "115%" : "60%", width: isOpne ? "160%" : "60%",
                        opacity: isOpne ? "90%" : "40%", zIndex: isOpne ? "12" : "0",
                        background: isOpne ? "linear-gradient( 45deg, #fca5a5, #93c5fd)" : "",
                        border: isOpne ? "5px solid white" : ""
                    }}

                >
                    {isOpne && <div className=' h-full w-full flex flex-col justify-center items-start'>

                        <div className=' shadow-2xl border-t-2 border-t-white h-[70%] w-[60%] flex flex-col items-center justify-center'>

                            <h1 className='text-white font-bold  mt-2 text-3xl'>this is title</h1>
                            <h2 className='text-white font-bold  mt-2 w-[80%]'>this is note setion Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore rerum quos, perspiciatis sint doloremque nisi consectetur ad quibusdam qui numquam!</h2>
                        </div>
                    </div>}


                </motion.div>


                <motion.div className='  w-[100%] absolute top-25 h-100 flex items-center justify-center overflow-x-scroll overflow-y-hidden  flex-nowrap   ml-5'
                initial={{width:"100%"}}
                animate={{width:isOpne?"175%":"100%"}}>



                    <motion.div className=' card h-[60%] min-w-40 ml-10 relative'
                        initial={{ width: "10rem" }}
                        animate={{ height: isOpne ? "100%" : "60%", width: isOpne ? "17rem" : "10rem", marginLeft: isOpne ? "70rem" : "" }}
                    >

                        <motion.div className="z-15 absolute top-0 left-0 card  bg-red-400 h-full w-full"
                            initial={{ rotateY: 0 }}
                            animate={{ rotateY: isOpne ? -160 : 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            style={{ transformStyle: "preserve-3d", transformOrigin: "left", }}
                            onClick={() => setisOpne(true)}>
                            <div className="border-4 border-red-500 border-l-0 flex justify-center items-center flex-col z-10 absolute top-0 text-white text-2xl font-bold left-0 card  bg-red-400  h-full w-full "
                                style={{ backfaceVisibility: "hidden" }}
                                onClick={() => setisOpne(true)}
                            >
                                <h2 className=''>hello</h2>
                                <p className='text-sm ml-6'>hello this is note discription</p>
                            </div>
                            <div className="flex items-center flex-col z-10 absolute top-0 text-white text-2xl font-bold left-0 card  bg-red-400  h-full w-full "
                                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    setisOpne(false)
                                }}
                            >
                                <h2 className='mt-4'>hello</h2>
                                <p className='text-sm ml-6 mt-2'>hello this is note discription</p>
                                <svg className='m-3 fixed top-82' onClick={() => {
                                        setisOpneSecond(false)
                                        setisOpne(false)
                                    }} width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

                                        <circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="8" />


                                        <path d="M30 50 L50 30 L70 50 V75 H55 V55 H45 V75 H30 Z"
                                            fill="white" stroke="white" stroke-width="8" stroke-linejoin="round" />
                                    </svg>
                            </div>

                        </motion.div>

                        <motion.div className="z-14 flex flex-wrap justify-center items-center absolute top-0 left-0 bg-blue-400  h-full w-full "
                            onClick={() => setisOpne(false)}
                            initial={{ rotateY: 0 }}
                            animate={{ rotateY: isOpneSecond ? -160 : 0, zIndex: isOpneSecond ? 16 : 14 }}
                            exit={{ rotateY: 160 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            style={{ transformStyle: "preserve-3d", transformOrigin: "left", }}

                        >
                            <div className="z-14 flex flex-wrap justify-center items-center absolute top-0 left-0 bg-blue-400  h-full w-full "
                                style={{ backfaceVisibility: "hidden" }}
                            >
                                <p className='w-[90%]  ml-2 text-white font-bold'>hellosssssss ser you add note here how are you</p>


                                {isOpne && <div
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        setisOpneSecond(true)

                                    }}
                                    className=' absolute top-85 right-3'>

                                    <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

                                        <circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="8" />


                                        <line x1="30" y1="50" x2="65" y2="50" stroke="white" stroke-width="8" stroke-linecap="round" />
                                        <polyline points="50,35 70,50 50,65" fill="none" stroke="white" stroke-width="8" stroke-linecap="round" />
                                    </svg>
                                </div>}
                            </div>
                            <div className="z-14 flex flex-wrap justify-center items-center absolute top-0 left-0 bg-blue-400  h-full w-full "
                                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    setisOpneSecond(false)
                                    setisOpne(false)
                                }}>
                                <div className='flex justify-between  flex-col h-full w-full'>
                                    <svg className='m-3' onClick={() => {
                                        setisOpneSecond(false)
                                        setisOpne(false)
                                    }} width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

                                        <circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="8" />


                                        <path d="M30 50 L50 30 L70 50 V75 H55 V55 H45 V75 H30 Z"
                                            fill="white" stroke="white" stroke-width="8" stroke-linejoin="round" />
                                    </svg>


                                    <div className=' mx-auto border-2 mb-50 border-red-500 w-[70%] h-10 flex justify-center items-center text-red-500 font-bold text-xl hover:bg-red-500 hover:text-white'>
                                        Delete Note
                                    </div>


                                </div>
                            </div>

                        </motion.div>

                    </motion.div>

             </motion.div>


            </div>
            
             </>
        

    )
}

export default NoteLeft
