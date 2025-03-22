import React, { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'
const Task = () => {
   const [currentHour, setcurrentHour] = useState(new Date().getHours());
   const [isAM, setisAM] = useState(currentHour<12)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setcurrentHour(now.getHours());
      setisAM(now.getHours() < 12);

    }, 60000);
   

    return ()=> clearInterval(interval)
  
  }, [])
  


  const formattedHour = currentHour === 0 ? 12 : currentHour > 12 ? currentHour - 12 : currentHour;
  const timeList = Array.from({ length: 12 }, (_, i) => i + 1);


  return (
    <>
     <Navbar />
      <main className='bg-zinc-900 h-[95vh] w-screen'>
       <div className='flex border-4  border-white  bg-sky-300 h-[100%] w-[100%]'>
       <div className="time w-[5%] flex justify-center items-center">
        <ul className='text-xl font-bold text-white flex flex-col w-full  h-full overflow-hidden'>
         
         {timeList.map((hour,index) => {
           const period = isAM ? "AM" : "PM";
           return(

             <li 
             key={index}
             className={` flex flex-col ml-4 w-20 ${formattedHour === hour ? "bg-white  rounded-2xl text-sky-300":""}`}
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
          <ul className='flex text-5xl text-gray-500 w-[92%] justify-between ml-15'>
            <li className='p-4 bg-zinc-200 rounded-2xl '>12</li>
            <li className='p-4 bg-zinc-200 rounded-2xl '>12</li>
            <li className='p-4 bg-zinc-200 rounded-2xl '>12</li>
            <li className='p-4 bg-zinc-200 rounded-2xl '>12</li>
            <li className='p-4 bg-zinc-200 rounded-2xl '>12</li>
            <li className='p-4 bg-zinc-200 rounded-2xl '>12</li>
            <li className='p-4 bg-zinc-200 rounded-2xl '>12</li>
            <li className='p-4 bg-zinc-200 rounded-2xl '>12</li>
            <li className='p-4 bg-zinc-200 rounded-2xl '>12</li>
            <li className='p-4 bg-zinc-200 rounded-2xl '>12</li>
            <li className='p-4 bg-zinc-200 rounded-2xl '>12</li>
            
          </ul>
          <div className=' h-100 w-full mt-10 flex items-center justify-center '>
           <div className="task h-90 w-[40%] bg-white rounded-4xl shadow-2xl shadow-zinc-600">
           <h3 className=' font-bold text-black m-5 '>Today's Tasks - May 16 2025</h3>
           <ul className=' flex-wrap flex gap-x-1 gap-y-4'>


            <li className='h-30 bg-red-200 w-[45%] ml-5 rounded-2xl'>
              <div className='flex mt-5  justify-between'>
              <h3 className='text-xl font-medium ml-5 '>Website Design</h3>
              <div className='mr-2'>hi</div>
              </div>
              <p className='text-sm ml-5'>Website Design</p>
            </li>
                  
                  
            
            <li className='h-30 bg-red-200 w-[45%] ml-5 rounded-2xl'>
              <div className='flex mt-5  justify-between'>
              <h3 className='text-xl font-medium ml-5 '>Website Design</h3>
              <div className='mr-2'>hi</div>
              </div>
              <p className='text-sm ml-5'>Website Design</p>
            </li>


            
            <li className='h-30 bg-red-200 w-[45%] ml-5 rounded-2xl'>
              <div className='flex mt-5  justify-between'>
              <h3 className='text-xl font-medium ml-5 '>Website Design</h3>
              <div className='mr-2'>hi</div>
              </div>
              <p className='text-sm ml-5'>Website Design</p>
            </li>


            
            <li className='h-30 bg-red-200 w-[45%] ml-5 rounded-2xl'>
              <div className='flex mt-5  justify-between'>
              <h3 className='text-xl font-medium ml-5 '>Website Design</h3>
              <div className='mr-2'>hi</div>
              </div>
              <p className='text-sm ml-5'>Website Design</p>
            </li>



           </ul>
           </div>
           <div className="flex flex-col  items-center  create-task w-[50%] bg-white ml-15 h-90 rounded-4xl shadow-2xl shadow-zinc-600">
                <input type="text" placeholder='Add task' className='mx-auto mt-5 h-12 w-[90%] border-none outline-none bg-zinc-300 py-3 px-5 rounded-2xl text-zinc-900' />
               <button className='bg-green-200 w-30 py-1 rounded-2xl mt-4 hover:bg-green-300  '>Add</button>

              <ul className=' w-full h-60'>
                
              <li className='m-auto h-16 bg-blue-200 w-[90%] rounded-2xl'>
              <div className='flex mt-5  justify-between'>
              <h3 className='text-xl mt-2 font-medium ml-5 '>Website Design</h3>
              <div className='mr-2 mt-3'>hi</div>
              </div>
              <p className='text-sm ml-5'>Website Design</p>
            </li>
                
              <li className='m-auto h-16 bg-blue-200 w-[90%] rounded-2xl'>
              <div className='flex mt-5  justify-between'>
              <h3 className='text-xl mt-2 font-medium ml-5 '>Website Design</h3>
              <div className='mr-2 mt-3'>hi</div>
              </div>
              <p className='text-sm ml-5'>Website Design</p>
            </li>
                
              <li className='m-auto h-16 bg-blue-200 w-[90%] rounded-2xl'>
              <div className='flex mt-5  justify-between'>
              <h3 className='text-xl mt-2 font-medium ml-5 '>Website Design</h3>
              <div className='mr-2 mt-3'>hi</div>
              </div>
              <p className='text-sm ml-5'>Website Design</p>
            </li>



              </ul>
               
           </div>
          </div>
        </div>
       </div>
      </main>
    </>
  )
}

export default Task
