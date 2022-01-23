import React, { useState, useEffect } from 'react'
import SideNav from '../../components/client/SideNav'
import TopNav from '../../components/client/TopNav'
import Footer from '../../components/client/Footer'
import PageHeader from '../../components/client/PageHeader'
import Link from 'next/link'
// import CalendarHook from '../../components/admin/events/CalendarHook'
import { useRouter } from 'next/router'
import jwt_decode from 'jwt-decode'

export default function dashboard({ clientProfile }) {
    const router = useRouter()
    const [userName, setUsername] = useState()
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'client') {
            router.push('/login')
        }
    }
    useEffect( async () => {
        await readRole()
    }, [])
    // const { calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getNextMonth, getPrevMonth } = CalendarHook()
    // const dateClickHandler = date => {
    //     console.log(date);
    // }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="dashboard" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Dashboard">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-current" 
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
                                <div className="w-full p-5 rounded-lg bg-pink-200 flex justify-center items-center gap-x-1 text-gray-800">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-7 w-7 text-pink-600 animate-wiggle" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <p className="font-normal">Profile information incomplete! Proceed <Link href="/client/profile"><a className="text-pink-600 font-bold hover:underline">here</a></Link> to remove this warning.</p>
                                </div>
                            )
                            : ''
                        }
                        <div className="flex flex-col gap-y-5">
                            
                            <div className="flex gap-x-5">
                                
                                <div className="w-2/5">
                                    <div className="cardContainer">
                                        <div className="cardHeader bg-white border-b border-gray-200">
                                            <h4 className="font-bold text-pink-600">Client Profile</h4>
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
                                                <p className="text-xs">{ clientProfile.first_name + ' ' + clientProfile.last_name }</p>
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
                                                    <p className="text-xs">{ clientProfile.mobile_number }</p>
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
                                                    <p className="text-xs">{ clientProfile.email }</p>
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
                                                <p className="text-xs">{ clientProfile.street_address && clientProfile.city && clientProfile.state_province ? `${clientProfile.street_address}, ${clientProfile.city}, ${clientProfile.state_province}` : 'N/A' }</p>
                                            </div>
                                            <Link href="/client/profile">
                                                <button 
                                                    className="w-full bg-pink-600 hover:bg-pink-500 focus:outline-none color-transition text-gray-50 font-bold py-2 rounded-md tracking-wide text-sm"
                                                >View Profile</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-3/5">
                                    <div className="cardContainer">
                                        <div className="cardHeader bg-white border-b border-gray-200">
                                            <h4 className="font-bold text-pink-600">Event Summary</h4>
                                        </div>
                                        <div className="cardBody">
                                            
                                        </div>
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
    const api = process.env.NEXT_PUBLIC_DRF_API
    const token = req.cookies.jwt
    const decoded_token = jwt_decode(token)
    const res = await fetch(`${api}client_profile/${decoded_token.user_id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data = await res.json()
    return {
        props : {
            clientProfile : data
        }
    }
}