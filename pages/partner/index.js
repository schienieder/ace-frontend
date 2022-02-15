import React, { useState, useEffect } from 'react'
import TopNav from '../../components/partner/TopNav'
import SideNav from '../../components/partner/SideNav'
import Footer from '../../components/partner/Footer'
import Link from 'next/link'
import CalendarHook from '../../components/admin/events/CalendarHook'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

export default function index({ partnerProfile }) {
    const router = useRouter()
    const [userName, setUsername] = useState()
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'partner') {
            router.push('/login')
        }
    }
    useEffect( async () => {
        await readRole()
    }, [])
    const { calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getNextMonth, getPrevMonth } = CalendarHook()
    const dateClickHandler = date => {
        console.log(date);
    }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="dashboard" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                    <div className="flex items-center gap-x-2">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-7 w-7 text-current" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        <h4 className="text-xl font-bold dark:text-gray-300">Dashboard</h4>
                    </div>
                    {
                        !partnerProfile.first_name || !partnerProfile.last_name || !partnerProfile.mobile_number || !partnerProfile.email || !partnerProfile.street_address || !partnerProfile.city || !partnerProfile.state_province || !partnerProfile.business_name || !partnerProfile.type_of_business || !partnerProfile.services_offered ?
                            <div className="w-full p-5 rounded-lg bg-white flex justify-center items-center gap-x-1 text-gray-800">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-7 w-7 text-pink-600 animate-wiggle" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <p className="font-normal">Profile information incomplete! Proceed <Link href="/partner/profile"><a className="text-pink-600 font-bold hover:underline">here</a></Link> to remove this warning.</p>
                            </div>
                        : ''
                    }
                        <div className="flex flex-col gap-y-5">
                            

                            <div className="flex gap-x-5">
                                
                                <div className="w-2/5 flex flex-col gap-y-5">
                                    <h4 className="font-bold -mb-3 mt-3">Profile Information</h4>
                                    <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl w-full flex flex-col gap-y-10 px-10 py-8">
                                        <div className="flex flex-col gap-y-1">
                                            <div className="flex items-center gap-x-1">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 text-pink-600" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <h4 className="text-sm font-bold">Name</h4>
                                            </div>
                                            <p className="text-xs">{ partnerProfile.first_name + ' ' + partnerProfile.last_name }</p>
                                        </div>
                                        <div className="w-full flex justify-between">
                                            <div className="flex flex-col gap-y-1">
                                                <div className="flex items-center gap-x-1">
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="h-5 w-5 text-pink-600" 
                                                        fill="none" 
                                                        viewBox="0 0 24 24" 
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                    </svg>
                                                    <h4 className="text-sm font-bold">Mobile Number</h4>
                                                </div>
                                                <p className="text-xs">{ partnerProfile.mobile_number }</p>
                                            </div>
                                            <div className="flex flex-col gap-y-1">
                                                <div className="flex items-center gap-x-1">
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="h-5 w-5 text-pink-600" 
                                                        fill="none" 
                                                        viewBox="0 0 24 24" 
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    <h4 className="text-sm font-bold">Email Address</h4>
                                                </div>
                                                <p className="text-xs">{ partnerProfile.email }</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-y-1">
                                            <div className="flex items-center gap-x-1">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 text-pink-600" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <h4 className="text-sm font-bold">Address</h4>
                                            </div>
                                            <p className="text-xs">{ partnerProfile.street_address && partnerProfile.city && partnerProfile.state_province ? `${partnerProfile.street_address}, ${partnerProfile.city}, ${partnerProfile.state_province}` : 'N/A' }</p>
                                        </div>
                                        <Link href="/partner/profile">
                                            <button 
                                                className="w-full bg-pink-600 hover:bg-pink-500 focus:outline-none color-transition text-gray-50 font-bold py-2 rounded-lg tracking-wide text-sm"
                                            >View Profile</button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="w-3/5 flex flex-col gap-y-5">
                                    <h4 className="font-bold -mb-3 mt-3">Upcoming Events</h4>
                                    <div className="flex-grow bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl w-full flex flex-col gap-y-10 p-5">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-100 dark:bg-gray-800">
                                                <tr className="text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">
                                                    <th scope="col" className="px-4 py-3">
                                                        Event Name
                                                    </th>
                                                    <th scope="col" className="px-4 py-3">
                                                        Date
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <p className="text-sm text-gray-800 dark:text-gray-300">A Decade & Eight - Ailene Padaplin</p>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <p className="text-sm text-gray-800 dark:text-gray-300">July 13, 2021</p>
                                                    </td>
                                                </tr>
                                                <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <p className="text-sm text-gray-800 dark:text-gray-300">Pepito & Pepita Wedding</p>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <p className="text-sm text-gray-800 dark:text-gray-300">July 14, 2021</p>
                                                    </td>
                                                </tr>
                                                <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <p className="text-sm text-gray-800 dark:text-gray-300">Kadayawan sa Dabaw Sponsorship</p>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <p className="text-sm text-gray-800 dark:text-gray-300">July 15, 2021</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <a className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer self-end">View All</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ req }) => {
    const token = req.cookies.jwt
    const decoded_token = jwt_decode(token)
    const res = await fetch(`http://localhost:8000/partner_profile/${decoded_token.user_id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data = await res.json()
    return {
        props : {
            partnerProfile : data
        }
    }
}