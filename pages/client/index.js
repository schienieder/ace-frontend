import React, { useState, useEffect, useMemo } from 'react'
import SideNav from '../../components/client/SideNav'
import TopNav from '../../components/client/TopNav'
import Footer from '../../components/client/Footer'
import PageHeader from '../../components/client/PageHeader'
import Link from 'next/link'
// import CalendarHook from '../../components/admin/events/CalendarHook'
import { useRouter } from 'next/router'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'
import axios from 'axios'
import clientStyles from '../../styles/Client.module.css'
import moment from 'moment'
import {QRCodeCanvas} from 'qrcode.react'
import ClientMobileNav from '../../components/client/ClientMobileNav'
import useDarkMode from '../../hooks/useDarkMode'

export default function dashboard({ clientProfile, bookingInfo, interviewInfo, eventInfo, totalTasks, completedTasks }) {
    const router = useRouter()
    const { isDarkMode } = useDarkMode()
    const [userName, setUsername] = useState()
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
    const downloadQRCode = () => {
        // Generate download with use canvas and stream
        const canvas = document.getElementById("qr-gen");
        const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${eventInfo.event_name} Rating QR Code.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    return (
        <div className={`${isDarkMode ? 'dark' : ''} w-full h-screen grid grid-cols-1 md:grid-cols-custom-layout font-mont text-gray-800 dark:text-gray-300`}>
            <SideNav isActive="dashboard" />
            {
                showMobileNav ? 
                <ClientMobileNav 
                    isActive="dashboard" 
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
                    <div className="min-h-screen p-5 md:p-8 flex flex-col gap-y-5">
                        <PageHeader text="Dashboard">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-gray-800 dark:text-gray-300" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </PageHeader>
                        {
                            !clientProfile.first_name || !clientProfile.last_name || !clientProfile.mobile_number || !clientProfile.email || !clientProfile.street_address || !clientProfile.city || !clientProfile.state_province ?
                            (
                                <div className="w-full p-5 rounded-lg bg-white dark:bg-gray-900 flex justify-center items-center gap-x-1 text-gray-800">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-7 w-7 text-pink-600 animate-wiggle" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <p className="font-normal dark:text-gray-300">Profile information incomplete! Proceed <Link href="/client/profile"><a className="text-pink-600 font-bold hover:underline">here</a></Link> to remove this warning.</p>
                                </div>
                            )
                            : ''
                        }
                        { eventInfo && 
                            <>
                            <div className="flex justify-between items-center">
                                <h4 className='text-md font-bold -mb-3 mt-3 dark:text-gray-300'>Event Summary</h4>
                                <button
                                    className="commonBtn flex items-center gap-x-1"
                                    onClick={ downloadQRCode }
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5 text-current"
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor" 
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <p className="hidden md:block">Download QR</p>
                                </button>
                            </div>
                            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-5 dark:text-gray-300'>
                                <div className='card flex flex-col gap-y-5'>
                                    <div className='flex gap-x-1 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <h4 className='font-bold'>Event Progress</h4>
                                    </div>
                                    <p className='text-sm self-end'>{ completedTasks.length +' of '+totalTasks.count+' completed' }</p>
                                </div>
                                <div className='card flex flex-col gap-y-5'>
                                    <div className='flex gap-x-1 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <h4 className='font-bold'>Location</h4>
                                    </div>
                                    <p className='text-xs self-end'>{ eventInfo.venue_name }</p>
                                </div>
                                <div className='card flex flex-col gap-y-5'>
                                    <div className='flex gap-x-1 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <h4 className='font-bold'>Date & Time</h4>
                                    </div>
                                    <p className='text-sm self-end'>{ moment(eventInfo.date_schedule).format('ll')+" "+eventInfo.time_schedule }</p>
                                </div>
                                <div className='card flex flex-col gap-y-5'>
                                    <div className='flex gap-x-1 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <h4 className='font-bold'>Payment Status</h4>
                                    </div>
                                    {
                                        eventInfo.payment_status === 'Partially Paid' &&
                                        <p className='text-sm self-end text-yellow-500'>{ eventInfo.payment_status }</p>
                                    }
                                    {
                                        eventInfo.payment_status === 'Fully Paid' &&
                                        <p className='text-sm self-end text-teal-600'>{ eventInfo.payment_status }</p>
                                    }
                                </div>
                            </div>
                            <QRCodeCanvas
                                id="qr-gen"
                                value={JSON.stringify(eventInfo.id)}
                                size={300}
                                imageSettings={{
                                    src: "/images/marker.svg",
                                    x: null,
                                    y: null,
                                    height: 50,
                                    width: 50,
                                    excavate: true,
                                }}
                                level={"H"}
                                className="hidden self-center py-5"
                            />
                            </>
                        }
                        {
                            eventInfo === '' &&
                            <div className="flex flex-col gap-y-5">
                                <h4 className='text-md font-bold -mb-3 mt-3 dark:text-gray-300'>Booking Summary</h4>
                                <div className='w-65 md:w-full overflow-x-auto card'>
                                {
                                    bookingInfo ?
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
                                                    Event
                                                </th>
                                                <th 
                                                    scope="col" 
                                                    className={ clientStyles.tableHeadingClass }
                                                >
                                                    Date 
                                                </th>
                                                <th 
                                                    scope="col" 
                                                    className={ clientStyles.tableHeadingClass }
                                                >
                                                    Time 
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
                                                >{ bookingInfo.type_of_event && bookingInfo.venue_name ? bookingInfo.type_of_event+' @'+bookingInfo.venue_name : 'N/A' }</td>
                                                <td 
                                                    className={ clientStyles.tableDataClass }
                                                >{ bookingInfo.desired_date ? moment(bookingInfo.desired_date).format('ll') : 'N/A' }</td>
                                                <td 
                                                    className={ clientStyles.tableDataClass }
                                                >{ bookingInfo.time_schedule ? bookingInfo.time_schedule : 'N/A' }</td>
                                                {
                                                    !bookingInfo.status &&
                                                    <td 
                                                        className={`${clientStyles.tableDataClass}`}
                                                    >{ 'N/A' }</td>
                                                }
                                                {
                                                    bookingInfo.status === 'Pending' &&
                                                    <td 
                                                        className={`${clientStyles.tableDataClass} text-yellow-500`}
                                                    >{ bookingInfo.status }</td>
                                                }
                                                {
                                                    bookingInfo.status === 'Declined' &&
                                                    <td 
                                                        className={`${clientStyles.tableDataClass} text-red-500`}
                                                    >{ bookingInfo.status }</td>
                                                }
                                                {
                                                    bookingInfo.status === 'Accepted' &&
                                                    <td 
                                                        className={`${clientStyles.tableDataClass} text-teal-600`}
                                                    >{ bookingInfo.status }</td>
                                                }
                                            </tr>
                                        </tbody>
                                    </table>
                                    : <h4 className='text-md text-center dark:text-gray-300'>You currently don't have any bookings. Click <Link href="/client/bookings/add_booking"><a className="text-pink-600 font-bold hover:underline">here</a></Link> to add one!</h4>
                                }
                                </div>
                                <div className='w-full flex flex-col md:flex-row gap-y-5 gap-x-5'>
                                    <div className='w-full md:w-2/5 flex flex-col gap-y-5'>
                                        <h4 className='text-md font-bold -mb-3 mt-3 dark:text-gray-300'>Client Profile</h4>
                                        <div className='bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl w-full flex flex-col gap-y-10 px-10 py-8'>
                                            {/* Name & Number Start */}
                                            <div className='flex flex-col md:flex-row justify-between gap-y-5 dark:text-gray-300'>
                                                {/* Name Start */}
                                                <div className='flex flex-col gap-y-2'>
                                                    <div className='flex gap-x-1 items-center'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        <h4 className='font-bold text-sm'>Name</h4>
                                                    </div>
                                                    <p className='text-sm'>{ clientProfile.first_name+' '+clientProfile.last_name }</p>
                                                </div>
                                                {/* Name End */}
                                                {/* Number Start */}
                                                <div className='flex flex-col gap-y-2'>
                                                    <div className='flex gap-x-1 items-center'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                        <h4 className='font-bold text-sm'>Mobile</h4>
                                                    </div>
                                                    <p className='text-sm'>{ clientProfile.mobile_number }</p>
                                                </div>
                                                {/* Number End */}
                                            </div>
                                            {/* Name & Number End */}
                                            {/* Email & Birthdate Start */}
                                            <div className='flex flex-col md:flex-row justify-between gap-y-5 dark:text-gray-300'>
                                                {/* Email Start */}
                                                <div className='flex flex-col gap-y-2'>
                                                    <div className='flex gap-x-1 items-center'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                        <h4 className='font-bold text-sm'>Email</h4>
                                                    </div>
                                                    <p className='text-sm'>{ clientProfile.email }</p>
                                                </div>
                                                {/* Email End */}
                                                {/* Birthdate Start */}
                                                <div className='flex flex-col gap-y-2'>
                                                    <div className='flex gap-x-1 items-center'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <h4 className='font-bold text-sm'>Birthdate</h4>
                                                    </div>
                                                    <p className='text-sm'>{ clientProfile.birthdate ? moment(clientProfile.birthdate).format('ll') : 'N/A' }</p>
                                                </div>
                                                {/* Birthdate End */}
                                            </div>
                                            {/* Email & Birthdate End */}
                                            {/* Address Start */}
                                            <div className='flex flex-col gap-y-2 dark:text-gray-300'>
                                                <div className='flex gap-x-1 items-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <h4 className='font-bold text-sm'>Address</h4>
                                                </div>
                                                <p className='text-sm'>{ clientProfile.street_address || clientProfile.city || clientProfile.state_province || clientProfile.postal_zip ? clientProfile.street_address+', '+clientProfile.city+', '+clientProfile.state_province+', '+clientProfile.postal_zip : 'N/A' }</p>
                                            </div>
                                            {/* Address End */}
                                            <Link href="/client/profile">
                                                <button 
                                                    className="w-full bg-pink-600 hover:bg-pink-500 focus:outline-none color-transition text-gray-50 font-bold py-2 rounded-lg tracking-wide text-sm"
                                                >View Profile</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='w-full md:w-3/5 flex flex-col gap-y-5 dark:text-gray-300'>
                                        <h4 className='text-md font-bold -mb-3 mt-3'>Interview Schedule</h4>
                                        <div className='flex-grow bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl w-full flex flex-col gap-y-10 px-10 py-8'>
                                        {
                                            interviewInfo.date ? 
                                            <>
                                                {/* Date & Time Start */}
                                                <div className='flex justify-between'>
                                                    {/* Date Start */}
                                                    <div className='flex flex-col gap-y-2'>
                                                        <div className='flex gap-x-1 items-center'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            <h4 className='font-bold text-sm'>Date</h4>
                                                        </div>
                                                        <p className='text-sm'>{ moment(interviewInfo.date).format('ll') }</p>
                                                    </div>
                                                    {/* Date End */}
                                                    {/* Time Start */}
                                                    <div className='flex flex-col gap-y-2'>
                                                        <div className='flex gap-x-1 items-center'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <h4 className='font-bold text-sm'>Time</h4>
                                                        </div>
                                                        <p className='text-sm'>{ interviewInfo.time }</p>
                                                    </div>
                                                    {/* Time End */}
                                                </div>
                                                {/* Date & Time End */}
                                                {/* Address Start */}
                                                <div className='flex justify-between'>
                                                    {/* Address Start */}
                                                    <div className='flex flex-col gap-y-2'>
                                                        <div className='flex gap-x-1 items-center'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <h4 className='font-bold text-sm'>Location</h4>
                                                        </div>
                                                        <p className='text-sm'>{ interviewInfo.location }</p>
                                                    </div>
                                                    {/* Address End */}
                                                </div>
                                                {/* Address End */}
                                            </>
                                            : <h4 className='text-md text-center'>Nothing to show.</h4>
                                        }
                                        </div>
                                    </div>
                                </div>
                                {/*  */}
                            </div>
                        }
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
    let res4, data4, res5, data5, completedArr
    const res1 = await fetch(`${api}client_profile/${decoded_token.user_id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data1 = await res1.json()
    const res2 = await fetch(`${api}client_booking/${data1.id}`, {
        method : 'GET',
        headers : {
            'Authorization' : 'Bearer'+' '+token,
            'Content-Type' : 'application/json'
        }
    })
    const data2 = await res2.json()
    const res3 = await fetch(`${api}interview/${data1.id}`, {
        method : 'GET',
        headers : {
            'Authorization' : 'Bearer'+' '+token,
            'Content-Type' : 'application/json'
        }
    })
    const data3 = await res3.json()
    res4 = await fetch(`${api}client_event/${decoded_token.user_id}`, {
        method : "GET",
        headers : { "Authorization" : "Bearer"+" "+token }
    })
    if (res4.status != 404) {
        data4 = await res4.json()
    }
    if (data4) {
        res5 = await fetch(`${api}event_tasks/${data4.id}`, {
            method : "GET",
            headers : { "Authorization" : "Bearer"+" "+token }
        })
        data5 = await res5.json()
        completedArr = data5.results.filter((task) => (
            task.task_status === 'Completed'
        ))
    }
    return {
        props : {
            clientProfile : data1,
            bookingInfo : data2,
            interviewInfo : data3,
            eventInfo : data4 ? data4 : '',
            totalTasks : data5 ? data5 : '',
            completedTasks : completedArr ? completedArr : ''
        }
    }
}