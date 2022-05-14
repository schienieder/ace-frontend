import React, { useState, useEffect } from 'react'
import TopNav from '../../../components/admin/TopNav'
import SideNav from '../../../components/admin/SideNav'
import Footer from '../../../components/Footer'
import { useRouter } from 'next/router'
import moment from 'moment'
import adminStyles from '../../../styles/Admin.module.css'
import Link from 'next/link'
import useDarkMode from '../../../hooks/useDarkMode'
import AdminMobileNav from '../../../components/admin/AdminMobileNav'

export default function event({ eventInfo, clientInfo, taskList, partnerList }) {
    const { isDarkMode } = useDarkMode()
    const router = useRouter()
    const [userName, setUsername] = useState()
    const [showMobileNav, setShowMobileNav] = useState(false)
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'admin') {
            router.push('/login')
        }
    }
    useEffect(() => {
        readRole()
    }, [])
    return (
        <div className={`${isDarkMode ? 'dark' : ''} w-full h-screen grid grid-cols-1 md:grid-cols-custom-layout font-mont text-gray-800`}>
            <SideNav isActive="events" />
            {
                showMobileNav ?
                <AdminMobileNav 
                    isActive="events"
                    onClick={ () => setShowMobileNav(!showMobileNav) }
                /> 
                : null
            }
            <div className="col-start-1 md:col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav 
                    username={ userName } 
                    onClick={ () => setShowMobileNav(!showMobileNav) }
                />
                <div className="row-start-2 w-full h-full bg-true-100 dark:bg-gray-800">
                    <div className="p-5 md:p-8 flex flex-col gap-y-10 min-h-screen">
                        <div className="flex items-center gap-x-2">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-gray-800 dark:text-gray-300" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            <div className="flex gap-x-2">
                                <Link href="/admin/events">
                                    <h4 className="text-xl font-bold dark:text-gray-300 cursor-pointer hover:underline">Events</h4>
                                </Link>
                                <h4 className="text-xl font-bold dark:text-gray-300 cursor-pointer hover:underline">\</h4>
                                <h4 className="text-xl font-bold dark:text-gray-300">{ eventInfo.event_name }</h4>
                            </div>
                        </div>
                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-5'>
                            <div className='card flex flex-col gap-y-5'>
                                <div className='flex gap-x-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <h4 className='font-bold dark:text-gray-300'>Client</h4>
                                </div>
                                <p className='text-sm self-end dark:text-gray-300'>{ clientInfo.first_name+' '+clientInfo.last_name }</p>
                            </div>
                            <div className='card flex flex-col gap-y-5'>
                                <div className='flex gap-x-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <h4 className='font-bold dark:text-gray-300'>Venue</h4>
                                </div>
                                <p className='text-xs self-end dark:text-gray-300'>{ eventInfo.venue_name }</p>
                            </div>
                            <div className='card flex flex-col gap-y-5'>
                                <div className='flex gap-x-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <h4 className='font-bold dark:text-gray-300'>Schedule</h4>
                                </div>
                                <p className='text-xs self-end dark:text-gray-300'>{ moment(eventInfo.date_schedule).format('ll')+', '+eventInfo.time_schedule }</p>
                            </div>
                            <div className='card flex flex-col gap-y-5'>
                                <div className='flex items-center gap-x-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <h4 className='font-bold dark:text-gray-300'>Payment</h4>
                                </div>
                                {
                                    eventInfo.payment_status == "Partially Paid" ?
                                        <p className='text-sm self-end text-yellow-500'>{ eventInfo.payment_status }</p>
                                    :
                                        <p className='text-sm self-end text-teal-600'>{ eventInfo.payment_status }</p>
                                }
                            </div>
                        </div>
                        <div className="card w-65 md:w-full overflow-x-auto flex flex-col gap-y-5">
                            <table className="min-w-full divide-y divide-gray-200 border-b border-gray-200 dark:border-gray-700">
                                <thead className="bg-gray-100 dark:bg-gray-800">
                                    <tr className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider dark:text-gray-400">
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            No.
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Assigned To
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        {
                                            taskList.results.map((task, index) => (
                                                <tr 
                                                className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
                                                    key={ task.id }
                                                >
                                                    <td className={ adminStyles.tableDataClass }>
                                                        <p className={`${adminStyles.tableDataTextClass} dark:text-gray-300`}>{ index+1 }</p>
                                                    </td>
                                                    <td className={ adminStyles.tableDataClass }>
                                                        <p className={`${adminStyles.tableDataTextClass} dark:text-gray-300`}>
                                                            {
                                                                partnerList.results.map((partner) => {
                                                                    if (partner.id === task.partner) {
                                                                        return partner.first_name+' '+partner.last_name
                                                                    }
                                                                })
                                                            }
                                                        </p>
                                                    </td>
                                                    <td className={ adminStyles.tableDataClass }>
                                                        {
                                                            task.task_status === 'On Going' ?
                                                            <p className="text-sm text-yellow-500">
                                                                { task.task_status }
                                                            </p>
                                                            :
                                                            <p className="text-sm text-teal-600">
                                                                { task.task_status }
                                                            </p>
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                </tbody>
                            </table>
                            <div className="flex gap-x-2 text-sm">
                                <p className="font-normal dark:text-gray-300">Total Tasks: </p>
                                <p className="font-bold dark:text-gray-300">{ taskList.count }</p>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ req, query }) => {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const { id } = query
    const jwt = req.cookies.jwt
    const res1 = await fetch(`${api}event/${id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+jwt}
    })
    const data1 = await res1.json()
    const res2 = await fetch(`${api}admin_client/${data1.client}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+jwt}
    })
    const data2 = await res2.json()
    const res3 = await fetch(`${api}event_tasks/${id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+jwt}
    })
    const data3 = await res3.json()
    const res4 = await fetch(`${api}partners_list/`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+jwt}
    })
    const data4 = await res4.json()
    return {
        props : {
            eventInfo : data1,
            clientInfo : data2,
            taskList : data3,
            partnerList : data4,
        }
    }
}