import React from 'react'

const PageHeader = ({ text, children }) => {
    return (
        <div className="flex items-center gap-x-2">
            { children }
            <h4 className="text-xl font-bold dark:text-gray-300">{ text }</h4>
        </div>
    )
}

export default PageHeader