import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../lib/axios.js'
import back from '../assets/icons/back.svg'

const CreateNote = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!title.trim() && !content.trim()){
      toast.error("All fields are required!");
      return;
    }
    setLoading(true)
    try {
      await api.post("/notes", {
        title,
        content
      })
      toast.success("Note added successfully.")
      navigate("/")
    } catch (error) {
      toast.error("Failed to add note")
      console.log("Error adding note",error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='pt-10 pb-5 min-h-screen px-2 sm:px-5 md:px-10 lg:px-24'>
      <Link to='/' className='bg-gray-900 px-2 py-1 rounded-md text-gray-100 flex items-center gap-1.5 text-sm w-fit mt-5'>
        <img src={back} alt="" className='size-6'/>
        <span>Back to notes</span>
      </Link>
      <div className='flex flex-col mt-6 rounded-md bg-gray-900 w-full p-5 max-w-5xl mx-auto'>
        <h2 className='text-gray-100 text-xl font-semibold mx-auto'>Add note</h2>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <label htmlFor="title" className='text-sm font-semibold text-gray-100 mt-6'>Title</label>
          <input 
            required 
            placeholder='Note title'
            type="text" 
            id='title' 
            name='title' 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className='border border-amber-400/10 py-2 px-3 text-gray-200 rounded-md text-sm outline-0 mt-2'
          />
          <label htmlFor="content" className='text-sm font-semibold text-gray-100 mt-7'>Content</label>
          <textarea 
            required
            placeholder='Enter your note content'
            type='text' 
            id='title' 
            name='title' 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            className='border border-amber-400/20 py-2 px-3 text-gray-200 rounded-md text-sm outline-0 mt-2'
          />
          <button 
            disabled={loading} 
            type='submit' 
            className='mx-auto mt-8 bg-amber-400 px-10 py-1.5 text-white disabled:opacity-15 rounded-3xl cursor-pointer transition duration-200 active:scale-105 hover:bg-amber-500'
          >
            {loading ? "Adding note..." : "Add note"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateNote
