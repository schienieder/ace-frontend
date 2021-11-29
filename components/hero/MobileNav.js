import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const MobileNav = ({ onClick }) => {
    return (
        <div className="z-10 bg-white h-screen w-full flex flex-col items-center gap-y-8 py-5">
            <div className="w-full flex justify-between items-center px-8">
                <div className="flex items-center gap-x-3">
                    <Image 
                        src="/images/logo.svg"
                        width={ 50 }
                        height={ 50 }
                        alt="Logo"
                    />
                    <h4 className="text-2xl font-source font-black">Marahuyo</h4>
                </div>
                <button onClick={ onClick }>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <h4 className="text-sm font-medium hover:text-gray-200 uppercase cursor-pointer">about</h4>
            <h4 className="text-sm font-medium hover:text-gray-200 uppercase cursor-pointer">services</h4>
            <h4 className="text-sm font-medium hover:text-gray-200 uppercase cursor-pointer">testimonials</h4>
            <h4 className="text-sm font-medium hover:text-gray-200 uppercase cursor-pointer">login</h4>
        </div>
    )
}

export default MobileNav
