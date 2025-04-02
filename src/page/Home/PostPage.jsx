import React, { useState } from 'react'

const PostPage = ({
  fetchdatafollowedpost,
  allpost,
  postdata,
  hovercolore,
  bordercolor,
  bgcorlor,
  textcolor,
  setPostpage
}) => {

  const [Image, setImage] = useState(null)
  const [heading, setheading] = useState('')
  const [Postimage, setPostimage] = useState(null)

  const handelimagefile = (e)=>{
     const file = e.target.files[0];

     if(file){
        setImage(URL.createObjectURL(file))
        setPostimage(file)  
      }
     
  }
 const hendalSubmit = async ()=>{
   
  const formData = new FormData;

  formData.append("heading",heading)
  formData.append("postimage",Postimage)
   
   const response = await fetch("http://localhost:3000/post/post",{
    method:"POST",
    credentials:"include",
    body:formData,
   })

   const data = await response.json();
  
      
   if(!response.ok){
    return console.log("error")
   }
   postdata()
   setPostpage(false)
   allpost()
   fetchdatafollowedpost() 
    
 }


  return (
    <div className={`z-20 relative bg-transparent backdrop-blur-xs ${textcolor} w-full `}>
       <div
            onClick={()=>{
              setPostpage(false)
            }}
            className={`ml-3 cursor-pointer text-4xl border-1 ${bgcorlor} ${bordercolor} h-6 flex justify-center items-center rounded-2xl pb-1.5 ${hovercolore} px-2 w-16 m-5`}>←</div>
             
             <div className={` z-10 border-${bordercolor} rounded-2xl  border-1 w-[80%] h-130 mx-auto absolute  left-18 top-30`}>
                <form onSubmit={(e)=>{
                  e.preventDefault()
                  hendalSubmit()
                }}>
                  <input onChange={(e)=>{
                     setheading(e.target.value)
                  }} type="text" className={` outline-none border-${bordercolor} border-1 rounded-2xl h-10  w-[90%] ml-7 mt-15 px-4`} />
                  <div className={` w-full flex justify-center items-center h-100`}>
                  <input 
                  onChange={handelimagefile}
                  accept='image/*'
                  type="file" placeholder='' className={`  opacity-0 rounded-2xl h-80 border-${bordercolor} border-1 w-[90%] `} />
                  </div>
                  <button className={` h-10 w-20 font-bold ${bgcorlor} invert opacity-50  hover:opacity-100 absolute top-140 left-60 rounded-2xl cursor-pointer`}>Post</button>
                </form>

             </div>



                  <img src={Image} alt="" className={` border-${bordercolor} object-cover object-top border-1 absolute top-66 h-79 opacity-100 left-26 rounded-2xl w-128`}/>


    </div>
  )
}

export default PostPage
