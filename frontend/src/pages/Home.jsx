import React,{useState, useEffect} from 'react'
import toast from 'react-hot-toast'
import api from '../lib/axios.js'
import RateLimitedUi from '../components/RateLimitedUi.jsx'
import NoteCard from '../components/NoteCard.jsx'
import NoNotesFound from '../components/NoNotesFound.jsx'

const Home = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true)
        const res = await api.get('/notes')
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log("Error fetching notes ",error)
        if(error.response.status === 429){
          setIsRateLimited(true)
        }else{
          toast.error("Failed to load notes")
        }
      }finally{
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div className='min-h-screen pt-10 pb-5 px-2 sm:px-5 md:px-10 lg:px-24'>
      {
        isRateLimited && (
          <RateLimitedUi />
        )
      }
      <div className='mt-10'>
        {loading && ( 
          <div className="text-amber-400 flex items-center py-44 justify-center">
            <span>Loading notes</span>
            <span className="ml-1 flex loading-dots">
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </span>
          </div>
        )}

        {
          !loading && notes.length === 0 && !isRateLimited && (
            <NoNotesFound />
          )
        }
        
        {
          notes.length > 0 && !isRateLimited && (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
              {
                notes.map(note => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))
             }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home