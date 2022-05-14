import React, { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import adminStyles from '../../styles/Admin.module.css'
import { Disclosure, Transition } from '@headlessui/react'
import useDarkMode from '../../hooks/useDarkMode'
import useNav from '../../hooks/useNav'

const SideNav = ({ isActive }) => {

    const { isDarkMode } = useDarkMode()
    const { handleNavClass } = useNav()

    return (
        <div className={`hidden md:col-start-1 h-screen border-r shadow md:flex flex-col ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className={`w-full py-4 flex justify-center ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                <Link href="/admin">
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
            <Link href="/admin" passHref>
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
            <Link href="/admin/events" passHref>
                <a className={`${isActive === 'events' ? handleNavClass(true, isDarkMode) : handleNavClass(false, isDarkMode)}`}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-current" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <p className="font-mont font-bold text-sm">Events</p>
                </a>
            </Link>
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button 
                            className={`${isActive === 'partners' ? handleNavClass(true, isDarkMode) : handleNavClass(false, isDarkMode)} flex justify-between pr-6`}
                        >
                            <div className="flex items-center gap-x-3">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-6 w-6 text-current" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <p className="font-mont font-bold text-sm">Business Partners</p>
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
                                <Link href="/admin/partners" passHref>
                                    <a 
                                        className={`${adminStyles.sideDropDownItem} ${isDarkMode ? adminStyles.sideDropDownItemDarkBg : adminStyles.sideDropDownItemBg} color-transition`}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className={ adminStyles.sideDropDownIcon }
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <p className={ adminStyles.sideDropDownText }>Partner List</p>
                                    </a>
                                </Link>
                                <Link href="/admin/requests" passHref>
                                    <a 
                                        className={`${adminStyles.sideDropDownItem} ${isDarkMode ? adminStyles.sideDropDownItemDarkBg : adminStyles.sideDropDownItemBg} color-transition`}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className={ adminStyles.sideDropDownIcon } 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                        <p className={ adminStyles.sideDropDownText }>Affiliation Requests</p>
                                    </a>
                                </Link>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
            <Link href="/admin/clients" passHref>
                <a 
                    className={`${isActive === 'clients' ? handleNavClass(true, isDarkMode) : handleNavClass(false, isDarkMode)}`}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-current" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    <p className="font-mont font-bold text-sm">Client List</p>
                </a>
            </Link>
            <Disclosure>
                {({ open }) => (
                    <>
                    <Disclosure.Button 
                        className={`${isActive === 'bookings' ? handleNavClass(true, isDarkMode) : handleNavClass(false, isDarkMode)} flex justify-between pr-6`}
                    >
                        <div className="flex items-center gap-x-3">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-6 w-6 text-current" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <p className="font-mont font-bold text-sm">Client Bookings</p>
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
                        <Disclosure.Panel className="w-full flex flex-col">
                            <Link href="/admin/bookings" passHref>
                                <a 
                                    className={`${adminStyles.sideDropDownItem} ${isDarkMode ? adminStyles.sideDropDownItemDarkBg : adminStyles.sideDropDownItemBg} color-transition`}
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className={ adminStyles.sideDropDownIcon } 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    <p className={ adminStyles.sideDropDownText }>Bookings List</p>
                                </a>
                            </Link>
                            <Link href="/admin/interviews" passHref>
                                <a 
                                    className={`${adminStyles.sideDropDownItem} ${isDarkMode ? adminStyles.sideDropDownItemDarkBg : adminStyles.sideDropDownItemBg} color-transition`}
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className={ adminStyles.sideDropDownIcon }
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className={ adminStyles.sideDropDownText }>Interview Schedules</p>
                                </a>
                            </Link>
                        </Disclosure.Panel>
                    </Transition>
                </>
                )}
            </Disclosure>
            <Disclosure>
                {({ open }) => (
                    <>
                    <Disclosure.Button 
                        className={`${isActive === 'reports' ? handleNavClass(true, isDarkMode) : handleNavClass(false, isDarkMode)} flex justify-between pr-6`}
                    >
                        <div className="flex items-center gap-x-3">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-6 w-6 text-current" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                            </svg>
                            <p className="font-mont font-bold text-sm">Reports</p>
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
                        <Disclosure.Panel className="w-full flex flex-col">
                            <Link href="/admin/payments" passHref>
                                <a 
                                    className={`${adminStyles.sideDropDownItem} ${isDarkMode ? adminStyles.sideDropDownItemDarkBg : adminStyles.sideDropDownItemBg} color-transition`}
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className={ adminStyles.sideDropDownIcon }
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <p className={ adminStyles.sideDropDownText }>Payment Logs</p>
                                </a>
                            </Link>
                            <Link href="/admin/sales" passHref>
                                <a 
                                    className={`${adminStyles.sideDropDownItem} ${isDarkMode ? adminStyles.sideDropDownItemDarkBg : adminStyles.sideDropDownItemBg} color-transition`}
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className={ adminStyles.sideDropDownIcon }
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    <p className={ adminStyles.sideDropDownText }>Sales Report</p>
                                </a>
                            </Link>
                            <Link href="/admin/forecasts" passHref>
                                <a 
                                    className={`${adminStyles.sideDropDownItem} ${isDarkMode ? adminStyles.sideDropDownItemDarkBg : adminStyles.sideDropDownItemBg} color-transition`}
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className={ adminStyles.sideDropDownIcon } 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor" 
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                    </svg>
                                    <p className={ adminStyles.sideDropDownText }>Satisfaction Forecast</p>
                                </a>
                            </Link>
                        </Disclosure.Panel>
                    </Transition>
                </>
                )}
            </Disclosure>
        </div>
    )
}

export default SideNav
