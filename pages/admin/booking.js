import React, { useState, useEffect } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import { useRouter } from 'next/router'
import moment from 'moment'

export default function booking({ bookingInfo, clientInfo }) {
    const router = useRouter()
    const [userName, setUsername] = useState()
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'admin') {
            router.push('/login')
        }
    }
    useEffect( async () => {
        await readRole()
    }, [])
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="bookings" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col items-center gap-y-5 min-h-screen">
                        <div className='w-client-profile-form-container'>
                            <PageHeader text="Booking Details">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-6 w-6 text-current" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </PageHeader>
                        </div>
                        <div className='card w-client-profile-form-container'>
                            <div className='w-full rounded-xl px-16 py-8 flex flex-col items-center border border-gray-300 gap-y-16'>
                                {/* Name & Event Type Start */}
                                <div className='w-full flex justify-between'>
                                    <div className='flex flex-col gap-y-1'>
                                        <h4 className='text-md font-bold text-gray-700'>Client Name</h4>
                                        <p className='text-sm text-gray-700'>{ clientInfo.first_name+' '+clientInfo.last_name }</p>
                                    </div>
                                    <div className='flex flex-col gap-y-1'>
                                        <h4 className='text-md font-bold text-gray-700'>Type of Event</h4>
                                        <p className='text-sm text-gray-700'>{ bookingInfo.type_of_event }</p>
                                    </div>
                                </div>
                                {/* Name & Event Type End */}
                                {/* Date/Time & Budget Start */}
                                <div className='w-full flex justify-between'>
                                    <div className='flex flex-col gap-y-1'>
                                        <h4 className='text-md font-bold text-gray-700'>Date & Time</h4>
                                        <p className='text-sm text-gray-700'>{ moment(bookingInfo.desired_date).format('ll')+' '+bookingInfo.time_schedule }</p>
                                    </div>
                                    <div className='flex flex-col gap-y-1'>
                                        <h4 className='text-md font-bold text-gray-700'>Budget</h4>
                                        <p className='text-sm text-gray-700'>{ bookingInfo.event_budget }</p>
                                    </div>
                                </div>
                                {/* Date/Time & Budget End */}
                                {/* Guests & Status Start */}
                                <div className='w-full flex justify-between'>
                                    <div className='flex flex-col gap-y-1'>
                                        <h4 className='text-md font-bold text-gray-700'>Guests No.</h4>
                                        <p className='text-sm text-gray-700'>{ bookingInfo.guests_no }</p>
                                    </div>
                                    <div className='flex flex-col gap-y-1'>
                                        <h4 className='text-md font-bold text-gray-700'>Status</h4>
                                        <p className='text-sm text-gray-700'>{ bookingInfo.status }</p>
                                    </div>
                                </div>
                                {/* Guests & Status End */}
                                <div className="w-full flex justify-end">
                                    <button 
                                        className="px-5 py-2 bg-pink-600 hover:bg-pink-500 rounded-lg text-white color-transition focus:outline-none"
                                    >
                                        <p className="text-base font-bold tracking-wide">Set Interview</p>
                                    </button>
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

export const getServerSideProps = async ({ req, query }) => {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const { booking_id, client_id } = query
    const jwt = req.cookies.jwt
    const res1 = await fetch(`${api}admin_client/${client_id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+jwt}
    })
    const data1 = await res1.json()
    const res2 = await fetch(`${api}booking/${booking_id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+jwt}
    })
    const data2 = await res2.json()
    return {
        props : {
            clientInfo : data1,
            bookingInfo : data2
        }
    }
}