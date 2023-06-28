import React from 'react'

const LoadingSpinner = () => {
  return (
    <>
        <div className='grid justify-center items-center'>
            <div className='w-[30px] h-[30px] border-[10px] border-blue-500 rounded-full border-t-8 border-t-black animate-spinner'>
            </div>
            <p>creating magic...</p>
        </div>
    </>
  )
}

export default LoadingSpinner