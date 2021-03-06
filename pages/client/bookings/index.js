import React, { useState, useEffect } from 'react'
import SideNav from '../../../components/client/SideNav'
import TopNav from '../../../components/client/TopNav'
import Footer from '../../../components/client/Footer'
import PageHeader from '../../../components/client/PageHeader'
import clientStyles from '../../../styles/Client.module.css' 
import { useRouter } from 'next/router'
import jwt_decode from 'jwt-decode'
import moment from 'moment'
import Link from 'next/link'
import useDarkMode from '../../../hooks/useDarkMode'
import ClientMobileNav from '../../../components/client/ClientMobileNav'

export default function bookings({ bookingDetails }) {
    const router = useRouter()
    const [userName, setUsername] = useState()
    const { isDarkMode } = useDarkMode()
    const [showMobileNav, setShowMobileNav] = useState(false)
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'client') {
            router.push('/login')
        }
    }
    useEffect(() => {
        readRole()
    }, [])
    return (
        <div className={`${isDarkMode ? 'dark' : ''} w-full h-screen grid grid-cols-1 md:grid-cols-custom-layout font-mont text-gray-800 dark:text-gray-300`}>
            <SideNav isActive="booking" />
            {
                showMobileNav ? 
                <ClientMobileNav 
                    isActive="booking" 
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
                    <div className="p-5 md:p-8 flex flex-col items-center gap-y-5 min-h-screen">
                        <div className="w-full flex justify-between">
                            <PageHeader text="Event Bookings">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-7 w-7 text-gray-800 dark:text-gray-300" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </PageHeader>
                            <Link href="/client/bookings/add_booking">
                                <button
                                    type="button"
                                    className={ clientStyles.addBtn }
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5 text-current" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <p className="text-sm font-bold hidden md:block">Book Event</p>
                                </button>
                            </Link>
                        </div>
                        <div className="card w-65 md:w-full overflow-x-auto flex flex-col items-center gap-y-10">
                            {
                                bookingDetails.id ?
                            <table 
                                className="min-w-full divide-y divide-gray-200 border-b border-gray-200 dark:border-gray-700 dark:divide-gray-700"
                            >
                                <thead className="bg-gray-100 dark:bg-gray-800">
                                    <tr 
                                        className="text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-400"
                                    >
                                        <th 
                                            scope="col" 
                                            className={ clientStyles.tableHeadingClass }
                                        >
                                            Event Type
                                        </th>
                                        <th 
                                            scope="col" 
                                            className={ clientStyles.tableHeadingClass }
                                        >
                                            Venue
                                        </th>
                                        <th 
                                            scope="col" 
                                            className={ clientStyles.tableHeadingClass }
                                        >
                                            Budget
                                        </th>
                                        <th 
                                            scope="col" 
                                            className={ clientStyles.tableHeadingClass }
                                        >
                                            Date & Time
                                        </th>
                                        <th 
                                            scope="col" 
                                            className={ clientStyles.tableHeadingClass }
                                        >
                                            Guests No.
                                        </th>
                                        <th 
                                            scope="col" 
                                            className={ clientStyles.tableHeadingClass }
                                        >
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody 
                                    className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300"
                                >
                                    <tr
                                        className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300"
                                    >
                                        <td 
                                            className={ clientStyles.tableDataClass }
                                        >{ bookingDetails.type_of_event }</td>
                                        <td 
                                            className={ clientStyles.tableDataClass }
                                        >{ bookingDetails.venue_name }</td>
                                        <td 
                                            className={ clientStyles.tableDataClass }
                                        >{ bookingDetails.event_budget }</td>
                                        <td 
                                            className={ clientStyles.tableDataClass }
                                        >{ moment(bookingDetails.desired_date).format('ll') + ' ' + bookingDetails.time_schedule }</td>
                                        <td 
                                            className={ clientStyles.tableDataClass }
                                        >{ bookingDetails.guests_no }</td>
                                        {
                                            bookingDetails.status === 'Pending' &&
                                            <td 
                                                className={`${clientStyles.tableDataClass} text-yellow-500`}
                                            >{ bookingDetails.status }</td>
                                        }
                                        {
                                            bookingDetails.status === 'Declined' &&
                                            <td 
                                                className={`${clientStyles.tableDataClass} text-red-500`}
                                            >{ bookingDetails.status }</td>
                                        }
                                        {
                                            bookingDetails.status === 'Accepted' &&
                                            <td 
                                                className={`${clientStyles.tableDataClass} text-teal-600`}
                                            >{ bookingDetails.status }</td>
                                        }
                                    </tr>
                                </tbody>
                            </table>
                                : <h4 className='text-md text-center dark:text-gray-300'>You currently don't have any bookings.</h4>
                            }
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
    const res1 = await fetch(`${api}client_profile/${decoded_token.user_id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data1 = await res1.json()
    const res2 = await fetch(`${api}client_booking/${data1.id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data2 = await res2.json()
    return {
        props : {
            bookingDetails : data2
        }
    }
}