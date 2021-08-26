import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import clientStyles from '../../styles/Client.module.css'
import { Menu, Transition, Switch } from '@headlessui/react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

const TopNav = () => {
    const [toggleDark, setToggleDark] = useState(false)
    const [loggedUsername, setLoggedUserName] = useState('')
    const axios = require('axios')
    const router = useRouter()
    useEffect(() => {
        try {
            const jwt_token = Cookies.get('jwt')
            const decoded_token = jwt_decode(jwt_token)
            axios({
                method : 'GET',
                url : `http://localhost:8000/account/${decoded_token.user_id}`,
                headers : {'Authorization' : 'Bearer'+' '+ jwt_token}
            })
            .then((response) => {
                setLoggedUserName(response.data.username)
                console.log(response.data.username)
            })
            .catch((error) => {
                console.log(error.response)
            })
        }
        catch(e) {
            console.log(e.message)
        }
    }, [])
    const handleLogOut = () => {
        Cookies.remove('jwt')
        router.push('/login')
    }
    return (
        <>
        <nav className="row-start-1 w-full top-0 z-20 py-3 px-10 bg-true-100 text-gray-600 border-b border-gray-200 flex justify-between items-center">
            <button className={`${clientStyles.topNavBtn} color-transition`}>
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
            <div className="flex items-center gap-x-3 text-gray-600">
                <Menu as="div">
                    <Menu.Button
                        type="button"
                        className={`${clientStyles.navItem} p-2`}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={ clientStyles.navItemIcon } 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className={ clientStyles.navItemText }>{ loggedUsername }</p>
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
                        <Menu.Items className={ clientStyles.popOverContainer }>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link href="/client/profile" passHref>
                                        <a
                                            className={`${active ? clientStyles.popOverItemActive : clientStyles.popOverItem} color-transition border-b border-gray-200`}
                                        >
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="w-7 h-7 text-current" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                            </svg>
                                            <p className={ clientStyles.popOverText }>Client Profile</p>
                                        </a>
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                    className={`${active ? clientStyles.popOverItemActive : clientStyles.popOverItem} color-transition`}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className={ clientStyles.popOverIcon } 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                        <p className={ clientStyles.popOverText }>Dark Mode</p>
                                        <Switch 
                                            checked={ toggleDark }
                                            onChange={ setToggleDark }
                                            className={`${toggleDark ? 'bg-pink-600' : 'bg-gray-300'} ml-6 rounded-full w-14 p-1 focus:outline-none transition-colors ease-in-out duration-200`}
                                        >
                                            <div className={`w-5 h-5 bg-white rounded-full transition ease-in-out duration-200 ${toggleDark ? clientStyles.toggleDarkOn : clientStyles.toggleDarkOff}`}></div>
                                        </Switch>
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={ handleLogOut }
                                        className={`${active ? clientStyles.popOverItemActive : clientStyles.popOverItem} color-transition`}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className={ clientStyles.popOverIcon } 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <p className={ clientStyles.popOverText }>Logout</p>
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </nav>
        </>
    )
}

export default TopNav
