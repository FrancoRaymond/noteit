import React,{useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import back from '../assets/icons/back.svg'
import del from '../assets/icons/delete.svg'

const NoteDetail = () => {
  const [note, setNote] = useState()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`http://localhost:5001/api/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log("Error fetching note ",error)
        toast.error("Failed to fetch note")
      }finally{
        setLoading(false)
      }
    }
    fetchNote()
  }, [id])

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note?")){
      return;
    }

    try {

      await axios.delete(`http://localhost:5001/api/notes/${id}`)
      toast.success("Note deleted successfully")
      navigate('/')

    } catch (error) {

      console.log("error in handleDelete", error)
      toast.error("Failed to delete note")

    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    if( !note.title.trim() || !note.content.trim()){
      toast.error("Your note fields cannot be empty")
      return
    }
    setSaving(true)
    try {
      await axios.put(`http://localhost:5001/api/notes/${id}`, note)
      toast.success("Note updated successfully")
      navigate('/')
    } catch (error) {
      console.log("error in handleUpdate", error)
      toast.error("Failed to update note")
    }finally{
      setSaving(false)
    }
  }

  return (
    <div className='pt-10 pb-5 px-2 sm:px-5 md:px-10 lg:px-24'>
      {
        loading ? ( 
          <div className="text-amber-400 flex items-center py-44 justify-center">
            <span>Loading notes</span>
            <span className="ml-1 flex loading-dots">
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </span>
          </div>
        ) : note ? (
          <div>
            <div className='flex justify-between items-center mt-5'>
              <Link to='/' className='bg-gray-900 px-2 py-1 rounded-md text-gray-100 flex items-center gap-1.5 text-sm w-fit'>
                <img src={back} alt="" className='size-6'/>
                <span>Back to notes</span>
              </Link>
              <button 
                onClick={() => handleDelete(id)} 
                className='cursor-pointer flex items-center gap-2 py-1 px-3 border border-amber-400 rounded-md '
              >
                <img src={del} alt="" className='size-4 hover:scale-110 transition duration-200'/>
                <span className='text-sm text-amber-400'>Delete note</span>
              </button>
            </div>
            <div className='flex flex-col mt-6 rounded-md bg-gray-900 w-full p-5 max-w-5xl mx-auto'>
              <form onSubmit={handleUpdate} className='flex flex-col'>
                <label htmlFor="title" className='text-sm font-semibold text-gray-100 mt-6'>Title</label>
                <input 
                  required 
                  placeholder='Note title'
                  type="text" 
                  id='title' 
                  name='title' 
                  value={note.title} 
                  onChange={(e) => setNote({...note, title: e.target.value})}
                  className='border border-amber-400/10 py-2 px-3 text-gray-200 rounded-md text-sm outline-0 mt-2'
                />
                <label htmlFor="content" className='text-sm font-semibold text-gray-100 mt-7'>Content</label>
                <textarea 
                  required
                  placeholder='Enter your note content'
                  type='text' 
                  id='content' 
                  name='content' 
                  value={note.content} 
                  onChange={(e) => setNote({...note, content: e.target.value})}
                  className='border border-amber-400/20 py-2 px-3 text-gray-200 rounded-md text-sm outline-0 mt-2'
                />
                <button 
                  disabled={saving} 
                  type='submit' 
                  className='mx-auto mt-8 bg-amber-400 px-10 py-1.5 text-white disabled:opacity-15 rounded-3xl cursor-pointer transition duration-200 active:scale-105 hover:bg-amber-500'
                >
                  {loading ? "Saving note..." : "Update"}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <span className='text-red-600 font-semibold flex items-center py-44 justify-center text-center'>Error fetching note</span>
        )
      }
    </div>
  )
}

export default NoteDetail