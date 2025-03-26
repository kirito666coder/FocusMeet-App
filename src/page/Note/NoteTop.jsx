import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

const NoteTop = ({newdataincoming,setnewdataincoming,settypeOn,typeOn,setnotesid}) => {

  const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    
  const [data, setdata] = useState([])
  
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
   
  

    const searchNotes = async (query) => {
      try {
          const response = await fetch(`http://localhost:3000/note/search?q=${query}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("token")}` 
              },
              credentials: "include",
          });
  
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Failed to fetch notes");
  
          if (!Array.isArray(data)) {
              console.error("Invalid response format:", data);
              return [];
          }
  

          setResults(data)
          console.log(data)
          
          return data.sort((a, b) => {
              const aTitleMatch = a.title.toLowerCase().includes(query.toLowerCase()) ? 2 : 0;
              const aDescMatch = a.description.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
              const aTagMatch = a.tages.some(tag => tag.tage.toLowerCase().includes(query.toLowerCase())) ? 1 : 0;
  
              const bTitleMatch = b.title.toLowerCase().includes(query.toLowerCase()) ? 2 : 0;
              const bDescMatch = b.description.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
              const bTagMatch = b.tages.some(tag => tag.tage.toLowerCase().includes(query.toLowerCase())) ? 1 : 0;
  
              return (bTitleMatch + bDescMatch + bTagMatch) - (aTitleMatch + aDescMatch + aTagMatch);
          });
  
      } catch (error) {
          console.error("Error searching notes:", error);
          return [];
      }
  };
  
    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 2) searchNotes(value);
        else setResults([]); 
        
        
        settypeOn(false)
        if(query.length >1){
          settypeOn(true)
        }
      }

    const handelnotesid =(id)=>{
      setnotesid(id)
    }


  return (
    <div className=' h-[20vh] flex'>
      <div>

        <div className=' relative w-[55vw] h-15 flex justify-center items-center'>
        <input 
        placeholder='Search notes....'
   value={query}
   onChange={handleSearch}
        type="text"
         className=' placeholder:text-white   bg-blue-200 w-[80%] text-white h-12 rounded-full outline-none font-bold border-none px-5 ' />
       
        </div>

        <motion.div className=' w-[100%] flex justify-center items-center'>
          <ul className='flex flex-wrap gap-2 w-[90%] p-3 bg-blue-100 h-22 rounded-2xl '>
           {data.map((data,index)=>(
             <li onClick={()=>{
              handelnotesid(data._id)
              settypeOn(false)
               setQuery("")}} key={index} className={`${data.fastpagecolor} cursor-pointer h-8 min-w-15 w-auto p-1 max-w-50 overflow-hidden rounded-2xl text-white font-bold flex justify-center items-center   hover:border-2 hover:border-white   `} >{data.title}</li>
           ))}
         
          </ul>
        </motion.div>

      </div>
      <div className=' w-full'>
            <motion.div className='bg-blue-100 h-[300%] mt-2 flex justify-center items-center rounded-b-2xl mr-3'
            initial={{height:"0"}}
            animate={{height:query.length > 1?"300%":"0%" , display:query.length > 1 ? "block":"none"}}
            
            >{results.length > 0 ?(
                 <ul className='w-full h-full flex justify-center items-center gap-5'>
                  {results.map((data,index)=>{

                   return <li onClick={()=>{handelnotesid(data._id)
                    setQuery("")
                    settypeOn(false)
                   }}
           key={index} className={`${data.fastpagecolor} px-2 py-2 rounded-2xl cursor-pointer text-white`}>{data.title}</li>
                  })}
                 </ul>
              
            ):(
           <motion.div className='text-7xl text-white font-bold mb-30'
              initial={{display:"none"}}
              animate={{display:typeOn?"block":"none"}}
              >Nothing to show</motion.div>
            )}
            </motion.div>

      </div>
      
    
      
    </div>
  )
}

export default NoteTop
