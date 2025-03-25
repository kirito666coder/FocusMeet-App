import React, { useState } from 'react'

const NoteRight = () => {
  
  const [error, seterror] = useState('')


  const [notes, setnotes] = useState({
    title:"",
    description:"",
    allcolors:{},
  })


  
  
  const handleonchange = (e)=>{
    setnotes({...notes,[e.target.name]: e.target.value})
    
  }
  
  
  const [selectedColor, setselectedColor] = useState({
    fastpagecolore:'',
    secondepagecolore:"",
    tages:[],
})


const handleFastPageColor = (color) => {
  setselectedColor((prev) => ({
    ...prev,
    fastpagecolore: color, 
  }));
};

const handleSecondPageColor = (color) => {
  setselectedColor((prev) => ({
    ...prev,
    secondepagecolore: color, 
  }));
};
  
  const colors = [
    "bg-red-300","bg-blue-300","bg-yellow-300", "bg-green-300","bg-purple-300","bg-sky-300"
  ]

const [tagevalue, settagevalue] = useState({
  tage:"",
})



const handletage = (color)=>{
  
  
  if(tagevalue.tage.trim() === ""){
   
       seterror("you need to add tage name")
       setTimeout(() => {
        seterror("")
       }, 2000);
       return
      }
      if(!color){
        seterror("you need to select an colore for your tage")
        setTimeout(() => {
         seterror("")
        }, 2000);
        return
      }
     
 
  
  setselectedColor((prev) => ({
    ...prev,
    tages: [...(prev.tages || []), { tage: tagevalue.tage, tagecolor: color }],
  }));
 console.log(selectedColor)
 settagevalue({tage:""})

}

const handleDeleteTag = (index) => {
  setselectedColor((prev) => ({
    ...prev,
    tages: prev.tages.filter((_, i) => i !== index), 
  }));
};

const handelsubmite = async (e)=>{
  e.preventDefault()

   if(notes.title.length <3){
      seterror("you need to add title")
      setTimeout(() => {
        seterror("")
      }, 2000);
      return
    }

    if(notes.description.length <3){
      seterror("you need to add description")
      setTimeout(() => {
        seterror("")
      }, 2000);
      return
    }
   
    const updatedNotes = {
      ...notes,          
      allcolors: selectedColor,  
    };
    setnotes(updatedNotes);
   
    try{
      
      const response = await fetch("http://localhost:3000/note/savingnote",{
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(updatedNotes)
      })

      const data = await response.json()

      console.log(data)
     
      setnotes((e)=>({...e,title:""}))
      setnotes((e)=>({...e,description:""}))
      setselectedColor((e)=>({...e,fastpagecolore:''}))
      setselectedColor((e)=>({...e,secondepagecolore:"" }))
      setselectedColor((e)=>({...e,tages:[]}))



    }catch(error){
      console.log("hey here is problme ",error)
    }
    
}


  return (
    <div className=' h-[95%] w-[45%] right-0 absolute top-10'>
         <div className='flex justify-center items-center h-full w-full'>

      <div className='bg-blue-100 h-[95%] w-[90%] '>
        <form className=' flex flex-col items-center gap-6 ' >
          <h2 className='text-white font-bold text-3xl mt-4'>Add Title</h2>
          <input
          onChange={handleonchange}
           name='title'
           value={notes.title}
           type="text"
           className=' outline-none  border-b-2 border-b-white h-9 bg-white  rounded-2xl  px-5 w-[90%]  ' />
         
            
            <div className='flex  gap-3 '>
            {colors.map((color)=>(
              <button
                 key={color}
                 className=
                 {`w-15 h-8 rounded-xl ${color} border-4 text-white font-bold ${
                  selectedColor === color ?"border-zinc-500 scale-110":" border-blue-100"
                 }`}
                
                 onClick={(e)=>{
                  e.preventDefault()
                  handleFastPageColor(color)
                 }}
                 >
                  {selectedColor.fastpagecolore === color && "✓"} 
              </button>
            ))}

          </div>
          <h2 className='text-white font-bold text-3xl'>Add Description</h2>
          <input
          onChange={handleonchange}
            name='description'
            value={notes.description}
           type="text"
           className=' outline-none  border-b-2 border-b-white h-9 bg-white mt-4 rounded-2xl  px-5 w-[90%]  ' />

              
            <div className='flex  gap-3 '>
            {colors.map((color)=>(
              <button
                 key={color}
                 className=
                 {`w-15 h-8 rounded-xl text-white font-bold ${color} border-4  ${
                  selectedColor === color ?"border-zinc-500 scale-110":" border-blue-100"
                 }`}
                
                 onClick={(e)=>{
                  e.preventDefault()
                  handleSecondPageColor(color)                 
                 }}
                 >
                   {selectedColor.secondepagecolore === color && "✓"} 
              </button>
            ))}

          </div>
            <h2 className='text-white font-bold text-3xl mt-4'>Add Tage</h2>
            <div className=' relative w-full flex justify-center items-center'>
          <input
          onChange={(e)=>{settagevalue({tage:e.target.value})}}
          name='tage'
          value={tagevalue.tage}
          type="text"
          className=' outline-none  border-b-2 border-b-white h-9 bg-white mt-4 rounded-2xl  px-5 w-[90%]  ' /> 
           <div
           onClick={()=>{handletage()}}
           className=' absolute h-7 bg-white text-blue-100  px-3 rounded-2xl right-9 top-5 hover:bg-blue-100 hover:text-white'>
            Add Tage
           </div>
          </div>
            
            <div className='flex  gap-3 '>
            {colors.map((color)=>(
              <button
                 key={color}
                 className=
                 {`w-15 h-8 rounded-xl ${color} border-4 ${
                  selectedColor === color ?"border-zinc-500 scale-110":" border-blue-100"
                 }`}
                
                 onClick={(e)=>{
                  e.preventDefault()
                  handletage(color)
                 }}
            
                 >
              </button>
            ))}

          </div>
          <div className='bg-white h-13 flex justify-center gap-5 items-center rounded-xl w-[90%]'>
          {Array.isArray(selectedColor.tages) && selectedColor.tages.map((tages,index)=>{
           return ( <div key={index} className={`h-8 px-2  text-white font-bold  flex justify-center items-center  rounded-2xl ${tages.tagecolor} `} >{tages.tage}
            <button
          className="ml-2 px-2 rounded-full  text-white"
          onClick={(e) =>{
            e.preventDefault()
            handleDeleteTag(index)
          }} 
        >
          ✖
        </button></div>)
             })}
          </div>

         {error && <p className='text-red-500 font-bold '>{error}</p>}
         {!error && <button
         onClick={handelsubmite}
         className='bg-green-300 hover:bg-green-400 rounded-2xl py-2 px-2 text-white font-bold'>ADD NOTE</button>}

              

        </form>


      </div>
         </div>
      
    </div>
  )
}

export default NoteRight
