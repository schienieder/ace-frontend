import React, { Fragment } from 'react'
import Link from 'next/link'
import partnerStyles from '../../styles/Admin.module.css'
import { Disclosure, Transition } from '@headlessui/react'

const SideNav = ({ isActive }) => {
    return (
        <div className="col-start-1 h-screen bg-white border-r border-gray-300 flex flex-col">
            <div className="w-full py-4 flex justify-center text-gray-800">
                <Link href="/partner">
                    <div className="flex items-center gap-x-1 cursor-pointer">
                    <h4 className="text-2xl font-source font-black">ACE</h4>
                    </div>
                </Link>
            </div>
            <Link href="/partner" passHref>
                <a 
                    className={ isActive === 'dashboard' ? partnerStyles.navItemActive : partnerStyles.navItem }
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-current" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <p className="font-mont font-bold text-sm">Dashboard</p>
                </a>
            </Link>
            <Link href="/partner/tasks" passHref>
                <a 
                    className={ isActive === 'tasks' ? partnerStyles.navItemActive : partnerStyles.navItem }
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-current" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <p className="font-mont font-bold text-sm">Events & Tasks</p>
                </a>
            </Link>
            <Link href="/partner/messages" passHref>
                <a 
                    className={ isActive === 'messages' ? partnerStyles.navItemActive : partnerStyles.navItem }
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-current" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <p className="font-mont font-bold text-sm">Messages</p>
                </a>
            </Link>
            <Link href="/partner/requests" passHref>
                <a 
                    className={ isActive === 'requests' ? partnerStyles.navItemActive : partnerStyles.navItem }
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-current" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <p className="font-mont font-bold text-sm">Affiliation Requests</p>
                </a>
            </Link>
        </div>
    )
}

export default SideNav