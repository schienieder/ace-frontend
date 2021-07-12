import React, { useEffect } from 'react'
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
    const axios = require('axios')
    const readCookie = () => {
        try {
            const jwt_token = Cookies.get('jwt')
            const decoded_token = jwt_decode(jwt_token)
            axios({
                method : 'GET',
                url : `http://localhost:8000/account/${decoded_token.user_id}`,
                headers : {'Authorization' : 'Bearer'+' '+ jwt_token}
            })
            .then((response) => {
                response.data.role !== 'partner' ? router.push('/login') : ''
            })
            .catch((error) => {
                Swal.fire({
                    icon : 'error',
                    title: 'Error',
                    text: `${error.response}`,
                    showCloseButton: true,
                    confirmButtonColor: '#0F766E',
                })
                console.log(error.response)
            })
            console.log(jwt_token)
        }
        catch {
            router.push('/login')
        }
    }
    useEffect(() => {
        readCookie()
    }, [])
    const { calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getNextMonth, getPrevMonth } = CalendarHook()
    const dateClickHandler = date => {
        console.log(date);
    }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="dashboard" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <h4 className="text-xl font-bold">Dashboard</h4>
                        <div className="flex flex-col gap-y-5">
                            
                        <div className="cardContainer">
                                <div className="cardHeader bg-white border-b border-gray-200">
                                    <h4 className="font-bold text-teal-800">Event Calendar</h4>
                                </div>
                                <div className="cardBody">
                                    <div className="flex justify-between items-center -mb-2">
                                        {/* This is the month name and year */}
                                        <div className="flex gap-x-3">
                                            <h4 className="text-sm font-bold">{ monthNames[selectedDate.getMonth()] }</h4>
                                            <p className="text-sm font-normal">{ selectedDate.getFullYear() }</p>
                                        </div>
                                        {/* This is the buttons for next and prev */}
                                        <div className="flex">
                                            <button
                                                type="button" 
                                                className="flex items-center gap-x-1 px-3 py-1 border border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none color-transition rounded-tl-md rounded-bl-md"
                                                onClick={ getPrevMonth }
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                                </svg>
                                                <p className="font-normal text-sm">Prev</p>
                                            </button>
                                            <button
                                                type="button" 
                                                className="flex items-center gap-x-1 px-3 py-1 border border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none color-transition rounded-tr-md rounded-br-md"
                                                onClick={ getNextMonth }
                                            >
                                                <p className="font-normal text-sm">Next</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <table className="w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                {daysShort.map(day => (
                                                    <th key={day} className="px-4 py-3">{day}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {
                                                Object.values(calendarRows).map(cols => {
                                                return <tr key={cols[0].date} className="text-sm font-medium text-gray-600">
                                                    {cols.map(col => (
                                                    col.date === todayFormatted
                                                        ? <td key={col.date} className={`${col.classes} p-8 cursor-pointer bg-teal-700 text-gray-100 color-transition`} onClick={() => dateClickHandler(col.date)}>{ col.value }</td>
                                                        : <td key={col.date} className={`${col.classes} p-8 cursor-pointer bg-transparent hover:bg-gray-100 color-transition`} onClick={() => dateClickHandler(col.date)}>{ col.value }</td>
                                                    ))}
                                                </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="flex gap-x-5">
                                
                                <div className="w-2/5">
                                    <div className="cardContainer">
                                        <div className="cardHeader bg-white border-b border-gray-200">
                                            <h4 className="font-bold text-teal-800">Profile Information</h4>
                                        </div>
                                        <div className="cardBody">
                                            <div className="flex flex-col gap-y-1">
                                                <div className="flex items-center gap-x-1">
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="h-5 w-5 text-current" 
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
                                                            className="h-5 w-5 text-current" 
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
                                                            className="h-5 w-5 text-current" 
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
                                                        className="h-5 w-5 text-current" 
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
                                                    className="w-full bg-teal-800 hover:bg-teal-700 focus:bg-teal-700 focus:outline-none ring-2 ring-offset-2 ring-transparent ring-offset-transparent focus:ring-offset-gray-100 focus:ring-teal-700 color-transition text-gray-50 font-bold py-2 rounded-md tracking-wide text-sm"
                                                >View Profile</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="card w-3/5">
                                    <div className="w-full flex justify-between">
                                        <h4 className="font-bold">Upcoming Events</h4>
                                        <a className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer">View All</a>
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