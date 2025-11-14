import React from 'react'
import danger from '../assets/icons/danger.svg'

const RateLimitedUi = () => {
  return (
    <div className='max-w-[700px] mx-auto py-6 '>
        <div className='bg-gray-900 border border-amber-400/30 rounded-md shadow px-5 py-3 flex gap-5 items-center'>
            <div>
                <div className="rounded-full bg-amber-400/10 w-12 h-12 flex items-center justify-center">
                    <img src={danger} alt="" className="size-6" />
                </div>
            </div>
            <div className='flex flex-col items-start gap-1'>
                <h3 className='text-gray-50 font-semibold text-sm'>Rate limit reached</h3>
                <p className='text-gray-100 text-xs'>You've made too many requests in a short period. Please wait a moment.</p>
                <span className='text-xs text-gray-400'>Try again in a few seconds</span>
            </div>
        </div>
    </div>
  )
}

export default RateLimitedUi
