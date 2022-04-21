import React, { useState, useEffect } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/Footer'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function partner({ partnerProfile }) {
    const router = useRouter()
    const [userName, setUsername] = useState()
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
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="partners" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col items-center gap-y-5 min-h-screen">
                        <div className="self-start flex items-center gap-x-2">
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
                                <Link href="/admin/partners">
                                    <h4 className="text-xl font-bold dark:text-gray-300 cursor-pointer hover:underline">Partner List</h4>
                                </Link>
                                <h4 className="text-xl font-bold dark:text-gray-300 cursor-pointer hover:underline">\</h4>
                                <h4 className="text-xl font-bold dark-text-gray-300">{ partnerProfile.business_name.length ? partnerProfile.business_name : '' }</h4>
                            </div>
                        </div>
                        <div className="w-about-img h-persona bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl py-8 px-5 flex justify-center">
                            <div className="w-80 mt-5 flex flex-col items-center gap-y-5">
                                <div className='w-40 h-40 bg-gray-200 rounded-full'></div>
                                <h4 className='text-xl font-bold -mb-3'>{ partnerProfile.business_name.length ? partnerProfile.business_name : 'N/A' }</h4>
                                <h4 className='text-gray-600 mb-5'>{ partnerProfile.type_of_business.length ? partnerProfile.type_of_business : 'N/A' }</h4>
                                <div className='flex flex-col gap-y-5'>
                                    <div className='flex items-center gap-x-2'>
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-6 w-6 text-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <p className='text-sm'>{ partnerProfile.first_name + ' ' + partnerProfile.last_name }</p>
                                    </div>
                                    <div className='flex items-center gap-x-2'>
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-6 w-6 text-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <p className='text-sm'>{ partnerProfile.mobile_number }</p>
                                    </div>
                                    <div className='flex items-center gap-x-2'>
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-6 w-6 text-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <p className='text-sm'>{ partnerProfile.email }</p>
                                    </div>
                                    <div className='flex items-center gap-x-2'>
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-6 w-6 text-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        <p className='text-sm'>{ partnerProfile.street_address.length && partnerProfile.city.length ? partnerProfile.street_address + ', ' + partnerProfile.city : 'N/A' }</p>
                                    </div>
                                    <div className='flex flex-col gap-y-2'>
                                        <div className="flex items-center gap-x-2">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="h-6 w-6 text-current" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor" 
                                                strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <h4 className="text-sm font-bold">Services Offered</h4>
                                        </div>
                                        <p className='text-sm'>{ partnerProfile.services_offered.length ? partnerProfile.services_offered : 'N/A' }</p>
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

export const getServerSideProps = async ({ req, query }) => {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const { id } = query
    const jwt = req.cookies.jwt
    const res = await fetch(`${api}admin_partner/${id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+jwt}
    })
    const data = await res.json()
    return {
        props : {
            partnerProfile : data
        }
    }
}