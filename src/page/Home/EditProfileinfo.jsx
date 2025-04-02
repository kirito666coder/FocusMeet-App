import React, { useState } from 'react'

const EditProfileinfo = ({ hovercolore, bordercolor, bgcorlor, textcolor, setEditOn }) => {


    const [error, seterror] = useState('')

    const [ProfileBackpicture, setProfileBackpicture] = useState(null)
    const [Profilepicture, setProfilepicture] = useState(null)
    const [newusername, setnewusername] = useState("")

    const [Edituser, setEdituser] = useState({
        profilepic:null,
        profilepicback:null,
        newusername:"",
    })
   
      const handelprofilepicture = (e)=>{
        const file = e.target.files[0]
        setProfilepicture(URL.createObjectURL(file))
         setEdituser((e)=>({
            ...e,profilepic:file
         }))
      }
      
      const handelprofilebackpicture = (e)=>{
        const file = e.target.files[0]
        setProfileBackpicture(URL.createObjectURL(file))
        setEdituser((e)=>({
            ...e,profilepicback:file
        }))
      }

      const handelSubmit = async ()=>{
       try{

           const formData = new FormData();
           
           formData.append("profilepic",Edituser.profilepic);
           formData.append("profilepicback",Edituser.profilepicback);
           formData.append("newusername",newusername);
           
           
            
            const response = await fetch("http://localhost:3000/editprofile/edit",{
                method:"PUT",
                credentials:"include",
                body:formData,
            })
            
            const data = await response.json()
            
         
            if(!response.ok){
                seterror(data.message)
               setTimeout(() => {
                seterror("")
               }, 3000);
                return
            }

           
           setEditOn(false)
        }catch(error){
            console.log("edit fali",error)
        }

      }
 

    return (
        <div className={` fixed ${bgcorlor} h-[100vh] w-[45%] top-0 z-20 `}>
            <div className={` w-full h-10 ${textcolor} flex items-center gap-4`}>
                <div
                    onClick={() => {
                        setEditOn(false)
                    }}
                    className={`ml-3 cursor-pointer text-4xl border-1 ${bordercolor} h-6 flex justify-center items-center rounded-2xl pb-1.5 ${hovercolore} px-2`}>←</div>

            </div>
            <div className={`border-1 border-white h-[95%] w-full`}>
                <div className={` rounded-2xl relative w-[90%] h-[80%] border-1 border-${bordercolor} mx-auto mt-15`}>
                  <form onSubmit={(e)=>{
                    e.preventDefault()
                    handelSubmit()}} >

                    <div className={` relative rounded-2xl w-[95%] h-60 border-1 border-${bordercolor} mx-auto mt-4`}>
                        <img src={ProfileBackpicture} alt="" className={`h-full object-cover w-full rounded-2xl`} />
                        <input 
                        onChange={handelprofilebackpicture}
                        type="file" className={`${textcolor} z-10 opacity-0  absolute bottom-0 right-3 h-10 w-10 border-white `} />
                               <svg
                        className={` absolute right-4 bottom-1  opacity-50`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="35" height="35"
    fill={`${bordercolor}`}
>
    <path d="M4 7a2 2 0 0 1 2-2h2.586l1.707-1.707A1 1 0 0 1 11 3h2a1 1 0 0 1 .707.293L15.414 5H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Zm8 10a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm6-7a1 1 0 1 0-1-1 1 1 0 0 0 1 1Z"/>
</svg>
                    </div>
                    <div className={` absolute h-35 w-35 rounded-full border-${bordercolor} border-1 top-46 left-[40%]`}>
                        <img src={Profilepicture} alt="" className={`h-full object-cover w-full rounded-full`} />
                        <div className={` absolute bottom-10 right-12`}>
                        <input 
                        onChange={handelprofilepicture}
                        type="file" className={`${textcolor} z-10 opacity-0  border-white w-10 absolute top-0 left-0`} />
                        <svg
                        className={` absolute  opacity-50`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="35" height="35"
    fill={`${bordercolor}`}
>
    <path d="M4 7a2 2 0 0 1 2-2h2.586l1.707-1.707A1 1 0 0 1 11 3h2a1 1 0 0 1 .707.293L15.414 5H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Zm8 10a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm6-7a1 1 0 1 0-1-1 1 1 0 0 0 1 1Z"/>
</svg>

                        </div>
                    </div>
                    <input 
                    onChange={(e)=>{
                        setnewusername(e.target.value)
                    }}
                    type="text" value={newusername} className={`${textcolor} px-5 rounded-3xl  h-10 border-${bordercolor} border-1 absolute bottom-50 left-[5%] w-[90%]`} />
                   {error &&  <p className='text-red-500 absolute bottom-40 left-[32%]'>{error}</p>}
                <button 
                
                className={` rounded-2xl opacity-70 hover:opacity-100  ${bgcorlor} invert ${textcolor} px-5 py-1 absolute bottom-10 left-[45%]`}>Edit</button>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfileinfo
