import React, { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clientStyles from '../../styles/Client.module.css'
import { Disclosure, Transition } from '@headlessui/react'

const SideNav = ({ isActive }) => {
    return (
        <div className="col-start-1 h-screen bg-white border-r border-gray-200 flex flex-col">
            <div className="w-full py-4 flex justify-center items-center gap-x-1 text-gray-800">
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
                    className={`${isActive === 'dashboard' ? clientStyles.sideNavItemActive : clientStyles.sideNavItem} ${isActive === 'dashboard' ? 'dark:bg-gray-800' : 'dark:bg-gray-900 hover:bg-gray-800'}`}
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
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button className={`${isActive === 'booking' ? clientStyles.sideNavItemActive : clientStyles.sideNavItem} flex justify-between pr-6`}>
                            <div className="flex items-center gap-x-3">
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
                            </div>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`
                                    ${open ? 'transform rotate-90 transition ease-in-out duration-200' : 'transform rotate-0 transition ease-in-out duration-200'} 
                                    h-4 w-4 text-current`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </Disclosure.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-in-out duration-200"
                            enterFrom="opacity-0 transform scale-95"
                            enterTo="opacity-100 transform scale-100"
                            leave="transition ease-in-out duration-200"
                            leaveFrom="opacity-100 transform scale-100"
                            leaveTo="opacity-0 transform scale-95"
                        >
                            <Disclosure.Panel>
                                <Link href="/client/bookings/select_date" passHref>
                                    <a 
                                        className={`${clientStyles.sideDropDownItem} color-transition`}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={ clientStyles.sideDropDownIcon } 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <p className={ clientStyles.sideDropDownText }>Add Booking</p>
                                    </a>
                                </Link>
                                <Link href="/client/bookings" passHref>
                                    <a 
                                        className={`${clientStyles.sideDropDownItem} color-transition`}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className={ clientStyles.sideDropDownIcon } 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                        <p className={ clientStyles.sideDropDownText }>View Booking</p>
                                    </a>
                                </Link>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
            <Link href="/client/interview" passHref>
                <a 
                    className={ isActive === 'interview' ? clientStyles.sideNavItemActive : clientStyles.sideNavItem }
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={ clientStyles.sideNavIcon } 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="font-mont font-bold text-sm">Interview Schedules</p>
                </a>
            </Link>
            <Link href="/client/messages" passHref>
                <a 
                    className={ isActive === 'messages' ? clientStyles.sideNavItemActive : clientStyles.sideNavItem }
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
            <Link href="/client/event" passHref>
                <a 
                    className={ isActive === 'event' ? clientStyles.sideNavItemActive : clientStyles.sideNavItem }
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={ clientStyles.sideNavIcon } 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="font-mont font-bold text-sm">Event Progress</p>
                </a>
            </Link>
        </div>
    )
}

export default SideNav
