import React, { useEffect } from 'react'
import SideNav from '../../components/client/SideNav'
import TopNav from '../../components/client/TopNav'
import Footer from '../../components/client/Footer'
import PageHeader from '../../components/client/PageHeader'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

export default function interview({ clientProfile }) {
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
                response.data.role !== 'client' ? router.push('/login') : ''
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
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="interview" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Interview Schedules" />
                        <div className="flex gap-x-5">
                            {/* profile & interview sched/location card */}
                            <div className="card w-2/5 h-screen flex flex-col gap-y-5 text-gray-700">
                                <div className="w-full flex flex-col justify-center gap-y-5">
                                    <div className="flex flex-col items-center gap-y-3 mt-5">
                                        <div className="h-28 w-28 bg-gray-200 rounded-full"></div>
                                        <h4 className="text-lg font-bold">{ clientProfile.first_name + ' ' + clientProfile.last_name }</h4>
                                    </div>
                                    <div className="w-full flex flex-col justify-start">
                                        <div className="flex flex-col border-t border-gray-200 py-3 gap-y-5">
                                            <h4 className="font-bold">Contact Details</h4>
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
                                                <p className="text-xs">{ clientProfile.mobile_number }</p>
                                            </div>
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
                                                <p className="text-xs">{ clientProfile.email || 'N/A' }</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col border-t border-gray-200 py-3 gap-y-4">
                                            <h4 className="font-bold">Address</h4>
                                            <p className="text-xs">{ clientProfile.street_address && clientProfile.city && clientProfile.state_province ? `${clientProfile.street_address}, ${clientProfile.city}, ${clientProfile.state_province}` : 'N/A' }</p>
                                            <Link href="/client/profile">
                                                <button 
                                                    className="mt-5 w-full bg-teal-800 hover:bg-teal-700 focus:bg-teal-700 focus:outline-none ring-2 ring-offset-2 ring-transparent ring-offset-transparent focus:ring-offset-gray-100 focus:ring-teal-700 color-transition text-gray-50 font-bold py-2 rounded-md tracking-wide text-sm"
                                                >View Profile</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* booking details card */}
                            <div className="w-3/5 flex flex-col gap-y-5 text-gray-700">
                                {/* <div className="card w-full flex flex-col gap-y-5">
                                    <h4 className="font-bold">Interview Details</h4>
                                    <div className="flex flex-col gap-y-2">
                                        <p className="text-sm font-bold">Location</p>
                                        <div className="flex items-center gap-x-2">
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
                                            <p className="text-xs">Gourmet Restaurant, Quezon Street, Tagum City</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-2">
                                        <p className="text-sm font-bold">Date & Time</p>
                                        <div className="flex gap-x-10">
                                            <div className="flex items-center gap-x-2">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 text-current" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p className="text-xs">July 13, 2021</p>
                                            </div>
                                            <div className="flex items-center gap-x-2">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 text-current" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                    >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="text-xs">2:30 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card w-full flex flex-col gap-y-5">
                                    <h4 className="font-bold">Booking Details</h4>
                                </div> */}
                                <div className="cardContainer">
                                    <div className="cardHeader bg-white border-b border-gray-200">
                                        <h4 className="font-bold text-teal-800">Interview Details</h4>
                                    </div>
                                    <div className="cardBody">
                                        <div className="flex flex-col gap-y-2">
                                            <p className="text-sm font-bold">Location</p>
                                            <div className="flex items-center gap-x-2">
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
                                                <p className="text-xs">Gourmet Restaurant, Quezon Street, Tagum City</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-y-2">
                                            <p className="text-sm font-bold">Date & Time</p>
                                            <div className="flex gap-x-10">
                                                <div className="flex items-center gap-x-2">
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="h-5 w-5 text-current" 
                                                        fill="none" 
                                                        viewBox="0 0 24 24" 
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="text-xs">July 13, 2021</p>
                                                </div>
                                                <div className="flex items-center gap-x-2">
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="h-5 w-5 text-current" 
                                                        fill="none" 
                                                        viewBox="0 0 24 24" 
                                                        stroke="currentColor"
                                                        >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <p className="text-xs">2:30 PM</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cardContainer">
                                    <div className="cardHeader bg-white border-b border-gray-200">
                                        <h4 className="font-bold text-teal-800">Booking Details</h4>
                                    </div>
                                    <div className="cardBody">
                                        
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
    const res = await fetch(`http://localhost:8000/client_profile/${decoded_token.user_id}`, {
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