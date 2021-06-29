import React from 'react'
import adminStyles from '../../../styles/Admin.module.css'
import Link from 'next/link'

const Tabs = ({ isActive }) => {
    return (
        <div className="flex flex-col justify-between items-center sm:flex-row">
            <div className="flex">
                <Link href="/admin/events/calendar" passHref>
                    <a 
                        className={ isActive === 'calendar' ? adminStyles.tabsItemActive : adminStyles.tabsItem }
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 text-current" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-base font-semibold">Event Calendar</p>
                    </a>
                </Link>
                <Link href="/admin/events/cards" passHref>
                    <a 
                        className={ isActive === 'cards' ? adminStyles.tabsItemActive : adminStyles.tabsItem }
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 text-current" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <p className="text-base font-semibold">Event Cards</p>
                    </a>
                </Link>
            </div>
            <button
                type="button" 
                className="px-3 py-2 bg-teal-600 hover:bg-teal-700 focus:bg-teal-700 focus:outline-none ring-2 ring-offset-2 ring-transparent ring-offset-transparent focus:ring-offset-gray-100 focus:ring-teal-700 text-gray-50 flex items-center gap-x-1 rounded-md"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-current" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <p className="text-sm font-bold">Add Event</p>
            </button>
        </div>
    )
}

export default Tabs
