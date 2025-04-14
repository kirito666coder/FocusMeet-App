import React, { useState } from 'react'

import Navbar from '../../components/Navbar'
import NoteTop from './NoteTop'
import NoteLeft from './NoteLeft'
import NoteRight from './NoteRight'





const Note = () => {

  const [newdataincoming, setnewdataincoming] = useState(false)

  const [typeOn, settypeOn] = useState(false)

  const [notesid, setnotesid] = useState('')


  return (
    <>
      <Navbar />

      <NoteTop
        setnotesid={setnotesid}
        typeOn={typeOn} settypeOn={settypeOn}
        newdataincoming={newdataincoming} setnewdataincoming={setnewdataincoming} />

      <NoteLeft
        notesid={notesid}
        newdataincoming={newdataincoming} setnewdataincoming={setnewdataincoming} />

      <NoteRight
        typeOn={typeOn} settypeOn={settypeOn}
        setnewdataincoming={setnewdataincoming} />

    </>
  )
}

export default Note
