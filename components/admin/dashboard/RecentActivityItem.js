import React from 'react'

const RecentActivityItem = ({ text }) => {
    return (
        <div className="w-full flex flex-col gap-y-2 text-gray-700 bg-transparent hover:bg-gray-100">
            <div className="flex items-center gap-x-3 pt-3 pb-1">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-current" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <p className="font-normal text-sm">{ text }</p>
            </div>
            <div className="border-b border-gray-300"></div>
        </div>
    )
}

export default RecentActivityItem
