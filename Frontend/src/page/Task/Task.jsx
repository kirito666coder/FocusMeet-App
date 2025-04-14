import React, { useEffect, useState } from 'react'

import Navbar from '../../components/Navbar'
import { motion } from 'framer-motion';
const Task = () => {
  const [currentHour, setcurrentHour] = useState(new Date().getHours());
  const [isAM, setisAM] = useState(currentHour < 12)
  const [Loading, setLoading] = useState(true)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setcurrentHour(now.getHours());
      setisAM(now.getHours() < 12);

    }, 60000);


    return () => clearInterval(interval)

  }, [])

  const [next10Days, setnext10Days] = useState([])

  useEffect(() => {
    const fetchNext10Days = async () => {
      try {
        const response = await fetch("http://localhost:3000/task/next10days", {
          method: "GET",
        })

        const data = await response.json()
        setnext10Days(data);

      } catch (error) {

      } finally {

        setLoading(false)
      }
    }

    fetchNext10Days()
  }, [])

  useEffect(() => {

  }, [setnext10Days])




  const formattedHour = currentHour === 0 ? 12 : currentHour > 12 ? currentHour - 12 : currentHour;
  const timeList = Array.from({ length: 12 }, (_, i) => i + 1);

  const [taskForm, settaskForm] = useState({
    title: "",
    description: "",
    bgcolor: "",
  })

  const [taskFormSending, settaskFormSending] = useState(false)
  const [saveing, setsaveing] = useState("Add")
  const [taskError, settaskError] = useState('')

  const handelchange = (e) => {
    settaskForm({ ...taskForm, [e.target.name]: e.target.value })
  }

  const handelcolor = (color) => {

    settaskForm({ ...taskForm, bgcolor: color })
  }

  const handelsubmit = async (e) => {
    e.preventDefault()

    settaskFormSending(true)
    setsaveing("Saveing")
    if (taskForm.title.length < 3) {
      settaskError("Title is to short")
      setTimeout(() => {
        settaskError("")
      }, 1500);
      settaskFormSending(false)
      setsaveing("Add")
      return

    }

    if (taskForm.description.length < 3) {
      settaskError("Description is to short")
      setTimeout(() => {
        settaskError("")
        settaskFormSending(false)
        setsaveing("Add")
      }, 1500);
      return
    }

    if (!taskForm.bgcolor) {
      settaskFormSending(false)
      settaskForm({ ...taskForm, bgcolor: "bg-red-300" })
    }

    const response = await fetch("http://localhost:3000/task/taskSave", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskForm),
    })

    const data = response.json();



    handelshowTasks()

    settaskFormSending(false)
    setsaveing("Add")

    settaskForm({ ...taskForm, title: "", description: "", bgcolor: "" })
  }

  const [showTasks, setshowTasks] = useState([])


  const handelshowTasks = async () => {
    try {

      const response = await fetch("http://localhost:3000/task/taskList", {
        method: "GET",
        credentials: "include",
      })


      const data = await response.json()

      setshowTasks(data)


    } catch (error) {

    }


  }
  useEffect(() => {
    handelshowTasks()

  }, [])


  const handelDeletetask = async (taskid) => {

    try {
      const response = await fetch(`http://localhost:3000/task/taskdelete/${taskid}`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },

      })

      const data = await response.json()


    } catch (error) {

    }
    handelshowTasks()
  }


  return (
    <>
    
      <Navbar />
      <motion.main className='bg-zinc-900 h-[95vh] w-screen'
       initial={{ opacity: 0, width:0 }}
       animate={{ opacity: 1, width:"100vw" }}
       exit={{ opacity: 0, width:"90vw" }}
       transition={{ duration: 0.4 }} 
      >
        <div className='flex border-4  border-white  bg-sky-300 h-[100%] w-[100%]'>
          <div className="time w-[5%] flex justify-center items-center">
            <ul className='text-xl gap-1 font-bold text-white flex flex-col w-full  h-full overflow-hidden'>

              {timeList.map((hour, index) => {
                const period = isAM ? "AM" : "PM";
                return (

                  <li
                    key={index}
                    className={` flex flex-col ml-4 w-20 ${formattedHour === hour ? "bg-white  rounded-2xl text-sky-300" : ""}`}
                  >
                    <span className='ml-1'>{hour}</span> <span className='text-xl'>{period}</span>
                  </li>
                )

              })}


            </ul>
          </div>
          <div className=' border-x-4 bg-white border-white rounded-l-[3rem] w-[96%] h-[100%]'>
            <div className='flex justify-between items-center'>
              <h1 className='m-15 text-5xl font-bold text-sky-300'>My Task</h1>
              <input type="text" placeholder='Search' className=' px-6 mr-15 bg-zinc-200 p-3 w-75 rounded-2xl' />
            </div>
            <ul className='flex text-5xl text-gray-500 w-[92%]  justify-between ml-15'>

              {next10Days.map((day, index) => {

                return (
                  <li key={index} className={` p-4 px-6 ${index === 0 ? " bg-white border-x-3 rounded-t-2xl border-t-3 border-zinc-200" : " rounded-2xl  bg-zinc-200"} `}>
                    <div className='flex flex-col'>
                      <span className='font-bold' >{day.dayNumber}</span>
                      <span className='text-xl ml-2 font-bold'>{day.dayName}</span>
                    </div>
                  </li>
                )
              })}




            </ul >
            <div className=' h-100 w-full mt-10 flex items-center justify-center '>
              <div className=" overflow-hidden task h-90 w-[40%] bg-white rounded-4xl shadow-2xl shadow-zinc-600">
                {Loading ? (
                  <h3 className="font-bold text-gray-500 m-5">Loading tasks...</h3>
                ) : next10Days.length > 0 ? (
                  <h3 className=' font-bold text-black m-5 '>Today's Tasks - {next10Days[0].month} {next10Days[0].dayNumber} {next10Days[0].year}</h3>
                ) : (
                  <h3 className="font-bold text-gray-500 m-5">No tasks available</h3>
                )}

                <div className=' overflow-x-scroll w-full h-[80%]'>
                  {showTasks.length === 0 ? (
                    <div className='flex justify-center items-center'>
                    <h1 className='text-zinc-200 text-5xl m-auto font-bold'>Nothing to show</h1>
                    </div>
                  ) : (

                    <ul className=' flex-wrap flex gap-x-1 gap-y-4  '>

                      {showTasks.map((data, index) => {


                        return (

                          <li key={index} className={`h-30 ${data.color} w-[45%] ml-5 rounded-2xl`}>
                            <div className='flex mt-5  justify-between'>
                              <h3 className='text-xl font-medium ml-5 '>{data.title}</h3>
                              <div
                                onClick={() => { handelDeletetask(data._id) }}
                                className='mr-2'>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6 text-white hover:text-red-500 cursor-pointer"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 3a1 1 0 011-1h4a1 1 0 011 1v1h4a1 1 0 110 2h-1v13a3 3 0 01-3 3H8a3 3 0 01-3-3V6H4a1 1 0 110-2h4V3zm2 2h2V4h-2v1zM7 6v13a1 1 0 001 1h8a1 1 0 001-1V6H7zm3 3a1 1 0 112 0v8a1 1 0 11-2 0V9zm4 0a1 1 0 112 0v8a1 1 0 11-2 0V9z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                            <p className='text-sm ml-5'>{data.description}</p>
                          </li>

                        )

                      })}

                    </ul>
                  )}
                </div>
              </div>
              <div className="flex flex-col  items-center  create-task w-[50%] bg-white ml-15 h-90 rounded-4xl shadow-2xl shadow-zinc-600">
                {taskError && <p className=' font-bold text-red-600'>{taskError}</p>}

                <form
                  onSubmit={handelsubmit}
                  className='flex flex-col  items-center w-full'>

                  <input
                    onChange={handelchange}
                    value={taskForm.title}
                    name='title'
                    type="text"
                    placeholder='Title'
                    className='mx-auto mt-5 h-12 w-[90%] border-none outline-none bg-zinc-300 py-3 px-5 rounded-2xl text-zinc-900' />

                  <input
                    onChange={handelchange}
                    value={taskForm.description}
                    name='description'
                    type="text"
                    placeholder='Description'
                    className='mx-auto mt-5 h-12 w-[90%] border-none outline-none bg-zinc-300 py-3 px-5 rounded-2xl text-zinc-900' />


                  <div className='flex cursor-pointer w-[90%] m-auto gap-5 mt-4'>

                    {[
                      { color: "red", colorName: "bg-red-300" },
                      { color: "blue", colorName: "bg-blue-300" },
                      { color: "green", colorName: "bg-green-300" },
                      { color: "yellow", colorName: "bg-yellow-300" },
                      { color: "purple", colorName: "bg-purple-300" },
                      { color: "sky", colorName: "bg-sky-300" },

                    ].map(({ color, colorName }) => {
                      return (

                        <label key={color} className='relative h-10 w-50'>
                          <input
                            onClick={() => { handelcolor(colorName) }}
                            value={color}
                            name='choice'
                            type="radio"
                            className='h-10 w-full peer hidden'
                          />
                          <div className={`h-10 w-full ${colorName}  absolute z-10 top-0 peer-checked:border-3 rounded-2xl peer-checked:border-zinc-400 text-white font-bold flex justify-center items-center`}>{color.toUpperCase()}</div>
                        </label>
                      )
                    })}

                  </div>

                  <button
                    disabled={taskFormSending}
                    type='submit'
                    className='bg-green-300 w-30 py-1 rounded-2xl mt-4 hover:bg-green-400 text-white font-bold '>Add</button>

                </form>


              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </>
  )
}

export default Task
