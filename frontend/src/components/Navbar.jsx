import React from 'react'
import { Link } from 'react-router-dom'
import add from '../assets/icons/add.svg'

const Navbar = () => {
  return (
    <div className='py-1.5 w-full bg-gray-900 fixed top-0 left-0 px-2 sm:px-5 md:px-10 lg:px-24 flex justify-between items-center'>
        <Link to='/' className='logoFont flex items-center text-2xl'><h1 className='font-bold text-amber-400'>Note</h1><h1 className='text-white font-semibold'>it</h1></Link>
        <button className='flex items-center bg-amber-400 px-2 py-1 gap-1.5 rounded-md cursor-pointer transition duration-200 active:scale-105 hover:bg-amber-500'>
            <img src={add} alt="" className='size-5' />
            <span className='text-white text-sm font-semibold'>Add note</span>
        </button>
    </div>
  )
}

export default Navbar
