import React, { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clientStyles from '../../styles/Client.module.css'
import adminStyles from '../../styles/Admin.module.css'
import useDarkMode from '../../hooks/useDarkMode'
import useNav from '../../hooks/useNav'
// import { Disclosure, Transition } from '@headlessui/react'

const SideNav = ({ isActive }) => {

    const { isDarkMode } = useDarkMode()
    const { handleNavClass } = useNav()

    return (
        <div className={`hidden md:col-start-1 h-screen border-r shadow md:flex flex-col ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className={`w-full py-4 flex justify-center ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                <Link href="/client">
                    <div className="flex items-center gap-x-3 cursor-pointer">
                        <Image 
                            src="/images/logo.svg"
                            width={ 50 }
                            height={ 50 }
                            alt="Logo"
                        />
                        <h4 className="text-2xl font-source font-black">Marahuyo</h4>
                    </div>
                </Link>
            </div>
            <Link href="/client" passHref>
                <a 
                    className={`${isActive === 'dashboard' ? handleNavClass(true, isDarkMode) : handleNavClass(false, isDarkMode) }`}
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
            <Link href="/client/bookings" passHref>
                <a 
                    className={`${isActive === 'booking' ? handleNavClass(true, isDarkMode) : handleNavClass(false, isDarkMode) }`}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={ clientStyles.sideNavIcon } 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p className="font-mont font-bold text-sm">Event Bookings</p>
                </a>
            </Link>
            <Link href="/client/messages" passHref>
                <a 
                    className={`${isActive === 'messages' ? handleNavClass(true, isDarkMode) : handleNavClass(false, isDarkMode) }`}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={ clientStyles.sideNavIcon } 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <p className="font-mont font-bold text-sm">Messages</p>
                </a>
            </Link>
        </div>
    )
}

export default SideNav
