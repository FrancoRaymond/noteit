import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/FormatDate'
import axios from 'axios'
import toast from 'react-hot-toast'
import del from '../assets/icons/delete.svg'
import edit from '../assets/icons/edit.svg'

const NoteCard = ({note, setNotes}) => {

  const handleDelete = async ( e, id) => {
    e.preventDefault()
    if(!window.confirm("Are you sure you want to delete this note?")){
      return;
    }
    try {

      await axios.delete(`http://localhost:5001/api/notes/${id}`)
      setNotes((prev) => prev.filter(note => note._id !== id))
      toast.success("Note deleted successfully")

    } catch (error) {

      console.log("error in handleDelete", error)
      toast.error("Failed to delete note")

    }
  }

  return (
    <Link to={`/note/${note._id}`} className='bg-gray-900 rounded-md py-4 px-3 flex flex-col gap-2 border-t-4 border-amber-400 transition-all duration-200 hover:shadow-2xl active:scale-105'>
      <h2 className='font-semibold text-gray-100'>{note.title}</h2>
      <p className='text-gray-300 text-sm'>{note.content}</p>
      <div className='flex text-xs items-center gap-5 mt-5'>
          <span className='grow text-gray-400'>{formatDate(note.createdAt)}</span>
          <button className='cursor-pointer'><img src={edit} alt="" className='size-4 hover:scale-110 transition duration-200'/></button>
          <button onClick={(e) => handleDelete(e, note._id)} className='cursor-pointer'><img src={del} alt="" className='size-4 hover:scale-110 transition duration-200'/></button>
      </div>
    </Link>
  )
}

export default NoteCard
