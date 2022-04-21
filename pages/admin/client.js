import React, { useState, useEffect } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/Footer'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

export default function partner({ clientProfile }) {
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
    const displayAge = (birthYear) => {
        const currYear = new Date().getFullYear()
        const clientBirth = new Date(birthYear).getFullYear()
        return currYear - clientBirth
    }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="clients" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col items-center gap-y-5 min-h-screen">
                        <div className="self-start flex items-center gap-x-2">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-current" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                            <div className="flex gap-x-2">
                                <Link href="/admin/clients">
                                    <h4 className="text-xl font-bold dark:text-gray-300 cursor-pointer hover:underline">Client List</h4>
                                </Link>
                                <h4 className="text-xl font-bold dark:text-gray-300 cursor-pointer hover:underline">\</h4>
                                <h4 className="text-xl font-bold dark-text-gray-300">{ clientProfile.first_name+' '+clientProfile.last_name }</h4>
                            </div>
                        </div>
                        <div className="w-2/5 h-persona bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center gap-y-5 py-10 px-5">
                            {
                                clientProfile.profile_image ? 
                                <div className="flex w-32 h-32 rounded-full overflow-hidden mt-5">
                                    <img 
                                        src={clientProfile.profile_image} 
                                        alt="Profile Image"
                                        className="max-w-full h-auto self-start"
                                    />
                                </div>
                                : 
                                <div className="flex w-32 h-32 rounded-full overflow-hidden mt-5">
                                    <img src="/images/default.png"
                                        alt="Default Image"
                                        className='max-w-full h-auto self-start'
                                    />
                                </div>
                            }
                            <div className='flex flex-col gap-y-6'>
                            <h4 className='text-xl font-bold -mb-3 text-center'>{ clientProfile.first_name+" "+clientProfile.last_name }</h4>
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
                                    <p className='text-sm'>{ clientProfile.mobile_number }</p>
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
                                    <p className='text-sm'>{ clientProfile.email }</p>
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    {
                                        clientProfile.sex === 1 &&
                                        <>
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className='h-6 w-6 text-current'
                                                aria-hidden="true" 
                                                preserveAspectRatio="xMidYMid meet" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M17.5 9.5C17.5 6.46 15.04 4 12 4S6.5 6.46 6.5 9.5c0 2.7 1.94 4.93 4.5 5.4V17H9v2h2v2h2v-2h2v-2h-2v-2.1c2.56-.47 4.5-2.7 4.5-5.4zm-9 0C8.5 7.57 10.07 6 12 6s3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5z" fill="currentColor"/>
                                            </svg>
                                            <p className='text-sm'>Female</p>
                                        </>
                                    }
                                    {
                                        clientProfile.sex === 0 &&
                                        <>
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className='h-6 w-6 text-current'
                                                aria-hidden="true" 
                                                preserveAspectRatio="xMidYMid meet" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19 4h-4c-.55 0-1 .45-1 1s.45 1 1 1h1.58l-3.97 3.97C11.73 9.36 10.66 9 9.5 9C6.46 9 4 11.46 4 14.5S6.46 20 9.5 20s5.5-2.46 5.5-5.5c0-1.16-.36-2.23-.97-3.12L18 7.42V9c0 .55.45 1 1 1s1-.45 1-1V5c0-.55-.45-1-1-1zM9.5 18C7.57 18 6 16.43 6 14.5S7.57 11 9.5 11s3.5 1.57 3.5 3.5S11.43 18 9.5 18z" fill="currentColor"/>
                                            </svg>
                                            <p className='text-sm'>Male</p>
                                        </>
                                    }
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-6 w-6 text-current" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className='text-sm'>{ clientProfile.birthdate ? displayAge(clientProfile.birthdate) + ' years old' : 'N/A' }</p>
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
                                    <p className='text-sm'>{ clientProfile.street_address && clientProfile.city ? clientProfile.street_address + ', ' + clientProfile.city : 'N/A' }</p>
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
    const res = await fetch(`${api}admin_client/${id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+jwt}
    })
    const data = await res.json()
    return {
        props : {
            clientProfile : data
        }
    }
}