import React from 'react'

const FloatingBtn = () => {
    return (
        <button className="fixed h-14 w-14 flex justify-center items-center bg-teal-700 hover:bg-teal-600 focus:bg-teal-600 rounded-full bottom-20 right-12 text-gray-200 color-transition focus:outline-none">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-current" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
        </button>
    )
}

export default FloatingBtn
