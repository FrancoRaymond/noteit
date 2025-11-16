import React from 'react'
import { Link } from 'react-router-dom'
import nf from '../assets/icons/nf.svg'

const NoNotesFound = () => {
  return (
    <div className='flex flex-col items-center mt-6 rounded-md bg-gray-900 w-full px-5 py-10 max-w-5xl mx-auto'>
        <img src={nf} alt="" className='size-8'/>
        <h3 className='text-gray-50 font-semibold mt-4 text-lg'>No notes yet</h3>
        <p className='text-gray-200 my-5 text-sm max-w-[500px] text-center'>Every idea starts somewhere — create your first note and keep track of your thoughts.</p>
        <Link to='/create' className='flex items-center text-white text-sm font-semibold animate-[pulse_2s_ease-in-out_infinite] bg-amber-400 px-6 py-1 gap-1.5 rounded-md cursor-pointer transition duration-200 active:scale-105 hover:bg-amber-500'>
            Add note
        </Link>
    </div>
  )
}

export default NoNotesFound
