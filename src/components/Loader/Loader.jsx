import React from 'react'

export default function Loader() {
    return (
        <div className='h-screen flex justify-between items-center'>
            <div className="animate-spin inline-block size-16 border-3 mx-auto border-current border-t-transparent text-primary rounded-full dark:text-blue-500" role="status" aria-label="loading">
              
            </div>
        </div>
    )
}
