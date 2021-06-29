import React from 'react'

const InterviewCard = ({ children, title, text }) => {
    return (
        <div className="w-full flex flex-col">
            <div className="w-full px-5 py-3 bg-teal-700 rounded-tl-md rounded-tr-md flex items-center gap-x-1 text-gray-200">
                { children }
                <p className="font-bold text-sm">{ title }</p>
            </div>
            <div className="w-full flex flex-col gap-y-3 p-5 bg-white rounded-bl-md rounded-br-md shadow-sm border-b border-gray-200">
                <p className="text-xs">{ text }</p>
            </div>
        </div>
    )
}

export default InterviewCard
