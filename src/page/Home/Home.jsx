import React, { useEffect, useState } from 'react'

import Navbar from '../../components/Navbar'
import HomeNavBar from './HomeNavBar'
import HomeMainPage from './HomeMainPage'
import HomeRight from './HomeRight'

const home = () => {

  const [DarckMode, setDarckMode] = useState(true)

  const [bgcorlor, setbgcorlor] = useState("bg-zinc-300")
  const [textcolor, settextcolor] = useState("text-black")
  const [bordercolor, setbordercolor] = useState('black')
  const [hovercolore, sethovercolore] = useState("hover:bg-white")
  
  useEffect(() => {
  if(DarckMode){
    setbgcorlor("bg-black")
    settextcolor("text-white")
    setbordercolor("white")
    sethovercolore("hover:bg-zinc-700")
  }else{
    setbgcorlor("bg-zinc-200")
    settextcolor("text-black")
    setbordercolor("black")
    sethovercolore("hover:bg-zinc-300")
  }
  }, [DarckMode])
  
const [Profilepageture, setProfilepageture] = useState(false)
const [Postpage,setPostpage] = useState(false)


const [data, setdata] = useState({})
//  user data username pfilepic
  useEffect(() => {
    const dataget = async ()=>{
        try{

            const response = await fetch("http://localhost:3000/editprofile/userdata",{
                method:"GET",
                credentials:"include",

            })
            const Data = await response.json()
            setdata(Data.user)
          }catch(error){
            
          }
        }  
        dataget()
        
      }, [])
      

      // post data 
const [userpostdata, setuserpostdata] = useState({})

      const postdata = async ()=>{
        try{
         const response = await fetch("http://localhost:3000/post/getpost",{
          method:"GET",
          credentials:"include",
         })
         const Data = await response.json();
          setuserpostdata(Data)
        }catch{
          
        }
      }

      useEffect(() => {
        
        postdata()
      }, [])
   
      
  return (
    <>
     {/* <Navbar /> */}
     <div className='flex  hover:bg-white'>
  <HomeNavBar  setPostpage={setPostpage} setProfilepageture={setProfilepageture} DarckMode={DarckMode} setDarckMode={setDarckMode} hovercolore={hovercolore} bgcorlor={bgcorlor} textcolor={textcolor} bordercolor={bordercolor}/>
     <HomeMainPage postdata={postdata} setuserpostdata={setuserpostdata} userpostdata={userpostdata} data={data} setPostpage={setPostpage} setProfilepageture={setProfilepageture} Postpage={Postpage} Profilepageture={Profilepageture} bgcorlor={bgcorlor} hovercolore={hovercolore} textcolor={textcolor} bordercolor={bordercolor}/>
  <HomeRight data={data} hovercolore={hovercolore}  bgcorlor={bgcorlor} textcolor={textcolor} bordercolor={bordercolor}/>
     </div>
    
    </>
  )
}

export default home
