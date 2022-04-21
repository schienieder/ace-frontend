import React, { useState, useEffect } from 'react'
import TopNav from '../../components/partner/TopNav'
import SideNav from '../../components/partner/SideNav'
import Footer from '../../components/partner/Footer'
import Link from 'next/link'
import CalendarHook from '../../components/admin/events/CalendarHook'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import moment from 'moment'

export default function index({ partnerProfile, upComingEvents, recentRequests }) {
    const router = useRouter()
    const [userName, setUsername] = useState()
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'partner') {
            router.push('/login')
        }
    }
    useEffect(() => {
        readRole()
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
                        : null
                    }
                        <div className="flex gap-x-5">
                            {/* Affiliation Request */}
                            <div className="w-1/2 card flex flex-col gap-y-5">
                                <div className="w-full flex justify-between">
                                    <h4 className="text-base font-bold dark:text-gray-300">Affiliation Requests</h4>
                                    <Link href="partner/requests/">
                                        <a className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer">View All</a>
                                    </Link>
                                </div>
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-100 dark:bg-gray-800">
                                        <tr className="text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-400">
                                            <th 
                                                scope="col" 
                                                className="px-4 py-3"
                                            >Description</th>
                                            <th 
                                                scope="col" 
                                                className="px-6 py-3"
                                            >Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        {
                                            recentRequests.length ? 
                                                recentRequests.map((request) => (
                                                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                                                        <td 
                                                            className="px-4 py-2 whitespace-nowrap flex flex-col"
                                                        >
                                                            <p className="text-sm text-gray-800 dark:text-gray-300 font-medium">Rose Garden</p>
                                                            <p className="text-xs text-gray-600 dark:text-gray-500">{ request.task }</p>
                                                        </td>
                                                        <td className="px-6 py-3 whitespace-nowrap">
                                                            {
                                                                request.status === 'Accepted' &&
                                                                <p className="capitalize text-sm text-teal-600">{ request.status }</p>
                                                            }
                                                            {
                                                                request.status === 'Pending' &&
                                                                <p className="capitalize text-sm text-yellow-500">{ request.status }</p>
                                                            }
                                                            {
                                                                request.status === 'Declined' &&
                                                                <p className="capitalize text-sm text-red-500">{ request.status }</p>
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                                :
                                                <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                                                    <td 
                                                        className="px-6 py-3 whitespace-nowrap text-center"
                                                        colSpan={2}
                                                    >
                                                        <p className="text-sm">Nothing to show.</p>
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* <AffiliationRequest data={ dummy } /> */}
                            <div className="w-1/2 card flex flex-col gap-y-5">
                                <div className="w-full flex justify-between">
                                    <h4 className="text-base font-bold dark:text-gray-300">Upcoming Events</h4>
                                    <Link href="partner/tasks/">
                                        <a className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer">View All</a>
                                    </Link>
                                </div>
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
                                        {
                                            upComingEvents.length ? 
                                                upComingEvents.map((event) => (
                                                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                                                        <td className="px-4 py-4 whitespace-nowrap">
                                                            <p className="text-sm text-gray-800 dark:text-gray-300">{ event.event_name }</p>
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap">
                                                            <p className="text-sm text-gray-800 dark:text-gray-300">{ moment(event.date_schedule).format('LL') }</p>
                                                        </td>
                                                    </tr>
                                                ))
                                            :
                                            <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <td 
                                                    className="px-6 py-3 whitespace-nowrap text-center"
                                                    colSpan={2}
                                                >
                                                    <p className="text-sm">Nothing to show.</p>
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
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
    const api = process.env.NEXT_PUBLIC_DRF_API
    const token = req.cookies.jwt
    const decoded_token = jwt_decode(token)
    const res1 = await fetch(`${api}partner_profile/${decoded_token.user_id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data1 = await res1.json()
    const res2 = await fetch(`${api}partner_devents/`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data2 = await res2.json()
    const res3 = await fetch(`${api}partner_daffiliations/`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data3 = await res3.json()
    return {
        props : {
            partnerProfile : data1,
            upComingEvents : data2,
            recentRequests : data3
        }
    }
}