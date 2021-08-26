import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import adminStyles from '../../styles/Admin.module.css'
import { Menu, Transition, Switch } from '@headlessui/react'
import { useRouter } from 'next/router'

const TopNav = ({ username }) => {
    const [toggleDark, setToggleDark] = useState(false)
    const router = useRouter()
    const handleLogOut = () => {
        localStorage.clear()
        router.push('/login')
    }
    return (
        <nav className="row-start-1 w-full top-0 py-3 px-10 flex justify-between items-center bg-true-100 text-gray-600 border-b border-gray-200">
            <button className={`${adminStyles.topNavBtn} color-transition rounded-lg bg-transparent focus:outline-none`}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-current" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <div className="flex items-center gap-x-3">
                <Link href="/admin/messages">
                    <a 
                        type="button"
                        className={`${adminStyles.topNavBtn} color-transition`}
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
                        <p className="text-sm font-bold capitalize">Messages</p>
                    </a>
                </Link>
                <Menu as="div">
                    <Menu.Button
                        type="button"
                        className="flex items-center gap-x-1 p-2 focus:outline-none cursor-pointer"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5 text-current"
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-sm font-bold">{ username }</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </Menu.Button>
                    <Transition
                        as="div"
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Menu.Items className={ adminStyles.popOverContainer }>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                    className={`${active ? adminStyles.popOverItemActive : adminStyles.popOverItem} color-transition border-b border-gray-200`}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className={ adminStyles.popOverIcon } 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                        <p className={ adminStyles.popOverText }>Dark Mode</p>
                                        <Switch 
                                            checked={ toggleDark }
                                            onChange={ setToggleDark }
                                            className={`${toggleDark ? 'bg-pink-600' : 'bg-gray-300'} ml-6 rounded-full w-14 p-1 focus:outline-none transition-colors ease-in-out duration-200`}
                                        >
                                            <div className={`w-5 h-5 bg-white rounded-full transition ease-in-out duration-200 ${toggleDark ? adminStyles.toggleDarkOn : adminStyles.toggleDarkOff}`}></div>
                                        </Switch>
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={ handleLogOut }
                                        className={`${active ? adminStyles.popOverItemActive : adminStyles.popOverItem} color-transition`}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className={ adminStyles.popOverIcon } 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <p className={ adminStyles.popOverText }>Logout</p>
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </nav>
    )
}

export default TopNav
