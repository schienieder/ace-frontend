import React, { Fragment } from 'react'
import Link from 'next/link'
import partnerStyles from '../../styles/Admin.module.css'
import { Disclosure, Transition } from '@headlessui/react'

const SideNav = ({ isActive }) => {
    return (
        <div className="col-start-1 h-screen bg-white border-r border-gray-300 flex flex-col">
            <div className="w-full py-4 border-b border-gray-300 flex justify-center text-gray-800">
                <Link href="/partner">
                    <div className="flex items-center gap-x-1 cursor-pointer">
                    <svg width="50" height="38" viewBox="0 0 351 268" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M350.768 268L175.602 13.9056L0.435913 268H119.381C118.072 265.089 121.972 261.063 121.972 261.063C142.925 257.8 145.385 247.533 144.992 241.716C127.382 250.503 113.949 247.284 105.755 240.366C104.786 239.549 103.867 238.672 103.047 237.755C97.2165 231.348 94.4512 222.259 98.0461 213.954C98.4875 212.727 98.9832 211.521 99.5315 210.339C107.991 191.736 130.993 166.139 142.382 154.088C144.859 151.072 146.775 148.767 147.897 147.447V147.353C147.897 147.362 147.929 147.392 147.929 147.392C147.939 147.387 147.953 147.371 147.964 147.358L147.968 147.353V147.449C148.118 147.629 148.283 147.827 148.463 148.043C149.602 149.41 151.33 151.485 153.467 154.088C164.843 166.137 187.858 191.738 196.318 210.339C196.861 211.524 197.356 212.73 197.803 213.954H197.819C201.418 222.256 198.651 231.34 192.816 237.755C191.98 238.67 191.08 239.545 190.11 240.366C181.917 247.284 168.495 250.503 150.872 241.716C150.471 247.535 152.93 257.8 173.891 261.063C173.891 261.063 177.796 265.088 176.478 268H350.768Z" fill="#1F2937"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M350.768 268L175.602 13.9056L147.412 54.7979L294.227 268H350.768Z" fill="#134E4A"/>
                        <g clipPath="url(#clip0)">
                        <path d="M324.601 1.38494C324.256 0.546873 323.436 0 322.531 0C235.558 0 226.168 36.0443 226.168 51.5428C226.168 57.1185 227.405 62.3265 229.848 67.0192C230.224 67.7453 230.968 68.2068 231.784 68.2249C232.555 68.2024 233.366 67.8171 233.774 67.1045C239.645 56.9572 256.273 31.9117 283.735 18.6048C284.86 18.067 286.204 18.5286 286.738 19.6358C287.275 20.7518 286.809 22.0964 285.698 22.6342C283.627 23.6382 281.637 24.7318 279.687 25.8657C278.944 26.3003 278.222 26.7621 277.491 27.2147C276.393 27.896 275.309 28.5906 274.251 29.3078C273.198 30.016 272.158 30.7421 271.136 31.4861C270.818 31.7191 270.513 31.9567 270.199 32.1943C242.868 52.5603 226.168 85.0502 226.168 96.3629C226.168 97.5999 227.172 98.604 228.409 98.604C229.646 98.604 230.65 97.5999 230.65 96.3629C230.65 92.7504 233.111 85.4269 237.767 76.6915C244.526 82.2178 253.62 85.158 264.265 85.158C293.044 85.158 299.072 57.773 302.308 43.0586C306.665 23.2571 316.251 11.6892 324.113 3.82328C324.758 3.18229 324.947 2.223 324.601 1.38494Z" fill="#134E4A"/>
                        </g>
                        <defs>
                        <clipPath id="clip0">
                        <rect width="98.6038" height="98.6038" fill="white" transform="translate(226.168)"/>
                        </clipPath>
                        </defs>
                    </svg>
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