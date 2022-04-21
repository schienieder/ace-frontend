import React, { useState, useEffect } from 'react'
import TopNav from '../../components/partner/TopNav'
import SideNav from '../../components/partner/SideNav'
import Footer from '../../components/partner/Footer'
import partnerStyles from '../../styles/Partner.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import moment from 'moment'
import PageHeader from '../../components/PageHeader'
import Swal from 'sweetalert2'
import Link from 'next/link'

export default function request({ requestInfo, eventInfo }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
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
    const acceptRequest = () => {
        Swal.fire({
            title: 'Accept Request',
            text: `Do you want to accept request?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DB2777',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Yes, accept it!'
        }).then((result) => {
            const jwt_token = Cookies.get('jwt')
            if (result.isConfirmed) {
                axios({
                    method : 'PATCH',
                    url : `${api}request_update/${requestInfo.id}`,
                    headers : {'Authorization' : 'Bearer'+' '+ jwt_token},
                    data : { status : "Accepted" }
                })
                .then(() => {
                    Swal.fire({
                        icon : 'success',
                        title : 'Accepted!',
                        text : 'Affiliation request has been accepted.',
                        confirmButtonColor: '#DB2777',
                        showCloseButton : true,
                        timer : 2000
                    })
                    router.push('/partner/requests')
                })
                .catch((error) => {
                    Swal.fire({
                        icon : 'error',
                        title: 'Error',
                        timer : 3000,
                        text: error.message,
                        showCloseButton: true,
                        confirmButtonColor: '#DB2777',
                    })
                })
            }
        })
    }
    const declineRequest = () => {
        Swal.fire({
            title: 'Decline Request',
            text: `Do you want to decline request?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DB2777',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Yes, decline it!'
        }).then((result) => {
            const jwt_token = Cookies.get('jwt')
            if (result.isConfirmed) {
                axios({
                    method : 'PATCH',
                    url : `${api}request_update/${requestInfo.id}`,
                    headers : {'Authorization' : 'Bearer'+' '+ jwt_token},
                    data : { status : "Declined" }
                })
                .then(() => {
                    Swal.fire({
                        icon : 'info',
                        title : 'Declined!',
                        text : 'Affiliation request has been declined.',
                        confirmButtonColor: '#DB2777',
                        showCloseButton : true,
                        timer : 2000
                    })
                    router.push('/partner/requests')
                })
                .catch((error) => {
                    Swal.fire({
                        icon : 'error',
                        title: 'Error',
                        timer : 3000,
                        text: error.message,
                        showCloseButton: true,
                        confirmButtonColor: '#DB2777',
                    })
                })
            }
        })
    }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="requests" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <div className="flex items-center gap-x-2">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="w-7 h-7 text-current"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <div className="flex gap-x-2">
                                <Link href="/partner/requests">
                                    <h4 className="text-xl font-bold dark:text-gray-300 cursor-pointer hover:underline">Affiliation Requests</h4>
                                </Link>
                                <h4 className="text-xl font-bold dark:text-gray-300 cursor-pointer hover:underline">\</h4>
                                <h4 className="text-xl font-bold dark-text-gray-300">{ eventInfo.event_name }</h4>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-5">
                            <div className='w-full grid grid-cols-4 gap-x-5'>
                                <div className='card flex flex-col gap-y-5'>
                                    <div className='flex gap-x-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <h4 className='font-bold'>Event Name</h4>
                                    </div>
                                    <p className='text-sm self-end'>{ eventInfo.event_name }</p>
                                </div>
                                <div className='card flex flex-col gap-y-5'>
                                    <div className='flex gap-x-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <h4 className='font-bold'>Date</h4>
                                    </div>
                                    <p className='text-sm self-end'>{ moment(eventInfo.event_date).format('ll') }</p>
                                </div>
                                <div className='card flex flex-col gap-y-5'>
                                    <div className='flex gap-x-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <h4 className='font-bold'>Task</h4>
                                    </div>
                                    <p className='text-sm self-end'>{ requestInfo.task }</p>
                                </div>
                                <div className='card flex flex-col gap-y-5'>
                                    <div className='flex items-center gap-x-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <h4 className='font-bold'>Venue</h4>
                                    </div>
                                    <p className='text-xs self-end'>{ eventInfo.venue_name }</p>
                                </div>
                            </div>
                            <div className='self-end flex gap-x-5'>
                                <button 
                                    className='commonBtn color-transition'
                                    onClick={ acceptRequest }
                                >Accept</button>
                                <button 
                                    className='commonBtn2 color-transition'
                                    onClick={ declineRequest }
                                >Decline</button>
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
    const token = req.cookies.jwt
    const { request_id } = query;
    const res1 = await fetch(`${api}affiliation/${request_id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data1 = await res1.json()
    const res2 = await fetch(`${api}event/${ data1.event }`, {
        method : 'GET',
        headers : { 'Authorization' : 'Bearer'+' '+token }
    })
    const data2 = await res2.json()
    return {
        props : {
            requestInfo : data1,
            eventInfo : data2
        }
    }
}