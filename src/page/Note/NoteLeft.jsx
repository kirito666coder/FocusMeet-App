import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'


const NoteLeft = ({newdataincoming,setnewdataincoming,notesid}) => {

    const [isOpne, setisOpne] = useState(false)
    const [isOpneSecond, setisOpneSecond] = useState(false)
    const [data, setdata] = useState([])
    const [opennote, setopennote] = useState('')

   

    const listdata = async () => {

        try {

            const response = await fetch("http://localhost:3000/note/noteslist", {
                method: "GET",
                credentials: "include",
            })

            const Data = await response.json();
            setdata(Data)
        } catch (error) {
            console.log("no data", error)
        }
    }

    useEffect(() => {
        listdata()

    }, [])

    if(newdataincoming === true){
        listdata()
        setnewdataincoming(false)

    }
  


    useEffect(() => {
        
        if(notesid){
            setisOpne(true)
            setopennote(notesid)
        }
    
      
    }, [notesid])
    




    const handelDeletenote = async (noteID) => {

        try {
            const response = await fetch(`http://localhost:3000/note/notedelete/${noteID}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await response.json()
            setnewdataincoming(true)

        } catch (error) {

        }
    }

    const [selectedNote, setSelectedNote] = useState(null);

useEffect(() => {
    if (opennote) {
        const foundNote = data.find(note => note._id === opennote);
        setSelectedNote(foundNote || null);
    }
    
}, [opennote, data]);


    return (
        <>
            <motion.div
                className='h-[100vh] bg-blue-200 absolute   z-10 top-0'
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
                            <img src="/notepad.png" className='mt-25 ml-50 h-110 opacity-60 ' />



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
                            
                        <div className=' shadow-2xl border-t-2 border-t-white h-[70%] w-[60%] flex flex-col items-center justify-center '>
                          
                                <div className='w-full h-full flex justify-center items-center flex-col'>

                                <h1 className='text-white font-bold  mt-2 text-3xl'>{selectedNote.title}</h1>
                                <h2 className='text-white font-bold  mt-2'>{selectedNote.description}</h2>
                                </div>
                        
                          

                        </div>
                    </div>}


                </motion.div>


                <motion.div className='px-5 z-15 w-[100%] absolute h-120 flex items-center justify-center overflow-x-scroll overflow-y-hidden   ml-5'
                    initial={{ width: "90%" }}
                    animate={{ paddingLeft:!isOpne?"770px":"",width: isOpne ? "175%" : "90%", top:isOpne?"0":"20%" ,height:isOpne?"80%":"75%"}}>



                    {data.map((data, index) => (
                        <motion.div className=' cursor-pointer card h-[60%] min-w-40 ml-10 relative'
                            initial={{ width: "10rem" }}
                            animate={{ display: isOpne ? opennote === data._id ? "block" : "none" : "block", height: isOpne ? !opennote === index ?"0": "100%" : "60%", width: isOpne ? !opennote === index ?"0": "17rem" : "10rem", marginLeft: isOpne ? "80%" : "" }}
                            onClick={() => {

                                setisOpne(true)
                                setopennote(data._id)
                                console.log(opennote)
                            }}
                        >
                           <motion.div className='h-full w-full'
                           animate={{ display: isOpne ? opennote === data._id ? "block" : "none" : "block"}}
                           transition={{duration:0}}
                           >

                          
                            <motion.div key={index} className={` z-15 absolute top-0 left-0 card ${data.fastpagecolor} h-full w-full`}
                                initial={{ rotateY: 0 }}
                                animate={{  rotateY: isOpne ? -160 : 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                style={{ transformStyle: "preserve-3d", transformOrigin: "left", }}
                                onClick={() => setisOpne(true)}>
                                <div className={`ml-4 flex justify-center items-center flex-col z-10 absolute top-0 text-white text-2xl font-bold left-0 card  ${data.fastpagecolor} h-full  w-[80%] `}
                                    style={{ backfaceVisibility: "hidden" }}
                                    onClick={() => setisOpne(true)}
                                >
                                    <h2 className=''>{data.title}</h2>
                                    <p className='text-sm '>{data.description}</p>
                                </div>
                                <div className={`flex items-center flex-col z-10 absolute top-0 text-white text-2xl font-bold left-0 card  ${data.fastpagecolor}  h-full w-full `}
                                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        setisOpne(false)
                                    }}
                                >
                                    <h2 className='mt-4'>{data.title}</h2>
                                    <div className=' flex w-[90%] h-[65%] mt-5 gap-4 justify-center flex-wrap'>
                                        {data.tages.map((tage, index) => (
                                            <div key={index} className={`${tage.tagecolor} h-7 flex justify-center items-center border-2 border-white pb-2 px-2 py-2  rounded-2xl`}>{tage.tage}</div>
                                        ))}
                                    </div>
                                    <svg className='m-3 fixed top-100' onClick={() => {
                                        setisOpneSecond(false)
                                        setisOpne(false)
                                    }} width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

                                        <circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="8" />


                                        <path d="M30 50 L50 30 L70 50 V75 H55 V55 H45 V75 H30 Z"
                                            fill="white" stroke="white" stroke-width="8" stroke-linejoin="round" />
                                    </svg>
                                </div>

                            </motion.div>

                            <motion.div className={` z-14 flex flex-wrap justify-center items-center absolute top-0 left-0 ${data.secondpagecolor}  h-full w-full `}
                                onClick={() => {
                                    setisOpne(false)
                                }}
                                initial={{ rotateY: 0 }}
                                animate={{ rotateY: isOpneSecond ? -160 : 0, zIndex: isOpneSecond ? 16 : 14 }}
                                exit={{ rotateY: 160 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                style={{ transformStyle: "preserve-3d", transformOrigin: "left", }}

                            >
                                <div className={`z-14 flex flex-wrap justify-center items-center absolute top-0 left-0 ${data.secondpagecolor}  h-full w-full `}
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    <p className='w-[90%]  ml-2 text-white font-bold'>{data.description}</p>


                                    {isOpne && <div
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            setisOpneSecond(true)

                                        }}
                                        className=' absolute top-103 right-3'>

                                        <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

                                            <circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="8" />


                                            <line x1="30" y1="50" x2="65" y2="50" stroke="white" stroke-width="8" stroke-linecap="round" />
                                            <polyline points="50,35 70,50 50,65" fill="none" stroke="white" stroke-width="8" stroke-linecap="round" />
                                        </svg>
                                    </div>}
                                </div>
                                <div className={`z-14 flex flex-wrap justify-center items-center absolute top-0 left-0 ${data.secondpagecolor}  h-full w-full `}
                                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        setisOpneSecond(false)
                                        setisOpne(false)
                                    }}>
                                    <div className='flex justify-between  flex-col h-full w-full'>
                                        <svg className='m-3 ' onClick={() => {
                                            setisOpneSecond(false)
                                            setisOpne(false)
                                        }} width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

                                            <circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="8" />


                                            <path d="M30 50 L50 30 L70 50 V75 H55 V55 H45 V75 H30 Z"
                                                fill="white" stroke="white" stroke-width="8" stroke-linejoin="round" />
                                        </svg>


                                        <div
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                handelDeletenote(data._id)
                                                setisOpneSecond(false)
                                                setisOpne(false)
                                            }}
                                            className=' mx-auto border-2 mb-50 border-red-500 w-[70%] h-10 flex justify-center items-center text-red-500 font-bold text-xl hover:bg-red-500 hover:text-white'>
                                            Delete Note
                                        </div>


                                    </div>
                                </div>

                            </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}

                </motion.div>


            </div>

        </>


    )
}

export default NoteLeft
