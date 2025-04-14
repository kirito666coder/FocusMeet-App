import React, { useState } from 'react'
import { motion } from 'framer-motion'
import EditProfileinfo from './EditProfileinfo'
import { deleteusercoment, deleteuserpost } from '../../api/api.post'

const Profile = ({
  handelUserPostCommentDelete,
  coment,
  allpost,
  postdata,
  comentboxid,
  setcomentboxid,
  setcomentbox,
  comentbox,
  handelpostcoments,
  setcoment,
  userspostlikes,
  userpostdata,
  data,
  hovercolore,
  bordercolor,
  bgcorlor,
  textcolor,
  setProfilepageture
}) => {


  const [EditOn, setEditOn] = useState(false)

  const handelUserPostDelet = async (postid) => {
    await deleteuserpost(postid)
    postdata()
    allpost()
    fetchdatafollowedpost()

  }




  return (
    <div className={`z-20 font-bold h-full w-full ${bgcorlor} overflow-scroll overflow-y-scroll`}>
      <div className={` w-full h-10 ${textcolor} flex items-center gap-4`}>
        <div
          onClick={() => {
            setProfilepageture(false)
          }}
          className={`ml-3 cursor-pointer text-4xl border-1 ${bordercolor} h-6 flex justify-center items-center rounded-2xl pb-1.5 ${hovercolore} px-2`}>←</div>
        <h2 className='text-xl'>{data.username}</h2>
      </div>
      <div
        style={{ backgroundImage: `url('http://localhost:3000/${data.profilepicback}')` }}
        className={` relative border-${bordercolor} bg-center bg-cover border-1  h-50 w-full`}>
        <div
          style={{ backgroundImage: `url('http://localhost:3000/${data.profilepic}')` }}
          className={` bg-center bg-cover h-30 w-30 absolute border-${bordercolor} border-1 rounded-full top-35`}>       </div>
      </div>
      {/* edit profile */}
      <div
        onClick={() => { setEditOn(true) }}
        className='w-full h-15 flex justify-end items-center'>
        <span className={`border-${bordercolor} border-1 px-3 py-1 rounded-2xl ${hovercolore} ${textcolor}`}>Edit profile</span>
      </div>


      {/* edit box */}
      {EditOn &&
        <EditProfileinfo setEditOn={setEditOn} hovercolore={hovercolore} bgcorlor={bgcorlor} textcolor={textcolor} bordercolor={bordercolor} />
      }

      {/* user info */}
      <div className={` h-25 w-full`}>
        <h1 className={`${textcolor} p-3 text-2xl`}>{data.username}</h1>
        <div className={`${textcolor} flex gap-4 ml-2`}>
          <div className={`hover:border-b-1 ${bordercolor}`}>Following</div>
          <div className={`hover:border-b-1 ${bordercolor}`}>Followers</div>
        </div>
      </div>
      {/* post... */}
      <div className={`${textcolor} relative h-11 flex justify-around items-center ${bordercolor} border-b-1`} >
        <div className={` px-4 py-2 ${hovercolore}`}>Post</div>
        <div className={` px-4 py-2 ${hovercolore}`}>Like</div>
        <div className='bg-blue-500 w-10 h-1 bottom-0 left-2/9 absolute'></div>
      </div>

      {/* posts... */}
      <div
        className=' w-[100%] h-[100%] absolute z-10 flex flex-wrap overflow-y-scroll'>

        {userpostdata.map((post) => (

          <div

            key={post._id} className={` w-[50%] relative post min-h-40 border-b-1 border-${bordercolor} ${bgcorlor} `}>
            <div className=' h-15 flex justify-start items-center gap-3'>
              <div
                style={{ backgroundImage: `url('http://localhost:3000/${data.profilepic}')` }}
                className={`h-12 w-12 rounded-full bg-cover bg-center`}></div>
              <div>
                <h1 className={`h-4 flex text-lg  items-center  font-medium ${textcolor} `}>{data.username}</h1>
                <p className={`h-7 overflow-hidden  text-xs ${textcolor}`}>{post.heading}</p>
              </div>
            </div>
            <button
              onClick={() => {
                handelUserPostDelet(post._id)
              }}
              className={` ${textcolor} hover:text-red-500 cursor-pointer absolute  top-4 right-5 `}>Delete</button>

            <div className=' border-white h-100 w-full flex justify-center items-center '>
              <div
                style={{ backgroundImage: `url('http://localhost:3000/${post.postimage}')` }}
                className={`w-[85%]  h-[95%] rounded-2xl bg-center bg-cover `}></div>
            </div>


            <div className='h-10 flex justify-center'>
              <div className={`w-[80%] h-full font-bold ${textcolor} flex  justify-around cursor-pointer`}>
                <div className='flex gap-1'
                  onClick={() => userspostlikes(post._id)}
                >{Array.isArray(post.likes) ? post.likes.length : 0}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill={post.likes.includes(data._id) ? "red" : "currentColor"}
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>

                </div>
                <div className=' flex gap-1'
                  onClick={() => {
                    setcomentbox(true)
                    setcomentboxid(post._id)
                    postdata()
                  }}
                >{post.coments.length}
                  <svg
                    xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50" fill={`currentColor`}>
                    <path d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z M 25 5.9375 C 36.714844 5.9375 46.0625 14.089844 46.0625 24 C 46.0625 33.910156 36.714844 42.0625 25 42.0625 C 22.996094 42.0625 21.050781 41.820313 19.21875 41.375 L 18.65625 41.25 L 18.28125 41.71875 C 18.28125 41.71875 15.390625 44.976563 10.78125 45.75 C 11.613281 44.257813 12.246094 42.871094 12.53125 41.8125 C 12.929688 40.332031 12.9375 39.3125 12.9375 39.3125 L 12.9375 38.8125 L 12.5 38.53125 C 7.273438 35.21875 3.9375 29.941406 3.9375 24 C 3.9375 14.089844 13.28125 5.9375 25 5.9375 Z"></path>
                  </svg>

                  <motion.div
                    initial={{ display: "none" }}
                    animate={{ height: comentbox ? comentboxid === post._id ? "400px" : "0" : "", width: comentbox ? comentboxid === post._id ? "680px" : "0" : "", display: comentbox ? comentboxid === post._id ? "block" : "none" : "none" }}
                    transition={{ duration: 0.2 }}
                    className='z-2 absolute right-5 top-20 h-100 w-170 flex justify-center items-center'>
                    <div className={` relative h-[90%] w-[90%] border-${bordercolor} border-1 rounded-2xl`}>
                      <div
                        onClick={(e) => {
                          e.stopPropagation()
                          setcomentbox(false)

                        }}
                        className=' absolute  text-white top-5  right-5 z-2'>x</div>
                      <div className={` absolute h-full w-full rounded-2xl ${bgcorlor} opacity-80`}></div>
                      <div className={` absolute left-1.5 top-1.5 h-full w-full rounded-2xl `}>
                        <div className={`  h-[80%] border-${bordercolor} border-1 w-[98%] rounded-2xl`}>
                          <ul className={`h-[90%] mt-2 w-[90%] mx-auto overflow-scroll`}>
                            {post.coments.map((comentn, index) => (
                              <li
                                key={index}
                                className={`mt-5 relative`}>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handelUserPostCommentDelete(post._id, comentn._id)
                                    postdata()
                                    postdata()
                                  }}
                                  className={` absolute ${textcolor} hover:text-red-500  right-18 top-5 z-10`}>Delete</button>
                                <div className={`flex items-center gap-3`}>
                                  <div
                                    style={{ backgroundImage: `url('http://localhost:3000/${comentn.profilepic}')` }}
                                    className={`bg-center bg-cover h-11 w-11 rounded-full border-1`}></div>
                                  <h4 className={`${textcolor} text-lg`}>{comentn.username}</h4>
                                </div>
                                <p className={`${bgcorlor} mt-4 rounded-2xl max-w-[90%] text-wrap border-2 break-all p-4`}>{comentn.coment}
                                </p>
                              </li>
                            ))}
                          </ul>

                        </div>
                        <div>
                          <input
                            value={coment}
                            onChange={(e) => {
                              setcoment(e.target.value)
                            }}
                            type="text" className={` px-5 mt-3 rounded-2xl ml-1.5 border-${bordercolor} border-1 h-10 w-[80%]`} />
                          <button
                            onClick={(e) => {
                              handelpostcoments(post._id)
                              e.stopPropagation()
                              setcomentbox(false)
                              postdata()
                              postdata()
                              setcoment('')
                            }}
                            className={`h-10 bg-blue-400 w-15 rounded-3xl ml-5 cursor-pointer`}>Send</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                </div>

              </div>

            </div>

          </div>
        ))}





      </div>



    </div>
  )
}

export default Profile
