import React from 'react'


const AboutItem = ({ title, desc, children }) => {
    return (
        <div className="w-96 flex flex-col justify-center items-center p-5">
            { children }
            <h4 className="text-sm md:text-base font-bold mt-2">{ title }</h4>
            <p className="text-xs">{ desc }</p>
        </div>
    )
}

export default AboutItem
