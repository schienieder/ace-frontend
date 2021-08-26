import React from 'react'
import Link from 'next/link'

const SideNavItem = ({ link, text, children }) => {
    return (
        <Link href={ link } passHref>
            <a 
                className="w-full bg-gray-100 hover:bg-gray-100 py-5 pl-8 gap-x-3 flex items-center text-gray-600 hover:text-gray-700 transition-colors duration-75 ease-linear cursor-pointer"
            >{ children }<p className="font-mont font-bold text-sm">{ text }</p></a>
        </Link>
    )
}

export default SideNavItem
