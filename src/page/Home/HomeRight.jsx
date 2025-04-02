import React, { useEffect, useState } from 'react'
import { followuser, getfollowedusers, unfollowuser } from '../../api/api.follow'
import { mostLikePost } from '../../api/api.mostLikePost'

const HomeRight = ({ data, hovercolore, bordercolor, bgcorlor, textcolor }) => {

  const [isfocus, setisfocus] = useState(false)
  const [alluser, setalluser] = useState([])
  const [searchTerm, setsearchTerm] = useState('')

  const allusers = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/alluser", {
        method: "GET"
      })

      const data = await response.json()
      setalluser(data)

    } catch (error) {
      console.error("error in fetch data", error)
    }
  }

  useEffect(() => {
    allusers()
  }, [])

  const [following, setfollowing] = useState([])

  useEffect(() => {
    const checkfollowing = async () => {
      const followeduser = await getfollowedusers();
      setfollowing(followeduser.map(user => user._id));
    }
    checkfollowing();
  }, [following]);

  const handlefollow = async (targetuserid) => {
    await followuser(targetuserid);
    setfollowing([...following, targetuserid])
  }

  const handleunfollow = async (targetuserid) => {
    await unfollowuser(targetuserid);
    setfollowing(following.filter(id => id !== targetuserid));
  }

  const [mostlike, setmostlike] = useState({})

  const getmostlikepost = async () => {
    const data = await mostLikePost()
    setmostlike(data)
   
  }

  useEffect(() => {
    getmostlikepost()
  }, [])


const filtereusers = alluser.filter((user)=>
user.username.toLowerCase().includes(searchTerm.toLowerCase())
)

  return (
    <div className={`${bgcorlor}  h-[100vh] w-[30vw] overflow-scroll`}>
      <div className={` h-19 w-[80%] m-auto mt-2 
       `}>
        <div className={`flex gap-4 ${hovercolore} h-full rounded-full w-fit py-1 px-2 `}>
          <div
            style={{ backgroundImage: `url('http://localhost:3000/${data.profilepic}')` }}
            className={` h-15 w-15 rounded-full bg-center bg-cover`}>
          </div>
          <div>
            <h1 className={`${textcolor} font-bold text-xl`}>{data.username}</h1>
            <p className={`${textcolor} font-bold text-xs`}>{data.email}</p>
          </div>
        </div>
        <div className=' relative mt-2'>
          <input
          value={searchTerm}
          onChange={(e)=>setsearchTerm(e.target.value)}
            onFocus={() => { setisfocus(true) }}
            onBlur={() => { setTimeout(() => {setisfocus(false)}, 500);
          }}
            type="text"
             className={`h-10 w-full border-1 border-${bordercolor} ${textcolor}  rounded-full  outline-none px-2 z-10 ${bgcorlor}`} />
          {isfocus &&
            <div className={`border-1 z-5 border-${bordercolor} absolute w-full top-9  min-h-30 rounded-2xl ${textcolor} flex justify-center ${bgcorlor}`}>
           {filtereusers.length <3 ? (
             <ul className=' w-[94%] m-auto h-64 rounded-2xl overflow-scroll'>

             {filtereusers.map((user) => {
            
               const isfollowing = following.includes(user._id);
               return (
                 <li key={user._id} className={` ${user._id === data._id ? "hidden" : ""} relative flex gap-4 mt-2  border-1 border-${bordercolor} w-[90%] mt-1 rounded-3xl ${hovercolore} px-1 h-12 mx-auto`}>
                   <div
                     style={{ backgroundImage: `url("http://localhost:3000/${user.profilepic}")` }}
                     className={`h-10 w-10 rounded-full bg-center bg-cover`}></div>
                   <h3 className={`${textcolor} font-medium mt-1`}>{user.username}</h3>
                   <button
                     onClick={(e) =>{
                       e.stopPropagation()                      
                      isfollowing ? handleunfollow(user._id) : handlefollow(user._id)}}
                     className={`h-8 font-bold rounded-2xl px-2 absolute top-1.5 right-1 ${isfollowing ? "bg-red-400 hover:bg-red-500 " : "bg-blue-400 hover:bg-blue-500"} flex justify-center items-center ${textcolor}`}>
                     {isfollowing ? "unfollow" : "follow"}
                   </button>
                 </li>
 
               )
             })}
 
 
           </ul>
           ):(
             <span className='mt-10 text-2xl opacity-40'>Search user</span>
            )} 
            </div>
          }
        </div>

        <div className={`border-1 mt-5 h-137 rounded-2xl border-${bordercolor}`}>
          <h1 className={`text-2xl font-bold ${textcolor}  m-2`}>Most like post</h1>
          <div className=' border-2 w-full flex justify-center items-center'>
            {mostlike.postimage ? (
              <img src={`http://localhost:3000/${mostlike.postimage}`} className='h-auto max-h-105 rounded-2xl' />
            ) : (
              <div className={` border-${bordercolor} border-1 bg-center bg-cover w-[90%] m-auto h-100 rounded-2xl`}></div>
            )}

          </div>

          <div className='flex items-center gap-3'>
            {mostlike.userid ? (
              <div
                style={{ backgroundImage: `url('http://localhost:3000/${mostlike.userid.profilepic}')` }}
                className={` bg-center bg-cover h-11 w-11 rounded-full ml-5 mt-5`}>

              </div>
            ) : (

              <div
                className={` bg-center bg-cover h-11 w-11 rounded-full ml-5 mt-5`}>

              </div>
            )}
            <h3 className={`${textcolor} text-xl mt-2 font-medium`}>{mostlike?.userid?.username}</h3>
          </div>

        </div>

        <div className={` w-[100%] mt-4 h-80 border-${bordercolor} border-1 rounded-2xl`}>
          <h3 className={`${textcolor} font-bold text-2xl m-2`}>Follow</h3>
          <ul className=' w-[94%] m-auto h-64 rounded-2xl overflow-scroll'>

            {alluser.map((user) => {
              const isfollowing = following.includes(user._id);
              return (
                <li key={user._id} className={` ${user._id === data._id ? "hidden" : ""} relative flex gap-4 mt-2  border-1 border-${bordercolor} w-[90%] mt-1 rounded-3xl ${hovercolore} px-1 h-12 mx-auto`}>
                  <div
                    style={{ backgroundImage: `url("http://localhost:3000/${user.profilepic}")` }}
                    className={`h-10 w-10 rounded-full bg-center bg-cover`}></div>
                  <h3 className={`${textcolor} font-medium mt-1`}>{user.username}</h3>
                  <button
                    onClick={() => isfollowing ? handleunfollow(user._id) : handlefollow(user._id)}
                    className={`h-8 font-bold rounded-2xl px-2 absolute top-1.5 right-1 ${isfollowing ? "bg-red-400 hover:bg-red-500 " : "bg-blue-400 hover:bg-blue-500"} flex justify-center items-center ${textcolor}`}>
                    {isfollowing ? "unfollow" : "follow"}
                  </button>
                </li>

              )
            })}


          </ul>
        </div>

      </div>

    </div>
  )
}

export default HomeRight;
