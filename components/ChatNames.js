import React from 'react'

const ChatNames = ({ name, time }) => {
    return (
        <div className="flex gap-x-2 pl-3 py-3 cursor-pointer hover:bg-gray-50 color-transition">
            <div className="w-10 h-10 bg-gray-200 rounded-full">
            </div>
            <div className="flex flex-col">
                <p className="text-sm font-medium">{ name }</p>
                <p className="text-xs text-gray-500">{ time }</p>
            </div>
        </div>
    )
}

export default ChatNames
